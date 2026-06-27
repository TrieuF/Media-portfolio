import { client } from "@/sanity/client";
import HighlightedVideos from "@/components/HighlightedVideos";
import { type ProjectDocument } from "@/types";

const DASHBOARD_QUERY = `*[_type == "dashboard" && _id == "mainDashboard"][0] {
  "featuredProjects": featuredVideos[]-> {
    _id,
    title,
    "photoid": slug.current,
    "playbackId": mediaGallery[_type == "videoBlock"][0].video.asset->playbackId
  }
}`;

export default async function HomePage() {
    const data = await client.fetch<{ featuredProjects: ProjectDocument[] } | null>(
        DASHBOARD_QUERY,
        {},
        { next: { revalidate: 0 } }
    );

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