import { useApp } from '../context/AppContext';

export default function LandingHero() {
    const { t } = useApp();

    return (
        <section className="hero-section">
            {/* Декоративная фоновая сетка и элементы */}
            <div className="hero-grid-bg" />
            <div className="hero-glow" />

            <div className="hero-container">
                {/* Верхний тег / статус */}
                <div className="hero-badge">
                    <span className="badge-dot" />
                    <span className="badge-text">{t('landing.badge')}</span>
                </div>

                {/* Главный заголовок */}
                <h1 className="hero-title">
                    {t('landing.titleLight1')}{' '}
                    <span className="hero-title-accent">{t('landing.titleAccent')}</span>
                    <br />
                    {t('landing.titleLight2')}
                </h1>

                {/* Описание */}
                <p className="hero-description">
                    {t('landing.description')}
                </p>

                {/* Интерактивные теги направлений из скриншота */}
                <div className="tech-tag tag-ai">AI / ML</div>
                <div className="tech-tag tag-devops">DEVOPS</div>
                <div className="tech-tag tag-web3">WEB3</div>

                {/* Центральный 3D-куб (геометрия) */}
                <div className="cube-wrapper">
                    <div className="cyber-cube">
                        <div className="cube-face face-front">010110</div>
                        <div className="cube-face face-side">&lt;N/&gt;</div>
                        <div className="cube-face face-bottom">DEV</div>
                    </div>
                    <div className="cube-radar-rings" />
                </div>
            </div>
        </section>
    );
}