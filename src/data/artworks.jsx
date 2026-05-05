/* Placeholder SVG artworks — swap image prop for a real URL when ready */

const CraneSVG = ({ bg, stroke }) => (
  <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" style={{ background: bg }}>
    {/* body */}
    <polygon points="200,90 310,210 200,290 90,210" fill={stroke} fillOpacity="0.12" stroke={stroke} strokeWidth="1.6" />
    {/* right wing */}
    <polygon points="310,210 400,120 345,225" fill={stroke} fillOpacity="0.08" stroke={stroke} strokeWidth="1.4" />
    {/* left wing */}
    <polygon points="90,210 0,120 55,225" fill={stroke} fillOpacity="0.08" stroke={stroke} strokeWidth="1.4" />
    {/* tail */}
    <polygon points="200,290 218,360 182,360" fill={stroke} fillOpacity="0.1" stroke={stroke} strokeWidth="1.4" />
    {/* neck */}
    <line x1="200" y1="90" x2="222" y2="42" stroke={stroke} strokeWidth="1.6" />
    {/* beak */}
    <polygon points="222,42 246,52 220,58" fill={stroke} fillOpacity="0.28" stroke={stroke} strokeWidth="1" />
    {/* fold lines */}
    <line x1="200" y1="90" x2="200" y2="290" stroke={stroke} strokeWidth="0.8" strokeDasharray="5 5" strokeOpacity="0.35" />
    <line x1="90" y1="210" x2="310" y2="210" stroke={stroke} strokeWidth="0.8" strokeDasharray="5 5" strokeOpacity="0.35" />
  </svg>
);

const LotusSVG = ({ bg, stroke }) => {
  const petals = 8;
  return (
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" style={{ background: bg }}>
      {Array.from({ length: petals }).map((_, i) => {
        const angle = (i * 360) / petals;
        const rad = (angle * Math.PI) / 180;
        const cx = 200 + Math.cos(rad) * 95;
        const cy = 200 + Math.sin(rad) * 95;
        const tipX = 200 + Math.cos(rad) * 165;
        const tipY = 200 + Math.sin(rad) * 165;
        const lx = cx + Math.cos(rad + Math.PI / 2) * 28;
        const ly = cy + Math.sin(rad + Math.PI / 2) * 28;
        const rx = cx - Math.cos(rad + Math.PI / 2) * 28;
        const ry = cy - Math.sin(rad + Math.PI / 2) * 28;
        return (
          <polygon
            key={i}
            points={`200,200 ${lx},${ly} ${tipX},${tipY} ${rx},${ry}`}
            fill={stroke} fillOpacity="0.1" stroke={stroke} strokeWidth="1.4"
          />
        );
      })}
      <circle cx="200" cy="200" r="38" fill={stroke} fillOpacity="0.15" stroke={stroke} strokeWidth="1.4" />
      <circle cx="200" cy="200" r="18" fill={stroke} fillOpacity="0.25" stroke={stroke} strokeWidth="1" />
    </svg>
  );
};

const KusudamaSVG = ({ bg, stroke }) => {
  const faces = [
    [200, 120, 270, 170, 200, 200],
    [270, 170, 280, 250, 200, 200],
    [280, 250, 200, 290, 200, 200],
    [200, 290, 120, 250, 200, 200],
    [120, 250, 130, 170, 200, 200],
    [130, 170, 200, 120, 200, 200],
    [200, 120, 270, 170, 320, 100],
    [270, 170, 280, 250, 360, 200],
    [280, 250, 200, 290, 240, 360],
    [200, 290, 120, 250, 160, 360],
    [120, 250, 130, 170, 40, 200],
    [130, 170, 200, 120, 80, 100],
  ];
  return (
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" style={{ background: bg }}>
      {faces.map((pts, i) => (
        <polygon
          key={i}
          points={pts.join(" ")}
          fill={stroke}
          fillOpacity={0.05 + (i % 3) * 0.04}
          stroke={stroke}
          strokeWidth="1.2"
        />
      ))}
    </svg>
  );
};

const ButterflysSVG = ({ bg, stroke }) => (
  <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" style={{ background: bg }}>
    {/* right upper wing */}
    <polygon points="200,200 340,90 360,210 280,240" fill={stroke} fillOpacity="0.13" stroke={stroke} strokeWidth="1.5" />
    {/* right lower wing */}
    <polygon points="200,200 340,290 300,340 240,280" fill={stroke} fillOpacity="0.09" stroke={stroke} strokeWidth="1.4" />
    {/* left upper wing */}
    <polygon points="200,200 60,90 40,210 120,240" fill={stroke} fillOpacity="0.13" stroke={stroke} strokeWidth="1.5" />
    {/* left lower wing */}
    <polygon points="200,200 60,290 100,340 160,280" fill={stroke} fillOpacity="0.09" stroke={stroke} strokeWidth="1.4" />
    {/* body */}
    <ellipse cx="200" cy="200" rx="8" ry="50" fill={stroke} fillOpacity="0.3" stroke={stroke} strokeWidth="1.2" />
    {/* antennae */}
    <line x1="200" y1="155" x2="175" y2="125" stroke={stroke} strokeWidth="1" strokeOpacity="0.6" />
    <line x1="200" y1="155" x2="225" y2="125" stroke={stroke} strokeWidth="1" strokeOpacity="0.6" />
    <circle cx="175" cy="124" r="4" fill={stroke} fillOpacity="0.5" />
    <circle cx="225" cy="124" r="4" fill={stroke} fillOpacity="0.5" />
  </svg>
);

