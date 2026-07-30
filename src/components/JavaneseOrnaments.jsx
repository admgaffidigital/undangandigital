import React from 'react';

// Gold gradient definition used in all ornaments
const GoldGradientDef = () => (
  <defs>
    <linearGradient id="gold-grad-ornament" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#AA771C" />
      <stop offset="20%" stopColor="#FBF5B7" />
      <stop offset="40%" stopColor="#B38728" />
      <stop offset="60%" stopColor="#FCF6BA" />
      <stop offset="80%" stopColor="#BF953F" />
      <stop offset="100%" stopColor="#AA771C" />
    </linearGradient>
    <filter id="gold-glow">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
);

// Javanese Corner Ornament (Sudut)
export const JavaneseCorner = ({ className = '', style = {} }) => {
  return (
    <svg 
      viewBox="0 0 120 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <GoldGradientDef />
      {/* Outer corner frame border */}
      <path 
        d="M 6 114 L 6 6 C 6 6, 20 6, 30 16 C 40 26, 35 45, 55 45 C 75 45, 75 25, 95 25 C 105 25, 114 6, 114 6 L 114 6 C 114 6, 114 20, 104 30 C 94 40, 75 35, 75 55 C 75 75, 95 75, 95 95 C 95 105, 114 114, 114 114 L 6 114 Z" 
        stroke="url(#gold-grad-ornament)" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        opacity="0.25"
      />
      {/* Detailed Javanese lung-lungan (foliage curls) */}
      <path 
        d="M 12 108 L 12 12 Q 12 12 24 24 T 48 24 T 60 48 T 48 72 T 24 84 Z" 
        stroke="url(#gold-grad-ornament)" 
        strokeWidth="1" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Corner main spiral (flora motif) */}
      <path 
        d="M 8 8 Q 28 8 38 28 T 28 58 T 8 68" 
        stroke="url(#gold-grad-ornament)" 
        strokeWidth="2" 
        strokeLinecap="round" 
      />
      <path 
        d="M 8 8 Q 8 28 28 38 T 58 28 T 68 8" 
        stroke="url(#gold-grad-ornament)" 
        strokeWidth="2" 
        strokeLinecap="round" 
      />
      {/* Fine inner filigree */}
      <circle cx="28" cy="28" r="6" stroke="url(#gold-grad-ornament)" strokeWidth="1" />
      <circle cx="28" cy="28" r="2" fill="url(#gold-grad-ornament)" />
      
      <path d="M 22 22 Q 15 15 8 20" stroke="url(#gold-grad-ornament)" strokeWidth="1" />
      <path d="M 34 22 Q 45 15 52 20" stroke="url(#gold-grad-ornament)" strokeWidth="1" />
      <path d="M 22 34 Q 15 45 20 52" stroke="url(#gold-grad-ornament)" strokeWidth="1" />

      {/* Decorative leaf shapes */}
      <path d="M 12 40 C 18 42, 20 38, 24 42 C 22 35, 18 36, 12 40 Z" fill="url(#gold-grad-ornament)" />
      <path d="M 40 12 C 42 18, 38 20, 42 24 C 35 22, 36 18, 40 12 Z" fill="url(#gold-grad-ornament)" />
      
      {/* Small dots along the border */}
      <circle cx="8" cy="90" r="1.5" fill="url(#gold-grad-ornament)" />
      <circle cx="8" cy="100" r="1.5" fill="url(#gold-grad-ornament)" />
      <circle cx="90" cy="8" r="1.5" fill="url(#gold-grad-ornament)" />
      <circle cx="100" cy="8" r="1.5" fill="url(#gold-grad-ornament)" />
    </svg>
  );
};

