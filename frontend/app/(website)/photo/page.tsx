import PortfolioList from "@/components/PortfolioList";
import { sanityFetch } from "@/lib/sanity/fetch";
import { PHOTO_QUERY } from "@/lib/sanity/queries";
import { type ProjectDocument } from "@/lib/sanity/sanity.types";

export default async function PhotoPage() {
    const projects = await sanityFetch<ProjectDocument[]>({
        query: PHOTO_QUERY,
        tags: ["project"],
    });

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