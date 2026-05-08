import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Widerrufsrecht | Businessstylist',
  robots: { index: true, follow: true },
  alternates: { canonical: '/widerruf' },
};

export default function WiderrufPage() {
  return (
    <div className="section-padding bg-business-cream">
      <div className="container-custom max-w-4xl">
        <h1 className="text-h1 mb-8">Widerrufsrecht</h1>

        <div className="prose prose-lg max-w-none bg-white p-8 rounded-xl shadow-card space-y-6">
          <div>
            <h2>Widerrufsrecht</h2>
            <p>
              Verbraucher haben ein vierzehntägiges Widerrufsrecht.
            </p>
            <p>
              Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag
              zu widerrufen.
            </p>
          </div>

          <div>
            <h2>1. Widerrufsfrist bei Waren</h2>
            <p>
              Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen
              benannter Dritter, der nicht der Beförderer ist, die Ware in Besitz genommen haben.
            </p>
          </div>

          <div>
            <h2>2. Widerrufsfrist bei Dienstleistungen</h2>
            <p>
              Bei Dienstleistungen beträgt die Widerrufsfrist vierzehn Tage ab dem Tag des
              Vertragsschlusses.
            </p>
            <p>Das Widerrufsrecht erlischt vorzeitig, wenn:</p>
            <ul>
              <li>die Dienstleistung vollständig erbracht wurde und</li>
              <li>Sie ausdrücklich zugestimmt haben, dass wir vor Ablauf der Widerrufsfrist mit
                  der Ausführung der Dienstleistung beginnen, und</li>
              <li>Sie gleichzeitig bestätigt haben, dass Sie wissen, dass Ihr Widerrufsrecht mit
                  vollständiger Vertragserfüllung erlischt.</li>
            </ul>
          </div>

          <div>
            <h2>3. Widerrufsrecht bei digitalen Inhalten</h2>
            <p>
              Digitale Inhalte sind Inhalte, die nicht auf einem körperlichen Datenträger geliefert
              werden (z. B. PDFs, digitale Guides, typisierte Dokumente, Analysen oder Auswertungen).
            </p>

            <h3>3.1 Vorproduzierte digitale Inhalte</h3>
            <p>
              Für vorproduzierte digitale Inhalte besteht grundsätzlich ein Widerrufsrecht.
              Das Widerrufsrecht erlischt jedoch, wenn Sie ausdrücklich zustimmen, dass wir vor
              Ablauf der Widerrufsfrist mit der Bereitstellung beginnen.
            </p>

            <h3>3.2 Individuell erstellte digitale Inhalte</h3>
            <p>
              Ein Widerrufsrecht besteht nicht bei personalisierten oder individuell angefertigten
              digitalen Inhalten, die nach Kundenspezifikation erstellt werden.
            </p>
          </div>

          <div>
            <h2>Ausübung des Widerrufs</h2>
            <p>
              Um Ihr Widerrufsrecht auszuüben, müssen Sie uns<br />
              (businessstylist.de, Triq il-Marfa, Bay Blue 2, MLH 90 Mellieha, Malta,<br />
              E-Mail: info@businessstylist.de, Telefon: +356 9968 3337)
            </p>
            <p>
              mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder
              eine E-Mail) über Ihren Entschluss informieren, diesen Vertrag zu widerrufen.
            </p>
          </div>

          <div>
            <h2>Folgen des Widerrufs</h2>
            <p>
              Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen
              erhalten haben, einschließlich der Lieferkosten, unverzüglich und spätestens binnen
              vierzehn Tagen ab Eingang Ihres Widerrufs zurückzuzahlen.
            </p>
          </div>

          <div>
            <h2>Muster-Widerrufsformular</h2>
            <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
              <p className="font-semibold mb-4">
                An:<br />
                businessstylist.de<br />
                Triq il-Marfa, Bay Blue 2<br />
                MLH 90 Mellieha<br />
                Malta<br />
                E-Mail: info@businessstylist.de
              </p>
              <p className="italic">
                Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über
                den Kauf der folgenden Waren (*) / die Erbringung der folgenden Dienstleistungen (*)
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>— Bestellt am (*) / erhalten am (*)</li>
                <li>— Name des/der Verbraucher(s)</li>
                <li>— Anschrift des/der Verbraucher(s)</li>
                <li>— Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier)</li>
                <li>— Datum</li>
              </ul>
              <p className="text-xs mt-4">(*) Unzutreffendes streichen.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
