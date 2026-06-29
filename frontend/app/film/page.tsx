import { client } from "@/sanity/client";
import PortfolioList from "@/components/PortfolioList"; // Import the exact same component you use for photos
import { type ProjectDocument } from "@/types";

// Scans for any projects containing a video block, but queries their static cover image URL instead
const FILM_QUERY = `*[_type == "project" && "videoBlock" in mediaGallery[]._type] | order(_createdAt desc) {
  _id,
  _type,
  _createdAt,
  _updatedAt,
  _rev,
  title,
  slug,
  "galleryLayout": "video",
  coverMedia {
    asset -> {
      url
    }
  }
}`;

export default async function FilmPage() {
    const projects = await client.fetch<ProjectDocument[]>(
        FILM_QUERY,
        {},
        { next: { revalidate: 0 } } // Keeps data fresh while building
    ) || [];

    if (projects.length === 0) {
        return (
            <main className="w-screen h-screen flex flex-col items-center justify-center bg-[#e6e4e0] text-zinc-800 p-4">
                <h1 className="text-xl font-medium mb-2 uppercase tracking-wider">No Films</h1>
            </main>
        );
    }

    return (
        <main className="w-screen h-screen overflow-hidden bg-gray-800  dark:bg-[#1a1917]]">
            {/* Feeds the data straight into your working, fluid photo layout component */}
            <PortfolioList projects={projects} />


        </main>
    );
}