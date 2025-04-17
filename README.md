# WineRate App

A React application for rating and tracking your favorite wines. Deployed at [https://jw41784.github.io/winerate/](https://jw41784.github.io/winerate/)

## Features

- User authentication with Supabase (email/password)
- Wine catalogue display
- Rating system for wines (aroma, body, flavor, finish)
- Favorites functionality
- Tasting notes

## Project Status

**Current Progress:**
- ✅ Initial app structure created
- ✅ UI components developed
- ✅ Supabase integration implemented
- ✅ Deployed to GitHub Pages
- ✅ Email authentication configured

**Next Steps:**
- Complete saving ratings to database
- Fix any authentication issues
- Implement wine filtering
- Add a dashboard view
- Consider adding social login options

## Development Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Update Supabase credentials in `src/App.jsx`
4. Start the development server:
   ```
   npm start
   ```

## Deployment

The app is deployed on GitHub Pages. To deploy updates:

```
npm run deploy
```

## Supabase Configuration

The application uses Supabase for authentication and data storage. The database schema is available in `supabase/schema.sql`.

Required Supabase configuration:
1. **Authentication → URL Configuration**
   - Site URL: `https://jw41784.github.io/winerate`
   - Add the same URL to Redirect URLs

2. **API → Settings**
   - Add `https://jw41784.github.io` to allowed origins

## Technologies Used

- React
- Supabase (Auth & Database)
- TailwindCSS
- React Router
- Lucide React (icons)
- GitHub Pages (hosting)