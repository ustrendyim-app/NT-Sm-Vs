// NextGen Smart Variants - Dashboard Routes
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const shopifyService = require('../services/shopifyService');

// GET /api/dashboard - Dashboard overview
router.get('/', async (req, res) => {
  try {
    const stats = await getDashboardStats();
    
    res.json({
      app: 'NextGen Smart Variants',
      appId: '285217980417',
      timestamp: new Date().toISOString(),
      stats,
      success: true
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch dashboard data',
      message: error.message,
      app: 'NextGen Smart Variants',
      appId: '285217980417'
    });
  }
});

// GET /api/dashboard/products - Get products with pagination
router.get('/products', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      status, 
      collection, 
      search 
    } = req.query;

    const filter = {};
    
    // Add filters
    if (status) {
      filter['processingStatus.status'] = status;
    }
    
    if (collection) {
      filter['collections.id'] = collection;
    }
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { handle: { $regex: search, $options: 'i' } },
        { vendor: { $regex: search, $options: 'i' } }
      ];
    }

    const products = await Product.find(filter)
      .sort({ updatedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Product.countDocuments(filter);

    res.json({
      products,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      },
      app: 'NextGen Smart Variants',
      success: true
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch products',
      message: error.message,
      app: 'NextGen Smart Variants'
    });
  }
});

// GET /api/dashboard/collections - Get collections
router.get('/collections', async (req, res) => {
  try {
    // Get collections from Shopify
    const collections = await shopifyService.getAllCollections(req.session);
    
    // Get product counts from local database
    const collectionsWithCounts = await Promise.all(
      collections.edges.map(async ({ node: collection }) => {
        const productCount = await Product.countDocuments({
          'collections.id': collection.id.replace('gid://shopify/Collection/', '')
        });
        
        return {
          ...collection,
          id: collection.id.replace('gid://shopify/Collection/', ''),
          localProductCount: productCount
        };
      })
    );

    res.json({
      collections: collectionsWithCounts,
      app: 'NextGen Smart Variants',
      success: true
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch collections',
      message: error.message,
      app: 'NextGen Smart Variants'
    });
  }
});

// GET /api/dashboard/stats - Get dashboard statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = await getDashboardStats();
    
    res.json({
      ...stats,
      app: 'NextGen Smart Variants',
      success: true
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch statistics',
      message: error.message,
      app: 'NextGen Smart Variants'
    });
  }
});

// POST /api/dashboard/sync - Sync products from Shopify
router.post('/sync', async (req, res) => {
  try {
    const { collection, force = false } = req.body;
    
    let syncedCount = 0;
    let errorCount = 0;
    
    if (collection) {
      // Sync specific collection
      const products = await shopifyService.getProductsByCollection(req.session, collection);
      
      for (const { node: shopifyProduct } of products.edges) {
        try {
          await syncProduct(shopifyProduct, force);
          syncedCount++;
        } catch (error) {
          console.error(`Failed to sync product ${shopifyProduct.id}:`, error);
          errorCount++;
        }
      }
    } else {
      // Sync all products
      let hasNextPage = true;
      let cursor = null;
      
      while (hasNextPage) {
        const products = await shopifyService.getAllProducts(req.session, 50, cursor);
        
        for (const { node: shopifyProduct } of products.edges) {
          try {
            await syncProduct(shopifyProduct, force);
            syncedCount++;
          } catch (error) {
            console.error(`Failed to sync product ${shopifyProduct.id}:`, error);
            errorCount++;
          }
        }
        
        hasNextPage = products.pageInfo.hasNextPage;
        cursor = products.pageInfo.endCursor;
        
        // Prevent infinite loops in development
        if (process.env.NODE_ENV === 'development' && syncedCount > 100) {
          break;
        }
      }
    }

    res.json({
      message: 'Product sync completed',
      syncedCount,
      errorCount,
      app: 'NextGen Smart Variants',
      success: true
    });
  } catch (error) {
    res.status(500).json({
      error: 'Sync failed',
      message: error.message,
      app: 'NextGen Smart Variants'
    });
  }
});

// Helper functions
async function getDashboardStats() {
  // Development mode mock stats
  if (process.env.NODE_ENV === 'development') {
    return {
      products: {
        total: 10,
        active: 7,
        pending: 2,
        completed: 8,
        errors: 0
      },
      variantTypes: {
        color: 15,
        size: 12,
        material: 5,
        style: 8
      },
      lastUpdated: new Date().toISOString()
    };
  }
  
  const [
    totalProducts,
    activeProducts,
    pendingProducts,
    completedProducts,
    errorProducts,
    totalVariantTypes
  ] = await Promise.all([
    Product.countDocuments(),
    Product.countDocuments({ 'displaySettings.enabled': true }),
    Product.countDocuments({ 'processingStatus.status': 'pending' }),
    Product.countDocuments({ 'processingStatus.status': 'completed' }),
    Product.countDocuments({ 'processingStatus.status': 'error' }),
    Product.aggregate([
      { $unwind: '$detectedVariantTypes' },
      { $group: { _id: '$detectedVariantTypes.type', count: { $sum: 1 } } }
    ])
  ]);

  return {
    products: {
      total: totalProducts,
      active: activeProducts,
      pending: pendingProducts,
      completed: completedProducts,
      errors: errorProducts
    },
    variantTypes: totalVariantTypes.reduce((acc, type) => {
      acc[type._id] = type.count;
      return acc;
    }, {}),
    lastUpdated: new Date().toISOString()
  };
}

async function syncProduct(shopifyProduct, force = false) {
  const productId = shopifyProduct.id.replace('gid://shopify/Product/', '');
  
  let product = await Product.findByShopifyId(productId);
  
  if (!product || force) {
    const productData = shopifyService.transformProduct(shopifyProduct);
    
    if (product) {
      // Update existing
      Object.assign(product, productData);
      await product.save();
    } else {
      // Create new
      product = new Product(productData);
      await product.save();
    }
    
    // Extract and save variant types
    const variantTypes = shopifyService.extractVariantTypes(shopifyProduct);
    
    for (const variantType of variantTypes) {
      await product.addDetectedVariantType(
        variantType.type,
        variantType.name,
        variantType.values,
        0.9 // confidence
      );
    }
  }
  
  return product;
}

module.exports = router;