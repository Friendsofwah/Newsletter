import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useNewsletter } from '../contexts/NewsletterContext'
import { 
  FileText, 
  Save, 
  Eye, 
  Calendar, 
  Lightbulb,
  Plus,
  X,
  RefreshCw
} from 'lucide-react'
import toast from 'react-hot-toast'
import { format } from 'date-fns'

const CreateNewsletter = () => {
  const navigate = useNavigate()
  const { createNewsletter, templates, industryNews } = useNewsletter()
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [selectedNews, setSelectedNews] = useState([])
  const [previewMode, setPreviewMode] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      title: `Monthly Newsletter - ${format(new Date(), 'MMMM yyyy')}`,
      description: 'Latest updates in accounting, audit, and tax industry',
      content: '',
      scheduledDate: format(new Date(), 'yyyy-MM-dd'),
      category: 'monthly'
    }
  })

  const watchContent = watch('content')

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const newsletter = createNewsletter({
        ...data,
        template: selectedTemplate,
        includedNews: selectedNews,
        sections: selectedTemplate?.sections || []
      })
      
      toast.success('Newsletter created successfully!')
      navigate(`/newsletter/${newsletter.id}`)
    } catch (error) {
      toast.error('Failed to create newsletter')
    } finally {
      setIsLoading(false)
    }
  }

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template)
    
    // Generate content based on template
    let generatedContent = `# ${watch('title')}\n\n`
    
    template.sections.forEach(section => {
      generatedContent += `## ${section}\n\n`
      
      if (section.toLowerCase().includes('summary')) {
        generatedContent += 'This month has brought significant developments in the accounting, audit, and tax industry...\n\n'
      } else if (section.toLowerCase().includes('accounting')) {
        generatedContent += 'Key accounting standards updates and their implications for practitioners...\n\n'
      } else if (section.toLowerCase().includes('tax')) {
        generatedContent += 'Important tax law changes and deadlines to be aware of...\n\n'
      } else if (section.toLowerCase().includes('audit')) {
        generatedContent += 'Latest auditing standards and best practices...\n\n'
      } else if (section.toLowerCase().includes('deadlines')) {
        generatedContent += '### Upcoming Important Dates\n- Tax filing deadlines\n- Regulatory compliance dates\n- Professional development requirements\n\n'
      } else {
        generatedContent += `Content for ${section} section...\n\n`
      }
    })

    setValue('content', generatedContent)
  }

  const handleNewsToggle = (newsItem) => {
    setSelectedNews(prev => {
      const isSelected = prev.some(item => item.id === newsItem.id)
      if (isSelected) {
        return prev.filter(item => item.id !== newsItem.id)
      } else {
        return [...prev, newsItem]
      }
    })
  }

  const incorporateSelectedNews = () => {
    if (selectedNews.length === 0) return

    let newsContent = '\n\n## Industry News Highlights\n\n'
    selectedNews.forEach(news => {
      newsContent += `### ${news.title}\n\n`
      newsContent += `${news.summary}\n\n`
      newsContent += `*Source: ${news.source}*\n\n`
    })

    setValue('content', watchContent + newsContent)
    toast.success(`Added ${selectedNews.length} news items to newsletter`)
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create Newsletter</h1>
          <p className="text-gray-600 mt-1">
            Create your monthly newsletter for accounting professionals
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => setPreviewMode(!previewMode)}
            className="btn-secondary flex items-center space-x-2"
          >
            <Eye className="h-4 w-4" />
            <span>{previewMode ? 'Edit' : 'Preview'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Templates */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Templates</h3>
            <div className="space-y-3">
              {templates.map(template => (
                <div
                  key={template.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors duration-200 ${
                    selectedTemplate?.id === template.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleTemplateSelect(template)}
                >
                  <h4 className="font-medium text-gray-900">{template.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                  <div className="mt-2">
                    <span className="text-xs text-gray-500">
                      {template.sections.length} sections
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Industry News */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Industry News</h3>
              <button
                onClick={incorporateSelectedNews}
                disabled={selectedNews.length === 0}
                className="btn-primary text-xs disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Selected
              </button>
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {industryNews.map(news => (
                <div
                  key={news.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors duration-200 ${
                    selectedNews.some(item => item.id === news.id)
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleNewsToggle(news)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{news.title}</h4>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">{news.summary}</p>
                      <div className="flex items-center mt-2 space-x-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          news.category === 'accounting' ? 'bg-blue-100 text-blue-800' :
                          news.category === 'tax' ? 'bg-green-100 text-green-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {news.category}
                        </span>
                        <span className={`w-2 h-2 rounded-full ${
                          news.importance === 'high' ? 'bg-red-500' :
                          news.importance === 'medium' ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Newsletter Details */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Newsletter Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    {...register('title', { required: 'Title is required' })}
                    className="input-field"
                    placeholder="Newsletter title"
                  />
                  {errors.title && (
                    <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select {...register('category')} className="input-field">
                    <option value="monthly">Monthly Newsletter</option>
                    <option value="weekly">Weekly Update</option>
                    <option value="special">Special Edition</option>
                    <option value="alert">Alert</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <input
                    type="text"
                    {...register('description')}
                    className="input-field"
                    placeholder="Brief description of the newsletter"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Scheduled Date
                  </label>
                  <input
                    type="date"
                    {...register('scheduledDate')}
                    className="input-field"
                  />
                </div>
              </div>
            </div>

            {/* Content Editor */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Content</h3>
                {selectedTemplate && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Lightbulb className="h-4 w-4 mr-1" />
                    Using {selectedTemplate.name} template
                  </div>
                )}
              </div>

              {previewMode ? (
                <div className="newsletter-content min-h-96 p-6 border border-gray-200 rounded-lg bg-white">
                  <div dangerouslySetInnerHTML={{ 
                    __html: watchContent.replace(/\n/g, '<br>').replace(/## (.*)/g, '<h2>$1</h2>').replace(/# (.*)/g, '<h1>$1</h1>')
                  }} />
                </div>
              ) : (
                <textarea
                  {...register('content', { required: 'Content is required' })}
                  rows={20}
                  className="input-field font-mono text-sm"
                  placeholder="Write your newsletter content here... Use Markdown formatting."
                />
              )}

              {errors.content && (
                <p className="text-red-600 text-sm mt-1">{errors.content.message}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="btn-secondary"
              >
                Cancel
              </button>
              
              <div className="flex items-center space-x-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary flex items-center space-x-2"
                >
                  {isLoading ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  <span>{isLoading ? 'Creating...' : 'Create Newsletter'}</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateNewsletter