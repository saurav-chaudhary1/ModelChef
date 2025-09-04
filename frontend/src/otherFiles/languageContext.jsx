import React, { createContext, useState, useContext , useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const seledtedLanguage = localStorage.getItem('lang') || 'en';
  const [language, setLanguage] = useState(seledtedLanguage);

  useEffect(()=>{
    localStorage.setItem('lang' , language);
  } , [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);