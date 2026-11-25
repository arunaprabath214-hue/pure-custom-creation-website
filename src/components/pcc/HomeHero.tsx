import { useEffect, useState } from 'react';

const caps = [
  { name: 'Ocean Blue', color: '#0876ef' },
  { name: 'Ruby Red', color: '#e43d4d' },
  { name: 'Violet', color: '#843ce4' },
  { name: 'Sun Gold', color: '#f0b51b' },
  { name: 'Pearl', color: '#edf2f7' },
  { name: 'Graphite', color: '#252b39' },
];

const labels = [
  { name: 'Ocean Wave', a: '#0756d8', b: '#45d3e5', c: '#082b75' },
  { name: 'Botanical', a: '#247d4a', b: '#9bd77c', c: '#e4f4d8' },
  { name: 'Midnight Gold', a: '#102b4d', b: '#d6ae62', c: '#061a32' },
  { name: 'Soft Marble', a: '#e7edf2', b: '#aebfce', c: '#f9fbfc' },
  { name: 'Violet Flow', a: '#7527dc', b: '#e07adf', c: '#3f1c94' },
];

function Bottle({ cap, label }: { cap: string; label: typeof labels[number] }) {
  return (
    <svg viewBox="0 0 520 760" className="pcc-real-bottle" role="img" aria-label={`PCC custom water bottle with ${label.name} label and ${caps.find(c => c.color === cap)?.name} cap`}>
      <defs>
        <linearGradient id="bottleGlass" x1="0" x2="1" y1="0" y2=".15"><stop offset="0" stopColor="#d9f5ff" stopOpacity=".35"/><stop offset=".18" stopColor="#fff" stopOpacity=".92"/><stop offset=".43" stopColor="#bdeeff" stopOpacity=".28"/><stop offset=".72" stopColor="#fff" stopOpacity=".72"/><stop offset="1" stopColor="#8fd5f5" stopOpacity=".34"/></linearGradient>
        <linearGradient id="capGloss" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".55"/><stop offset=".3" stopColor="#fff" stopOpacity=".06"/><stop offset="1" stopColor="#071b58" stopOpacity=".35"/></linearGradient>
        <linearGradient id="labelPaper" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#fff"/><stop offset="1" stopColor="#eaf6fb"/></linearGradient>
        <linearGradient id="labelA" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor={label.a}/><stop offset="1" stopColor={label.c}/></linearGradient>
        <filter id="bottleShadow" x="-60%" y="-40%" width="220%" height="220%"><feGaussianBlur stdDeviation="17"/></filter>
        <filter id="bottleGlow" x="-60%" y="-40%" width="220%" height="220%"><feGaussianBlur stdDeviation="5"/></filter>
      </defs>
      <ellipse cx="265" cy="708" rx="130" ry="23" fill="#6e9ce8" opacity=".25" filter="url(#bottleShadow)"/>
      <g>
        <path d="M210 119 L210 158 C210 181 170 197 150 230 C130 263 125 300 125 351 L125 646 C125 682 151 708 187 708 L343 708 C379 708 405 682 405 646 L405 351 C405 300 400 263 380 230 C360 197 320 181 320 158 L320 119 Z" fill="url(#bottleGlass)" stroke="#fff" strokeWidth="4" strokeOpacity=".9"/>
        <path d="M136 376 Q265 395 394 376 L394 647 Q394 696 343 696 L187 696 Q136 696 136 647 Z" fill="#a8e7f8" opacity=".18"/>
        <path d="M145 279 Q265 306 385 279 M133 345 Q265 368 397 345 M134 620 Q265 644 396 620" fill="none" stroke="#fff" strokeOpacity=".72" strokeWidth="7"/>
        <path d="M162 270 L162 637 Q162 668 188 680" fill="none" stroke="#fff" strokeWidth="11" strokeLinecap="round" opacity=".72"/>
        <path d="M365 276 L365 638" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".48"/>
        <path d="M207 158 L207 183 Q185 196 171 214 M323 158 L323 183 Q345 196 359 214" fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="5"/>
        <rect x="204" y="65" width="122" height="92" rx="18" fill={cap} stroke="#fff" strokeWidth="4"/>
        <rect x="204" y="65" width="122" height="92" rx="18" fill="url(#capGloss)"/>
        {Array.from({length:14},(_,i)=><path key={i} d={`M${211+i*8} 75 V145`} stroke="#fff" strokeOpacity=".32" strokeWidth="2.5"/>)}
        <rect x="211" y="151" width="108" height="17" rx="6" fill={cap} stroke="#fff" strokeOpacity=".65" strokeWidth="2"/>
        <g className="pcc-label-art">
          <rect x="137" y="382" width="256" height="220" rx="13" fill="url(#labelPaper)" stroke="#fff" strokeWidth="4"/>
          <path d="M140 480 Q198 452 250 480 T390 475 L390 598 L140 598 Z" fill="url(#labelA)"/>
          <path d="M140 505 Q205 472 260 505 T390 497" fill="none" stroke={label.b} strokeWidth="24" opacity=".9"/>
          <path d="M140 526 Q215 496 265 527 T390 516" fill="none" stroke="#fff" strokeWidth="5" opacity=".8"/>
          <g transform="translate(221 405) scale(.115)">
            <path d="M0 120 C90 -10 250 -15 460 0 C360 75 230 100 0 120Z M0 135 C120 110 250 105 460 30 C350 165 190 180 0 270Z" fill="#071f43"/>
          </g>
          <text x="260" y="454" textAnchor="middle" fill="#071f43" fontSize="17" fontWeight="800" letterSpacing="2">PURE CUSTOM</text>
          <text x="260" y="473" textAnchor="middle" fill="#31536f" fontSize="10" fontWeight="700" letterSpacing="3">CREATION</text>
          <text x="260" y="565" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="700" letterSpacing="2">DRINKING WATER</text>
          <text x="260" y="583" textAnchor="middle" fill="#fff" fontSize="11" letterSpacing="2">500 ml</text>
        </g>
        {Array.from({length:24},(_,i)=><circle key={i} cx={151+(i*37)%222} cy={235+(i*61)%410} r={i%3===0?4:2.2} fill="#fff" opacity={i%2===0?.8:.45}/>)}
      </g>
    </svg>
  );
}

