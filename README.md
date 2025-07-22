# Japan Travel Directory

A comprehensive Japan tourism directory website designed to generate passive income through Google AdSense and affiliate marketing. Built with Next.js, Supabase, and Sanity.io.

## 🚀 Features

### Revenue Generation
- **Google AdSense Integration** - Strategic ad placement throughout the site
- **Affiliate Marketing** - Hotel bookings, tour bookings, and travel products
- **SEO Optimized** - Built for organic traffic and search engine visibility
- **Content Marketing** - Blog section for attracting and engaging visitors

### User Experience
- **Modern Design** - Clean, responsive interface with Japan-inspired aesthetics
- **Rich Content** - Detailed destination guides, hotel listings, and travel tips
- **Mobile Optimized** - Fully responsive design for all devices
- **Fast Performance** - Optimized for speed and user experience

### Technical Features
- **Next.js 15** - Latest React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Supabase** - Database and authentication
- **Sanity.io** - Content management system
- **SEO Optimized** - Meta tags, structured data, and sitemaps

## 📁 Project Structure

```
japan-directory/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Homepage
│   │   ├── destinations/      # Destinations listing
│   │   ├── hotels/           # Hotel listings with affiliate links
│   │   ├── tours/            # Tour listings
│   │   ├── blog/             # Travel blog
│   │   └── layout.tsx        # Root layout with SEO
│   ├── components/           # Reusable UI components
│   │   ├── ui/              # Base UI components
│   │   ├── Header.tsx       # Navigation header
│   │   └── Footer.tsx       # Footer with affiliate disclosure
│   └── lib/                 # Utility functions and configurations
│       ├── supabase.ts      # Supabase client
│       ├── sanity.ts        # Sanity.io client
│       └── utils.ts         # Helper functions
├── public/                  # Static assets
└── package.json            # Dependencies and scripts
```

## 🛠️ Setup Instructions

### 1. Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- Sanity.io account
- Google AdSense account (for revenue)

### 2. Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd japan-directory

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### 3. Environment Variables

Create a `.env.local` file with the following variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Sanity.io
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_TOKEN=your_sanity_api_token

# Google AdSense
NEXT_PUBLIC_GOOGLE_ADSENSE_PUBLISHER_ID=ca-pub-your_publisher_id

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-your_measurement_id

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### 4. Database Setup (Supabase)

Create the following tables in your Supabase database:

```sql
-- Places table for destinations
CREATE TABLE places (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  region VARCHAR(100),
  description TEXT,
  image_url TEXT,
  rating DECIMAL(3,2),
  review_count INTEGER DEFAULT 0,
  price DECIMAL(10,2),
  slug VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Hotels table for accommodation listings
CREATE TABLE hotels (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  description TEXT,
  image_url TEXT,
  rating DECIMAL(3,2),
  review_count INTEGER DEFAULT 0,
  price DECIMAL(10,2),
  affiliate_id VARCHAR(255),
  amenities TEXT[],
  category VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tours table for tour listings
CREATE TABLE tours (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  duration VARCHAR(100),
  description TEXT,
  image_url TEXT,
  rating DECIMAL(3,2),
  review_count INTEGER DEFAULT 0,
  price DECIMAL(10,2),
  affiliate_id VARCHAR(255),
  location VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 💰 Revenue Optimization

### 1. Google AdSense Setup

1. **Apply for AdSense**: Visit [Google AdSense](https://www.google.com/adsense) and apply for an account
2. **Add Publisher ID**: Replace `YOUR_PUBLISHER_ID` in `src/app/layout.tsx`
3. **Ad Placement**: Strategic ad units are already placed throughout the site
4. **Ad Optimization**: Monitor performance and adjust placement for better CTR

### 2. Affiliate Marketing

#### Hotel Affiliate Programs
- **Booking.com**: High commission rates for hotel bookings
- **Hotels.com**: Competitive rates and wide selection
- **Expedia**: Good for package deals

#### Tour Affiliate Programs
- **Viator**: Leading tour booking platform
- **GetYourGuide**: Popular for activities and experiences
- **Klook**: Great for Asian destinations

#### Travel Product Affiliates
- **Amazon Associates**: Travel gear and books
- **Japan Rail Pass**: Official rail pass sales
- **Travel Insurance**: Companies like World Nomads

### 3. Content Strategy for SEO

#### Target Keywords
- "Japan travel guide"
- "Tokyo hotels"
- "Kyoto temples"
- "Japan vacation packages"
- "Best time to visit Japan"
- "Japan travel tips"

#### Content Types
- Destination guides
- Hotel reviews
- Travel itineraries
- Cultural guides
- Budget travel tips
- Seasonal travel guides

### 4. Traffic Generation

#### SEO Optimization
- Optimize meta tags and descriptions
- Create quality, long-form content
- Build internal linking structure
- Optimize for local search

#### Social Media Marketing
- Share content on Instagram, Pinterest, and Facebook
- Create engaging visual content
- Use relevant hashtags
- Engage with travel communities

#### Email Marketing
- Newsletter signup for lead generation
- Email sequences for trip planning
- Promotional emails for affiliate products

## 📈 Performance Monitoring

### Analytics Setup
1. **Google Analytics 4**: Track user behavior and conversions
2. **Google Search Console**: Monitor search performance
3. **AdSense Analytics**: Track ad revenue and performance
4. **Affiliate Tracking**: Monitor click-through rates and conversions

### Key Metrics to Track
- Page views and unique visitors
- Time on site and bounce rate
- Conversion rates for affiliate links
- AdSense revenue and CTR
- Search engine rankings
- Social media engagement

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms
- **Netlify**: Great for static sites
- **AWS Amplify**: Scalable hosting
- **DigitalOcean App Platform**: Cost-effective option

## 🔧 Customization

### Adding New Destinations
1. Add data to the `places` table in Supabase
2. Create destination-specific pages in `src/app/destinations/[slug]`
3. Update navigation and sitemap

### Adding New Hotels
1. Add hotel data to the `hotels` table
2. Include affiliate IDs for tracking
3. Update hotel listings page

### Styling Changes
- Modify Tailwind classes in components
- Update color scheme in `tailwind.config.js`
- Customize components in `src/components/ui/`

## 📝 Content Management

### Using Sanity.io
1. Set up content types for blog posts, destinations, etc.
2. Create and manage content through Sanity Studio
3. Fetch content using the Sanity client

### Manual Content Updates
- Update static data in component files
- Modify database entries directly
- Update images and assets in the `public` folder

## 🔒 Security Considerations

- Keep environment variables secure
- Regularly update dependencies
- Monitor for security vulnerabilities
- Use HTTPS in production
- Implement proper CORS policies

## 📞 Support

For questions or issues:
1. Check the documentation
2. Review the code comments
3. Create an issue in the repository
4. Contact the development team

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎯 Next Steps

1. **Content Creation**: Add more destination guides and blog posts
2. **SEO Optimization**: Implement schema markup and improve meta tags
3. **Performance**: Optimize images and implement caching
4. **Monetization**: Set up additional affiliate programs
5. **User Engagement**: Add user reviews and ratings
6. **Mobile App**: Consider developing a companion mobile app

---

**Happy coding and profitable travels! 🗾✈️💰**
