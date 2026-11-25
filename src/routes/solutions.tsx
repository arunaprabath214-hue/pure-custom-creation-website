import { createFileRoute } from '@tanstack/react-router';
import { PageHero, PhotoCTA, SectionTitle } from '@/components/pcc/Site';
import { images, solutions } from '@/components/pcc/content';
import { ArrowRight, Droplets, Palette, Boxes, Truck } from 'lucide-react';
import { Link } from '@tanstack/react-router';

const icons = [Droplets, Palette, Boxes, Truck];
export const Route = createFileRoute('/solutions')({ head: () => ({ meta: [
  { title: 'Customized Water Solutions | Pure Custom Creation' },
  { name: 'description', content: 'Customized bottled drinking water, label design coordination and supplier-managed fulfilment in Sri Lanka.' }
] }), component: Solutions });
function Solutions() { return <><PageHero eyebrow="WHAT PCC COORDINATES" title="CUSTOM WATER. YOUR IDENTITY." description="A considered bottled water solution, coordinated from bottle and label to filling and supply." image={images.restaurant}/><section className="container-pcc py-20 md:py-28"><SectionTitle eyebrow="OUR SOLUTIONS" title="THE DETAILS, CONNECTED." description="PCC works with specialist suppliers to coordinate every stage of your customized bottled water order."/><div className="grid gap-5 md:grid-cols-2">{solutions.map((item,index)=>{const Icon=icons[index];return <article key={item.title} className="overflow-hidden rounded-2xl border border-aqua-100 bg-white"><div className="aspect-[16/9] overflow-hidden bg-aqua-50"><img src={item.image} loading="lazy" width={1400} height={900} alt={item.title} className="image-cover"/></div><div className="p-6 md:p-8"><span className="grid size-11 place-items-center rounded-xl bg-aqua-100 text-aqua-800"><Icon size={21}/></span><h2 className="mt-5 font-display text-2xl font-bold text-ocean-950">{item.title}</h2><p className="mt-3 text-sm leading-7 text-ocean-800/65">{item.detail}</p><Link to="/request-a-quote" className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ocean-800">Request a quote <ArrowRight size={16}/></Link></div></article>})}</div><p className="mt-7 text-xs text-ocean-800/55">Manufacturing, label printing and filling are undertaken by external supply partners. PCC coordinates the customer brief and order fulfilment.</p></section><PhotoCTA/></>; }
