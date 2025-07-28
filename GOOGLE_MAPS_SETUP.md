# Google Places API Setup Guide

## Overview

This guide will help you set up Google Places API for fetching real ratings and reviews for destinations and hotels.

## Prerequisites

- Google Cloud Platform account
- Billing enabled on your Google Cloud project

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable billing for your project

## Step 2: Enable Required APIs

1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Enable these APIs:
   - **Places API (New)** (for ratings and reviews) - **IMPORTANT: Use the NEW version**

## Step 3: Create API Key

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy the generated API key

## Step 4: Configure API Key Restrictions (IMPORTANT)

1. Click on the API key you just created
2. **Application restrictions**: Select "HTTP referrers (web sites)"
3. Add your domain(s):
   - `http://localhost:3000/*` (for development)
   - `https://localhost:3000/*` (for development with HTTPS)
   - `http://127.0.0.1:3000/*` (alternative localhost)
   - `yourdomain.com/*` (for production)
   - **For server-side API calls**: Add `*` (wildcard) to allow server requests
4. **API restrictions**: Select "Restrict key"
5. Select these APIs from the dropdown:
   - **Places API (New)** - **Make sure to select the NEW version**
6. Click "Save"

## Step 5: Add API Keys to Environment Variables

1. Create or edit your `.env.local` file in the project root
2. Add this line:
   ```
   NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=your_api_key_here
   ```
3. Replace `your_api_key_here` with the actual API key you copied

## Step 6: Restart Your Development Server

1. Stop your Next.js development server
2. Run `npm run dev` again

## Step 7: Test Your Setup

1. Check the browser console for any error messages
2. Visit a destination page to see real ratings from Google Places

## Troubleshooting

### REQUEST_DENIED Error

If you get `{"error":"API key test failed","status":"REQUEST_DENIED"}`, check:

1. **API Restrictions**:
   - Go to Google Cloud Console > APIs & Services > Credentials
   - Click on your API key
   - Under "API restrictions", make sure you selected the correct APIs:
     - **Places API (New)** - **IMPORTANT: Use the NEW version, not the legacy one**

2. **Application Restrictions**:
   - Under "Application restrictions", make sure you added:
     - `http://localhost:3000/*`
     - `https://localhost:3000/*`
     - `http://127.0.0.1:3000/*`
     - **For server-side calls**: Add `*` (wildcard) to allow server requests

3. **API Enablement**:
   - Go to "APIs & Services" > "Library"
   - Search for and enable:
     - **Places API (New)** - **Make sure to enable the NEW version**

4. **Billing**:
   - Make sure billing is enabled on your Google Cloud project
   - Even with free tier, billing must be enabled

### PERMISSION_DENIED Error (Referer Issues)

If you get `"Requests from referer <empty> are blocked"`:

1. **For Development**: Add `*` to your HTTP referrers list to allow server-side calls
2. **For Production**: Add your domain with wildcard: `yourdomain.com/*`
3. **Alternative**: Set Application restrictions to "None" temporarily for testing

### Legacy API Error

If you get an error about "legacy API not enabled", make sure you:

1. Enable **Places API (New)** instead of the legacy Places API
2. The new API uses different endpoints and response formats
3. Our code has been updated to use the new API format

### Other Common Issues:

- **"API key not configured"**: Check that your `.env.local` file exists and has the correct variable name
- **CORS errors**: The server-side API route should handle this automatically
- **Billing issues**: Make sure billing is enabled on your Google Cloud project

## Cost Considerations

- **Places API (New)**: First 1,000 requests per month are free
- After free tier: $17 per 1,000 additional Places requests
- For most websites, this stays within the free tier

## Security Notes

- The API keys are exposed in the client-side code (this is normal for these APIs)
- Use HTTP referrer restrictions to limit usage to your domain
- Monitor usage in Google Cloud Console to prevent unexpected charges

## Features Enabled

Once set up, you'll have:

- **Real Ratings**: Live ratings and review counts from Google Places (New API)
- **Accurate Data**: Up-to-date information from Google's database
- **Professional Appearance**: Real ratings instead of placeholder data
