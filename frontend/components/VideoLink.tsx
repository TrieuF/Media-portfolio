"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface VideoLinkProps {
    videoId: string;
    title: string;
    href: string; // Add href prop
}

export default function VideoLink({ videoId, title, href }: VideoLinkProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative block w-64 aspect-video rounded-lg overflow-hidden border border-gray-700 cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link href={href}>
                {isHovered ? (
                    <iframe
                        className="w-full h-full pointer-events-none"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=${videoId}`}
                        title={title}
                        allow="autoplay; encrypted-media"
                        frameBorder="0"
                    />
                ) : (
                    <img
                        src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                )}
            </Link>
        </motion.div>
    );
}