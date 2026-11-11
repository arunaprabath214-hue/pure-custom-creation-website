import { createFileRoute } from '@tanstack/react-router';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHero, PhotoCTA, SectionTitle } from '@/components/pcc/Site';
import { images, process } from '@/components/pcc/content';
import { Link } from '@tanstack/react-router';
export const Route = createFileRoute('/how-it-works')({ head: () => ({ meta: [
  { title: 'Our Process | Pure Custom Creation' },
  { name: 'description', content: 'See how PCC coordinates bottle sourcing, custom label printing, water filling and supply.' }
] }), component: Process });
function Process() { return <><PageHero eyebrow="THE PCC PROCESS" title="FROM BRIEF TO BOTTLE." description="One coordinated journey, delivered through specialist supply partners." image={images.range}/><section className="container-pcc py-20 md:py-28"><SectionTitle eyebrow="FOUR CONNECTED STAGES" title="HOW YOUR ORDER COMES TOGETHER."/><div className="grid gap-4 md:grid-cols-2">{process.map(([number,title,detail],index)=><article key={number} className="relative rounded-2xl border border-aqua-100 bg-white p-7 md:p-9"><div className="flex items-center justify-between"><span className="font-mono text-4xl text-aqua-700">{number}</span>{index<3&&<ArrowDown className="text-aqua-500 md:hidden"/>}<span className="hidden rounded-full bg-aqua-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-aqua-800 md:inline">Stage {number}</span></div><h2 className="mt-8 font-display text-2xl font-bold text-ocean-950">{title}</h2><p className="mt-3 max-w-lg text-sm leading-7 text-ocean-800/65">{detail}</p></article>)}</div><div className="mt-8 rounded-2xl bg-ocean-950 p-7 text-white md:p-9"><p className="eyebrow text-aqua-300">PCC'S ROLE</p><p className="mt-3 max-w-3xl text-sm leading-7 text-white/70">PCC is your customer-facing point of contact and coordinates the supplier network. Bottle manufacturing, label printing and water filling are handled by the respective external partners.</p></div><Button asChild variant="brand" size="lg" className="mt-10"><Link to="/request-a-quote">Start Your Project</Link></Button></section><PhotoCTA/></>; }
