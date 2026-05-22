import { Link } from 'react-router-dom'; // Если используешь Next.js, замени на: import Link from 'next/link';
import { useApp } from '../context/AppContext'; // Проверь правильность пути к твоему контексту

const translations = {
    en: {
        title: "404",
        subtitle: "ERROR: CRITICAL_PAGE_NOT_FOUND",
        description: "The digital path you requested does not exist or has been shifted in reality. The code matrix is broken.",
        btnHome: "RETURN TO MATRIX",
    },
    ru: {
        title: "404",
        subtitle: "ОШИБКА: СТРАНИЦА_НЕ_НАЙДЕНА",
        description: "Цифровой путь, который вы запросили, не существует или был изменен в реальности. Матрица кода повреждена.",
        btnHome: "ВЕРНУТЬСЯ В МАТРИЦУ",
    },
    uz: {
        title: "404",
        subtitle: "XALOLIK: SAHIFA_TOPILMADI",
        description: "Siz so'ragan raqamli yo'l mavjud emas yoki haqiqatda o'zgartirilgan. Kod matritsasi buzilgan.",
        btnHome: "MATRITSAGA QAYTISH",
    }
};

export default function NotFound() {
    const { lang } = useApp();

    // Фоллбек на русский, если язык в контексте почему-то не совпал
    const currentLang = (translations[lang as keyof typeof translations] ? lang : 'ru') as keyof typeof translations;
    const localT = translations[currentLang];

    return (
        <div className="not-found-page">
            {/* Фоновая сетка NEXUS */}
            <div className="not-found-grid" />

            <div className="not-found-container">
                <div className="glitch-wrapper">
                    <h1 className="glitch-title" data-text={localT.title}>
                        {localT.title}
                    </h1>
                </div>

                <h2 className="not-found-subtitle">
                    <span className="terminal-cursor">&gt; </span>
                    {localT.subtitle}
                </h2>

                <p className="not-found-desc">
                    {localT.description}
                </p>

                {/* 3D Куб */}
                <div className="cube-wrapper">
                    <div className="nexus-error-cube">
                        <div className="cube-face front">&lt;404/&gt;</div>
                        <div className="cube-face back">NEXUS</div>
                        <div className="cube-face right">CYBER</div>
                        <div className="cube-face left">WEB3</div>
                        <div className="cube-face top">DEVOPS</div>
                        <div className="cube-face bottom">ERROR</div>
                    </div>
                </div>

                <div className="not-found-actions">
                    <Link to="/" className="nexus-btn-primary">
                        <span>{localT.btnHome} →</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}