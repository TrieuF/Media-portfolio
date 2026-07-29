import { notFound } from "next/navigation";
import PhotoGallery from "@/components/PhotoGallery";
import { sanityFetch } from "@/lib/sanity/fetch";
import { PHOTO_BY_SLUG_QUERY } from "@/lib/sanity/queries";
import { type ProjectDocument } from "@/lib/sanity/sanity.types";

type PageProps = {
    params: Promise<{ photoid: string }>;
};

export default async function Page({ params }: PageProps) {
    const { photoid } = await params;

    const project = await sanityFetch<ProjectDocument | null>({
        query: PHOTO_BY_SLUG_QUERY,
        params: { slug: photoid },
        tags: ["project", `project:${photoid}`],
    });

    if (!project) {
        return notFound();
    }

    return <PhotoGallery project={project} />;
}