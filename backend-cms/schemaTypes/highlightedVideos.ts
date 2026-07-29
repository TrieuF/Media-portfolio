import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'highlightedVideos', // Clean backend schema identifier
  title: 'Highlighted Videos', // Label displayed in your Sanity Studio menu
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Configuration Title',
      type: 'string',
      initialValue: 'Main Screen Highlighted Videos',
      readOnly: true, // Keeps it clean since it's a structural control document
    }),
    defineField({
      name: 'featuredVideos',
      title: 'Featured Videos Collection',
      description:
        'Select up to 5 video projects to feature as slides on the main portfolio screen.',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'project'}], // Points to your video/project document type name
          options: {
            // Filters down selection choices to only show items formatted as videos
            filter: 'galleryLayout == "video"',
          },
        },
      ],
      validation: (Rule) =>
        Rule.min(1)
          .error('You must include at least one video.')
          .max(5)
          .error('You can only showcase a maximum of 5 videos on the main screen.'),
    }),
  ],
  preview: {
    select: {
      title: 'Highlighted Videos',
    },
  },
})
