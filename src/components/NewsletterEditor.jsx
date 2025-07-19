import React, { useState, useRef } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Paper,
  Divider,
  Alert,
  Snackbar,
  IconButton,
  Tooltip,
} from '@mui/material'
import {
  Save,
  Preview,
  Send,
  Download,
  Add,
  Remove,
} from '@mui/icons-material'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { format } from 'date-fns'

const NewsletterEditor = () => {
  const [newsletter, setNewsletter] = useState({
    title: '',
    subject: '',
    category: '',
    content: '',
    summary: '',
    tags: [],
    publishDate: format(new Date(), 'yyyy-MM-dd'),
  })

  const [newTag, setNewTag] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const quillRef = useRef()

  const categories = [
    'Tax Updates',
    'Audit Standards',
    'Regulatory Changes',
    'Technology Trends',
    'Best Practices',
    'Industry News',
    'Compliance Updates',
  ]

  const handleContentChange = (content) => {
    setNewsletter({ ...newsletter, content })
  }

  const handleAddTag = () => {
    if (newTag.trim() && !newsletter.tags.includes(newTag.trim())) {
      setNewsletter({
        ...newsletter,
        tags: [...newsletter.tags, newTag.trim()],
      })
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setNewsletter({
      ...newsletter,
      tags: newsletter.tags.filter((tag) => tag !== tagToRemove),
    })
  }

  const handleSave = () => {
    // Save newsletter logic here
    setShowSuccess(true)
  }

  const handlePublish = () => {
    // Publish newsletter logic here
    setShowSuccess(true)
  }

  const handleExport = () => {
    // Export to PDF logic here
    setShowSuccess(true)
  }

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ['link', 'image'],
      ['clean'],
    ],
  }

  const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'color',
    'background',
    'align',
    'link',
    'image',
  ]

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Create Newsletter
      </Typography>

      <Grid container spacing={3}>
        {/* Main Editor */}
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Newsletter Content
              </Typography>

              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Newsletter Title"
                    value={newsletter.title}
                    onChange={(e) =>
                      setNewsletter({ ...newsletter, title: e.target.value })
                    }
                    placeholder="e.g., January 2024 - Tax Law Updates"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email Subject Line"
                    value={newsletter.subject}
                    onChange={(e) =>
                      setNewsletter({ ...newsletter, subject: e.target.value })
                    }
                    placeholder="e.g., Important Tax Updates for 2024"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={newsletter.category}
                      label="Category"
                      onChange={(e) =>
                        setNewsletter({ ...newsletter, category: e.target.value })
                      }
                    >
                      {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Summary"
                    value={newsletter.summary}
                    onChange={(e) =>
                      setNewsletter({ ...newsletter, summary: e.target.value })
                    }
                    placeholder="Brief summary of the newsletter content..."
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Publish Date"
                    type="date"
                    value={newsletter.publishDate}
                    onChange={(e) =>
                      setNewsletter({ ...newsletter, publishDate: e.target.value })
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Tags
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                      <TextField
                        size="small"
                        placeholder="Add tag..."
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            handleAddTag()
                          }
                        }}
                      />
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={handleAddTag}
                        startIcon={<Add />}
                      >
                        Add
                      </Button>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {newsletter.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          onDelete={() => handleRemoveTag(tag)}
                          deleteIcon={<Remove />}
                        />
                      ))}
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle1" gutterBottom>
                Newsletter Content
              </Typography>

              {!previewMode ? (
                <Box sx={{ border: '1px solid #ddd', borderRadius: 1 }}>
                  <ReactQuill
                    ref={quillRef}
                    value={newsletter.content}
                    onChange={handleContentChange}
                    modules={quillModules}
                    formats={quillFormats}
                    placeholder="Start writing your newsletter content..."
                    style={{ height: '400px' }}
                  />
                </Box>
              ) : (
                <Paper
                  sx={{
                    p: 3,
                    minHeight: '400px',
                    border: '1px solid #ddd',
                    borderRadius: 1,
                  }}
                >
                  <div
                    dangerouslySetInnerHTML={{ __html: newsletter.content }}
                    style={{ fontFamily: 'inherit' }}
                  />
                </Paper>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Actions
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<Preview />}
                  onClick={() => setPreviewMode(!previewMode)}
                  fullWidth
                >
                  {previewMode ? 'Edit Mode' : 'Preview Mode'}
                </Button>

                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSave}
                  fullWidth
                >
                  Save Draft
                </Button>

                <Button
                  variant="contained"
                  color="success"
                  startIcon={<Send />}
                  onClick={handlePublish}
                  fullWidth
                >
                  Publish Newsletter
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<Download />}
                  onClick={handleExport}
                  fullWidth
                >
                  Export PDF
                </Button>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom>
                Newsletter Stats
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="body2">
                  <strong>Word Count:</strong>{' '}
                  {newsletter.content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length}
                </Typography>
                <Typography variant="body2">
                  <strong>Estimated Read Time:</strong>{' '}
                  {Math.ceil(
                    newsletter.content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length / 200
                  )}{' '}
                  minutes
                </Typography>
                <Typography variant="body2">
                  <strong>Tags:</strong> {newsletter.tags.length}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert
          onClose={() => setShowSuccess(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          Newsletter saved successfully!
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default NewsletterEditor