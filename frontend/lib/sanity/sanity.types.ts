import { type SanityDocument } from "next-sanity";
import {SanityImageSource} from "@sanity/image-url";

export interface SanityAssetReference {
  _ref: string;
  _type: 'reference';
  [key: string]: unknown;
}

export interface Slug {
  _type: 'slug';
  current: string;
}

export interface CreditItem {
  _key: string;
  role?: string;
  name?: string;
  instagram?: string;
}

export interface CoverMedia {
  _type: 'image';
  asset?: SanityAssetReference;
  alt?: string;
  [key: string]: unknown;
}

export interface PhotoItem {
  _type: 'image';
  _key: string;
  asset?: SanityAssetReference;
  url?: string;
  alt?: string;
  aspectRatioPreference?: 'auto' | 'portrait' | 'landscape';
  [key: string]: unknown;
}

export interface MuxVideoData {
  _type: 'mux.video';
  asset?: SanityAssetReference;
  playbackId?: string;
  assetId?: string;
  status?: string;
  duration?: number;
  [key: string]: unknown;
}

export interface VideoItem {
  _type: 'videoBlock';
  _key: string;
  title?: string;
  video: MuxVideoData;
}

export type GalleryItem = PhotoItem | VideoItem;

export interface ProjectDocument extends SanityDocument {
  title: string;
  slug: Slug;
  galleryLayout: 'video' | 'photos';
  description?: string;
  credits?: CreditItem[];
  coverMedia: CoverMedia;
  mediaGallery: GalleryItem[];
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