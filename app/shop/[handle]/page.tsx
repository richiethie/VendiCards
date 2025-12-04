import { Metadata } from 'next'
import { getProductByHandle } from '@/lib/shopify/storefront'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import AddToCartButton from '@/components/AddToCartButton'
import ProductGallery from '@/components/ProductGallery'
import { Image as ShopifyImage } from '@/types/shopify'

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

  const images = product.images.edges.map((edge: { node: ShopifyImage }) => edge.node)
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
          {/* Product Image Gallery */}
          <div className="space-y-6">
            <ProductGallery images={images} />
          </div>

          {/* Product Info */}
          <div className="space-y-6 lg:sticky lg:top-8 lg:self-start">
            {/* Stock Alert */}
            {quantityAvailable !== undefined && quantityAvailable > 0 && quantityAvailable <= 5 && (
              <div className="flex items-center gap-2 text-red-400">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Only {quantityAvailable} {quantityAvailable === 1 ? 'unit' : 'units'} left</span>
              </div>
            )}

            {/* Product Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
              {product.title}
            </h1>

            {/* Price */}
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-white">
                ${parseFloat(firstVariant?.price?.amount || '0').toFixed(2)}
              </div>
              {firstVariant?.price?.currencyCode && (
                <span className="text-sm text-gray-400 ml-2">{firstVariant.price.currencyCode}</span>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <AddToCartButton
                variants={product.variants.edges.map((edge: any) => edge.node)}
                product={product}
                className="w-full"
              />
            </div>

            {/* Shipping/Stock Information */}
            <div className="space-y-3 pt-4 border-t border-gray-800">
              {quantityAvailable !== undefined && quantityAvailable > 0 && quantityAvailable <= 5 && (
                <div className="flex items-center gap-2 text-red-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-sm font-medium">Limited Stock</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <span className="text-sm font-medium">Ships within 24 hours</span>
              </div>
            </div>

            {/* Collapsible Sections */}
            <div className="space-y-2 pt-4 border-t border-gray-800">
              {/* Description */}
              {product.description && (
                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer py-3 text-white font-medium hover:text-gray-300 transition-colors">
                    <span>Description</span>
                    <svg className="w-5 h-5 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="pt-3 pb-4">
                    <div 
                      className="text-gray-300 prose prose-sm prose-invert max-w-none leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                    />
                  </div>
                </details>
              )}

              {/* Authenticity & Guarantee */}
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer py-3 text-white font-medium hover:text-gray-300 transition-colors">
                  <span>Authenticity & Guarantee</span>
                  <svg className="w-5 h-5 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="pt-3 pb-4 text-gray-300 text-sm leading-relaxed">
                  <p className="mb-3">
                    All our products are guaranteed authentic and carefully inspected before shipping. 
                    We offer secure packaging and fast, reliable delivery.
                  </p>
                  <p>
                    Every card is verified for authenticity and condition before being listed. 
                    We stand behind the quality of every item in our collection.
                  </p>
                </div>
              </details>

              {/* Shipping & Returns */}
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer py-3 text-white font-medium hover:text-gray-300 transition-colors">
                  <span>Shipping & Returns</span>
                  <svg className="w-5 h-5 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="pt-3 pb-4 text-gray-300 text-sm leading-relaxed space-y-2">
                  <p>
                    <strong className="text-white">Shipping:</strong> Most orders are processed and shipped within 1–3 business days. 
                    Tracking is provided with every order.
                  </p>
                  <p>
                    <strong className="text-white">Returns:</strong> Refunds are accepted for graded and raw cards if the item does not match the description. 
                    Please contact us within 7 days of receiving your order to initiate a return.
                  </p>
                  <Link href="/returns" className="text-red-400 hover:text-red-300 underline">
                    View full returns policy
                  </Link>
                </div>
              </details>
            </div>

            {/* Contact Information */}
            <div className="pt-4 border-t border-gray-800">
              <div className="flex items-center gap-2 text-gray-400 mb-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium">Have a question?</span>
              </div>
              <Link 
                href="/contact"
                className="text-sm text-red-400 hover:text-red-300 transition-colors underline"
              >
                Contact us here anytime.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}