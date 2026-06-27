import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {muxInput} from 'sanity-plugin-mux-input'
import {schemaTypes} from './schemaTypes'

// 1. UPDATED: Swapped 'dashboard' out for your correct 'highlightedVideos' type token
const singletonTypes = new Set(['siteSettings', 'highlightedVideos'])

// 2. Filter actions so you can't accidentally delete your settings configurations
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

export default defineConfig({
  name: 'default',
  title: 'Portfolio Studio',

  projectId: 'y9cpmpmf',
  dataset: 'production',

  plugins: [
    muxInput(),
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

            // FIXED: Updated mapping names, matching titles, and resolved your typo string
            S.listItem()
              .title('Highlighted Videos')
              .id('mainHighlightedVideos')
              .child(S.document().schemaType('highlightedVideos').documentId('mainDashboard')),

            S.divider(),
            // Automatically list the standard repeatable collections
            S.documentTypeListItem('project').title('Projects'),
            S.documentTypeListItem('category').title('Categories'),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
    // Prevents Singletons from showing up in the global "Create New (+)" options menu
    templates: (prev) => prev.filter((template) => !singletonTypes.has(template.id)),
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
