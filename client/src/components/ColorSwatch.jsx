import React from 'react'
import { Text } from '@shopify/polaris'

const ColorSwatch = ({ label, options, selected, onChange, size = 'medium' }) => {
  const getColorValue = (colorName) => {
    // Common color mappings
    const colorMap = {
      red: '#ff0000',
      blue: '#0000ff',
      green: '#00ff00',
      black: '#000000',
      white: '#ffffff',
      yellow: '#ffff00',
      pink: '#ffc0cb',
      purple: '#800080',
      orange: '#ffa500',
      gray: '#808080',
      grey: '#808080',
      brown: '#a52a2a',
      navy: '#000080',
      teal: '#008080',
      lime: '#00ff00',
      maroon: '#800000',
      olive: '#808000',
      silver: '#c0c0c0'
    }

    // Check if it's already a hex color
    if (colorName.startsWith('#')) {
      return colorName
    }
    
    // Look up in color map
    const lowerName = colorName.toLowerCase()
    return colorMap[lowerName] || '#cccccc' // Default gray if not found
  }

  const getSizeStyles = (size) => {
    switch (size) {
      case 'small':
        return { width: '24px', height: '24px' }
      case 'large':
        return { width: '40px', height: '40px' }
      default:
        return { width: '32px', height: '32px' }
    }
  }

  const sizeStyles = getSizeStyles(size)

  return (
    <div className="nextgen-color-swatch-group">
      <Text variant="bodyMd" as="p" fontWeight="semibold" color="subdued">
        {label}
      </Text>
      
      <div 
        className="nextgen-color-swatches"
        style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '0.5rem', 
          marginTop: '0.5rem' 
        }}
      >
        {options.map(colorName => {
          const colorValue = getColorValue(colorName)
          const isSelected = selected === colorName
          
          return (
            <button
              key={colorName}
              className={`nextgen-color-swatch ${isSelected ? 'selected' : ''}`}
              onClick={() => onChange(colorName)}
              title={colorName}
              style={{
                ...sizeStyles,
                backgroundColor: colorValue,
                border: isSelected ? '3px solid #6366f1' : '2px solid #e1e5e9',
                borderRadius: '50%',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                outline: 'none',
                position: 'relative',
                boxShadow: isSelected ? '0 0 0 2px rgba(99, 102, 241, 0.2)' : '0 1px 3px rgba(0, 0, 0, 0.1)',
                transform: isSelected ? 'scale(1.1)' : 'scale(1)'
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.target.style.transform = 'scale(1.05)'
                  e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.target.style.transform = 'scale(1)'
                  e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)'
                }
              }}
            >
              {/* White/light colors get a subtle border */}
              {(colorValue === '#ffffff' || colorValue.toLowerCase() === '#fff') && (
                <div style={{
                  position: 'absolute',
                  inset: '2px',
                  border: '1px solid #e1e5e9',
                  borderRadius: '50%',
                  pointerEvents: 'none'
                }} />
              )}
              
              {/* Selected indicator */}
              {isSelected && (
                <div style={{
                  position: 'absolute',
                  inset: '20%',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: size === 'large' ? '12px' : '10px',
                  fontWeight: 'bold',
                  color: '#6366f1'
                }}>
                  ✓
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Selected color name */}
      {selected && (
        <div style={{ marginTop: '0.5rem' }}>
          <Text variant="bodySm" as="p" color="subdued">
            Selected: {selected}
          </Text>
        </div>
      )}
    </div>
  )
}

export default ColorSwatch