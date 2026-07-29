"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { type ProjectDocument } from "@/lib/sanity/sanity.types";
import VideoPlayer from "@/components/VideoPlayer";
import PhotoGallery from "@/components/PhotoGallery";

export default function VideoandPhotoGallery({ project }: { project: ProjectDocument }) {
    // Filter media items safely using type discriminant
    const photosOnly = project?.mediaGallery?.filter((item) => item._type === "image") || [];
    const hasPhotos = photosOnly.length > 0;

    // Construct a sanitized project document containing only photo media
    const galleryProject: ProjectDocument = { ...project, mediaGallery: photosOnly };

    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const springConfig = { stiffness: 60, damping: 15 };
    const scrollSpring = useSpring(scrollYProgress, springConfig);

    const opacity = useTransform(scrollSpring, [0, 0.2], [1, 0.5]);
    const scale = useTransform(scrollSpring, [0, 0.2], [1, 0.95]);

    return (
        <main ref={containerRef} className="w-full bg-black relative overflow-x-hidden">
            {/* Hero Video Section */}
            <motion.section
                style={hasPhotos ? { opacity, scale } : {}}
                className="w-full h-screen sticky top-0 z-0 overflow-hidden"
            >
                <VideoPlayer project={project} />

                {hasPhotos && (
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 animate-bounce text-white/70 pointer-events-none">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </div>
                )}
            </motion.section>

            {/* Gallery Section - Only renders if photos exist */}
            {hasPhotos && (
                <section className="relative w-full min-h-screen bg-black z-10 overflow-x-hidden">
                    <PhotoGallery project={galleryProject} />
                </section>
            )}
        </main>
    );
}