/**
 * Fond du haut de page : réseau de points (marketing / données),
 * courbe de croissance et fragments de code (développement).
 * Purement décoratif, très discret.
 */
const nodes = [
  [120, 140], [260, 90], [360, 210], [210, 300], [470, 120],
  [980, 90], [1120, 170], [1260, 80], [1360, 230], [1180, 300], [1040, 260],
] as const;

const links = [
  [0, 1], [1, 2], [0, 3], [2, 3], [1, 4], [2, 4],
  [5, 6], [6, 7], [7, 8], [6, 9], [8, 9], [9, 10], [5, 10], [6, 10],
] as const;

// Placés dans les espaces libres autour du texte et de la vidéo (ordinateur uniquement).
const codeLines = [
  { x: 60, y: 44, text: "const roi = leads * conversion;" },
  { x: 560, y: 62, text: "npm run build  ✓ compiled" },
  { x: 1000, y: 100, text: "git push origin main" },
  { x: 1300, y: 470, text: "<section>" },
  { x: 1300, y: 495, text: "  <Hero />" },
  { x: 1300, y: 520, text: "</section>" },
];

const metrics = [
  { x: 760, y: 170, text: "ROI ×3" },
  { x: 750, y: 470, text: "CTR +4.8%" },
  { x: 1300, y: 360, text: "SEO 98/100" },
];

const curve =
  "M0 740 C 140 730, 220 700, 320 690 S 480 640, 580 620 S 760 600, 860 520 S 1040 470, 1140 380 S 1320 250, 1440 170";

export function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* Trame de points (remplace les carreaux) */}
      <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_15%,transparent_70%)]" />

      <svg
        className="absolute inset-0 size-full"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="hero-curve" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#59a2ff" stopOpacity="0" />
            <stop offset="35%" stopColor="#59a2ff" stopOpacity="0.55" />
            <stop offset="70%" stopColor="#8b5cf6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="hero-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Réseau de points connectés */}
        <g stroke="white" strokeOpacity="0.09" strokeWidth="1">
          {links.map(([a, b]) => (
            <line key={`${a}-${b}`} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} />
          ))}
        </g>
        <g>
          {nodes.map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="7" fill="#22d3ee" fillOpacity="0.06" />
              <circle
                cx={x}
                cy={y}
                r="2.5"
                fill="#7dd3fc"
                fillOpacity="0.45"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.4}s`, animationDuration: "3s" }}
              />
            </g>
          ))}
        </g>

        {/* Courbe de croissance */}
        <path d={`${curve} L1440 800 L0 800 Z`} fill="url(#hero-area)" />
        <path
          d={curve}
          fill="none"
          stroke="url(#hero-curve)"
          strokeWidth="2"
          strokeLinecap="round"
          className="hero-curve-draw"
        />
        {[
          [580, 620],
          [860, 520],
          [1140, 380],
        ].map(([x, y]) => (
          <g key={x}>
            <circle cx={x} cy={y} r="9" fill="none" stroke="#a78bfa" strokeOpacity="0.25" />
            <circle cx={x} cy={y} r="3.5" fill="#c4b5fd" fillOpacity="0.7" />
          </g>
        ))}

        {/* Fragments de code */}
        <g
          className="max-lg:hidden"
          fill="white"
          fillOpacity="0.1"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
          fontSize="15"
        >
          {codeLines.map((line) => (
            <text key={line.text} x={line.x} y={line.y} xmlSpace="preserve">
              {line.text}
            </text>
          ))}
        </g>

        {/* Indicateurs marketing */}
        <g
          className="max-lg:hidden"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
          fontSize="13"
          fontWeight="600"
        >
          {metrics.map((m) => (
            <g key={m.text}>
              <rect
                x={m.x - 10}
                y={m.y - 18}
                width={m.text.length * 8.2 + 20}
                height="27"
                rx="13.5"
                fill="white"
                fillOpacity="0.035"
                stroke="white"
                strokeOpacity="0.08"
              />
              <text x={m.x} y={m.y} fill="#67e8f9" fillOpacity="0.4">
                {m.text}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
