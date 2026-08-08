// hooks/useMuxQualities.ts
import { useState, useEffect } from "react";

const DEFAULT_QUALITIES = ["1080P", "720P", "480P", "360P"];

export function useMuxQualities(playbackId?: string) {
    const [qualities, setQualities] = useState<string[]>([]);

    useEffect(() => {
        if (!playbackId) return;

        const fetchManifest = async () => {
            try {
                const res = await fetch(`https://stream.mux.com/${playbackId}.m3u8`);
                const manifestText = await res.text();

                const matches = Array.from(manifestText.matchAll(/RESOLUTION=\d+x(\d+)/g));
                const heights = [...new Set(matches.map((m) => parseInt(m[1], 10)))].sort((a, b) => b - a);

                setQualities(heights.length > 0 ? heights.map((h) => `${h}P`) : DEFAULT_QUALITIES);
            } catch (err) {
                console.error("Failed to parse Mux manifest:", err);
                setQualities(DEFAULT_QUALITIES);
            }
        };

        fetchManifest();
    }, [playbackId]);

    return qualities;
}