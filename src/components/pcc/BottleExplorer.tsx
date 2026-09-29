import { useRef, useState } from 'react';
import { MoveHorizontal } from 'lucide-react';
import { images } from './content';

export function BottleExplorer() {
  const [angle, setAngle] = useState(0);
  const drag = useRef<{ x: number; angle: number } | null>(null);

  return <div className="relative min-h-[450px] overflow-hidden border border-line-dark bg-ink-soft md:min-h-[600px]">
    <div
      role="slider"
      tabIndex={0}
      aria-label="Explore the bottle from side to side"
      aria-valuemin={-24}
      aria-valuemax={24}
      aria-valuenow={Math.round(angle)}
      className="group absolute inset-0 cursor-grab touch-pan-y outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-soft active:cursor-grabbing"
      onPointerDown={e => { drag.current = { x: e.clientX, angle }; e.currentTarget.setPointerCapture(e.pointerId); }}
      onPointerMove={e => {
        if (drag.current) setAngle(Math.max(-24, Math.min(24, drag.current.angle + (e.clientX - drag.current.x) / 6)));
        else if (e.pointerType === 'mouse') {
          const rect = e.currentTarget.getBoundingClientRect();
          setAngle(((e.clientX - rect.left) / rect.width - .5) * 20);
        }
      }}
      onPointerUp={e => { drag.current = null; if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId); }}
      onPointerCancel={() => { drag.current = null; }}
      onPointerLeave={() => { if (!drag.current) setAngle(0); }}
      onKeyDown={e => { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); setAngle(current => Math.max(-24, Math.min(24, current + (e.key === 'ArrowRight' ? 4 : -4)))); } }}
    >
      <img src={images.bottle} loading="lazy" width={1024} height={1280} draggable={false} alt="Clear Marinate-style bottle with wide label zone, smooth shoulders, ribbed base and black ribbed cap" className="bottle-tilt h-full w-full select-none object-contain" style={{ transform: `perspective(900px) rotateY(${angle}deg) scale(1.05)` }} />
      <span className="pointer-events-none absolute inset-x-0 top-0 flex justify-between p-6 text-[10px] font-bold uppercase tracking-[.18em] text-primary-foreground/60"><span>FORM / FUNCTION</span><span>500 ML</span></span>
      <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-line-dark bg-ink/75 px-6 py-5 text-[10px] font-bold uppercase tracking-widest text-primary-foreground/60"><span>Drag to explore</span><MoveHorizontal size={19} /></span>
    </div>
  </div>;
}