import React, { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Switch,
  FormControlLabel,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  Chip,
  Avatar,
} from '@mui/material'
import {
  Save,
  Add,
  Delete,
  Edit,
  Email,
  Notifications,
  Security,
  Palette,
  Language,
} from '@mui/icons-material'

const Settings = () => {
  const [settings, setSettings] = useState({
    companyName: 'Accounting Professionals Newsletter',
    senderEmail: 'newsletter@accountingpro.com',
    senderName: 'Accounting Team',
    defaultSubject: 'Monthly Newsletter - {month} {year}',
    autoSchedule: true,
    emailNotifications: true,
    darkMode: false,
    language: 'en',
  })

  const [subscribers] = useState([
    { id: 1, email: 'john.doe@accounting.com', name: 'John Doe', status: 'active', category: 'Tax Professional' },
    { id: 2, email: 'jane.smith@audit.com', name: 'Jane Smith', status: 'active', category: 'Auditor' },
    { id: 3, email: 'mike.wilson@tax.com', name: 'Mike Wilson', status: 'inactive', category: 'Tax Consultant' },
    { id: 4, email: 'sarah.jones@cpa.com', name: 'Sarah Jones', status: 'active', category: 'CPA' },
  ])

  const [showSuccess, setShowSuccess] = useState(false)
  const [addSubscriberDialog, setAddSubscriberDialog] = useState(false)
  const [newSubscriber, setNewSubscriber] = useState({
    email: '',
    name: '',
    category: '',
  })

  const categories = [
    'Tax Professional',
    'Auditor',
    'CPA',
    'Tax Consultant',
    'Accounting Manager',
    'Financial Controller',
    'Other',
  ]

  const handleSettingChange = (key, value) => {
    setSettings({ ...settings, [key]: value })
  }

  const handleSaveSettings = () => {
    // Save settings logic here
    setShowSuccess(true)
  }

  const handleAddSubscriber = () => {
    if (newSubscriber.email && newSubscriber.name) {
      // Add subscriber logic here
      setAddSubscriberDialog(false)
      setNewSubscriber({ email: '', name: '', category: '' })
      setShowSuccess(true)
    }
  }

  const handleDeleteSubscriber = (id) => {
    // Delete subscriber logic here
    console.log('Delete subscriber:', id)
  }

  const getStatusColor = (status) => {
    return status === 'active' ? 'success' : 'error'
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      <Grid container spacing={3}>
        {/* General Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                General Settings
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Company Name"
                    value={settings.companyName}
                    onChange={(e) => handleSettingChange('companyName', e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Sender Email"
                    value={settings.senderEmail}
                    onChange={(e) => handleSettingChange('senderEmail', e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Sender Name"
                    value={settings.senderName}
                    onChange={(e) => handleSettingChange('senderName', e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Default Subject Line Template"
                    value={settings.defaultSubject}
                    onChange={(e) => handleSettingChange('defaultSubject', e.target.value)}
                    helperText="Use {month} and {year} as placeholders"
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom>
                Preferences
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.autoSchedule}
                        onChange={(e) => handleSettingChange('autoSchedule', e.target.checked)}
                      />
                    }
                    label="Auto-schedule newsletters"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.emailNotifications}
                        onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                      />
                    }
                    label="Email notifications"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.darkMode}
                        onChange={(e) => handleSettingChange('darkMode', e.target.checked)}
                      />
                    }
                    label="Dark mode"
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSaveSettings}
                  fullWidth
                >
                  Save Settings
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Subscriber Management */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="h6">
                  Subscriber Management
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<Add />}
                  onClick={() => setAddSubscriberDialog(true)}
                >
                  Add Subscriber
                </Button>
              </Box>

              <List>
                {subscribers.map((subscriber) => (
                  <ListItem key={subscriber.id} divider>
                    <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                      {subscriber.name.charAt(0)}
                    </Avatar>
                    <ListItemText
                      primary={subscriber.name}
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {subscriber.email}
                          </Typography>
                          <Box sx={{ mt: 1 }}>
                            <Chip
                              label={subscriber.category}
                              size="small"
                              sx={{ mr: 1 }}
                            />
                            <Chip
                              label={subscriber.status}
                              color={getStatusColor(subscriber.status)}
                              size="small"
                            />
                          </Box>
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={() => handleDeleteSubscriber(subscriber.id)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>

              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Total Subscribers: {subscribers.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Active: {subscribers.filter(s => s.status === 'active').length}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Newsletter Templates */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Newsletter Templates
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom>
                        Tax Updates Template
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Standard template for tax law updates and changes
                      </Typography>
                      <Button size="small" variant="outlined">
                        Use Template
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom>
                        Audit Standards Template
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Template for audit standards and compliance updates
                      </Typography>
                      <Button size="small" variant="outlined">
                        Use Template
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom>
                        Technology Trends Template
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Template for technology and industry trends
                      </Typography>
                      <Button size="small" variant="outlined">
                        Use Template
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add Subscriber Dialog */}
      <Dialog
        open={addSubscriberDialog}
        onClose={() => setAddSubscriberDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Subscriber</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={newSubscriber.email}
                onChange={(e) => setNewSubscriber({ ...newSubscriber, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                value={newSubscriber.name}
                onChange={(e) => setNewSubscriber({ ...newSubscriber, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Category"
                value={newSubscriber.category}
                onChange={(e) => setNewSubscriber({ ...newSubscriber, category: e.target.value })}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddSubscriberDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddSubscriber}>
            Add Subscriber
          </Button>
        </DialogActions>
      </Dialog>

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
          Settings saved successfully!
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default Settings