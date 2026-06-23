"use client";
import { useState } from "react";
import CreditDetail from "./CreditDetail";

export default function CreditTrigger({ title, description, credits }: any) {
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsDetailOpen(true)}
                className="text-xs uppercase tracking-[0.2em] hover:text-neutral-400 transition-colors"
            >
                View Credits
            </button>
            <CreditDetail
                isOpen={isDetailOpen}
                onClose={() => setIsDetailOpen(false)}
                title={title}
                description={description}
                credits={credits}
            />
        </>
    );
}