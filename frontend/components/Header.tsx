"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import HeaderMenu from "@/components/HeaderMenu";

interface HeaderProps {
  brandName: string;
  brandTitle: string;
}

export default function Header({ brandName, brandTitle }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Detect if we are on a detail page
  const isDetailView = pathname.startsWith('/film/') || pathname.startsWith('/photo/');

  return (
      <header className="fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">

          {/* Left Section: Dynamic content */}
          <div className="flex items-center">
            {isDetailView ? (
                <button
                    onClick={() => router.back()}
                    className="text-white hover:text-neutral-300 text-xs tracking-[0.2em] uppercase transition-colors duration-200 flex items-center gap-2"
                >
                  ← Back
                </button>
            ) : (
                <Link href="/" className="group select-none flex flex-col justify-center">
              <span className="font-display text-base tracking-[0.2em] font-bold text-white uppercase group-hover:text-neutral-300 transition-colors duration-200">
                {brandName}
              </span>
                  <span className="font-mono text-[9px] tracking-[0.15em] text-white/80 uppercase mt-0.5 group-hover:text-white transition-colors duration-200">
                {brandTitle || 'DIRECTOR & DP'}
              </span>
                </Link>
            )}
          </div>

          {/* Right Section */}
          <nav className="flex items-center gap-10">
            <HeaderMenu brandName={brandName} brandTitle={brandTitle} />
          </nav>
        </div>
      </header>
  );
}