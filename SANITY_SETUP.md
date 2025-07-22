# Sanity.io Setup Guide for Japan Travel Directory

This guide will help you set up Sanity.io as your content management system (CMS) for the Japan Travel Directory website.

## 🚀 Quick Setup

### 1. Create a Sanity Account

1. Go to [sanity.io](https://www.sanity.io) and sign up for a free account
2. Create a new project called "Japan Travel Directory"
3. Note down your Project ID and Dataset name (usually "production")

### 2. Install Sanity CLI

```bash
npm install -g @sanity/cli
```

### 3. Initialize Sanity Studio (Optional)

If you want to run Sanity Studio locally:

```bash
# In your project directory
npx sanity@latest init --template clean --create-project "Japan Travel Directory" --dataset production
```

### 4. Environment Variables

Add these to your `.env.local` file:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_TOKEN=your_api_token_here
```

### 5. Get Your API Token

1. Go to [manage.sanity.io](https://manage.sanity.io)
2. Select your project
3. Go to API section
4. Create a new token with "Read" permissions
5. Copy the token to your environment variables

## 📝 Content Structure

### Destinations Schema

The destinations schema includes:

- **Basic Info**: Name, slug, region, description
- **Media**: Main image and gallery
- **Ratings**: Rating, review count
- **Pricing**: Average daily cost
- **Details**: Highlights, best time to visit, weather, transportation
- **SEO**: Custom title, description, keywords
- **Featured**: Mark as featured destination

### Hotels Schema

The hotels schema includes:

- **Basic Info**: Name, slug, location, city, region
- **Media**: Main image and gallery
- **Ratings**: Rating, review count, star rating
- **Pricing**: Starting price, price range category
- **Details**: Amenities, hotel category, description
- **Affiliate Links**: Booking.com, Hotels.com, Expedia, Agoda IDs
- **Contact Info**: Phone, email, website, address
- **SEO**: Custom title, description, keywords
- **Featured**: Mark as featured hotel

## 🎯 Adding Content

### Method 1: Sanity Studio (Recommended)

1. Go to [your-project.sanity.studio](https://your-project.sanity.studio)
2. Create new destinations and hotels
3. Upload images and fill in all details
4. Publish your content

### Method 2: API Import

You can also import content programmatically using the Sanity API.

### Sample Destination Data

```json
{
  "name": "Tokyo",
  "slug": { "current": "tokyo" },
  "region": "Kanto",
  "description": "Japan's bustling capital city with modern skyscrapers and traditional temples",
  "rating": 4.8,
  "reviewCount": 1247,
  "price": 120,
  "highlights": ["Shibuya Crossing", "Tokyo Skytree", "Senso-ji Temple", "Tsukiji Market"],
  "bestTime": "March-May, September-November",
  "featured": true
}
```

### Sample Hotel Data

```json
{
  "name": "Park Hyatt Tokyo",
  "slug": { "current": "park-hyatt-tokyo" },
  "location": "Shinjuku, Tokyo",
  "city": "Tokyo",
  "region": "Kanto",
  "description": "Iconic luxury hotel featured in 'Lost in Translation' with stunning city views",
  "rating": 4.9,
  "reviewCount": 2341,
  "price": 450,
  "priceRange": "Luxury",
  "amenities": ["Free WiFi", "Spa", "Restaurant", "Gym", "Pool"],
  "category": "Hotel",
  "starRating": 5,
  "featured": true,
  "affiliateLinks": {
    "bookingCom": "park-hyatt-tokyo",
    "hotelsCom": "park-hyatt-tokyo-hcom",
    "expedia": "park-hyatt-tokyo-expedia"
  }
}
```

## 🔧 Configuration

### Image Handling

The website automatically handles Sanity images with:
- Responsive sizing
- Optimized formats (WebP, JPEG, PNG)
- Hotspot cropping for better composition

### Caching

Content is cached for 1 hour (3600 seconds) to improve performance:
```typescript
export const revalidate = 3600;
```

### Fallback Data

If Sanity is not configured, the website will show fallback data to ensure it always works.

## 📊 Content Management Tips

### SEO Optimization

1. **Use descriptive titles**: "Tokyo Travel Guide: Best Attractions & Tips"
2. **Write compelling descriptions**: 150-160 characters for meta descriptions
3. **Include relevant keywords**: Japan, Tokyo, travel, tourism, etc.
4. **Use proper slugs**: Clean, URL-friendly versions of titles

### Image Guidelines

1. **High quality**: Use images with at least 1200x800 pixels
2. **Optimized**: Compress images before uploading
3. **Descriptive alt text**: Include relevant keywords
4. **Consistent aspect ratios**: 16:9 works well for most content

### Content Strategy

1. **Regular updates**: Add new destinations and hotels regularly
2. **Seasonal content**: Highlight cherry blossoms, autumn colors, etc.
3. **Local insights**: Include insider tips and local recommendations
4. **Multimedia**: Use galleries to showcase destinations

## 🚀 Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables in Production

Make sure to add these in your hosting platform:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_TOKEN`

## 🔍 Troubleshooting

### Common Issues

1. **Images not loading**: Check your Sanity project ID and dataset
2. **Content not updating**: Verify your API token has read permissions
3. **Build errors**: Ensure all environment variables are set

### Debug Mode

Enable debug mode by adding this to your queries:
```typescript
console.log('Sanity data:', destinations);
```

## 📈 Performance Optimization

### Image Optimization

- Use Sanity's built-in image optimization
- Implement lazy loading for images
- Use appropriate image sizes for different devices

### Caching Strategy

- Implement ISR (Incremental Static Regeneration)
- Use CDN for static assets
- Cache API responses appropriately

## 🎯 Next Steps

1. **Set up Sanity Studio** for easy content management
2. **Add initial content** for destinations and hotels
3. **Configure affiliate links** for revenue generation
4. **Set up analytics** to track content performance
5. **Create content calendar** for regular updates

## 📞 Support

- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity Community](https://www.sanity.io/community)
- [Next.js Documentation](https://nextjs.org/docs)

---

**Happy content managing! 🗾✈️** 