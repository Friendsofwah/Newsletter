import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useNewsletter } from '../contexts/NewsletterContext'
import { 
  ArrowLeft, 
  Edit, 
  Share2, 
  Download, 
  Calendar,
  Clock,
  Eye,
  Mail,
  FileText,
  Printer
} from 'lucide-react'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

const NewsletterView = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getNewsletterById, updateNewsletter } = useNewsletter()
  const [newsletter, setNewsletter] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const foundNewsletter = getNewsletterById(id)
    if (foundNewsletter) {
      setNewsletter(foundNewsletter)
      // Increment view count
      updateNewsletter(id, { views: (foundNewsletter.views || 0) + 1 })
    } else {
      toast.error('Newsletter not found')
      navigate('/newsletters')
    }
    setIsLoading(false)
  }, [id, getNewsletterById, updateNewsletter, navigate])

  const handlePrint = () => {
    window.print()
  }

  const handleExport = async () => {
    try {
      // Simple export as HTML
      const content = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>${newsletter.title}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
            h1 { color: #1f2937; border-bottom: 2px solid #0ea5e9; padding-bottom: 10px; }
            h2 { color: #374151; margin-top: 30px; }
            h3 { color: #4b5563; }
            .header { background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
            .meta { font-size: 14px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${newsletter.title}</h1>
            <div class="meta">
              ${newsletter.description ? `<p>${newsletter.description}</p>` : ''}
              <p>Created: ${format(new Date(newsletter.createdAt), 'MMMM d, yyyy')}</p>
              ${newsletter.scheduledDate ? `<p>Scheduled: ${format(new Date(newsletter.scheduledDate), 'MMMM d, yyyy')}</p>` : ''}
            </div>
          </div>
          <div class="content">
            ${newsletter.content.replace(/\n/g, '<br>').replace(/## (.*)/g, '<h2>$1</h2>').replace(/# (.*)/g, '<h1>$1</h1>')}
          </div>
        </body>
        </html>
      `
      
      const blob = new Blob([content], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${newsletter.title.replace(/[^a-z0-9]/gi, '_')}.html`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      toast.success('Newsletter exported successfully')
    } catch (error) {
      toast.error('Failed to export newsletter')
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: newsletter.title,
          text: newsletter.description || 'Professional newsletter',
          url: window.location.href
        })
      } catch (error) {
        // User cancelled or error occurred
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied to clipboard')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800'
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'monthly':
        return 'bg-blue-100 text-blue-800'
      case 'weekly':
        return 'bg-green-100 text-green-800'
      case 'special':
        return 'bg-purple-100 text-purple-800'
      case 'alert':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!newsletter) {
    return (
      <div className="text-center py-12">
        <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Newsletter not found</h3>
        <Link to="/newsletters" className="btn-primary">
          Back to Newsletters
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/newsletters')}
          className="btn-secondary flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Newsletters</span>
        </button>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={handleShare}
            className="btn-secondary flex items-center space-x-2"
          >
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </button>
          
          <button
            onClick={handlePrint}
            className="btn-secondary flex items-center space-x-2"
          >
            <Printer className="h-4 w-4" />
            <span>Print</span>
          </button>
          
          <button
            onClick={handleExport}
            className="btn-secondary flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
          
          <Link
            to={`/create?edit=${newsletter.id}`}
            className="btn-primary flex items-center space-x-2"
          >
            <Edit className="h-4 w-4" />
            <span>Edit</span>
          </Link>
        </div>
      </div>

      {/* Newsletter Metadata */}
      <div className="card">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{newsletter.title}</h1>
            {newsletter.description && (
              <p className="text-lg text-gray-600 mb-4">{newsletter.description}</p>
            )}
            
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Created {format(new Date(newsletter.createdAt), 'MMMM d, yyyy')}
              </div>
              
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Updated {format(new Date(newsletter.updatedAt), 'MMMM d, yyyy')}
              </div>
              
              {newsletter.views && (
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  {newsletter.views} views
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-col items-end space-y-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(newsletter.status)}`}>
              {newsletter.status}
            </span>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(newsletter.category)}`}>
              {newsletter.category}
            </span>
          </div>
        </div>

        {newsletter.scheduledDate && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-blue-800 font-medium">
                Scheduled for publication on {format(new Date(newsletter.scheduledDate), 'MMMM d, yyyy')}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Newsletter Content */}
      <div className="card print:shadow-none">
        <div className="newsletter-content">
          <div 
            dangerouslySetInnerHTML={{ 
              __html: newsletter.content
                .replace(/\n/g, '<br>')
                .replace(/### (.*)/g, '<h3>$1</h3>')
                .replace(/## (.*)/g, '<h2>$1</h2>')
                .replace(/# (.*)/g, '<h1>$1</h1>')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/- (.*)/g, '<li>$1</li>')
            }} 
          />
        </div>
      </div>

      {/* Newsletter Sections */}
      {newsletter.sections && newsletter.sections.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Newsletter Sections</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {newsletter.sections.map((section, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3">
                <span className="text-sm font-medium text-gray-700">{section}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Included News */}
      {newsletter.includedNews && newsletter.includedNews.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Included Industry News</h3>
          <div className="space-y-4">
            {newsletter.includedNews.map((news, index) => (
              <div key={index} className="border-l-4 border-primary-500 pl-4 py-2">
                <h4 className="font-medium text-gray-900">{news.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{news.summary}</p>
                <div className="flex items-center mt-2 space-x-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    news.category === 'accounting' ? 'bg-blue-100 text-blue-800' :
                    news.category === 'tax' ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {news.category}
                  </span>
                  <span className="text-xs text-gray-500">{news.source}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default NewsletterView