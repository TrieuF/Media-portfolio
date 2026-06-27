import { client } from "@/sanity/client";
import VideoPlayer from "@/components/VideoPlayer";
import { ProjectDocument } from "@/types";

async function getProject(slug: string): Promise<ProjectDocument | null> {
    const query = `*[_type == "project" && slug.current == $slug][0]{
        ...,
        "mediaGallery": mediaGallery[]{
            _type == "image" => {
                "type": "photo",
                _key,
                "alt": alt,
                "aspectRatioPreference": aspectRatioPreference,
                "url": asset->url
            },
            _type == "videoBlock" => {
                "type": "video",
                _key,
                "caption": caption,
                "playbackId": video.asset->playbackId
            }
        }
    }`;
    return await client.fetch(query, { slug });
}

export default async function Page({ params }: { params: { filmid: string } }) {
    const { filmid } = await params;
    const project = await getProject(filmid);

    if (!project) return <div>Project not found.</div>;

    return <VideoPlayer project={project} />;
}