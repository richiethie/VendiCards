import { NextRequest, NextResponse } from 'next/server';
import { shopifyClient } from '@/lib/shopify/storefront';
import { isShopifyEnabled } from '@/lib/env';

const GET_PRODUCTS_QUERY = `
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          descriptionHtml
          availableForSale
          productType
          vendor
          tags
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                id
                url
                altText
                width
                height
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                sku
                availableForSale
                quantityAvailable
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          options {
            id
            name
            values
          }
          createdAt
          updatedAt
          publishedAt
        }
      }
    }
  }
`;

const GET_COLLECTION_PRODUCTS_QUERY = `
  query getCollectionProducts($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      id
      title
      handle
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            descriptionHtml
            availableForSale
            productType
            vendor
            tags
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 5) {
              edges {
                node {
                  id
                  url
                  altText
                  width
                  height
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  sku
                  availableForSale
                  quantityAvailable
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
            options {
              id
              name
              values
            }
            createdAt
            updatedAt
            publishedAt
          }
        }
      }
    }
  }
`;

export async function GET(request: NextRequest) {
  if (!isShopifyEnabled()) {
    return NextResponse.json({
      success: true,
      products: [],
      count: 0,
      message: 'Shopify is disabled',
    });
  }

  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const collection = searchParams.get('collection'); // e.g., 'pokemon-products', 'one-piece-products', 'accessories'

    // If collection is specified, query by collection
    if (collection) {
      try {
        // Try the provided handle first
        let result = await shopifyClient.request(GET_COLLECTION_PRODUCTS_QUERY, {
          handle: collection,
          first: Math.min(limit, 100), // Cap at 100 products
        }) as any;

        // If not found, try with capitalized first letter (Shopify sometimes uses this)
        if (!result.collection && collection.length > 0) {
          const capitalizedHandle = collection.charAt(0).toUpperCase() + collection.slice(1);
          if (capitalizedHandle !== collection) {
            try {
              result = await shopifyClient.request(GET_COLLECTION_PRODUCTS_QUERY, {
                handle: capitalizedHandle,
                first: Math.min(limit, 100),
              }) as any;
            } catch (e) {
              // Ignore and continue to fallback
            }
          }
        }

        if (!result.collection) {
          console.error(`Collection '${collection}' not found in Shopify`);
          // Fallback to all products if collection doesn't exist
          const allProductsResult = await shopifyClient.request(GET_PRODUCTS_QUERY, {
            first: Math.min(limit, 100),
          }) as any;
          const allProducts = allProductsResult.products.edges.map((edge: any) => edge.node);
          
          return NextResponse.json({
            success: true,
            products: allProducts,
            warning: `Collection '${collection}' not found, showing all products`,
            count: allProducts.length,
          });
        }

        const products = result.collection.products.edges.map((edge: any) => edge.node);

        return NextResponse.json({
          success: true,
          products,
          collection: {
            id: result.collection.id,
            title: result.collection.title,
            handle: result.collection.handle,
          },
          count: products.length,
        });
      } catch (collectionError: any) {
        console.error('Error fetching collection products:', collectionError);
        console.error('Collection handle attempted:', collection);
        
        // Fallback to all products on error
        try {
          const allProductsResult = await shopifyClient.request(GET_PRODUCTS_QUERY, {
            first: Math.min(limit, 100),
          }) as any;
          const allProducts = allProductsResult.products.edges.map((edge: any) => edge.node);
          
          return NextResponse.json({
            success: true,
            products: allProducts,
            warning: `Error loading collection '${collection}': ${collectionError.message || 'Unknown error'}. Showing all products.`,
            count: allProducts.length,
          });
        } catch (fallbackError) {
          throw collectionError; // Re-throw original error if fallback also fails
        }
      }
    }

    // Otherwise, fetch all products
    const result = await shopifyClient.request(GET_PRODUCTS_QUERY, {
      first: Math.min(limit, 100), // Cap at 100 products
    }) as any;

    const products = result.products.edges.map((edge: any) => edge.node);

    return NextResponse.json({
      success: true,
      products,
      count: products.length,
    });

  } catch (error) {
    console.error('Products API error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to fetch products' 
    }, { status: 500 });
  }
}
