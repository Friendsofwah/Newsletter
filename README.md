# Accounting Newsletter Pro

A modern, professional web application for creating monthly newsletters focused on the latest developments in the accounting, audit, and tax industry.

## Features

### 📝 Newsletter Creation
- **Template-based Creation**: Choose from pre-built templates (Monthly Industry Update, Tax Season Special, Compliance Alert)
- **Rich Text Editor**: Markdown-supported content editor with live preview
- **Industry News Integration**: Select and incorporate relevant industry news automatically
- **Smart Content Generation**: Template-based content scaffolding for faster newsletter creation

### 📊 Dashboard & Analytics
- **Overview Dashboard**: Track newsletter performance with statistics and metrics
- **Recent Activity**: Quick access to recently created newsletters
- **Industry Alerts**: Stay updated with high-priority industry developments
- **Quick Actions**: Fast access to common tasks

### 📚 Newsletter Management
- **Advanced Filtering**: Search, filter by status, and sort newsletters
- **Status Tracking**: Draft, Published, and Scheduled status management
- **View Counting**: Track newsletter engagement
- **Bulk Operations**: Efficient management of multiple newsletters

### 🎨 Professional Design
- **Modern UI**: Clean, professional interface built with Tailwind CSS
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Professional Typography**: Merriweather and Inter font combination
- **Accessible**: Following accessibility best practices

### 📤 Export & Sharing
- **Multiple Export Formats**: Export newsletters as HTML
- **Print Optimization**: Professional print layouts
- **Easy Sharing**: Share newsletters via URL or native sharing
- **Data Export**: Backup all newsletters and settings

### ⚙️ Customization
- **User Profiles**: Manage professional information
- **Newsletter Settings**: Configure default templates and preferences
- **Notification Preferences**: Control email and alert settings
- **Data Management**: Import/export and privacy controls

## Technology Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **Routing**: React Router DOM
- **Notifications**: React Hot Toast
- **Date Management**: date-fns
- **Local Storage**: Browser-based data persistence

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd accounting-newsletter-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application.

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage Guide

### Creating Your First Newsletter

1. **Navigate to Create Newsletter**: Click "Create Newsletter" from the dashboard
2. **Choose a Template**: Select from available templates in the sidebar
3. **Add Newsletter Details**: Fill in title, description, and scheduling information
4. **Select Industry News**: Choose relevant news items to include
5. **Edit Content**: Customize the generated content in the editor
6. **Preview**: Use the preview mode to see how your newsletter will look
7. **Save**: Create your newsletter as a draft or schedule for publication

### Managing Newsletters

- **View All**: Access all newsletters from the "All Newsletters" page
- **Search & Filter**: Use the search bar and filters to find specific newsletters
- **Edit**: Click the edit button to modify existing newsletters
- **Export**: Use the export function to download newsletters
- **Delete**: Remove unwanted newsletters (with confirmation)

### Customizing Settings

1. **Profile**: Update your professional information
2. **Newsletter Preferences**: Set default templates and auto-save intervals
3. **Notifications**: Configure alert and reminder preferences
4. **Data Management**: Export, import, or clear your data

## Sample Data

The application comes with sample industry news data including:

- **Accounting**: GAAP standards updates, ESG reporting requirements
- **Tax**: IRS code changes, bracket updates, filing deadlines
- **Audit**: AI integration, best practices, regulatory changes

## Data Storage

- **Local Storage**: All data is stored locally in your browser
- **Privacy First**: No data is transmitted to external servers
- **Portable**: Export/import functionality for data portability
- **Secure**: Your information stays on your device

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

### Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Layout.jsx      # Main application layout
├── contexts/           # React contexts
│   └── NewsletterContext.jsx
├── pages/              # Page components
│   ├── Dashboard.jsx
│   ├── CreateNewsletter.jsx
│   ├── NewsletterList.jsx
│   ├── NewsletterView.jsx
│   └── Settings.jsx
├── App.jsx             # Main app component
├── main.jsx           # Entry point
└── index.css          # Global styles
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or support, please contact the development team or create an issue in the repository.

---

**Newsletter Pro** - Streamlining professional communication for accounting professionals.