import { notFound } from "next/navigation";
import VideoandPhotoGallery from "@/components/VideoandPhotoGallery";
import { sanityFetch } from "@/lib/sanity/fetch";
import { FILM_BY_SLUG_QUERY } from "@/lib/sanity/queries";
import { type ProjectDocument } from "@/lib/sanity/sanity.types";

type PageProps = {
    params: Promise<{ filmid: string }>;
};

export default async function Page({ params }: PageProps) {
    const { filmid } = await params;

    const project = await sanityFetch<ProjectDocument | null>({
        query: FILM_BY_SLUG_QUERY,
        params: { slug: filmid },
        tags: ["project", `project:${filmid}`],
    });

    if (!project) {
        return notFound();
    }

    return <VideoandPhotoGallery project={project} />;
}