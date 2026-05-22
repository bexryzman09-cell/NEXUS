import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import HomePage from './pages/HomePage';
import TestPage from './pages/TestPage';
import NotFound from './pages/NotFound';
import Xus from './pages/Xus';
import Ligth from './pages/Ligth';
import Fast from './pages/Fast';
import Mp from './pages/Mp';
import Laboratory from './pages/Laboratory';
import CoursesPage from './pages/CoursesPage';

export default function App() {
  useEffect(() => {
    // 1. Находим фавиконку на странице по id
    const favicon = document.getElementById('favicon') as HTMLLinkElement | null;
    if (!favicon) return;

    // 2. Функция, которая проверяет атрибут data-theme на теге <html>
    const updateFavicon = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');

      const faviconMap: Record<string, string> = {
        'dark-blue': '/logo-blue.png',
        'dark-green': '/logo-green.png',
        'dark-orange': '/logo-orng.png',
        'light': '/logo.png'
      };

      // Меняем иконку вкладки в зависимости от того, что нашли в HTML
      favicon.href = faviconMap[currentTheme || 'dark-blue'] || '/logo.png';
    };

    // Запускаем проверку один раз при старте
    updateFavicon();

    // 3. Настраиваем слежку за изменением data-theme на самом верху (html)
    const observer = new MutationObserver(updateFavicon);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'], // следим только за темой
    });

    // Отключаем слежку при выходе из приложения
    return () => observer.disconnect();
  }, []);

  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/xus" element={<Xus />} />
          <Route path="/light" element={<Ligth />} />
          <Route path="/fast" element={<Fast />} />
          <Route path="/mp" element={<Mp />} />
          <Route path="/laboratory" element={<Laboratory />} />
          <Route path="/courses" element={<CoursesPage />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}