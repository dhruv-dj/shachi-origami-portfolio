import { createContext, useContext, useState, useEffect, useCallback } from 'react';

export const DEFAULT_CONTENT = {
  hero: {
    badgeText: 'Origami Artist',
    firstName: 'Shachi',
    lastName: 'Jain',
    tagline: 'Transforming a single sheet of paper into worlds — one fold at a time.',
    subtitle: 'Based in India, exhibiting worldwide.',
  },
  about: {
    photoUrl: '',
    paragraphs: [
      'Shachi Jain is a contemporary origami artist whose work bridges the ancient Japanese tradition of paper folding with a distinctly modern sensibility. Each piece begins with a single uncut sheet — an act of faith that one flat plane can become something alive.',
      'Working primarily with hand-dyed washi, lokta, and foil-backed papers, Shachi explores the tension between geometry and grace. Her pieces range from classical Orizuru cranes to complex modular kusudama structures that take hundreds of hours to assemble.',
      'Her work has been exhibited across India and internationally, and is held in private collections around the world. Each framed piece is signed, dated, and comes with a certificate of authenticity.',
    ],
    stats: [
      { value: '8+', label: 'Years folding' },
      { value: '200+', label: 'Works created' },
      { value: '12', label: 'Exhibitions' },
    ],
  },
  contact: {
    email: 'shachi.origami@example.com',
  },
  videos: [],
  artworks: [
    { id: 1, title: 'Crimson Crane', year: 2024, medium: 'Washi paper, single sheet', price: '₹6,500', description: 'A traditional Orizuru folded from hand-dyed crimson washi — the crane, symbol of longevity and good fortune.', imageUrl: '' },
    { id: 2, title: 'Kusudama Sphere', year: 2024, medium: 'Origami paper, 60 modules', price: '₹12,000', description: 'A modular kusudama assembled from 60 individual folded units, forming a perfect geometric sphere.', imageUrl: '' },
    { id: 3, title: 'Sacred Lotus', year: 2023, medium: 'Handmade lokta paper', price: '₹8,000', description: 'Eight-petalled lotus in bloom, folded from Nepali lokta bark paper with a delicate texture.', imageUrl: '' },
    { id: 4, title: 'Mountain Folds', year: 2024, medium: 'Unryu tissue paper', price: '₹5,500', description: 'An abstract landscape exploring the interplay of mountain and valley folds across tissue-thin unryu paper.', imageUrl: '' },
    { id: 5, title: 'Twilight Butterfly', year: 2023, medium: 'Foil-backed washi paper', price: '₹7,200', description: 'A Papillon folded from iridescent foil-backed washi, catching light from every angle like a real wing.', imageUrl: '' },
    { id: 6, title: 'Paper Dragon', year: 2024, medium: 'Duo-colour washi paper', price: '₹14,000', description: 'A complex dragon form folded from reversible duo-colour washi — deep teal on one side, gold on the other.', imageUrl: '' },
  ],
};

const DRAFT_KEY = 'siteContentDraft';

const ContentContext = createContext(null);

function mergeContent(defaults, loaded) {
  return {
    ...defaults,
    ...loaded,
    hero: { ...defaults.hero, ...(loaded.hero || {}) },
    about: { ...defaults.about, ...(loaded.about || {}), stats: (loaded.about?.stats ?? defaults.about.stats) },
    contact: { ...defaults.contact, ...(loaded.contact || {}) },
    videos: loaded.videos ?? defaults.videos,
    artworks: loaded.artworks ?? defaults.artworks,
  };
}

export function ContentProvider({ children }) {
  const [content, setContentState] = useState(() => {
    const draft = localStorage.getItem(DRAFT_KEY);
    if (draft) {
      try { return mergeContent(DEFAULT_CONTENT, JSON.parse(draft)); } catch {}
    }
    return DEFAULT_CONTENT;
  });

  useEffect(() => {
    if (localStorage.getItem(DRAFT_KEY)) return;
    fetch(`${import.meta.env.BASE_URL}siteContent.json?_=${Date.now()}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setContentState(mergeContent(DEFAULT_CONTENT, data)); })
      .catch(() => {});
  }, []);

  const updateContent = useCallback((newContent) => {
    setContentState(newContent);
    localStorage.setItem(DRAFT_KEY, JSON.stringify(newContent));
  }, []);

  const clearDraft = useCallback(() => {
    localStorage.removeItem(DRAFT_KEY);
    fetch(`${import.meta.env.BASE_URL}siteContent.json?_=${Date.now()}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => setContentState(data ? mergeContent(DEFAULT_CONTENT, data) : DEFAULT_CONTENT))
      .catch(() => setContentState(DEFAULT_CONTENT));
  }, []);

  return (
    <ContentContext.Provider value={{ content, updateContent, clearDraft }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within ContentProvider');
  return ctx;
}
