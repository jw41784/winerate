# Setting Up GitHub Authentication for WineRate

This guide will walk you through setting up GitHub authentication for the WineRate app using Supabase.

## 1. Create a GitHub OAuth App

1. Go to your GitHub account settings by clicking on your profile picture in the top-right corner and selecting "Settings"
2. In the left sidebar, click on "Developer settings" (at the bottom)
3. Select "OAuth Apps" in the left sidebar
4. Click "New OAuth App"
5. Fill out the registration form:
   - **Application name**: WineRate
   - **Homepage URL**: `http://localhost:3000` (or your production URL)
   - **Application description**: (Optional) A wine rating application
   - **Authorization callback URL**: `https://[YOUR_SUPABASE_PROJECT].supabase.co/auth/v1/callback`
     - Replace `[YOUR_SUPABASE_PROJECT]` with your Supabase project ID
6. Click "Register application"
7. You'll see your Client ID. Click "Generate a new client secret" to create a Client Secret
8. Copy both the Client ID and Client Secret (you'll need these for Supabase)

## 2. Configure GitHub Provider in Supabase

1. Go to your Supabase project dashboard
2. Navigate to "Authentication" > "Providers" in the left sidebar
3. Find "GitHub" in the list of providers
4. Toggle the switch to enable GitHub authentication
5. Paste your GitHub Client ID and Client Secret into the appropriate fields
6. Click "Save"

## 3. Configure URL Settings in Supabase

1. In your Supabase dashboard, go to "Authentication" > "URL Configuration"
2. Set "Site URL" to `http://localhost:3000` (for development) or your production URL
3. If needed, add additional redirect URLs
4. Click "Save"

## 4. Test the Authentication

1. Start your WineRate application locally (`npm start`)
2. Try to log in using the GitHub option
3. You should be redirected to GitHub to authorize the application
4. After authorization, you should be redirected back to your app and logged in

## Troubleshooting

- **Callback URL Error**: Make sure the callback URL in GitHub matches exactly what Supabase requires
- **Redirect Issues**: Check that your site URL and redirect URLs are correctly configured in Supabase
- **CORS Errors**: Make sure your local development server is running on the same port specified in the URL configuration

## Production Deployment

When deploying to production:
1. Update the GitHub OAuth app with your production URL
2. Update the Site URL and Redirect URLs in Supabase Authentication settings
3. Make sure your .env file has the correct production Supabase credentials