# Design Document

## Overview

Данный документ описывает архитектуру и дизайн-решения для реализации стиля «Смелый контраст» в React/TypeScript приложении с использованием Vite, Tailwind CSS, shadcn/ui и Framer Motion. Дизайн-система основана на принципах минимализма, высокого контраста и единого визуального мотива spray-line.

### Ключевые принципы дизайна:
- **Контраст**: Чёрно-белая база с одним акцентным цветом
- **Ритм**: Чередование светлых и тёмных секций («зебра»)
- **Фокус**: Один главный spray-штрих на экран + максимум 2 микро-штриха
- **Простота**: Минимум визуального шума, максимум функциональности

## Architecture

### Технологический стек
- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + CSS Variables
- **UI Components**: shadcn/ui (Radix UI primitives) + GlassCard система
- **Icons**: Lucide React
- **Animations**: CSS Animations для граффити-линии
- **Build Tool**: Vite
- **Fonts**: Space Grotesk (заголовки) + Inter (текст)

### Z-Index архитектура слоев
Четкая иерархия слоев для правильного отображения граффити-линии и стеклянных элементов:

1. **z-0** - Фон страницы (body background)
2. **z-5** - Глобальная граффити-линия (MainGraffitiLine)
3. **z-10** - Фон секций (SectionContainer с белым/темным фоном)
4. **z-15** - Стеклянные карточки (GlassCard с backdrop-blur)
5. **z-20** - Текст и контент внутри карточек
6. **z-50** - Header (фиксированный, поверх всего)

**Принцип работы:**
- Граффити-линия проходит между фоном страницы и фоном секций
- Создается эффект "прорезания" линии через белые/темные секции
- Стеклянные карточки парят поверх линии с полупрозрачным backdrop-blur эффектом
- Весь текстовый контент остается читаемым на самом верхнем слое

### Структура проекта
```
src/
├── components/
│   ├── ui/                    # shadcn/ui компоненты
│   ├── layout/               # Компоненты макета
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── MobileBottomBar.tsx
│   ├── sections/             # Секции страницы
│   │   ├── HeroSection.tsx
│   │   ├── PackagesSection.tsx
│   │   ├── StatsSection.tsx
│   │   ├── ProcessSection.tsx
│   │   ├── WorkSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── FAQSection.tsx
│   │   └── ContactSection.tsx
│   ├── spray/                # Spray-line компоненты
│   │   ├── SprayLine.tsx
│   │   ├── SprayUnderline.tsx
│   │   └── SprayMarker.tsx
│   └── common/               # Общие компоненты
│       ├── SectionContainer.tsx
│       ├── KPIBadge.tsx
│       └── BeforeAfterCard.tsx
├── styles/
│   ├── globals.css           # Глобальные стили и CSS переменные
│   └── spray-animations.css  # Анимации для spray-элементов
├── hooks/
│   ├── useReducedMotion.ts   # Хук для prefers-reduced-motion
│   └── useSprayAnimation.ts  # Хук для анимации spray-линий
└── utils/
    ├── cn.ts                 # Утилита для объединения классов
    └── spray-utils.ts        # Утилиты для spray-элементов
```

## Components and Interfaces

### 1. Дизайн-токены (CSS Variables)

```css
:root {
  /* Основная палитра */
  --bg: #FFFFFF;
  --fg: #0A0A0A;
  --muted: #D1D5DB;
  --muted-2: #F2F2F2;
  --accent: #3B82F6; /* или #F97316 для оранжевого */
  
  /* Тёмная секция */
  --dark-bg: #0A0A0A;
  --dark-fg: #FFFFFF;
  --dark-muted: #1F2937;
  
  /* Типографика */
  --font-heading: 'Space Grotesk', sans-serif;
  --font-body: 'Inter', sans-serif;
  
  /* Размеры (desktop) */
  --text-h1: 56px;
  --text-h2: 40px;
  --text-h3: 28px;
  --text-body: 18px;
  --text-small: 14px;
  
  /* Отступы */
  --container-max-width: 1200px;
  --container-padding-mobile: 24px;
  --container-padding-desktop: 48px;
  --section-spacing-mobile: 56px;
  --section-spacing-desktop: 80px;
  
  /* Spray-line */
  --spray-thickness-mobile: 6px;
  --spray-thickness-tablet: 10px;
  --spray-thickness-desktop: 12px;
  --spray-overspray-multiplier: 2.4;
  --spray-overspray-opacity: 0.18;
  --spray-halo-opacity: 0.15;
}
```

### 2. Базовые компоненты

#### SectionContainer
```typescript
interface SectionContainerProps {
  variant: 'light' | 'dark';
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const SectionContainer: React.FC<SectionContainerProps> = ({
  variant,
  children,
  className,
  id
}) => {
  return (
    <section
      id={id}
      className={cn(
        'py-14 md:py-20',
        variant === 'light' ? 'bg-bg text-fg' : 'bg-dark-bg text-dark-fg',
        className
      )}
    >
      <div className="container max-w-[1200px] mx-auto px-6 md:px-12">
        {children}
      </div>
    </section>
  );
};
```

