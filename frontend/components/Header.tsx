import Link from 'next/link';
import HeaderMenu from "@/components/HeaderMenu";

interface HeaderProps {
  brandName: string;
  brandTitle: string;
}

export default function Header({ brandName, brandTitle }: HeaderProps) {


  return (
      <header className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-none">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
          <Link
              href="/"
              className="group select-none flex flex-col justify-center"
          >
          <span className="font-display text-base tracking-[0.2em] font-bold text-white uppercase group-hover:text-neutral-300 transition-colors duration-200">
            {brandName}
          </span>
            <span className="font-mono text-[9px] tracking-[0.15em] text-white/80 uppercase mt-0.5 group-hover:text-white transition-colors duration-200">
            {brandTitle || 'DIRECTOR & DP'}
          </span>
          </Link>

          <nav className="flex items-center gap-10">
            <HeaderMenu brandName={brandName} brandTitle={brandTitle}/>
            {/*{menuItems.map((item) => (
                <Link
                    key={item.id}
                    href={item.href}
                    className="text-white hover:text-neutral-300 text-xs tracking-[0.2em] uppercase transition-colors duration-300"
                >
                  {item.label}
                </Link>
            ))}
            */}
          </nav>
        </div>
      </header>
  );
}