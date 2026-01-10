import { MetadataRoute } from 'next';
import { prisma } from '@/lib/db/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  // Static routes
  const staticRoutes = [
    '',
    '/stilberatung',
    '/typenanalyse',
    '/starter-lookbook',
    '/kleiderschrank-check',
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

  try {
    // Get published blog posts
    const blogPosts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });

    const blogSitemap: MetadataRoute.Sitemap = blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    // Get published pages
    const pages = await prisma.page.findMany({
      where: { status: 'PUBLISHED' },
      select: { slug: true, updatedAt: true },
    });

    const pagesSitemap: MetadataRoute.Sitemap = pages.map((page) => ({
      url: `${baseUrl}/${page.slug}`,
      lastModified: page.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    // Kibbe type guide pages (static for now)
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

    return [...staticSitemap, ...blogSitemap, ...pagesSitemap, ...typeSitemap];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return staticSitemap;
  }
}
