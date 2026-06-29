import { client } from "@/sanity/client";
import VideoandPhotoGallery from "@/components/VideoandPhotoGallery";
import { ProjectDocument } from "@/types";

async function getProject(slug: string): Promise<ProjectDocument | null> {
    const query = `*[_type == "project" && slug.current == $slug][0]{
        ...,
        "mediaGallery": mediaGallery[]{
            _type == "image" => {
                _type, 
                _key,
                "alt": alt,
                "url": asset->url
            },
            _type == "videoBlock" => {
                _type,
                _key,
                "caption": caption,
                "playbackId": video.asset->playbackId
            }
        }
    }`;
    return await client.fetch(query, { slug });
}

export default async function Page({ params }: { params: { filmid: string } }) {
    // Await the params to be safe with Next.js 15+ requirements
    const { filmid } = await params;
    const project = await getProject(filmid);

    if (!project) return <div className="text-white p-12">Project not found.</div>;

    return <VideoandPhotoGallery project={project} />;
}