"use client";

import { useState, useRef } from "react";
import { ProjectDocument, VideoItem } from "@/types";
import { motion } from "framer-motion";

export default function VideoPlayer({ project }: { project: ProjectDocument }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const videoItem = project.mediaGallery?.find(
        (item): item is VideoItem => (item as VideoItem).playbackId !== undefined
    );

    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showCredits, setShowCredits] = useState(false);

    if (!videoItem) return <div>No video found for this project.</div>;

    const togglePlay = async () => {
        if (videoRef.current?.paused) {
            try {
                await videoRef.current.play();
                setIsPlaying(true);
            } catch (error) {
                console.error("Playback failed:", error);
                setIsPlaying(false);
            }
        } else {
            videoRef.current?.pause();
            setIsPlaying(false);
        }
    };

    return (
        // Wrapper ensures the slide-in animation happens without scrollbars
        <div className="fixed inset-0 w-screen h-screen bg-black overflow-hidden">
            <motion.main
                ref={containerRef}
                className="fixed inset-0 z-50 w-screen h-screen bg-black text-white origin-center"

                // 1. Zoom Out Parameters: Start large, finish at 1:1
                initial={{
                    opacity: 0,
                    scale: 1.15, // Starts slightly zoomed in
                }}

                animate={{
                    opacity: 1,
                    scale: 1,    // Zooms out to fill screen exactly
                }}

                // 2. Consistent Exit Animation
                exit={{
                    opacity: 0,
                    scale: 0.95, // Zooms in/shrinks on exit to create a "receding" effect
                    transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] }
                }}

                // 3. The "Secret Sauce" Easing Curve
                transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.1,
                }}
            >
                {/* Video takes full space. Header sits over this (fixed). */}
                <video
                    ref={videoRef}
                    src={`https://stream.mux.com/${videoItem.playbackId}.m3u8`}
                    className="w-full h-full object-cover"
                    onTimeUpdate={(e) => {
                        const v = e.currentTarget;
                        setProgress((v.currentTime / v.duration) * 100);
                    }}
                    onClick={togglePlay}
                />

                {/* Controls - Absolute positioned at the bottom */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-112.5 p-4 bg-black/50 backdrop-blur-md rounded-full z-20">
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={progress}
                        onChange={(e) => {
                            if (videoRef.current) {
                                videoRef.current.currentTime = (Number(e.target.value) / 100) * videoRef.current.duration;
                                setProgress(Number(e.target.value));
                            }
                        }}
                        className="w-full h-0.5 mb-3 accent-white cursor-pointer appearance-none bg-white/20"
                    />

                    <div className="flex justify-center gap-6 text-sm uppercase tracking-widest">
                        <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
                        <button onClick={() => { if(videoRef.current) { videoRef.current.muted = !videoRef.current.muted; setIsMuted(videoRef.current.muted); } }}>
                            {isMuted ? "Unmute" : "Mute"}
                        </button>
                        <button onClick={() => setShowCredits(true)}>Credits</button>
                        <button onClick={() => !document.fullscreenElement ? containerRef.current?.requestFullscreen() : document.exitFullscreen()}>
                            Fullscreen
                        </button>
                    </div>
                </div>

                {/* Credits Slide-up Modal */}
                <div className={`fixed inset-0 z-50 flex items-end justify-center transition-transform duration-500 ease-in-out ${showCredits ? "translate-y-0" : "translate-y-full"}`}>
                    <div className="w-full h-[50vh] bg-neutral-900 p-12 border-t border-white/10 flex flex-col">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold">{project.title}</h2>
                            <button onClick={() => setShowCredits(false)} className="underline">Close</button>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-4 no-scrollbar">
                            {project.credits?.map((item) => (
                                <div key={item._key} className="flex gap-4 mb-4 items-baseline">
                                    <span className="text-zinc-500 w-1/3 shrink-0">{item.role}</span>
                                    <div className="flex flex-col">
                                        <span className="font-medium">{item.name}</span>
                                        {item.instagram && (
                                            <a href={`https://instagram.com/${item.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-xs text-zinc-400 hover:text-white underline">
                                                @{item.instagram.replace('@', '')}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.main>
        </div>
    );
}