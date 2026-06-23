import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure' // The modern v3+ structure builder
import {muxInput} from 'sanity-plugin-mux-input'
import {schemaTypes} from './schemaTypes'

// 1. Define which document types should be treated as Singletons
const singletonTypes = new Set(['siteSettings'])

// 2. Filter actions so you can't accidentally delete your site settings
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

export default defineConfig({
  name: 'default',
  title: 'Portfolio Studio',

  projectId: 'y9cpmpmf', // Replace with your real Project ID
  dataset: 'production',

  plugins: [
    muxInput(),
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Dedicated direct link to Site Settings
            S.listItem().title('Site Settings').id('siteSettings').child(
              S.document().schemaType('siteSettings').documentId('siteSettings'), // Hardcodes the ID so there is only ever one file
            ),
            S.divider(),
            // Automatically list the standard repeatable documents
            S.documentTypeListItem('project').title('Projects'),
            S.documentTypeListItem('category').title('Categories'),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
    // Prevents "Site Settings" from showing up in the global "Create New (+)" document options menu
    templates: (prev) => prev.filter((template) => !singletonTypes.has(template.id)),
  },

  document: {
    // Restricts singletons down to safety actions only (No duplicate, no delete)
    actions: (prev, {schemaType}) => {
      if (singletonTypes.has(schemaType)) {
        return prev.filter(({action}) => action && singletonActions.has(action))
      }
      return prev
    },
  },
})