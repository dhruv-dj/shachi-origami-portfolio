import { useState, useCallback } from "react";
import { artworks } from "../data/artworks";

const FADE_MS = 380;

export default function ExhibitionCarousel() {
  const [index, setIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [fading, setFading] = useState(false);

  const goTo = useCallback(
    (next) => {
      if (fading) return;
      setFading(true);
      setTimeout(() => {
        setDisplayIndex(next);
        setIndex(next);
        setTimeout(() => setFading(false), 40);
      }, FADE_MS);
    },
    [fading]
  );

  const prev = () => goTo((index - 1 + artworks.length) % artworks.length);
  const next = () => goTo((index + 1) % artworks.length);

  const art = artworks[displayIndex];

  return (
    <section id="shop" className="exhibition-wall">
      {/* Picture rail */}
      <div className="picture-rail" />
      <div className="picture-rail-shadow" />

      {/* Spotlight + frame area */}
      <div className="py-16 px-6 flex flex-col items-center">
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-muted mb-10">
          Available Works — {index + 1} / {artworks.length}
        </p>

        {/* Navigation + frame row */}
        <div className="flex items-center gap-6 md:gap-12 w-full max-w-4xl justify-center">
          {/* Left arrow */}
          <button
            onClick={prev}
            aria-label="Previous artwork"
            className="flex-shrink-0 w-10 h-10 flex items-center justify-center border border-wood/40 text-wood hover:bg-wood hover:text-cream transition-all duration-200 group"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:scale-90 transition-transform">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* The frame — static; only the content inside fades */}
          <div className="picture-frame flex-1 max-w-xl">
            <div className="mat-board">
              {/* Artwork content — this is the only thing that transitions */}
              <div
                className="aspect-[4/5] transition-opacity"
                style={{
                  transitionDuration: `${FADE_MS}ms`,
                  opacity: fading ? 0 : 1,
                }}
              >
                <art.Artwork />
              </div>
            </div>
          </div>

          {/* Right arrow */}
          <button
            onClick={next}
            aria-label="Next artwork"
            className="flex-shrink-0 w-10 h-10 flex items-center justify-center border border-wood/40 text-wood hover:bg-wood hover:text-cream transition-all duration-200 group"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:scale-90 transition-transform">
              <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Nameplate below frame */}
        <div
          className="mt-8 text-center transition-opacity"
          style={{ transitionDuration: `${FADE_MS}ms`, opacity: fading ? 0 : 1 }}
        >
          <p className="font-sans text-xs tracking-[0.25em] uppercase text-muted mb-1">{art.medium}</p>
          <h3 className="font-serif font-medium text-3xl text-ink mb-1">{art.title}</h3>
          <p className="font-serif italic text-muted text-lg mb-4">{art.year}</p>
          <p className="font-sans font-light text-sm text-muted max-w-sm mx-auto leading-relaxed mb-6">
            {art.description}
          </p>
          <div className="flex items-center justify-center gap-6">
            <span className="font-serif text-2xl text-wood">{art.price}</span>
            <a
              href={`mailto:shachi.origami@example.com?subject=Inquiry: ${encodeURIComponent(art.title)}`}
              className="inline-block px-6 py-2.5 bg-wood text-cream font-sans text-xs tracking-widest uppercase hover:bg-wood-dark transition-colors duration-300"
            >
              Inquire
            </a>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex gap-2 mt-10">
          {artworks.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to artwork ${i + 1}`}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "bg-wood w-4" : "bg-wood/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom baseboard */}
      <div className="h-3 bg-gradient-to-b from-transparent to-black/10" />
    </section>
  );
}
