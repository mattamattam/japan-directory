export default {
  name: 'destination',
  title: 'Destination',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
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
      title: 'Average Daily Cost (USD)',
      type: 'number',
    },
    {
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'bestTime',
      title: 'Best Time to Visit',
      type: 'string',
    },
    {
      name: 'weather',
      title: 'Weather Information',
      type: 'text',
      rows: 2,
    },
    {
      name: 'transportation',
      title: 'Transportation Info',
      type: 'text',
      rows: 2,
    },
    {
      name: 'featured',
      title: 'Featured Destination',
      type: 'boolean',
      initialValue: false,
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
      subtitle: 'region',
      media: 'image',
    },
  },
}; 