import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { NewsletterProvider } from './contexts/NewsletterContext'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import CreateNewsletter from './pages/CreateNewsletter'
import NewsletterList from './pages/NewsletterList'
import NewsletterView from './pages/NewsletterView'
import Settings from './pages/Settings'

function App() {
  return (
    <NewsletterProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<CreateNewsletter />} />
          <Route path="/newsletters" element={<NewsletterList />} />
          <Route path="/newsletter/:id" element={<NewsletterView />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </NewsletterProvider>
  )
}

export default App