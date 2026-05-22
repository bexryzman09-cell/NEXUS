import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext'; // Импортируем хук, чтобы не было ошибки Cannot find name 'useApp'
import { megaLabsData } from '../data/translations'; // Импортируем внешние переводы

// Подключаем твои компоненты лэйаута
import Loader from '../components/layout/Loader';
import Header from '../components/layout/Header';
import ControlPanel from '../components/layout/ControlPanel';
import CustomCursor from '../components/layout/CustomCursor';
import ScrollTop from '../components/layout/ScrollTop';
import Footer from '../components/layout/Footer';
import ToastContainer from '../components/layout/ToastContainer';

import './CoursesPage.css';

export default function NexusLabsProMatrix() {
    // Вызываем контекст
    const { lang } = useApp();

    // Достаем массив под текущий выбранный в приложении язык
    const currentLabsData = megaLabsData[lang] || megaLabsData.ru;

    return (
        <>
            <Loader />
            <CustomCursor />
            <ToastContainer />
            <ScrollTop />
            <ControlPanel />
            <Header />

            <section className="nx-pro-section">
                <div className="nx-pro-grid-bg" />

                <div className="nx-pro-container">
                    <header className="nx-pro-header">
                        <div className="nx-pro-badge">
                            <span className="nx-pro-pulse-dot" />
                            <span>NEXUS INTEGRATED SYSTEMS INFRASTRUCTURE // CORE_VIEW</span>
                        </div>
                        <h2 className="nx-pro-title">LABORATORIES EXTENDED SPECIFICATION</h2>
                        <p className="nx-pro-subtitle">
                            {lang === 'ru' && "Полная техническая документация, метрики производительности, стек технологий и прямые терминалы доступа. (создано эта часть польностью учениками NEXUS)"}
                            {lang === 'en' && "Full technical documentation, performance metrics, technology stack, and direct access terminals. (This part was created entirely by NEXUS students)"}
                            {lang === 'uz' && "To'liq texnik hujjatlar, unumdorlik ko'rsatkichlari, texnologiyalar steki va to'g'ridan-to'g'ri kirish terminallari. (Ushbu qism to'liq NEXUS talabalari tomonidan yaratilgan)"}
                        </p>
                    </header>

                    <div className="nx-pro-stack-layout">
                        {currentLabsData.map((lab) => (
                            <div key={lab.id} className={`nx-pro-card nx-pro-${lab.id}`}>
                                <div className="nx-pro-corner tl" />
                                <div className="nx-pro-corner br" />

                                <div className="nx-pro-meta-row">
                                    <span className="nx-pro-sys-code">{lab.code}</span>
                                    <span className="nx-pro-hash">{lab.hash}</span>
                                </div>

                                <div className="nx-pro-main-content">
                                    <div className="nx-pro-left-column">
                                        <h3 className="nx-pro-lab-title">{lab.title}</h3>
                                        <p className="nx-pro-lab-desc">{lab.details}</p>

                                        <div className="nx-pro-tech-box">
                                            <div className="nx-pro-label">USED_TECHNOLOGIES_STACK:</div>
                                            <div className="nx-pro-tags-flex">
                                                {lab.techStack.map((tech, idx) => (
                                                    <span key={idx} className="nx-pro-tag">{tech}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="nx-pro-right-column">
                                        <div className="nx-pro-metrics-panel">
                                            <div className="nx-pro-metric-item">
                                                <span className="m-label">COMPLEXITY:</span>
                                                <span className="m-val">{lab.metrics.complexity}</span>
                                            </div>
                                            <div className="nx-pro-metric-item">
                                                <span className="m-label">PEAK_LOAD:</span>
                                                <span className="m-val">{lab.metrics.load}</span>
                                            </div>
                                            <div className="nx-pro-metric-item">
                                                <span className="m-label">ENV_ISOLATION:</span>
                                                <span className="m-val">{lab.metrics.isolation}</span>
                                            </div>
                                        </div>

                                        <div className="nx-pro-features-box">
                                            <div className="nx-pro-label">CORE_FUNCTIONAL_TASKS:</div>
                                            <ul className="nx-pro-features-list">
                                                {lab.features.map((feat, idx) => (
                                                    <li key={idx}>
                                                        <span className="nx-pro-bullet" />
                                                        <p>{feat}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="nx-pro-action-footer">
                                    <div className="nx-pro-status-indicator">
                                        <span className="status-text">SYSTEM_STATUS: READY_FOR_DEPLOY</span>
                                    </div>

                                    <Link to={lab.target} className="nx-pro-link-btn">
                                        <span className="btn-text">
                                            {lang === 'ru' && `ЗАПУСТИТЬ ТЕРМИНАЛ ${lab.id.toUpperCase()}`}
                                            {lang === 'en' && `LAUNCH TERMINAL ${lab.id.toUpperCase()}`}
                                            {lang === 'uz' && `TERMINALNI ISHGA TUSHIRISH ${lab.id.toUpperCase()}`}
                                        </span>

                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}