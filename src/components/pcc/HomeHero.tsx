import { Link } from '@tanstack/react-router';
import { ArrowDown, ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { pccAssets } from './assets';
import { Eyebrow } from './Site';

const slides = [
  { image: pccAssets.heroSlide01, alt: 'Clear custom-branded water bottle with a black cap', note: 'The bottle / 01' },
  { image: pccAssets.heroSlide02, alt: 'Custom-branded bottled water presented in a restaurant setting', note: 'Hospitality / 02' },
  { image: pccAssets.heroSlide03, alt: 'Branded bottled water on an elegant dining table', note: 'Brand experience / 03' },
];

export function HomeHero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setActive(current => (current + 1) % slides.length), 6500);
    return () => window.clearInterval(timer);
  }, [paused]);

  const move = (direction: number) => setActive(current => (current + direction + slides.length) % slides.length);

  return <section className="relative isolate min-h-[calc(100svh-68px)] overflow-hidden bg-ink text-primary-foreground sm:min-h-[680px] lg:min-h-[720px]">
    <div className="absolute inset-0" aria-live="off">
      {slides.map((slide, index) => <img key={slide.image} src={slide.image} width={1536} height={1024} fetchPriority={index === 0 ? 'high' : 'auto'} loading={index === 0 ? 'eager' : 'lazy'} alt={slide.alt} className={`hero-slide absolute inset-0 h-full w-full object-cover ${index === active ? 'is-active' : ''}`} />)}
    </div>
    <div className="hero-cinematic-overlay absolute inset-0" />
    <div className="container-pcc relative z-10 flex min-h-[calc(100svh-68px)] flex-col justify-center pb-28 pt-16 sm:min-h-[680px] lg:min-h-[720px]">
      <div className="max-w-4xl reveal">
        <Eyebrow light>Custom branded water · Sri Lanka</Eyebrow>
        <h1 className="display mt-6 max-w-[10ch] text-[clamp(3.15rem,9vw,8rem)] uppercase sm:mt-7">YOUR BRAND.<br /><span className="text-red-soft">EVERY TABLE.</span></h1>
        <p className="mt-6 max-w-md text-sm leading-7 text-primary-foreground/75 md:text-base">Custom branded bottled water, shaped around the experience your business wants to create.</p>
        <div className="mt-8 flex flex-wrap gap-3"><Button asChild variant="brand" size="lg"><Link to="/request-a-quote">Get a Quote <ArrowRight /></Link></Button><Button asChild variant="inverse" size="lg"><Link to="/our-work">View Our Work <ArrowRight /></Link></Button></div>
      </div>
    </div>
    <div className="absolute inset-x-0 bottom-0 z-20 border-t border-line-dark/80 bg-ink/45 backdrop-blur-sm">
      <div className="container-pcc flex min-h-16 items-center justify-between gap-4">
        <span className="hidden text-[10px] font-bold uppercase tracking-[.18em] text-primary-foreground/65 sm:block">{slides[active].note}</span>
        <div className="flex items-center gap-2" aria-label="Hero slides">{slides.map((slide, index) => <button key={slide.note} type="button" aria-label={`Show slide ${index + 1}`} aria-current={index === active} onClick={() => setActive(index)} className={`h-1.5 transition-[width,background-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-soft ${index === active ? 'w-10 bg-red-soft' : 'w-5 bg-primary-foreground/45 hover:bg-primary-foreground/75'}`} />)}</div>
        <div className="flex items-center gap-1"><Button type="button" variant="iconDark" size="icon" aria-label="Previous slide" onClick={() => move(-1)}><ArrowLeft /></Button><Button type="button" variant="iconDark" size="icon" aria-label={paused ? 'Play slideshow' : 'Pause slideshow'} aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? <Play /> : <Pause />}</Button><Button type="button" variant="iconDark" size="icon" aria-label="Next slide" onClick={() => move(1)}><ArrowRight /></Button><a href="#categories" aria-label="Continue to hospitality categories" className="ml-2 grid size-9 place-items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-soft"><ArrowDown size={17} /></a></div>
      </div>
    </div>
  </section>;
}