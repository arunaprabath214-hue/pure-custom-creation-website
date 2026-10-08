import { createFileRoute, Link } from '@tanstack/react-router';
import { useState, type FormEvent } from 'react';
import { ArrowRight, Check, Upload, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Eyebrow } from '@/components/pcc/Site';
import { email, phone, whatsapp } from '@/components/pcc/content';
import { supabase } from '@/lib/supabase';
export const Route = createFileRoute('/request-a-quote')({ head: () => ({ meta: [{ title: 'Request a Quote | Pure Custom Creation' }, { name: 'description', content: 'Request a custom branded bottled water quote from PCC in Sri Lanka. Tell us about your business, bottle size and quantity.' }, { property: 'og:title', content: 'Request a Quote | Pure Custom Creation' }, { property: 'og:description', content: 'Tell us about your brand and get started with custom branded water.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }), component: Quote });
const field = 'w-full min-h-12 rounded-sm border border-input bg-background px-4 py-3 text-base outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/70';
function Quote() {
  const [sent, setSent] = useState(false);
  const [url, setUrl] = useState(whatsapp);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState('');
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity() || fileError) return;
    const data = new FormData(form);
    if (String(data.get('website') || '').trim()) return;
    const get = (key: string) => String(data.get(key) || '').trim();
    const lines = ['Hello PCC, I would like a quote for custom branded water.', '', `Business: ${get('business')}`, `Contact: ${get('person')}`, `WhatsApp: ${get('phone')}`, `Business type: ${get('type')}`, `Bottle size: ${get('size')}`, `Estimated quantity: ${get('quantity')}`, `Message: ${get('message') || '—'}`];
    if (file) lines.push(`Logo file to share: ${file.name} (please attach it in this chat)`);
    const payload = {
      business_name: get('business'),
      contact_person: get('person'),
      phone: get('phone'),
      business_type: get('type'),
      bottle_size: get('size'),
      estimated_quantity: Number(get('quantity')),
      message: get('message') || null,
      logo_file_name: file?.name || null,
      source: 'website',
    };
    const { error } = await supabase.from('quote_requests').insert(payload);
    if (error) {
      console.error('Quote request save failed:', error);
      setFileError('We could not save your enquiry online. Please continue on WhatsApp so the PCC team still receives your request.');
    }
    setUrl(whatsapp + '?text=' + encodeURIComponent(lines.join('\n')));
    setSent(true);
  }
  return <section className="bg-paper py-16 md:py-24"><div className="container-pcc grid min-w-0 grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:gap-20"><div className="min-w-0 lg:sticky lg:top-32 lg:self-start"><Eyebrow>START YOUR PROJECT</Eyebrow><h1 className="display mt-7 text-[clamp(3.5rem,6vw,6rem)] uppercase">LET'S MAKE IT YOURS.</h1><p className="mt-7 max-w-sm text-sm leading-7 text-muted-foreground">Share a few details and continue your enquiry with our team on WhatsApp.</p><div className="mt-10 border-t border-border pt-6 text-sm"><p className="font-bold">Prefer to talk?</p><a href={whatsapp} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 text-primary"><MessageCircle size={18} /> {phone}</a></div></div><div className="min-w-0 bg-card p-6 md:p-10 lg:p-12">{sent ? <div role="status" className="flex min-h-[470px] flex-col items-start justify-center"><span className="grid size-14 place-items-center rounded-full bg-accent text-primary"><Check size={26} /></span><h2 className="display mt-8 text-4xl uppercase">READY TO SEND.</h2><p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">Your details are ready. Open WhatsApp to send them to PCC. If you selected a logo, attach it in the chat—the file cannot transfer automatically.</p><Button asChild variant="brand" size="lg" className="mt-8"><a href={url} target="_blank" rel="noopener noreferrer">Continue on WhatsApp <ArrowRight /></a></Button><Button variant="link" onClick={() => setSent(false)} className="mt-5 px-0">Edit your details</Button></div> : <form onSubmit={submit} className="min-w-0 space-y-6"><div><p className="font-display text-2xl font-bold">Tell us about your brand.</p><p className="mt-2 text-xs text-muted-foreground">Fields marked * are required.</p></div><div className="grid gap-5 sm:grid-cols-2"><label aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden"><span>Website</span><input tabIndex={-1} autoComplete="off" name="website" /></label><label className="block text-xs font-bold">Business name *<input required name="business" autoComplete="organization" className={`${field} mt-2`} placeholder="Your business name" /></label><label className="block text-xs font-bold">Contact person *<input required name="person" autoComplete="name" className={`${field} mt-2`} placeholder="Your name" /></label></div><label className="block text-xs font-bold">WhatsApp number *<input required name="phone" type="tel" autoComplete="tel" minLength={9} title="Enter a valid phone number with at least 9 digits" className={`${field} mt-2`} placeholder="e.g. 076 123 4567" /></label><div className="grid gap-5 sm:grid-cols-2"><label className="block text-xs font-bold">Business type *<select required name="type" defaultValue="" className={`${field} mt-2`}><option value="" disabled>Select type</option>{['Café','Restaurant','Hotel','Event','Other'].map(x => <option key={x}>{x}</option>)}</select></label><label className="block text-xs font-bold">Bottle size *<select required name="size" defaultValue="" className={`${field} mt-2`}><option value="" disabled>Select size</option>{['500ml','1000ml','1500ml','Not sure yet'].map(x => <option key={x}>{x}</option>)}</select></label></div><label className="block text-xs font-bold">Estimated quantity *<input required name="quantity" type="number" min="1" max="1000000" inputMode="numeric" className={`${field} mt-2`} placeholder="Number of bottles" /></label><label className="block text-xs font-bold">Your logo <span className="font-normal text-muted-foreground">(optional; attach in WhatsApp after sending)</span><span className="mt-2 flex min-h-24 min-w-0 cursor-pointer items-center gap-4 rounded-sm border border-dashed border-input px-4 text-muted-foreground"><Upload size={20} className="shrink-0 text-primary" /><span className="min-w-0 truncate text-sm">{file ? file.name : 'Choose a PNG, JPG, SVG or PDF (max 5 MB)'}</span><input type="file" accept=".png,.jpg,.jpeg,.svg,.pdf,image/png,image/jpeg,image/svg+xml,application/pdf" className="sr-only" onChange={e => { const selected = e.target.files?.[0] || null; if (selected && selected.size > 5 * 1024 * 1024) { setFileError('Please choose a file smaller than 5 MB.'); setFile(null); e.target.value = ''; } else { setFileError(''); setFile(selected); } }} /></span>{fileError && <span role="alert" className="mt-2 block text-primary">{fileError}</span>}</label><label className="block text-xs font-bold">Anything else?<textarea name="message" rows={4} className={`${field} mt-2 resize-y`} placeholder="Tell us more about your project" /></label><Button type="submit" variant="brand" size="lg" className="w-full">Prepare WhatsApp Enquiry <ArrowRight /></Button><p className="text-xs leading-5 text-muted-foreground">Your enquiry is not sent until you continue on WhatsApp. We use the details you provide only to respond to your enquiry. <Link to="/privacy" className="underline">Privacy Policy</Link>. You can also email <a href={`mailto:${email}`} className="underline">{email}</a>.</p></form>}</div></div></section>;
}