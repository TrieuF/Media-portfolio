"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { urlFor } from "@/lib/sanity/image"; // 1. Import image helper
import { type ProjectDocument } from "@/lib/sanity/sanity.types";

export default function PhotoGallery({ project }: { project?: ProjectDocument }) {
    const [activeIndex, setActiveIndex] = useState(0);

    if (!project) return <div className="text-white flex h-screen items-center justify-center">Loading...</div>;

    const media = project.mediaGallery || [];
    if (media.length === 0) return <div className="text-white flex h-screen items-center justify-center">No media found.</div>;

    const currentItem = media[activeIndex];

    // Safely generate image URL using urlFor helper
    const imageUrl = currentItem && currentItem._type === "image"
        ? urlFor(currentItem).width(2400).fit("max").format("webp").url()
        : null;

    return (
        <main className="min-h-screen w-full bg-black text-white relative overflow-hidden select-none">
            {/* Media Container */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 w-full h-full"
            >
                <AnimatePresence mode="wait">
                    {currentItem._type === "image" && imageUrl ? (
                        <motion.img
                            key={currentItem._key || activeIndex}
                            src={imageUrl}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.6 }}
                            className="w-full h-full object-contain"
                            alt={currentItem.alt || project.title || "Project photo"}
                        />
                    ) : (
                        <motion.div
                            key={currentItem._key || activeIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full h-full flex items-center justify-center"
                        >
                            {/* Video Block Placeholder or Player */}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Centered Floating Gallery Controls */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 bg-black/50 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 flex items-center gap-8 shadow-2xl">
                <button
                    onClick={() => setActiveIndex((p) => (p > 0 ? p - 1 : media.length - 1))}
                    className="text-sm uppercase tracking-[0.2em] hover:text-white/60 transition-colors"
                >
                    Prev
                </button>

                <span className="text-white/30 text-xs font-mono">
                    {activeIndex + 1} / {media.length}
                </span>

                <button
                    onClick={() => setActiveIndex((p) => (p < media.length - 1 ? p + 1 : 0))}
                    className="text-sm uppercase tracking-[0.2em] hover:text-white/60 transition-colors"
                >
                    Next
                </button>
            </div>
        </main>
    );
}