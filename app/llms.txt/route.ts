export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://businessstylist.de';

  const llmsTxt = `# Businessstylist

> Professionelle Stilberatung, Farbberatung und Capsule Wardrobe Planung für Business-Frauen. Gegründet von Diplom-Kostümbildnerin Anika Schmitz mit über 10 Jahren Erfahrung als Stylistin.

## Über uns

Businessstylist bietet individuelle Stilberatung für Frauen in Führungspositionen, Gründerinnen und Selbstständige. Unser Ansatz verbindet Farbanalyse, Figurtyp-Bestimmung (Kibbe Body Type System) und persönliche Ausstrahlung zu einem System, das im Alltag Entscheidungen abnimmt.

Standort: Deutschland
Sprache: Deutsch
Gründerin: Anika Schmitz (Diplom-Kostümbildnerin FH, 7 Jahre Zalon by Zalando, Outfittery)

## Leistungen

- Stilberatung (Einzelberatung 390 EUR / Jahresabo 1.290 EUR)
- Farbtyp-Beratung nach der Vier-Jahreszeiten-Methode
- Kibbe Body Type Analyse (kostenloser Online-Test)
- Capsule Wardrobe Plan (individuell erstellt, 79 EUR)
- Kleiderschrank-Check (179 EUR)
- Digitale Lookbooks mit Outfit-Vorschlägen

## Wichtige Seiten

- [Startseite](${baseUrl}/)
- [Stilberatung](${baseUrl}/stilberatung)
- [Kibbe Body Type Test](${baseUrl}/kibbe-body-type-test)
- [Capsule Wardrobe](${baseUrl}/capsule-wardrobe)
- [Farbtyp-Beratung](${baseUrl}/farbtyp-beratung)
- [Kleiderschrank-Check](${baseUrl}/kleiderschrank-check)
- [Business Outfit Guide](${baseUrl}/business-outfit)
- [Dresscode Playbook](${baseUrl}/dresscode-playbook)
- [Shop](${baseUrl}/shop)
- [Downloads](${baseUrl}/downloads)
- [Über mich](${baseUrl}/ueber-mich)
- [FAQ](${baseUrl}/faq)
- [Kontakt](${baseUrl}/kontakt)

## Stiltyp-Guides (Kibbe System)

- [Dramatic](${baseUrl}/stiltyp/dramatic)
- [Soft Dramatic](${baseUrl}/stiltyp/soft-dramatic)
- [Flamboyant Natural](${baseUrl}/stiltyp/flamboyant-natural)
- [Natural](${baseUrl}/stiltyp/natural)
- [Soft Natural](${baseUrl}/stiltyp/soft-natural)
- [Dramatic Classic](${baseUrl}/stiltyp/dramatic-classic)
- [Classic](${baseUrl}/stiltyp/classic)
- [Soft Classic](${baseUrl}/stiltyp/soft-classic)
- [Flamboyant Gamine](${baseUrl}/stiltyp/flamboyant-gamine)
- [Gamine](${baseUrl}/stiltyp/gamine)
- [Soft Gamine](${baseUrl}/stiltyp/soft-gamine)
- [Romantic](${baseUrl}/stiltyp/romantic)
- [Theatrical Romantic](${baseUrl}/stiltyp/theatrical-romantic)

## Rechtliches

- [Impressum](${baseUrl}/impressum)
- [Datenschutz](${baseUrl}/datenschutz)
- [AGB](${baseUrl}/agb)
- [Widerruf](${baseUrl}/widerruf)

## Kontakt

- Website: ${baseUrl}
- E-Mail: kontakt@businessstylist.de
`.trim();

  return new Response(llmsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
