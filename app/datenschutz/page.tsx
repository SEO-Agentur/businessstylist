import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung | Businessstylist',
  robots: { index: true, follow: true },
};

export default function DatenschutzPage() {
  return (
    <div className="section-padding bg-business-cream">
      <div className="container-custom max-w-4xl">
        <h1 className="text-h1 mb-8">Datenschutzerklärung</h1>

        <div className="prose prose-lg max-w-none bg-white p-8 rounded-xl shadow-card space-y-6">
          <section>
            <h2>1. Datenschutz auf einen Blick</h2>
            <h3>Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
              personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene
              Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>

            <h3>Wer ist verantwortlich für die Datenerfassung?</h3>
            <p>
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen
              Kontaktdaten können Sie dem Abschnitt &quot;Hinweis zur Verantwortlichen Stelle&quot; entnehmen.
            </p>

            <h3>Welche Rechte haben Sie bezüglich Ihrer Daten?</h3>
            <p>
              Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und
              Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein
              Recht, die Berichtigung oder Löschung dieser Daten zu verlangen.
            </p>
          </section>

          <section>
            <h2>2. Hosting</h2>
            <h3>Externes Hosting</h3>
            <p>
              Diese Website wird bei Strato gehostet. Anbieter ist die Strato GmbH,
              Otto-Ostrowski-Straße 7, 10249 Berlin.
            </p>
          </section>

          <section>
            <h2>3. Allgemeine Hinweise und Pflichtinformationen</h2>
            <h3>Datenschutz</h3>
            <p>
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst.
              Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den
              gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>

            <h3>Hinweis zur verantwortlichen Stelle</h3>
            <p>
              Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
            </p>
            <p>
              businesstylist.de<br />
              Anika Schmitz<br />
              Bay Blue 2<br />
              Triq il Marfa, MLH, 9065<br />
              Mellieha, Malta
            </p>

            <h3>Speicherdauer</h3>
            <p>
              Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt
              wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die
              Datenverarbeitung entfällt.
            </p>
          </section>

          <section>
            <h2>4. Datenerfassung auf dieser Website</h2>
            <h3>Cookies</h3>
            <p>
              Unsere Internetseiten verwenden so genannte &quot;Cookies&quot;. Cookies sind kleine Datenpakete
              und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für
              die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem
              Endgerät gespeichert.
            </p>

            <h3>Kontaktformular</h3>
            <p>
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
              Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung
              der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
            </p>

            <h3>Anfrage per E-Mail, Telefon oder Telefax</h3>
            <p>
              Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive
              aller daraus hervorgehenden personenbezogenen Daten zum Zwecke der Bearbeitung Ihres
              Anliegens bei uns gespeichert und verarbeitet.
            </p>
          </section>

          <section>
            <h2>5. Analyse-Tools und Werbung</h2>
            <h3>Google Tag Manager</h3>
            <p>
              Wir setzen den Google Tag Manager ein. Anbieter ist die Google Ireland Limited, Gordon
              House, Barrow Street, Dublin 4, Irland.
            </p>

            <h3>Google Analytics</h3>
            <p>
              Diese Website nutzt Funktionen des Webanalysedienstes Google Analytics. Anbieter ist
              die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.
            </p>
          </section>

          <section>
            <h2>6. Newsletter</h2>
            <h3>Newsletterversand an Bestandskunden</h3>
            <p>
              Wenn Sie Waren oder Dienstleistungen bei uns bestellen und hierbei Ihre E-Mail-Adresse
              hinterlegen, kann diese E-Mail-Adresse in der Folge durch uns für den Versand von
              Newslettern verwendet werden.
            </p>
          </section>

          <section>
            <h2>7. Plugins und Tools</h2>
            <h3>YouTube</h3>
            <p>
              Diese Website bindet Videos der Website YouTube ein. Betreiber der Website ist die
              Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.
            </p>
          </section>

          <section>
            <h2>8. eCommerce und Zahlungsanbieter</h2>
            <h3>Verarbeiten von Kunden- und Vertragsdaten</h3>
            <p>
              Wir erheben, verarbeiten und nutzen personenbezogene Kunden- und Vertragsdaten zur
              Begründung, inhaltlichen Ausgestaltung und Änderung unserer Vertragsbeziehungen.
              Rechtsgrundlage hierfür ist Art. 6 Abs. 1 lit. b DSGVO.
            </p>
          </section>

          <div className="bg-business-cream p-6 rounded-lg border-l-4 border-business-gold">
            <p className="text-sm">
              <strong>Hinweis:</strong> Dies ist eine gekürzte Version der Datenschutzerklärung.
              Die vollständige Datenschutzerklärung mit allen Details zu den einzelnen
              Verarbeitungsvorgängen, Rechtsgrundlagen und Ihren Rechten finden Sie auf
              businessstylist.de
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
