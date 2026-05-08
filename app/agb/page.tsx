import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AGB - Allgemeine Geschäftsbedingungen | Businessstylist',
  robots: { index: true, follow: true },
  alternates: { canonical: '/agb' },
};

export default function AGBPage() {
  return (
    <div className="section-padding bg-business-cream">
      <div className="container-custom max-w-4xl">
        <h1 className="text-h1 mb-8">Allgemeine Geschäftsbedingungen</h1>

        <div className="prose prose-lg max-w-none bg-white p-8 rounded-xl shadow-card space-y-6">
          <section>
            <h2>1. Geltungsbereich</h2>
            <p>
              Für alle Bestellungen über unseren Online-Shop gelten die nachfolgenden AGB. Unser
              Online-Shop richtet sich an Verbraucher und Unternehmer.
            </p>
            <p>
              Verbraucher ist jede natürliche Person, die ein Rechtsgeschäft zu Zwecken abschließt,
              die überwiegend weder ihrer gewerblichen noch ihrer selbständigen beruflichen Tätigkeit
              zugerechnet werden können.
            </p>
          </section>

          <section>
            <h2>2. Vertragspartner, Vertragsschluss, Korrekturmöglichkeiten</h2>
            <p>
              Der Kaufvertrag kommt zustande mit businessstylist.de, Anika Schmitz.
            </p>
            <p>
              Mit Einstellung der Produkte in den Online-Shop geben wir ein verbindliches Angebot
              zum Vertragsschluss über diese Produkte ab. Der Vertrag kommt zustande, indem Sie durch
              Anklicken des Bestellbuttons das Angebot über die im Warenkorb enthaltenen Produkte
              annehmen.
            </p>
          </section>

          <section>
            <h2>3. Vertragssprache, Vertragstextspeicherung</h2>
            <p>
              Die für den Vertragsschluss zur Verfügung stehenden Sprachen: Deutsch, Englisch
            </p>
            <p>
              Wir speichern den Vertragstext und senden Ihnen die Bestelldaten und unsere AGB in
              Textform zu.
            </p>
          </section>

          <section>
            <h2>4. Lieferbedingungen</h2>
            <h3>4.1 Versandkosten</h3>
            <p>
              Bei Produkten, die versendet werden erfolgt der Standardversand versandkostenfrei ab
              einem Bestellwert in Höhe von 200 Euro inkl. MwSt.
            </p>
            <p>
              Für den Express-Versand fällt ein Zuschlag in Höhe von 15 Euro an.
            </p>
          </section>

          <section>
            <h2>5. Bezahlung</h2>
            <h3>5.1 Preise</h3>
            <p>
              Es gelten die zum Zeitpunkt der Bestellung angegebenen Preise. Diese sind Gesamtpreise
              und enthalten die gesetzliche Mehrwertsteuer.
            </p>
            <h3>5.2 Zahlungsarten</h3>
            <p>In unserem Shop stehen Ihnen grundsätzlich folgende Zahlungsarten zur Verfügung:</p>
            <ul>
              <li>Vorkasse</li>
              <li>Stripe</li>
              <li>PayPal</li>
            </ul>
          </section>

          <section>
            <h2>8. Besonderheiten bei Dienstleistungen</h2>
            <h3>8.1 Leistungsgegenstand</h3>
            <p>
              Wir bieten Dienstleistungen im Bereich Stilberatung, Farbtypbestimmung, Personal
              Shopping, Online-Beratungen sowie die Erstellung personalisierter Unterlagen
              (z. B. PDF-Auswertungen) an. Ein bestimmter Erfolg wird nicht geschuldet.
            </p>

            <h3>8.2 Durchführungszeitraum / Terminvereinbarung</h3>
            <p>
              Dienstleistungen werden zu den mit Ihnen vereinbarten Terminen durchgeführt.
              Terminverschiebungen oder -absagen müssen spätestens 24 Stunden vor dem vereinbarten
              Termin mitgeteilt werden.
            </p>

            <h3>8.3 Nicht erscheinen (&quot;No-Show&quot;)</h3>
            <p>
              Erscheinen Sie nicht zum vereinbarten Termin und erfolgt keine fristgerechte Absage,
              behalten wir uns vor, den vollen Preis der Dienstleistung in Rechnung zu stellen.
            </p>

            <h3>8.4 Mitwirkungspflichten</h3>
            <p>
              Für die Durchführung der Dienstleistung ist Ihre Mitwirkung erforderlich
              (z. B. Beantwortung von Fragebögen, Bereitstellung von Fotos). Werden notwendige
              Informationen nicht bereitgestellt, kann die Dienstleistung nicht vollständig erbracht
              werden. Ein Anspruch auf Rückerstattung besteht in diesem Fall nicht.
            </p>
          </section>

          <section>
            <h2>9. Widerrufsrecht bei Dienstleistungen & digitalen Inhalten</h2>
            <h3>9.1 Beginn der Dienstleistung</h3>
            <p>
              Das gesetzliche Widerrufsrecht erlischt, wenn Sie ausdrücklich verlangen, dass wir vor
              Ablauf der Widerrufsfrist mit der Ausführung der Dienstleistung beginnen.
            </p>

            <h3>9.2 Personalisierte Dienstleistungen und digitale Inhalte</h3>
            <p>
              Bei personalisierten Dienstleistungen, individuell erstellten Auswertungen oder
              PDF-Dokumenten besteht kein Widerrufsrecht (§ 312g Abs. 2 Nr. 1 BGB).
            </p>
          </section>

          <section>
            <h2>11. Haftung</h2>
            <p>
              Wir haften unbeschränkt für Vorsatz und grobe Fahrlässigkeit. Für leichte Fahrlässigkeit
              haften wir nur bei Verletzung wesentlicher Vertragspflichten, und zwar beschränkt auf
              den vorhersehbaren, vertragstypischen Schaden.
            </p>
            <p>
              Für subjektive Faktoren wie Stilgeschmack, Zufriedenheit mit Farbergebnissen oder
              Einkaufsergebnissen übernehmen wir keine Haftung, da diese Bewertungen individuell
              unterschiedlich ausfallen können.
            </p>
          </section>

          <section>
            <h2>13. Schlussbestimmungen</h2>
            <p>
              Für Verträge mit Verbrauchern gilt das Recht der Bundesrepublik Deutschland unter
              Ausschluss des UN-Kaufrechts.
            </p>
            <p>
              Für Verträge mit Unternehmern gilt ergänzend: Erfüllungsort und Gerichtsstand ist Malta.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
