import { Metadata } from 'next'
import { getProductByHandle } from '@/lib/shopify/storefront'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import AddToCartButton from '@/components/AddToCartButton'

interface ProductPageProps {
  params: Promise<{
    handle: string
  }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  try {
    const resolvedParams = await params
    const product = await getProductByHandle(resolvedParams.handle)
    if (!product) {
      return {
        title: 'Product Not Found - VendiCards',
        description: 'The requested product could not be found.'
      }
    }

    return {
      title: `${product.title} - VendiCards`,
      description: product.description || `View details for ${product.title}`,
    }
  } catch (error) {
    return {
      title: 'Product - VendiCards',
      description: 'Product details'
    }
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  let product = null
  let error = null

  try {
    const resolvedParams = await params
    product = await getProductByHandle(resolvedParams.handle)
    if (!product) {
      notFound()
    }
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load product'
    console.error('Failed to load product:', err)
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto px-6 text-center">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="w-16 h-16 mx-auto mb-6 bg-red-50 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Error Loading Product</h1>
            <p className="text-gray-600 mb-6">Sorry, we couldn't load this product right now.</p>
            <Link 
              href="/shop"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Back to Shop
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const firstImage = product.images.edges[0]?.node
  const firstVariant = product.variants.edges[0]?.node
  const isAvailable = product.availableForSale && firstVariant?.availableForSale
  const quantityAvailable = firstVariant?.quantityAvailable



  return (
    <div className="min-h-screen bg-[#0e0f11]">
      {/* Breadcrumb with Image */}
      <div className="relative bg-[#0e0f11] shadow-sm border-b border-gray-800 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/background-1.png"
            alt="Product Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e0f11] via-[#0e0f11]/80 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-red-400 transition-colors font-medium">
              Home
            </Link>
            <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <Link href="/shop" className="hover:text-red-400 transition-colors font-medium">
              Shop
            </Link>
            <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-white font-medium truncate max-w-xs">{product.title}</span>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Product Image */}
          <div className="space-y-6">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-800 overflow-hidden">
              {firstImage ? (
                <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 p-8">
                  <Image
                    src={firstImage.url}
                    alt={firstImage.altText || product.title}
                    width={600}
                    height={600}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>
              ) : (
                <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <svg className="w-24 h-24 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                {product.productType && (
                  <span className="inline-block px-3 py-1 bg-red-500/10 text-white text-sm font-medium rounded-full border border-red-500/30">
                    {product.productType}
                  </span>
                )}
                
            {/* Single Availability Status */}
            {quantityAvailable !== undefined ? (
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${
                  quantityAvailable > 0 
                    ? quantityAvailable <= 5
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      : 'bg-green-500/10 text-green-400 border-green-500/30'
                    : 'bg-red-500/10 text-red-400 border-red-500/30'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    quantityAvailable > 0 
                      ? quantityAvailable <= 5 ? 'bg-amber-500' : 'bg-green-500'
                      : 'bg-red-500'
                  }`}></div>
                  {quantityAvailable > 0 
                    ? quantityAvailable <= 5 
                      ? `${quantityAvailable} Available` 
                      : 'In Stock'
                    : 'Out of Stock'
                  }
                </span>
              </div>
            ) : (
              <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${
                isAvailable 
                  ? 'bg-green-500/10 text-green-400 border-green-500/30'
                  : 'bg-red-500/10 text-red-400 border-red-500/30'
              }`}>
                <div className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-green-500' : 'bg-red-500'}`}></div>
                {isAvailable ? 'In Stock' : 'Out of Stock'}
              </span>
            )}
            

              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                {product.title}
              </h1>
               
              {product.vendor && (
                <p className="text-lg text-gray-600">
                  by <span className="font-medium text-gray-700">{product.vendor}</span>
                </p>
              )}
            </div>

            {/* Price */}
            <div className="lg:bg-gray-900/50 lg:backdrop-blur-sm lg:rounded-xl lg:p-6 lg:border lg:border-gray-800">
              <div className="text-3xl lg:text-4xl font-bold text-white">
                ${parseFloat(firstVariant?.price?.amount || '0').toFixed(2)}
              </div>
              <p className="text-sm text-gray-400 mt-1">Price may not include all applicable fees</p>
            </div>

            {/* Description */}
            {product.description && (
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-white">Description</h3>
                <div 
                  className="text-gray-300 prose prose-sm prose-invert max-w-none leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                />
              </div>
            )}

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-white">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag: string) => (
                    <span 
                      key={tag}
                      className="px-3 py-1.5 bg-gray-800 text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors border border-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-4 pt-4">
              <AddToCartButton
                variants={product.variants.edges.map((edge: any) => edge.node)}
                // options={product.options || []}
                product={product}
                className="w-full"
              />
              
              <div className="flex gap-4">
                <Link
                  href="/shop"
                  className="flex-1 text-center py-3 px-6 text-nowrap border border-gray-700 text-gray-300 font-medium rounded-xl hover:bg-gray-800 hover:border-gray-600 transition-colors"
                >
                  Continue Shopping
                </Link>
                <Link href="/shop/cart" className="flex-1 cursor-pointer text-center py-3 px-6 border border-blue-300 text-blue-400 font-medium rounded-xl hover:bg-blue-200 hover:border-blue-400 transition-colors">
                  Go to Cart
                </Link>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-blue-100 border border-blue-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">Authentic Collectibles</h4>
                  <p className="text-blue-800 text-sm leading-relaxed">
                    All our products are guaranteed authentic and carefully inspected before shipping. 
                    We offer secure packaging and fast, reliable delivery.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}