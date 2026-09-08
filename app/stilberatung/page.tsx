'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/context/CartContext';

const BASE_PRICE = 99;
const CURRENCY = '€';
const PRODUCT_ID = 'stilberatung';
const COUPONS: Record<string, { pct?: number; fixed?: number; label: string }> = {
  WILLKOMMEN: { pct: 20, label: '−20 %' },
  ANIKA30: { fixed: 30, label: '−30 €' },
};

function fmt(n: number): string {
  return (Math.round(n * 100) / 100).toLocaleString('de-DE', {
    minimumFractionDigits: n % 1 ? 2 : 0,
    maximumFractionDigits: 2,
  }) + ' ' + CURRENCY;
}

function priceNow(applied: string | null): number {
  if (!applied) return BASE_PRICE;
  const c = COUPONS[applied];
  if (!c) return BASE_PRICE;
  const p = c.pct ? BASE_PRICE * (1 - c.pct / 100) : BASE_PRICE - (c.fixed || 0);
  return Math.max(0, p);
}

function StyleCheckForm() {
  const { addToCart, applyDiscount } = useCart();
  const [email, setEmail] = useState('');
  const [coupon, setCoupon] = useState('');
  const [applied, setApplied] = useState<string | null>(null);
  const [couponMsg, setCouponMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [emailError, setEmailError] = useState(false);
  const [adding, setAdding] = useState(false);

  const now = priceNow(applied);

  const handleCoupon = useCallback(() => {
    const code = coupon.trim().toUpperCase();
    if (!code) {
      setApplied(null);
      setCouponMsg(null);
      return;
    }
    if (COUPONS[code]) {
      setApplied(code);
      setCouponMsg({ text: `Code angewendet: ${COUPONS[code].label}. Verbindlich beim Checkout.`, ok: true });
    } else {
      setApplied(null);
      setCouponMsg({ text: 'Dieser Code wurde nicht erkannt.', ok: false });
    }
  }, [coupon]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/.+@.+\..+/.test(email)) {
      setEmailError(true);
      return;
    }
    setAdding(true);
    if (applied) {
      await applyDiscount(applied);
    }
    addToCart({
      id: PRODUCT_ID,
      name: 'Business Style Check',
      price: BASE_PRICE,
      type: 'Service',
    });
  };

  return (
    <div className="sc-offer">
      <div className="sc-offer__price">
        <span className="sc-offer__now">{fmt(now)}</span>
        {applied && (
          <>
            <span className="sc-offer__was">{fmt(BASE_PRICE)}</span>
            <span className="sc-offer__save">{COUPONS[applied].label}</span>
          </>
        )}
      </div>
      <p className="sc-offer__sub">Einmalig · online · persönlicher Report inkl. BusinessStylist® Identity Profil™</p>
      <form onSubmit={handleSubmit} noValidate>
        <div className="sc-field">
          <label className="sc-field__label" htmlFor="sc-email">E-Mail-Adresse</label>
          <input
            id="sc-email"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setEmailError(false); }}
            placeholder="name@beispiel.de"
            autoComplete="email"
            required
            className="sc-input"
            style={emailError ? { borderBottomColor: '#8a5a4a' } : undefined}
          />
        </div>
        <div className="sc-field">
          <label className="sc-field__label" htmlFor="sc-coupon">
            Gutscheincode <span className="sc-field__sub">(optional)</span>
          </label>
          <div className="sc-coupon">
            <input
              id="sc-coupon"
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Code eingeben"
              autoCapitalize="characters"
              className="sc-input"
            />
            <button type="button" onClick={handleCoupon} className="sc-coupon__btn">Einlösen</button>
          </div>
          {couponMsg && (
            <p className={`sc-coupon__msg ${couponMsg.ok ? 'ok' : 'err'}`} aria-live="polite">
              {couponMsg.text}
            </p>
          )}
        </div>
        <button type="submit" className="sc-btn" disabled={adding}>
          {adding ? 'Wird in den Warenkorb gelegt …' : <>Business Style Check in den Warenkorb <span className="sc-btn__arrow" aria-hidden="true">&#8594;</span></>}
        </button>
        <p className="sc-offer__reassure">
          Nach dem Kauf erhältst Du sofort den Fragebogen. Deine Lieferzeit startet, sobald Deine ausgefüllten Unterlagen und Fotos bei Anika eingegangen sind.
        </p>
      </form>
    </div>
  );
}

