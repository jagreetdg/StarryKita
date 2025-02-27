import { createContext, useContext, useState, ReactNode } from 'react';
import { Language, translations } from './index';

type TranslationsContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (section: string, key: string) => string;
};

const TranslationsContext = createContext<TranslationsContextType | undefined>(undefined);

export function TranslationsProvider({ 
  children,
  initialLanguage = 'en'
}: { 
  children: ReactNode;
  initialLanguage?: Language;
}) {
  const [language, setLanguage] = useState<Language>(initialLanguage);

  const t = (section: string, key: string): string => {
    const sectionData = translations[section as keyof typeof translations];
    if (!sectionData) return key;

    const translationData = sectionData[key as keyof typeof sectionData];
    if (!translationData) return key;

    return translationData[language] || key;
  };

  return (
    <TranslationsContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationsContext.Provider>
  );
}

export function useTranslations() {
  const context = useContext(TranslationsContext);
  if (context === undefined) {
    throw new Error('useTranslations must be used within a TranslationsProvider');
  }
  return context;
}