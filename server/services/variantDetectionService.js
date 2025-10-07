// NextGen Smart Variants - Variant Detection Service
const Product = require('../models/Product');

class VariantDetectionService {
  async processAllProducts() {
    console.log('🔄 Processing all products for variant detection...');
    
    const products = await Product.findPendingProcessing();
    console.log(`Found ${products.length} products to process`);
    
    for (const product of products) {
      try {
        await this.processProduct(product);
      } catch (error) {
        console.error(`Failed to process product ${product.shopifyProductId}:`, error);
      }
    }
    
    return { processedCount: products.length };
  }

  async processProduct(product) {
    await product.updateProcessingStatus('processing');
    
    // Simulate variant detection processing
    console.log(`Processing product: ${product.title}`);
    
    await product.updateProcessingStatus('completed');
    return product;
  }
}

module.exports = new VariantDetectionService();