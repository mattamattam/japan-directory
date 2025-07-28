# 🚀 Static Site Generation & Vercel Deployment Guide

## **Overview**

This guide will help you deploy your Japan Directory site as a static site to Vercel using Next.js static export.

## **🔧 Configuration Changes Made**

### **1. Next.js Configuration (`next.config.ts`)**

```typescript
const nextConfig: NextConfig = {
  output: "export", // Enable static export
  trailingSlash: true, // Add trailing slashes for static hosting
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      // Unsplash images
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      // Sanity CDN images
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/**",
      },
    ],
  },
};
```

### **2. Static Generation Functions**

#### **Homepage (`src/app/page.tsx`)**

```typescript
export const dynamic = "force-static";
```

#### **Destination Pages (`src/app/destinations/[slug]/page.tsx`)**

```typescript
export async function generateStaticParams() {
  try {
    const destinations = await getDestinations();
    return destinations.map((destination: any) => ({
      slug: destination.slug.current || destination.slug,
    }));
  } catch (error) {
    // Fallback to known destinations
    return [
      { slug: "tokyo" },
      { slug: "osaka" },
      { slug: "kyoto" },
      { slug: "hiroshima" },
    ];
  }
}
```

## **🏗️ Build Process**

### **Local Development**

```bash
npm run dev
```

### **Static Build**

```bash
npm run build
```

This will create a `out/` directory with all static files.

### **Preview Static Build**

```bash
npm run start
```

## **🚀 Vercel Deployment**

### **1. Connect to Vercel**

1. **Install Vercel CLI:**

   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**

   ```bash
   vercel login
   ```

3. **Deploy to Vercel:**
   ```bash
   vercel
   ```

### **2. Environment Variables**

Set these in your Vercel dashboard:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_api_token

# Google APIs (for maps and places)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=your_google_places_api_key
```

### **3. Build Settings**

In Vercel dashboard:

- **Framework Preset:** Next.js
- **Build Command:** `npm run build`
- **Output Directory:** `out`
- **Install Command:** `npm install`

## **📁 Static Export Structure**

After build, your `out/` directory will contain:

```
out/
├── _next/
├── destinations/
│   ├── tokyo/
│   ├── osaka/
│   ├── kyoto/
│   └── hiroshima/
├── hotels/
├── tours/
├── index.html
└── ...
```

## **⚡ Performance Benefits**

### **Static Generation Advantages:**

- ✅ **Instant page loads** - pre-built HTML
- ✅ **Better SEO** - search engines can crawl all pages
- ✅ **Lower server costs** - no server-side rendering
- ✅ **CDN caching** - global content delivery
- ✅ **Higher reliability** - no server dependencies

### **Build Time Data Fetching:**

- ✅ **Sanity data** - fetched at build time
- ✅ **Fallback data** - ensures site works without Sanity
- ✅ **SEO metadata** - generated for each page
- ✅ **Image optimization** - handled by CDN

## **🔄 Content Updates**

### **Automatic Rebuilds:**

1. **Push to GitHub** - triggers Vercel rebuild
2. **Sanity webhooks** - can trigger rebuilds on content changes
3. **Manual rebuild** - via Vercel dashboard

### **Content Management:**

- **Sanity Studio** - for content updates
- **Static pages** - rebuild on content changes
- **Images** - served from Sanity CDN

## **🔍 SEO Benefits**

### **Static Generation SEO:**

- ✅ **All pages pre-built** - search engines can index everything
- ✅ **Fast loading** - improves Core Web Vitals
- ✅ **Meta tags** - generated for each page
- ✅ **Sitemap** - can be generated automatically
- ✅ **Structured data** - can be added for rich snippets

## **🚨 Important Notes**

### **Static Export Limitations:**

- ❌ **No API routes** - server-side functions won't work
- ❌ **No dynamic routes** - all routes must be pre-generated
- ❌ **No server-side state** - everything must be client-side

### **Workarounds:**

- ✅ **Client-side data fetching** - for dynamic content
- ✅ **External APIs** - for real-time data (exchange rates)
- ✅ **CDN caching** - for performance
- ✅ **Fallback data** - for reliability

## **🎯 Deployment Checklist**

- [ ] **Environment variables** set in Vercel
- [ ] **Sanity project** configured
- [ ] **Google APIs** enabled
- [ ] **Build command** working locally
- [ ] **Static export** generating correctly
- [ ] **All pages** accessible
- [ ] **Images loading** properly
- [ ] **Maps working** with API key
- [ ] **SEO metadata** present
- [ ] **Performance** optimized

## **📈 Monitoring**

### **Vercel Analytics:**

- Page views
- Performance metrics
- Error tracking
- Real-time monitoring

### **Performance Monitoring:**

- Core Web Vitals
- Page load times
- User experience metrics

Your site is now ready for static deployment to Vercel! 🎉