#### SprayLine Component
```typescript
interface SprayLineProps {
  type: 'main' | 'micro' | 'underline';
  direction?: 'horizontal' | 'diagonal' | 'curved';
  length?: number;
  animated?: boolean;
  className?: string;
}

const SprayLine: React.FC<SprayLineProps> = ({
  type,
  direction = 'horizontal',
  length = 100,
  animated = true,
  className
}) => {
  const reducedMotion = useReducedMotion();
  
  return (
    <div className={cn('spray-line', `spray-${type}`, className)}>
      <svg
        viewBox={`0 0 ${length} 20`}
        className="spray-svg"
        style={{
          '--spray-length': `${length}px`,
          '--animation-duration': animated && !reducedMotion ? '200ms' : '0ms'
        }}
      >
        <path
          d={generateSprayPath(direction, length)}
          stroke="var(--accent)"
          strokeWidth="var(--spray-thickness-desktop)"
          fill="none"
          strokeLinecap="round"
          className="spray-main-line"
        />
        <path
          d={generateSprayPath(direction, length)}
          stroke="var(--accent)"
          strokeWidth="calc(var(--spray-thickness-desktop) * var(--spray-overspray-multiplier))"
          fill="none"
          strokeLinecap="round"
          className="spray-overspray"
          opacity="var(--spray-overspray-opacity)"
        />
      </svg>
    </div>
  );
};
```

### 3. Layout Components

#### Header
```typescript
const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-bg/95 backdrop-blur-sm border-b border-muted">
      <div className="container max-w-[1200px] mx-auto px-6 md:px-12 h-full flex items-center justify-between">
        <Logo />
        <Navigation />
        <CTAButton />
        <MobileMenuTrigger />
      </div>
    </header>
  );
};
```

#### MobileBottomBar
```typescript
const MobileBottomBar: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 h-14 bg-bg border-t border-muted md:hidden">
      <div className="flex items-center justify-around h-full">
        <QuickAction icon={Phone} label="Звонок" href="tel:+48123456789" />
        <QuickAction icon={MessageCircle} label="Чат" href="#chat" />
        <QuickAction icon={Play} label="Демо" href="#demo" />
      </div>
    </div>
  );
};
```

### 4. Section Components

#### HeroSection
```typescript
const HeroSection: React.FC = () => {
  return (
    <SectionContainer variant="light" className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="relative">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium leading-tight">
              Сайт, который просто работает.
            </h1>
            <SprayLine 
              type="underline" 
              direction="diagonal" 
              className="absolute -bottom-2 left-0" 
            />
          </div>
          
          <p className="text-lg md:text-xl text-fg/70 leading-relaxed">
            Быстро. Понятно. По делу.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="primary-button">
              Получить демо
            </Button>
            <Button variant="outline" size="lg" className="secondary-button">
              Посмотреть работы
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <KPIBadge text="Черновик 48 ч" />
            <KPIBadge text="1 раунд правок" />
            <KPIBadge text="Поддержка 30 дней" />
          </div>
        </div>
        
        <div className="flex justify-center lg:justify-end">
          <BeforeAfterCard />
        </div>
      </div>
    </SectionContainer>
  );
};
```

## Data Models

### 1. Package Model
```typescript
interface Package {
  id: string;
  name: 'Start' | 'Clarity' | 'Growth';
  price: {
    amount: number;
    currency: 'PLN';
    period?: 'month' | 'project';
  };
  features: string[];
  highlighted?: boolean;
  ctaText: string;
}
```

### 2. Testimonial Model
```typescript
interface Testimonial {
  id: string;
  content: string;
  author: {
    name: string;
    city: string;
    avatar: string;
  };
}
```

### 3. Case Study Model
```typescript
interface CaseStudy {
  id: string;
  title: string;
  challenge: string;
  solution: string;
  result: string;
  beforeImage: string;
  afterImage: string;
  tags: string[];
}
```

### 4. Process Step Model
```typescript
interface ProcessStep {
  id: string;
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
}
```

## Error Handling

### 1. Graceful Degradation
- Spray-анимации отключаются при `prefers-reduced-motion`
- Изображения имеют fallback и alt-тексты
- Формы валидируются на клиенте и сервере

### 2. Error Boundaries
```typescript
const SprayErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ErrorBoundary
      fallback={<div className="spray-fallback" />}
      onError={(error) => console.warn('Spray animation error:', error)}
    >
      {children}
    </ErrorBoundary>
  );
};
```

### 3. Loading States
- Skeleton компоненты для медленных соединений
- Progressive enhancement для spray-анимаций
- Lazy loading для изображений и тяжёлых компонентов

## Testing Strategy

### 1. Unit Tests
- Тестирование spray-утилит и хуков
- Валидация CSS переменных и токенов
- Проверка accessibility атрибутов

### 2. Integration Tests
- Тестирование взаимодействия секций
- Проверка responsive поведения
- Тестирование анимаций и переходов

### 3. Visual Regression Tests
- Скриншот-тесты для spray-элементов
- Проверка контрастности цветов
- Валидация типографической сетки

### 4. Accessibility Tests
- Automated a11y тесты с axe-core
- Keyboard navigation тесты
- Screen reader compatibility тесты

### 5. Performance Tests
- Lighthouse CI для Core Web Vitals
- Bundle size анализ
- Animation performance профилирование

## Implementation Notes

### 1. CSS Architecture
- Использование CSS Custom Properties для всех токенов
- Tailwind утилиты для быстрой разработки
- Кастомные CSS классы только для spray-анимаций

### 2. Responsive Strategy
- Mobile-first подход
- Breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- Fluid typography с clamp() для плавных переходов

### 3. Animation Performance
- CSS transforms вместо изменения layout свойств
- will-change для анимируемых элементов
- Debounced scroll listeners для performance

### 4. SEO Considerations
- Semantic HTML структура
- Proper heading hierarchy (один H1 на страницу)
- Meta tags и Open Graph данные
- Structured data для бизнес-информации

### 5. Bundle Optimization
- Tree-shaking для неиспользуемых компонентов
- Code splitting по секциям
- Lazy loading для non-critical компонентов
- WebP/AVIF изображения с fallback