import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNewsletter } from '../contexts/NewsletterContext'
import { 
  FileText, 
  Search, 
  Filter, 
  Calendar,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  PlusCircle
} from 'lucide-react'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

const NewsletterList = () => {
  const { newsletters, deleteNewsletter } = useNewsletter()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortBy, setSortBy] = useState('updatedAt')
  const [sortOrder, setSortOrder] = useState('desc')

  // Filter and sort newsletters
  const filteredNewsletters = newsletters
    .filter(newsletter => {
      const matchesSearch = newsletter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           newsletter.description?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = filterStatus === 'all' || newsletter.status === filterStatus
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      const aValue = a[sortBy]
      const bValue = b[sortBy]
      
      if (sortOrder === 'desc') {
        return new Date(bValue) - new Date(aValue)
      } else {
        return new Date(aValue) - new Date(bValue)
      }
    })

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this newsletter?')) {
      deleteNewsletter(id)
      toast.success('Newsletter deleted successfully')
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All Newsletters</h1>
          <p className="text-gray-600 mt-1">
            Manage and organize your newsletter collection
          </p>
        </div>
        <Link
          to="/create"
          className="btn-primary flex items-center space-x-2"
        >
          <PlusCircle className="h-5 w-5" />
          <span>Create Newsletter</span>
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search newsletters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 input-field"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="sm:w-48">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input-field"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </div>

          {/* Sort */}
          <div className="sm:w-48">
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-')
                setSortBy(field)
                setSortOrder(order)
              }}
              className="input-field"
            >
              <option value="updatedAt-desc">Recently Updated</option>
              <option value="createdAt-desc">Recently Created</option>
              <option value="title-asc">Title A-Z</option>
              <option value="title-desc">Title Z-A</option>
            </select>
          </div>
        </div>
      </div>

      {/* Newsletter Grid */}
      {filteredNewsletters.length === 0 ? (
        <div className="card text-center py-12">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm || filterStatus !== 'all' ? 'No newsletters found' : 'No newsletters yet'}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || filterStatus !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Get started by creating your first newsletter'
            }
          </p>
          {(!searchTerm && filterStatus === 'all') && (
            <Link to="/create" className="btn-primary">
              Create Your First Newsletter
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNewsletters.map((newsletter) => (
            <div key={newsletter.id} className="card hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">{newsletter.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {newsletter.description || 'No description provided'}
                  </p>
                </div>
                <div className="ml-4">
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Status and Category */}
              <div className="flex items-center space-x-2 mb-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(newsletter.status)}`}>
                  {newsletter.status}
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(newsletter.category)}`}>
                  {newsletter.category}
                </span>
              </div>

              {/* Metadata */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  Created {format(new Date(newsletter.createdAt), 'MMM d, yyyy')}
                </div>
                {newsletter.scheduledDate && (
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    Scheduled for {format(new Date(newsletter.scheduledDate), 'MMM d, yyyy')}
                  </div>
                )}
                {newsletter.views && (
                  <div className="flex items-center text-sm text-gray-500">
                    <Eye className="h-4 w-4 mr-2" />
                    {newsletter.views} views
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <Link
                  to={`/newsletter/${newsletter.id}`}
                  className="btn-secondary text-sm flex items-center space-x-2"
                >
                  <Eye className="h-4 w-4" />
                  <span>View</span>
                </Link>
                
                <div className="flex items-center space-x-2">
                  <Link
                    to={`/create?edit=${newsletter.id}`}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                  >
                    <Edit className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(newsletter.id)}
                    className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination would go here for large datasets */}
      {filteredNewsletters.length > 0 && (
        <div className="flex items-center justify-between pt-6">
          <p className="text-sm text-gray-700">
            Showing {filteredNewsletters.length} of {newsletters.length} newsletters
          </p>
        </div>
      )}
    </div>
  )
}

export default NewsletterList