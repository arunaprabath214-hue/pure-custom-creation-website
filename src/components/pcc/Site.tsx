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
      if (event.key === 'Escape') {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => { document.body.style.overflow = previous; window.removeEventListener('keydown', onKeyDown); };
  }, [open]);
  return <>
    <header className="sticky top-0 z-50 border-b border-line-dark bg-ink text-primary-foreground">
      <div className="container-pcc flex h-[68px] items-center justify-between gap-4 lg:h-[76px]">
        <Brand light />
        <nav aria-label="Main navigation" className="hidden items-center gap-5 xl:gap-7 lg:flex">{nav.map(([label, path]) => <Link key={path} to={path} className={`text-[11px] font-semibold transition-colors hover:text-red-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-soft ${pathname === path ? 'text-red-soft' : 'text-primary-foreground/75'}`}>{label}</Link>)}</nav>
        <div className="flex items-center gap-2"><Button asChild variant="brand" size="sm" className="hidden sm:inline-flex"><Link to="/request-a-quote">Get a Quote <ArrowRight /></Link></Button><Button ref={menuButton} variant="iconDark" size="icon" className="lg:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button></div>
      </div>
      {open && <nav id="mobile-navigation" aria-label="Mobile navigation" className="max-h-[calc(100svh-68px)] overflow-y-auto border-t border-line-dark bg-ink px-5 py-4 lg:hidden">{nav.map(([label, path]) => <Link key={path} to={path} onClick={() => setOpen(false)} className="block border-b border-line-dark py-3 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-soft">{label}</Link>)}<Link to="/request-a-quote" onClick={() => setOpen(false)} className="mt-4 block py-3 text-sm font-bold text-red-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-soft">Get a Quote →</Link></nav>}
    </header>
    <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-primary px-3.5 py-2.5 text-[13px] font-bold text-primary-foreground shadow-lg md:hidden" aria-label="Chat with PCC on WhatsApp"><MessageCircle size={18} /> WhatsApp</a>
  </>;
}

