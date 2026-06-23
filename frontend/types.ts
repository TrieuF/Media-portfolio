/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface GalleryStill {
  id: string;
  url: string;
  title?: string;
  subtitle?: string;
  size?: 'normal' | 'wide' | 'full'; // Styling layout hints for the photo grid
}

export interface Project {
  id: string;
  title: string;
  client: string;
  subtitle: string;
  category: 'videography' | 'photography' | 'direction';
  role: string;
  year: string;
  description: string;
  heroVideoUrl: string; // MP4, Vimeo, YouTube, or Mux stream link
  heroImageUrl: string; // Fallback image and thumbnail
  credits: { label: string; value: string }[];
  galleryStills: GalleryStill[];
  featured?: boolean;
}

export interface ProfileSettings {
  name: string;
  title: string;
  bio: string;
  aboutText: string;
  aboutImageUrl: string;
  contactEmail: string;
  phone?: string;
  telegram?: string;
  vimeoUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  selectedClients: string[];
  awards: { year: string; title: string; category?: string }[];
}
