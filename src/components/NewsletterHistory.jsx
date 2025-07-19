import React, { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
} from '@mui/material'
import {
  Visibility,
  Edit,
  Delete,
  Download,
  Search,
  FilterList,
} from '@mui/icons-material'
import { format } from 'date-fns'

const NewsletterHistory = () => {
  const [newsletters] = useState([
    {
      id: 1,
      title: 'January 2024 - Tax Law Updates',
      subject: 'Important Tax Updates for 2024',
      category: 'Tax Updates',
      status: 'published',
      publishDate: '2024-01-15',
      openRate: 82.3,
      clickRate: 15.7,
      subscribers: 1250,
      tags: ['tax', '2024', 'updates'],
    },
    {
      id: 2,
      title: 'December 2023 - Year-End Planning',
      subject: 'Year-End Tax Planning Strategies',
      category: 'Best Practices',
      status: 'published',
      publishDate: '2023-12-20',
      openRate: 79.1,
      clickRate: 12.3,
      subscribers: 1200,
      tags: ['year-end', 'planning', 'tax'],
    },
    {
      id: 3,
      title: 'November 2023 - Audit Standards',
      subject: 'New Audit Standards Implementation',
      category: 'Audit Standards',
      status: 'draft',
      publishDate: null,
      openRate: null,
      clickRate: null,
      subscribers: 0,
      tags: ['audit', 'standards'],
    },
    {
      id: 4,
      title: 'October 2023 - Technology Trends',
      subject: 'AI in Accounting: What You Need to Know',
      category: 'Technology Trends',
      status: 'published',
      publishDate: '2023-10-15',
      openRate: 75.8,
      clickRate: 18.2,
      subscribers: 1180,
      tags: ['AI', 'technology', 'trends'],
    },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedNewsletter, setSelectedNewsletter] = useState(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)

  const categories = ['all', 'Tax Updates', 'Audit Standards', 'Regulatory Changes', 'Technology Trends', 'Best Practices', 'Industry News', 'Compliance Updates']
  const statuses = ['all', 'published', 'draft', 'scheduled']

  const filteredNewsletters = newsletters.filter((newsletter) => {
    const matchesSearch = newsletter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         newsletter.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || newsletter.category === categoryFilter
    const matchesStatus = statusFilter === 'all' || newsletter.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleViewNewsletter = (newsletter) => {
    setSelectedNewsletter(newsletter)
    setViewDialogOpen(true)
  }

  const handleEditNewsletter = (id) => {
    // Navigate to editor with newsletter data
    console.log('Edit newsletter:', id)
  }

  const handleDeleteNewsletter = (id) => {
    // Delete newsletter logic
    console.log('Delete newsletter:', id)
  }

  const handleExportNewsletter = (id) => {
    // Export newsletter logic
    console.log('Export newsletter:', id)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'success'
      case 'draft':
        return 'warning'
      case 'scheduled':
        return 'info'
      default:
        return 'default'
    }
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Newsletter History
      </Typography>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search newsletters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={categoryFilter}
                  label="Category"
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  {statuses.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                variant="outlined"
                startIcon={<FilterList />}
                onClick={() => {
                  setSearchTerm('')
                  setCategoryFilter('all')
                  setStatusFilter('all')
                }}
                fullWidth
              >
                Clear Filters
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Newsletter Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Publish Date</TableCell>
              <TableCell>Open Rate</TableCell>
              <TableCell>Subscribers</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredNewsletters.map((newsletter) => (
              <TableRow key={newsletter.id} hover>
                <TableCell>
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      {newsletter.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {newsletter.subject}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      {newsletter.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          sx={{ mr: 0.5, mb: 0.5 }}
                        />
                      ))}
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip label={newsletter.category} size="small" />
                </TableCell>
                <TableCell>
                  <Chip
                    label={newsletter.status}
                    color={getStatusColor(newsletter.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {newsletter.publishDate ? (
                    format(new Date(newsletter.publishDate), 'MMM dd, yyyy')
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      Not published
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  {newsletter.openRate ? (
                    `${newsletter.openRate}%`
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      N/A
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  {newsletter.subscribers.toLocaleString()}
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="View Newsletter">
                      <IconButton
                        size="small"
                        onClick={() => handleViewNewsletter(newsletter)}
                      >
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Newsletter">
                      <IconButton
                        size="small"
                        onClick={() => handleEditNewsletter(newsletter.id)}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Export PDF">
                      <IconButton
                        size="small"
                        onClick={() => handleExportNewsletter(newsletter.id)}
                      >
                        <Download />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Newsletter">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteNewsletter(newsletter.id)}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* View Newsletter Dialog */}
      <Dialog
        open={viewDialogOpen}
        onClose={() => setViewDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedNewsletter?.title}
        </DialogTitle>
        <DialogContent>
          {selectedNewsletter && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Newsletter Details
              </Typography>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Subject Line
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedNewsletter.subject}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Category
                  </Typography>
                  <Chip label={selectedNewsletter.category} size="small" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Status
                  </Typography>
                  <Chip
                    label={selectedNewsletter.status}
                    color={getStatusColor(selectedNewsletter.status)}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Publish Date
                  </Typography>
                  <Typography variant="body1">
                    {selectedNewsletter.publishDate
                      ? format(new Date(selectedNewsletter.publishDate), 'MMM dd, yyyy')
                      : 'Not published'}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Tags
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    {selectedNewsletter.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{ mr: 0.5, mb: 0.5 }}
                      />
                    ))}
                  </Box>
                </Grid>
              </Grid>

              {selectedNewsletter.status === 'published' && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Performance Metrics
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Open Rate
                      </Typography>
                      <Typography variant="h4" color="primary">
                        {selectedNewsletter.openRate}%
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Click Rate
                      </Typography>
                      <Typography variant="h4" color="secondary">
                        {selectedNewsletter.clickRate}%
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Subscribers
                      </Typography>
                      <Typography variant="h4">
                        {selectedNewsletter.subscribers.toLocaleString()}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
          <Button
            variant="contained"
            onClick={() => {
              handleEditNewsletter(selectedNewsletter?.id)
              setViewDialogOpen(false)
            }}
          >
            Edit Newsletter
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default NewsletterHistory