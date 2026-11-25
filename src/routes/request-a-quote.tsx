import { createFileRoute, Link } from '@tanstack/react-router';
import { useState, type FormEvent } from 'react';
import { ArrowRight, Check, CircleAlert, Clock3, Upload, MessageCircle, Database, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Eyebrow } from '@/components/pcc/Site';
import { email, phone, whatsapp } from '@/components/pcc/content';
import { supabase } from '@/lib/supabase';

export const Route = createFileRoute('/request-a-quote')({
  head: () => ({
    meta: [
      { title: 'Request a Quote | Pure Custom Creation' },
      { name: 'description', content: 'Request a customized bottled drinking water quote from PCC in Sri Lanka. Tell us about your business, quantity and requirements.' },
      { property: 'og:title', content: 'Request a Quote | Pure Custom Creation' },
      { property: 'og:description', content: 'Tell us about your brand and get started with customized bottled drinking water.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: Quote,
});

const field = 'mt-2 min-h-12 w-full rounded-xl border border-input bg-white/80 px-4 py-3 text-base text-ocean-950 outline-none transition placeholder:text-ocean-800/40 focus:border-aqua-600 focus:ring-2 focus:ring-aqua-600/15';

type DatabaseState = 'idle' | 'saving' | 'saved' | 'failed';
type HandoffState = 'not-opened' | 'initiated';

function Quote() {
  const [databaseState, setDatabaseState] = useState<DatabaseState>('idle');
  const [handoffState, setHandoffState] = useState<HandoffState>('not-opened');
  const [whatsappUrl, setWhatsappUrl] = useState(whatsapp);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity() || fileError || isSubmitting) return;

    const data = new FormData(form);
    const get = (key: string) => String(data.get(key) || '').trim();
    const message = get('message');
    const payload = {
      business_name: get('business'),
      contact_person: get('person'),
      phone: get('phone'),
      business_type: get('type'),
      bottle_size: get('size'),
      estimated_quantity: Number(get('quantity')),
      message: message || null,
      logo_file_name: file?.name || null,
      source: 'website',
    };
    const lines = [
      'Hello PCC, I would like a quote for customized bottled drinking water.',
      '',
      `Business: ${payload.business_name}`,
      `Contact: ${payload.contact_person}`,
      `WhatsApp: ${payload.phone}`,
      `Business type: ${payload.business_type}`,
      `Bottle size: ${payload.bottle_size}`,
      `Estimated quantity: ${payload.estimated_quantity}`,
      `Message: ${message || '—'}`,
    ];
    if (file) lines.push(`Logo file to share: ${file.name} (I will attach it in this WhatsApp chat.)`);

    setWhatsappUrl(`${whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`);
    setHandoffState('not-opened');
    setIsSubmitting(true);
    setDatabaseState('saving');

    try {
      const { error } = await supabase.from('quote_requests').insert(payload);
      if (error) throw error;
      setDatabaseState('saved');
    } catch (error) {
      console.error('PCC quote request database save failed:', error);
      setDatabaseState('failed');
    } finally {
      setIsSubmitting(false);
    }
  }

  function beginWhatsAppHandoff() {
    setHandoffState('initiated');
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-aqua-50 via-white to-blue-50 py-14 md:py-20">
      <div className="pointer-events-none absolute -right-32 top-12 size-96 rounded-full bg-aqua-200/30 blur-3xl" />
      <div className="container-pcc relative grid min-w-0 gap-10 lg:grid-cols-[.78fr_1.22fr] lg:gap-16">
        <div className="min-w-0 lg:sticky lg:top-32 lg:self-start">
          <Eyebrow>START YOUR PROJECT</Eyebrow>
          <h1 className="display mt-7 max-w-[10ch] text-[clamp(3.25rem,6vw,6.25rem)] uppercase text-ocean-950">LET'S MAKE IT YOURS.</h1>
          <p className="mt-7 max-w-sm text-sm leading-7 text-ocean-800/70 md:text-base">Tell us a little about your business and the customized bottled water you have in mind. PCC will coordinate the next steps with you.</p>
          <div className="mt-9 rounded-2xl border border-aqua-100 bg-white/75 p-5 backdrop-blur">
            <p className="text-xs font-bold uppercase tracking-widest text-ocean-800">Prefer to talk?</p>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-aqua-800"><MessageCircle size={18} /> {phone}</a>
            <p className="mt-3 text-xs leading-5 text-ocean-800/55">Your enquiry is only sent when you choose to send the prepared message in WhatsApp.</p>
          </div>
        </div>

        <div className="min-w-0 rounded-3xl border border-white/80 bg-white/85 p-5 shadow-[0_24px_80px_rgba(8,42,64,.08)] backdrop-blur-xl sm:p-7 md:p-10">
          {databaseState === 'idle' || databaseState === 'saving' ? (
            <form onSubmit={submit} className="min-w-0 space-y-6">
              <div>
                <p className="font-display text-2xl font-extrabold text-ocean-950">Tell us about your brand.</p>
                <p className="mt-2 text-xs text-ocean-800/55">Fields marked * are required. Your logo can be attached in WhatsApp after this step.</p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block min-w-0 text-xs font-bold text-ocean-950">Business name *
                  <input required name="business" autoComplete="organization" className={field} placeholder="Your business name" />
                </label>
                <label className="block min-w-0 text-xs font-bold text-ocean-950">Contact person *
                  <input required name="person" autoComplete="name" className={field} placeholder="Your name" />
                </label>
              </div>
              <label className="block text-xs font-bold text-ocean-950">WhatsApp number *
                <input required name="phone" type="tel" autoComplete="tel" minLength={9} title="Enter a valid phone number with at least 9 digits" className={field} placeholder="e.g. 076 123 4567" />
              </label>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-xs font-bold text-ocean-950">Business type *
                  <select required name="type" defaultValue="" className={field}>
                    <option value="" disabled>Select type</option>
                    {['Café', 'Restaurant', 'Hotel', 'Event', 'Corporate', 'Other'].map((item) => <option key={item}>{item}</option>)}
                  </select>
                </label>
                <label className="block text-xs font-bold text-ocean-950">Bottle size *
                  <select required name="size" defaultValue="" className={field}>
                    <option value="" disabled>Select size</option>
                    {['500ml', '1000ml', '1500ml', 'Not sure yet'].map((item) => <option key={item}>{item}</option>)}
                  </select>
                </label>
              </div>
              <label className="block text-xs font-bold text-ocean-950">Estimated quantity *
                <input required name="quantity" type="number" min="1" inputMode="numeric" className={field} placeholder="Number of bottles" />
              </label>
              <label className="block text-xs font-bold text-ocean-950">Your logo <span className="font-normal text-ocean-800/55">(optional)</span>
                <span className="mt-2 flex min-h-24 min-w-0 cursor-pointer items-center gap-4 rounded-xl border border-dashed border-aqua-600/40 bg-aqua-50/50 px-4 text-ocean-800/60">
                  <Upload size={20} className="shrink-0 text-aqua-700" />
                  <span className="min-w-0 truncate text-sm">{file ? file.name : 'Choose a PNG, JPG, SVG or PDF (max 5 MB)'}</span>
                  <input type="file" accept=".png,.jpg,.jpeg,.svg,.pdf,image/png,image/jpeg,image/svg+xml,application/pdf" className="sr-only" onChange={(event) => {
                    const selected = event.target.files?.[0] || null;
                    if (selected && selected.size > 5 * 1024 * 1024) {
                      setFileError('Please choose a file smaller than 5 MB.');
                      setFile(null);
                      event.target.value = '';
                    } else {
                      setFileError('');
                      setFile(selected);
                    }
                  }} />
                </span>
                {fileError && <span role="alert" className="mt-2 block text-sm text-red-700">{fileError}</span>}
              </label>
              <label className="block text-xs font-bold text-ocean-950">Anything else?
                <textarea name="message" rows={4} className={`${field} resize-y`} placeholder="Tell us more about your project" />
              </label>
              <Button type="submit" variant="brand" size="lg" className="w-full rounded-full" disabled={isSubmitting}>
                {isSubmitting ? <>Saving your enquiry <Clock3 className="animate-pulse" /></> : <>Submit quote request <ArrowRight /></>}
              </Button>
              <p className="text-xs leading-5 text-ocean-800/55">We first attempt to save your enquiry securely. WhatsApp is a separate step and will not open until you choose it.</p>
            </form>
          ) : (
            <div className="flex min-h-[480px] flex-col justify-center" aria-live="polite">
              <span className="grid size-14 place-items-center rounded-2xl bg-aqua-100 text-aqua-800">{databaseState === 'saved' ? <Check size={26} /> : <CircleAlert size={26} />}</span>
              <h2 className="display mt-7 text-4xl uppercase text-ocean-950">{databaseState === 'saved' ? 'ENQUIRY RECORDED.' : 'SAVE NOT CONFIRMED.'}</h2>
              <p className="mt-4 max-w-lg text-sm leading-7 text-ocean-800/70">{databaseState === 'saved' ? 'Your enquiry has been saved in the PCC system. To notify our team, continue to WhatsApp and send the prepared message.' : 'We could not save your enquiry in the PCC system. Your details have not been recorded. You can still contact PCC through WhatsApp, but the message will only be sent when you press Send there.'}</p>

              <div className="mt-8 grid gap-3">
                <div className="flex items-start gap-3 rounded-2xl border border-aqua-100 bg-aqua-50/65 p-4">
                  <Database size={19} className={databaseState === 'saved' ? 'mt-0.5 shrink-0 text-emerald-700' : 'mt-0.5 shrink-0 text-red-700'} />
                  <div><p className="text-sm font-bold text-ocean-950">Database status</p><p className="mt-1 text-xs leading-5 text-ocean-800/65">{databaseState === 'saved' ? 'Saved successfully.' : 'Not saved. No enquiry record was created.'}</p></div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl border border-aqua-100 bg-aqua-50/65 p-4">
                  <MessageCircle size={19} className="mt-0.5 shrink-0 text-aqua-800" />
                  <div><p className="text-sm font-bold text-ocean-950">WhatsApp handoff</p><p className="mt-1 text-xs leading-5 text-ocean-800/65">{handoffState === 'initiated' ? 'WhatsApp handoff initiated. The message is not sent until you press Send in WhatsApp.' : 'Not opened yet. Your prepared message is waiting for your action.'}</p></div>
                </div>
              </div>

              <Button asChild variant="brand" size="lg" className="mt-7 w-full rounded-full">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={beginWhatsAppHandoff}>Continue to WhatsApp <ExternalLink size={17} /></a>
              </Button>
              <p className="mt-3 text-xs leading-5 text-ocean-800/55">If you selected a logo, attach it in the WhatsApp chat. The website does not upload the file automatically.</p>
              <Button variant="link" onClick={() => { setDatabaseState('idle'); setHandoffState('not-opened'); }} className="mt-4 w-fit px-0 text-ocean-800">Back to edit details</Button>
            </div>
          )}
          <div className="mt-8 border-t border-aqua-100 pt-5 text-xs leading-5 text-ocean-800/55">Need help? Email <a href={`mailto:${email}`} className="font-semibold underline underline-offset-2">{email}</a>.</div>
        </div>
      </div>
    </section>
  );
}
