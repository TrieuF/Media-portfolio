import { client } from "@/sanity/client";
import PortfolioList from "@/components/PortfolioList";
import { type ProjectDocument } from "@/types";

const PHOTO_PROJECTS_QUERY = `*[ _type == "project" 
 && galleryLayout == "photos"] | order(_createdAt desc) {
  _id,
  _type,
  _createdAt,
  _updatedAt,
  _rev,
  title,
  slug, 
  "galleryLayout" : "photos",
  coverMedia { 
    asset->{ url } 
  }
}`;

export default async function PhotoPage() {
    const projects = await client.fetch<ProjectDocument[]>(
        PHOTO_PROJECTS_QUERY,
        {},
        { next: { revalidate: 30 } }
    );

    if (!projects || projects.length === 0) {
        return (
            <main className="w-screen h-screen flex flex-col items-center justify-center bg-[#e6e4e0] text-zinc-800 p-4">
                <h1 className="text-xl font-medium mb-2 uppercase tracking-wider">No Projects</h1>
            </main>
        );
    }

    return (
        <main className="w-screen h-screen overflow-hidden bg-gray-800 dark:bg-[#1a1917]">
            <PortfolioList projects={projects} />
        </main>
    );
}