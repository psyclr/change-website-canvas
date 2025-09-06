import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslations from './locales/en/common.json';
import ruTranslations from './locales/ru/common.json';
import plTranslations from './locales/pl/common.json';

const resources = {
  en: {
    common: enTranslations,
  },
  ru: {
    common: ruTranslations,
  },
  pl: {
    common: plTranslations,
  },
};

// Geolocation-based language detection
const detectLanguageByRegion = async (): Promise<string> => {
  try {
    // Try to get user's country from IP geolocation using free service
    const response = await fetch('https://httpbin.org/ip');
    const ipData = await response.json();
    
    // For now, just use browser language as primary detection
    // In production, you can integrate with a proper geolocation service
    const browserLanguage = navigator.language.split('-')[0];
    
    // Regional language mapping based on browser locale
    const regionLanguageMap: Record<string, string> = {
      'pl': 'pl',  // Polish
      'ru': 'ru',  // Russian
      'be': 'ru',  // Belarusian → Russian
      'kk': 'ru',  // Kazakh → Russian
      'uk': 'ru',  // Ukrainian → Russian
      'ky': 'ru',  // Kyrgyz → Russian
    };

    return regionLanguageMap[browserLanguage] || 'en'; // Default to English
  } catch (error) {
    console.warn('Geolocation detection failed, falling back to browser language');
    const browserLanguage = navigator.language.split('-')[0];
    return ['pl', 'ru'].includes(browserLanguage) ? browserLanguage : 'en';
  }
};

// Custom language detector that combines geolocation with browser settings
const customDetector = {
  name: 'customDetector',
  async: true,
  detect: async (callback: (lng: string) => void) => {
    // Check if user has manually selected a language (stored in localStorage)
    const storedLanguage = localStorage.getItem('selectedLanguage');
    if (storedLanguage && ['en', 'ru', 'pl'].includes(storedLanguage)) {
      callback(storedLanguage);
      return;
    }

    // Try geolocation-based detection
    try {
      const detectedLanguage = await detectLanguageByRegion();
      callback(detectedLanguage);
    } catch {
      // Fallback to browser language
      const browserLanguage = navigator.language.split('-')[0];
      const supportedLanguage = ['en', 'ru', 'pl'].includes(browserLanguage) ? browserLanguage : 'en';
      callback(supportedLanguage);
    }
  },
};

i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    // Language detection options
    detection: {
      order: ['customDetector', 'localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'selectedLanguage',
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false, // React already does escaping
    },

    // Namespace configuration
    defaultNS: 'common',
    ns: ['common'],

    // React-specific options
    react: {
      useSuspense: false, // Disable suspense to handle loading states manually
    },
  });

// Add custom detector after initialization
i18n.services.languageDetector?.addDetector(customDetector);

// Function to change language manually
export const changeLanguage = (lng: string) => {
  if (['en', 'ru', 'pl'].includes(lng)) {
    localStorage.setItem('selectedLanguage', lng);
    i18n.changeLanguage(lng);
    
    // Update document language attribute
    document.documentElement.lang = lng;
    
    // Update URL if using routing (will be implemented later)
    // window.history.pushState({}, '', `/${lng}`);
  }
};

// Function to get current language info
export const getCurrentLanguageInfo = () => {
  const currentLang = i18n.language || 'en';
  
  const languageInfo = {
    en: { name: 'English', nativeName: 'English', flag: '🇺🇸' },
    ru: { name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
    pl: { name: 'Polish', nativeName: 'Polski', flag: '🇵🇱' },
  };
  
  return {
    code: currentLang,
    ...languageInfo[currentLang as keyof typeof languageInfo],
  };
};

export default i18n;