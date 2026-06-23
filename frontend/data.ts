/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, ProfileSettings } from './types';

export const INITIAL_PROFILE: ProfileSettings = {
  name: "Marcus Sterling",
  title: "Director / Director of Photography",
  bio: "Marcus Sterling is a freelance filmmaker and cinematographer whose work is characterized by a high-contrast visual style, rich atmospheric depth, and intimate, character-driven narrative pacing. His commercial slate features work for global technical agencies, premium fashion editorials, and outdoor apparel brands.",
  aboutText: "Based in Berlin. Marcus spent the early years of his career experimenting with 16mm analog and vintage lenses, which heavily informs his modern high-contrast digital look. His ethos centers on architectural symmetry, deliberate choreographies, and using shadow to frame emotion. Over the last decade, he has operated as a lead cinematographer working across commercial campaigns, editorial projects, and cinematic documentaries.",
  aboutImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
  contactEmail: "marcus@sterlingarchive.com",
  phone: "+49 172 8839 204",
  vimeoUrl: "https://vimeo.com",
  instagramUrl: "https://instagram.com",
  linkedinUrl: "https://linkedin.com",
  selectedClients: [
    "ADIDAS", "DELOITTE", "LEICA", "BMW", "PATAGONIA", "VOUGE", "RIMOWA", "BALENCIAGA"
  ],
  awards: [
    { year: "2025", title: "Best Cinematography - Berlin Commercial Film Festival", category: "Commercials" },
    { year: "2024", title: "Official Selection - Vimeo Staff Pick", category: "Art & Fashion Film" },
    { year: "2023", title: "Cannes Young Director Award", category: "Short Drama & Narrative" },
    { year: "2022", title: "Director's Cut Award - Best New Talent", category: "Documentary Film" }
  ]
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "ready-for-take-off",
    title: "READY FOR TAKE-OFF",
    client: "ADIDAS",
    subtitle: "A relentless study of human momentum, kinetic speed, and athletic drive.",
    category: "videography",
    role: "Director / Cinematographer",
    year: "2025",
    description: "Commissioned by Adidas, 'Ready for Take-Off' explores the intense psychological state of an athlete in the milliseconds leading up to explosive action. Shot entirely on high-speed anamorphic vintage lenses, the film is an experiential blend of rhythm, breath, sweat, and kinetic drive across mist-soaked elements. We utilized natural high-contrast sidelight paired with cold metallic mist machines to emphasize the raw force of gravity.",
    heroVideoUrl: "https://player.vimeo.com/external/392049580.sd.mp4?s=6a59cb4a4aa89c62eed016eb0c24c70a256df8a9&profile_id=165&oauth2_token_id=57447761",
    heroImageUrl: "https://images.unsplash.com/photo-1502224562085-639556652f33?auto=format&fit=crop&w=1200&q=80",
    credits: [
      { label: "Client", value: "Adidas Running" },
      { label: "Agency", value: "Struktur Berlin" },
      { label: "Director of Photography", value: "Marcus Sterling" },
      { label: "Executive Producer", value: "Sarah Lindemann" },
      { label: "Editor", value: "Karim Al-Hassan" },
      { label: "Sound Design", value: "Sonder Wave Studio" },
      { label: "Color Grading", value: "Chroma Berlin (Nils Weber)" }
    ],
    galleryStills: [
      {
        id: "still-1-1",
        url: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1200&q=80",
        title: "The Peak of Ascent",
        subtitle: "Unprocessed 16-bit scan, anamorphic frame.",
        size: "wide"
      },
      {
        id: "still-1-2",
        url: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1200&q=80",
        title: "Cold Light Dynamics",
        subtitle: "Testing high-contrast shadows across physical contours.",
        size: "normal"
      },
      {
        id: "still-1-3",
        url: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=1200&q=80",
        title: "Rhythmic Cadence",
        subtitle: "Misty forest environment scouting details.",
        size: "normal"
      },
      {
        id: "still-1-4",
        url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
        title: "Anamorphic Distortions",
        subtitle: "Cinematic portrait testing bokeh stretching.",
        size: "full"
      }
    ],
    featured: true
  },
  {
    id: "sound-of-progress",
    title: "THE SOUND OF PROGRESS",
    client: "DELOITTE",
    subtitle: "Visualizing the minimalist acoustics of architecture, technical data, and workflow.",
    category: "direction",
    role: "Director of Photography",
    year: "2024",
    description: "The Sound of Progress is an editorial audio-visual exploration of minimalist acoustics inside global architectural headquarters. Moving away from standard sterile corporate visuals, this film takes an industrial and poetic look at geometric forms, shadow patterns, concrete texture, and ambient mechanics. The rhythm of the movie is dictated entirely by Foley elements recorded directly on site.",
    heroVideoUrl: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c02227d871741d86d63e0e376043eb78&profile_id=139&oauth2_token_id=57447761",
    heroImageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    credits: [
      { label: "Client", value: "Deloitte Global" },
      { label: "Agency", value: "Future Agency UK" },
      { label: "Producer", value: "Nils Van Der Velde" },
      { label: "Grip", value: "Anton Adler" },
      { label: "Camera Assistant", value: "Clara Schumann" },
      { label: "Sound Composition", value: "Rykard Studio London" }
    ],
    galleryStills: [
      {
        id: "still-2-1",
        url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
        title: "Mathematical Symmetry",
        subtitle: "Brutalist concrete layout with midday shafts.",
        size: "normal"
      },
      {
        id: "still-2-2",
        url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
        title: "Clean Lines",
        subtitle: "Corporate acoustics capture point.",
        size: "normal"
      },
      {
        id: "still-2-3",
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        title: "Monolithic Shadow Blocks",
        subtitle: "Mid-century architectural study.",
        size: "wide"
      }
    ]
  },
  {
    id: "chroma-silence",
    title: "CHROMA AND SILENCE",
    client: "LEICA",
    subtitle: "A high-contrast monochrome exploration of night light and architecture.",
    category: "photography",
    role: "Photographer / Editor",
    year: "2024",
    description: "Chroma and Silence is a personal documentary photography folio published in Leica Magazine. Shot entirely in Tokyo and Paris at odd hours, it details the quiet spaces left behind by the urban rush. By stripping color away and utilizing deep blacks and raw grain structures, the project explores geometric abstractions and isolated portraits in a city that otherwise never stops.",
    heroVideoUrl: "https://player.vimeo.com/external/459389137.sd.mp4?s=99cbd59247d896dd6dc9fc3ac5df93e4e93bb85c&profile_id=165&oauth2_token_id=57447761",
    heroImageUrl: "https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?auto=format&fit=crop&w=1200&q=80",
    credits: [
      { label: "Publisher", value: "Leica Photography International" },
      { label: "Exhibition", value: "Galerie d'Art Contemporain Paris" },
      { label: "Curator", value: "Emilie Laurent" },
      { label: "Technique", value: "M11 Monochrom + 35mm Summilux" }
    ],
    galleryStills: [
      {
        id: "still-3-1",
        url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
        title: "Refracted Solitude",
        subtitle: "Puddle reflection against neon, Tokyo.",
        size: "normal"
      },
      {
        id: "still-3-2",
        url: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80",
        title: "The Golden Cut",
        subtitle: "Pedestrian crossing geometry under streetlight.",
        size: "normal"
      },
      {
        id: "still-3-3",
        url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
        title: "Contrast Elements",
        subtitle: "High contrast neon and architecture overlap.",
        size: "wide"
      }
    ],
    featured: true
  },
  {
    id: "echoes-of-the-valley",
    title: "ECHOES OF THE VALLEY",
    client: "PATAGONIA",
    subtitle: "A poetic documentary tracking isolated shepherd communities in the wind-swept Alps.",
    category: "videography",
    role: "Director / DP",
    year: "2023",
    description: "Echoes of the Valley is a short, narrative-driven documentary following three elderly shepherd brothers who manage alpine flocks on the high plains of Switzerland. Over three weeks in sub-zero October winds, our crew slept on rock beds to document the changing of the seasons and the slow, heavy rhythm of mountain tradition. Natural morning haze, heavy sheep wool, and coarse hands are the visual focus.",
    heroVideoUrl: "https://player.vimeo.com/external/435674703.sd.mp4?s=7fdfb927db4dc372cf45b597fe2b9921daea97b0&profile_id=165&oauth2_token_id=57447761",
    heroImageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    credits: [
      { label: "Client", value: "Patagonia Films" },
      { label: "Producer", value: "Helena Ostergard" },
      { label: "Cinematographer", value: "Marcus Sterling" },
      { label: "Local Guide", value: "Lars Giger" },
      { label: "Sound Design", value: "Christian Vester" }
    ],
    galleryStills: [
      {
        id: "still-4-1",
        url: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1200&q=80",
        title: "Cold Ridges",
        subtitle: "6:15 AM first light over Chamonix peaks.",
        size: "wide"
      },
      {
        id: "still-4-2",
        url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
        title: "Warm Shelter",
        subtitle: "Firewood sparks in a 150-year-old alpine hut.",
        size: "normal"
      },
      {
        id: "still-4-3",
        url: "https://images.unsplash.com/photo-1549880181-56a44cf4a9a1?auto=format&fit=crop&w=1200&q=80",
        title: "The Frozen Crest",
        subtitle: "Alpine blizzard testing weather sealing.",
        size: "normal"
      }
    ]
  }
];
