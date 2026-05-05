import { useContent } from "../context/ContentContext";

export default function Hero() {
  const { content } = useContent();
  const { hero } = content;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-cream"
    >
      {/* Subtle background crane — large watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.055]">
        <svg
          viewBox="0 0 400 400"
          className="w-[680px] h-[680px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="200,60 340,220 200,310 60,220" fill="#8B6242" />
          <polygon points="340,220 430,110 370,240" fill="#8B6242" />
          <polygon points="60,220 -30,110 30,240" fill="#8B6242" />
          <polygon points="200,310 222,390 178,390" fill="#8B6242" />
          <line x1="200" y1="60" x2="228" y2="10" stroke="#8B6242" strokeWidth="12" />
          <polygon points="228,10 256,24 224,36" fill="#8B6242" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        {/* Thin rule */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="block h-px w-16 bg-wood-light opacity-60" />
          <span className="font-sans text-xs tracking-[0.3em] uppercase text-muted">
            {hero.badgeText}
          </span>
          <span className="block h-px w-16 bg-wood-light opacity-60" />
        </div>

        <h1 className="font-serif font-light text-7xl md:text-9xl tracking-tight text-ink leading-none mb-6">
          {hero.firstName}
          <br />
          <span className="italic font-light text-wood">{hero.lastName}</span>
        </h1>

        <p className="font-sans font-light text-base md:text-lg text-muted max-w-md mx-auto leading-relaxed mb-12">
          {hero.tagline}
          {hero.subtitle && (
            <> <span className="block mt-1">{hero.subtitle}</span></>
          )}
        </p>

        <div className="flex items-center justify-center gap-6">
          <a
            href="#shop"
            className="inline-block px-8 py-3 bg-wood text-cream font-sans text-sm tracking-widest uppercase hover:bg-wood-dark transition-colors duration-300"
          >
            View Exhibition
          </a>
          <a
            href="#gallery"
            className="inline-block px-8 py-3 border border-wood text-wood font-sans text-sm tracking-widest uppercase hover:bg-parchment transition-colors duration-300"
          >
            Gallery
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-muted">Scroll</span>
        <div className="w-px h-12 bg-wood-light animate-pulse" />
      </div>
    </section>
  );
}
