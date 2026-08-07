import { groq } from 'next-sanity'

export const HIGHLIGHTVIDEO_QUERY = groq`
  *[_type == "highlightedVideos" && _id == "highlightedVideos"][0] {
    "featuredProjects": featuredVideos[]-> {
      _id,
      title,
      slug,
      "photoid": slug.current,
      "video": {
        "playbackId": mediaGallery[_type == "videoBlock"][0].video.asset->playbackId
      },
      coverMedia
    }
  }
`

export const ABOUT_PAGE_QUERY = groq`
  *[_type == "siteSettings"][0]{
    brandName,
    brandTitle,
    bioText,
    email,
    instagramName,
    githubName,
    linkedinName,
    portraitPhoto
  }
`

export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    email,
    instagramName,
    githubName,
    linkedinName
  }
`

export const PHOTO_QUERY = groq`
  *[_type == "project" && galleryLayout == "photos"] | order(_createdAt desc) {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    title,
    slug, 
    "galleryLayout": "photos",
    coverMedia
  }
`

export const PHOTO_BY_SLUG_QUERY = groq`
  *[_type == "project" && slug.current == $slug][0]{
    ...,
    "mediaGallery": mediaGallery[]{
      ...,
      _type == "image" => {
        ...,
        alt
      },
      _type == "videoBlock" => {
        _type,
        _key,
        title,
        video {
          ...,
          "playbackId": asset->playbackId,
          "assetId": asset->assetId
        }
      }
    }
  }
`

export const FILM_QUERY = groq`
  *[_type == "project" && "videoBlock" in mediaGallery[]._type] | order(_createdAt desc) {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    title,
    slug,
    "galleryLayout": "video",
    coverMedia
  }
`

export const FILM_BY_SLUG_QUERY = groq`
  *[_type == "project" && slug.current == $slug][0]{
    ...,
    "mediaGallery": mediaGallery[]{
      _type == "image" => {
        ...,
        alt,
        "url": asset->url
      },
      _type == "videoBlock" => {
        _type,
        _key,
        title,
        video {
          ...,
          "playbackId": asset->playbackId,
          "assetId": asset->assetId
        }
      }
    }
  }
`