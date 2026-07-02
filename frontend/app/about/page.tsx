import { client } from "@/sanity/client";
import Image from "next/image";

export default async function AboutPage() {
    const settings = await client.fetch(`*[_type == "siteSettings"][0]{
  ...,
  "portraitPhoto": portraitPhoto {
    ...,
    "asset": asset->
  }
}`);

    return (
        <main className="min-h-screen bg-black text-white p-8 md:p-24">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
                    {/* Left Column: Bio */}
                    <div className="flex flex-col gap-12">
                        <h1 className="text-4xl font-bold tracking-tight">Hi, i&#39;m {settings?.brandName}.</h1>
                        <div className="text-lg leading-relaxed text-neutral-300 space-y-6">
                            <p>{settings?.bioText}</p>
                        </div>
                    </div>

                    {/* Right Column: Portrait */}
                    <div className="flex items-start">
                        {settings?.portraitPhoto?.asset?.url ? (
                            <Image
                                src={settings.portraitPhoto.asset.url}
                                alt={settings.brandName || "Portrait"}
                                width={600}
                                height={800}
                                className="w-full h-auto object-cover aspect-[3/4] bg-neutral-900"
                            loading="eager"
                            />
                        ) : (
                            <div className="bg-neutral-900 aspect-[3/4] w-full flex items-center justify-center text-neutral-600 uppercase tracking-widest text-xs">
                                No Portrait Uploaded
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Section */}
                <footer className="border-t border-neutral-800 pt-12 mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h2 className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-4">Email</h2>
                        <a href={`mailto:${settings?.email}`} className="text-lg hover:text-neutral-400 transition-colors">
                            {settings?.email}
                        </a>
                    </div>

                    {/* Dynamic Socials */}
                    {(settings?.instagramName || settings?.githubName || settings?.linkedinName) && (
                        <div>
                            <h2 className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-4">Social</h2>
                            <div className="flex flex-col gap-2">
                                {settings.instagramName && <a href={`https://instagram.com/${settings.instagramName}`} className="text-lg hover:text-neutral-400 transition-colors">Instagram</a>}
                                {settings.githubName && <a href={`https://github.com/${settings.githubName}`} className="text-lg hover:text-neutral-400 transition-colors">GitHub</a>}
                                {settings.linkedinName && <a href={`https://linkedin.com/in/${settings.linkedinName}`} className="text-lg hover:text-neutral-400 transition-colors">LinkedIn</a>}
                            </div>
                        </div>
                    )}

                    <div>
                        <h2 className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-4">Title</h2>
                        <p className="text-lg text-neutral-300">{settings?.brandTitle}</p>
                    </div>
                </footer>
            </div>
        </main>
    );
}