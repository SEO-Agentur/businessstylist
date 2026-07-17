import type { Metadata } from 'next';
import Link from 'next/link';
import CapsuleCheckoutForm from '@/components/capsule/CapsuleCheckoutForm';

export const metadata: Metadata = {
  title: 'Capsule Wardrobe erstellen – Minimalistischer Kleiderschrank | Businessstylist',
  description:
    'Deine persoenliche Capsule Wardrobe erstellen lassen: weniger ist mehr. Individuelle Beratung mit Farbpalette, Teile-Liste und Kombinationsvorschlaegen fuer deinen minimalistischen Kleiderschrank.',
};

export default function CapsuleWardrobePage() {
  return (
    <>
      {/* HERO */}
      <section className="py-20 md:py-28 bg-business-cream">
        <div className="container-custom text-center max-w-3xl">
          <span className="inline-block px-4 py-1.5 bg-brand-accent/10 text-brand-accent text-sm font-semibold rounded-full mb-6">
            Individuell von Stylistin Anika erstellt
          </span>
          <h1 className="text-display-1 font-serif mb-6 text-brand-primary">
            Deine individuelle Business Capsule Wardrobe
          </h1>
          <p className="text-body-lg text-brand-secondary max-w-2xl mx-auto mb-8 leading-relaxed">
            Dein Signature-Service: Anika entwickelt deine komplette Business-Garderobenstrategie.
            25–35 Teile, 80–100 Outfitkombinationen, Saisonplanung und eine priorisierte Einkaufsliste –
            damit du nie wieder Fehlkaeufe machst. Einkauf nach Plan statt nach Gefuehl.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="#bestellen">
              <span className="inline-flex items-center justify-center px-8 py-4 bg-brand-accent text-white font-semibold rounded-xl hover:bg-brand-accent/90 transition-all duration-200 text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                Jetzt Business Capsule Wardrobe bestellen – 299,- EUR
              </span>
            </Link>
            <span className="text-sm text-brand-secondary">Kein Abo. Einmalig.</span>
          </div>
        </div>
      </section>

      {/* SECTION 1: Konzept */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-custom max-w-3xl">
          <div className="bg-business-cream/50 rounded-2xl p-8 md:p-10 border border-business-cream">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-accent mb-3 block">Grundlagen</span>
            <h2 className="text-h2 font-serif text-brand-primary mb-5">Was ist das Konzept der Capsule Wardrobe?</h2>
            <div className="space-y-4 text-brand-secondary leading-relaxed">
              <p>
                Das Konzept der Capsule Wardrobe wurde in den 1970er-Jahren von der Londonerin Susie Faux gepraegt und spaeter durch die Fashion-Industrie wiederentdeckt. Die Idee ist einfach: Statt eines ueberquellenden Kleiderschranks setzt du auf eine bewusst zusammengestellte Auswahl an Kleidungsstuecken, die sich leicht kombinieren lassen und deinen persoenlichen Stil unterstreichen. Es geht dabei nicht um Verzicht, sondern um eine durchdachte Garderobe aus hochwertigen Basics und zeitlosen Essentials.
              </p>
              <p>
                Eine gute Capsule Wardrobe besteht aus etwa 30 bis 40 Teile, die alle miteinander kombinierbar sind. Die Kollektion umfasst sowohl saisonale Stuecke als auch zeitlose Klassiker, die du das ganze Jahr tragen kannst. Das Ergebnis: Weniger Stress morgens vor dem Kleiderschrank und mehr Stil in jedem Outfit.
              </p>
              <p>
                Im Kern dreht sich alles um die Frage: Was trage ich wirklich gerne? Welche Kleidungsstuecke passen zu meinem Alltag, meinem Beruf und meiner Persoenlichkeit? Wenn du diese Fragen ehrlich beantwortest, bist du dem Ziel eines minimalistischer Kleiderschrank schon sehr nah.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Ausmisten */}
      <section className="py-16 md:py-20 bg-business-cream/30">
        <div className="container-custom max-w-3xl">
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-soft">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-accent mb-3 block">Vorbereitung</span>
            <h2 className="text-h2 font-serif text-brand-primary mb-5">Warum solltest du deinen Kleiderschrank ausmisten?</h2>
            <div className="space-y-4 text-brand-secondary leading-relaxed">
              <p>
                Der erste Schritt zu einer funktionierenden Capsule Wardrobe ist das Ausmisten. Die meisten von uns tragen nur 20 Prozent ihrer Garderobe regelmaessig – der Rest wird nie getragen oder hoechstens ein- bis zweimal pro Saison hervorgeholt. Kleiderschrank ausmisten bedeutet, sich ehrlich zu fragen: Habe ich dieses Kleidungsstueck im letzten Jahr getragen? Passt es noch? Fuehle ich mich darin wohl?
              </p>
              <p>
                Alles, was du nie getragen hast oder was nicht mehr zu deinem eigenen Stil passt, darf gehen. Dabei geht es nicht darum, alles wegzuwerfen – du kannst Kleidungsstuecke spenden, verkaufen oder tauschen. Das Ziel ist, deinen Kleiderschrank auf deine Lieblingsstuecke zu reduzieren. Erst wenn du weisst, was du hast und was dir fehlt, kannst du gezielt hochwertige Kleidung kaufen, die deine Capsule Wardrobe sinnvoll ergaenzt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Anzahl */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-custom max-w-3xl">
          <div className="bg-business-cream/50 rounded-2xl p-8 md:p-10 border border-business-cream">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-accent mb-3 block">Planung</span>
            <h2 className="text-h2 font-serif text-brand-primary mb-5">Wie viele Kleidungsstuecke brauche ich fuer eine Capsule Wardrobe?</h2>
            <div className="space-y-4 text-brand-secondary leading-relaxed">
              <p>
                Eine haeufig genannte Zahl sind 30 bis 40 Teile – das ist allerdings nur ein Richtwert. Die tatsaechliche Anzahl der Kleidungsstuecke haengt stark von deinem Lebensstil ab. Wer taeglich im Buero sitzt, braucht mehr Business-Outfits als jemand, der ueberwiegend im Homeoffice arbeitet. Je nach Lebensstil kann deine Capsule Wardrobe auch aus 25 oder 50 Teilen bestehen.
              </p>
              <p>
                Wichtig ist nicht die exakte Zahl, sondern dass jedes einzelne Kleidungsstueck einen Platz in deiner Garderobe verdient hat. Unterwaesche, Sportkleidung und Accessoires werden ueblicherweise separat gezaehlt. Konzentriere dich auf die Kerngarderobe: Oberteile, Unterteile, Kleider, Jacken und Schuhe. Diese Stuecke sollten sich gut miteinander kombinieren lassen, sodass du mit einer begrenzten Anzahl an Kleidungsstuecken moeglichst viele verschiedene Outfits zusammenstellen kannst.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: 4 Schritte – als nummerierte Karten */}
      <section className="py-16 md:py-20 bg-business-cream/30">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-accent mb-3 block">Anleitung</span>
            <h2 className="text-h2 font-serif text-brand-primary">In 4 Schritten zur Capsule Wardrobe</h2>
            <p className="text-brand-secondary mt-3 max-w-2xl mx-auto">
              Den eigenen minimalistischen Kleiderschrank aufzubauen muss nicht kompliziert sein. Mit diesen vier Schritten zur Capsule Wardrobe gelingt es dir, deine eigene Capsule Wardrobe zusammenstellen:
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                num: '1',
                title: 'Bestandsaufnahme deines Kleiderschranks',
                text: 'Raeume alles aus deinem Kleiderschrank und sortiere die Teile in Kategorien: Basics, Lieblingsstuecke, saisonale Teile und Teile, die du nie getragen hast. Sei ehrlich zu dir selbst – was du seit ueber einem Jahr nicht getragen hast, wirst du hoechstwahrscheinlich auch in Zukunft nicht tragen.',
              },
              {
                num: '2',
                title: 'Farbpalette und Grundfarben festlegen',
                text: 'Eine perfekte Capsule Wardrobe basiert auf einer durchdachten Farbpalette. Waehle zwei bis drei Grundfarben (z. B. Schwarz, Dunkelblau, Beige oder Grau) und ergaenze sie mit zwei bis drei Akzentfarben. Wenn deine Farben und Schnitte aufeinander abgestimmt sind, lassen sich alle Teile untereinander kombinieren.',
              },
              {
                num: '3',
                title: 'Basics und Essentials auswaehlen',
                text: 'Deine Capsule Wardrobe braucht ein solides Fundament aus Basics: eine hochwertige Bluse, gut sitzende Stoffhosen, T-Shirts und Tops in neutralen Farben, ein zeitloser Blazer und ein vielseitiger Mantel. Diese Essentials sollten langlebig, kombinierbar und von guter Qualitaet sein.',
              },
              {
                num: '4',
                title: 'Lieblingsstuecke ergaenzen',
                text: 'Ergaenze deine Basics mit Lieblingsstuecken, die deinen eigenen Stil zum Ausdruck bringen: ein besonderer Blazer, ein gemustertes Kleid, eine Tasche mit Charakter. Diese Stuecke machen deine minimalistische Garderobe einzigartig und sorgen dafuer, dass du dich stilvoll fuehlst.',
              },
            ].map((step) => (
              <div key={step.num} className="bg-white rounded-2xl p-6 md:p-8 shadow-soft border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-accent text-white rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="text-h4 font-semibold text-brand-primary mb-2">Schritt {step.num}: {step.title}</h3>
                    <p className="text-brand-secondary leading-relaxed text-sm">{step.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Zusammenstellen */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-custom max-w-3xl">
          <div className="bg-business-cream/50 rounded-2xl p-8 md:p-10 border border-business-cream">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-accent mb-3 block">Praxis-Tipps</span>
            <h2 className="text-h2 font-serif text-brand-primary mb-5">Capsule Wardrobe zusammenstellen – Worauf kommt es wirklich an?</h2>
            <div className="space-y-4 text-brand-secondary leading-relaxed">
              <p>
                Beim Capsule Wardrobe zusammenstellen geht es vor allem darum, Teile zu finden, die wirklich zu dir passen. Nicht jeder Trend ist fuer jede Frau geeignet. Achte auf Schnitte, die deine Figur vorteilhaft betonen, und auf Materialien, die sich auf der Haut gut anfuehlen. Hochwertige Stoffe wie Baumwolle, Wolle oder Seide sind langlebig und behalten auch nach vielen Waeschen ihre Form.
              </p>
              <p>
                Frage dich bei jedem neuen Kleidungsstueck: Passt es zu mindestens drei anderen Teilen in meiner Garderobe? Kann ich es sowohl im Beruf als auch in der Freizeit tragen? Wenn ja, ist es eine gute Investition. Wenn nein, lass es im Geschaeft haengen – egal wie schoen es auf dem Buegel aussieht.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MID-ARTICLE CTA */}
      <section className="py-12 md:py-16 bg-brand-accent/5 border-y border-brand-accent/20">
        <div className="container-custom max-w-3xl text-center">
          <h3 className="text-h3 font-serif text-brand-primary mb-3">Klingt nach viel Arbeit?</h3>
          <p className="text-brand-secondary mb-6 max-w-xl mx-auto">
            Lass es Anika fuer dich machen. Du bekommst einen fertigen, individuellen Plan – zugeschnitten auf dein Leben, deinen Stil und dein Budget.
          </p>
          <Link href="#bestellen">
            <span className="inline-flex items-center justify-center px-7 py-3.5 bg-brand-accent text-white font-semibold rounded-xl hover:bg-brand-accent/90 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5">
              Capsule Wardrobe bestellen – 299,- EUR
            </span>
          </Link>
        </div>
      </section>

      {/* SECTION 6: Nachhaltigkeit */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-custom max-w-3xl">
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-soft border border-gray-100">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-accent mb-3 block">Nachhaltigkeit</span>
            <h2 className="text-h2 font-serif text-brand-primary mb-5">Warum ist eine Capsule Wardrobe nachhaltig?</h2>
            <div className="space-y-4 text-brand-secondary leading-relaxed">
              <p>
                Die Fashion-Industrie ist einer der groessten Umweltverschmutzer weltweit. Fast Fashion verleitet dazu, staendig neue Kleidungsstuecke zu kaufen, die nach wenigen Wochen ihren Reiz verlieren. Eine Capsule Wardrobe ist das Gegenteil: Sie setzt auf wenige, dafuer hochwertige und langlebige Teile. Damit investierst du nicht nur in deinen Stil, sondern auch in die Umwelt.
              </p>
              <p>
                Slow Fashion bedeutet, bewusst einzukaufen und auf zeitlose und langlebige Qualitaet zu achten statt auf kurzlebige Trends. Wer seine Anzahl an Kleidungsstuecken bewusst begrenzt und gezielt in gute Stuecke investiert, reduziert Muell, spart Ressourcen und traegt nachhaltig zu einem verantwortungsvollen Konsum bei. Dein minimalistischer Kleiderschrank ist ein Statement fuer Qualitaet statt Quantitaet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: Basics – als Checkliste */}
      <section className="py-16 md:py-20 bg-business-cream/30">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-accent mb-3 block">Essentials</span>
            <h2 className="text-h2 font-serif text-brand-primary">Welche Basics gehoeren in jede Capsule Wardrobe?</h2>
            <p className="text-brand-secondary mt-3 max-w-xl mx-auto">
              Die folgenden Essentials bilden das Fundament einer funktionierenden Capsule Wardrobe – unabhaengig von deinem persoenlichen Stil:
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-soft border border-gray-100">
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'Eine weisse Bluse mit gutem Schnitt',
                'Gut sitzende dunkle Hose (Jeans oder Stoffhosen)',
                'Zeitloser Blazer in einer deiner Grundfarben',
                'Hochwertige T-Shirts und Tops in neutralen Toenen',
                'Ein Wickelkleid oder Etuikleid',
                'Stilvolle, bequeme Schuhe fuer den Alltag',
                'Ein vielseitiger Mantel fuer Herbst und Winter',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 py-2">
                  <svg className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-brand-secondary text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-brand-secondary leading-relaxed mt-6 pt-6 border-t border-gray-100 text-sm">
              Diese Basics sind zeitlos, hochwertig und miteinander kombinierbar. Sie bilden die Grundlage, auf der du mit Akzentfarben und persoenlichen Lieblingsstuecken aufbauen kannst. Achte bei der Auswahl auf hochwertige Materialien und zeitlose Schnitte – so hast du jahrelang Freude an deiner Garderobe.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 8: Saison */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-custom max-w-3xl">
          <div className="bg-business-cream/50 rounded-2xl p-8 md:p-10 border border-business-cream">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-accent mb-3 block">Organisation</span>
            <h2 className="text-h2 font-serif text-brand-primary mb-5">Wie unterteile ich meine Capsule Wardrobe nach Saison?</h2>
            <div className="space-y-4 text-brand-secondary leading-relaxed">
              <p>
                Viele Capsule Wardrobes werden saisonal organisiert: eine Zusammenstellung fuer Fruehling/Sommer und eine fuer Herbst und Winter. So kannst du die Teile, die du gerade nicht brauchst, platzsparend verstauen und deinen Kleiderschrank uebersichtlich halten. Zum Saisonwechsel tauschst du einfach die saisonale Kapsel aus.
              </p>
              <p>
                Die Grundfarben und viele Basics bleiben dabei ganzjaehrig gleich – nur die ergaenzenden Teile aendern sich. Im Sommer kommen leichtere Stoffe und hellere Akzentfarben dazu, im Winter dickere Materialien und gedecktere Toene. So bleibt deine Garderobe immer frisch, ohne dass du staendig neue Kleidungsstuecke kaufen musst.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: Stilvoll */}
      <section className="py-16 md:py-20 bg-business-cream/30">
        <div className="container-custom max-w-3xl">
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-soft border border-gray-100">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-accent mb-3 block">Stil</span>
            <h2 className="text-h2 font-serif text-brand-primary mb-5">Kann ich mit einer Capsule Wardrobe wirklich stilvoll aussehen?</h2>
            <div className="space-y-4 text-brand-secondary leading-relaxed">
              <p>
                Absolut. Eine Capsule Wardrobe bedeutet nicht, dass du jeden Tag gleich aussiehst. Im Gegenteil: Wenn alle deine Teile sich miteinander kombinieren lassen, entstehen aus 30 Kleidungsstuecken hunderte verschiedene Outfit-Kombinationen. Der Trick liegt darin, dass jedes einzelne Teil stilvoll ist und perfekt sitzt.
              </p>
              <p>
                Frauen, die eine gut durchdachte Capsule Wardrobe tragen, wirken oft besonders stilvoll – weil sie genau wissen, was ihnen steht und was sie gerne tragen. Keine Fehlkaeufe, keine Verlegenheitsloesungen. Jedes Kleidungsstueck in deinem Kleiderschrank ist ein bewusstes Statement deines persoenlichen Stils. Gerade im Business-Kontext ist das ein enormer Vorteil: Du strahlst Kompetenz und Souveraenitaet aus.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: Professionelle Beratung */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-custom max-w-3xl">
          <div className="bg-business-cream/50 rounded-2xl p-8 md:p-10 border border-business-cream">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-accent mb-3 block">Dein Vorteil</span>
            <h2 className="text-h2 font-serif text-brand-primary mb-5">Warum lohnt sich eine professionelle Capsule-Wardrobe-Beratung?</h2>
            <div className="space-y-4 text-brand-secondary leading-relaxed">
              <p>
                Natuerlich kannst du deine Capsule Wardrobe selbst erstellen. Aber seien wir ehrlich: Die meisten Kleiderschraenke zeigen, dass Eigenregie nicht immer funktioniert. Eine professionelle Beratung spart dir Zeit, Fehlkaeufe und Frust. Anika analysiert deine Angaben, deinen Lebensstil und deine Vorlieben – und erstellt dir einen fertigen Plan, den du direkt umsetzen kannst.
              </p>
              <p>
                Du erhaeltst eine individuelle Teile-Liste, eine abgestimmte Farbpalette, konkrete Kombinationsvorschlaege und Markenempfehlungen passend zu deinem Budget. Kein stundenlanges Recherchieren, kein Raetselraten. Stattdessen ein klarer Fahrplan fuer deinen minimalistischen Kleiderschrank – persoenlich erstellt von einer erfahrenen Stylistin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ZUSAMMENFASSUNG – Highlight Box */}
      <section className="py-16 md:py-20 bg-business-cream/30">
        <div className="container-custom max-w-3xl">
          <div className="bg-brand-primary rounded-2xl p-8 md:p-10 text-white">
            <h2 className="text-h2 font-serif mb-6 text-white">Zusammenfassung: Die wichtigsten Punkte</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                'Etwa 30 bis 40 Teile, die sich alle miteinander kombinieren lassen',
                'Kleiderschrank ausmisten ist der erste und wichtigste Schritt',
                'Zeitlose Basics wie Bluse, Blazer und gut sitzende Hosen',
                'Harmonische Farbpalette aus Grundfarben und Akzentfarben',
                'Bewusst und hochwertig kaufen – Slow Fashion statt Fast Fashion',
                'Jedes Teil zu mindestens drei anderen kombinierbar',
                'Lieblingsstuecke ergaenzen, die deinen Stil unterstreichen',
                'Saisonal organisieren fuer dauerhaften Ueberblick',
                'Professionelle Beratung spart Zeit, Geld und Fehlkaeufe',
              ].map((point) => (
                <div key={point} className="flex items-start gap-3 py-1.5">
                  <svg className="w-4 h-4 text-brand-accent flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-white/90 leading-relaxed">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES / WHAT YOU GET */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-accent mb-3 block">Leistungsumfang</span>
            <h2 className="text-h2 font-serif text-brand-primary mb-3">Das bekommst du</h2>
            <p className="text-brand-secondary">Dein individueller Capsule-Wardrobe-Plan, persoenlich von Anika erstellt.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { title: 'Individuelle Teile-Liste', desc: 'Exakt auf deinen Alltag, Beruf und Stil zugeschnitten.' },
              { title: 'Abgestimmte Farbpalette', desc: 'Grundfarben und Akzentfarben, die perfekt harmonieren.' },
              { title: 'Kombinationsvorschlaege', desc: 'Konkrete Outfit-Ideen fuer Beruf und Freizeit.' },
              { title: 'Marken- & Produktempfehlungen', desc: 'Passend zu deinem Budget und deinen Vorlieben.' },
              { title: 'Persoenlich erstellt', desc: 'Von Stylistin Anika – keine KI, kein Algorithmus.' },
              { title: 'Per E-Mail zugestellt', desc: 'Innerhalb von 3-5 Werktagen in deinem Postfach.' },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4 p-5 bg-business-cream/40 rounded-xl border border-business-cream/60 hover:shadow-soft transition-shadow duration-200">
                <svg className="w-6 h-6 text-brand-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="font-semibold text-brand-primary mb-1">{item.title}</h3>
                  <p className="text-sm text-brand-secondary">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 md:py-20 bg-business-cream">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-accent mb-3 block">Ablauf</span>
            <h2 className="text-h2 font-serif text-brand-primary mb-3">So funktioniert es</h2>
            <p className="text-brand-secondary">In drei einfachen Schritten zu deiner persoenlichen Capsule.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: '1', title: 'Bestellen', desc: 'Gib deine Daten ein und bezahle sicher via Stripe.' },
              { num: '2', title: 'Fragebogen', desc: 'Beantworte 8 kurze Fragen zu deinem Stil, Alltag und Vorlieben.' },
              { num: '3', title: 'Dein Plan', desc: 'Anika erstellt deinen individuellen Plan und sendet ihn per E-Mail.' },
            ].map((s) => (
              <div key={s.num} className="text-center bg-white rounded-2xl p-6 shadow-soft">
                <div className="w-12 h-12 bg-brand-accent text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
                  {s.num}
                </div>
                <h3 className="font-semibold text-brand-primary mb-2">{s.title}</h3>
                <p className="text-sm text-brand-secondary">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHECKOUT FORM */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-custom max-w-xl">
          <CapsuleCheckoutForm />
        </div>
      </section>
    </>
  );
}
