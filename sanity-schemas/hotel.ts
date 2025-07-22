export default {
  name: 'hotel',
  title: 'Hotel',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Hotel Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'city',
      title: 'City',
      type: 'string',
    },
    {
      name: 'region',
      title: 'Region',
      type: 'string',
      options: {
        list: [
          { title: 'Hokkaido', value: 'Hokkaido' },
          { title: 'Tohoku', value: 'Tohoku' },
          { title: 'Kanto', value: 'Kanto' },
          { title: 'Chubu', value: 'Chubu' },
          { title: 'Kansai', value: 'Kansai' },
          { title: 'Chugoku', value: 'Chugoku' },
          { title: 'Shikoku', value: 'Shikoku' },
          { title: 'Kyushu', value: 'Kyushu' },
        ],
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'longDescription',
      title: 'Long Description',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      of: [{ type: 'image' }],
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule: any) => Rule.min(0).max(5),
    },
    {
      name: 'reviewCount',
      title: 'Review Count',
      type: 'number',
    },
    {
      name: 'price',
      title: 'Starting Price (USD)',
      type: 'number',
    },
    {
      name: 'priceRange',
      title: 'Price Range',
      type: 'string',
      options: {
        list: [
          { title: 'Budget', value: 'Budget' },
          { title: 'Mid-Range', value: 'Mid-Range' },
          { title: 'Luxury', value: 'Luxury' },
          { title: 'Ultra Luxury', value: 'Ultra Luxury' },
        ],
      },
    },
    {
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Hotel', value: 'Hotel' },
          { title: 'Ryokan', value: 'Ryokan' },
          { title: 'Capsule Hotel', value: 'Capsule Hotel' },
          { title: 'Business Hotel', value: 'Business Hotel' },
          { title: 'Resort', value: 'Resort' },
        ],
      },
    },
    {
      name: 'starRating',
      title: 'Star Rating',
      type: 'number',
      validation: (Rule: any) => Rule.min(1).max(5),
    },
    {
      name: 'featured',
      title: 'Featured Hotel',
      type: 'boolean',
      initialValue: false,
    },
    // Affiliate Marketing Fields
    {
      name: 'affiliateLinks',
      title: 'Affiliate Links',
      type: 'object',
      fields: [
        {
          name: 'bookingCom',
          title: 'Booking.com Affiliate ID',
          type: 'string',
        },
        {
          name: 'hotelsCom',
          title: 'Hotels.com Affiliate ID',
          type: 'string',
        },
        {
          name: 'expedia',
          title: 'Expedia Affiliate ID',
          type: 'string',
        },
        {
          name: 'agoda',
          title: 'Agoda Affiliate ID',
          type: 'string',
        },
      ],
    },
    {
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
        },
        {
          name: 'email',
          title: 'Email',
          type: 'string',
        },
        {
          name: 'website',
          title: 'Website',
          type: 'url',
        },
        {
          name: 'address',
          title: 'Address',
          type: 'text',
          rows: 2,
        },
      ],
    },
    {
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
    },
    {
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
    },
    {
      name: 'seoKeywords',
      title: 'SEO Keywords',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'location',
      media: 'image',
    },
  },
}; 