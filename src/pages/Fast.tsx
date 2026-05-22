import React, { useState } from 'react';
import { Link } from 'react-router';

type Lang = 'ru' | 'en' | 'uz';

interface TranslationContent {
    title: string;
    start: string;
    testing: string;
    ready: string;
    order: string;
    error: string;
    initialStatus: string;
}

const translations: Record<Lang, TranslationContent> = {
    ru: {
        title: "Тест скорости",
        start: "Старт",
        testing: "Измерение скорости...",
        ready: "Проверка завершена!",
        order: "Назад",
        error: "Ошибка теста. Попробуйте еще раз.",
        initialStatus: "Нажмите кнопку для старта"  
    },
    en: {
        title: "Speed Test",
        start: "Start",
        testing: "Measuring speed...",
        ready: "Test completed!",
        order: "Back",
        error: "Test failed. Try again.",
        initialStatus: "Press start button"
    },
    uz: {
        title: "Tezlikni o'lchash",
        start: "Boshlash",
        testing: "Tezlik o'lchanmoqda...",
        ready: "Tekshirish yakunlandi!",
        order: "Orqaga",
        error: "Xatolik. Qaytadan urinib ko'ring.",
        initialStatus: "Boshlash tugmasini bosing"
    }
};

const SpeedTest: React.FC = () => {
    const [currentLang, setCurrentLang] = useState<Lang>('ru');
    const [speed, setSpeed] = useState<string>('0');
    const [status, setStatus] = useState<string>(translations.ru.initialStatus);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const [isTesting, setIsTesting] = useState<boolean>(false);
    const [isCompleted, setIsCompleted] = useState<boolean>(false);

    const changeLang = (lang: Lang) => {
        setCurrentLang(lang);
        if (!isTesting && !isCompleted) {
            setStatus(translations[lang].initialStatus);
        } else if (isTesting) {
            setStatus(translations[lang].testing);
        } else if (isCompleted) {
            setStatus(translations[lang].ready);
        }
    };

    // Улучшенный тест скорости с отображением в реальном времени
    const startTest = () => {
        setStatus(translations[currentLang].testing);
        setIsAnimating(true);
        setIsTesting(true);
        setSpeed('0');

        const imageAddr = "https://upload.wikimedia.org/wikipedia/commons/3/3d/LARGE_elevation.jpg" + "?n=" + Math.random();

        const xhr = new XMLHttpRequest();
        const startTime = new Date().getTime();

        // Этот обработчик срабатывает МНОГО раз в процессе скачивания файла
        xhr.onprogress = (event) => {
            if (event.lengthComputable && event.loaded > 0) {
                const currentTime = new Date().getTime();
                const duration = (currentTime - startTime) / 1000; // Прошло секунд с начала теста

                if (duration > 0) {
                    const bitsLoaded = event.loaded * 8;
                    const speedBps = bitsLoaded / duration;
                    const speedMbps = (speedBps / 1024 / 1024).toFixed(1);

                    // Обновляем цифру на экране прямо сейчас!
                    setSpeed(speedMbps);
                }
            }
        };

        xhr.onload = () => {
            setIsAnimating(false);
            setIsTesting(false);
            setIsCompleted(true);
            setStatus(translations[currentLang].ready);
        };

        xhr.onerror = () => {
            setStatus(translations[currentLang].error);
            setIsAnimating(false);
            setIsTesting(false);
        };

        xhr.open("GET", imageAddr, true);
        xhr.send();
    };

    return (
        <div style={styles.body}>
            <div style={styles.container}>
                <div style={styles.langSwitcher}>
                    {(['ru', 'en', 'uz'] as Lang[]).map((lang) => (
                        <button
                            key={lang}
                            onClick={() => changeLang(lang)}
                            style={{
                                ...styles.langBtn,
                                ...(currentLang === lang ? styles.langBtnActive : {}),
                            }}
                        >
                            {lang}
                        </button>
                    ))}
                </div>

                <h1 style={styles.h1}>{translations[currentLang].title}</h1>

                <div
                    style={{
                        ...styles.speedCircle,
                        ...(isAnimating ? { animation: 'rotateLoader 2s linear infinite' } : {})
                    }}
                >
                    <style>{`
            @keyframes rotateLoader {
              0% { border-top-color: #3b82f6; transform: rotate(0deg); }
              50% { border-top-color: #ec4899; }
              100% { border-top-color: #3b82f6; transform: rotate(360deg); }
            }
          `}</style>
                    <div style={styles.speedContent}>
                        <div style={styles.speedDisplay}>{speed}</div>
                        <div style={styles.unit}>Mbps</div>
                    </div>
                </div>

                <p style={styles.statusText}>{status}</p>

                {!isCompleted ? (
                    <button
                        onClick={startTest}
                        disabled={isTesting}
                        style={{
                            ...styles.btnAction,
                            opacity: isTesting ? 0.5 : 1,
                            cursor: isTesting ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {translations[currentLang].start}
                    </button>
                ) : (
                    <Link to="/courses" style={{ ...styles.btnAction, ...styles.btnOrder }}>
                        {translations[currentLang].order}
                    </Link>
                )}
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    body: {
        boxSizing: 'border-box',
        margin: 0,
        padding: '20px',
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        background: 'linear-gradient(135deg, #0f172a, #1e1b4b)',
        color: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
    },
    container: {
        textAlign: 'center',
        background: 'rgba(255, 255, 255, 0.03)',
        padding: '40px 30px',
        borderRadius: '24px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        maxWidth: '420px',
        width: '100%',
        position: 'relative',
    },
    langSwitcher: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        display: 'flex',
        gap: '8px',
    },
    langBtn: {
        background: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        color: '#fff',
        padding: '4px 8px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.8rem',
        textTransform: 'uppercase',
        transition: 'all 0.2s',
    },
    langBtnActive: {
        background: '#3b82f6',
        borderColor: '#3b82f6',
        fontWeight: 'bold',
    },
    h1: {
        fontSize: '1.6rem',
        marginTop: '20px',
        marginBottom: '10px',
        color: '#94a3b8',
        fontWeight: 500,
    },
    speedCircle: {
        width: '200px',
        height: '200px',
        border: '6px solid rgba(255, 255, 255, 0.05)',
        borderTopColor: '#3b82f6',
        borderRadius: '50%',
        margin: '30px auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    speedContent: {
        position: 'absolute',
        textAlign: 'center',
    },
    speedDisplay: {
        fontSize: '3.5rem',
        fontWeight: 700,
        color: '#fff',
        lineHeight: 1,
    },
    unit: {
        fontSize: '1rem',
        color: '#64748b',
        marginTop: '5px',
    },
    statusText: {
        color: '#3b82f6',
        fontSize: '0.95rem',
        marginBottom: '25px',
        minHeight: '22px',
        fontWeight: 500,
    },
    btnAction: {
        display: 'block',
        width: '100%',
        padding: '16px',
        fontSize: '1.1rem',
        fontWeight: 600,
        color: '#fff',
        background: '#3b82f6',
        border: 'none',
        borderRadius: '14px',
        cursor: 'pointer',
        textDecoration: 'none',
        transition: 'all 0.2s ease',
        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
    },
    btnOrder: {
        background: 'linear-gradient(135deg, #10b981, #059669)',
        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
    },
};

export default SpeedTest;