"use client";
import {useState} from "react";
import Link from "next/link";
import {motion, AnimatePresence, Variants} from "framer-motion";

interface HeaderProps {
    brandName: string;
    brandTitle?: string;
}

const navItems = [
    {id: 1, label: "Home", href: "/"},
    {id: 2, label: "Film", href: "/film"},
    {id: 3, label: "Photo", href: "/photo"},
    {id: 4, label: "About", href: "/about"},
    {id: 5, label: "Contact", href: "/contact"},
];

export default function HeaderMenu({brandName, brandTitle}: HeaderProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const closeMenu = () => setIsOpen(false);

    const menuVariants: Variants = {
        hidden: {opacity: 0, y: "-100%"},
        visible: {
            opacity: 1,
            y: 0,
            transition: {duration: 0.3, ease: "easeInOut"}
        },
        exit: {
            opacity: 0,
            y: "-100%",
            transition: {duration: 0.3, ease: "easeInOut"}
        }
    };

    return (
        <header className="relative z-50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-neutral-300 text-xs tracking-[0.2em] uppercase transition-colors duration-300"
            >
                {isOpen ? "Close" : "Menu"}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={menuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed inset-0 w-screen h-screen bg-gray-800 p-8 flex flex-col justify-center items-center"
                    >
                        {/* Brand link placed at the top */}
                        <header className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-none">
                            <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="group select-none flex flex-col justify-center"
                                >
                                <span className="font-display text-base tracking-[0.2em] font-bold text-white uppercase group-hover:text-neutral-300 transition-colors duration-200">
                                        {brandName}
                                </span>
                                    <span className="font-mono text-[9px] tracking-[0.15em] text-white/80 uppercase mt-0.5 group-hover:text-white transition-colors duration-200">
                                    {brandTitle || 'DIRECTOR & DP'}
                                    </span>
                                </button>

                                <nav className="flex items-center gap-10">
                                    <button
                                        onClick={() => setIsOpen(!isOpen)}
                                        className="text-white hover:text-neutral-300 text-xs tracking-[0.2em] uppercase transition-colors duration-300"
                                    >
                                        {isOpen ? "Close" : "Menu"}
                                    </button>
                                </nav>
                            </div>
                        </header>

                        <nav>
                            <ul className="flex flex-col gap-8 text-center">
                                {navItems.map((item) => (
                                    <li key={item.id}>
                                        <Link
                                            href={item.href}
                                            onClick={closeMenu}
                                            className="text-white hover:text-neutral-300 text-2xl tracking-[0.2em] uppercase transition-colors duration-300"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}