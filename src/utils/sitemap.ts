interface SitemapUrl {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  alternates?: {
    hreflang: string;
    href: string;
  }[];
}

interface SiteConfig {
  baseUrl: string;
  defaultChangeFreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  defaultPriority: number;
}

export class SitemapGenerator {
  private config: SiteConfig;
  
  constructor(config: SiteConfig) {
    this.config = config;
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  private generateUrlElement(urlData: SitemapUrl): string {
    const { url, lastmod, changefreq, priority, alternates } = urlData;
    
    let urlXml = `  <url>
    <loc>${this.config.baseUrl}${url}</loc>`;
    
    if (lastmod) {
      urlXml += `
    <lastmod>${lastmod}</lastmod>`;
    }
    
    if (changefreq) {
      urlXml += `
    <changefreq>${changefreq}</changefreq>`;
    }
    
    if (priority !== undefined) {
      urlXml += `
    <priority>${priority.toFixed(1)}</priority>`;
    }
    
    if (alternates && alternates.length > 0) {
      alternates.forEach(alternate => {
        urlXml += `
    <xhtml:link rel="alternate" hreflang="${alternate.hreflang}" href="${alternate.href}" />`;
      });
    }
    
    urlXml += `
  </url>`;
    
    return urlXml;
  }

  generateSitemap(): string {
    const currentDate = this.formatDate(new Date());
    
    // Define all pages with their SEO properties
    const urls: SitemapUrl[] = [
      {
        url: '/',
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: 1.0,
        alternates: [
          { hreflang: 'en', href: `${this.config.baseUrl}/` },
          { hreflang: 'pl', href: `${this.config.baseUrl}/pl` },
          { hreflang: 'x-default', href: `${this.config.baseUrl}/` }
        ]
      },
      {
        url: '/#process',
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: 0.8,
        alternates: [
          { hreflang: 'en', href: `${this.config.baseUrl}/#process` },
          { hreflang: 'pl', href: `${this.config.baseUrl}/pl#process` }
        ]
      },
      {
        url: '/#results',
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: 0.8,
        alternates: [
          { hreflang: 'en', href: `${this.config.baseUrl}/#results` },
          { hreflang: 'pl', href: `${this.config.baseUrl}/pl#results` }
        ]
      },
      {
        url: '/#pricing',
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: 0.9,
        alternates: [
          { hreflang: 'en', href: `${this.config.baseUrl}/#pricing` },
          { hreflang: 'pl', href: `${this.config.baseUrl}/pl#pricing` }
        ]
      },
      {
        url: '/#brief',
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: 0.7,
        alternates: [
          { hreflang: 'en', href: `${this.config.baseUrl}/#brief` },
          { hreflang: 'pl', href: `${this.config.baseUrl}/pl#brief` }
        ]
      },
      {
        url: '/#contact',
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: 0.8,
        alternates: [
          { hreflang: 'en', href: `${this.config.baseUrl}/#contact` },
          { hreflang: 'pl', href: `${this.config.baseUrl}/pl#contact` }
        ]
      }
    ];

    const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;
    
    const xmlFooter = `</urlset>`;
    
    const urlsXml = urls.map(url => this.generateUrlElement(url)).join('\n');
    
    return `${xmlHeader}
${urlsXml}
${xmlFooter}`;
  }

  // Generate a sitemap index if you have multiple sitemaps
  generateSitemapIndex(sitemaps: { loc: string; lastmod?: string }[]): string {
    const currentDate = this.formatDate(new Date());
    
    const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
    
    const xmlFooter = `</sitemapindex>`;
    
    const sitemapsXml = sitemaps.map(sitemap => {
      let xml = `  <sitemap>
    <loc>${sitemap.loc}</loc>`;
      
      if (sitemap.lastmod) {
        xml += `
    <lastmod>${sitemap.lastmod}</lastmod>`;
      }
      
      xml += `
  </sitemap>`;
      
      return xml;
    }).join('\n');
    
    return `${xmlHeader}
${sitemapsXml}
${xmlFooter}`;
  }

  // Method to save sitemap to public directory during build
  static async generateAndSave(outputPath: string, baseUrl: string = 'https://change.studio'): Promise<void> {
    const generator = new SitemapGenerator({
      baseUrl,
      defaultChangeFreq: 'monthly',
      defaultPriority: 0.5
    });
    
    const sitemap = generator.generateSitemap();
    
    // In a real implementation, you'd write this to the file system
    // For now, we'll just return the XML content
    console.log('Generated sitemap:', sitemap);
    
    // This would typically be called during the build process
    // fs.writeFileSync(outputPath, sitemap, 'utf8');
  }
}

export default SitemapGenerator;