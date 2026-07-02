import { client } from "@/sanity/client";

export default async function ContactPage() {
    // Fetch the site settings directly in the page
    const settings = await client.fetch(`*[_type == "siteSettings"][0]`);

    return (
        <main className="min-h-screen flex items-center justify-start bg-black text-white p-8 md:p-24">
            <div className="max-w-2xl w-full pl-0 md:pl-20">
                <h1 className="text-4xl md:text-6xl font-bold mb-16 tracking-tight">
                    Let&apos;s work<br /> together.
                </h1>

                <div className="flex flex-col gap-10">
                    {/* Email Section */}
                    {settings?.email && (
                        <section>
                            <h2 className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-3">Email</h2>
                            <a
                                href={`mailto:${settings.email}`}
                                className="text-xl md:text-2xl hover:text-neutral-300 transition-colors"
                            >
                                {settings.email}
                            </a>
                        </section>
                    )}

                    {/* Social Section */}
                    {(settings?.instagramName || settings?.githubName || settings?.linkedinName) && (
                        <section>
                            <h2 className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-3">Social</h2>
                            <div className="flex flex-col gap-2">
                                {settings.instagramName && (
                                    <a
                                        href={`https://instagram.com/${settings.instagramName}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xl md:text-2xl hover:text-neutral-300 transition-colors"
                                    >
                                        Instagram
                                    </a>
                                )}
                                {settings.githubName && (
                                    <a
                                        href={`https://github.com/${settings.githubName}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xl md:text-2xl hover:text-neutral-300 transition-colors"
                                    >
                                        GitHub
                                    </a>
                                )}
                                {settings.linkedinName && (
                                    <a
                                        href={`https://linkedin.com/in/${settings.linkedinName}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xl md:text-2xl hover:text-neutral-300 transition-colors"
                                    >
                                        LinkedIn
                                    </a>
                                )}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </main>
    );
}