import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Test from './Test'
import './index.css'

// Pages
import SearchPage from './pages/SearchPage'
import UploadPage from './pages/UploadPage'
import ResourceDetailPage from './pages/ResourceDetailPage'

function NotFound(){
  return <div className="min-h-screen flex items-center justify-center text-center p-6">
    <div>
      <h1 className="text-2xl font-semibold" style={{color:'var(--primary-800)'}}>Page not found</h1>
      <p className="text-muted mt-2">The page you are looking for does not exist.</p>
      <a href="/" className="btn btn-primary mt-6 inline-flex">Go Home</a>
    </div>
  </div>
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/r/:id" element={<ResourceDetailPage />} />
        <Route path="/test" element={<Test />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
