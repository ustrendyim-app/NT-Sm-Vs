import React, { useState } from 'react'

const VariantImage = ({ image, alt, size = 'medium', onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const getSizeStyles = (size) => {
    switch (size) {
      case 'small':
        return { width: '50px', height: '50px' }
      case 'large':
        return { width: '100px', height: '100px' }
      default:
        return { width: '75px', height: '75px' }
    }
  }

  const sizeStyles = getSizeStyles(size)

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const handleImageError = () => {
    setImageError(true)
    setImageLoaded(false)
  }

  const handleClick = () => {
    if (onClick) {
      onClick(image)
    }
  }

  if (imageError || !image) {
    // Fallback placeholder
    return (
      <div
        className="nextgen-variant-image-placeholder"
        style={{
          ...sizeStyles,
          backgroundColor: '#f6f6f7',
          border: '1px solid #e1e5e9',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#6d7175',
          fontSize: size === 'small' ? '10px' : '12px',
          cursor: onClick ? 'pointer' : 'default'
        }}
        onClick={handleClick}
      >
        No Image
      </div>
    )
  }

  return (
    <div 
      className="nextgen-variant-image-container"
      style={{
        ...sizeStyles,
        position: 'relative',
        borderRadius: '8px',
        overflow: 'hidden',
        cursor: onClick ? 'pointer' : 'default'
      }}
      onClick={handleClick}
    >
      {/* Loading placeholder */}
      {!imageLoaded && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#f6f6f7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1
          }}
        >
          <div
            style={{
              width: '20px',
              height: '20px',
              border: '2px solid #e1e5e9',
              borderTop: '2px solid #6366f1',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}
          />
        </div>
      )}
      
      {/* Actual image */}
      <img
        src={typeof image === 'string' ? image : image.url || image.src}
        alt={alt || 'Variant image'}
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: imageLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
      />
      
      {/* Hover overlay */}
      {onClick && (
        <div
          className="nextgen-variant-image-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0)',
            transition: 'background-color 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'
            e.target.style.opacity = 1
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'rgba(0, 0, 0, 0)'
            e.target.style.opacity = 0
          }}
        >
          <span style={{ color: 'white', fontSize: '12px', fontWeight: 'bold' }}>
            View
          </span>
        </div>
      )}
    </div>
  )
}

// Add CSS animation for loading spinner
const styles = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style')
  styleSheet.textContent = styles
  document.head.appendChild(styleSheet)
}

export default VariantImage