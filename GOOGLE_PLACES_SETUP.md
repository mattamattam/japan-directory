# Google Places API Setup Guide

## Step 1: Get Google Places API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Places API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Places API"
   - Click "Enable"

4. Create API credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy your API key

## Step 2: Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
# Google Places API Key
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=your_actual_api_key_here
```

## Step 3: API Key Restrictions (Recommended)

For security, restrict your API key:

1. In Google Cloud Console, go to "APIs & Services" > "Credentials"
2. Click on your API key
3. Under "Application restrictions", select "HTTP referrers"
4. Add your domain(s):
   - `http://localhost:3000/*` (for development)
   - `https://yourdomain.com/*` (for production)

5. Under "API restrictions", select "Restrict key"
6. Select "Places API" from the list

## Step 4: Usage Limits

- **Free tier**: 1,000 requests/day
- **Paid tier**: $0.017 per request after free tier
- **Caching**: Results are cached for 24 hours to minimize API calls

## Step 5: Testing

1. Start your development server: `npm run dev`
2. Visit your homepage
3. Check the browser console for any API errors
4. Verify that ratings are loading from Google Places API

## Troubleshooting

### Common Issues:

1. **"API key not configured" warning**
   - Check that your `.env.local` file exists and has the correct variable name
   - Restart your development server after adding the environment variable

2. **"REQUEST_DENIED" error**
   - Check that Places API is enabled in your Google Cloud Console
   - Verify API key restrictions allow your domain

3. **"OVER_QUERY_LIMIT" error**
   - You've exceeded the daily quota
   - Check your usage in Google Cloud Console
   - Consider upgrading to paid tier

4. **No ratings showing**
   - Check browser console for errors
   - Verify the place name and location are searchable
   - Fallback ratings will be used if API fails

## Cost Optimization

- **Caching**: Results are cached for 24 hours
- **Fallback**: Uses realistic placeholder ratings when API fails
- **Error handling**: Graceful degradation to fallback data
- **Rate limiting**: Consider implementing request throttling for high-traffic sites

## Production Considerations

1. **Environment variables**: Use your hosting platform's environment variable system
2. **Domain restrictions**: Update API key restrictions for your production domain
3. **Monitoring**: Set up alerts for API usage and errors
4. **Backup plan**: Fallback ratings ensure the site works even if API is down
