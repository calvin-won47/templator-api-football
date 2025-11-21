
import React from 'react'
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

const App: React.FC = () => {
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
  