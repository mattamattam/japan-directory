#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const envExample = `# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_TOKEN=your_sanity_api_token_here

# Affiliate Marketing IDs
NEXT_PUBLIC_BOOKING_COM_AFFILIATE_ID=your_booking_com_affiliate_id
NEXT_PUBLIC_HOTELS_COM_AFFILIATE_ID=your_hotels_com_affiliate_id
NEXT_PUBLIC_EXPEDIA_AFFILIATE_ID=your_expedia_affiliate_id
NEXT_PUBLIC_AGODA_AFFILIATE_ID=your_agoda_affiliate_id
NEXT_PUBLIC_VIATOR_AFFILIATE_ID=your_viator_affiliate_id
NEXT_PUBLIC_GETYOURGUIDE_AFFILIATE_ID=your_getyourguide_affiliate_id
NEXT_PUBLIC_KLOOK_AFFILIATE_ID=your_klook_affiliate_id
NEXT_PUBLIC_AMAZON_AFFILIATE_ID=your_amazon_affiliate_id
`;

const envPath = path.join(process.cwd(), '.env.local');

if (!fs.existsSync(envPath)) {
  fs.writeFileSync(envPath, envExample);
  console.log('✅ Created .env.local file with example environment variables');
  console.log('📝 Please update the values with your actual API keys and tokens');
} else {
  console.log('⚠️  .env.local already exists. Please check SANITY_SETUP.md for required variables');
}

console.log('\n🚀 Next steps:');
console.log('1. Set up your Sanity.io account and project');
console.log('2. Update .env.local with your actual values');
console.log('3. Run "npm run dev" to start the development server');
console.log('4. Check SANITY_SETUP.md for detailed setup instructions'); 