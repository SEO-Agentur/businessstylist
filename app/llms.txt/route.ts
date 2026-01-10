export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

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
${baseUrl}/typenanalyse
${baseUrl}/kleiderschrank-check
${baseUrl}/starter-lookbook
${baseUrl}/preise
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

## Blog
${baseUrl}/blog

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
Disallow: ${baseUrl}/typenanalyse/start
Disallow: ${baseUrl}/typenanalyse/erfolg
Disallow: ${baseUrl}/typenanalyse/abschluss

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