function ScrollRail() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const pct = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      setProgress(pct);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
    };
  }, []);

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  return (
    <aside className="sc-rail" aria-hidden="true">
      <span className="sc-rail__mark">
        <img src="/businessstylist-logo-sml.png" alt="" className="sc-rail__logo" />
      </span>
      <div className="sc-rail__track">
        <div
          className="sc-rail__fill"
          style={isMobile ? { width: `${progress * 100}%` } : { height: `${progress * 100}%` }}
        />
      </div>
      <span className="sc-rail__phase">Strategie™ · Phase 03</span>
    </aside>
  );
}

export default function StilberatungPage() {
  return (
    <>
      <ScrollRail />
      <main className="sc-shell">
        <div className="sc-wrap">
          {/* HERO */}
          <header className="sc-hero">
            <p className="sc-eyebrow sc-hero__eyebrow">Farb- und Stilberatung für Business-Frauen</p>
            <h1 className="sc-hero__title">
              Stilberatung, die auf Wirkung setzt – weil der erste Eindruck zählt.
            </h1>
            <p className="sc-hero__lede">
              Du willst, dass man Dir Deine <strong>Kompetenz sofort ansieht</strong> – nicht erst, wenn Du den
              Mund aufmachst. Der Business Style Check™ ist die Stilberatung, die genau das leistet: Sie
              übersetzt Deinen Auftritt in eine klare Wirkungsstrategie. Von einer Mode-Stylistin und gelernten
              Kostümbildnerin, komplett online, einmalig 99 €.
            </p>
            <div className="sc-hero__cta">
              <a className="sc-btn" href="#buchen">
                Business Style Check buchen <span className="sc-btn__arrow" aria-hidden="true">&#8594;</span>
              </a>
              <div className="sc-price-inline">
                <span className="sc-price-inline__now">99 €</span>
                <span className="sc-price-inline__note">einmalig · online · in 2 Tagen</span>
              </div>
            </div>
            <div className="sc-chips">
              <span className="sc-chip">Gelernte Kostümbildnerin</span>
              <span className="sc-chip">Ausgebildete Schneiderin</span>
              <span className="sc-chip">Studium Modedesign</span>
              <span className="sc-chip">Persönlicher Report in 2 Tagen</span>
            </div>
          </header>

          {/* CONTRAST */}
          <section className="sc-section">
            <div className="sc-section__head">
              <span className="sc-section__num">01</span>
              <h2 className="sc-section__title">Stil oder Wirkung – worauf kommt es an?</h2>
              <p className="sc-section__hint">Der Unterschied zwischen einer klassischen Stilberatung und dem Business Style Check™ auf einen Blick.</p>
            </div>
            <div className="sc-compare">
              <div className="sc-compare__col sc-compare__col--alt">
                <span className="sc-compare__l">Klassische Stilberatung</span>
                <p className="sc-compare__h">Fokus: Aussehen</p>
                <ul>
                  <li>Welche Farben stehen mir?</li>
                  <li>Welcher Figurtyp bin ich?</li>
                  <li>Was ist gerade Trend?</li>
                  <li>Wie sehe ich vorteilhaft aus?</li>
                </ul>
              </div>
              <div className="sc-compare__col sc-compare__col--now">
                <span className="sc-compare__l">Business Style Check™</span>
                <p className="sc-compare__h">Fokus: Wirkung</p>
                <ul>
                  <li>Wie will ich wahrgenommen werden?</li>
                  <li>Was traut man mir zu?</li>
                  <li>Welche Rolle spiele ich im Job?</li>
                  <li>Wie wird meine Kompetenz sichtbar?</li>
                </ul>
              </div>
            </div>
            <p className="sc-compare__foot">Dein Look bleibt wichtig – aber er ist das Werkzeug, nicht das Ziel. Es geht nicht darum, ständig neue Looks auszuprobieren, sondern Deinen Auftritt gezielt einzusetzen.</p>
          </section>

          {/* WHY */}
          <section className="sc-section">
            <div className="sc-section__head">
              <span className="sc-section__num">02</span>
              <h2 className="sc-section__title">Warum sieht man Dir Deine Wirkung sofort an?</h2>
            </div>
            <div className="sc-prose">
              <p>Eine klassische Farb- und Stilberatung hilft Dir, Deinen persönlichen <strong>Stil</strong> zu finden: Eine Stylistin schaut sich Farben und Formen an, bestimmt Deinen Figurtyp und zeigt Dir, welche Schnitte, Materialien und Muster zu Dir passen – Kleidung, Mode und Styling, handwerklich sauber aufgeschlüsselt.</p>
              <p>Im Berufsleben wird dieser Auftritt sofort gelesen. <strong>Der erste Eindruck zählt</strong>, lange bevor Du ein Wort gesagt hast – und man sieht Dir direkt an, ob Anspruch und Auftreten zusammenpassen. Deine Kleidung ist dort weniger Geschmack als Kommunikation: Sie sendet ein Signal über Deine Kompetenz, Deine Rolle und Dein Selbstbewusstsein.</p>
              <p>Genau hier setzt der Business Style Check™ an – eine Stilberatung, die eher Imageberatung ist: Er nimmt das Handwerk, Farben, Formen und Schnitte, und richtet es konsequent auf Deine Wirkung aus.</p>
            </div>
          </section>

          {/* FOR WHOM */}
          <section className="sc-section">
            <div className="sc-section__head">
              <span className="sc-section__num">03</span>
              <h2 className="sc-section__title">Für wen ist der Business Style Check gedacht?</h2>
              <p className="sc-section__hint">Unsere Kundinnen kommen aus dem Business und stehen vor verschiedenen Anlässen – Meeting, Präsentation, Kundentermin, Networking.</p>
            </div>
            <div className="sc-cards3">
              <div className="sc-tile">
                <span className="sc-tile__l">01</span>
                <p className="sc-tile__h">Angestellte &amp; Führungskräfte</p>
                <p className="sc-tile__p">Für Frauen, deren Auftritt mit wachsender Verantwortung mithalten soll.</p>
              </div>
              <div className="sc-tile">
                <span className="sc-tile__l">02</span>
                <p className="sc-tile__h">Gründerinnen &amp; Selbstständige</p>
                <p className="sc-tile__p">Für Frauen, die als Marke sichtbar werden und Vertrauen aufbauen wollen.</p>
              </div>
              <div className="sc-tile">
                <span className="sc-tile__l">03</span>
                <p className="sc-tile__h">Vor dem nächsten Schritt</p>
                <p className="sc-tile__p">Vor Beförderung, Pitch oder Rollenwechsel – wenn der Auftritt jetzt sitzen muss.</p>
              </div>
            </div>
          </section>

          {/* DELIVERABLES */}
          <section className="sc-section">
            <div className="sc-section__head">
              <span className="sc-section__num">04</span>
              <h2 className="sc-section__title">Was bekommst Du?</h2>
              <p className="sc-section__hint">Deine persönliche Stilstrategie, individuell erstellt – auf Basis Deiner Antworten und Fotos. Ganz ohne Shopping-Links: Hier geht es um Deine Wirkung, nicht ums Einkaufen.</p>
            </div>
            <ul className="sc-deliver">
              {[
                { n: '01', t: 'Business Vision Statement™', d: 'Ein Satz, der festhält, wie Du im beruflichen Kontext wahrgenommen werden willst.' },
                { n: '02', t: 'Business Style Archetyp™', d: 'Dein primärer und sekundärer Archetyp – Dein Kompass für jede Outfit-Entscheidung.' },
                { n: '03', t: 'Business Style Profile™', d: 'Deine stärksten Wirkungsmerkmale und worauf Du bewusst achten solltest.' },
                { n: '04', t: 'Wirkungsanalyse', d: 'Wie Dein Auftritt auf Kompetenz, Führung, Modernität und Vertrauen einzahlt.' },
                { n: '05', t: 'Farb- & Stilstrategie', d: 'Deine Basis-, Akzent- und No-Go-Farben, passend zu Deiner Rolle.' },
                { n: '06', t: 'Schnitte, Materialien & Accessoires', d: 'Konkrete Empfehlungen für Schnitte und Materialien, die Deine Wirkung tragen.' },
                { n: '07', t: 'Persönliche Style-Regeln', d: 'Was Deine Wirkung stärkt – und was Du ab jetzt bewusst weglässt.' },
                { n: '08', t: 'Erste Outfit-Kombinationen', d: 'Richtungs-Outfits, die zeigen, wie Du Deine Kleidungsstücke kombinieren kannst.' },
                { n: '09', t: 'Quick Wins', d: 'Sofort umsetzbare Änderungen mit dem größten Effekt auf Deine Ausstrahlung.' },
                { n: '10', t: 'BusinessStylist® Identity Profil™', d: 'Dein persönliches Business-Identity-Profil als PDF – innerhalb von 2 Tagen in Deinem Postfach.' },
              ].map((item) => (
                <li key={item.n} className="sc-deliver__item">
                  <span className="sc-deliver__n">{item.n}</span>
                  <div>
                    <p className="sc-deliver__t">{item.t}</p>
                    <p className="sc-deliver__d">{item.d}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="sc-cta-mid">
              <a className="sc-btn" href="#buchen">
                Jetzt für 99 € buchen <span className="sc-btn__arrow" aria-hidden="true">&#8594;</span>
              </a>
            </div>
          </section>

          {/* HOW */}
          <section className="sc-section">
            <div className="sc-section__head">
              <span className="sc-section__num">05</span>
              <h2 className="sc-section__title">Wie läuft die Online-Stilberatung ab?</h2>
            </div>
            <div className="sc-steps">
              {[
                { n: '01', t: 'Buchen', d: 'Sichere Dir Deinen Business Style Check™ unten – mit E-Mail und, falls vorhanden, Deinem Gutscheincode.' },
                { n: '02', t: 'Fragebogen & Fotos', d: 'Fragebogen ca. 20–30 Minuten, dazu 5–8 Outfitfotos. Kein Termin, keine Anprobe – alles online.' },
                { n: '03', t: 'Dein Report', d: 'Anika erstellt Deine Stilstrategie und Dein Identity Profil™ – als PDF innerhalb von 2 Tagen nach Eingang Deiner Unterlagen.' },
              ].map((step) => (
                <div key={step.n} className="sc-step">
                  <span className="sc-step__n">{step.n}</span>
                  <div>
                    <p className="sc-step__t">{step.t}</p>
                    <p className="sc-step__d">{step.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="sc-card">
              <div className="sc-card__badge">
                <img src="/dresscode-playbook.png" alt="BusinessStylist® Identity Profil™" />
              </div>
              <div>
                <p className="sc-card__t">Dein BusinessStylist® Identity Profil™</p>
                <p className="sc-card__d">Deine Business-Identität als persönliches PDF: Archetyp, Wirkungsprofil, Farbwelt, Signature Pieces und Dein Mantra – kompakt auf einen Blick, innerhalb von 2 Tagen.</p>
              </div>
            </div>
          </section>

          {/* WHO BEHIND */}
          <section className="sc-section">
            <div className="sc-section__head">
              <span className="sc-section__num">06</span>
              <h2 className="sc-section__title">Wer Dich berät</h2>
            </div>
            <div className="sc-bio">
              <p className="sc-bio__p">
                Anika Schmitz ist <strong>keine Quereinsteigerin</strong>. Sie ist gelernte Kostümbildnerin und
                ausgebildete Schneiderin, hat Designingenieurwesen für Mode studiert und jahrelang für Film,
                Theater und als Mode-Stylistin gearbeitet. Dieses Handwerk – Schnitt, Material und die Frage,
                wie ein Auftritt auf der Bühne wirkt – bringt sie mit einem geschulten Gespür in jeden Business
                Style Check ein. Fundiertes Know-how aus Mode und Styling statt Bauchgefühl und schnelllebiger Fashion.
              </p>
              <div className="sc-chips">
                <span className="sc-chip">Gelernte Kostümbildnerin</span>
                <span className="sc-chip">Ausgebildete Schneiderin</span>
                <span className="sc-chip">Studium Designingenieurwesen für Mode</span>
                <span className="sc-chip">Film · Theater · Mode-Styling</span>
              </div>
            </div>
          </section>

          {/* CRAFT */}
          <section className="sc-section">
            <div className="sc-section__head">
              <span className="sc-section__num">07</span>
              <h2 className="sc-section__title">Wie findest Du Deinen Stil – Farben, Schnitte, Figurtyp?</h2>
            </div>
            <div className="sc-prose">
              <p>Um Deinen <strong>Stil zu finden</strong>, beginnen wir bei den Grundlagen: Wir bestimmen, welche Farben und Formen Dir schmeicheln und welcher Figurtyp Du bist. Daraus ergibt sich, welche Schnitte und Muster Deine Stärken hervorheben, Dich optisch strecken und – wo Du möchtest – helfen, Proportionen gezielt zu betonen.</p>
              <p>Darauf baut Dein persönlicher Modestil auf: von passenden Kleidungsstücken über Materialien bis zu Accessoires und Schmuck, die Deinen Auftritt unterstreichen. Du musst dafür kein Model sein. Am Ende weißt Du, wie Du Deine Teile clever kombinierst und Deine Garderobe im Kleiderschrank gezielt aufbaust.</p>
            </div>
          </section>

          {/* BENEFITS */}
          <section className="sc-section">
            <div className="sc-section__head">
              <span className="sc-section__num">08</span>
              <h2 className="sc-section__title">Was Dir das bringt</h2>
              <p className="sc-section__hint">Es geht nicht ums Aussehen, sondern um Wirkung – und die ist im Beruf unmittelbar spürbar.</p>
            </div>
            <div className="sc-cards3">
              <div className="sc-tile">
                <p className="sc-tile__h">Souveräne Ausstrahlung</p>
                <p className="sc-tile__p">Dein Auftritt stärkt Ausstrahlung und Selbstbewusstsein – spürbar in jedem Raum.</p>
              </div>
              <div className="sc-tile">
                <p className="sc-tile__h">Sichtbare Kompetenz</p>
                <p className="sc-tile__p">Der richtige Look ist das i-Tüpfelchen, das Deine Kompetenz sofort sichtbar macht.</p>
              </div>
              <div className="sc-tile">
                <p className="sc-tile__h">Der richtige Eindruck</p>
                <p className="sc-tile__p">Du setzt Dich passend in Szene und hinterlässt professionell den Eindruck, den Du willst.</p>
              </div>
            </div>
          </section>

          {/* OFFER */}
          <section className="sc-section" id="buchen">
            <div className="sc-section__head">
              <span className="sc-section__num">09</span>
              <h2 className="sc-section__title">Was kostet der Business Style Check – und wie buchst Du?</h2>
            </div>
            <StyleCheckForm />
          </section>

          {/* RELATED PRODUCTS TEASER */}
          <section className="sc-section">
            <div className="sc-section__head">
              <span className="sc-section__num">10</span>
              <h2 className="sc-section__title">Und danach?</h2>
              <p className="sc-section__hint">Der Business Style Check™ ist die Strategie – bewusst ohne Shopping-Links. Wer erst die Richtung kennt, macht weniger Fehlkäufe und kauft nachhaltiger ein. Diese zwei Angebote sind eigenständig buchbar:</p>
            </div>
            <div className="sc-cards3" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <Link href="/kleiderschrank-check" className="sc-tile sc-tile--link">
                <span className="sc-tile__l">Eigenes Produkt</span>
                <p className="sc-tile__h">Kleiderschrank-Check</p>
                <p className="sc-tile__p">Wir sichten, was Du schon hast, und zeigen, wie Du es clever kombinierst. Unabhängig vom Style Check buchbar.</p>
              </Link>
              <Link href="/capsule-wardrobe" className="sc-tile sc-tile--link">
                <span className="sc-tile__l">Nächste Stufe</span>
                <p className="sc-tile__h">Business Capsule Wardrobe™</p>
                <p className="sc-tile__p">Die Umsetzung: konkrete Teile inklusive Personal Shopping mit klickbaren Links zum direkten Shoppen.</p>
              </Link>
            </div>
          </section>

          {/* FAQ */}
          <section className="sc-section">
            <div className="sc-section__head">
              <span className="sc-section__num">11</span>
              <h2 className="sc-section__title">Häufige Fragen zur Stilberatung</h2>
            </div>
            <div className="sc-faq">
              {[
                { q: 'Was kostet eine Stilberatung bei BusinessStylist®?', a: 'Der Business Style Check™ kostet einmalig 99 € – inklusive Deiner kompletten Stilstrategie und dem BusinessStylist® Identity Profil™ als PDF.' },
                { q: 'Findet die Stilberatung online oder vor Ort statt?', a: 'Komplett online. Du brauchst weder einen Termin noch eine Anprobe vor Ort – nur Fotos Deiner aktuellen Business-Outfits.' },
                { q: 'Bekomme ich konkrete Einkaufslinks?', a: 'Nein, bewusst nicht. Der Business Style Check™ ist die Strategie. Personal Shopping mit klickbaren Links bekommst Du in der Business Capsule Wardrobe™.' },
                { q: 'Worin unterscheidet sich diese Stilberatung von einer klassischen?', a: 'Eine klassische Beratung endet beim Aussehen. Hier geht es um Wirkung: wie Du wahrgenommen werden willst und wie Dein Business-Stil das unterstützt.' },
              ].map((item) => (
                <div key={item.q} className="sc-faq__item">
                  <p className="sc-faq__q">{item.q}</p>
                  <p className="sc-faq__a">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SUMMARY */}
          <section className="sc-section">
            <div className="sc-section__head">
              <span className="sc-section__num">12</span>
              <h2 className="sc-section__title">Das Wichtigste auf einen Blick</h2>
            </div>
            <ul className="sc-glance">
              <li>Stilberatung, die auf Wirkung zielt – nicht nur auf Aussehen.</li>
              <li>Speziell für Business-Frauen entwickelt.</li>
              <li>Von einer gelernten Kostümbildnerin und Mode-Stylistin.</li>
              <li>Dein Archetyp, Deine Farb- und Stilstrategie, Deine ersten Outfits.</li>
              <li>Identity Profil™ als PDF – innerhalb von 2 Tagen.</li>
              <li>Komplett online: Fotos und 20–30 Minuten genügen.</li>
              <li>Klarer Preis: einmalig 99 €, keine versteckten Kosten.</li>
              <li>Ohne Shopping-Links – die fertige Garderobe kommt mit der Capsule Wardrobe™.</li>
            </ul>
            <div className="sc-cta-mid" style={{ paddingTop: '32px' }}>
              <a className="sc-btn" href="#buchen">
                Business Style Check buchen <span className="sc-btn__arrow" aria-hidden="true">&#8594;</span>
              </a>
            </div>
          </section>
        </div>
      </main>

      <footer className="sc-foot">
        <div className="sc-foot__inner">
          <div>
            <img src="/businessstylist-logo-sml.png" alt="BusinessStylist®" className="sc-foot__logo" />
            <p className="sc-eyebrow sc-foot__by">Anika Schmitz</p>
          </div>
          <p className="sc-foot__claim">Wirkung vor Worten.</p>
        </div>
      </footer>
    </>
  );
}
