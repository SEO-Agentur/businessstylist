import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  // Static routes
  const staticRoutes = [
    '',
    '/stilberatung',
    '/typenanalyse',
    '/lookbook',
    '/kleiderschrank-check',
    '/dresscode-playbook',
    '/preise',
    '/ueber-mich',
    '/kontakt',
    '/faq',
    '/shop',
    '/shop/ebook',
    '/shop/lookbook',
    '/shop/stilberatung',
    '/shop/stilberatung-abo',
    '/shop/kleiderschrank-check',
    '/business-outfit',
    '/capsule-wardrobe',
    '/farbtyp-beratung',
    '/blog',
    '/impressum',
    '/datenschutz',
    '/agb',
    '/widerruf',
  ];

  const staticSitemap: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : route.startsWith('/shop') ? 0.9 : 0.8,
  }));

  // Kibbe type guide pages
  const kibbeTypes = [
    'dramatic',
    'soft-dramatic',
    'flamboyant-natural',
    'natural',
    'soft-natural',
    'dramatic-classic',
    'classic',
    'soft-classic',
    'flamboyant-gamine',
    'gamine',
    'soft-gamine',
    'romantic',
    'theatrical-romantic',
  ];

  const typeSitemap: MetadataRoute.Sitemap = kibbeTypes.map((type) => ({
    url: `${baseUrl}/stiltyp/${type}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticSitemap, ...typeSitemap];
}
