"use client";

import React, { useState, useRef, useEffect } from "react";
import { type ProjectDocument } from "@/types";
import VideoPlayer from "@/components/VideoPlayer";
import PhotoGallery from "@/components/PhotoGallery";

export default function VideoandPhotoGallery({ project }: { project: ProjectDocument }) {
    const scrollAccumulator = useRef(0);

    // Internal data transformation
    const photosOnly = project.mediaGallery?.filter((item) => item._type === 'image') || [];
    const galleryProject = { ...project, mediaGallery: photosOnly };



    return (
        <main className="w-full min-h-screen bg-black">
            {/* The Hero Video Section */}
            <div className="relative w-full h-screen">
                <VideoPlayer project={project} />

                {/* Indicator */}
                {photosOnly.length > 0 && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-60 animate-bounce text-white/70 pointer-events-none">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </div>
                )}
            </div>

            {/* The Gallery Section */}
            {photosOnly.length > 0 && (
                <section className="w-full h-auto">
                    <PhotoGallery project={galleryProject} />
                </section>
            )}
        </main>
    );
}