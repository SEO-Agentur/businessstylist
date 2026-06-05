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
      <section className="section-padding bg-business-cream">
        <div className="container-custom text-center max-w-3xl">
          <span className="inline-block px-4 py-1.5 bg-brand-accent/10 text-brand-accent text-sm font-semibold rounded-full mb-4">
            Individuell von Stylistin Anika erstellt
          </span>
          <h1 className="text-display-1 font-serif mb-4">
            Capsule Wardrobe erstellen: Weniger ist mehr fuer deinen minimalistischen Kleiderschrank
          </h1>
          <p className="text-body-lg text-brand-secondary max-w-2xl mx-auto mb-6">
            Du traegst immer wieder die gleichen Outfits und hast trotzdem das Gefuehl, nichts anzuziehen?
            Eine Capsule Wardrobe loest genau dieses Problem. Anika erstellt dir auf Basis deiner Angaben
            einen individuellen Plan mit Essentials, Farbpalette und konkreten Kombinationsvorschlaegen –
            fuer einen minimalistischen Kleiderschrank, der wirklich funktioniert.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="#bestellen">
              <span className="inline-flex items-center justify-center px-8 py-4 bg-brand-accent text-white font-semibold rounded-xl hover:bg-brand-accent/90 transition-colors text-lg shadow-lg">
                Jetzt Capsule Wardrobe bestellen – 79,- EUR
              </span>
            </Link>
            <span className="text-sm text-brand-secondary">Kein Abo. Einmalig.</span>
          </div>
        </div>
      </section>

      {/* ARTICLE CONTENT */}
      <article className="section-padding">
        <div className="container-custom max-w-3xl prose-custom">

          {/* H2 1 */}
          <h2>Was ist das Konzept der Capsule Wardrobe?</h2>
          <p>
            Das Konzept der Capsule Wardrobe wurde in den 1970er-Jahren von der Londonerin Susie Faux gepraegt und spaeter durch die Fashion-Industrie wiederentdeckt. Die Idee ist einfach: Statt eines ueberquellenden Kleiderschranks setzt du auf eine bewusst zusammengestellte Auswahl an Kleidungsstuecken, die sich leicht kombinieren lassen und deinen persoenlichen Stil unterstreichen. Es geht dabei nicht um Verzicht, sondern um eine durchdachte Garderobe aus hochwertigen Basics und zeitlosen Essentials.
          </p>
          <p>
            Eine gute Capsule Wardrobe besteht aus etwa 30 bis 40 Teile, die alle miteinander kombinierbar sind. Die Kollektion umfasst sowohl saisonale Stuecke als auch zeitlose Klassiker, die du das ganze Jahr tragen kannst. Das Ergebnis: Weniger Stress morgens vor dem Kleiderschrank und mehr Stil in jedem Outfit.
          </p>
          <p>
            Im Kern dreht sich alles um die Frage: Was trage ich wirklich gerne? Welche Kleidungsstuecke passen zu meinem Alltag, meinem Beruf und meiner Persoenlichkeit? Wenn du diese Fragen ehrlich beantwortest, bist du dem Ziel eines minimalistischer Kleiderschrank schon sehr nah.
          </p>

          {/* H2 2 */}
          <h2>Warum solltest du deinen Kleiderschrank ausmisten?</h2>
          <p>
            Der erste Schritt zu einer funktionierenden Capsule Wardrobe ist das Ausmisten. Die meisten von uns tragen nur 20 Prozent ihrer Garderobe regelmaessig – der Rest wird nie getragen oder hoechstens ein- bis zweimal pro Saison hervorgeholt. Kleiderschrank ausmisten bedeutet, sich ehrlich zu fragen: Habe ich dieses Kleidungsstueck im letzten Jahr getragen? Passt es noch? Fuehle ich mich darin wohl?
          </p>
          <p>
            Alles, was du nie getragen hast oder was nicht mehr zu deinem eigenen Stil passt, darf gehen. Dabei geht es nicht darum, alles wegzuwerfen – du kannst Kleidungsstuecke spenden, verkaufen oder tauschen. Das Ziel ist, deinen Kleiderschrank auf deine Lieblingsstuecke zu reduzieren. Erst wenn du weisst, was du hast und was dir fehlt, kannst du gezielt hochwertige Kleidung kaufen, die deine Capsule Wardrobe sinnvoll ergaenzt.
          </p>

          {/* H2 3 */}
          <h2>Wie viele Kleidungsstuecke brauche ich fuer eine Capsule Wardrobe?</h2>
          <p>
            Eine haeufig genannte Zahl sind 30 bis 40 Teile – das ist allerdings nur ein Richtwert. Die tatsaechliche Anzahl der Kleidungsstuecke haengt stark von deinem Lebensstil ab. Wer taeglich im Buero sitzt, braucht mehr Business-Outfits als jemand, der ueberwiegend im Homeoffice arbeitet. Je nach Lebensstil kann deine Capsule Wardrobe auch aus 25 oder 50 Teilen bestehen.
          </p>
          <p>
            Wichtig ist nicht die exakte Zahl, sondern dass jedes einzelne Kleidungsstueck einen Platz in deiner Garderobe verdient hat. Unterwaesche, Sportkleidung und Accessoires werden ueblicherweise separat gezaehlt. Konzentriere dich auf die Kerngarderobe: Oberteile, Unterteile, Kleider, Jacken und Schuhe. Diese Stuecke sollten sich gut miteinander kombinieren lassen, sodass du mit einer begrenzten Anzahl an Kleidungsstuecken moeglichst viele verschiedene Outfits zusammenstellen kannst.
          </p>

          {/* H2 4 */}
          <h2>In 4 Schritten zur Capsule Wardrobe – So gehst du vor</h2>
          <p>
            Den eigenen minimalistischen Kleiderschrank aufzubauen muss nicht kompliziert sein. Mit diesen vier Schritten zur Capsule Wardrobe gelingt es dir, deine eigene Capsule Wardrobe zusammenstellen:
          </p>

          <h3>Schritt 1: Bestandsaufnahme deines Kleiderschranks</h3>
          <p>
            Raeume alles aus deinem Kleiderschrank und sortiere die Teile in Kategorien: Basics, Lieblingsstuecke, saisonale Teile und Teile, die du nie getragen hast. Sei ehrlich zu dir selbst – was du seit ueber einem Jahr nicht getragen hast, wirst du hoechstwahrscheinlich auch in Zukunft nicht tragen. Diesen ersten Schritt kannst du an einem freien Nachmittag erledigen.
          </p>

          <h3>Schritt 2: Farbpalette und Grundfarben festlegen</h3>
          <p>
            Eine perfekte Capsule Wardrobe basiert auf einer durchdachten Farbpalette. Waehle zwei bis drei Grundfarben (z. B. Schwarz, Dunkelblau, Beige oder Grau) und ergaenze sie mit zwei bis drei Akzentfarben. Wenn deine Farben und Schnitte aufeinander abgestimmt sind, lassen sich alle Teile untereinander kombinieren. So entstehen aus wenigen Kleidungsstuecken zahlreiche Outfits.
          </p>

          <h3>Schritt 3: Basics und Essentials auswaehlen</h3>
          <p>
            Deine Capsule Wardrobe braucht ein solides Fundament aus Basics: eine hochwertige Bluse, gut sitzende Stoffhosen, T-Shirts und Tops in neutralen Farben, ein zeitloser Blazer und ein vielseitiger Mantel. Diese Essentials sollten langlebig, kombinierbar und von guter Qualitaet sein. Kaufen solltest du bewusst: Lieber ein hochwertiges Kleidungsstueck als drei guenstige, die nach einer Saison auseinanderfallen.
          </p>

          <h3>Schritt 4: Lieblingsstuecke ergaenzen und deinen Stil zum Ausdruck bringen</h3>
          <p>
            Jetzt wird es persoenlich. Ergaenze deine Basics mit Lieblingsstuecken, die deinen eigenen Stil zum Ausdruck bringen: ein besonderer Blazer, ein gemustertes Kleid, eine Tasche mit Charakter. Diese Stuecke machen deine minimalistische Garderobe einzigartig und sorgen dafuer, dass du dich stilvoll und selbstbewusst fuehlst.
          </p>

          {/* H2 5 */}
          <h2>Capsule Wardrobe zusammenstellen – Worauf kommt es wirklich an?</h2>
          <p>
            Beim Capsule Wardrobe zusammenstellen geht es vor allem darum, Teile zu finden, die wirklich zu dir passen. Nicht jeder Trend ist fuer jede Frau geeignet. Achte auf Schnitte, die deine Figur vorteilhaft betonen, und auf Materialien, die sich auf der Haut gut anfuehlen. Hochwertige Stoffe wie Baumwolle, Wolle oder Seide sind langlebig und behalten auch nach vielen Waeschen ihre Form.
          </p>
          <p>
            Frage dich bei jedem neuen Kleidungsstueck: Passt es zu mindestens drei anderen Teilen in meiner Garderobe? Kann ich es sowohl im Beruf als auch in der Freizeit tragen? Wenn ja, ist es eine gute Investition. Wenn nein, lass es im Geschaeft haengen – egal wie schoen es auf dem Buegel aussieht.
          </p>

          {/* H2 6 */}
          <h2>Warum ist eine Capsule Wardrobe nachhaltig?</h2>
          <p>
            Die Fashion-Industrie ist einer der groessten Umweltverschmutzer weltweit. Fast Fashion verleitet dazu, staendig neue Kleidungsstuecke zu kaufen, die nach wenigen Wochen ihren Reiz verlieren. Eine Capsule Wardrobe ist das Gegenteil: Sie setzt auf wenige, dafuer hochwertige und langlebige Teile. Damit investierst du nicht nur in deinen Stil, sondern auch in die Umwelt.
          </p>
          <p>
            Slow Fashion bedeutet, bewusst einzukaufen und auf zeitlose und langlebige Qualitaet zu achten statt auf kurzlebige Trends. Wer seine Anzahl an Kleidungsstuecken bewusst begrenzt und gezielt in gute Stuecke investiert, reduziert Muell, spart Ressourcen und traegt nachhaltig zu einem verantwortungsvollen Konsum bei. Dein minimalistischer Kleiderschrank ist ein Statement fuer Qualitaet statt Quantitaet.
          </p>

          {/* H2 7 */}
          <h2>Welche Basics gehoeren in jede Capsule Wardrobe?</h2>
          <p>
            Die folgenden Essentials bilden das Fundament einer funktionierenden Capsule Wardrobe – unabhaengig von deinem persoenlichen Stil:
          </p>
          <ul>
            <li>Eine weisse Bluse mit gutem Schnitt – kombinierbar zu fast allem</li>
            <li>Gut sitzende dunkle Hose (Jeans oder Stoffhosen)</li>
            <li>Zeitloser Blazer in einer deiner Grundfarben</li>
            <li>Hochwertige T-Shirts und Tops in neutralen Toenen</li>
            <li>Ein Wickelkleid oder Etuikleid fuer besondere Anlaesse</li>
            <li>Bequeme, aber stilvolle Schuhe fuer den Alltag</li>
            <li>Ein vielseitiger Mantel fuer Herbst und Winter</li>
          </ul>
          <p>
            Diese Basics sind zeitlos, hochwertig und miteinander kombinierbar. Sie bilden die Grundlage, auf der du mit Akzentfarben und persoenlichen Lieblingsstuecken aufbauen kannst. Achte bei der Auswahl auf hochwertige Materialien und zeitlose Schnitte – so hast du jahrelang Freude an deiner Garderobe.
          </p>

          {/* H2 8 */}
          <h2>Wie unterteile ich meine Capsule Wardrobe nach Saison?</h2>
          <p>
            Viele Capsule Wardrobes werden saisonal organisiert: eine Zusammenstellung fuer Fruehling/Sommer und eine fuer Herbst und Winter. So kannst du die Teile, die du gerade nicht brauchst, platzsparend verstauen und deinen Kleiderschrank uebersichtlich halten. Zum Saisonwechsel tauschst du einfach die saisonale Kapsel aus.
          </p>
          <p>
            Die Grundfarben und viele Basics bleiben dabei ganzjaehrig gleich – nur die ergaenzenden Teile aendern sich. Im Sommer kommen leichtere Stoffe und hellere Akzentfarben dazu, im Winter dickere Materialien und gedecktere Toene. So bleibt deine Garderobe immer frisch, ohne dass du staendig neue Kleidungsstuecke kaufen musst.
          </p>

          {/* H2 9 */}
          <h2>Kann ich mit einer Capsule Wardrobe wirklich stilvoll aussehen?</h2>
          <p>
            Absolut. Eine Capsule Wardrobe bedeutet nicht, dass du jeden Tag gleich aussiehst. Im Gegenteil: Wenn alle deine Teile sich miteinander kombinieren lassen, entstehen aus 30 Kleidungsstuecken hunderte verschiedene Outfit-Kombinationen. Der Trick liegt darin, dass jedes einzelne Teil stilvoll ist und perfekt sitzt.
          </p>
          <p>
            Frauen, die eine gut durchdachte Capsule Wardrobe tragen, wirken oft besonders stilvoll – weil sie genau wissen, was ihnen steht und was sie gerne tragen. Keine Fehlkaeufe, keine Verlegenheitsloesungen. Jedes Kleidungsstueck in deinem Kleiderschrank ist ein bewusstes Statement deines persoenlichen Stils. Gerade im Business-Kontext ist das ein enormer Vorteil: Du strahlst Kompetenz und Souveraenitaet aus.
          </p>

          {/* H2 10 */}
          <h2>Warum lohnt sich eine professionelle Capsule-Wardrobe-Beratung?</h2>
          <p>
            Natuerlich kannst du deine Capsule Wardrobe selbst erstellen. Aber seien wir ehrlich: Die meisten Kleiderschraenke zeigen, dass Eigenregie nicht immer funktioniert. Eine professionelle Beratung spart dir Zeit, Fehlkaeufe und Frust. Anika analysiert deine Angaben, deinen Lebensstil und deine Vorlieben – und erstellt dir einen fertigen Plan, den du direkt umsetzen kannst.
          </p>
          <p>
            Du erhaeltst eine individuelle Teile-Liste, eine abgestimmte Farbpalette, konkrete Kombinationsvorschlaege und Markenempfehlungen passend zu deinem Budget. Kein stundenlanges Recherchieren, kein Raetselraten. Stattdessen ein klarer Fahrplan fuer deinen minimalistischen Kleiderschrank – persoenlich erstellt von einer erfahrenen Stylistin.
          </p>

          {/* Summary */}
          <h2>Zusammenfassung: Die wichtigsten Punkte fuer deine Capsule Wardrobe</h2>
          <ul>
            <li>Eine Capsule Wardrobe besteht aus etwa 30 bis 40 Teilen, die sich alle miteinander kombinieren lassen</li>
            <li>Kleiderschrank ausmisten ist der erste und wichtigste Schritt</li>
            <li>Setze auf zeitlose Basics wie Bluse, Blazer und gut sitzende Hosen</li>
            <li>Waehle eine harmonische Farbpalette aus Grundfarben und Akzentfarben</li>
            <li>Kaufe bewusst und hochwertig statt guenstig und viel (Slow Fashion statt Fast Fashion)</li>
            <li>Jedes Kleidungsstueck sollte zu mindestens drei anderen Teilen kombinierbar sein</li>
            <li>Ergaenze mit Lieblingsstuecken, die deinen persoenlichen Stil unterstreichen</li>
            <li>Organisiere saisonal, um den Ueberblick zu behalten</li>
            <li>Eine professionelle Beratung spart Zeit, Geld und Fehlkaeufe</li>
          </ul>
        </div>
      </article>

      {/* FEATURES / WHAT YOU GET */}
      <section className="section-padding bg-white border-t border-gray-100">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-h2 font-serif mb-3">Das bekommst du</h2>
            <p className="text-brand-secondary">Dein individueller Capsule-Wardrobe-Plan, persoenlich von Anika erstellt.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Individuelle Teile-Liste', desc: 'Exakt auf deinen Alltag, Beruf und Stil zugeschnitten.' },
              { title: 'Abgestimmte Farbpalette', desc: 'Grundfarben und Akzentfarben, die perfekt harmonieren.' },
              { title: 'Kombinationsvorschlaege', desc: 'Konkrete Outfit-Ideen fuer Beruf und Freizeit.' },
              { title: 'Marken- & Produktempfehlungen', desc: 'Passend zu deinem Budget und deinen Vorlieben.' },
              { title: 'Persoenlich erstellt', desc: 'Von Stylistin Anika – keine KI, kein Algorithmus.' },
              { title: 'Per E-Mail zugestellt', desc: 'Innerhalb von 3-5 Werktagen in deinem Postfach.' },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4 p-5 bg-brand-light/40 rounded-xl">
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
      <section className="section-padding bg-business-cream">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-8">
            <h2 className="text-h2 font-serif mb-3">So funktioniert es</h2>
            <p className="text-brand-secondary">In drei einfachen Schritten zu deiner persoenlichen Capsule.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: '1', title: 'Bestellen', desc: 'Gib deine Daten ein und bezahle sicher via Stripe.' },
              { num: '2', title: 'Fragebogen', desc: 'Beantworte 8 kurze Fragen zu deinem Stil, Alltag und Vorlieben.' },
              { num: '3', title: 'Dein Plan', desc: 'Anika erstellt deinen individuellen Plan und sendet ihn per E-Mail.' },
            ].map((s) => (
              <div key={s.num} className="text-center">
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
      <section className="section-padding">
        <div className="container-custom max-w-xl">
          <CapsuleCheckoutForm />
        </div>
      </section>
    </>
  );
}
