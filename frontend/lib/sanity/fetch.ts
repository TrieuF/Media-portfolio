import type { QueryParams } from 'next-sanity'
import { draftMode } from 'next/headers'
import { client } from './client'

export async function sanityFetch<QueryResponse>({
                                                     query,
                                                     params = {},
                                                     tags = [],
                                                 }: {
    query: string
    params?: QueryParams
    tags?: string[]
}): Promise<QueryResponse> {
    const isDraftMode = (await draftMode()).isEnabled

    if (isDraftMode) {
        return client.fetch<QueryResponse>(query, params, {
            token: process.env.SANITY_API_READ_TOKEN,
            perspective: 'previewDrafts',
            stega: true,
            next: { revalidate: 0 }, // Never cache draft mode
        })
    }

    return client.fetch<QueryResponse>(query, params, {
        perspective: 'published',
        next: {
            tags,
            revalidate: false, // Ensures pages stay cached indefinitely until your webhook triggers revalidateTag
        },
    })
}