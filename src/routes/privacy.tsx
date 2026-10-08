import { createFileRoute, Link } from '@tanstack/react-router';
import { Eyebrow } from '@/components/pcc/Site';

export const Route = createFileRoute('/privacy')({
  head: () => ({
    meta: [
      { title: 'Privacy Policy | Pure Custom Creation' },
      { name: 'description', content: 'Privacy information for enquiries submitted to Pure Custom Creation.' },
      { property: 'og:title', content: 'Privacy Policy | Pure Custom Creation' },
      { property: 'og:type', content: 'website' },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return <main className="bg-paper py-16 md:py-24">
    <div className="container-pcc max-w-3xl">
      <Eyebrow>PRIVACY</Eyebrow>
      <h1 className="display mt-6 text-[clamp(3rem,7vw,6rem)] uppercase">YOUR DETAILS. HANDLED WITH CARE.</h1>
      <p className="mt-7 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
        When you contact Pure Custom Creation through our website, we collect the information you choose to provide so our team can respond to your enquiry.
      </p>
      <div className="mt-12 space-y-10 border-t border-border pt-10 text-sm leading-7 text-muted-foreground">
        <section><h2 className="font-display text-xl font-bold text-foreground">What we collect</h2><p className="mt-3">Depending on your enquiry, this may include your name, business name, phone or WhatsApp number, business type, requested bottle size, estimated quantity, message and the name of an uploaded logo file.</p></section>
        <section><h2 className="font-display text-xl font-bold text-foreground">Why we use it</h2><p className="mt-3">We use enquiry information to understand your requirements, contact you about your request and prepare a suitable response or quotation.</p></section>
        <section><h2 className="font-display text-xl font-bold text-foreground">WhatsApp</h2><p className="mt-3">The website prepares a WhatsApp message for you to review and send. Your message is not sent to PCC through WhatsApp until you choose to continue and send it.</p></section>
        <section><h2 className="font-display text-xl font-bold text-foreground">Questions</h2><p className="mt-3">If you have a question about information submitted through the website, please contact PCC using the details on our <Link to="/contact" className="underline text-foreground">Contact</Link> page.</p></section>
      </div>
    </div>
  </main>;
}