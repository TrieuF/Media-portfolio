"use client";

import { useState, useRef } from "react";
import { ProjectDocument, VideoItem } from "@/lib/sanity/sanity.types";
import { motion, AnimatePresence } from "framer-motion";
import MuxVideo from "@mux/mux-video-react";
import { useMuxQualities, QualityOption } from "@/hooks/useMuxQualities";
import { CreditsModal } from "./CreditsModal";

export default function VideoPlayer({ project }: { project: ProjectDocument }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Playback state persistence across resolution swaps
    const savedTimeRef = useRef<number>(0);
    const wasPlayingRef = useRef<boolean>(false);

    const videoItem = project.mediaGallery?.find(
        (item): item is VideoItem => (item as VideoItem).video?.playbackId !== undefined
    );

    // UI & Playback state
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showCredits, setShowCredits] = useState(false);
    const [showQualityMenu, setShowQualityMenu] = useState(false);

    // Mux resolutions custom hook
    const {
        selectedQuality,
        setSelectedQuality,
        availableQualities,
        targetMinRes,
        targetMaxRes,
    } = useMuxQualities(videoItem?.video?.playbackId);

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

    const handleQualitySelect = (opt: QualityOption) => {
        if (videoRef.current) {
            savedTimeRef.current = videoRef.current.currentTime;
            wasPlayingRef.current = !videoRef.current.paused;
        }
        setSelectedQuality(opt.value);
        setShowQualityMenu(false);
    };

    const handleLoadedData = (e: React.SyntheticEvent<HTMLVideoElement>) => {
        const video = e.currentTarget;
        if (savedTimeRef.current > 0) {
            video.currentTime = savedTimeRef.current;
            if (wasPlayingRef.current) {
                video.play().catch(() => {});
                setIsPlaying(true);
            }
            savedTimeRef.current = 0;
        }
    };

    return (
        <div className="w-full h-screen bg-black relative">
            <motion.main
                ref={containerRef}
                className="z-50 w-full h-full bg-black text-white origin-center"
                initial={{ opacity: 0, scale: 1.15 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{
                    opacity: 0,
                    scale: 0.95,
                    transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] },
                }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
                {/* Video Stream */}
                <MuxVideo
                    key={selectedQuality}
                    ref={videoRef}
                    playbackId={videoItem.video.playbackId}
                    minResolution={targetMinRes}
                    maxResolution={targetMaxRes}
                    onLoadedData={handleLoadedData}
                    className="w-full h-full object-contain cursor-pointer"
                    onTimeUpdate={(e: React.SyntheticEvent<HTMLVideoElement>) => {
                        const v = e.currentTarget;
                        if (v.duration) setProgress((v.currentTime / v.duration) * 100);
                    }}
                    onClick={togglePlay}
                    playsInline
                    muted={isMuted}
                />

                {/* Player Controls Pill */}
                <div className="absolute bottom-15 left-1/2 -translate-x-1/2 w-112.5 p-4 bg-black/50 backdrop-blur-md rounded-full z-20">
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={progress}
                        onChange={(e) => {
                            if (videoRef.current) {
                                videoRef.current.currentTime =
                                    (Number(e.target.value) / 100) * videoRef.current.duration;
                                setProgress(Number(e.target.value));
                            }
                        }}
                        className="w-full h-0.5 mb-3 accent-white cursor-pointer appearance-none bg-white/20"
                    />

                    {/* Quality Popover */}
                    <AnimatePresence>
                        {showQualityMenu && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md rounded-2xl p-2 border border-white/10 flex flex-col gap-1 min-w-[150px] text-center max-h-60 overflow-y-auto no-scrollbar"
                            >
                                {availableQualities.map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => handleQualitySelect(opt)}
                                        className={`px-3 py-1.5 text-xs uppercase tracking-wider rounded-xl transition-colors ${
                                            selectedQuality === opt.value
                                                ? "bg-white text-black font-semibold"
                                                : "text-white/70 hover:text-white hover:bg-white/10"
                                        }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Button Row */}
                    <div className="flex justify-center gap-6 text-sm uppercase tracking-widest">
                        <button className="opacity-70 hover:opacity-100 transition-opacity" onClick={togglePlay}>
                            {isPlaying ? "Pause" : "Play"}
                        </button>

                        <button
                            className="opacity-70 hover:opacity-100 transition-opacity"
                            onClick={() => {
                                if (videoRef.current) {
                                    videoRef.current.muted = !videoRef.current.muted;
                                    setIsMuted(videoRef.current.muted);
                                }
                            }}
                        >
                            {isMuted ? "Unmute" : "Mute"}
                        </button>

                        <button
                            className={`transition-opacity ${showQualityMenu ? "opacity-100 font-bold" : "opacity-70 hover:opacity-100"}`}
                            onClick={() => setShowQualityMenu((prev) => !prev)}
                        >
                            {selectedQuality === "Auto" ? "Quality" : selectedQuality}
                        </button>

                        <button className="opacity-70 hover:opacity-100 transition-opacity" onClick={() => setShowCredits(true)}>
                            Credits
                        </button>

                        <button
                            className="opacity-70 hover:opacity-100 transition-opacity"
                            onClick={() =>
                                !document.fullscreenElement
                                    ? containerRef.current?.requestFullscreen()
                                    : document.exitFullscreen()
                            }
                        >
                            Fullscreen
                        </button>
                    </div>
                </div>

                {/* Credits Modal */}
                <CreditsModal
                    title={project.title}
                    credits={project.credits}
                    isOpen={showCredits}
                    onClose={() => setShowCredits(false)}
                />
            </motion.main>
        </div>
    );
}