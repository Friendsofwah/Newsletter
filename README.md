# Accounting Newsletter App

A modern, professional newsletter application designed specifically for accounting, audit, and tax professionals. This React-based application provides a comprehensive solution for creating, managing, and distributing monthly newsletters to industry professionals.

## Features

### 📊 Dashboard
- **Overview Statistics**: Track total newsletters, monthly counts, subscriber numbers, and open rates
- **Recent Newsletters**: Quick access to recently published newsletters
- **Quick Actions**: Direct links to create new newsletters and view history
- **Upcoming Topics**: Suggested content ideas for future newsletters

### ✍️ Newsletter Editor
- **Rich Text Editor**: Full-featured WYSIWYG editor with formatting options
- **Preview Mode**: Real-time preview of newsletter content
- **Metadata Management**: Title, subject line, category, tags, and publish date
- **Content Statistics**: Word count, estimated read time, and tag tracking
- **Export Options**: Save as draft, publish, or export to PDF

### 📋 Newsletter History
- **Comprehensive Table**: View all newsletters with detailed information
- **Advanced Filtering**: Filter by category, status, and search terms
- **Performance Metrics**: Track open rates, click rates, and subscriber counts
- **Bulk Actions**: Edit, delete, and export newsletters

### ⚙️ Settings & Management
- **General Settings**: Company information, sender details, and preferences
- **Subscriber Management**: Add, edit, and manage subscriber lists
- **Newsletter Templates**: Pre-built templates for different content types
- **App Preferences**: Dark mode, notifications, and language settings

## Technology Stack

- **Frontend**: React 18 with Vite
- **UI Framework**: Material-UI (MUI) v5
- **Rich Text Editor**: React Quill
- **Date Handling**: date-fns
- **PDF Export**: html2pdf.js
- **Routing**: React Router DOM

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd accounting-newsletter-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## Project Structure

```
src/
├── components/
│   ├── Dashboard.jsx          # Main dashboard with statistics
│   ├── NewsletterEditor.jsx   # Newsletter creation and editing
│   ├── NewsletterHistory.jsx  # Newsletter management and history
│   └── Settings.jsx          # Application settings and preferences
├── App.jsx                   # Main application component with routing
└── main.jsx                  # Application entry point
```

## Key Features for Accounting Professionals

### Content Categories
- **Tax Updates**: Latest tax law changes and IRS guidelines
- **Audit Standards**: New audit standards and compliance requirements
- **Regulatory Changes**: Industry regulations and compliance updates
- **Technology Trends**: AI, automation, and digital transformation
- **Best Practices**: Professional development and industry insights
- **Industry News**: Market trends and professional updates

### Professional Templates
- Pre-built templates for common newsletter types
- Professional formatting and styling
- Industry-specific content structures
- Compliance-ready layouts

### Analytics & Reporting
- **Open Rate Tracking**: Monitor newsletter engagement
- **Click Rate Analysis**: Track link performance
- **Subscriber Analytics**: Understand audience demographics
- **Performance Metrics**: Comprehensive reporting dashboard

## Customization

### Adding New Categories
Edit the categories array in `NewsletterEditor.jsx`:
```javascript
const categories = [
  'Tax Updates',
  'Audit Standards',
  'Regulatory Changes',
  'Technology Trends',
  'Best Practices',
  'Industry News',
  'Compliance Updates',
  // Add your custom categories here
]
```

### Modifying Templates
Templates are defined in the `Settings.jsx` component. Add new templates by extending the template structure.

### Styling Customization
The application uses Material-UI theming. Customize colors, typography, and components in `main.jsx`.

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Static Hosting
The built files in the `dist` directory can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue in the repository or contact the development team.

---

**Built with ❤️ for Accounting Professionals**