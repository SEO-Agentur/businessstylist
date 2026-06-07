export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://businessstylist.de';

  const robotsTxt = `# robots.txt for ${baseUrl}

User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /account/
Disallow: /checkout/
Disallow: /auth/
Disallow: /lookbook-gate/
Disallow: /kibbe-body-type-test/start
Disallow: /kibbe-body-type-test/erfolg
Disallow: /capsule-wardrobe/fragebogen
Disallow: /capsule-wardrobe/erfolg
Crawl-delay: 1

# Google
User-agent: Googlebot
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /account/
Disallow: /checkout/
Disallow: /auth/

# Bing
User-agent: Bingbot
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /account/
Disallow: /checkout/
Disallow: /auth/
Crawl-delay: 2

# AI crawlers - allow with restrictions
User-agent: GPTBot
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /account/
Disallow: /checkout/
Disallow: /auth/
Crawl-delay: 5

User-agent: Google-Extended
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /account/
Disallow: /checkout/
Disallow: /auth/
Crawl-delay: 5

User-agent: anthropic-ai
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /account/
Disallow: /checkout/
Disallow: /auth/
Crawl-delay: 5

User-agent: ClaudeBot
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /account/
Disallow: /checkout/
Disallow: /auth/
Crawl-delay: 5

# Block aggressive scrapers
User-agent: AhrefsBot
Crawl-delay: 10

User-agent: SemrushBot
Crawl-delay: 10

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /

Sitemap: ${baseUrl}/sitemap.xml
Host: ${baseUrl}
`;

  return new Response(robotsTxt.trim(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
