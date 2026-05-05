import { useState, useEffect } from "react";

const links = [
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Shop", href: "#shop" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-cream/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#hero"
          className="font-serif text-xl font-medium tracking-wide text-ink hover:text-wood transition-colors"
        >
          Shachi Jain
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-10">
          {links.map(({ label, href }) => (
            <li key={label}>
              <a href={href} className="nav-link">
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className={`block h-px w-6 bg-ink transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-px w-6 bg-ink transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-px w-6 bg-ink transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-cream/97 backdrop-blur-sm border-t border-parchment">
          <ul className="flex flex-col py-4">
            {links.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="block px-6 py-3 nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
