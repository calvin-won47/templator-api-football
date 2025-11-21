
import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import TrustedBy from './components/TrustedBy'
import Features from './components/Features'
import WhyUs from './components/WhyUs'
import GetStarted from './components/GetStarted'
import Footer from './components/Footer'
import BlogList from './pages/BlogList'
import BlogDetail from './pages/BlogDetail'
import { useConfig } from './contexts/ConfigContext'

const App: React.FC = () => {
  const config = useConfig()
  useEffect(() => {
    const title = config?.basic?.seo?.title || config?.basic?.app_name || document.title
    document.title = title
    const descValue = config?.basic?.seo?.description || ''
    const keywordsValue = config?.basic?.seo?.keywords || ''
    let desc = document.querySelector('meta[name="description"]')
    if (!desc) {
      desc = document.createElement('meta')
      desc.setAttribute('name', 'description')
      document.head.appendChild(desc)
    }
    desc.setAttribute('content', descValue)
    let keywords = document.querySelector('meta[name="keywords"]')
    if (!keywords) {
      keywords = document.createElement('meta')
      keywords.setAttribute('name', 'keywords')
      document.head.appendChild(keywords)
    }
    keywords.setAttribute('content', keywordsValue)
  }, [config])
  return (
    <div className="bg-api-dark min-h-screen">
      <Header />
      <Routes>
        <Route
          path="/"
          element={(
            <main>
              <Hero />
              <TrustedBy />
              <Features />
              <WhyUs />
              <GetStarted />
            </main>
          )}
        />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
  