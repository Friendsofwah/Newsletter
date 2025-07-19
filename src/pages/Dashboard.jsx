import React from 'react'
import { Link } from 'react-router-dom'
import { useNewsletter } from '../contexts/NewsletterContext'
import { 
  PlusCircle, 
  FileText, 
  TrendingUp, 
  Calendar,
  Clock,
  Users,
  Mail,
  AlertCircle
} from 'lucide-react'
import { format } from 'date-fns'

const Dashboard = () => {
  const { newsletters, industryNews } = useNewsletter()

  const recentNewsletters = newsletters.slice(0, 3)
  const draftCount = newsletters.filter(n => n.status === 'draft').length
  const publishedCount = newsletters.filter(n => n.status === 'published').length
  const totalViews = newsletters.reduce((sum, n) => sum + (n.views || 0), 0)

  const stats = [
    {
      name: 'Total Newsletters',
      value: newsletters.length,
      icon: FileText,
      color: 'bg-blue-500',
      change: '+12%',
      trend: 'up'
    },
    {
      name: 'Published',
      value: publishedCount,
      icon: Mail,
      color: 'bg-green-500',
      change: '+8%',
      trend: 'up'
    },
    {
      name: 'Draft',
      value: draftCount,
      icon: Clock,
      color: 'bg-yellow-500',
      change: '+3%',
      trend: 'up'
    },
    {
      name: 'Total Views',
      value: totalViews,
      icon: Users,
      color: 'bg-purple-500',
      change: '+23%',
      trend: 'up'
    }
  ]

  const urgentNews = industryNews.filter(news => news.importance === 'high').slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's what's happening with your newsletters.
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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600 ml-1">{stat.change}</span>
                <span className="text-sm text-gray-500 ml-2">from last month</span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Newsletters */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Newsletters</h2>
            <Link 
              to="/newsletters" 
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              View all
            </Link>
          </div>
          
          {recentNewsletters.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No newsletters yet</p>
              <Link to="/create" className="btn-primary">
                Create your first newsletter
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentNewsletters.map((newsletter) => (
                <div key={newsletter.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{newsletter.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {newsletter.description || 'No description'}
                    </p>
                    <div className="flex items-center mt-2 space-x-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        newsletter.status === 'published' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {newsletter.status}
                      </span>
                      <span className="text-xs text-gray-500">
                        {format(new Date(newsletter.updatedAt), 'MMM d, yyyy')}
                      </span>
                    </div>
                  </div>
                  <Link
                    to={`/newsletter/${newsletter.id}`}
                    className="btn-secondary text-sm"
                  >
                    View
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Industry News Alerts */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Industry Alerts</h2>
            <AlertCircle className="h-5 w-5 text-red-500" />
          </div>
          
          <div className="space-y-4">
            {urgentNews.map((news) => (
              <div key={news.id} className="border-l-4 border-red-500 pl-4 py-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 text-sm">{news.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{news.summary}</p>
                    <div className="flex items-center mt-2 space-x-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {news.category}
                      </span>
                      <span className="text-xs text-gray-500">{news.source}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="pt-4 border-t border-gray-200">
              <button className="w-full text-center text-sm text-primary-600 hover:text-primary-700 font-medium">
                View all industry updates
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/create"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors duration-200"
          >
            <PlusCircle className="h-8 w-8 text-primary-600" />
            <div className="ml-4">
              <h3 className="font-medium text-gray-900">Create Newsletter</h3>
              <p className="text-sm text-gray-500">Start a new monthly newsletter</p>
            </div>
          </Link>
          
          <Link
            to="/newsletters"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors duration-200"
          >
            <FileText className="h-8 w-8 text-primary-600" />
            <div className="ml-4">
              <h3 className="font-medium text-gray-900">View All</h3>
              <p className="text-sm text-gray-500">Browse all newsletters</p>
            </div>
          </Link>
          
          <Link
            to="/settings"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors duration-200"
          >
            <Calendar className="h-8 w-8 text-primary-600" />
            <div className="ml-4">
              <h3 className="font-medium text-gray-900">Schedule</h3>
              <p className="text-sm text-gray-500">Manage publication schedule</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard