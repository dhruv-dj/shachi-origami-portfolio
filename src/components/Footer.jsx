export default function Footer() {
  return (
    <footer className="bg-ink py-10 px-6 text-center">
      <p className="font-serif italic text-cream/60 text-lg mb-1">Shachi Jain</p>
      <p className="font-sans text-xs tracking-widest uppercase text-cream/30 mb-6">Origami Artist</p>
      <div className="flex justify-center gap-8 mb-8">
        <a
          href="https://www.instagram.com/shachi_origami/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-xs tracking-widest uppercase text-cream/40 hover:text-cream/70 transition-colors"
        >
          Instagram
        </a>
        <a
          href="#contact"
          className="font-sans text-xs tracking-widest uppercase text-cream/40 hover:text-cream/70 transition-colors"
        >
          Contact
        </a>
        <a
          href="#shop"
          className="font-sans text-xs tracking-widest uppercase text-cream/40 hover:text-cream/70 transition-colors"
        >
          Shop
        </a>
      </div>
      <div className="h-px w-16 bg-cream/10 mx-auto mb-6" />
      <p className="font-sans text-[10px] tracking-widest uppercase text-cream/20">
        © {new Date().getFullYear()} Shachi Jain. All rights reserved.
      </p>
      <div className="mt-6">
        <a
          href="#admin"
          className="font-sans text-[10px] tracking-widest uppercase text-cream/20 hover:text-cream/50 border border-cream/10 hover:border-cream/30 px-4 py-2 inline-block transition-colors duration-300"
        >
          Admin Portal
        </a>
      </div>
    </footer>
  );
}
