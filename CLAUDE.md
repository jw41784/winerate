# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run all tests
- `npm test -- --testNamePattern="test name"` - Run specific test
- `npm run deploy` - Deploy to GitHub Pages

## Code Style
- **React**: Functional components with hooks
- **Styling**: TailwindCSS for styling (avoid inline CSS)
- **Imports**: Group by: 1) React, 2) third-party, 3) local
- **Components**: Keep UI components in App.jsx (small project) with export keyword
- **Variable Naming**: camelCase for variables, PascalCase for components
- **Error Handling**: Use try/catch with console.error for async operations
- **Database**: Use Supabase client for data operations following existing patterns
- **Authentication**: Use Supabase Auth UI and follow existing auth flow
- **Commits**: Descriptive and concise, focus on what and why

## Project Structure
- React app with Supabase backend (authentication and database)
- Main functionality in App.jsx
- Database schema in supabase/schema.sql