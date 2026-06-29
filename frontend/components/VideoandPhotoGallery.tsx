"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { type ProjectDocument } from "@/types";
import VideoPlayer from "@/components/VideoPlayer";
import PhotoGallery from "@/components/PhotoGallery";

export default function VideoandPhotoGallery({ project }: { project: ProjectDocument }) {
    const photosOnly = project.mediaGallery?.filter((item) => item._type === 'image') || [];
    const galleryProject = { ...project, mediaGallery: photosOnly };

    // 1. Hook into the scroll progress of the page
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // 2. Add the "slingy" spring physics
    // Damping/stiffness here controls the "resistance" and "bounce"
    const springConfig = { stiffness: 60, damping: 15 };
    const scrollSpring = useSpring(scrollYProgress, springConfig);

    // 3. Transform the scroll into a visual effect (e.g., slight parallax or scale)
    const opacity = useTransform(scrollSpring, [0, 0.2], [1, 0.5]);
    const scale = useTransform(scrollSpring, [0, 0.2], [1, 0.95]);

    return (
        <main ref={containerRef} className="w-full bg-black">
            {/* Hero Video Section */}
            <motion.section
                style={{ opacity, scale }}
                className="relative w-full h-screen sticky top-0"
            >
                <VideoPlayer project={project} />

                {/* Indicator remains clickable if you want to force the scroll */}
                {photosOnly.length > 0 && (
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 animate-bounce text-white/70">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </div>
                )}
            </motion.section>

            {/* Gallery Section */}
            {photosOnly.length > 0 && (
                <section className="relative w-full min-h-screen bg-black z-10">
                    <PhotoGallery project={galleryProject} />
                </section>
            )}
        </main>
    );
}