# WineRate Supabase Setup

## Steps to Set Up Supabase:

1. Create a Supabase account at [https://supabase.com](https://supabase.com)

2. Create a new project and note your project URL and anon key

3. Run the database schema
   - Go to SQL Editor in your Supabase dashboard
   - Copy and paste the contents of `schema.sql` 
   - Run the SQL query to create all tables and sample data

4. Set up Authentication
   - Go to Authentication → Settings
   - Enable Email and Google providers
   - For Google auth, you'll need to set up OAuth credentials in Google Cloud Console
   - Set your site URL and redirect URLs as instructed in Supabase docs

5. Create a `.env` file in the root directory of your project:
   ```
   REACT_APP_SUPABASE_URL=your_supabase_project_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

## Database Schema

### Tables:
1. `wines` - Wine catalog
   - id (primary key)
   - name (text)
   - vintage (integer)
   - created_at (timestamp)

2. `favourites` - User's favorite wines
   - id (primary key)
   - user_id (references auth.users)
   - wine_id (references wines)
   - created_at (timestamp)

3. `ratings` - User's wine ratings
   - id (primary key)
   - user_id (references auth.users)
   - wine_id (references wines)
   - aroma (integer 1-5)
   - body (integer 1-5)
   - flavor (integer 1-5)
   - finish (integer 1-5)
   - note (text)
   - created_at (timestamp)
   - updated_at (timestamp)

### Security:
- Row Level Security is enabled on all tables
- Policies ensure users can only access their own data (favorites and ratings)
- Wine catalog is publicly readable