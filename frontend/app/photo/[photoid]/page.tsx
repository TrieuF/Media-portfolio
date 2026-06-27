import { client } from "@/sanity/client";
import PhotoGallery from "@/components/PhotoGallery";

async function getProject(slug: string) {
    // Note: We changed 'photoid == $photoid' to 'slug.current == $slug'
    return await client.fetch(
        `*[_type == "project" && slug.current == $slug][0]{
      ...,
      "mediaGallery": mediaGallery[]{
        ...,
        _type == "image" => {
          "url": asset->url,
          alt
        },
        _type == "videoBlock" => {
          caption,
          "video": video.asset->{playbackId}
        }
      }
    }`,
        { slug }
    );
}

export default async function Page({ params }: { params: { photoid: string } }) {
    const { photoid } = await params;
    const project = await getProject(photoid);

    if (!project) return <div className="text-white p-12">Project not found.</div>;

    return <PhotoGallery project={project} />;
}