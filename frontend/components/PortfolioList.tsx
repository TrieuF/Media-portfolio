"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // 1. Import Image
import { type ProjectDocument } from "@/types";

export default function PortfolioList({ projects }: { projects: ProjectDocument[] }) {
    const [activeUrl, setActiveUrl] = useState<string | null>(null);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="relative w-full h-full min-h-screen overflow-hidden flex items-center justify-center">
            {/* LAYERED BACKGROUND CANVASES */}
            <section className="absolute top-0 right-0 w-[80%] h-full pointer-events-none z-0 overflow-hidden">
                {projects.map((project) => {
                    const imgUrl = project.coverMedia?.asset?.url;
                    if (!imgUrl) return null;

                    const isCurrentlyVisible = isHovered && activeUrl === imgUrl;

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
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover object-center"
                                priority={project._id === projects[0]?._id}
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
                        setActiveUrl(null);
                        setIsHovered(false);
                    }}
                >
                    {projects.map((project) => (
                        <div
                            key={project._id}
                            className="inline-flex justify-center select-none mx-auto"
                            onMouseEnter={() => {
                                if (project.coverMedia?.asset?.url) {
                                    setActiveUrl(project.coverMedia.asset.url);
                                    setIsHovered(true);
                                }
                            }}
                        >
                            <Link
                                href={`/photo/${project.photoid}`}
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