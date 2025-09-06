import { getCurrentLanguageInfo } from '@/i18n/config';

export interface CulturalConfig {
  currency: {
    symbol: string;
    code: string;
    position: 'before' | 'after';
  };
  phoneFormat: {
    placeholder: string;
    pattern: string;
    example: string;
  };
  dateFormat: {
    locale: string;
    format: string;
  };
  businessHours: {
    timezone: string;
    hours: string;
  };
  paymentMethods: string[];
  legalCompliance: {
    privacyPolicy: string;
    terms: string;
    companyType: string;
  };
}

const culturalConfigs: Record<string, CulturalConfig> = {
  pl: {
    currency: {
      symbol: 'zł',
      code: 'PLN',
      position: 'after'
    },
    phoneFormat: {
      placeholder: '+48 123 456 789',
      pattern: '\\+48\\s\\d{3}\\s\\d{3}\\s\\d{3}',
      example: '+48 123 456 789'
    },
    dateFormat: {
      locale: 'pl-PL',
      format: 'dd.MM.yyyy'
    },
    businessHours: {
      timezone: 'CET',
      hours: '9:00 - 17:00 CET'
    },
    paymentMethods: ['BLIK', 'PayU', 'Przelewy24', 'Bank Transfer', 'Card Payment'],
    legalCompliance: {
      privacyPolicy: 'Polityka Prywatności (RODO)',
      terms: 'Regulamin',
      companyType: 'Sp. z o.o.'
    }
  },
  ru: {
    currency: {
      symbol: '₽',
      code: 'RUB',
      position: 'after'
    },
    phoneFormat: {
      placeholder: '+7 999 123 45 67',
      pattern: '\\+7\\s\\d{3}\\s\\d{3}\\s\\d{2}\\s\\d{2}',
      example: '+7 999 123 45 67'
    },
    dateFormat: {
      locale: 'ru-RU',
      format: 'dd.MM.yyyy'
    },
    businessHours: {
      timezone: 'MSK',
      hours: '9:00 - 18:00 МСК'
    },
    paymentMethods: ['СберПей', 'ЮMoney', 'Банковский перевод', 'Оплата картой', 'Наличные'],
    legalCompliance: {
      privacyPolicy: 'Политика конфиденциальности',
      terms: 'Пользовательское соглашение',
      companyType: 'ООО'
    }
  },
  en: {
    currency: {
      symbol: '$',
      code: 'USD',
      position: 'before'
    },
    phoneFormat: {
      placeholder: '+1 (555) 123-4567',
      pattern: '\\+1\\s\\(\\d{3}\\)\\s\\d{3}-\\d{4}',
      example: '+1 (555) 123-4567'
    },
    dateFormat: {
      locale: 'en-US',
      format: 'MM/dd/yyyy'
    },
    businessHours: {
      timezone: 'UTC',
      hours: '9:00 - 17:00 UTC'
    },
    paymentMethods: ['PayPal', 'Stripe', 'Credit Card', 'Bank Transfer', 'Apple Pay'],
    legalCompliance: {
      privacyPolicy: 'Privacy Policy (GDPR)',
      terms: 'Terms of Service',
      companyType: 'LLC'
    }
  }
};

export const getCurrentCulturalConfig = (): CulturalConfig => {
  const currentLang = getCurrentLanguageInfo();
  return culturalConfigs[currentLang.code] || culturalConfigs.en;
};

export const formatCurrency = (amount: number, langCode?: string): string => {
  const config = langCode ? culturalConfigs[langCode] : getCurrentCulturalConfig();
  
  if (config.currency.position === 'before') {
    return `${config.currency.symbol}${amount.toLocaleString()}`;
  } else {
    return `${amount.toLocaleString()} ${config.currency.symbol}`;
  }
};

export const formatPhoneNumber = (phone: string, langCode?: string): string => {
  const config = langCode ? culturalConfigs[langCode] : getCurrentCulturalConfig();
  // Basic phone formatting - in real implementation, use a proper phone formatting library
  return phone || config.phoneFormat.example;
};

export const formatDate = (date: Date, langCode?: string): string => {
  const config = langCode ? culturalConfigs[langCode] : getCurrentCulturalConfig();
  return new Intl.DateTimeFormat(config.dateFormat.locale).format(date);
};

export const getBusinessHours = (langCode?: string): string => {
  const config = langCode ? culturalConfigs[langCode] : getCurrentCulturalConfig();
  return config.businessHours.hours;
};

export const getPaymentMethods = (langCode?: string): string[] => {
  const config = langCode ? culturalConfigs[langCode] : getCurrentCulturalConfig();
  return config.paymentMethods;
};

export const validatePhoneNumber = (phone: string, langCode?: string): boolean => {
  const config = langCode ? culturalConfigs[langCode] : getCurrentCulturalConfig();
  const regex = new RegExp(config.phoneFormat.pattern);
  return regex.test(phone);
};

// Price ranges adapted by region
export const getPriceRanges = (langCode?: string): string[] => {
  const lang = langCode || getCurrentLanguageInfo().code;
  
  switch (lang) {
    case 'pl':
      return [
        '8,000 - 20,000 zł',
        '20,000 - 40,000 zł', 
        '40,000 - 80,000 zł',
        'Powyżej 80,000 zł'
      ];
    case 'ru':
      return [
        '150,000 - 400,000 ₽',
        '400,000 - 800,000 ₽',
        '800,000 - 1,500,000 ₽', 
        'Свыше 1,500,000 ₽'
      ];
    case 'en':
    default:
      return [
        '$2,000 - $5,000',
        '$5,000 - $10,000',
        '$10,000 - $20,000',
        '$20,000+'
      ];
  }
};

// Contact information adapted by region
export const getLocalizedContactInfo = (langCode?: string) => {
  const lang = langCode || getCurrentLanguageInfo().code;
  const config = getCurrentCulturalConfig();
  
  const contactInfo = {
    pl: {
      email: 'hello@change.studio',
      phone: '+48 123 456 789',
      address: 'ul. Główna 123, 00-001 Warszawa',
      businessHours: config.businessHours.hours
    },
    ru: {
      email: 'hello@change.studio',
      phone: '+7 999 123 45 67', 
      address: 'г. Москва, ул. Примерная, д. 123',
      businessHours: config.businessHours.hours
    },
    en: {
      email: 'hello@change.studio',
      phone: '+1 (555) 123-4567',
      address: '123 Main Street, Portland, OR 97204',
      businessHours: config.businessHours.hours
    }
  };

  return contactInfo[lang as keyof typeof contactInfo] || contactInfo.en;
};