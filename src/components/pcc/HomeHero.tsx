import { Link } from '@tanstack/react-router';
import { ArrowDown, ArrowRight, ArrowLeft, Pause, Play, Droplets, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { pccAssets } from './assets';
import { Eyebrow } from './Site';

const slides = [
  { image: pccAssets.heroSlide01, alt: 'Clear custom-branded water bottle with a black cap', note: 'Hydration / 01' },
  { image: pccAssets.heroSlide02, alt: 'Custom-branded bottled water presented in a restaurant setting', note: 'Hospitality / 02' },
  { image: pccAssets.heroSlide03, alt: 'Branded bottled water on an elegant dining table', note: 'Brand expression / 03' },
];

export function HomeHero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setActive(current => (current + 1) % slides.length), 6800);
    return () => window.clearInterval(timer);
  }, [paused]);
  const move = (direction: number) => setActive(current => (current + direction + slides.length) % slides.length);
  return <section className="hydro-hero relative isolate min-h-[min(850px,calc(100svh-68px))] overflow-hidden bg-ocean-950 text-white lg:min-h-[760px]">
    <div className="hydro-orb hydro-orb-one" aria-hidden="true" /><div className="hydro-orb hydro-orb-two" aria-hidden="true" />
    <div className="absolute inset-0" aria-live="off">{slides.map((slide,index) => <img key={slide.image} src={slide.image} width={1536} height={1024} fetchPriority={index === 0 ? 'high' : 'auto'} loading={index === 0 ? 'eager' : 'lazy'} alt={slide.alt} className={`hero-slide absolute inset-0 h-full w-full object-cover ${index === active ? 'is-active' : ''}`} />)}</div>
    <div className="hero-cinematic-overlay absolute inset-0" />
    <div className="container-pcc relative z-10 grid min-h-[min(850px,calc(100svh-68px))] items-center gap-10 pb-28 pt-16 lg:min-h-[760px] lg:grid-cols-[1fr_.7fr] lg:pb-24">
      <div className="max-w-4xl reveal">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-aqua-300/30 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[.2em] text-aqua-200"><Droplets size={14} /> Pure Custom Creation · Sri Lanka</div>
        <h1 className="display max-w-[11ch] text-[clamp(3.2rem,8.5vw,7.7rem)] uppercase leading-[.9]">PURE<br/>HYDRATION.<br/><span className="text-aqua-300">CREATIVE</span><br/><span className="text-white/70">EXPRESSION.</span></h1>
        <p className="mt-7 max-w-lg text-sm leading-7 text-white/75 md:text-base">Customized bottled drinking water designed to carry your brand, coordinated from bottle and label to filling and supply.</p>
        <div className="mt-8 flex flex-wrap gap-3"><Button asChild variant="brand" size="lg"><Link to="/request-a-quote">Get a Quote <ArrowRight /></Link></Button><Button asChild variant="inverse" size="lg" className="border-white/30 bg-white/10 text-white hover:bg-white/15"><Link to="/how-it-works">See How It Works <ArrowRight /></Link></Button></div>
        <p className="mt-7 text-[10px] font-semibold uppercase tracking-[.17em] text-white/45">Your Brand. Your Bottle.</p>
      </div>
      <div className="relative hidden min-h-[480px] items-center justify-center lg:flex"><div className="hydro-ring hydro-ring-one" /><div className="hydro-ring hydro-ring-two" /><div className="relative z-10 max-w-[470px] rounded-[2rem] border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-sm"><img src={pccAssets.heroSlide01} alt="Customized drinking water bottle" width={720} height={900} className="max-h-[510px] w-full rounded-[1.4rem] object-cover" /><div className="absolute -bottom-5 -left-8 flex items-center gap-3 rounded-2xl border border-white/30 bg-white/90 px-4 py-3 text-ocean-950 shadow-xl"><Sparkles className="text-aqua-700" size={19}/><span className="text-xs font-bold">A clear canvas for your brand</span></div></div></div>
    </div>
    <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/15 bg-ocean-950/55 backdrop-blur-md"><div className="container-pcc flex min-h-16 items-center justify-between gap-4"><span className="hidden text-[10px] font-bold uppercase tracking-[.18em] text-white/65 sm:block">{slides[active].note}</span><div className="flex items-center gap-2" aria-label="Hero slides">{slides.map((slide,index)=><button key={slide.note} type="button" aria-label={`Show slide ${index+1}`} aria-current={index===active} onClick={()=>setActive(index)} className={`h-1.5 transition-[width,background-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua-300 ${index===active?'w-10 bg-aqua-300':'w-5 bg-white/45 hover:bg-white/75'}`} />)}</div><div className="flex items-center gap-1"><Button type="button" variant="iconDark" size="icon" aria-label="Previous slide" onClick={()=>move(-1)}><ArrowLeft /></Button><Button type="button" variant="iconDark" size="icon" aria-label={paused?'Play slideshow':'Pause slideshow'} aria-pressed={paused} onClick={()=>setPaused(value=>!value)}>{paused?<Play/>:<Pause/>}</Button><Button type="button" variant="iconDark" size="icon" aria-label="Next slide" onClick={()=>move(1)}><ArrowRight /></Button><a href="#categories" aria-label="Continue to solutions" className="ml-2 grid size-9 place-items-center"><ArrowDown size={17}/></a></div></div></div>
  </section>;
}
