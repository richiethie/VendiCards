import { NextResponse } from 'next/server';
import { env } from '@/lib/env';

interface CloudinaryResource {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  created_at: string;
  format: string;
  resource_type?: 'image' | 'video' | 'raw';
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

    const fetchResources = async (
      resourceType: 'image' | 'video',
      mode: 'by_asset_folder' | 'prefix'
    ): Promise<CloudinaryResource[]> => {
      if (mode === 'by_asset_folder') {
        for (const folderVariant of folderVariants) {
          const byFolderUrl = new URL(
            `https://api.cloudinary.com/v1_1/${cloudName}/resources/by_asset_folder/${encodeURIComponent(folderVariant)}`
          );
          byFolderUrl.searchParams.set('resource_type', resourceType);
          byFolderUrl.searchParams.set('max_results', '100');
          byFolderUrl.searchParams.set('direction', 'desc');

          const response = await fetch(byFolderUrl.toString(), requestOptions);
          if (response.ok) {
            const data = await response.json();
            const byFolderResources = (data.resources || []) as CloudinaryResource[];
            if (byFolderResources.length > 0) return byFolderResources;
          }
        }
        return [];
      }

      const prefixUrl = new URL(`https://api.cloudinary.com/v1_1/${cloudName}/resources/${resourceType}/upload`);
      prefixUrl.searchParams.set('prefix', `${folder}/`);
      prefixUrl.searchParams.set('max_results', '100');
      prefixUrl.searchParams.set('direction', 'desc');

      const response = await fetch(prefixUrl.toString(), requestOptions);
      if (!response.ok) return [];
      const data = await response.json();
      return (data.resources || []) as CloudinaryResource[];
    };

    // First attempt: exact folder lookup across images + videos
    let resources: CloudinaryResource[] = [];
    const folderVariants = Array.from(new Set([folder, folder.toLowerCase(), folder.toUpperCase()]));
    const imageByFolder = await fetchResources('image', 'by_asset_folder');
    const videoByFolder = await fetchResources('video', 'by_asset_folder');
    resources = [...imageByFolder, ...videoByFolder];

    if (resources.length === 0) {
      // Fallback: prefix lookup across images + videos
      const imageByPrefix = await fetchResources('image', 'prefix');
      const videoByPrefix = await fetchResources('video', 'prefix');
      resources = [...imageByPrefix, ...videoByPrefix];
    }

    // Final fallback: fetch recent media and filter by Cloudinary folder metadata.
    // This handles cases where public_id stays unchanged after moving assets in UI.
    if (resources.length === 0) {
      const fetchRecent = async (resourceType: 'image' | 'video') => {
        const url = new URL(`https://api.cloudinary.com/v1_1/${cloudName}/resources/${resourceType}/upload`);
        url.searchParams.set('max_results', '200');
        url.searchParams.set('direction', 'desc');
        const response = await fetch(url.toString(), requestOptions);
        if (!response.ok) return [] as CloudinaryResource[];
        const data = await response.json();
        return (data.resources || []) as CloudinaryResource[];
      };

      const allResources = [...(await fetchRecent('image')), ...(await fetchRecent('video'))];
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

    const media = resources
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .map((resource) => ({
      id: resource.public_id,
      publicId: resource.public_id,
      url: resource.secure_url,
      width: resource.width,
      height: resource.height,
      createdAt: resource.created_at,
      format: resource.format,
      resourceType: resource.resource_type || 'image',
    }));

    return NextResponse.json({
      success: true,
      folder,
      configuredFolder: rawFolder,
      count: media.length,
      images: media,
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