// Javanese Gunungan Ornament (Center / Kayon)
export const JavaneseGunungan = ({ className = '', style = {} }) => {
  return (
    <svg 
      viewBox="0 0 160 220" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <GoldGradientDef />
      
      {/* Gunungan leaf-like outline */}
      <path 
        d="M 80 10 
           C 110 45, 135 70, 145 105 
           C 155 140, 150 170, 145 200 
           L 15 200 
           C 10 170, 5 140, 15 105 
           C 25 70, 50 45, 80 10 Z" 
        stroke="url(#gold-grad-ornament)" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      <path 
        d="M 80 16 
           C 107 49, 131 73, 140 106 
           C 149 139, 144 167, 140 195 
           L 20 195 
           C 16 167, 11 139, 20 106 
           C 29 73, 53 49, 80 16 Z" 
        stroke="url(#gold-grad-ornament)" 
        strokeWidth="0.75" 
        opacity="0.5"
      />

      {/* The Central Tree of Life (Kayon) Trunk */}
      <path 
        d="M 80 200 L 80 70" 
        stroke="url(#gold-grad-ornament)" 
        strokeWidth="3.5" 
        strokeLinecap="round" 
      />
      
      {/* Javanese Gate (Gapura) at the bottom base */}
      <path 
        d="M 55 200 L 55 160 L 68 150 L 80 160 L 92 150 L 105 160 L 105 200 Z" 
        stroke="url(#gold-grad-ornament)" 
        strokeWidth="1.5" 
        fill="#120808" 
        strokeLinejoin="round"
      />
      <path 
        d="M 65 200 L 65 170 L 80 162 L 95 170 L 95 200" 
        stroke="url(#gold-grad-ornament)" 
        strokeWidth="1" 
        strokeLinejoin="round"
      />
      {/* Gate Roof Details */}
      <path d="M 50 160 L 110 160" stroke="url(#gold-grad-ornament)" strokeWidth="2" />
      <circle cx="80" cy="180" r="4" stroke="url(#gold-grad-ornament)" strokeWidth="1" />
      <line x1="80" y1="176" x2="80" y2="184" stroke="url(#gold-grad-ornament)" strokeWidth="1" />
      <line x1="76" y1="180" x2="84" y2="180" stroke="url(#gold-grad-ornament)" strokeWidth="1" />

      {/* Symmetrical Branches of the Tree of Life */}
      {/* Level 1 branches */}
      <path d="M 80 140 Q 110 135 125 110" stroke="url(#gold-grad-ornament)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 80 140 Q 50 135 35 110" stroke="url(#gold-grad-ornament)" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Level 2 branches */}
      <path d="M 80 110 Q 115 100 130 75" stroke="url(#gold-grad-ornament)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 80 110 Q 45 100 30 75" stroke="url(#gold-grad-ornament)" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Level 3 branches (top) */}
      <path d="M 80 85 Q 105 75 115 50" stroke="url(#gold-grad-ornament)" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M 80 85 Q 55 75 45 50" stroke="url(#gold-grad-ornament)" strokeWidth="1.2" strokeLinecap="round" />

      {/* Intricate Wings (Sayap) - common in premium Gunungan designs */}
      <path 
        d="M 80 145 C 95 150, 115 155, 125 140 C 135 125, 125 105, 120 100 C 122 115, 115 130, 105 135 C 95 140, 85 142, 80 145 Z" 
        fill="url(#gold-grad-ornament)" 
        opacity="0.8"
      />
      <path 
        d="M 80 145 C 65 150, 45 155, 35 140 C 25 125, 35 105, 40 100 C 38 115, 45 130, 55 135 C 65 140, 75 142, 80 145 Z" 
        fill="url(#gold-grad-ornament)" 
        opacity="0.8"
      />

      {/* Floral leaf buds details on branches (spiral flourishes) */}
      <path d="M 125 110 C 130 115, 135 112, 135 107 C 135 102, 128 100, 122 105" stroke="url(#gold-grad-ornament)" strokeWidth="1" />
      <path d="M 35 110 C 30 115, 25 112, 25 107 C 25 102, 32 100, 38 105" stroke="url(#gold-grad-ornament)" strokeWidth="1" />
      <path d="M 130 75 C 135 80, 140 77, 140 72 C 140 67, 133 65, 127 70" stroke="url(#gold-grad-ornament)" strokeWidth="1" />
      <path d="M 30 75 C 25 80, 20 77, 20 72 C 20 67, 27 65, 33 70" stroke="url(#gold-grad-ornament)" strokeWidth="1" />

      {/* Cloud-like Javanese Megamendung borders flanking the mountain base */}
      <path d="M 25 190 Q 35 185 45 190" stroke="url(#gold-grad-ornament)" strokeWidth="1" />
      <path d="M 28 185 Q 38 180 48 185" stroke="url(#gold-grad-ornament)" strokeWidth="0.75" />
      <path d="M 135 190 Q 125 185 115 190" stroke="url(#gold-grad-ornament)" strokeWidth="1" />
      <path d="M 132 185 Q 122 180 112 185" stroke="url(#gold-grad-ornament)" strokeWidth="0.75" />

      {/* Tiny stars/sparks around the peak of Gunungan */}
      <circle cx="80" cy="30" r="1.5" fill="url(#gold-grad-ornament)" />
      <circle cx="70" cy="45" r="1" fill="url(#gold-grad-ornament)" />
      <circle cx="90" cy="45" r="1" fill="url(#gold-grad-ornament)" />
    </svg>
  );
};

// Javanese Royal Border Frame for Profile/Avatar Images
export const JavaneseFrame = ({ className = '', style = {} }) => {
  return (
    <svg 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <GoldGradientDef />
      
      {/* Outer decorative dotted circle */}
      <circle 
        cx="100" 
        cy="100" 
        r="95" 
        stroke="url(#gold-grad-ornament)" 
        strokeWidth="1.5" 
        strokeDasharray="4,4" 
      />
      
      {/* Main outer border line */}
      <circle 
        cx="100" 
        cy="100" 
        r="90" 
        stroke="url(#gold-grad-ornament)" 
        strokeWidth="2" 
      />

      {/* Intricate royal Javanese leaves along the circle (arranged every 15 degrees) */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i * 360) / 24;
        return (
          <g key={i} transform={`rotate(${angle} 100 100)`}>
            {/* Elegant royal Javanese leaf scroll motif sticking outwards */}
            <path 
              d="M 100 10 C 97 2, 95 0, 100 0 C 105 0, 103 2, 100 10 Z" 
              fill="url(#gold-grad-ornament)" 
            />
            {/* Small golden seed bead */}
            <circle cx="100" cy="18" r="2" fill="url(#gold-grad-ornament)" />
          </g>
        );
      })}

      {/* Inner border line that separates frame and image */}
      <circle 
        cx="100" 
        cy="100" 
        r="82" 
        stroke="url(#gold-grad-ornament)" 
        strokeWidth="1.2" 
        opacity="0.8"
      />
      <circle 
        cx="100" 
        cy="100" 
        r="78" 
        stroke="url(#gold-grad-ornament)" 
        strokeWidth="0.8" 
        opacity="0.5"
      />
    </svg>
  );
};
