# Visit Japan HQ API

This is the API service for the Visit Japan HQ project. It provides the backend functionality for the static frontend.

## API Endpoints

- `GET /api/places` - Google Places API integration
- `POST /api/trigger-dispatch` - GitHub webhook trigger

## Development

```bash
npm run dev
```

## Deployment

This API can be deployed to Vercel, Netlify Functions, or any other serverless platform.

## Environment Variables

- `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY` - Google Places API key
- `NEXT_PUBLIC_GH_TOKEN` - GitHub token for webhooks
