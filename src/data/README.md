# Pricing Data Documentation

## Overview

This directory contains the core pricing configuration for the Change Canvas website. The pricing system implements a flexible, promotion-aware structure that supports multiple packages, automated discounts, and comprehensive SEO integration.

## Files Structure

```
src/data/
├── pricing.ts          # Main pricing data configuration
└── README.md          # This documentation file
```

## Pricing Structure (Phase 1.2)

### Current Packages

| Package  | Base Price | Current Price | Description |
|----------|------------|---------------|-------------|
| **Start**    | 2,000 PLN  | 600 PLN      | Entry-level package with -70% New Client Launch promotion |
| **Standard** | 3,500 PLN  | 3,500 PLN    | Popular mid-tier package (recommended) |
| **Pro**      | 6,000 PLN  | 6,000 PLN    | Premium package for demanding projects |

### Key Features

#### Start Package (600 PLN)
- Responsive website (up to 7 pages)
- Contact form functionality  
- Basic SEO optimization
- 1 year hosting included
- 2 months technical support
- **Eligible for -70% New Client Launch promotion**

#### Standard Package (3,500 PLN) - **POPULAR/RECOMMENDED**
- Everything from Start package
- Responsive website (up to 15 pages)
- Advanced SEO + Google Analytics
- Blog/news functionality
- Social media integration
- 6 months technical support

#### Pro Package (6,000 PLN)
- Everything from Standard package
- Unlimited pages (practically)
- E-commerce functionality (up to 100 products)
- Advanced forms and functionality
- Administrative panel
- External system integrations
- 12 months technical support

## Promotion System

### Active Promotions

#### New Client Launch (-70%)
- **Target**: Start package only
- **Discount**: 70% off base price
- **Final Price**: 600 PLN (was 2,000 PLN)
- **Eligibility**: New clients only
- **Duration**: 2025-01-01 to 2025-12-31
- **Usage Limit**: 100 applications

### Technical Implementation

```typescript
// Import the pricing data
import { pricingData, getEnhancedPricingPackages } from '@/data/pricing';

// Get packages with applied promotions
const packages = getEnhancedPricingPackages();

// Check if package has promotion
import { isPackageOnPromotion, getPackagePromotion } from '@/data/pricing';
const hasPromo = isPackageOnPromotion('start'); // true
const promotion = getPackagePromotion('start'); // Promotion object
```

## Translation Keys

The pricing system integrates with the i18n translation system using standardized keys:

```
pricing.tiers.{packageId}.name          # Package name
pricing.tiers.{packageId}.price         # Display price
pricing.tiers.{packageId}.description   # Package description
pricing.tiers.{packageId}.feature1-7    # Feature descriptions
pricing.cta.order                       # "Order now" button
pricing.cta.consult                     # "Consult" button
```

### Supported Package IDs
- `start` - Entry-level package
- `standard` - Mid-tier package (popular)  
- `pro` - Premium package

## SEO Integration

### Structured Data
The pricing data automatically generates Schema.org compliant structured data for rich snippets:

```typescript
import { generateStructuredData } from '@/data/pricing';
const schemaData = generateStructuredData();
```

### Meta Information
- SEO-optimized titles and descriptions
- Currency and pricing information
- Availability status
- Valid date ranges

## Utility Functions

### Price Formatting
```typescript
import { formatPrice, formatPriceShort } from '@/data/pricing';

formatPrice(2000);        // "2 000 zł" (full format)
formatPriceShort(2000);   // "2 000" (numbers only)
```

### Package Management
```typescript
import { 
  getPackageById,
  getRecommendedPackage,
  getPackagesSortedByPrice 
} from '@/data/pricing';

const startPkg = getPackageById('start');
const recommended = getRecommendedPackage(); // Standard package
const sortedPkgs = getPackagesSortedByPrice();
```

### Savings Calculations
```typescript
import { 
  calculatePackageSavings,
  getFormattedSavings 
} from '@/data/pricing';

const savings = calculatePackageSavings('start'); // 1400
const formatted = getFormattedSavings('start'); // "Oszczędność 1400 PLN"
```

## Marketing Features

### Social Proof Data
```typescript
const marketingFeatures = {
  socialProof: {
    clientsCount: 50,
    averageRating: 4.9,
    satisfactionRate: 98
  },
  urgency: {
    limitedTimeOffer: true,
    remainingSlots: 15,
    offerEndsDate: '2025-12-31T23:59:59.999Z'
  },
  riskReduction: {
    moneyBackGuarantee: true,
    paymentAfterApproval: true,
    flexiblePaymentOptions: true
  }
};
```

## Feature Comparison Matrix

The system includes a detailed feature comparison matrix for the PricingComparison component:

- **Basic Features**: Pages, responsive design, contact forms, hosting
- **Marketing**: SEO optimization, analytics, social media integration
- **Content Management**: Blog, admin panel, content management systems
- **E-commerce**: Online store, product catalogs, payment integration  
- **Integrations**: API integrations, external systems, third-party tools
- **Support**: Duration, response times, priority support levels

## Legacy Compatibility

The pricing system maintains backward compatibility with existing components:

```typescript
import { legacyPricingMapping, getLegacyTierName } from '@/data/pricing';

// Maps new IDs to old component structure
// start → starter
// standard → business  
// pro → professional
```

## Data Validation

The pricing data includes comprehensive TypeScript type checking and runtime validation:

- Package structure validation
- Promotion eligibility checking
- Date range validation
- Price calculation verification
- Translation key structure validation

## Configuration Updates

To modify pricing data:

1. **Update Package Prices**: Modify `basePrice` and `currentPrice` in package definitions
2. **Add New Promotions**: Add to `activePromotions` array with proper conditions
3. **Update Features**: Modify the `features` array with translation keys
4. **Update Translations**: Add corresponding keys to i18n files

## Performance Considerations

- All pricing calculations are computed at build time where possible
- Structured data is generated once and cached
- Translation keys use lazy loading via i18n system
- Package data is optimized for component consumption

## Future Enhancements

Planned improvements for future phases:
- Dynamic pricing based on market conditions
- A/B testing framework for pricing experiments
- Regional pricing variations
- Multi-currency support expansion
- Advanced promotion conditions (time-based, user-based)

---

**Last Updated**: September 7, 2025  
**Version**: Phase 1.2  
**Maintainer**: Change Canvas Development Team