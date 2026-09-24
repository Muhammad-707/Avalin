/* Avalin mascot — a friendly courier boy in the brand hoodie, drawn in SVG and animated with CSS. */

const SKIN = "#F4C7A1";
const SKIN_SH = "#E2A57E";
const HAIR = "#2A1A12";
const NAVY = "#12286E";
const NAVY_D = "#0A1A4A";
const GOLD = "#F5B82E";

function Head({ headset = true }: { headset?: boolean }) {
  return (
    <g className="m-head">
      {/* neck */}
      <path d="M100 138h22v22c0 6-22 6-22 0Z" fill={SKIN_SH} />
      {/* ears */}
      <ellipse cx="69" cy="108" rx="9" ry="11" fill={SKIN} />
      <ellipse cx="153" cy="108" rx="9" ry="11" fill={SKIN} />
      {/* face */}
      <path d="M70 100c0-30 18-46 41-46s41 16 41 46c0 28-18 46-41 46s-41-18-41-46Z" fill={SKIN} />
      {/* cheeks */}
      <ellipse cx="86" cy="124" rx="8" ry="5" fill="#F29A8A" opacity=".45" />
      <ellipse cx="136" cy="124" rx="8" ry="5" fill="#F29A8A" opacity=".45" />
      {/* hair */}
      <path
        d="M66 104c-6-30 10-56 40-60 10-10 30-8 38 2 14 2 24 16 20 34-2 10-6 18-10 22-2-12-6-20-12-24-8 6-22 8-34 4-8 6-18 8-26 6-4 4-8 10-10 16-2-2-4-0-6 0Z"
        fill={HAIR}
      />
      <path d="M92 50c-6-10 2-20 12-18-4 6-2 12 4 16ZM118 44c0-12 12-16 20-10-8 2-12 8-12 14ZM140 54c8-6 20-2 20 8-6-4-12-4-16 0Z" fill={HAIR} />
      <path d="M100 62c10 4 24 4 34-2" stroke="#4A3226" strokeWidth="3" strokeLinecap="round" fill="none" opacity=".6" />
      {/* brows */}
      <path d="M84 92c5-4 12-5 17-2M121 90c5-3 12-2 17 2" stroke={HAIR} strokeWidth="3.4" strokeLinecap="round" fill="none" />
      {/* eyes */}
      <g className="m-eyes">
        <ellipse cx="93" cy="106" rx="8.5" ry="10" fill="#fff" />
        <ellipse cx="129" cy="106" rx="8.5" ry="10" fill="#fff" />
        <circle cx="95" cy="108" r="6.2" fill="#4A2C1C" />
        <circle cx="131" cy="108" r="6.2" fill="#4A2C1C" />
        <circle cx="95" cy="108" r="3" fill="#120A05" />
        <circle cx="131" cy="108" r="3" fill="#120A05" />
        <circle cx="97.5" cy="105" r="2.1" fill="#fff" />
        <circle cx="133.5" cy="105" r="2.1" fill="#fff" />
      </g>
      {/* nose + smile */}
      <path d="M110 114c-2 4-1 7 3 7" stroke={SKIN_SH} strokeWidth="2.6" strokeLinecap="round" fill="none" />
      <path d="M99 128c7 7 18 7 25 0" stroke="#8A3B2C" strokeWidth="3.2" strokeLinecap="round" fill="none" />
      <path d="M102 130c6 4 13 4 19 0-3 5-16 5-19 0Z" fill="#fff" opacity=".9" />

      {headset && (
        <g>
          <path d="M64 108c-4-44 20-66 47-66s51 22 47 66" stroke={NAVY_D} strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M64 108c-4-44 20-66 47-66s51 22 47 66" stroke="#2F5DEB" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".6" />
          <rect x="54" y="94" width="20" height="30" rx="9" fill={NAVY_D} />
          <rect x="58" y="98" width="12" height="22" rx="6" fill={GOLD} />
          <rect x="148" y="94" width="20" height="30" rx="9" fill={NAVY_D} />
          <rect x="152" y="98" width="12" height="22" rx="6" fill={GOLD} />
          <path d="M64 122c0 14 8 22 22 22h6" stroke={NAVY_D} strokeWidth="4" fill="none" strokeLinecap="round" />
          <rect x="88" y="139" width="12" height="9" rx="4.5" fill={GOLD} className="m-mic" />
        </g>
      )}
    </g>
  );
}