const MountainSVG = ({ bg, stroke }) => (
  <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" style={{ background: bg }}>
    {/* back ridge */}
    <polyline points="0,300 80,160 140,230 200,100 260,190 320,140 400,280" fill="none" stroke={stroke} strokeWidth="1.2" strokeOpacity="0.4" />
    {/* main range */}
    <polygon points="0,320 60,190 120,260 200,80 280,200 340,150 400,300 400,400 0,400"
      fill={stroke} fillOpacity="0.1" stroke={stroke} strokeWidth="1.6" />
    {/* fold lines */}
    <line x1="200" y1="80" x2="200" y2="400" stroke={stroke} strokeWidth="0.9" strokeDasharray="6 6" strokeOpacity="0.3" />
    <line x1="120" y1="260" x2="120" y2="400" stroke={stroke} strokeWidth="0.9" strokeDasharray="6 6" strokeOpacity="0.25" />
    <line x1="280" y1="200" x2="280" y2="400" stroke={stroke} strokeWidth="0.9" strokeDasharray="6 6" strokeOpacity="0.25" />
  </svg>
);

const DragonSVG = ({ bg, stroke }) => (
  <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" style={{ background: bg }}>
    {/* body segments */}
    {[
      [200, 80, 240, 130, 210, 150],
      [210, 150, 260, 180, 220, 210],
      [220, 210, 250, 250, 210, 270],
      [210, 270, 230, 310, 200, 330],
      [200, 330, 210, 360, 190, 370],
    ].map(([x1, y1, x2, y2, x3, y3], i) => (
      <polygon
        key={i}
        points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`}
        fill={stroke} fillOpacity="0.1" stroke={stroke} strokeWidth="1.5"
      />
    ))}
    {/* wings */}
    <polygon points="210,150 330,100 280,180" fill={stroke} fillOpacity="0.09" stroke={stroke} strokeWidth="1.3" />
    <polygon points="210,150 80,110 150,185" fill={stroke} fillOpacity="0.09" stroke={stroke} strokeWidth="1.3" />
    {/* head */}
    <polygon points="200,80 230,60 240,90 215,100" fill={stroke} fillOpacity="0.2" stroke={stroke} strokeWidth="1.4" />
    {/* horns */}
    <line x1="215" y1="68" x2="205" y2="45" stroke={stroke} strokeWidth="1.2" strokeOpacity="0.7" />
    <line x1="228" y1="66" x2="242" y2="44" stroke={stroke} strokeWidth="1.2" strokeOpacity="0.7" />
    {/* eye */}
    <circle cx="232" cy="74" r="3" fill={stroke} fillOpacity="0.6" />
  </svg>
);

export const artworks = [
  {
    id: 1,
    title: "Crimson Crane",
    year: 2024,
    medium: "Washi paper, single sheet",
    price: "₹6,500",
    description: "A traditional Orizuru folded from hand-dyed crimson washi — the crane, symbol of longevity and good fortune.",
    Artwork: () => <CraneSVG bg="linear-gradient(135deg,#7B1E1E 0%,#B34040 50%,#6B1515 100%)" stroke="#F6E05E" />,
  },
  {
    id: 2,
    title: "Kusudama Sphere",
    year: 2024,
    medium: "Origami paper, 60 modules",
    price: "₹12,000",
    description: "A modular kusudama assembled from 60 individual folded units, forming a perfect geometric sphere.",
    Artwork: () => <KusudamaSVG bg="linear-gradient(135deg,#1A237E 0%,#3949AB 50%,#0D1B6E 100%)" stroke="#90CAF9" />,
  },
  {
    id: 3,
    title: "Sacred Lotus",
    year: 2023,
    medium: "Handmade lokta paper",
    price: "₹8,000",
    description: "Eight-petalled lotus in bloom, folded from Nepali lokta bark paper with a delicate texture.",
    Artwork: () => <LotusSVG bg="linear-gradient(135deg,#880E4F 0%,#C2185B 50%,#6A0036 100%)" stroke="#F8BBD9" />,
  },
  {
    id: 4,
    title: "Mountain Folds",
    year: 2024,
    medium: "Unryu tissue paper",
    price: "₹5,500",
    description: "An abstract landscape exploring the interplay of mountain and valley folds across tissue-thin unryu paper.",
    Artwork: () => <MountainSVG bg="linear-gradient(135deg,#1B5E20 0%,#388E3C 50%,#0A3D12 100%)" stroke="#C8E6C9" />,
  },
  {
    id: 5,
    title: "Twilight Butterfly",
    year: 2023,
    medium: "Foil-backed washi paper",
    price: "₹7,200",
    description: "A Papillon folded from iridescent foil-backed washi, catching light from every angle like a real wing.",
    Artwork: () => <ButterflysSVG bg="linear-gradient(135deg,#4A148C 0%,#7B1FA2 50%,#2E0060 100%)" stroke="#F48FB1" />,
  },
  {
    id: 6,
    title: "Paper Dragon",
    year: 2024,
    medium: "Duo-colour washi paper",
    price: "₹14,000",
    description: "A complex dragon form folded from reversible duo-colour washi — deep teal on one side, gold on the other.",
    Artwork: () => <DragonSVG bg="linear-gradient(135deg,#004D40 0%,#00796B 50%,#00251A 100%)" stroke="#FFD54F" />,
  },
];
