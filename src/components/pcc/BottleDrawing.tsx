export function BottleDrawing() {
  return (
    <svg viewBox="0 0 360 470" role="img" aria-label="Technical bottle drawing showing 210 millimetre height, 65 millimetre body diameter and 28 millimetre cap diameter" className="h-full w-full max-w-[400px] text-primary-foreground">
      <defs><pattern id="hatch" width="5" height="5" patternUnits="userSpaceOnUse"><path d="M0 5L5 0" stroke="currentColor" opacity=".17" strokeWidth=".5" /></pattern></defs>
      <g fill="none" stroke="currentColor" strokeWidth="1.15" opacity=".78">
        <path d="M152 37H208V59H152Z M155 39v18 M160 39v18 M165 39v18 M170 39v18 M175 39v18 M180 39v18 M185 39v18 M190 39v18 M195 39v18 M200 39v18 M205 39v18" />
        <path d="M153 60v11q0 6-6 10l-15 16q-17 13-17 38v283q0 11 10 11h110q10 0 10-11V135q0-25-17-38l-15-16q-6-4-6-10V60" />
        <path d="M116 140h128 M116 263h128 M116 310h128 M116 334h128 M116 346h128 M116 358h128 M116 370h128 M116 382h128 M116 394h128 M116 406h128 M117 418h126" />
        <path d="M119 146h122v158H119z" fill="url(#hatch)" />
        <path d="M180 22v419" strokeDasharray="8 5" opacity=".35" />
        <path d="M80 37H115 M80 429H115 M90 37V429 M86 37h8 M86 429h8" />
        <path d="M115 448v-13 M245 448v-13 M115 443h130 M115 439v8 M245 439v8" />
        <path d="M152 17v16 M208 17v16 M152 24h56 M152 20v8 M208 20v8" />
        <path d="M246 155h30v-15 M246 326h30v20" opacity=".55" />
      </g>
      <g fill="currentColor" fontFamily="monospace" fontSize="10" letterSpacing="1.5"><text x="4" y="234" transform="rotate(-90 4 234)">210 MM / HEIGHT</text><text x="146" y="464">Ø 65 MM</text><text x="149" y="12">Ø 28 MM</text><text x="272" y="138">LABEL ZONE</text><text x="272" y="363">RIBBED BASE</text></g>
    </svg>
  );
}