function Hoodie() {
  return (
    <g>
      <path d="M40 220c0-34 18-58 50-64h42c32 6 50 30 50 64Z" fill={NAVY} />
      <path d="M90 156c6 12 36 12 42 0 4 2 6 4 8 6-8 14-50 14-58 0 2-2 4-4 8-6Z" fill={NAVY_D} />
      <path d="M104 166v18M118 166v18" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="104" cy="186" r="2.4" fill={GOLD} />
      <circle cx="118" cy="186" r="2.4" fill={GOLD} />
      {/* brand badge */}
      <circle cx="76" cy="192" r="10" fill={GOLD} />
      <path d="m76 185 2 4.4 4.8.6-3.5 3.3.9 4.7-4.2-2.3-4.2 2.3.9-4.7-3.5-3.3 4.8-.6Z" fill={NAVY_D} />
      <path d="M40 220c2-18 8-32 18-42" stroke="#2F5DEB" strokeWidth="3" fill="none" opacity=".35" />
    </g>
  );
}

/** Support agent: bust with headset, hand on chin, chat bubble. */
export function SupportMascot({ size = 200 }: { size?: number }) {
  return (
    <svg className="mascot m-support" viewBox="0 0 220 230" width={size} height={size * (230 / 220)} aria-hidden="true">
      <defs>
        <radialGradient id="m-glow" cx="50%" cy="55%" r="50%">
          <stop offset="0" stopColor="#F5B82E" stopOpacity=".45" />
          <stop offset="1" stopColor="#F5B82E" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="110" cy="120" r="104" fill="url(#m-glow)" className="m-glow" />
      <g className="m-body">
        <Hoodie />
        <Head />
        {/* arm + hand on chin */}
        <path d="M168 220c-2-26-10-44-26-58l-14 10c10 12 16 28 18 48Z" fill={NAVY} />
        <path d="M140 160c-4-6-14-10-22-6-6 3-6 10-2 13 6 5 18 5 24-1Z" fill={SKIN} />
        <path d="M122 156c2 2 6 3 10 2M121 161c3 2 7 2 11 1" stroke={SKIN_SH} strokeWidth="1.6" strokeLinecap="round" fill="none" />
      </g>
      {/* chat bubble */}
      <g className="m-bubble">
        <rect x="160" y="30" width="54" height="44" rx="14" fill="#fff" />
        <path d="M172 72l-6 12 16-10Z" fill="#fff" />
        <rect x="164" y="34" width="46" height="36" rx="11" fill="url(#m-bub)" />
        <defs>
          <linearGradient id="m-bub" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2F5DEB" />
            <stop offset="1" stopColor="#0A1A4A" />
          </linearGradient>
        </defs>
        <circle cx="176" cy="52" r="3.4" fill={GOLD} className="m-dot d1" />
        <circle cx="187" cy="52" r="3.4" fill={GOLD} className="m-dot d2" />
        <circle cx="198" cy="52" r="3.4" fill={GOLD} className="m-dot d3" />
      </g>
      <g className="m-spark">
        <path d="M200 16v10M195 21h10" stroke={GOLD} strokeWidth="2.6" strokeLinecap="round" />
        <path d="M24 60v8M20 64h8" stroke="#5B84FF" strokeWidth="2.4" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/** Waiting for parcels: sits on boxes with a phone, clock ticking beside. */
export function OrdersMascot({ size = 220 }: { size?: number }) {
  return (
    <svg className="mascot m-orders" viewBox="0 0 260 280" width={size} height={size * (280 / 260)} aria-hidden="true">
      <defs>
        <radialGradient id="mo-glow" cx="50%" cy="55%" r="50%">
          <stop offset="0" stopColor="#5B84FF" stopOpacity=".35" />
          <stop offset="1" stopColor="#5B84FF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="130" cy="150" rx="122" ry="118" fill="url(#mo-glow)" className="m-glow" />
      <ellipse cx="130" cy="268" rx="96" ry="8" fill="#0A1A4A" opacity=".18" />

      {/* boxes */}
      <g className="m-boxes">
        <rect x="52" y="208" width="84" height="60" rx="4" fill="#C98F55" />
        <rect x="52" y="208" width="84" height="12" fill="#B77B44" />
        <rect x="86" y="208" width="16" height="60" fill={GOLD} opacity=".9" />
        <rect x="126" y="196" width="80" height="72" rx="4" fill="#D69E62" />
        <rect x="126" y="196" width="80" height="12" fill="#C48A50" />
        <rect x="158" y="196" width="16" height="72" fill={GOLD} opacity=".9" />
        <path d="M138 232h14M138 238h10" stroke="#8B5A2B" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* character, shifted to sit on the boxes */}
      <g transform="translate(20 20)">
        <g className="m-body">
          {/* legs */}
          <path d="M84 196h34l4 36c0 4-4 6-8 6H96c-4 0-6-2-6-6Z" fill="#1B2344" />
          <path d="M118 196h34l2 36c0 4-4 6-8 6h-20c-4 0-6-2-6-6Z" fill="#1B2344" />
          {/* sneakers */}
          <path d="M88 236h30c6 0 10 4 10 10v2H84v-4c0-4 2-8 4-8Z" fill="#fff" />
          <path d="M122 236h30c6 0 10 4 10 10v2h-44v-4c0-4 2-8 4-8Z" fill="#fff" />
          <path d="M92 242c8 0 14-2 20-6M126 242c8 0 14-2 20-6" stroke={GOLD} strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M84 248h44M118 248h44" stroke="#C9D2E8" strokeWidth="3" />
          {/* torso */}
          <path d="M62 204c0-28 12-44 34-48h30c22 4 34 20 34 48Z" fill={NAVY} />
          <path d="M96 156c4 10 26 10 30 0 3 1 5 3 7 5-7 12-37 12-44 0 2-2 4-4 7-5Z" fill={NAVY_D} />
          <circle cx="82" cy="186" r="8" fill={GOLD} />
          <path d="m82 180.5 1.6 3.4 3.8.5-2.8 2.6.7 3.7-3.3-1.8-3.3 1.8.7-3.7-2.8-2.6 3.8-.5Z" fill={NAVY_D} />
        </g>
        <g transform="translate(0 2)">
          <Head headset={false} />
        </g>
        {/* arms holding the phone */}
        <g className="m-body">
          <path d="M66 176c-6 12-4 24 8 28l34-6-4-12-26 2c2-6 2-12-2-16Z" fill={NAVY} />
          <path d="M156 176c6 12 4 24-8 28l-30-4 4-12 22 2c-2-6-2-12 2-16Z" fill={NAVY} />
          <g className="m-phone">
            <rect x="100" y="176" width="24" height="40" rx="5" fill="#0B1433" />
            <rect x="103" y="180" width="18" height="30" rx="3" fill="#2F5DEB" className="m-screen" />
            <path d="M107 188h10M107 193h7M107 198h9" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity=".85" />
          </g>
          <ellipse cx="102" cy="200" rx="9" ry="7" fill={SKIN} />
          <ellipse cx="124" cy="200" rx="9" ry="7" fill={SKIN} />
        </g>
      </g>

      {/* clock */}
      <g transform="translate(212 64)">
        <g className="m-clock">
        <path d="M-22 -30l-6-6M22 -30l6-6" stroke="#E23B3B" strokeWidth="4" strokeLinecap="round" />
        <circle r="30" fill="#fff" stroke="#E23B3B" strokeWidth="5" />
        <circle r="30" fill="none" stroke={NAVY_D} strokeWidth="1" opacity=".1" />
        {[0, 90, 180, 270].map((a) => (
          <rect key={a} x="-1.2" y="-25" width="2.4" height="5" rx="1" fill={NAVY_D} transform={`rotate(${a})`} />
        ))}
        <rect x="-1.6" y="-17" width="3.2" height="18" rx="1.6" fill={NAVY_D} className="m-hand-h" />
        <rect x="-1.1" y="-23" width="2.2" height="24" rx="1.1" fill={GOLD} className="m-hand-m" />
        <circle r="3" fill={NAVY_D} />
        </g>
      </g>

      {/* floating parcel bubble */}
      <g transform="translate(14 60)">
        <g className="m-bubble">
          <rect width="46" height="40" rx="12" fill="#fff" />
          <path d="M30 38l10 12-2-14Z" fill="#fff" />
          <path d="M23 9l12 6v12l-12 6-12-6V15Z" fill={GOLD} />
          <path d="M11 15l12 6 12-6M23 21v12" stroke={NAVY_D} strokeWidth="2" fill="none" strokeLinejoin="round" />
        </g>
      </g>
      <g className="m-spark">
        <path d="M70 40l-8-8M78 34l-2-10M60 50l-10-2" stroke="#E23B3B" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  );
}