export function HomeHero() {
  const [capIndex, setCapIndex] = useState(0);
  const [labelIndex, setLabelIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCapIndex(current => (current + 1 + Math.floor(Math.random() * (caps.length - 1))) % caps.length);
      setLabelIndex(current => (current + 1 + Math.floor(Math.random() * (labels.length - 1))) % labels.length);
    }, 2300);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="pcc-home-hero">
      <div className="pcc-hero-light pcc-hero-light-one" aria-hidden="true"/>
      <div className="pcc-hero-light pcc-hero-light-two" aria-hidden="true"/>
      <div className="pcc-hero-ribbon pcc-hero-ribbon-top" aria-hidden="true"/>
      <div className="pcc-hero-ribbon pcc-hero-ribbon-bottom" aria-hidden="true"/>
      <div className="pcc-hero-inner">
        <div className="pcc-hero-copy">
          <h1>Represent your<br/>brand on every<br/><span>bottle</span></h1>
          <div className="pcc-headline-mark" aria-hidden="true"/>
          <p>Customize your bottle with your brand.</p>
        </div>
        <div className="pcc-bottle-stage">
          <svg className="pcc-water-orbit" viewBox="0 0 700 620" aria-hidden="true"><path d="M30 355 C120 160 240 170 350 260 S540 430 660 220" fill="none" stroke="url(#orbitGradient)" strokeWidth="7" strokeLinecap="round"/><defs><linearGradient id="orbitGradient"><stop stopColor="#73dcff" stopOpacity=".12"/><stop offset=".4" stopColor="#fff" stopOpacity=".95"/><stop offset=".7" stopColor="#c18bff" stopOpacity=".85"/><stop offset="1" stopColor="#7ce7f3" stopOpacity=".15"/></linearGradient></defs></svg>
          <div className="pcc-bottle-float"><Bottle cap={caps[capIndex].color} label={labels[labelIndex]}/></div>
          <span className="pcc-bubble bubble-one"/><span className="pcc-bubble bubble-two"/><span className="pcc-bubble bubble-three"/><span className="pcc-bubble bubble-four"/>
          <div className="pcc-customizer">
            <div className="pcc-customizer-group">
              <p>Cap Colour</p>
              <div className="pcc-cap-swatches">{caps.map((item,index)=><span key={item.name} className={index===capIndex?'active':''} style={{'--swatch':item.color} as React.CSSProperties}/>)}</div>
            </div>
            <div className="pcc-customizer-divider"/>
            <div className="pcc-customizer-group pcc-label-options">
              <p>Label Design</p>
              {labels.map((item,index)=><span key={item.name} className={index===labelIndex?'active':''} style={{'--label-a':item.a,'--label-b':item.b,'--label-c':item.c} as React.CSSProperties}><i/></span>)}
            </div>
          </div>
        </div>
      </div>
      <div className="pcc-hero-waterline" aria-hidden="true"/>
    </section>
  );
}
