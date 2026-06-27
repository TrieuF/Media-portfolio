"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type ProjectDocument } from "@/types";

export default function HighlightedVideos({ projects }: { projects: ProjectDocument[] }) {
    const router = useRouter();
    const [activeIndex, setActiveIndex] = useState(0);
    const [visualOffset, setVisualOffset] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState<number | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const startX = useRef<number | null>(null);
    const [dragOffset, setDragOffset] = useState(0);
    const hasMoved = useRef(false);
    const scrollAccumulator = useRef(0);

    const validProjects = projects.filter((p) => p.playbackId);

    const setVideoRef = useCallback((index: number, el: HTMLVideoElement | null) => {
        videoRefs.current[index] = el;
    }, []);

    const handleProjectClick = (e: React.MouseEvent, path: string, index: number) => {
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

    // 1. MANUAL VIDEO PLAYBACK CONTROL (Robust Last 5s loop)
    useEffect(() => {
        const video = videoRefs.current[activeIndex];
        if (!video) return;

        const playLastFiveSeconds = () => {
            // Check if duration is a valid number before using it
            if (!Number.isFinite(video.duration)) return;

            const startTime = Math.max(0, video.duration - 5);
            video.currentTime = startTime;
            video.play().catch(() => {});
        };

        const handleTimeUpdate = () => {
            if (Number.isFinite(video.duration) && video.currentTime >= video.duration - 0.1) {
                playLastFiveSeconds();
            }
        };

        // If metadata is already loaded, start playing immediately
        if (video.readyState >= 1) {
            playLastFiveSeconds();
        } else {
            // Otherwise, wait for metadata to load
            video.addEventListener("loadedmetadata", playLastFiveSeconds, { once: true });
        }

        video.addEventListener("timeupdate", handleTimeUpdate);

        // Cleanup
        return () => {
            video.removeEventListener("loadedmetadata", playLastFiveSeconds);
            video.removeEventListener("timeupdate", handleTimeUpdate);
            video.pause();
            video.currentTime = 0;
        };
    }, [activeIndex]);

    // 2. RESPONSIVE MOUSE WHEEL SCROLLING
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

    // Cleanup: Snap back
    useEffect(() => {
        if (visualOffset === 0) return;
        const timer = setTimeout(() => {
            setVisualOffset(0);
            scrollAccumulator.current = 0;
        }, 300);
        return () => clearTimeout(timer);
    }, [visualOffset]);

    // 3. GESTURE HANDLERS
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
                <h1 className="text-lg md:text-xl font-medium tracking-[0.25em] uppercase mix-blend-difference">Portfolio</h1>
            </header>

            <section
                ref={containerRef}
                className="w-full h-full flex overflow-x-visible items-center"
                style={{
                    transform: `translateX(calc(${-activeIndex * 100}% + ${dragOffset}px - ${visualOffset}px))`,
                    transition: isDragging ? "none" : "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
            >
                {validProjects.map((project, index) => (
                    <Link
                        key={project._id}
                        href={`/film/${project.photoid}`}
                        onClick={(e) => handleProjectClick(e, `/film/${project.photoid}`, index)}
                        className={`relative w-screen h-full flex-shrink-0 overflow-hidden block cursor-grab active:cursor-grabbing transition-all duration-800 ease-in-out ${
                            isTransitioning === index ? "scale-[1.2] opacity-0 blur-sm z-50" : "scale-100 opacity-100 z-10"
                        }`}
                        onDragStart={(e) => e.preventDefault()}
                    >
                        <video
                            ref={(el) => setVideoRef(index, el)}
                            muted
                            playsInline
                            controls={false}
                            preload="auto"
                            className="w-full h-full object-cover object-center brightness-[0.75] pointer-events-none"
                        >
                            <source src={`https://stream.mux.com/${project.playbackId}.m3u8?rendition=1080p`} media="(min-width: 1024px)" />
                            <source src={`https://stream.mux.com/${project.playbackId}.m3u8?rendition=720p`} media="(min-width: 768px)" />
                            <source src={`https://stream.mux.com/${project.playbackId}.m3u8?rendition=480p`} />
                        </video>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20 pointer-events-none z-20" />
                    </Link>
                ))}
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