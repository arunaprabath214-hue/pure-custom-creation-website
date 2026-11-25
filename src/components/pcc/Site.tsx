import { Link, useRouterState } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, Menu, X, MessageCircle, Mail, Facebook, Instagram, Music2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { email, phone, whatsapp } from './content';
import { pccAssets } from './assets';

const nav = [
  ['Home', '/'], ['Custom Water', '/custom-water'], ['Solutions', '/solutions'], ['Industries', '/industries'], ['Our Work', '/our-work'], ['How It Works', '/how-it-works'], ['About', '/about'], ['Contact', '/contact'],
] as const;

export function Brand({ light = false }: { light?: boolean }) {
  return <Link to="/" className="inline-flex shrink-0 items-center" aria-label="Pure Custom Creation home">
    <img src={pccAssets.pccLogoFull ?? ''} alt="Pure Custom Creation" width={356} height={65} className={`h-auto w-[150px] sm:w-[175px] ${light ? '' : 'invert'}`} />
  </Link>;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const pathname = useRouterState({ select: s => s.location.pathname });
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); menuButton.current?.focus(); }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => { document.body.style.overflow = previous; window.removeEventListener('keydown', onKeyDown); };
  }, [open]);
  return <>
    <header className="sticky top-0 z-50 border-b border-ocean-800/70 bg-ocean-950/95 text-white backdrop-blur-xl">
      <div className="container-pcc flex h-[68px] items-center justify-between gap-4 lg:h-[76px]">
        <Brand light />
        <nav aria-label="Main navigation" className="hidden items-center gap-4 xl:gap-6 lg:flex">{nav.map(([label, path]) => <Link key={path} to={path} className={`text-[11px] font-semibold transition-colors hover:text-aqua-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua-300 ${pathname === path ? 'text-aqua-300' : 'text-white/75'}`}>{label}</Link>)}</nav>
        <div className="flex items-center gap-2"><Button asChild variant="brand" size="sm" className="hidden sm:inline-flex"><Link to="/request-a-quote">Get a Quote <ArrowRight /></Link></Button><Button ref={menuButton} variant="iconDark" size="icon" className="lg:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button></div>
      </div>
      {open && <nav id="mobile-navigation" aria-label="Mobile navigation" className="max-h-[calc(100svh-68px)] overflow-y-auto border-t border-ocean-800 bg-ocean-950 px-5 py-4 lg:hidden">{nav.map(([label, path]) => <Link key={path} to={path} onClick={() => setOpen(false)} className="block border-b border-ocean-800 py-3 text-sm font-medium text-white/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua-300">{label}</Link>)}<Link to="/request-a-quote" onClick={() => setOpen(false)} className="mt-4 block rounded-full bg-aqua-300 px-5 py-3 text-center text-sm font-bold text-ocean-950">Get a Quote <ArrowRight className="ml-2 inline size-4" /></Link></nav>}
    </header>
    <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-ocean-900 px-4 py-3 text-[13px] font-bold text-white shadow-lg ring-1 ring-aqua-300/30 md:hidden" aria-label="Chat with PCC on WhatsApp"><MessageCircle size={18} /> WhatsApp</a>
  </>;
}

