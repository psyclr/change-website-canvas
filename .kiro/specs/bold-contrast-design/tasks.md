# Implementation Planо

- [x] 1. Setup design system foundation
  - Configure CSS variables for Bold Contrast color palette and typography tokens
  - Update Tailwind config to use new design tokens and add custom utilities
  - Create base typography styles with Space Grotesk and Inter fonts
  - _Requirements: 1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 2.4, 2.5_

- [x] 2. Create core spray-line system
  - [x] 2.1 Implement spray-line utilities and path generation
    - Create spray-utils.ts with functions for generating SVG paths with noise/displacement
    - Implement different spray patterns (horizontal, diagonal, curved)
    - Add utilities for calculating spray thickness based on screen size
    - _Requirements: 4.1, 4.2, 4.7_

  - [x] 2.2 Build SprayLine component with animations
    - Create SprayLine React component with configurable props (type, direction, length)
    - Implement CSS animations for spray drawing effect (180-220ms ease-out)
    - Add overspray effect with blur and opacity
    - Create useReducedMotion hook and disable animations when preferred
    - _Requirements: 4.5, 4.6_


  - [x] 2.3 Create specialized spray components
    - Build SprayUnderline component for text underlining
    - Create SprayMarker component for FAQ and other micro-interactions
    - Implement spray halo effect for dark sections
    - _Requirements: 4.3, 4.4_

- [x] 3. Implement layout foundation
  - [x] 3.1 Create SectionContainer component
    - Build container component with light/dark variant switching
    - Implement proper spacing and grid system (12 columns)
    - Add responsive padding and max-width constraints
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

  - [x] 3.2 Build responsive Header component
    - Create fixed header with logo, navigation, and CTA button
    - Implement mobile hamburger menu with full-screen overlay
    - Add proper z-index layering and backdrop blur
    - Style navigation links with hover states and spray micro-interactions
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

  - [x] 3.3 Create MobileBottomBar component
    - Build sticky bottom bar for mobile with three quick actions (Call/Chat/Demo)
    - Add proper icons and labels using Lucide React
    - Implement responsive visibility (hidden on desktop)
    - _Requirements: 9.1_

- [x] 4. Develop UI component system
  - [x] 4.1 Create enhanced Button components
    - Extend shadcn Button with Primary variant (accent bg, white text, radius 12px)
    - Add Secondary variant (transparent with 1px border)
    - Implement hover effects (shadow increase, -1px Y transform)
    - Add focus ring styling (2px accent color with 2px offset)
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

  - [x] 4.2 Build Card components
    - Create base Card component with proper radius (12px) and shadow
    - Build GlassCard component with backdrop-blur and transparency effects
    - Create specialized glass cards: ProcessCard, MetricCard, ContactCard
    - Implement hover animations with enhanced glass effects
    - _Requirements: 8.5, 8.6, 8.7, 8.8_

  - [x] 4.3 Create Form components
    - Build enhanced Input component (44px height, 12px radius, 1px muted border)
    - Add focus states with accent ring
    - Implement error states with red text (#DC2626)
    - Create Textarea and Select variants
    - _Requirements: 8.6_

- [x] 5. Implement Hero section
  - [x] 5.1 Build HeroSection component structure
    - Create centered layout with proper spacing and typography hierarchy
    - Implement H1 with "Сайт, который просто работает." text
    - Add subtitle "Быстро. Понятно. По делу."
    - _Requirements: 6.1, 6.2_

  - [x] 5.2 Add Hero CTA buttons
    - Create Primary ("Получить демо") and Secondary ("Как работаем") CTA buttons
    - Position buttons centered below content
    - _Requirements: 6.3_

  - [x] 5.3 Create global graffiti line system
    - Build MainGraffitiLine component with hand-drawn path generation
    - Create GlobalGraffitiLine with zigzag pattern through entire site
    - Implement random curved segments with large radius (80-200px)
    - Add organic noise and natural flow effects
    - _Requirements: 6.4_

- [x] 6. Build simplified Process section
  - [x] 6.1 Create ProcessSection component
    - Build light background section with 3-4 key process steps
    - Create step cards with icons and descriptions
    - Ensure graffiti line flows naturally through section
    - Implement responsive behavior (stack on mobile)
    - _Requirements: 7.1_

- [x] 7. Implement Results section
  - [x] 7.1 Create ResultsSection component
    - Build dark background section with 2-3 key metrics
    - Create metric cards with large numbers and descriptions
    - Add proper typography hierarchy for dark theme
    - Ensure graffiti line continues through dark section
    - _Requirements: 7.2_

- [ ] 8. Build Contact section
  - [ ] 8.1 Create ContactSection component
    - Build light background section with simple contact form
    - Create contact form with essential fields (name/email/message)
    - Add primary CTA button for form submission
    - Position as final section where graffiti line ends
    - _Requirements: 7.3_

- [ ] 9. Create Footer component
  - [ ] 9.1 Build minimal Footer
    - Create simple footer with essential links and branding
    - Add proper contrast and accessibility
    - Keep minimal to maintain landing page focus
    - _Requirements: 7.3_

- [ ] 10. Implement responsive behavior
  - [ ] 10.1 Add mobile-specific adaptations
    - Adjust graffiti line thickness and curves for mobile
    - Implement proper mobile typography scaling
    - Test and fix mobile navigation and bottom bar
    - _Requirements: 9.2, 9.3, 9.4_

  - [ ] 10.2 Optimize graffiti line performance
    - Optimize SVG path generation for mobile devices
    - Reduce complexity of curves on smaller screens
    - Test performance on slower devices
    - _Requirements: 10.1, 10.2_

- [ ] 11. Implement accessibility features
  - [ ] 11.1 Add keyboard navigation support
    - Ensure all interactive elements are keyboard accessible
    - Add proper focus ring styling throughout the site
    - Test tab order and focus management
    - _Requirements: 10.3_

  - [ ] 11.2 Add ARIA attributes and screen reader support
    - Include alt attributes for all images
    - Test with screen readers and fix any issues
    - Verify WCAG AA contrast compliance
    - _Requirements: 10.4, 10.5_

- [ ] 12. Add animations and interactions
  - [ ] 12.1 Implement graffiti line animations
    - Add drawing animation for global graffiti line
    - Create scroll-triggered animation segments
    - Implement hover effects for interactive elements
    - _Requirements: 4.5, 4.6_

  - [ ] 12.2 Add reduced motion support
    - Disable graffiti line animations when prefers-reduced-motion is set
    - Test that site remains fully functional without animations
    - _Requirements: 10.6_

- [ ] 13. Final integration and testing
  - [ ] 13.1 Complete landing page integration
    - Ensure proper section flow: Hero → Process → Results → Contact
    - Test graffiti line continuity through all sections
    - Verify light → dark → light section pattern
    - _Requirements: 3.4_

  - [ ] 13.2 Cross-browser testing and optimization
    - Test graffiti line rendering across different browsers
    - Verify SVG path support and fallbacks
    - Test responsive behavior on various screen sizes
    - Optimize bundle size and loading performance
    - _Requirements: 10.1, 10.2_