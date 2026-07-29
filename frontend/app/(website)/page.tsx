import HighlightedVideos from "@/components/HighlightedVideos";
import { sanityFetch } from "@/lib/sanity/fetch";
import { HIGHLIGHTVIDEO_QUERY } from "@/lib/sanity/queries";
import { type ProjectDocument } from "@/lib/sanity/sanity.types";

export default async function HomePage() {
    const data = await sanityFetch<{ featuredProjects: ProjectDocument[] } | null>({
        query: HIGHLIGHTVIDEO_QUERY,
        tags: ["highlightedVideos", "project"],
    });

    const projects = data?.featuredProjects || [];

    if (projects.length === 0) {
        return (
            <main className="w-screen h-screen flex flex-col items-center justify-center bg-zinc-950 text-white p-4">
                <h1 className="text-xl font-medium mb-2 uppercase tracking-wider">Setup Required</h1>
                <p className="text-zinc-500 text-sm">Add and publish featured videos inside your Sanity.</p>
            </main>
        );
    }

    return <HighlightedVideos projects={projects} />;
}