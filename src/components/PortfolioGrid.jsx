import { artworks as svgArtworks } from "../data/artworks";
import { useContent } from "../context/ContentContext";

function ArtworkDisplay({ art }) {
  if (art.imageUrl) {
    return <img src={art.imageUrl} alt={art.title} className="w-full h-full object-cover" />;
  }
  if (art.Artwork) {
    return <art.Artwork />;
  }
  return <div className="w-full h-full bg-parchment" />;
}

export default function PortfolioGrid() {
  const { content } = useContent();

  const artworks = svgArtworks.map(art => {
    const override = content.artworks?.find(a => a.id === art.id);
    return override ? { ...art, ...override } : art;
  });

  const newArtworks = (content.artworks || []).filter(
    a => !svgArtworks.find(d => d.id === a.id)
  );

  const all = [...artworks, ...newArtworks];

  return (
    <section id="gallery" className="py-28 px-6 bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-wood mb-3">Portfolio</p>
          <h2 className="font-serif font-light text-5xl text-ink">Gallery</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {all.map(art => (
            <div key={art.id} className="group relative overflow-hidden cursor-pointer">
              {/* Mini frame */}
              <div className="border-4 border-wood/60">
                <div className="border-8 border-cream">
                  <div className="aspect-square">
                    <ArtworkDisplay art={art} />
                  </div>
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/60 transition-all duration-400 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
                <p className="font-serif text-cream text-xl font-medium">{art.title}</p>
                <p className="font-sans text-cream/70 text-xs tracking-widest uppercase mt-1">{art.year}</p>
                <p className="font-serif text-wood-light text-lg mt-2">{art.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
