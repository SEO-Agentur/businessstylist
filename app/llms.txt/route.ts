export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://businessstylist.de';

  const llmsTxt = `# Businessstylist - LLM Crawler Guidance

# Projekt
Businessstylist ist eine professionelle Stilberatungs-Plattform für Business-Frauen.
Wir bieten individuelle Stilberatung, Typenanalysen, Lookbooks und Kleiderschrank-Checks.

# Hauptfunktionen
- Kostenlose Kibbe-Typenanalyse
- Professionelle Stilberatung
- Personalisierte Lookbooks
- Kleiderschrank-Check Service
- Business Outfit Guides

# Öffentliche Seiten (erlaubt für LLM Crawling)

## Marketing
${baseUrl}/
${baseUrl}/stilberatung
${baseUrl}/kibbe-body-type-test
${baseUrl}/kleiderschrank-check
${baseUrl}/lookbook
${baseUrl}/ueber-mich
${baseUrl}/kontakt
${baseUrl}/faq

## Shop
${baseUrl}/shop
${baseUrl}/shop/ebook
${baseUrl}/shop/lookbook
${baseUrl}/shop/stilberatung
${baseUrl}/shop/stilberatung-abo
${baseUrl}/shop/kleiderschrank-check

## SEO Content
${baseUrl}/business-outfit
${baseUrl}/capsule-wardrobe
${baseUrl}/farbtyp-beratung

# Geschützte Bereiche (nicht für LLM Crawling)

## Nutzerbereich
Disallow: ${baseUrl}/account
Disallow: ${baseUrl}/account/*

## Admin
Disallow: ${baseUrl}/admin
Disallow: ${baseUrl}/admin/*

## API
Disallow: ${baseUrl}/api
Disallow: ${baseUrl}/api/*

## Quiz
Disallow: ${baseUrl}/kibbe-body-type-test/start
Disallow: ${baseUrl}/kibbe-body-type-test/erfolg
Disallow: ${baseUrl}/kibbe-body-type-test/abschluss

# Kontakt & Legal
${baseUrl}/impressum
${baseUrl}/datenschutz
${baseUrl}/agb
${baseUrl}/widerruf

# Sitemap
${baseUrl}/sitemap.xml

# Kontakt
E-Mail: kontakt@businessstylist.de
Website: ${baseUrl}
`.trim();

  return new Response(llmsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
