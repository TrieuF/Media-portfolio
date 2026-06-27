export default function AboutPage() {
    return (
        <main className="min-h-screen bg-black text-white p-8 md:p-24">
            <div className="max-w-6xl mx-auto">

                {/* Main Content Area */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">

                    {/* Left Column: Bio */}
                    <div className="flex flex-col gap-12">
                        <h1 className="text-4xl font-bold tracking-tight">HI. I AM [YOUR NAME].</h1>

                        <div className="text-lg leading-relaxed text-neutral-300 space-y-6">
                            <p>
                                [Your Name] is a [Location]-based director and photographer with a unique
                                contemporary style in film and photography.
                            </p>
                            <p>
                                With big visions and a next-level imagination, they create a modern
                                universe. Their passion and creative nature infects everyone around them.
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Portrait */}
                    <div className="flex items-start">
                        <div className="bg-neutral-900 aspect-[3/4] w-full flex items-center justify-center text-neutral-600 uppercase tracking-widest text-xs">
                            [PORTRAIT / IMAGE]
                        </div>
                    </div>
                </div>

                {/* Footer Section */}
                <footer className="border-t border-neutral-800 pt-12 mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h2 className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-4">Email</h2>
                        <a href="mailto:hello@yourdomain.com" className="text-lg hover:text-neutral-400 transition-colors">
                            hello@yourdomain.com
                        </a>
                    </div>
                    <div>
                        <h2 className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-4">Social</h2>
                        <div className="flex flex-col gap-2">
                            <a href="#" className="text-lg hover:text-neutral-400 transition-colors">Instagram</a>
                            <a href="#" className="text-lg hover:text-neutral-400 transition-colors">GitHub</a>
                            <a href="#" className="text-lg hover:text-neutral-400 transition-colors">LinkedIn</a>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-4">Location</h2>
                        <p className="text-lg text-neutral-300">Based in Berlin, DE</p>
                    </div>
                </footer>
            </div>
        </main>
    );
}