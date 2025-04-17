# WineRate App

A React application for rating and tracking your favorite wines.

## Features

- User authentication with Supabase
- Wine catalogue display
- Rating system for wines (aroma, body, flavor, finish)
- Favorites functionality
- Tasting notes

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file based on `.env.example` and add your Supabase credentials
4. Start the development server:
   ```
   npm start
   ```

## Supabase Schema

This application expects the following tables in your Supabase database:

1. `wines` - with fields:
   - id (primary key)
   - name (text)
   - vintage (integer or text)

2. `favourites` - with fields:
   - id (primary key)
   - user_id (foreign key to auth.users)
   - wine_id (foreign key to wines)

3. `ratings` - Optional, for storing permanent ratings:
   - id (primary key)
   - user_id (foreign key to auth.users)
   - wine_id (foreign key to wines)
   - aroma (integer)
   - body (integer)
   - flavor (integer)
   - finish (integer)
   - note (text)

## Technologies Used

- React
- Supabase (Auth & Database)
- TailwindCSS
- React Router
- Lucide React (icons)