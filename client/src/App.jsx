import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppProvider } from '@shopify/polaris'
import '@shopify/polaris/build/esm/styles.css'

// Import pages
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Settings from './pages/Settings'
import Collections from './pages/Collections'
import VariantTypes from './pages/VariantTypes'
import Preview from './pages/Preview'

// Import components
import Layout from './components/Layout'
import LoadingPage from './components/LoadingPage'

// Import styles
import './styles/App.css'

function App() {
  return (
    <AppProvider 
      i18n={{}}
      features={{newDesignLanguage: true}}
    >
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/variant-types" element={<VariantTypes />} />
            <Route path="/preview" element={<Preview />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/loading" element={<LoadingPage />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  )
}

export default App