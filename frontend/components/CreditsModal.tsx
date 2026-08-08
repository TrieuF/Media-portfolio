// components/CreditsModal.tsx
"use client";

import { ProjectDocument } from "@/lib/sanity/sanity.types";

interface CreditsModalProps {
    project: ProjectDocument;
    show: boolean;
    onClose: () => void;
}

export default function CreditsModal({ project, show, onClose }: CreditsModalProps) {
    return (
        <div
            className={`fixed inset-0 z-50 flex items-end justify-center transition-transform duration-500 ease-in-out ${
                show ? "translate-y-0" : "translate-y-full"
            }`}
        >
            <div className="w-full h-[50vh] bg-neutral-900 p-12 border-t border-white/10 flex flex-col">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold">{project.title}</h2>
                    <button
                        onClick={onClose}
                        className="underline opacity-70 hover:opacity-100 transition-opacity"
                    >
                        Close
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto pr-4 no-scrollbar">
                    {project.credits?.map((item) => (
                        <div key={item._key} className="flex gap-4 mb-4 items-baseline">
                            <span className="text-zinc-500 w-1/3 shrink-0">
                                {item.role}
                            </span>
                            <div className="flex flex-col">
                                <span className="font-medium">{item.name}</span>
                                {item.instagram && (
                                    <a
                                        href={`https://instagram.com/${item.instagram.replace(
                                            "@",
                                            ""
                                        )}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-zinc-400 hover:text-white underline"
                                    >
                                        @{item.instagram.replace("@", "")}
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}