import React from 'react'
import { Text, Button, ButtonGroup } from '@shopify/polaris'

const SizeSelector = ({ label, options, selected, onChange, size = 'medium' }) => {
  const getSizeOrder = (sizes) => {
    // Common size ordering
    const sizeOrder = ['xxs', 'xs', 's', 'small', 'm', 'medium', 'l', 'large', 'xl', 'xxl', 'xxxl']
    const numericSizes = []
    const textSizes = []
    
    sizes.forEach(sizeValue => {
      const lower = sizeValue.toLowerCase()
      if (/^\d+(\.\d+)?$/.test(sizeValue)) {
        numericSizes.push(parseFloat(sizeValue))
      } else if (sizeOrder.includes(lower)) {
        textSizes.push({ value: sizeValue, order: sizeOrder.indexOf(lower) })
      } else {
        textSizes.push({ value: sizeValue, order: 999 })
      }
    })
    
    // Sort numeric sizes
    numericSizes.sort((a, b) => a - b)
    
    // Sort text sizes by predefined order
    textSizes.sort((a, b) => a.order - b.order)
    
    // Combine: text sizes first, then numeric
    return [...textSizes.map(s => s.value), ...numericSizes.map(n => n.toString())]
  }

  const getButtonSize = (componentSize) => {
    switch (componentSize) {
      case 'small':
        return 'slim'
      case 'large':
        return 'medium'
      default:
        return 'slim'
    }
  }

  const orderedSizes = getSizeOrder(options)
  const buttonSize = getButtonSize(size)

  return (
    <div className="nextgen-size-selector-group">
      <Text variant="bodyMd" as="p" fontWeight="semibold" color="subdued">
        {label}
      </Text>
      
      <div style={{ marginTop: '0.5rem' }}>
        <ButtonGroup segmented>
          {orderedSizes.map(sizeValue => (
            <Button
              key={sizeValue}
              pressed={selected === sizeValue}
              onClick={() => onChange(sizeValue)}
              size={buttonSize}
              outline={selected !== sizeValue}
            >
              {sizeValue.toUpperCase()}
            </Button>
          ))}
        </ButtonGroup>
      </div>

      {/* Size guide hint */}
      {selected && (
        <div style={{ marginTop: '0.5rem' }}>
          <Text variant="bodySm" as="p" color="subdued">
            Selected: {selected.toUpperCase()}
          </Text>
        </div>
      )}
    </div>
  )
}

export default SizeSelector