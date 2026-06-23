import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name / Logo Text',
      type: 'string',
    }),
    defineField({
      name: 'aboutText',
      title: 'About / Bio Intro',
      type: 'text',
      rows: 4,
      description: 'Keep it brief',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'platform', type: 'string', title: 'Platform (e.g., Instagram)'}),
            defineField({name: 'url', type: 'url', title: 'URL'}),
          ],
        },
      ],
    }),
    defineField({
      name: 'featuredProjects',
      title: 'Homepage Project Order',
      type: 'array',
      description:
        'Drag and drop projects to set the exact order they appear on your homepage grid.',
      of: [{type: 'reference', to: [{type: 'project'}]}],
    }),
  ],
})
