import { useContent } from "../context/ContentContext";

export default function About() {
  const { content } = useContent();
  const { about } = content;

  return (
    <section id="about" className="py-28 px-6 bg-cream">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Photo / placeholder */}
        <div className="relative">
          <div className="aspect-[3/4] bg-parchment overflow-hidden">
            {about.photoUrl ? (
              <img
                src={about.photoUrl}
                alt="Shachi Jain"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg viewBox="0 0 300 400" className="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="150,60 260,180 150,250 40,180" fill="#8B6242" />
                  <polygon points="260,180 340,100 295,200" fill="#8B6242" />
                  <polygon points="40,180 -40,100 5,200" fill="#8B6242" />
                  <polygon points="150,250 165,320 135,320" fill="#8B6242" />
                  <line x1="150" y1="60" x2="168" y2="25" stroke="#8B6242" strokeWidth="8" />
                  <polygon points="168,25 186,34 166,42" fill="#8B6242" />
                </svg>
              </div>
            )}
          </div>
          {/* Gold corner accents */}
          <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-b-2 border-wood-light opacity-60" />
          <div className="absolute -top-4 -left-4 w-24 h-24 border-l-2 border-t-2 border-wood-light opacity-60" />
        </div>

        {/* Text */}
        <div>
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-wood mb-4">About</p>
          <h2 className="font-serif font-light text-5xl text-ink mb-6 leading-tight">
            The art of
            <br />
            <span className="italic">folded paper</span>
          </h2>
          <div className="space-y-5 font-sans font-light text-base text-muted leading-relaxed">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {about.stats.length > 0 && (
            <div className="mt-10 flex gap-12">
              {about.stats.map((stat, i) => (
                <div key={i}>
                  <p className="font-serif text-4xl font-light text-wood">{stat.value}</p>
                  <p className="font-sans text-xs tracking-widest uppercase text-muted mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
