// NextGen Smart Variants - Product Model
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  // Shopify product data
  shopifyProductId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  title: {
    type: String,
    required: true
  },
  handle: {
    type: String,
    required: true
  },
  description: String,
  vendor: String,
  productType: String,
  tags: [String],
  collections: [{
    id: String,
    title: String,
    handle: String
  }],
  
  // NextGen Smart Variants specific data
  variantDetectionEnabled: {
    type: Boolean,
    default: true
  },
  detectedVariantTypes: [{
    type: {
      type: String,
      enum: ['color', 'size', 'material', 'style', 'custom']
    },
    name: String,
    values: [String],
    confidence: {
      type: Number,
      min: 0,
      max: 1
    },
    autoDetected: {
      type: Boolean,
      default: true
    }
  }],
  
  // Display settings
  displaySettings: {
    enabled: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      enum: ['above_price', 'below_price', 'above_title', 'below_title', 'custom'],
      default: 'above_price'
    },
    style: {
      layout: {
        type: String,
        enum: ['horizontal', 'vertical', 'grid'],
        default: 'horizontal'
      },
      size: {
        type: String,
        enum: ['small', 'medium', 'large'],
        default: 'medium'
      },
      spacing: {
        type: Number,
        default: 8
      }
    },
    customCSS: String
  },
  
  // Image management
  imageSettings: {
    useProductImages: {
      type: Boolean,
      default: true
    },
    customIcons: [{
      variantType: String,
      variantValue: String,
      imageUrl: String,
      iconType: {
        type: String,
        enum: ['uploaded', 'color_swatch', 'icon', 'text']
      },
      color: String, // for color swatches
      uploadedAt: Date
    }]
  },
  
  // Processing status
  processingStatus: {
    lastProcessed: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'error'],
      default: 'pending'
    },
    errorMessage: String,
    autoProcessEnabled: {
      type: Boolean,
      default: true
    }
  },
  
  // Shopify integration
  shopifyData: {
    createdAt: Date,
    updatedAt: Date,
    publishedAt: Date,
    status: String,
    totalVariants: {
      type: Number,
      default: 0
    },
    images: [{
      id: String,
      src: String,
      altText: String,
      variantIds: [String]
    }]
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
productSchema.index({ shopifyProductId: 1 });
productSchema.index({ 'collections.id': 1 });
productSchema.index({ productType: 1 });
productSchema.index({ vendor: 1 });
productSchema.index({ 'processingStatus.status': 1 });
productSchema.index({ 'displaySettings.enabled': 1 });

// Virtual for variant count
productSchema.virtual('variantCount').get(function() {
  return this.shopifyData.totalVariants || 0;
});

// Virtual for detection status
productSchema.virtual('detectionComplete').get(function() {
  return this.processingStatus.status === 'completed';
});

// Methods
productSchema.methods.updateProcessingStatus = function(status, errorMessage = null) {
  this.processingStatus.status = status;
  this.processingStatus.lastProcessed = new Date();
  if (errorMessage) {
    this.processingStatus.errorMessage = errorMessage;
  }
  return this.save();
};

productSchema.methods.addDetectedVariantType = function(type, name, values, confidence = 1.0) {
  const existingType = this.detectedVariantTypes.find(vt => vt.type === type && vt.name === name);
  
  if (existingType) {
    existingType.values = [...new Set([...existingType.values, ...values])];
    existingType.confidence = confidence;
  } else {
    this.detectedVariantTypes.push({
      type,
      name,
      values,
      confidence,
      autoDetected: true
    });
  }
  
  return this.save();
};

productSchema.methods.enableDisplay = function(position = 'above_price') {
  this.displaySettings.enabled = true;
  this.displaySettings.position = position;
  return this.save();
};

productSchema.methods.addCustomIcon = function(variantType, variantValue, imageUrl, iconType, color = null) {
  const existingIcon = this.imageSettings.customIcons.find(
    icon => icon.variantType === variantType && icon.variantValue === variantValue
  );
  
  if (existingIcon) {
    existingIcon.imageUrl = imageUrl;
    existingIcon.iconType = iconType;
    existingIcon.color = color;
    existingIcon.uploadedAt = new Date();
  } else {
    this.imageSettings.customIcons.push({
      variantType,
      variantValue,
      imageUrl,
      iconType,
      color,
      uploadedAt: new Date()
    });
  }
  
  return this.save();
};

// Static methods
productSchema.statics.findByShopifyId = function(shopifyProductId) {
  return this.findOne({ shopifyProductId });
};

productSchema.statics.findByCollection = function(collectionId) {
  return this.find({ 'collections.id': collectionId });
};

productSchema.statics.findWithDisplayEnabled = function() {
  return this.find({ 'displaySettings.enabled': true });
};

productSchema.statics.findPendingProcessing = function() {
  return this.find({ 
    'processingStatus.status': { $in: ['pending', 'error'] },
    'processingStatus.autoProcessEnabled': true
  });
};

// Pre-save middleware
productSchema.pre('save', function(next) {
  if (this.isModified('detectedVariantTypes') || this.isModified('displaySettings')) {
    this.processingStatus.lastProcessed = new Date();
  }
  next();
});

// Export model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;