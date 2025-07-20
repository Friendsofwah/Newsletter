import React, { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Avatar,
  Divider,
} from '@mui/material'
import {
  TrendingUp,
  Article,
  Schedule,
  TrendingDown,
  CheckCircle,
  Warning,
  Info,
} from '@mui/icons-material'
import { format } from 'date-fns'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalNewsletters: 24,
    thisMonth: 2,
    subscribers: 1250,
    openRate: 78.5,
  })

  const [recentNewsletters] = useState([
    {
      id: 1,
      title: 'January 2024 - Tax Law Updates',
      date: '2024-01-15',
      status: 'published',
      openRate: 82.3,
    },
    {
      id: 2,
      title: 'December 2023 - Year-End Planning',
      date: '2023-12-20',
      status: 'published',
      openRate: 79.1,
    },
    {
      id: 3,
      title: 'November 2023 - Audit Standards',
      date: '2023-11-15',
      status: 'draft',
      openRate: null,
    },
  ])

  const [upcomingTopics] = useState([
    'New IRS Guidelines for 2024',
    'Audit Technology Trends',
    'Tax Planning Strategies',
    'Regulatory Compliance Updates',
  ])

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Welcome back! Here's an overview of your newsletter performance.
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <Article />
                </Avatar>
                <Box>
                  <Typography variant="h4" component="div">
                    {stats.totalNewsletters}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Newsletters
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Avatar sx={{ bgcolor: 'success.main', mr: 2 }}>
                  <TrendingUp />
                </Avatar>
                <Box>
                  <Typography variant="h4" component="div">
                    {stats.thisMonth}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    This Month
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Avatar sx={{ bgcolor: 'info.main', mr: 2 }}>
                  <Schedule />
                </Avatar>
                <Box>
                  <Typography variant="h4" component="div">
                    {stats.subscribers}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Subscribers
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Avatar sx={{ bgcolor: 'warning.main', mr: 2 }}>
                  <TrendingDown />
                </Avatar>
                <Box>
                  <Typography variant="h4" component="div">
                    {stats.openRate}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Avg. Open Rate
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Newsletters */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Newsletters
              </Typography>
              <List>
                {recentNewsletters.map((newsletter, index) => (
                  <React.Fragment key={newsletter.id}>
                    <ListItem>
                      <ListItemIcon>
                        {newsletter.status === 'published' ? (
                          <CheckCircle color="success" />
                        ) : (
                          <Warning color="warning" />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={newsletter.title}
                        secondary={`${format(new Date(newsletter.date), 'MMM dd, yyyy')} • ${
                          newsletter.openRate ? `${newsletter.openRate}% open rate` : 'Draft'
                        }`}
                      />
                      <Chip
                        label={newsletter.status}
                        color={newsletter.status === 'published' ? 'success' : 'warning'}
                        size="small"
                      />
                    </ListItem>
                    {index < recentNewsletters.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions & Upcoming Topics */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mb: 2 }}
                  href="/create"
                >
                  Create New Newsletter
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  href="/history"
                >
                  View All Newsletters
                </Button>
              </Box>

              <Typography variant="h6" gutterBottom>
                Upcoming Topics
              </Typography>
              <List dense>
                {upcomingTopics.map((topic, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <Info color="info" />
                    </ListItemIcon>
                    <ListItemText primary={topic} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard