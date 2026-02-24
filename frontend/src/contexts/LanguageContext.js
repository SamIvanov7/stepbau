import { createContext, useContext, useState, useCallback } from 'react';
import translations from '@/lib/i18n';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('de');

  const t = useCallback((key) => {
    return translations[lang]?.[key] || translations['de']?.[key] || key;
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLang(prev => prev === 'de' ? 'en' : 'de');
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
