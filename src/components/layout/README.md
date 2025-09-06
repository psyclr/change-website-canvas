# Layout Components

This directory contains the core layout components for the Bold Contrast design system.

## Components

### SectionContainer
A flexible container component that provides consistent section styling with light/dark variants.

```tsx
import { SectionContainer } from '@/components/layout';

// Basic usage
<SectionContainer variant="light">
  <h2>Section Content</h2>
</SectionContainer>

// With grid system
<SectionContainer variant="dark" useGrid={true}>
  <div className="col-span-6">Left content</div>
  <div className="col-span-6">Right content</div>
</SectionContainer>
```

### Header
A responsive header component with navigation, mobile menu, and spray-line micro-interactions.

```tsx
import { Header } from '@/components/layout';

// Usage
<Header />
```

Features:
- Fixed positioning with backdrop blur
- Responsive navigation with mobile hamburger menu
- Spray-line hover effects on navigation links
- Quick actions in mobile menu
- Proper focus management and accessibility

### MobileBottomBar
A sticky bottom bar for mobile devices with quick action buttons.

```tsx
import { MobileBottomBar } from '@/components/layout';

// Usage
<MobileBottomBar />
```

Features:
- Hidden on desktop (md+ breakpoints)
- Three quick actions: Call, Chat, Demo
- Proper touch targets and accessibility
- Backdrop blur and border styling

## Design Tokens

All components use the Bold Contrast design tokens defined in `src/index.css`:

- `--container-max-width`: 1200px
- `--container-padding-mobile`: 24px
- `--container-padding-desktop`: 48px
- `--section-spacing-mobile`: 56px
- `--section-spacing-desktop`: 80px

## Grid System

The SectionContainer supports a 12-column grid system with responsive gaps:
- Mobile: 12px gap
- Tablet: 16px gap  
- Desktop: 24px gap

## Accessibility

All components include:
- Proper ARIA attributes
- Keyboard navigation support
- Focus ring styling
- Screen reader support
- Reduced motion support