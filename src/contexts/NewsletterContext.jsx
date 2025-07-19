import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { format } from 'date-fns'

const NewsletterContext = createContext()

const initialState = {
  newsletters: [],
  currentNewsletter: null,
  templates: [],
  industryNews: [],
  loading: false,
  error: null,
}

function newsletterReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'SET_NEWSLETTERS':
      return { ...state, newsletters: action.payload, loading: false }
    case 'ADD_NEWSLETTER':
      return { 
        ...state, 
        newsletters: [action.payload, ...state.newsletters],
        loading: false 
      }
    case 'UPDATE_NEWSLETTER':
      return {
        ...state,
        newsletters: state.newsletters.map(newsletter =>
          newsletter.id === action.payload.id ? action.payload : newsletter
        ),
        currentNewsletter: action.payload,
        loading: false
      }
    case 'DELETE_NEWSLETTER':
      return {
        ...state,
        newsletters: state.newsletters.filter(newsletter => newsletter.id !== action.payload),
        loading: false
      }
    case 'SET_CURRENT_NEWSLETTER':
      return { ...state, currentNewsletter: action.payload }
    case 'SET_INDUSTRY_NEWS':
      return { ...state, industryNews: action.payload }
    case 'SET_TEMPLATES':
      return { ...state, templates: action.payload }
    default:
      return state
  }
}

export function NewsletterProvider({ children }) {
  const [state, dispatch] = useReducer(newsletterReducer, initialState)

  // Load saved newsletters from localStorage on init
  useEffect(() => {
    const savedNewsletters = localStorage.getItem('newsletters')
    if (savedNewsletters) {
      dispatch({ type: 'SET_NEWSLETTERS', payload: JSON.parse(savedNewsletters) })
    }
    
    // Load sample industry news
    dispatch({ 
      type: 'SET_INDUSTRY_NEWS', 
      payload: getSampleIndustryNews() 
    })
    
    // Load templates
    dispatch({ 
      type: 'SET_TEMPLATES', 
      payload: getNewsletterTemplates() 
    })
  }, [])

  // Save newsletters to localStorage whenever they change
  useEffect(() => {
    if (state.newsletters.length > 0) {
      localStorage.setItem('newsletters', JSON.stringify(state.newsletters))
    }
  }, [state.newsletters])

  const createNewsletter = (newsletterData) => {
    const newNewsletter = {
      id: Date.now().toString(),
      ...newsletterData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'draft'
    }
    dispatch({ type: 'ADD_NEWSLETTER', payload: newNewsletter })
    return newNewsletter
  }

  const updateNewsletter = (id, updates) => {
    const newsletter = state.newsletters.find(n => n.id === id)
    if (newsletter) {
      const updatedNewsletter = {
        ...newsletter,
        ...updates,
        updatedAt: new Date().toISOString()
      }
      dispatch({ type: 'UPDATE_NEWSLETTER', payload: updatedNewsletter })
      return updatedNewsletter
    }
  }

  const deleteNewsletter = (id) => {
    dispatch({ type: 'DELETE_NEWSLETTER', payload: id })
  }

  const getNewsletterById = (id) => {
    return state.newsletters.find(newsletter => newsletter.id === id)
  }

  const value = {
    ...state,
    createNewsletter,
    updateNewsletter,
    deleteNewsletter,
    getNewsletterById,
    dispatch
  }

  return (
    <NewsletterContext.Provider value={value}>
      {children}
    </NewsletterContext.Provider>
  )
}

export function useNewsletter() {
  const context = useContext(NewsletterContext)
  if (!context) {
    throw new Error('useNewsletter must be used within a NewsletterProvider')
  }
  return context
}

// Sample data functions
function getSampleIndustryNews() {
  return [
    {
      id: 1,
      title: "New GAAP Standards for Revenue Recognition",
      summary: "The Financial Accounting Standards Board has issued new guidelines for revenue recognition that will impact how companies report their earnings.",
      category: "accounting",
      date: format(new Date(), 'yyyy-MM-dd'),
      source: "FASB",
      importance: "high"
    },
    {
      id: 2,
      title: "IRS Updates Tax Code for 2024",
      summary: "Significant changes to tax brackets and deductions have been announced for the upcoming tax year.",
      category: "tax",
      date: format(new Date(), 'yyyy-MM-dd'),
      source: "IRS",
      importance: "high"
    },
    {
      id: 3,
      title: "AI in Audit: Emerging Best Practices",
      summary: "Professional auditing firms are increasingly adopting AI tools to enhance audit efficiency and accuracy.",
      category: "audit",
      date: format(new Date(), 'yyyy-MM-dd'),
      source: "AICPA",
      importance: "medium"
    },
    {
      id: 4,
      title: "ESG Reporting Requirements Expansion",
      summary: "New environmental, social, and governance reporting requirements are being implemented across multiple jurisdictions.",
      category: "accounting",
      date: format(new Date(), 'yyyy-MM-dd'),
      source: "SEC",
      importance: "high"
    }
  ]
}

function getNewsletterTemplates() {
  return [
    {
      id: 1,
      name: "Monthly Industry Update",
      description: "Comprehensive monthly overview of accounting, audit, and tax developments",
      sections: [
        "Executive Summary",
        "Accounting Standards Updates",
        "Tax Law Changes",
        "Audit Insights",
        "Industry Trends",
        "Upcoming Deadlines"
      ]
    },
    {
      id: 2,
      name: "Tax Season Special",
      description: "Focused newsletter for tax season with key updates and deadlines",
      sections: [
        "Tax Season Overview",
        "Key Changes This Year",
        "Important Deadlines",
        "Common Issues",
        "Resources & Tools"
      ]
    },
    {
      id: 3,
      name: "Compliance Alert",
      description: "Urgent updates on regulatory changes and compliance requirements",
      sections: [
        "Regulatory Alert",
        "Action Required",
        "Implementation Timeline",
        "Resources",
        "Contact Information"
      ]
    }
  ]
}