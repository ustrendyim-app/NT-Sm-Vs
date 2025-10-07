import React, { useState, useEffect } from 'react'
import { Card, Text, Stack, Button, ButtonGroup } from '@shopify/polaris'
import ColorSwatch from './ColorSwatch'
import SizeSelector from './SizeSelector'
import VariantImage from './VariantImage'
import PriceDisplay from './PriceDisplay'

const VariantVisualizer = ({ 
  product, 
  position = 'above_price',
  style = { layout: 'horizontal', size: 'medium' },
  onVariantChange,
  showPrice = true,
  enableCustomization = false 
}) => {
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [selectedOptions, setSelectedOptions] = useState({})
  
  useEffect(() => {
    if (product && product.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0])
      
      // Initialize selected options with first variant
      const firstVariant = product.variants[0]
      if (firstVariant.selectedOptions) {
        const options = {}
        firstVariant.selectedOptions.forEach(option => {
          options[option.name] = option.value
        })
        setSelectedOptions(options)
      }
    }
  }, [product])

  const handleOptionChange = (optionName, value) => {
    const newOptions = { ...selectedOptions, [optionName]: value }
    setSelectedOptions(newOptions)
    
    // Find matching variant
    const matchingVariant = product.variants.find(variant => {
      return variant.selectedOptions.every(option => 
        newOptions[option.name] === option.value
      )
    })
    
    if (matchingVariant) {
      setSelectedVariant(matchingVariant)
      if (onVariantChange) {
        onVariantChange(matchingVariant)
      }
    }
  }

  const getVariantOptions = () => {
    if (!product || !product.variants) return {}
    
    const options = {}
    product.variants.forEach(variant => {
      variant.selectedOptions.forEach(option => {
        if (!options[option.name]) {
          options[option.name] = new Set()
        }
        options[option.name].add(option.value)
      })
    })
    
    // Convert sets to arrays
    Object.keys(options).forEach(key => {
      options[key] = Array.from(options[key])
    })
    
    return options
  }

  const detectOptionType = (optionName, values) => {
    const name = optionName.toLowerCase()
    
    if (name.includes('color') || name.includes('colour')) return 'color'
    if (name.includes('size')) return 'size'
    if (name.includes('material') || name.includes('fabric')) return 'material'
    if (name.includes('style') || name.includes('type')) return 'style'
    
    // Smart detection based on values
    if (values.some(v => /^(xs|s|m|l|xl|xxl|\d+|\d+\.\d+)$/i.test(v))) return 'size'
    if (values.some(v => /^#[0-9a-f]{6}$/i.test(v) || 
                     ['red', 'blue', 'green', 'black', 'white', 'yellow', 'pink', 'purple'].includes(v.toLowerCase()))) {
      return 'color'
    }
    
    return 'text'
  }

  const renderOptionSelector = (optionName, values, type) => {
    const props = {
      key: optionName,
      label: optionName,
      options: values,
      selected: selectedOptions[optionName],
      onChange: (value) => handleOptionChange(optionName, value),
      size: style.size || 'medium'
    }

    switch (type) {
      case 'color':
        return <ColorSwatch {...props} />
      case 'size':
        return <SizeSelector {...props} />
      default:
        return (
          <div key={optionName} className="nextgen-option-group">
            <Text variant="bodyMd" as="p" fontWeight="semibold">
              {optionName}
            </Text>
            <div style={{ marginTop: '0.5rem' }}>
              <ButtonGroup segmented>
                {values.map(value => (
                  <Button
                    key={value}
                    pressed={selectedOptions[optionName] === value}
                    onClick={() => handleOptionChange(optionName, value)}
                    size={style.size === 'large' ? 'medium' : 'slim'}
                  >
                    {value}
                  </Button>
                ))}
              </ButtonGroup>
            </div>
          </div>
        )
    }
  }

  if (!product) {
    return (
      <Card sectioned>
        <div style={{ textAlign: 'center', padding: '1rem' }}>
          <Text variant="bodyMd" color="subdued">
            No product data available
          </Text>
        </div>
      </Card>
    )
  }

  const options = getVariantOptions()
  const hasVariants = Object.keys(options).length > 0
  
  if (!hasVariants) {
    return null // Don't render if no variants
  }

  const layoutStyle = style.layout === 'vertical' ? 
    { flexDirection: 'column', gap: '1rem' } :
    { display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }

  const containerClass = `nextgen-variant-visualizer nextgen-${style.layout || 'horizontal'} nextgen-${style.size || 'medium'}`

  return (
    <div className={containerClass} style={{ margin: style.spacing ? `${style.spacing}px 0` : '1rem 0' }}>
      {/* Variant Image (if available) */}
      {selectedVariant?.image && (
        <VariantImage 
          image={selectedVariant.image}
          alt={selectedVariant.title}
          size={style.size}
        />
      )}

      {/* Variant Options */}
      <div style={layoutStyle}>
        {Object.entries(options).map(([optionName, values]) => {
          const type = detectOptionType(optionName, values)
          return renderOptionSelector(optionName, values, type)
        })}
      </div>

      {/* Price Display */}
      {showPrice && selectedVariant && (
        <PriceDisplay 
          variant={selectedVariant}
          position={position}
          style={style}
        />
      )}

      {/* App Attribution */}
      <div className="nextgen-attribution" style={{ 
        fontSize: '10px', 
        color: '#999', 
        textAlign: 'center',
        marginTop: '0.5rem'
      }}>
        Powered by NextGen Smart Variants
      </div>
    </div>
  )
}

export default VariantVisualizer