export function Footer() {
  return <footer className="bg-ink text-primary-foreground"><div className="container-pcc grid gap-12 border-b border-line-dark py-16 md:grid-cols-[1.7fr_1fr_1.35fr] md:py-20"><div><Brand light /><p className="mt-8 max-w-xs text-sm leading-7 text-primary-foreground/65">Custom branded bottled water and hospitality branding.<br />Sri Lanka.</p></div><div><p className="eyebrow mb-5 text-primary-foreground/60">Explore</p><div className="grid gap-3 text-sm"><Link to="/about">Why We Do Branding?</Link><Link to="/solutions">Solutions</Link><Link to="/how-it-works">How It Works</Link><Link to="/contact">Partnerships</Link><Link to="/contact">Suppliers</Link><Link to="/contact">Complaints &amp; Feedback</Link><Link to="/privacy">Privacy Policy</Link></div></div><div><p className="eyebrow mb-5 text-primary-foreground/60">Contact</p><div className="grid gap-4 text-sm"><a href={`tel:${phone.replace(/\s/g, "")}`} className="flex items-center gap-3"><span className="text-red-soft">☎</span> Call · {phone}</a><a href={whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3"><MessageCircle size={16} className="text-red-soft" /> WhatsApp · {phone}</a><a href={`mailto:${email}`} className="flex items-center gap-3 break-all"><Mail size={16} className="shrink-0 text-red-soft" /> {email}</a></div><p className="eyebrow mb-5 mt-8 text-primary-foreground/60">Follow Us</p><div className="flex items-center gap-3"><a href="https://www.facebook.com/share/19rN3fYNjm/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Pure Custom Creation on Facebook" className="inline-flex size-10 items-center justify-center rounded-full border border-line-dark transition-colors hover:border-red-soft hover:text-red-soft"><Facebook size={17} /></a><a href="https://www.instagram.com/pure_custom_creation/" target="_blank" rel="noopener noreferrer" aria-label="Pure Custom Creation on Instagram" className="inline-flex size-10 items-center justify-center rounded-full border border-line-dark transition-colors hover:border-red-soft hover:text-red-soft"><Instagram size={17} /></a><a href="https://www.tiktok.com/@pure.custom.creation" target="_blank" rel="noopener noreferrer" aria-label="Pure Custom Creation on TikTok" className="inline-flex size-10 items-center justify-center rounded-full border border-line-dark transition-colors hover:border-red-soft hover:text-red-soft"><Music2 size={17} /></a><a href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Pure Custom Creation on WhatsApp" className="inline-flex size-10 items-center justify-center rounded-full border border-line-dark transition-colors hover:border-red-soft hover:text-red-soft"><MessageCircle size={17} /></a></div></div></div><div className="container-pcc flex flex-wrap items-center justify-between gap-3 py-6 text-[11px] text-primary-foreground/65"><span>© {new Date().getFullYear()} Pure Custom Creation. All rights reserved.</span><span>Made for the moments that matter.</span></div></footer>;
}
export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) { return <p className={`eyebrow flex items-center gap-3 ${light ? 'text-red-soft' : 'text-primary'}`}><span className="h-px w-5 bg-current" />{children}</p>; }
export function SectionTitle({ eyebrow, title, light = false, description }: { eyebrow: string; title: string; light?: boolean; description?: string }) { return <div className="mb-10 md:mb-14"><Eyebrow light={light}>{eyebrow}</Eyebrow><h2 className="display mt-5 max-w-4xl text-[clamp(2.5rem,5vw,5.25rem)] uppercase">{title}</h2>{description && <p className={`mt-6 max-w-xl text-sm leading-7 md:text-base ${light ? 'text-primary-foreground/55' : 'text-muted-foreground'}`}>{description}</p>}</div>; }
export function PhotoCTA() { return <div className="relative isolate min-h-[440px] overflow-hidden bg-ink md:min-h-[560px]"><CTAImage /><div className="photo-overlay absolute inset-0 z-0" /><div className="container-pcc relative z-10 flex min-h-[440px] flex-col justify-center py-16 text-primary-foreground md:min-h-[560px]"><Eyebrow light>LET'S MAKE IT YOURS</Eyebrow><h2 className="display mt-6 max-w-2xl text-[clamp(3rem,6vw,6.5rem)] uppercase">YOUR BRAND<br />BELONGS HERE.</h2><p className="mt-6 max-w-sm text-sm leading-7 text-primary-foreground/70">Tell us what you have in mind. We’ll take it from there.</p><Button asChild variant="brand" size="lg" className="mt-8 w-fit"><Link to="/request-a-quote">Request a Quote <ArrowRight /></Link></Button></div></div>; }
import { images } from './content';
function CTAImage() { return <img src={images.table} loading="lazy" width={1200} height={900} alt="Pure Custom Creation branded bottle on a hospitality table" className="absolute inset-0 h-full w-full object-cover" />; }
export function PageHero({ eyebrow, title, description, image = images.restaurant }: { eyebrow: string; title: string; description: string; image?: string }) { return <section className="relative isolate min-h-[390px] overflow-hidden bg-ink text-primary-foreground md:min-h-[520px]"><img src={image} width={1200} height={900} fetchPriority="high" alt="" className="absolute inset-0 h-full w-full object-cover opacity-65" /><div className="photo-overlay absolute inset-0 z-0" /><div className="container-pcc relative flex min-h-[390px] flex-col justify-center py-16 md:min-h-[520px]"><Eyebrow light>{eyebrow}</Eyebrow><h1 className="display mt-6 max-w-4xl text-[clamp(3.5rem,8vw,8rem)] uppercase">{title}</h1><p className="mt-6 max-w-lg text-sm leading-7 text-primary-foreground/75 md:text-base">{description}</p></div></section>; }
export function BackToTop() { return <a href="#top" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest">Back to top <ArrowDown className="size-4 rotate-180" /></a>; }