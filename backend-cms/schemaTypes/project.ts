import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    // --- ADDED CATEGORIES REFERENCE FIELD ---
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      description: 'Tag this project with one or more categories.',
      of: [{type: 'reference', to: [{type: 'category'}]}],
    }),
    // --- LAYOUT CONTROLS ---
    defineField({
      name: 'galleryLayout',
      title: 'Gallery Presentation Style',
      type: 'string',
      description: 'How should the media behave on the frontend?',
      options: {
        list: [
          {
            title: 'Video Style (Large vertical stack layout, great for reels + clips)',
            value: 'video',
          },
          {
            title: 'Photos Style (Clean thumbnail grid layout, great for stills)',
            value: 'photos',
          },
        ],
        layout: 'radio',
      },
      initialValue: 'video', // Defaults to video style
    }),
    // --- TEXT & CREDITS ---
    defineField({
      name: 'description',
      title: 'Project Description',
      type: 'text',
      rows: 4,
      description: 'The story behind the shoot or project.',
    }),
    defineField({
      name: 'credits',
      title: 'Credits & Team',
      type: 'array',
      description: 'List the crew (e.g., Model, Styling, Hair/Makeup)',
      of: [
        {
          type: 'object',
          name: 'creditItem',
          fields: [
            defineField({name: 'role', type: 'string', title: 'Role (e.g., Styling)'}),
            defineField({name: 'name', type: 'string', title: 'Name / Entity'}),
            defineField({name: 'instagram', type: 'string', title: 'Instagram Handle (Optional)'}),
          ],
          preview: {
            select: {title: 'role', subtitle: 'name'},
          },
        },
      ],
    }),
    // --- COVER ASSET ---
    defineField({
      name: 'coverMedia',
      title: 'Cover Thumbnail',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', type: 'string', title: 'Alt Text'})],
      validation: (Rule) => Rule.required(),
    }),
    // --- THE MEDIA CONTENT ---
    defineField({
      name: 'mediaGallery',
      title: 'Media Assets',
      type: 'array',
      description: 'Drag and drop all your photos and Mux videos here.',
      of: [
        // Photo Block
        {
          type: 'image',
          title: 'Photo',
          options: {hotspot: true},
          fields: [
            defineField({name: 'alt', type: 'string', title: 'Alt Text'}),
            defineField({
              name: 'aspectRatioPreference',
              title: 'Force Aspect Ratio (Optional)',
              type: 'string',
              options: {
                list: [
                  {title: 'Original / Auto', value: 'auto'},
                  {title: 'Portrait (3:4)', value: 'portrait'},
                  {title: 'Landscape (16:9)', value: 'landscape'},
                ],
              },
              initialValue: 'auto',
            }),
          ],
        },
        // Mux Video Block
        {
          type: 'object',
          name: 'videoBlock',
          title: 'Mux Video',
          fields: [
            defineField({
              name: 'video',
              title: 'Mux Video Asset',
              type: 'mux.video', // Handled by sanity-plugin-mux-input
            }),
            defineField({
              name: 'caption',
              title: 'Caption / Subtitle (Optional)',
              type: 'string',
            }),
          ],
          preview: {
            select: {title: 'caption'},
            prepare(selection: Record<string, any>) {
              return {title: selection.title || 'Mux Video Asset'}
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverMedia',
      subtitle: 'galleryLayout',
    },
    prepare({title, media, subtitle}) {
      return {
        title,
        media,
        subtitle: `Layout: ${subtitle ? subtitle.toUpperCase() : 'STACK'}`,
      }
    },
  },
})