export function Footer() {
  return <footer className="bg-ocean-950 text-white"><div className="container-pcc grid gap-12 border-b border-white/10 py-16 md:grid-cols-[1.7fr_1fr_1.35fr] md:py-20"><div><Brand light /><p className="mt-8 max-w-xs text-sm leading-7 text-white/60">Customized bottled drinking water, coordinated around your brand.<br />Sri Lanka.</p><p className="mt-5 text-xs font-semibold uppercase tracking-[.16em] text-aqua-300">Pure hydration. Creative expression.</p></div><div><p className="eyebrow mb-5 text-white/55">Explore</p><div className="grid gap-3 text-sm text-white/75"><Link to="/custom-water">Custom Water</Link><Link to="/solutions">Solutions</Link><Link to="/how-it-works">Our Process</Link><Link to="/about">About PCC</Link><Link to="/our-work">Creative Showcase</Link><Link to="/contact">Contact</Link></div></div><div><p className="eyebrow mb-5 text-white/55">Contact</p><div className="grid gap-4 text-sm text-white/75"><a href={`tel:${phone.replace(/\s/g, "")}`} className="flex items-center gap-3"><span className="text-aqua-300">☎</span> Call · {phone}</a><a href={whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3"><MessageCircle size={16} className="text-aqua-300" /> WhatsApp · {phone}</a><a href={`mailto:${email}`} className="flex items-center gap-3 break-all"><Mail size={16} className="shrink-0 text-aqua-300" /> {email}</a></div><p className="eyebrow mb-5 mt-8 text-white/55">Follow Us</p><div className="flex items-center gap-3">{[[Facebook,'Facebook','https://www.facebook.com/share/19rN3fYNjm/?mibextid=wwXIfr'],[Instagram,'Instagram','https://www.instagram.com/pure_custom_creation/'],[Music2,'TikTok','https://www.tiktok.com/@pure.custom.creation'],[MessageCircle,'WhatsApp',whatsapp]].map(([Icon,label,url]) => <a key={label as string} href={url as string} target="_blank" rel="noopener noreferrer" aria-label={`PCC on ${label as string}`} className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-aqua-300 hover:text-aqua-300"><Icon size={17} /></a>)}</div></div></div><div className="container-pcc flex flex-wrap items-center justify-between gap-3 py-6 text-[11px] text-white/55"><span>© {new Date().getFullYear()} Pure Custom Creation. All rights reserved.</span><span>Your Brand. Your Bottle.</span></div></footer>;
}

export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) { return <p className={`eyebrow flex items-center gap-3 ${light ? 'text-aqua-300' : 'text-ocean-700'}`}><span className="h-px w-7 bg-current" />{children}</p>; }
export function SectionTitle({ eyebrow, title, light = false, description }: { eyebrow: string; title: string; light?: boolean; description?: string }) { return <div className="mb-10 md:mb-14"><Eyebrow light={light}>{eyebrow}</Eyebrow><h2 className={`display mt-5 max-w-4xl text-[clamp(2.5rem,5vw,5.25rem)] uppercase ${light ? 'text-white' : 'text-ocean-950'}`}>{title}</h2>{description && <p className={`mt-6 max-w-xl text-sm leading-7 md:text-base ${light ? 'text-white/65' : 'text-ocean-800/70'}`}>{description}</p>}</div>; }
export function PhotoCTA() { return <section className="relative isolate min-h-[470px] overflow-hidden bg-ocean-950 md:min-h-[590px]"><CTAImage /><div className="absolute inset-0 bg-gradient-to-r from-ocean-950/95 via-ocean-950/75 to-ocean-950/15" /><div className="container-pcc relative z-10 flex min-h-[470px] flex-col justify-center py-16 text-white md:min-h-[590px]"><Eyebrow light>YOUR NEXT BOTTLE STARTS HERE</Eyebrow><h2 className="display mt-6 max-w-3xl text-[clamp(3rem,6.3vw,6.5rem)] uppercase">LET'S PUT YOUR BRAND IN EVERY BOTTLE.</h2><p className="mt-6 max-w-sm text-sm leading-7 text-white/70">Tell us about your business, quantity and preferred bottle presentation.</p><Button asChild variant="brand" size="lg" className="mt-8 w-fit"><Link to="/request-a-quote">Start Your Project <ArrowRight /></Link></Button></div></section>; }
import { images } from './content';
function CTAImage() { return <img src={images.table} loading="lazy" width={1200} height={900} alt="Customized bottled water presented for a hospitality brand" className="absolute inset-0 h-full w-full object-cover opacity-70" />; }
export function PageHero({ eyebrow, title, description, image = images.restaurant }: { eyebrow: string; title: string; description: string; image?: string }) { return <section className="relative isolate min-h-[360px] overflow-hidden bg-ocean-950 text-white md:min-h-[500px]"><img src={image} width={1200} height={900} fetchPriority="high" alt="" className="absolute inset-0 h-full w-full object-cover opacity-45" /><div className="absolute inset-0 bg-gradient-to-r from-ocean-950/95 via-ocean-950/70 to-ocean-950/30" /><div className="container-pcc relative flex min-h-[360px] flex-col justify-center py-16 md:min-h-[500px]"><Eyebrow light>{eyebrow}</Eyebrow><h1 className="display mt-6 max-w-4xl text-[clamp(3.25rem,8vw,7.5rem)] uppercase">{title}</h1><p className="mt-6 max-w-lg text-sm leading-7 text-white/75 md:text-base">{description}</p></div></section>; }
export function BackToTop() { return <a href="#top" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest">Back to top <ArrowDown className="size-4 rotate-180" /></a>; }
