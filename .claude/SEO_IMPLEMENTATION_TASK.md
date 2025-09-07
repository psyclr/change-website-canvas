# SEO Implementation Task - Change Website Canvas

## Task Identification
**Task ID:** seo-basis-vite-react-implementation  
**Title:** Implement SEO-базис for Vite+React+Tailwind (Change Agency Website)  
**Priority:** High  
**Status:** Pending  
**Category:** Technical Implementation  
**Assigned Agent:** automation-qa-engineer  
**Estimated Effort:** 3-5 days  
**Created:** 2025-01-06  
**Created By:** task-manager  

## Project Context
**Current Stack:** Vite + React 18 + TypeScript + shadcn/ui + Tailwind CSS  
**Constraint:** No framework changes, use SSG/prerender approach  
**Current State:** SPA with client-side routing, needs static generation for SEO  

## Business Objective
Implement comprehensive SEO foundation for the Change agency website to make it indexable "out of the box" with static HTML, unique meta tags, structured data, sitemap, performance, and accessibility.

**Business Value Statement:**  
"SEO-базис от Change: статический рендер страниц, уникальные мета и каноникал, Open Graph, hreflang, структурированные данные (JSON-LD), sitemap и robots, корректные 404/301, оптимизация изображений, доступность и скорость (Core Web Vitals), автоматические проверки в CI. Ваш сайт с первого дня готов к продвижению в Google."

## Implementation Phases (15 Steps)

### Phase 1: SSG/Prerender Setup
- **Task**: Integrate vite-plugin-ssg for static generation
- **Deliverable**: Static HTML files generated in `dist/` directory
- **Technical Notes**: Configure vite-plugin-ssg to work with existing React Router setup

### Phase 2: SEO Head Component
- **Task**: Create `<SeoHead>` component with `buildMeta()` utility
- **Deliverable**: Reusable component for title/description/canonical/OG/Twitter meta tags
- **Technical Notes**: Support for dynamic meta generation based on page content

### Phase 3: Hreflang Generation
- **Task**: Generate hreflang tags for all locales (PL/EN/RU) + x-default
- **Deliverable**: Automatic hreflang tag generation for multi-language pages
- **Technical Notes**: Integrate with existing i18next setup

### Phase 4: JSON-LD Structured Data
- **Task**: Add generators for Organization/LocalBusiness, BreadcrumbList, FAQPage, Article schemas
- **Deliverable**: Dynamic JSON-LD script injection based on page type
- **Technical Notes**: Schema.org compliant structured data

### Phase 5: Sitemap & Robots
- **Task**: Build sitemap.xml (+index if needed) and robots.txt during build
- **Deliverable**: Auto-generated sitemap and robots files
- **Technical Notes**: Dynamic generation based on routes configuration

### Phase 6: Error Pages & Redirects
- **Task**: Custom 404.html; configure 301 redirects (http→https, www↔non-www, trailing slashes)
- **Deliverable**: SEO-friendly error handling and redirect configuration
- **Technical Notes**: Static 404 page with proper meta tags

### Phase 7: Internal Linking
- **Task**: Navigation/footer + `<Breadcrumbs>` component (+ JSON-LD)
- **Deliverable**: Comprehensive internal linking structure
- **Technical Notes**: Breadcrumbs with structured data integration

### Phase 8: Media Optimization
- **Task**: Implement alt texts, width/height, loading="lazy", srcset/sizes, WebP/AVIF support
- **Deliverable**: Optimized images with accessibility and performance features
- **Technical Notes**: Responsive images with modern format support

### Phase 9: A11y & Core Web Vitals
- **Task**: Add eslint-plugin-jsx-a11y, preload fonts, code-splitting
- **Deliverable**: Accessibility compliance and performance optimization
- **Technical Notes**: Focus on Core Web Vitals metrics

### Phase 10: CI Audit Pipeline
- **Task**: Lighthouse CLI, link checker, JSON-LD validator, HTML snapshots
- **Deliverable**: Automated SEO testing in CI/CD pipeline
- **Technical Notes**: GitHub Actions integration for quality gates

### Phase 11: OG Image Generation
- **Task**: Script-based OG image generation (Satori/puppeteer) with og:image integration
- **Deliverable**: Dynamic Open Graph image generation
- **Technical Notes**: Automated OG image creation for all pages

### Phase 12: Routes Configuration
- **Task**: Unified `routes.config.ts` as source of truth → meta/schemas/sitemap/hreflang
- **Deliverable**: Centralized routing and SEO configuration
- **Technical Notes**: Single source of truth for all route-related SEO data

### Phase 13: Page Templates
- **Task**: Create PageService/PageArticle/PageFaq templates with meta and breadcrumbs
- **Deliverable**: SEO-optimized page templates
- **Technical Notes**: Template system with built-in SEO features

### Phase 14: Analytics Integration
- **Task**: GA4 async integration, prepare Search Console connection
- **Deliverable**: Analytics setup with SEO tracking
- **Technical Notes**: Performance-optimized analytics integration

### Phase 15: Documentation
- **Task**: Create `docs/seo-basics.md` with npm commands reference
- **Deliverable**: Complete SEO implementation documentation
- **Technical Notes**: Developer and client-facing documentation

## Acceptance Criteria

### Technical Requirements
- [ ] Static HTML visible in `dist/` with full content, `<h1>`, meta (no JS required)
- [ ] Unique title/description/canonical on every page
- [ ] Correct hreflang between locales + x-default
- [ ] Valid JSON-LD by page type
- [ ] Generated sitemap.xml and robots.txt
- [ ] Working 404 and 301 redirects per domain policy
- [ ] Internal links and breadcrumbs present

### Performance Requirements
**Lighthouse scores (3 key pages): Performance ≥ 90, Accessibility ≥ 90, Best Practices ≥ 90, SEO = 100**

### NPM Scripts to Add
- `dev` — development server
- `build` — build + SSG
- `build:sitemaps` — generate sitemap/robots
- `gen:og` — generate OG images
- `lint:a11y` — accessibility linting
- `test:seo` — local snapshots/schema validation
- `ci:audit` — Lighthouse + link-check (for CI)

## Dependencies & Constraints
- **Dependencies:** None - standalone implementation
- **Constraints:** 
  - No framework changes allowed
  - Must work with existing Vite + React setup
  - Must maintain current component structure
  - Must support existing i18next internationalization

## Quality Gates
1. **Technical Validation**: All acceptance criteria must pass
2. **Performance Validation**: Lighthouse scores meet requirements
3. **Accessibility Validation**: WCAG 2.1 AA compliance
4. **SEO Validation**: Schema.org markup validation
5. **Integration Testing**: CI pipeline validation

## Task Assignment
**Recommended Agent:** automation-qa-engineer  
**Reason for Selection:** This task requires:
- Technical implementation expertise (React/Vite)
- Testing framework setup (Lighthouse, accessibility)
- CI/CD pipeline configuration
- Performance optimization knowledge
- Quality assurance mindset

## Next Steps
1. Confirm task acceptance with automation-qa-engineer
2. Begin with Phase 1 (SSG Setup) as foundation
3. Implement phases in sequence with validation gates
4. Document progress and learnings for future SEO projects

---
**Task Manager:** @task-manager  
**Coordination Status:** Ready for specialist agent assignment  
**Expected Completion:** Within 1 week of task start