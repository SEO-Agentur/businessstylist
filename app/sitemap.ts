import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://businessstylist.de';
  const now = new Date().toISOString();

  const highPriorityPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/stilberatung`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/kibbe-body-type-test`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/capsule-wardrobe`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  const servicePages: MetadataRoute.Sitemap = [
    '/kleiderschrank-check',
    '/farbtyp-beratung',
    '/dresscode-playbook',
    '/business-outfit',
    '/downloads',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const infoPages: MetadataRoute.Sitemap = [
    '/ueber-mich',
    '/kontakt',
    '/faq',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const legalPages: MetadataRoute.Sitemap = [
    '/impressum',
    '/datenschutz',
    '/agb',
    '/widerruf',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: 'yearly' as const,
    priority: 0.3,
  }));

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
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    ...highPriorityPages,
    ...servicePages,
    ...infoPages,
    ...typeSitemap,
    ...legalPages,
  ];
}
