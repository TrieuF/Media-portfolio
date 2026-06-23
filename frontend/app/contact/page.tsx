export default function ContactPage() {
    return (
        <main className="min-h-screen flex items-center justify-start bg-black text-white p-8 md:p-24">
            {/*
                pl-4 md:pl-20: This shifts everything away from the left edge.
                max-w-2xl: Keeps the text width readable.
            */}
            <div className="max-w-2xl w-full pl-0 md:pl-20">
                {/* Heading */}
                <h1 className="text-4xl md:text-6xl font-bold mb-16 tracking-tight">
                    Let's work<br /> together.
                </h1>

                {/* Contact Links */}
                <div className="flex flex-col gap-10">
                    <section>
                        <h2 className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-3">Email</h2>
                        <a
                            href="mailto:hello@yourdomain.com"
                            className="text-xl md:text-2xl hover:text-neutral-300 transition-colors"
                        >
                            hello@yourdomain.com
                        </a>
                    </section>

                    <section>
                        <h2 className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-3">Social</h2>
                        <div className="flex flex-col gap-2">
                            <a
                                href="https://instagram.com/yourhandle"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xl md:text-2xl hover:text-neutral-300 transition-colors"
                            >
                                Instagram
                            </a>
                            <a
                                href="https://github.com/yourhandle"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xl md:text-2xl hover:text-neutral-300 transition-colors"
                            >
                                GitHub
                            </a>
                            <a
                                href="https://linkedin.com/in/yourhandle"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xl md:text-2xl hover:text-neutral-300 transition-colors"
                            >
                                LinkedIn
                            </a>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}