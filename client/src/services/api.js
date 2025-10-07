import axios from 'axios'

// API Base URL
const API_BASE_URL = import.meta.env.DEV 
  ? 'http://localhost:3001/api' 
  : '/api'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('shopify_access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // Add NextGen specific headers
    config.headers['X-App-ID'] = '285217980417'
    config.headers['X-App-Name'] = 'NextGen Smart Variants'
    
    console.log('API Request:', config.method?.toUpperCase(), config.url, config.data)
    return config
  },
  (error) => {
    console.error('API Request Error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url, response.data)
    return response
  },
  (error) => {
    console.error('API Response Error:', error.response?.status, error.response?.data || error.message)
    
    // Handle common errors
    if (error.response?.status === 401) {
      localStorage.removeItem('shopify_access_token')
      // Could trigger logout here
    }
    
    return Promise.reject(error)
  }
)

// API Methods
export const apiService = {
  // Dashboard
  getDashboard: () => api.get('/dashboard'),
  getDashboardStats: () => api.get('/dashboard/stats'),
  
  // Products
  getProducts: (params = {}) => api.get('/dashboard/products', { params }),
  syncProducts: (data = {}) => api.post('/dashboard/sync', data),
  
  // Collections
  getCollections: () => api.get('/dashboard/collections'),
  
  // Variants
  getVariants: (params = {}) => api.get('/variants', { params }),
  
  // Settings
  getSettings: () => api.get('/settings'),
  updateSettings: (data) => api.put('/settings', data),
  
  // Uploads
  uploadImage: (formData) => api.post('/uploads', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
  
  // Health & Info
  getHealth: () => api.get('/health'),
  getInfo: () => api.get('/info'),
}

// Helper functions
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    return {
      message: error.response.data.message || 'An error occurred',
      status: error.response.status,
      data: error.response.data
    }
  } else if (error.request) {
    // Request was made but no response
    return {
      message: 'Network error - please check your connection',
      status: 0,
      data: null
    }
  } else {
    // Something else happened
    return {
      message: error.message || 'An unexpected error occurred',
      status: 0,
      data: null
    }
  }
}

export default api