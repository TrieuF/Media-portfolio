import { useState, useEffect, ComponentProps } from "react";
import type MuxVideo from "@mux/mux-video-react";

export type QualityOption = {
    label: string;
    value: string;
    height: number;
};

export type MuxMinResolution = ComponentProps<typeof MuxVideo>["minResolution"];
export type MuxMaxResolution = ComponentProps<typeof MuxVideo>["maxResolution"];

const MASTER_QUALITIES: QualityOption[] = [
    { label: "4K (2160p)", value: "2160p", height: 2160 },
    { label: "2K (1440p)", value: "1440p", height: 1440 },
    { label: "1080p", value: "1080p", height: 1080 },
    { label: "720p", value: "720p", height: 720 },
    { label: "480p", value: "480p", height: 480 },
    { label: "360p", value: "360p", height: 360 },
];

export function useMuxQualities(playbackId?: string) {
    const [selectedQuality, setSelectedQuality] = useState<string>("Auto");
    const [availableQualities, setAvailableQualities] = useState<QualityOption[]>([
        { label: "Auto", value: "Auto", height: 0 },
    ]);

    useEffect(() => {
        if (!playbackId) return;

        let isMounted = true;

        fetch(`https://stream.mux.com/${playbackId}.m3u8?max_resolution=2160p`)
            .then((res) => res.text())
            .then((manifestText) => {
                if (!isMounted) return;

                const matches = [...manifestText.matchAll(/RESOLUTION=\d+x(\d+)/gi)];
                const heights = matches.map((m) => parseInt(m[1], 10)).filter(Boolean);

                if (heights.length > 0) {
                    const maxHeight = Math.max(...heights);
                    const validTiers = MASTER_QUALITIES.filter(
                        (q) => q.height <= maxHeight + 50
                    );

                    setAvailableQualities([
                        { label: "Auto", value: "Auto", height: 0 },
                        ...validTiers,
                    ]);

                    // Automatically default to highest available quality
                    if (validTiers.length > 0) {
                        setSelectedQuality(validTiers[0].value);
                    }
                }
            })
            .catch((err) => console.error("Failed to fetch Mux manifest:", err));

        return () => {
            isMounted = false;
        };
    }, [playbackId]);

    const targetMinRes =
        selectedQuality !== "Auto"
            ? (selectedQuality as unknown as MuxMinResolution)
            : undefined;

    const targetMaxRes =
        selectedQuality !== "Auto"
            ? (selectedQuality as unknown as MuxMaxResolution)
            : undefined;

    return {
        selectedQuality,
        setSelectedQuality,
        availableQualities,
        targetMinRes,
        targetMaxRes,
    };
}