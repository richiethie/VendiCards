import { NextRequest, NextResponse } from 'next/server';
import { shopifyClient } from '@/lib/shopify/storefront';
import { isShopifyEnabled } from '@/lib/env';

const GET_COLLECTIONS_QUERY = `
  query getCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
        }
      }
    }
  }
`;

export async function GET(request: NextRequest) {
  if (!isShopifyEnabled()) {
    return NextResponse.json({
      success: true,
      collections: [],
      count: 0,
      message: 'Shopify is disabled',
    });
  }

  try {
    const result = await shopifyClient.request(GET_COLLECTIONS_QUERY, {
      first: 50,
    }) as any;

    const collections = result.collections.edges.map((edge: any) => edge.node);

    return NextResponse.json({
      success: true,
      collections,
      count: collections.length,
    });

  } catch (error) {
    console.error('Collections API error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to fetch collections',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

