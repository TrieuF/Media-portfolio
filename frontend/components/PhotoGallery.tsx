"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { urlFor } from "@/lib/sanity/image";
import { type ProjectDocument } from "@/lib/sanity/sanity.types";

export default function PhotoGallery({ project }: { project?: ProjectDocument }) {
    const [activeIndex, setActiveIndex] = useState(0);

    const media = project?.mediaGallery || [];

    // Intelligentes Preloading (Next & Prev)
    useEffect(() => {
        if (media.length <= 1) return;

        const nextIndex = (activeIndex + 1) % media.length;
        const prevIndex = (activeIndex - 1 + media.length) % media.length;

        [nextIndex, prevIndex].forEach((idx) => {
            const item = media[idx];
            if (item && item._type === "image") {
                const img = new window.Image();
                img.src = urlFor(item).format("webp").url();
            }
        });
    }, [activeIndex, media]);

    if (!project) return <div className="text-white flex h-screen items-center justify-center">Loading...</div>;
    if (media.length === 0) return <div className="text-white flex h-screen items-center justify-center">No media found.</div>;

    const currentItem = media[activeIndex];
    const imageUrl = currentItem && currentItem._type === "image"
        ? urlFor(currentItem).format("webp").url()
        : null;

    return (
        <main className="min-h-screen w-full bg-black text-white relative overflow-hidden select-none">
            {/* Media Container */}
            <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                <AnimatePresence mode="wait">
                    {currentItem._type === "image" && imageUrl ? (
                        <motion.div
                            key={currentItem._key || activeIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="absolute inset-0 w-full h-full flex items-center justify-center"
                        >
                            <img
                                src={imageUrl}
                                alt={currentItem.alt || project.title || "Project photo"}
                                className="w-full h-full object-contain"
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            key={currentItem._key || activeIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 w-full h-full flex items-center justify-center"
                        >
                            {/* Video Block Placeholder */}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Gallery Controls */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 bg-black/50 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 flex items-center gap-8 shadow-2xl">
                <button
                    onClick={() => setActiveIndex((p) => (p > 0 ? p - 1 : media.length - 1))}
                    className="text-sm uppercase tracking-[0.2em] hover:text-white/60 transition-colors cursor-pointer"
                >
                    Prev
                </button>

                <span className="text-white/30 text-xs font-mono">
                    {activeIndex + 1} / {media.length}
                </span>

                <button
                    onClick={() => setActiveIndex((p) => (p < media.length - 1 ? p + 1 : 0))}
                    className="text-sm uppercase tracking-[0.2em] hover:text-white/60 transition-colors cursor-pointer"
                >
                    Next
                </button>
            </div>
        </main>
    );
}