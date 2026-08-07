import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {muxInput} from 'sanity-plugin-mux-input'
import {schemaTypes} from './schemaTypes'

const singletonTypes = new Set(['siteSettings', 'highlightedVideos'])

// Filter actions so you can't accidentally delete your settings configurations
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

export default defineConfig({
  name: 'default',
  title: 'Portfolio Studio',

  projectId: 'y9cpmpmf',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Dedicated direct link to Site Settings Singleton
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),

            S.listItem()
              .title('Highlighted Videos')
              .id('highlightedVideos')
              .child(S.document().schemaType('highlightedVideos').documentId('highlightedVideos')),

            S.divider(),
            S.documentTypeListItem('project').title('Projects'),
          ]),
    }),
    muxInput({
      video_quality: 'basic',
    }),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    // Restricts singletons down to structural safety actions only (No duplicating, no deleting)
    actions: (prev, {schemaType}) => {
      if (singletonTypes.has(schemaType)) {
        return prev.filter(({action}) => action && singletonActions.has(action))
      }
      return prev
    },
  },
})
