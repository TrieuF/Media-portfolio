"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { urlFor } from "@/lib/sanity/image";
import { type ProjectDocument } from "@/lib/sanity/sanity.types";
import MuxVideo from "@mux/mux-video-react";

export default function HighlightedVideos({ projects }: { projects: ProjectDocument[] }) {
    const router = useRouter();
    const [activeIndex, setActiveIndex] = useState(0);
    const [visualOffset, setVisualOffset] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState<number | null>(null);

    // Track playing state per video index to handle the cover->video transition smoothly
    const [isPlaying, setIsPlaying] = useState<{ [key: number]: boolean }>({});

    const containerRef = useRef<HTMLDivElement>(null);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const startX = useRef<number | null>(null);
    const [dragOffset, setDragOffset] = useState(0);
    const hasMoved = useRef(false);
    const scrollAccumulator = useRef(0);

    const validProjects = projects.filter((p) => p.video?.playbackId);

    const setVideoRef = useCallback((index: number, el: HTMLVideoElement | null | undefined) => {
        videoRefs.current[index] = el ?? null;
    }, []);

    const handleProjectClick = (
        e: React.MouseEvent<HTMLAnchorElement>,
        path: string,
        index: number
    ) => {
        if (hasMoved.current) {
            e.preventDefault();
            return;
        }
        e.preventDefault();
        setIsTransitioning(index);

        setTimeout(() => {
            router.push(path);
        }, 800);
    };

    useEffect(() => {
        const video = videoRefs.current[activeIndex];
        if (!video) return;

        const playLastFiveSeconds = async () => {
            if (!Number.isFinite(video.duration)) return;
            video.currentTime = Math.max(0, video.duration - 5);

            try {
                await video.play();
                setIsPlaying((prev) => ({ ...prev, [activeIndex]: true }));
            } catch (err) {
                if (err instanceof Error && err.name !== 'AbortError') {
                    console.error("Playback failed:", err);
                }
            }
        };

        const handleMetadata = () => {
            playLastFiveSeconds().catch(console.error);
        };

        const handleTimeUpdate = () => {
            if (Number.isFinite(video.duration) && video.currentTime >= video.duration - 0.1) {
                playLastFiveSeconds().catch(console.error);
            }
        };

        video.addEventListener("timeupdate", handleTimeUpdate);

        if (video.readyState >= 1) {
            playLastFiveSeconds().catch(console.error);
        } else {
            video.addEventListener("loadedmetadata", handleMetadata, { once: true });
        }

        return () => {
            video.removeEventListener("loadedmetadata", handleMetadata);
            video.removeEventListener("timeupdate", handleTimeUpdate);
            video.pause();
            setIsPlaying((prev) => ({ ...prev, [activeIndex]: false }));
        };
    }, [activeIndex]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            const threshold = container.clientWidth * 0.3;
            scrollAccumulator.current += e.deltaY;
            setVisualOffset(scrollAccumulator.current * 0.5);

            if (scrollAccumulator.current > threshold && activeIndex < validProjects.length - 1) {
                setActiveIndex((prev) => prev + 1);
                scrollAccumulator.current = 0;
                setVisualOffset(0);
            } else if (scrollAccumulator.current < -threshold && activeIndex > 0) {
                setActiveIndex((prev) => prev - 1);
                scrollAccumulator.current = 0;
                setVisualOffset(0);
            }
        };

        container.addEventListener("wheel", handleWheel, { passive: false });
        return () => container.removeEventListener("wheel", handleWheel);
    }, [activeIndex, validProjects.length]);

    useEffect(() => {
        if (visualOffset === 0) return;
        const timer = setTimeout(() => {
            setVisualOffset(0);
            scrollAccumulator.current = 0;
        }, 300);
        return () => clearTimeout(timer);
    }, [visualOffset]);

    const initiateGesture = (clientX: number) => {
        startX.current = clientX;
        setIsDragging(true);
        hasMoved.current = false;
    };

    const evaluateGesture = (currentX: number) => {
        if (startX.current === null || !isDragging) return;
        const rawDelta = currentX - startX.current;
        if (Math.abs(rawDelta) > 4) hasMoved.current = true;
        setDragOffset(rawDelta);
    };

    const terminateGesture = () => {
        if (!isDragging) return;
        setIsDragging(false);
        const container = containerRef.current;
        const slideWidth = container?.clientWidth || 1920;
        const threshold = slideWidth * 0.2;

        if (dragOffset < -threshold && activeIndex < validProjects.length - 1) {
            setActiveIndex((prev) => prev + 1);
        } else if (dragOffset > threshold && activeIndex > 0) {
            setActiveIndex((prev) => prev - 1);
        }
        setDragOffset(0);
        startX.current = null;
    };

    if (validProjects.length === 0) return null;

    return (
        <main
            className="relative w-screen h-screen bg-black text-white font-sans overflow-hidden select-none"
            onTouchStart={(e) => initiateGesture(e.targetTouches[0].clientX)}
            onTouchMove={(e) => evaluateGesture(e.targetTouches[0].clientX)}
            onTouchEnd={terminateGesture}
            onMouseDown={(e) => initiateGesture(e.clientX)}
            onMouseMove={(e) => evaluateGesture(e.clientX)}
            onMouseUp={terminateGesture}
            onMouseLeave={terminateGesture}
        >
            <header className="absolute bottom-5 left-0 w-full z-30 p-6 md:p-12 pointer-events-none">
                <h1 className="hidden md:block text-lg md:text-xl font-medium tracking-[0.25em] uppercase mix-blend-difference">
                    Portfolio
                </h1>
            </header>

            <section
                ref={containerRef}
                className="w-full h-full flex overflow-x-visible items-center"
                style={{
                    transform: `translateX(calc(${-activeIndex * 100}% + ${dragOffset}px - ${visualOffset}px))`,
                    transition: isDragging ? "none" : "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
            >
                {validProjects.map((project, index) => {
                    const posterUrl = project.coverMedia
                        ? urlFor(project.coverMedia).width(1920).height(1080).fit("crop").format("webp").url()
                        : undefined;

                    const activeAndPlaying = index === activeIndex && isPlaying[index];

                    return (
                        <Link
                            key={project._id}
                            href={`/film/${project.photoid}`}
                            onClick={(e) => handleProjectClick(e, `/film/${project.photoid}`, index)}
                            className={`relative w-screen h-full shrink-0 overflow-hidden block cursor-grab active:cursor-grabbing transition-all duration-800 ease-in-out ${
                                isTransitioning === index ? "scale-[1.2] opacity-0 blur-sm z-50" : "scale-100 opacity-100 z-10"
                            }`}
                            onDragStart={(e) => e.preventDefault()}
                        >
                            {/* Underlying Video */}
                            <MuxVideo
                                ref={(el) => setVideoRef(index, el)}
                                playbackId={project.video?.playbackId}
                                muted
                                playsInline
                                controls={false}
                                preload="auto"
                                tabIndex={-1}
                                className="w-full h-full object-cover object-center brightness-[0.75] pointer-events-none"
                            />

                            {/* Cover Media Overlay that zooms out and fades once video starts playing */}
                            {posterUrl && (
                                <div
                                    className={`absolute inset-0 z-10 transition-all duration-1000 ease-out bg-cover bg-center ${
                                        activeAndPlaying
                                            ? "scale-110 opacity-0 pointer-events-none"
                                            : "scale-100 opacity-100"
                                    }`}
                                    style={{ backgroundImage: `url(${posterUrl})` }}
                                />
                            )}

                            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-black/20 pointer-events-none z-20" />
                        </Link>
                    );
                })}
            </section>

            <section className="absolute bottom-0 left-0 w-full z-30 p-6 md:p-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6 pointer-events-none">
                <div className="mix-blend-difference opacity-40 select-none hidden md:block">
                    <span className="text-[10px] font-mono tracking-widest uppercase">
                        0{activeIndex + 1} / 0{validProjects.length}
                    </span>
                </div>
                <nav className="flex flex-wrap items-center gap-x-6 gap-y-3 md:gap-x-12 max-w-5xl pointer-events-auto">
                    {validProjects.map((project, index) => (
                        <button
                            key={project._id}
                            onClick={(e) => {
                                e.stopPropagation();
                                setActiveIndex(index);
                            }}
                            className={`text-xs md:text-base font-medium tracking-[0.2em] uppercase transition-all duration-500 ease-out text-left ${
                                index === activeIndex ? "text-white scale-100" : "text-zinc-500 hover:text-zinc-300 scale-95"
                            }`}
                        >
                            {project.title}
                        </button>
                    ))}
                </nav>
            </section>
        </main>
    );
}