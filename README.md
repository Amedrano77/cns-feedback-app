# CNS Instructor Feedback Repository

A collaborative feedback management system designed for CNS (Computer Networking Systems) instructors to efficiently share, manage, and reuse feedback for Canvas LMS assignments.

## 🎯 Purpose

This web application helps CNS instructors:
- Build a shared repository of high-quality feedback comments
- Save time grading similar assignments across multiple sections
- Maintain consistency in feedback across different instructors
- Quickly find and copy relevant feedback for Canvas LMS grading

## ✨ Features

### Core Functionality
- **📚 Course Management**: Organized by 18 CNS courses
- **🔍 Smart Search**: Filter by assignment type, performance level, or keywords
- **📋 Copy to Canvas**: One-click copy for pasting into Canvas grading
- **⭐ Rating System**: Rate effectiveness of feedback entries
- **👥 Multi-Instructor**: Track contributor information
- **🎓 Learning Outcomes**: Tag feedback with multiple learning outcomes

### Advanced Features
- **📊 Module Visualization**: Visual overview of modules and lessons with performance metrics
- **📝 Template System**: 8 pre-built feedback templates for common scenarios
- **🖨️ Print View**: Clean, professional printouts for offline reference
- **💾 Import/Export**: Backup and share database via JSON files
- **⌨️ Keyboard Shortcuts**: Streamlined workflow with hotkeys

## 🚀 Quick Start

### Option 1: Use Locally
1. Download the `index.html` file
2. Open it in any modern web browser (Chrome, Firefox, Edge, Safari)
3. Start adding feedback entries
4. Data saves automatically in your browser

### Option 2: Deploy to GitHub Pages (Recommended)
1. Fork or download this repository
2. Create a new repository on GitHub
3. Upload the `index.html` file
4. Enable GitHub Pages in repository settings
5. Share the URL with your team

### Option 3: Quick Deploy to Netlify
1. Visit [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag and drop the `index.html` file
3. Get an instant shareable URL
4. Create a free account to make it permanent

## 📖 User Guide

### Adding New Feedback
1. Select a course from the home screen
2. Click "+ Add Feedback" button
3. Fill in the required fields:
   - Module and Lesson numbers
   - Assignment type and name
   - Feedback text (what gets copied to Canvas)
   - Performance level
   - Learning outcomes (optional, multiple allowed)
4. Use templates for quick common feedback
5. Click "Save Feedback"

### Finding Feedback
1. Navigate to the relevant course
2. Use the search bar for keywords
3. Filter by:
   - Assignment type (Quiz, Lab, Discussion, etc.)
   - Performance level (Excellent, Satisfactory, Needs Improvement)
   - Module number (via Module View)

### Using Feedback in Canvas
1. Find the relevant feedback entry
2. Click the "Copy" button
3. Paste directly into Canvas grading comment field
4. Customize as needed for the specific student

### Module Sequence View
1. Click the 📊 icon in the toolbar
2. View all modules at a glance with:
   - Number of feedback entries
   - Lesson coverage
   - Performance distribution
3. Click any module to filter feedback

### Feedback Templates
Pre-built templates available:
- **Excellent Understanding** - Comprehensive mastery
- **Good Effort - Minor Issues** - Mostly correct with small problems
- **Needs Review** - Significant gaps requiring attention
- **Incomplete Submission** - Missing components
- **Excellent Lab Work** - Outstanding practical work
- **Perfect Quiz Score** - Full marks recognition
- **Thoughtful Discussion** - Quality discussion participation
- **Technical Accuracy Issues** - Technical corrections needed

### Data Management

#### Export Database
1. Click "📥 Export Database" in the header
2. Save the JSON file
3. Share with other instructors or keep as backup

#### Import Database
1. Click "📤 Import Database"
2. Select a JSON file from another instructor
3. Feedback entries merge with existing data

## 🔧 Technical Details

### Supported Courses
- ITNW 1308 - Client OS
- ITSC 1325 - PC Hardware
- ITNW 1358 - Network +
- ITCC 1314 - CCNA 1
- ITCC 1344 - CCNA 2
- ITSC 1316 - Linux Installation & Config
- ITNW 1345 - Directory Services
- ITCC 2320 - CCNA 3
- ITNW 1313 - Comp. Virtualization
- ITSY 1342 - Info Tech Security
- ITNW 2354 - Internet/Intranet Server
- ITSE 1329 - Program Logic & Design
- ITNW 1309 - Fund of Cloud
- ITNW 2352 - Admin SQL Server
- ITSC 2370 - Final Projects
- ITSC 2386 - Internship
- ITCC 2343 - Network Security
- ITNW 2335 - Network Troubleshooting & Support

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Data Storage
- Uses browser's localStorage
- Data persists between sessions
- Each browser/device maintains separate database
- No internet connection required after initial load

## ⌨️ Keyboard Shortcuts

- **Ctrl+N** - Add new feedback (when in course view)
- **Ctrl+P** - Print current view
- **Escape** - Close modal windows
- **Enter** - Add learning outcome (in outcome field)

## 🤝 Collaboration

### Current Version (Local Storage)
- Each instructor maintains their own database
- Share feedback via Export/Import JSON files
- Manual synchronization required

### Future Version (Planned)
- Centralized database (Firebase/Cloud)
- Real-time synchronization
- User authentication
- Automatic backup
- Revision history

## 🐛 Troubleshooting

### Feedback Not Saving
- Check browser's localStorage is enabled
- Ensure not in Private/Incognito mode
- Try different browser if issues persist

### Can't Copy to Clipboard
- Some browsers require HTTPS for clipboard access
- Manually select and copy text as fallback

### Import Not Working
- Ensure JSON file is properly formatted
- Check file isn't corrupted
- Try exporting and re-importing to test

## 📊 Best Practices

1. **Consistent Naming**: Use standard format for assignments
2. **Detailed Descriptions**: Help others understand assignment context
3. **Learning Outcomes**: Tag all feedback for better searchability
4. **Regular Backups**: Export database weekly
5. **Rate Feedback**: Help identify most effective comments
6. **Template Usage**: Customize templates rather than using verbatim

## 🔒 Privacy & Security

- All data stored locally in browser
- No external servers or APIs used
- No student data should be included
- Focus on reusable feedback templates
- Follow FERPA guidelines

## 📝 License

This tool is provided free for educational use by CNS instructors.

## 🆘 Support

For questions, suggestions, or bug reports:
1. Check this README first
2. Try the Troubleshooting section
3. Export your database before making major changes
4. Contact your CNS department lead

## 🚧 Roadmap

### Version 2.0 (Planned)
- [ ] Cloud database integration
- [ ] User authentication system
- [ ] Real-time collaboration
- [ ] Canvas API integration
- [ ] Batch feedback operations
- [ ] Analytics dashboard
- [ ] Mobile app version

### Feature Requests
- Feedback versioning/history
- Rubric integration
- Student performance tracking
- Automated feedback suggestions
- Multi-language support

## 👥 Contributors

Created for CNS Instructors by Adrian Medrano and team.

## 🔄 Version History

- **v1.0.0** (2024) - Initial release with local storage
  - Core feedback management
  - 18 course support
  - Template system
  - Module visualization
  - Print support

---

**Note**: This is a standalone tool designed to complement Canvas LMS. It is not officially affiliated with or endorsed by Canvas/Instructure.
