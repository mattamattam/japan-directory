# 🔧 GitHub Actions Setup Guide

## **Overview**

This guide will help you set up GitHub Actions to automatically build and deploy your static site to Vercel.

## **🚀 Workflow Features**

### **What the Workflow Does:**

- ✅ **Builds static site** - generates HTML files
- ✅ **Runs linting** - ensures code quality
- ✅ **Tests builds** - on pull requests
- ✅ **Deploys to Vercel** - on main branch pushes
- ✅ **Uploads artifacts** - for debugging

### **Trigger Conditions:**

- **Push to main/master** - builds and deploys
- **Pull requests** - builds and tests only
- **Manual trigger** - can be added later

## **🔐 Required GitHub Secrets**

### **1. Vercel Configuration**

#### **Get Vercel Token:**

1. Go to [Vercel Account Settings](https://vercel.com/account/tokens)
2. Click "Create Token"
3. Name it "GitHub Actions"
4. Copy the token

#### **Get Vercel Project ID:**

1. Go to your Vercel project
2. Click "Settings" → "General"
3. Copy "Project ID"

#### **Get Vercel Org ID:**

1. Go to [Vercel Teams](https://vercel.com/teams)
2. Click your team/organization
3. Copy "Team ID"

### **2. Environment Variables**

#### **Sanity Configuration:**

- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Your Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` - Usually "production"
- `SANITY_API_TOKEN` - Your Sanity API token

#### **Google APIs:**

- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - Google Maps API key
- `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY` - Google Places API key

## **📋 Setup Steps**

### **Step 1: Add GitHub Secrets**

1. **Go to your GitHub repository**
2. **Click "Settings" → "Secrets and variables" → "Actions"**
3. **Click "New repository secret"**
4. **Add each secret:**

```bash
# Vercel Configuration
VERCEL_TOKEN=your_vercel_token_here
VERCEL_ORG_ID=your_vercel_org_id_here
VERCEL_PROJECT_ID=your_vercel_project_id_here

# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_api_token

# Google APIs
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=your_google_places_api_key
```

### **Step 2: Connect Vercel Project**

1. **Install Vercel CLI:**

   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**

   ```bash
   vercel login
   ```

3. **Link your project:**
   ```bash
   vercel link
   ```

### **Step 3: Test the Workflow**

1. **Push to main branch:**

   ```bash
   git add .
   git commit -m "Add GitHub Actions workflow"
   git push origin main
   ```

2. **Check GitHub Actions:**
   - Go to "Actions" tab
   - Watch the workflow run
   - Check for any errors

## **🔍 Workflow Details**

### **Build Job (`build-and-deploy`):**

```yaml
- Checkout code
- Setup Node.js 18
- Install dependencies
- Build static site
- Upload artifacts
- Deploy to Vercel (main branch only)
```

### **Test Job (`test-build`):**

```yaml
- Checkout code
- Setup Node.js 18
- Install dependencies
- Run linting
- Build static site (test)
- Upload artifacts (test)
```

## **📊 Monitoring**

### **GitHub Actions Dashboard:**

- ✅ **Build status** - see if builds succeed
- ✅ **Deployment logs** - debug any issues
- ✅ **Artifact downloads** - access built files
- ✅ **Workflow history** - track changes

### **Vercel Dashboard:**

- ✅ **Deployment status** - see live deployments
- ✅ **Performance metrics** - monitor site performance
- ✅ **Domain management** - configure custom domains
- ✅ **Analytics** - track user behavior

## **🚨 Troubleshooting**

### **Common Issues:**

#### **1. Build Failures:**

```bash
# Check if all secrets are set
# Verify environment variables
# Check for TypeScript errors
```

#### **2. Deployment Failures:**

```bash
# Verify Vercel token
# Check project ID
# Ensure Vercel project is linked
```

#### **3. Missing Environment Variables:**

```bash
# Add all required secrets
# Check secret names match workflow
# Verify secret values are correct
```

### **Debug Commands:**

```bash
# Test build locally
npm run build

# Check for linting errors
npm run lint

# Verify environment variables
echo $NEXT_PUBLIC_SANITY_PROJECT_ID
```

## **🔄 Workflow Triggers**

### **Automatic Triggers:**

- ✅ **Push to main** - builds and deploys
- ✅ **Push to master** - builds and deploys
- ✅ **Pull requests** - builds and tests only

### **Manual Triggers (Optional):**

```yaml
# Add to workflow if needed
on:
  workflow_dispatch:
    inputs:
      environment:
        description: "Environment to deploy to"
        required: true
        default: "production"
        type: choice
        options:
          - production
          - staging
```

## **📈 Benefits**

### **Automated Deployment:**

- ✅ **No manual deployment** - automatic on push
- ✅ **Consistent builds** - same environment every time
- ✅ **Rollback capability** - Vercel handles rollbacks
- ✅ **Preview deployments** - for pull requests

### **Quality Assurance:**

- ✅ **Linting** - catches code issues
- ✅ **Build testing** - ensures site builds
- ✅ **Artifact storage** - for debugging
- ✅ **Deployment logs** - full visibility

## **🎯 Next Steps**

1. **Add all secrets** to GitHub repository
2. **Push to main branch** to trigger first deployment
3. **Monitor the workflow** in GitHub Actions
4. **Check Vercel dashboard** for deployment status
5. **Test the live site** to ensure everything works

Your automated deployment pipeline is now ready! 🚀
