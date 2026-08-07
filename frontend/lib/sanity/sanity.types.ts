import { type SanityDocument } from "next-sanity";
import {SanityImageSource} from "@sanity/image-url";

export interface SanityAssetReference {
  _ref: string
  _type: 'reference'
}

export interface CreditItem {
  _key: string;
  role?: string;
  name?: string;
  instagram?: string;
}

export interface MuxVideoData {
  _type: 'mux.video'
  asset?: SanityAssetReference
  playbackId?: string
  status?: string
  duration?: number
  trackId?: string
  trackStatus?: string
  [key: string]: unknown;
}

export interface VideoItem {
  _type: 'videoBlock';
  _key: string;
  title?: string;
  video: MuxVideoData;
}

export interface PhotoItem {
  _type: 'image';
  _key: string;
  asset?: SanityAssetReference;
  url: string;
  alt?: string;
}

// Define the union correctly
export type GalleryItem = PhotoItem | VideoItem;

export interface ProjectDocument extends SanityDocument {
  title: string;
  slug?: {
    current: string;
    _type: 'slug';
  };
  photoid?: string;
  playbackId?: string;
  galleryLayout?: "video" | "photos";
  description?: string;
  credits?: CreditItem[];
  coverMedia?: {
    _type: 'image';
    asset?: SanityAssetReference;
    url?: string;
    alt?: string;
    [key: string]: unknown;
  };
  mediaGallery?: GalleryItem[];
}

export interface HeaderProps {
  brandName: string;
  brandTitle: string;
}

export type SiteSettings = {
  email?: string;
  instagramName?: string;
  githubName?: string;
  linkedinName?: string;
};
export type AboutSettings = {
  brandName?: string;
  brandTitle?: string;
  bioText?: string;
  email?: string;
  instagramName?: string;
  githubName?: string;
  linkedinName?: string;
  portraitPhoto?: SanityImageSource;
};