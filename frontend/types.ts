import { type SanityDocument } from "next-sanity";

export interface CreditItem {
  _key: string;
  role?: string;
  name?: string;
  instagram?: string;
}

export interface VideoItem {
  _type: 'videoBlock';
  _key: string;
  playbackId: string;
  caption?: string;
}

export interface PhotoItem {
  _type: 'image';
  _key: string;
  url: string;
  alt?: string;
}

// Define the union correctly
export type GalleryItem = PhotoItem | VideoItem;

export interface ProjectDocument extends SanityDocument {
  title: string;
  photoid: string;
  playbackId?: string; // Add this here
  galleryLayout?: "video" | "photos";
  description?: string;
  credits?: CreditItem[];
  coverMedia?: {
    asset?: { url: string };
  };
  mediaGallery?: GalleryItem[];
}

export interface HeaderProps {
  brandName: string;
  brandTitle: string;
}