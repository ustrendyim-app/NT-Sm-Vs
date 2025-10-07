import React from 'react'
import { Text } from '@shopify/polaris'

const PriceDisplay = ({ variant, position = 'above_price', style = {} }) => {
  if (!variant) return null

  const formatPrice = (price) => {
    if (!price) return ''
    
    // Handle different price formats
    const numPrice = typeof price === 'string' ? parseFloat(price) : price
    if (isNaN(numPrice)) return price
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(numPrice)
  }

  const getPositionStyles = (position) => {
    switch (position) {
      case 'above_price':
        return { marginBottom: '0.5rem' }
      case 'below_price':
        return { marginTop: '0.5rem' }
      case 'above_title':
        return { marginBottom: '1rem' }
      case 'below_title':
        return { marginTop: '1rem' }
      default:
        return {}
    }
  }

  const getSizeStyles = (size) => {
    switch (size) {
      case 'small':
        return { fontSize: '14px' }
      case 'large':
        return { fontSize: '18px', fontWeight: 'bold' }
      default:
        return { fontSize: '16px' }
    }
  }

  const positionStyles = getPositionStyles(position)
  const sizeStyles = getSizeStyles(style.size)
  const hasCompareAtPrice = variant.compareAtPrice && 
                          parseFloat(variant.compareAtPrice) > parseFloat(variant.price)

  return (
    <div 
      className={`nextgen-price-display nextgen-price-${position}`}
      style={{
        ...positionStyles,
        ...sizeStyles,
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        flexWrap: 'wrap'
      }}
    >
      {/* Current Price */}
      <span 
        className="nextgen-current-price"
        style={{
          fontWeight: hasCompareAtPrice ? 'bold' : 'normal',
          color: hasCompareAtPrice ? '#d73502' : '#202223'
        }}
      >
        {formatPrice(variant.price)}
      </span>

      {/* Compare At Price (was price) */}
      {hasCompareAtPrice && (
        <>
          <span 
            className="nextgen-compare-price"
            style={{
              textDecoration: 'line-through',
              color: '#6d7175',
              fontSize: '0.9em'
            }}
          >
            {formatPrice(variant.compareAtPrice)}
          </span>
          
          {/* Savings badge */}
          <span 
            className="nextgen-savings-badge"
            style={{
              backgroundColor: '#d73502',
              color: 'white',
              padding: '2px 6px',
              borderRadius: '4px',
              fontSize: '0.8em',
              fontWeight: 'bold'
            }}
          >
            Save {Math.round(((parseFloat(variant.compareAtPrice) - parseFloat(variant.price)) / parseFloat(variant.compareAtPrice)) * 100)}%
          </span>
        </>
      )}

      {/* Stock status */}
      {variant.availableForSale !== undefined && (
        <span 
          className={`nextgen-stock-status ${variant.availableForSale ? 'in-stock' : 'out-of-stock'}`}
          style={{
            fontSize: '0.8em',
            color: variant.availableForSale ? '#008060' : '#bf0711',
            fontWeight: '500'
          }}
        >
          {variant.availableForSale ? '✓ In stock' : '✗ Out of stock'}
        </span>
      )}

      {/* SKU (if available) */}
      {variant.sku && (
        <span 
          className="nextgen-sku"
          style={{
            fontSize: '0.7em',
            color: '#6d7175',
            fontFamily: 'monospace'
          }}
        >
          SKU: {variant.sku}
        </span>
      )}
    </div>
  )
}

export default PriceDisplay