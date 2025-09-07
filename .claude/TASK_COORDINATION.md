# Task Coordination - SEO Implementation

## Task Handoff: task-manager → automation-qa-engineer

**Date:** 2025-01-06  
**Task ID:** seo-basis-vite-react-implementation  
**Coordination Status:** READY FOR ASSIGNMENT  

## Task Assignment Details

**FROM:** @task-manager (Central Dispatcher)  
**TO:** @automation-qa-engineer (Selected Specialist Agent)  
**TASK:** Implement SEO-базис for Vite+React+Tailwind (Change Agency Website)

## Agent Selection Rationale

**automation-qa-engineer** selected based on:

1. **Technical Implementation Capabilities:**
   - Test framework design and automation
   - CI/CD pipeline integration
   - Performance testing expertise
   - Quality assurance mindset

2. **SEO-Specific Skills Match:**
   - Lighthouse CLI integration and automation
   - Accessibility testing (eslint-plugin-jsx-a11y)
   - Performance optimization and Core Web Vitals
   - Automated testing pipelines for SEO validation

3. **Project Integration:**
   - Experience with Vite/React testing setups
   - CI/CD pipeline configuration
   - Quality gates and validation frameworks
   - Test coverage analysis and reporting

## Task Context for automation-qa-engineer

### Current Project State
- **Stack:** Vite + React 18 + TypeScript + shadcn/ui + Tailwind CSS
- **Routing:** React Router DOM with client-side navigation
- **Internationalization:** i18next setup for PL/EN/RU
- **Build:** Standard Vite build process (SPA mode)

### Key Challenge
Transform existing SPA into SEO-optimized static site while:
- Maintaining current component architecture
- Preserving existing functionality
- Adding comprehensive SEO features
- Implementing quality assurance pipeline

### Primary Deliverables for automation-qa-engineer
1. **Testing Framework:** Comprehensive SEO testing suite
2. **CI/CD Integration:** Automated Lighthouse auditing
3. **Quality Gates:** Performance and accessibility validation
4. **Implementation:** Technical SEO features with TDD approach

## Technical Requirements Summary

### Must Implement:
- Static site generation (vite-plugin-ssg)
- SEO meta tag management system
- Structured data (JSON-LD) generators
- Sitemap and robots.txt automation
- Accessibility compliance (WCAG 2.1 AA)
- Performance optimization (Core Web Vitals)

### Must Test:
- Lighthouse scores (Performance ≥90, A11y ≥90, BP ≥90, SEO =100)
- HTML validation and SEO meta completeness
- JSON-LD schema validation
- Link integrity checking
- Accessibility compliance testing

### Must Automate:
- CI/CD pipeline with SEO audits
- Performance regression testing
- Accessibility validation
- Schema markup validation
- Sitemap generation and validation

## Success Criteria for automation-qa-engineer
- [ ] All 15 implementation phases completed
- [ ] Comprehensive testing suite implemented
- [ ] CI/CD pipeline with quality gates operational
- [ ] Documentation and npm scripts provided
- [ ] Performance targets achieved and maintained

## Coordination Protocol

### Progress Reporting
- Update task status in coordination system
- Report completion of each phase (1-15)
- Escalate any technical blockers to task-manager
- Document lessons learned and best practices

### Quality Assurance
- Implement TDD approach for all SEO features
- Validate each implementation phase before proceeding
- Ensure all acceptance criteria are met
- Maintain performance and accessibility standards

### Communication
- Primary contact: @task-manager for coordination
- Secondary: Direct user communication for clarifications
- Documentation: Update `.claude/` directory with progress

## Next Actions for automation-qa-engineer
1. **Accept Task Assignment:** Confirm readiness to proceed
2. **Technical Analysis:** Review current codebase and architecture
3. **Implementation Planning:** Detailed phase-by-phase breakdown
4. **Environment Setup:** Configure testing and development environment
5. **Phase 1 Execution:** Begin with SSG setup as foundation

---

**Task Coordination:** READY FOR HANDOFF  
**Specialist Agent:** @automation-qa-engineer  
**Task Manager:** @task-manager  
**Estimated Start:** Immediate upon agent acceptance