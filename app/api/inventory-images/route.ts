import { NextResponse } from 'next/server';
import { env } from '@/lib/env';

interface CloudinaryResource {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  created_at: string;
  format: string;
  folder?: string;
  asset_folder?: string;
}

export async function GET() {
  const cloudName = env.CLOUDINARY_CLOUD_NAME;
  const apiKey = env.CLOUDINARY_API_KEY;
  const apiSecret = env.CLOUDINARY_API_SECRET;
  const rawFolder = env.CLOUDINARY_INVENTORY_FOLDER || 'inventory';
  const folder = rawFolder.replace(/^\/+|\/+$/g, '');
  const folderNormalized = folder.toLowerCase();

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      {
        success: false,
        images: [],
        message: 'Cloudinary environment variables are not configured',
      },
      { status: 500 }
    );
  }

  try {
    const authHeader = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: `Basic ${authHeader}`,
      },
      cache: 'no-store',
    };

    // First attempt: exact folder lookup
    let resources: CloudinaryResource[] = [];
    const folderVariants = Array.from(new Set([folder, folder.toLowerCase(), folder.toUpperCase()]));

    for (const folderVariant of folderVariants) {
      const byFolderUrl = new URL(
        `https://api.cloudinary.com/v1_1/${cloudName}/resources/by_asset_folder/${encodeURIComponent(folderVariant)}`
      );
      byFolderUrl.searchParams.set('max_results', '100');
      byFolderUrl.searchParams.set('direction', 'desc');

      const byFolderResponse = await fetch(byFolderUrl.toString(), requestOptions);
      if (byFolderResponse.ok) {
        const byFolderData = await byFolderResponse.json();
        const byFolderResources = (byFolderData.resources || []) as CloudinaryResource[];
        if (byFolderResources.length > 0) {
          resources = byFolderResources;
          break;
        }
      }
    }

    if (resources.length === 0) {
      // Fallback: prefix lookup
      const prefixUrl = new URL(`https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload`);
      prefixUrl.searchParams.set('prefix', `${folder}/`);
      prefixUrl.searchParams.set('max_results', '100');
      prefixUrl.searchParams.set('direction', 'desc');

      const prefixResponse = await fetch(prefixUrl.toString(), requestOptions);

      if (!prefixResponse.ok) {
        const errorText = await prefixResponse.text();
        return NextResponse.json(
          {
            success: false,
            images: [],
            message: 'Failed to fetch inventory images from Cloudinary',
            error: errorText,
          },
          { status: 502 }
        );
      }

      const prefixData = await prefixResponse.json();
      resources = (prefixData.resources || []) as CloudinaryResource[];
    }

    // Final fallback: fetch recent images and filter by Cloudinary folder metadata.
    // This handles cases where public_id stays unchanged after moving assets in UI.
    if (resources.length === 0) {
      const allImagesUrl = new URL(`https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload`);
      allImagesUrl.searchParams.set('max_results', '200');
      allImagesUrl.searchParams.set('direction', 'desc');

      const allImagesResponse = await fetch(allImagesUrl.toString(), requestOptions);
      if (allImagesResponse.ok) {
        const allImagesData = await allImagesResponse.json();
        const allResources = (allImagesData.resources || []) as CloudinaryResource[];

        resources = allResources.filter((resource) => {
          const resourceFolder = resource.folder?.replace(/^\/+|\/+$/g, '').toLowerCase();
          const resourceAssetFolder = resource.asset_folder?.replace(/^\/+|\/+$/g, '').toLowerCase();
          const publicId = resource.public_id.toLowerCase();
          return (
            resourceFolder === folderNormalized ||
            resourceAssetFolder === folderNormalized ||
            publicId.startsWith(`${folderNormalized}/`)
          );
        });
      }
    }

    const images = resources.map((resource) => ({
      id: resource.public_id,
      publicId: resource.public_id,
      url: resource.secure_url,
      width: resource.width,
      height: resource.height,
      createdAt: resource.created_at,
      format: resource.format,
    }));

    return NextResponse.json({
      success: true,
      folder,
      configuredFolder: rawFolder,
      count: images.length,
      images,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        images: [],
        message: 'Unexpected error fetching inventory images',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

