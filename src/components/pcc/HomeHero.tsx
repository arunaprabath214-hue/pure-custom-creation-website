import { Link } from '@tanstack/react-router';
import { ArrowDown, ArrowLeft, ArrowRight, Pause, Play, Droplets, Sparkles, Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { pccAssets } from './assets';
import { Eyebrow } from './Site';

const slides = [
  { image: pccAssets.heroSlide01, alt: 'Clear customized bottled drinking water', note: 'The bottle / 01' },
  { image: pccAssets.heroSlide02, alt: 'Customized bottled water in a restaurant setting', note: 'Hospitality / 02' },
  { image: pccAssets.heroSlide03, alt: 'Branded bottled water presented on a dining table', note: 'Brand expression / 03' },
];

const capOptions = [
  { name: 'Ocean', hex: '#0b3852' },
  { name: 'Aqua', hex: '#35bdc8' },
  { name: 'Pearl', hex: '#eaf4f5' },
  { name: 'Coral', hex: '#e28d7d' },
];

function BottleShowcase({ capColor }: { capColor: string }) {
  return (
    <svg viewBox="0 0 480 640" role="img" aria-label="Illustrative customized water bottle with a selectable cap colour" className="bottle-float h-full w-full overflow-visible">
      <defs>
        <linearGradient id="pccGlass" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#dffbff" stopOpacity=".18" />
          <stop offset=".18" stopColor="#ffffff" stopOpacity=".78" />
          <stop offset=".42" stopColor="#b7edf4" stopOpacity=".24" />
          <stop offset=".7" stopColor="#ffffff" stopOpacity=".52" />
          <stop offset="1" stopColor="#8bd9e7" stopOpacity=".2" />
        </linearGradient>
        <linearGradient id="pccWater" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#a8f0ef" stopOpacity=".25" />
          <stop offset="1" stopColor="#48b9d0" stopOpacity=".48" />
        </linearGradient>
        <linearGradient id="pccLabel" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e7f7f8" />
        </linearGradient>
        <filter id="pccBottleShadow" x="-50%" y="-30%" width="200%" height="180%">
          <feGaussianBlur stdDeviation="13" />
        </filter>
      </defs>
      <ellipse cx="240" cy="594" rx="112" ry="17" fill="#61d6df" opacity=".22" filter="url(#pccBottleShadow)" />
      <circle cx="240" cy="300" r="188" fill="#8de8ed" opacity=".08" />
      <path d="M193 106 L193 143 C193 164 161 177 145 201 C128 227 125 260 125 303 L125 544 C125 574 147 596 177 596 L303 596 C333 596 355 574 355 544 L355 303 C355 260 352 227 335 201 C319 177 287 164 287 143 L287 106 Z" fill="url(#pccGlass)" stroke="#d9fbff" strokeOpacity=".85" strokeWidth="3" />
      <path d="M132 388 C176 375 204 398 240 388 C278 377 310 376 348 390 L348 544 C348 571 330 589 303 589 L177 589 C150 589 132 571 132 544 Z" fill="url(#pccWater)" opacity=".78" />
      <path d="M133 389 C174 376 205 398 240 388 C279 377 311 378 347 390" fill="none" stroke="#d8ffff" strokeOpacity=".75" strokeWidth="3" />
      <path d="M151 220 C163 194 185 182 201 165 L201 143 L279 143 L279 165 C295 182 317 194 329 220" fill="none" stroke="#ffffff" strokeOpacity=".45" strokeWidth="3" />
      <path d="M155 237 L155 531 C155 551 166 566 183 570" fill="none" stroke="#ffffff" strokeOpacity=".72" strokeWidth="8" strokeLinecap="round" />
      <path d="M325 240 L325 533" fill="none" stroke="#ffffff" strokeOpacity=".34" strokeWidth="4" strokeLinecap="round" />
      <rect x="190" y="48" width="100" height="59" rx="10" fill={capColor} stroke="#ffffff" strokeOpacity=".8" strokeWidth="3" />
      {Array.from({ length: 11 }, (_, index) => <path key={index} d={`M${198 + index * 8} 56 V99`} stroke="#ffffff" strokeOpacity=".23" strokeWidth="2" />)}
      <rect x="194" y="103" width="92" height="11" rx="4" fill={capColor} stroke="#ffffff" strokeOpacity=".45" />
      <rect x="144" y="284" width="192" height="190" rx="13" fill="url(#pccLabel)" stroke="#ffffff" strokeWidth="2" />
      <path d="M164 308 H316" stroke="#8ad9df" strokeWidth="2" />
      <circle cx="240" cy="344" r="17" fill="#0c6077" />
      <path d="M232 344 C235 336 245 336 248 344 C245 352 235 352 232 344 Z" fill="#dffbff" />
      <text x="240" y="388" fill="#0b3852" textAnchor="middle" fontSize="14" fontWeight="700" letterSpacing="3">YOUR BRAND</text>
      <text x="240" y="411" fill="#397b8d" textAnchor="middle" fontSize="8" fontWeight="600" letterSpacing="2.2">CUSTOM BOTTLED WATER</text>
      <path d="M180 438 H300" stroke="#b7dfe5" strokeWidth="1.5" />
      <text x="240" y="456" fill="#397b8d" textAnchor="middle" fontSize="8" letterSpacing="2">PURE · PERSONAL · PRESENTED</text>
      <path d="M174 592 Q240 609 306 592" fill="none" stroke="#ffffff" strokeOpacity=".7" strokeWidth="3" />
    </svg>
  );
}

export function HomeHero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [capColor, setCapColor] = useState(capOptions[0].hex);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 6800);
    return () => window.clearInterval(timer);
  }, [paused]);

  const move = (direction: number) => setActive((current) => (current + direction + slides.length) % slides.length);

  return (
    <section className="hydro-hero relative isolate min-h-[min(900px,calc(100svh-68px))] overflow-hidden text-white lg:min-h-[790px]">
      <div className="hydro-orb hydro-orb-one" aria-hidden="true" />
      <div className="hydro-orb hydro-orb-two" aria-hidden="true" />
      <div className="absolute inset-0" aria-live="off">
        {slides.map((slide, index) => (
          <img key={slide.image} src={slide.image} width={1536} height={1024} fetchPriority={index === 0 ? 'high' : 'auto'} loading={index === 0 ? 'eager' : 'lazy'} alt={slide.alt} className={`hero-slide absolute inset-0 h-full w-full object-cover ${index === active ? 'is-active' : ''}`} />
        ))}
      </div>
      <div className="hero-cinematic-overlay absolute inset-0" />
      <div className="container-pcc relative z-10 grid min-h-[min(900px,calc(100svh-68px))] items-center gap-7 pb-24 pt-12 sm:gap-10 sm:pt-16 lg:min-h-[790px] lg:grid-cols-[1fr_.78fr] lg:gap-8 lg:pb-24">
        <div className="max-w-4xl reveal">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-aqua-300/30 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[.2em] text-aqua-200 backdrop-blur-xl sm:mb-6"><Droplets size={14} /> Pure Custom Creation · Sri Lanka</div>
          <h1 className="display max-w-[11ch] text-[clamp(3.1rem,8.2vw,7.7rem)] uppercase leading-[.9]">PURE<br />HYDRATION.<br /><span className="text-aqua-300">CREATIVE</span><br /><span className="text-white/70">EXPRESSION.</span></h1>
          <p className="mt-6 max-w-lg text-sm leading-7 text-white/75 md:mt-7 md:text-base">Customized bottled drinking water designed to carry your brand, coordinated from bottle and label to filling and supply.</p>
          <div className="mt-7 flex flex-wrap gap-3"><Button asChild variant="brand" size="lg" className="rounded-full"><Link to="/request-a-quote">Get a Quote <ArrowRight /></Link></Button><Button asChild variant="inverse" size="lg" className="rounded-full border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white/15"><Link to="/how-it-works">See How It Works <ArrowRight /></Link></Button></div>
          <p className="mt-6 text-[10px] font-semibold uppercase tracking-[.17em] text-white/45">Your Brand. Your Bottle.</p>
        </div>

        <div className="relative mx-auto flex w-full max-w-[440px] flex-col items-center justify-center lg:max-w-[500px]">
          <div className="hydro-ring hydro-ring-one" aria-hidden="true" />
          <div className="hydro-ring hydro-ring-two" aria-hidden="true" />
          <div className="relative z-10 w-full rounded-[2rem] border border-white/25 bg-white/[.10] p-3 shadow-[0_25px_90px_rgba(0,0,0,.25)] backdrop-blur-xl sm:p-5">
            <div className="relative mx-auto aspect-[4/4.5] max-h-[440px] w-full overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-white/[.16] via-aqua-300/[.08] to-white/[.03]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(146,239,240,.24),transparent_65%)]" />
              <div className="absolute inset-x-0 top-5 flex justify-between px-5 text-[9px] font-bold uppercase tracking-[.18em] text-white/45"><span>PCC / FORM STUDY</span><span>01 — 04</span></div>
              <div className="absolute inset-4 bottom-2"><BottleShowcase capColor={capColor} /></div>
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/20 bg-white/85 px-3 py-2 text-[9px] font-bold uppercase tracking-widest text-ocean-950 shadow-lg"><Sparkles size={13} className="text-aqua-700" /> A canvas for your brand</div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 px-2 pb-1 pt-4 sm:px-1">
              <div><p className="text-[9px] font-bold uppercase tracking-[.18em] text-white/55">Choose a cap finish</p><p className="mt-1 text-xs font-semibold text-white">{capOptions.find((option) => option.hex === capColor)?.name} · Preview</p></div>
              <div className="flex items-center gap-2" role="group" aria-label="Bottle cap colour">
                {capOptions.map((option) => <button key={option.name} type="button" aria-label={`${option.name} cap colour`} aria-pressed={capColor === option.hex} onClick={() => setCapColor(option.hex)} className={`grid size-8 place-items-center rounded-full border transition ${capColor === option.hex ? 'scale-110 border-white ring-2 ring-aqua-300 ring-offset-2 ring-offset-ocean-950' : 'border-white/35 hover:scale-105'}`} style={{ backgroundColor: option.hex }}>{capColor === option.hex && <Check size={14} className={option.name === 'Pearl' ? 'text-ocean-950' : 'text-white'} />}</button>)}
              </div>
            </div>
          </div>
          <div className="mt-4 flex w-full items-center justify-between px-2 text-[9px] font-bold uppercase tracking-[.17em] text-white/40"><span>Interactive cap preview</span><span>Illustrative concept · Not a final spec</span></div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/15 bg-ocean-950/55 backdrop-blur-md">
        <div className="container-pcc flex min-h-16 items-center justify-between gap-4">
          <span className="hidden text-[10px] font-bold uppercase tracking-[.18em] text-white/65 sm:block">{slides[active].note}</span>
          <div className="flex items-center gap-2" aria-label="Hero slides">
            {slides.map((slide, index) => <button key={slide.note} type="button" aria-label={`Show slide ${index + 1}`} aria-current={index === active} onClick={() => setActive(index)} className={`h-1.5 transition-[width,background-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua-300 ${index === active ? 'w-10 bg-aqua-300' : 'w-5 bg-white/45 hover:bg-white/75'}`} />)}
          </div>
          <div className="flex items-center gap-1">
            <Button type="button" variant="iconDark" size="icon" aria-label="Previous slide" onClick={() => move(-1)}><ArrowLeft /></Button>
            <Button type="button" variant="iconDark" size="icon" aria-label={paused ? 'Play slideshow' : 'Pause slideshow'} aria-pressed={paused} onClick={() => setPaused((value) => !value)}>{paused ? <Play /> : <Pause />}</Button>
            <Button type="button" variant="iconDark" size="icon" aria-label="Next slide" onClick={() => move(1)}><ArrowRight /></Button>
            <a href="#categories" aria-label="Continue to solutions" className="ml-2 grid size-9 place-items-center"><ArrowDown size={17} /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
