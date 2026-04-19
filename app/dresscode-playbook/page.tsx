'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/context/CartContext';

const AMAZON_URL = 'https://amzn.to/3OFSH2V';
const LESEPROBE_URL = 'https://read.amazon.com/sample/B0GGDN15HK?clientId=share';

const dresscodes = [
  {
    title: 'Business Casual',
    description: 'Der alltägliche Arbeitslook, der trotzdem Haltung zeigt. Weniger Anzug, mehr Substanz — für moderne Büros und flexible Arbeitsumgebungen.',
  },
  {
    title: 'Smart Casual',
    description: 'Die Mitte zwischen professionell und entspannt. Für After-Work, Networking und Anlässe, bei denen Overdressing genauso falsch wäre wie Unterdressing.',
  },
  {
    title: 'Business Professional',
    description: 'Der klassische Berufsauftritt für Präsentationen, Verhandlungen und alles, was Vorbereitung verdient. Kleidung als stilles Argument.',
  },
  {
    title: 'Cocktail Attire',
    description: 'Elegant, ohne zu inszenieren. Für festliche Dinner, Firmenevents und Empfänge — der Dresscode, bei dem die meisten unsicher werden.',
  },
  {
    title: 'Black Tie',
    description: 'Der formellste Rahmen. Wer ihn kennt, braucht ihn nicht zu fürchten. Was angemessen ist — und was selbst hier falsch liegt.',
  },
  {
    title: "Do's & Don'ts",
    description: 'Konkrete Orientierung statt Regelkatalog. Die häufigsten Fehler — und warum sie passieren. Pro Dresscode, direkt anwendbar.',
  },
];

const bookContents = [
  'Dresscode-Grundlagen: Passform, Farbe, Stoffe und Details im Zusammenspiel',
  'Capsule Wardrobe: ein System, das Entscheidungen reduziert',
  'Quick Fixes für stressige Tage',
  'Checklisten und Templates zum Ausdrucken',
  'Wochenplaner für wiederkehrende Anlässe',
  'Outfit-Beispiele für jeden Dresscode',
  'Shopping-Empfehlungen: was Du wirklich brauchst — nicht mehr',
  'Kostenlose Updates bei neuen Versionen',
];

const tableOfContents = [
  'Einleitung: Warum Kleidung nicht Mode ist',
  'Die Grundlagen: Passform als erstes Prinzip',
  'Farbe und Kontrast — systematisch eingesetzt',
  'Stoffe verstehen, Qualität erkennen',
  'Die sechs Dresscodes: Kontext und Anwendung',
  'Capsule Wardrobe: Weniger entscheiden, besser wirken',
  'Quick Fixes und Notfall-Strategien',
  'Anhang: Checklisten, Templates, Wochenplaner',
];

const faqs = [
  {
    question: 'Für wen ist das Dresscode Playbook geeignet?',
    answer: 'Für Menschen mit beruflicher Verantwortung, die verlässlich gut gekleidet sein wollen — ohne jeden Morgen neu darüber nachzudenken. Das Buch richtet sich an Frauen und Männer gleichermaßen.',
  },
  {
    question: 'Gilt die Beratung nur für Männer oder auch für Frauen?',
    answer: 'Das Buch richtet sich ausdrücklich an beide. Dresscodes funktionieren nach denselben Grundprinzipien — die Umsetzung wird für Frauen und Männer jeweils konkret beschrieben.',
  },
  {
    question: 'In welchem Format erhalte ich das Playbook?',
    answer: 'Als PDF und EPUB, optimiert für alle Geräte. Du kannst es auf dem Computer lesen, auf dem Tablet blättern oder ausdrucken.',
  },
  {
    question: 'Wie erhalte ich das Playbook nach dem Kauf?',
    answer: 'Sofort nach der Zahlung erhältst Du einen Download-Link per E-Mail. Das Playbook ist außerdem jederzeit in Deinem Kundenbereich verfügbar.',
  },
  {
    question: 'Kann ich digital und Taschenbuch kombinieren?',
    answer: 'Ja. Du kannst das E-Book hier direkt kaufen und das Taschenbuch zusätzlich über Amazon bestellen. Beide Versionen haben denselben Inhalt.',
  },
  {
    question: 'Wie unterscheidet sich dieses Buch von anderen Stilratgebern?',
    answer: 'Das Dresscode Playbook ist kein Trendbuch und kein klassischer Stilratgeber. Es geht nicht darum, einen neuen Look zu entwickeln — sondern darum, Kleidung als System zu verstehen, das zuverlässig funktioniert.',
  },
  {
    question: 'Gibt es Updates?',
    answer: 'Ja. Bei neuen Versionen oder Erweiterungen erhältst Du kostenlose Updates und wirst per E-Mail benachrichtigt.',
  },
  {
    question: 'Gibt es eine Geld-zurück-Garantie?',
    answer: 'Digitale Produkte sind nach deutschem Recht vom Widerruf ausgeschlossen, sobald der Download begonnen hat. Wenn Du Fragen vor dem Kauf hast, erreichst Du uns jederzeit über das Kontaktformular.',
  },
];

