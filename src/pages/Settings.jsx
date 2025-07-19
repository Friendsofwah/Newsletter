import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { 
  User, 
  Mail, 
  Bell, 
  Calendar, 
  Palette,
  Download,
  Upload,
  Trash2,
  Save,
  RefreshCw
} from 'lucide-react'
import toast from 'react-hot-toast'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [isLoading, setIsLoading] = useState(false)

  const { register: registerProfile, handleSubmit: handleProfileSubmit, formState: { errors: profileErrors } } = useForm({
    defaultValues: {
      name: 'John Professional',
      email: 'john@example.com',
      title: 'CPA, Newsletter Editor',
      company: 'Professional Accounting Services',
      phone: '+1 (555) 123-4567'
    }
  })

  const { register: registerNewsletter, handleSubmit: handleNewsletterSubmit } = useForm({
    defaultValues: {
      defaultTemplate: '1',
      autoSaveInterval: '30',
      defaultCategory: 'monthly',
      includeFooter: true,
      footerText: 'This newsletter is published by Professional Accounting Services',
      scheduleReminders: true,
      publishReminders: true
    }
  })

  const { register: registerNotifications, handleSubmit: handleNotificationsSubmit } = useForm({
    defaultValues: {
      emailNotifications: true,
      industryUpdates: true,
      publishingReminders: true,
      weeklyDigest: false,
      marketingEmails: false
    }
  })

  const onProfileSubmit = async (data) => {
    setIsLoading(true)
    try {
      // Save profile data to localStorage
      localStorage.setItem('userProfile', JSON.stringify(data))
      toast.success('Profile updated successfully')
    } catch (error) {
      toast.error('Failed to update profile')
    } finally {
      setIsLoading(false)
    }
  }

  const onNewsletterSubmit = async (data) => {
    setIsLoading(true)
    try {
      // Save newsletter settings to localStorage
      localStorage.setItem('newsletterSettings', JSON.stringify(data))
      toast.success('Newsletter settings updated successfully')
    } catch (error) {
      toast.error('Failed to update newsletter settings')
    } finally {
      setIsLoading(false)
    }
  }

  const onNotificationsSubmit = async (data) => {
    setIsLoading(true)
    try {
      // Save notification settings to localStorage
      localStorage.setItem('notificationSettings', JSON.stringify(data))
      toast.success('Notification settings updated successfully')
    } catch (error) {
      toast.error('Failed to update notification settings')
    } finally {
      setIsLoading(false)
    }
  }

  const handleExportData = () => {
    try {
      const data = {
        newsletters: JSON.parse(localStorage.getItem('newsletters') || '[]'),
        userProfile: JSON.parse(localStorage.getItem('userProfile') || '{}'),
        newsletterSettings: JSON.parse(localStorage.getItem('newsletterSettings') || '{}'),
        notificationSettings: JSON.parse(localStorage.getItem('notificationSettings') || '{}')
      }
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `newsletter-data-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      toast.success('Data exported successfully')
    } catch (error) {
      toast.error('Failed to export data')
    }
  }

  const handleImportData = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result)
        
        if (data.newsletters) localStorage.setItem('newsletters', JSON.stringify(data.newsletters))
        if (data.userProfile) localStorage.setItem('userProfile', JSON.stringify(data.userProfile))
        if (data.newsletterSettings) localStorage.setItem('newsletterSettings', JSON.stringify(data.newsletterSettings))
        if (data.notificationSettings) localStorage.setItem('notificationSettings', JSON.stringify(data.notificationSettings))
        
        toast.success('Data imported successfully. Please refresh the page.')
      } catch (error) {
        toast.error('Invalid file format')
      }
    }
    reader.readAsText(file)
  }

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      localStorage.removeItem('newsletters')
      localStorage.removeItem('userProfile')
      localStorage.removeItem('newsletterSettings')
      localStorage.removeItem('notificationSettings')
      toast.success('All data cleared successfully')
    }
  }

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'newsletter', name: 'Newsletter', icon: Mail },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'data', name: 'Data & Privacy', icon: Download }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">
          Manage your account and newsletter preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {tab.name}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>
              <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      {...registerProfile('name', { required: 'Name is required' })}
                      className="input-field"
                    />
                    {profileErrors.name && (
                      <p className="text-red-600 text-sm mt-1">{profileErrors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      {...registerProfile('email', { required: 'Email is required' })}
                      className="input-field"
                    />
                    {profileErrors.email && (
                      <p className="text-red-600 text-sm mt-1">{profileErrors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Professional Title
                    </label>
                    <input
                      type="text"
                      {...registerProfile('title')}
                      className="input-field"
                      placeholder="e.g., CPA, Newsletter Editor"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      {...registerProfile('company')}
                      className="input-field"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      {...registerProfile('phone')}
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
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
                    <span>Save Profile</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'newsletter' && (
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Newsletter Preferences</h2>
              <form onSubmit={handleNewsletterSubmit(onNewsletterSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Default Template
                    </label>
                    <select {...registerNewsletter('defaultTemplate')} className="input-field">
                      <option value="1">Monthly Industry Update</option>
                      <option value="2">Tax Season Special</option>
                      <option value="3">Compliance Alert</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Auto-save Interval (seconds)
                    </label>
                    <select {...registerNewsletter('autoSaveInterval')} className="input-field">
                      <option value="15">15 seconds</option>
                      <option value="30">30 seconds</option>
                      <option value="60">1 minute</option>
                      <option value="120">2 minutes</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Default Category
                    </label>
                    <select {...registerNewsletter('defaultCategory')} className="input-field">
                      <option value="monthly">Monthly Newsletter</option>
                      <option value="weekly">Weekly Update</option>
                      <option value="special">Special Edition</option>
                      <option value="alert">Alert</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      {...registerNewsletter('includeFooter')}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Include footer in newsletters
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Footer Text
                    </label>
                    <textarea
                      {...registerNewsletter('footerText')}
                      rows={3}
                      className="input-field"
                      placeholder="Footer text to include in all newsletters"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
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
                    <span>Save Settings</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Preferences</h2>
              <form onSubmit={handleNotificationsSubmit(onNotificationsSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                      <p className="text-sm text-gray-500">Receive general email notifications</p>
                    </div>
                    <input
                      type="checkbox"
                      {...registerNotifications('emailNotifications')}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Industry Updates</h3>
                      <p className="text-sm text-gray-500">Get notified about new industry developments</p>
                    </div>
                    <input
                      type="checkbox"
                      {...registerNotifications('industryUpdates')}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Publishing Reminders</h3>
                      <p className="text-sm text-gray-500">Reminders about scheduled newsletters</p>
                    </div>
                    <input
                      type="checkbox"
                      {...registerNotifications('publishingReminders')}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Weekly Digest</h3>
                      <p className="text-sm text-gray-500">Weekly summary of your newsletter activity</p>
                    </div>
                    <input
                      type="checkbox"
                      {...registerNotifications('weeklyDigest')}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Marketing Emails</h3>
                      <p className="text-sm text-gray-500">Promotional content and product updates</p>
                    </div>
                    <input
                      type="checkbox"
                      {...registerNotifications('marketingEmails')}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
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
                    <span>Save Preferences</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'data' && (
            <div className="space-y-6">
              <div className="card">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Data Management</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Export Data</h3>
                      <p className="text-sm text-gray-500">Download all your newsletters and settings</p>
                    </div>
                    <button
                      onClick={handleExportData}
                      className="btn-secondary flex items-center space-x-2"
                    >
                      <Download className="h-4 w-4" />
                      <span>Export</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Import Data</h3>
                      <p className="text-sm text-gray-500">Import previously exported data</p>
                    </div>
                    <label className="btn-secondary flex items-center space-x-2 cursor-pointer">
                      <Upload className="h-4 w-4" />
                      <span>Import</span>
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleImportData}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                    <div>
                      <h3 className="text-sm font-medium text-red-900">Clear All Data</h3>
                      <p className="text-sm text-red-700">Permanently delete all newsletters and settings</p>
                    </div>
                    <button
                      onClick={handleClearData}
                      className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Clear Data</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="card">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Privacy Information</h2>
                <div className="prose prose-sm max-w-none text-gray-600">
                  <p>
                    Your data is stored locally in your browser and is not transmitted to any external servers. 
                    This includes all newsletters, settings, and personal information.
                  </p>
                  <p>
                    Industry news data is fetched from public sources and cached locally for performance. 
                    No personal information is shared with these sources.
                  </p>
                  <p>
                    You can export your data at any time and clear all stored information using the tools above.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Settings