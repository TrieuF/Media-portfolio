"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/image"; // 1. Import image helper
import { type ProjectDocument } from "@/lib/sanity/sanity.types";

export default function PortfolioList({ projects }: { projects: ProjectDocument[] }) {
    // Track active project ID instead of raw URL string for clean hover states
    const [activeId, setActiveId] = useState<string | null>(null);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="relative w-full h-full min-h-screen overflow-hidden flex items-center justify-center">
            {/* LAYERED BACKGROUND CANVASES */}
            <section className="absolute top-0 right-0 w-[80%] h-full pointer-events-none z-0 overflow-hidden">
                {projects.map((project, index) => {
                    // 2. Generate optimized image URL using image.ts
                    const imgUrl = project.coverMedia
                        ? urlFor(project.coverMedia)
                            .fit("crop")
                            .format("webp")
                            .url()
                        : null;

                    if (!imgUrl) return null;

                    const isCurrentlyVisible = isHovered && activeId === project._id;

                    return (
                        <div
                            key={project._id}
                            className={`absolute inset-0 w-full h-full transition-opacity ease-in-out will-change-opacity
                                ${isCurrentlyVisible
                                ? "opacity-100 duration-1000 z-10 scale-100"
                                : "opacity-0 duration-1000 z-0 scale-[1.01]"
                            }`}
                        >
                            <Image
                                src={imgUrl}
                                alt={project.title || "Project cover"}
                                fill
                                sizes="(max-width: 768px) 100vw, 80vw"
                                className="object-cover object-center"
                                priority={index === 0}
                            />
                        </div>
                    );
                })}
            </section>

            {/* FOREGROUND TITLES */}
            <section className="absolute inset-0 w-full h-full z-10 flex flex-col items-center justify-start p-4 pt-32">
                <nav
                    className="flex flex-col space-y-8 text-center max-h-[85vh] overflow-y-scroll no-scrollbar px-4 pb-16"
                    onMouseLeave={() => {
                        setActiveId(null);
                        setIsHovered(false);
                    }}
                >
                    {projects.map((project) => (
                        <div
                            key={project._id}
                            className="inline-flex justify-center select-none mx-auto"
                            onMouseEnter={() => {
                                if (project.coverMedia) {
                                    setActiveId(project._id);
                                    setIsHovered(true);
                                }
                            }}
                        >
                            <Link
                                href={project.galleryLayout === 'video'
                                    ? `/film/${project.slug?.current}`
                                    : `/photo/${project.slug?.current}`
                                }
                                className="inline-block font-display text-3xl md:text-6xl font-bold tracking-[0.2em] uppercase transition-all duration-500 text-white hover:text-transparent"
                                style={{ WebkitTextStroke: "1.5px white" }}
                            >
                                {project.title}
                            </Link>
                        </div>
                    ))}
                </nav>
            </section>
        </div>
    );
}