export default function DresscodePlaybookPage() {
  const { addToCart } = useCart();
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handlePurchase = () => {
    addToCart({
      id: 'dresscode-playbook',
      name: 'Dresscode Playbook',
      price: 33.95,
      type: 'ebook',
    });
    router.push('/checkout');
  };

  const handleAddToCart = () => {
    addToCart({
      id: 'dresscode-playbook',
      name: 'Dresscode Playbook',
      price: 33.95,
      type: 'ebook',
    });
    router.push('/checkout');
  };

  return (
    <>
      {/* Hero */}
      <section className="relative section-padding overflow-hidden bg-gradient-to-br from-business-navy via-business-darkNavy to-business-charcoal">
        <div aria-hidden="true" className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-business-gold rounded-full blur-[120px]" />
        </div>

        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1 text-center lg:text-left text-white max-w-2xl">
              <p className="text-sm font-medium tracking-widest uppercase text-business-gold mb-6">
                Anika Schmitz
              </p>
              <h1 className="font-serif text-display-2 lg:text-[3.5rem] leading-[1.15] tracking-tight mb-6">
                Stil verstehen.<br />Wirkung gestalten.
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed mb-2 max-w-xl">
                Ein Buch für Menschen mit beruflicher Verantwortung, die präsent sein wollen — ohne laut zu werden.
              </p>
              <p className="text-base text-gray-400 mb-10 max-w-xl">
                Dresscode Playbook gibt Dir ein System. Kein neues Image. Keine neue Garderobe. Klarheit darüber, was wirklich funktioniert.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start flex-wrap mb-5">
                <button
                  onClick={handlePurchase}
                  className="inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-business-gold focus:ring-offset-2 focus:ring-offset-business-navy bg-business-gold text-business-darkNavy hover:bg-[#b89550] px-7 py-4 text-base whitespace-nowrap"
                >
                  Digital lesen — <span itemProp="price">33,95&nbsp;€</span>
                </button>
                <a
                  href={AMAZON_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-business-navy bg-transparent text-white border-2 border-white/60 hover:border-white hover:bg-white/10 px-7 py-4 text-base whitespace-nowrap"
                >
                  Taschenbuch bei Amazon
                </a>
              </div>

              <a
                href={LESEPROBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm text-business-gold underline underline-offset-4 hover:text-[#e0c070] transition-colors mb-5"
              >
                Leseprobe lesen
              </a>

              <p className="text-xs text-gray-400 tracking-wide">
                Sofortiger Download nach Zahlung&nbsp;·&nbsp;PDF & EPUB&nbsp;·&nbsp;Für alle Geräte
              </p>
            </div>

            <div className="flex-shrink-0 lg:w-[400px] flex justify-center">
              <img
                src="/dresscode-playbook.png"
                alt="Cover des Buchs 'Dresscode Playbook' von Anika Schmitz"
                width={400}
                height={400}
                loading="eager"
                className="w-full max-w-sm lg:max-w-none drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Positionierungs-Block */}
      <section className="py-20 bg-white">
        <div className="container-custom max-w-3xl text-center">
          <p className="font-serif text-2xl md:text-3xl text-brand-primary leading-relaxed">
            Kein Stilratgeber. Kein Trendbuch.
          </p>
          <p className="font-serif text-2xl md:text-3xl text-brand-primary leading-relaxed mt-2">
            Ein Begleiter für Menschen, die Kleidung nicht mehr jeden Morgen neu entscheiden wollen.
          </p>
          <div className="mt-8 w-16 h-px bg-business-gold mx-auto" />
          <p className="mt-8 text-brand-secondary text-lg leading-relaxed max-w-2xl mx-auto">
            Das Dresscode Playbook behandelt Kleidung als professionelles Werkzeug — präzise, wiederholbar, ohne Aufwand. Nicht, um sich neu zu erfinden. Sondern um bei sich zu bleiben.
          </p>
        </div>
      </section>

      {/* Was Dich erwartet */}
      <section className="section-padding bg-business-cream">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="font-serif text-h2 text-brand-primary mb-4">Was Dich erwartet</h2>
            <p className="text-brand-secondary text-lg max-w-2xl mx-auto">
              Sechs Dresscodes — verstanden, nicht auswendig gelernt.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dresscodes.map(({ title, description }) => (
              <div key={title} className="bg-white rounded-xl p-8 shadow-soft">
                <div aria-hidden="true" className="w-10 h-10 mb-5 flex items-center justify-center">
                  <svg className="w-7 h-7 text-business-gold" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V19.5a2.25 2.25 0 002.25 2.25h.75" />
                  </svg>
                </div>
                <h3 className="font-serif text-h4 text-brand-primary mb-3">{title}</h3>
                <p className="text-brand-secondary text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Die Autorin */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="flex-shrink-0">
              <div className="w-48 h-48 md:w-60 md:h-60 rounded-full overflow-hidden shadow-card">
                <img
                  src="/anika-schmitz.jpg"
                  alt="Anika Schmitz, Autorin des Dresscode Playbooks"
                  width={240}
                  height={240}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="text-sm font-medium tracking-widest uppercase text-business-gold mb-3">Die Autorin</p>
              <h2 className="font-serif text-h2 text-brand-primary mb-5">Anika Schmitz</h2>
              <p className="text-brand-secondary text-lg leading-relaxed mb-4">
                Anika Schmitz berät seit Jahren Führungskräfte und Unternehmerinnen zu professioneller Außenwirkung. Nicht als Stylistin im klassischen Sinne — sondern als jemand, der Kleidung als Kommunikation versteht.
              </p>
              <p className="text-brand-secondary leading-relaxed mb-4">
                Das Dresscode Playbook ist aus ihrer täglichen Beratungsarbeit entstanden. Aus den immer gleichen Fragen, den immer gleichen Unsicherheiten — und dem Wunsch, darauf eine verlässliche Antwort zu geben.
              </p>
              <p className="text-brand-secondary leading-relaxed">
                Das Buch ist ihr Versuch, das Wesentliche zu kondensieren. Für Menschen, die keine Zeit haben, sich täglich damit zu beschäftigen — aber trotzdem die richtige Wirkung erzielen wollen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Was im Buch steckt */}
      <section className="section-padding bg-business-cream">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="font-serif text-h2 text-brand-primary mb-4">Was im Buch steckt</h2>
            <p className="text-brand-secondary text-lg max-w-xl mx-auto">
              Anwendbar vom ersten Tag. Nicht zum Lesen und Weglegen.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-soft">
            <div className="grid md:grid-cols-2 gap-5">
              {bookContents.map((item) => (
                <div key={item} className="flex items-start gap-4">
                  <svg className="w-5 h-5 text-business-gold flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-brand-primary text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Inhaltsverzeichnis-Auszug */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl text-center">
          <h2 className="font-serif text-h2 text-brand-primary mb-3">Ein Blick ins Buch</h2>
          <p className="text-brand-secondary text-lg mb-12">Auszug aus dem Inhaltsverzeichnis</p>
          <div className="space-y-4 text-left">
            {tableOfContents.map((chapter, i) => (
              <div key={chapter} className="flex items-baseline gap-5 py-3 border-b border-gray-100">
                <span className="font-serif text-business-gold text-sm w-5 flex-shrink-0">{i + 1}</span>
                <span className="font-serif text-brand-primary text-lg">{chapter}</span>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <a
              href={LESEPROBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-business-gold underline underline-offset-4 hover:text-[#e0c070] transition-colors text-sm font-medium"
            >
              Leseprobe lesen
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Leserstimmen */}
      <section className="section-padding bg-business-cream">
        <div className="container-custom max-w-5xl">
          <h2 className="font-serif text-h2 text-brand-primary text-center mb-12">Was Leserinnen und Leser sagen</h2>
          {/* TODO: Echte Testimonials einfügen */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "Das erste Buch über Kleidung, das mich nicht überfordert hat. Ich habe direkt angefangen, meinen Kleiderschrank damit durchzugehen.",
                name: "M. K.",
                role: "Senior Consultant",
              },
              {
                quote: "Endlich jemand, der nicht von Trends redet, sondern von Prinzipien. Das macht einen dauerhaften Unterschied.",
                name: "S. B.",
                role: "Gründerin",
              },
              {
                quote: "Ich dachte, ich weiß wie man sich kleidet. Dieses Buch hat mir gezeigt, was ich trotzdem übersehen hatte.",
                name: "T. H.",
                role: "Führungskraft, Finanzbranche",
              },
            ].map(({ quote, name, role }) => (
              <div key={name} className="bg-white rounded-xl p-8 shadow-soft flex flex-col">
                <div aria-hidden="true" className="text-business-gold text-4xl font-serif leading-none mb-4">&ldquo;</div>
                <p className="font-serif text-brand-primary leading-relaxed flex-1 mb-6">{quote}</p>
                <div>
                  <p className="font-semibold text-brand-primary text-sm">{name}</p>
                  <p className="text-brand-secondary text-sm">{role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Format-Vergleich */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="font-serif text-h2 text-brand-primary text-center mb-12">Wähle Dein Format</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Digital */}
            <div className="border border-gray-200 rounded-2xl p-8 flex flex-col">
              <div className="mb-5">
                <svg className="w-8 h-8 text-business-gold mb-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 8.25h3m-3 3.75h3m-3 3.75h3" />
                </svg>
                <h3 className="font-serif text-h3 text-brand-primary">Digital</h3>
                <p className="text-business-gold font-semibold text-lg mt-1">
                  <span itemProp="price">33,95&nbsp;€</span>
                </p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'Sofort verfügbar nach Kauf',
                  'PDF & EPUB — alle Geräte',
                  'Durchsuchbar und verknüpfbar',
                  'Kostenlose Updates inklusive',
                  'Jederzeit im Kundenbereich abrufbar',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-brand-secondary">
                    <svg className="w-4 h-4 text-business-gold flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={handleAddToCart}
                className="w-full inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-business-gold focus:ring-offset-2 bg-business-gold text-business-darkNavy hover:bg-[#b89550] px-6 py-3.5 text-sm"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                In den Warenkorb
              </button>
            </div>

            {/* Taschenbuch */}
            <div className="border border-gray-200 rounded-2xl p-8 flex flex-col">
              <div className="mb-5">
                <svg className="w-8 h-8 text-business-gold mb-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
                <h3 className="font-serif text-h3 text-brand-primary">Taschenbuch</h3>
                <p className="text-brand-secondary text-sm mt-1">Preis auf Amazon</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'Haptisch und dauerhaft greifbar',
                  'Zum Markieren und Annotieren',
                  'Als Geschenk geeignet',
                  'Keine Technik notwendig',
                  'Versendet über Amazon',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-brand-secondary">
                    <svg className="w-4 h-4 text-business-gold flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={AMAZON_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 bg-brand-primary text-white hover:bg-business-darkNavy px-6 py-3.5 text-sm"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
                Taschenbuch auf Amazon kaufen
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Finale CTA */}
      <section className="section-padding bg-gradient-to-br from-business-navy to-business-darkNavy text-white">
        <div className="container-custom max-w-3xl text-center">
          <h2 className="font-serif text-h2 mb-5">
            Kleidung, die nicht mehr jeden Morgen neu entschieden werden muss.
          </h2>
          <p className="text-gray-300 text-lg mb-10 max-w-xl mx-auto">
            Ein Buch, das Dir ein System gibt — damit Du morgen früh keine Energie mehr darauf verwenden musst.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            <button
              onClick={handlePurchase}
              className="inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-business-gold focus:ring-offset-2 focus:ring-offset-business-navy bg-business-gold text-business-darkNavy hover:bg-[#b89550] px-8 py-4 text-base"
            >
              Digital lesen — 33,95&nbsp;€
            </button>
            <a
              href={AMAZON_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-business-navy bg-transparent text-white border-2 border-white/60 hover:border-white hover:bg-white/10 px-8 py-4 text-base"
            >
              Taschenbuch bei Amazon
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          <h2 className="font-serif text-h2 text-brand-primary text-center mb-12">Häufige Fragen</h2>
          <div className="space-y-3">
            {faqs.map(({ question, answer }, i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-business-gold transition-colors hover:bg-gray-50"
                >
                  <span className="font-semibold text-brand-primary pr-4">{question}</span>
                  <svg
                    className={`w-5 h-5 text-brand-secondary flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6">
                    <p className="text-brand-secondary leading-relaxed">{answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
