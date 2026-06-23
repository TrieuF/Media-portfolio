"use client";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface Credit {
    role: string;
    name: string;
}

interface ProjectDetailProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description?: string;
    credits: Credit[];
}

const modalVariants: Variants = {
    hidden: { y: "100%" },
    visible: {
        y: 0,
        transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
    },
    exit: {
        y: "100%",
        transition: { duration: 0.5, ease: "easeInOut" }
    }
};

export default function CreditDetail({ isOpen, onClose, title, description, credits }: ProjectDetailProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={modalVariants}
                    className="fixed bottom-0 left-0 w-full h-[70vh] bg-neutral-950 z-[60] p-8 md:p-16 text-white overflow-y-auto"
                >
                    <div className="max-w-4xl mx-auto">
                        <button
                            onClick={onClose}
                            className="absolute top-8 right-8 text-xs uppercase tracking-[0.2em] hover:text-neutral-400 transition-colors"
                        >
                            Close
                        </button>

                        <div className="mb-12">
                            <h2 className="text-5xl font-bold mb-4">{title}</h2>
                            {description && <p className="text-neutral-400 max-w-lg leading-relaxed">{description}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 border-t border-neutral-800 pt-12">
                            {credits.map((credit, idx) => (
                                <div key={idx}>
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">{credit.role}</p>
                                    <p className="text-lg mt-1 font-medium">{credit.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}