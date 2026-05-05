export default function About() {
  return (
    <section id="about" className="py-28 px-6 bg-cream">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Photo placeholder */}
        <div className="relative">
          <div className="aspect-[3/4] bg-parchment overflow-hidden">
            {/* Placeholder: replace with <img src="..." /> */}
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
          </div>
          {/* Gold corner accent */}
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
            <p>
              Shachi Jain is a contemporary origami artist whose work bridges the ancient Japanese tradition
              of paper folding with a distinctly modern sensibility. Each piece begins with a single
              uncut sheet — an act of faith that one flat plane can become something alive.
            </p>
            <p>
              Working primarily with hand-dyed washi, lokta, and foil-backed papers, Shachi explores
              the tension between geometry and grace. Her pieces range from classical Orizuru cranes
              to complex modular kusudama structures that take hundreds of hours to assemble.
            </p>
            <p>
              Her work has been exhibited across India and internationally, and is held in private
              collections around the world. Each framed piece is signed, dated, and comes with a
              certificate of authenticity.
            </p>
          </div>

          <div className="mt-10 flex gap-12">
            <div>
              <p className="font-serif text-4xl font-light text-wood">8+</p>
              <p className="font-sans text-xs tracking-widest uppercase text-muted mt-1">Years folding</p>
            </div>
            <div>
              <p className="font-serif text-4xl font-light text-wood">200+</p>
              <p className="font-sans text-xs tracking-widest uppercase text-muted mt-1">Works created</p>
            </div>
            <div>
              <p className="font-serif text-4xl font-light text-wood">12</p>
              <p className="font-sans text-xs tracking-widest uppercase text-muted mt-1">Exhibitions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
