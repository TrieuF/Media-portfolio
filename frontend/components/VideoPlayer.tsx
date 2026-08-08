// components/VideoPlayer.tsx
"use client";

import { useState, useRef } from "react";
import { ProjectDocument, VideoItem } from "@/lib/sanity/sanity.types";
import { motion } from "framer-motion";
import MuxVideo from "@mux/mux-video-react";
import {
    MediaController,
    MediaPlayButton,
    MediaMuteButton,
    MediaTimeRange,
    MediaFullscreenButton,
} from "media-chrome/react";

import { useMuxQualities } from "@/hooks/useMuxQualities";
import CreditsModal from "./CreditsModal";

type MuxResolution = "720p" | "1080p" | "1440p" | "2160p" | undefined;

export default function VideoPlayer({ project }: { project: ProjectDocument }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const playbackStateRef = useRef({ time: 0, isPlaying: false });

    const videoItem = project.mediaGallery?.find(
        (item): item is VideoItem => (item as VideoItem).video?.playbackId !== undefined
    );

    const [showCredits, setShowCredits] = useState(false);
    const [selectedQuality, setSelectedQuality] = useState<string>("AUTO");
    const [showQualityMenu, setShowQualityMenu] = useState(false);

    const playbackId = videoItem?.video?.playbackId;
    const qualities = useMuxQualities(playbackId);

    if (!videoItem || !playbackId) return <div>No video found for this project.</div>;

    const handleQualitySelect = (label: string) => {
        if (videoRef.current) {
            playbackStateRef.current = {
                time: videoRef.current.currentTime,
                isPlaying: !videoRef.current.paused,
            };
        }
        setSelectedQuality(label);
        setShowQualityMenu(false);
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current && playbackStateRef.current.time > 0) {
            videoRef.current.currentTime = playbackStateRef.current.time;
            if (playbackStateRef.current.isPlaying) {
                videoRef.current.play().catch(() => {});
            }
            playbackStateRef.current = { time: 0, isPlaying: false };
        }
    };

    const maxResolutionProp: MuxResolution =
        selectedQuality === "AUTO"
            ? undefined
            : (selectedQuality.toLowerCase() as MuxResolution);

    return (
        <div className="w-full h-screen bg-black relative overflow-hidden">
            <motion.main
                ref={containerRef}
                className="z-50 w-full h-full bg-black text-white origin-center relative"
                initial={{ opacity: 0, scale: 1.15 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{
                    opacity: 0,
                    scale: 0.95,
                    transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] },
                }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
                <MediaController className="w-full h-full">
                    <MuxVideo
                        ref={videoRef}
                        slot="media"
                        key={selectedQuality}
                        playbackId={playbackId}
                        maxResolution={maxResolutionProp}
                        onLoadedMetadata={handleLoadedMetadata}
                        className="w-full h-full object-contain cursor-pointer"
                        playsInline
                        crossOrigin=""
                        tabIndex={-1}
                    />

                    {/* Responsive Custom Control Bar */}
                    <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 w-[90%] sm:w-[450px] max-w-lg p-3 sm:p-4 bg-black/50 backdrop-blur-md rounded-2xl sm:rounded-full z-20 border border-white/10 shadow-2xl">

                        {/* Quality Popup Menu */}
                        {showQualityMenu && (
                            <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-lg border border-white/10 rounded-2xl p-2 flex flex-col gap-1 min-w-[110px] text-center shadow-2xl z-30">
                                <button
                                    onClick={() => handleQualitySelect("AUTO")}
                                    className={`px-3 py-1.5 text-xs tracking-widest uppercase transition-colors rounded-xl ${
                                        selectedQuality === "AUTO"
                                            ? "bg-white text-black font-semibold"
                                            : "text-white/70 hover:text-white hover:bg-white/10"
                                    }`}
                                >
                                    AUTO
                                </button>
                                {qualities.map((label) => (
                                    <button
                                        key={label}
                                        onClick={() => handleQualitySelect(label)}
                                        className={`px-3 py-1.5 text-xs tracking-widest uppercase transition-colors rounded-xl ${
                                            selectedQuality === label
                                                ? "bg-white text-black font-semibold"
                                                : "text-white/70 hover:text-white hover:bg-white/10"
                                        }`}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        )}

                        <MediaTimeRange
                            className="w-full h-2 mb-3 cursor-pointer"
                            style={{
                                "--media-range-track-background": "rgba(255, 255, 255, 0.2)",
                                "--media-range-bar-color": "white"
                            } as React.CSSProperties & { [key: `--${string}`]: string }}
                        />

                        {/* Control Buttons */}
                        <div className="flex justify-between sm:justify-center items-center gap-4 sm:gap-6 text-xs sm:text-sm uppercase tracking-widest px-1 sm:px-0">
                            <MediaPlayButton
                                className="w-7 h-7 sm:w-8 sm:h-8 opacity-70 hover:opacity-100 transition-opacity"
                                style={{
                                    "--media-control-background": "transparent",
                                    "--media-control-hover-background": "transparent"
                                } as React.CSSProperties & { [key: `--${string}`]: string }}
                            />

                            <MediaMuteButton
                                className="w-7 h-7 sm:w-8 sm:h-8 opacity-70 hover:opacity-100 transition-opacity"
                                style={{
                                    "--media-control-background": "transparent",
                                    "--media-control-hover-background": "transparent"
                                } as React.CSSProperties & { [key: `--${string}`]: string }}
                            />

                            <button
                                className="opacity-70 hover:opacity-100 transition-opacity truncate"
                                onClick={() => setShowQualityMenu(!showQualityMenu)}
                            >
                                {selectedQuality}
                            </button>

                            <button
                                className="opacity-70 hover:opacity-100 transition-opacity truncate"
                                onClick={() => setShowCredits(true)}
                            >
                                Credits
                            </button>

                            <MediaFullscreenButton
                                className="w-7 h-7 sm:w-8 sm:h-8 opacity-70 hover:opacity-100 transition-opacity"
                                style={{
                                    "--media-control-background": "transparent",
                                    "--media-control-hover-background": "transparent"
                                } as React.CSSProperties & { [key: `--${string}`]: string }}
                            />
                        </div>
                    </div>
                </MediaController>

                <CreditsModal
                    project={project}
                    show={showCredits}
                    onClose={() => setShowCredits(false)}
                />
            </motion.main>
        </div>
    );
}