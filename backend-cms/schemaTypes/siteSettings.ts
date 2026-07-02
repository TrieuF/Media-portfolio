import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    // Page Identity
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    // Brand Identity
    defineField({
      name: 'brandName',
      title: 'Brand Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'brandTitle',
      title: 'Brand Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    // Contact & Socials
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'instagramName',
      title: 'Instagram Username',
      type: 'string',
    }),
    defineField({
      name: 'linkedinName',
      title: 'LinkedIn Username',
      type: 'string',
    }),
    defineField({
      name: 'githubName',
      title: 'GitHub Username',
      type: 'string',
    }),

    // Bio Section
    defineField({
      name: 'bioText',
      title: 'Bio Text',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'portraitPhoto',
      title: 'Portrait Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'pageTitle',
    },
  },
})
