import { useRef, useEffect, useState, useCallback } from 'react';
import { useApp } from '../../context/AppContext';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    r: number;
}

const PARTICLE_COUNT = 80;
const CONNECTION_DIST = 120;

function animateCounter(target: number, suffix: string, duration: number, callback: (v: string) => void) {
    const start = performance.now();
    const step = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);
        callback(current + suffix);
        if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
}

export default function Hero() {
    const { t } = useApp();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animFrameRef = useRef<number>(0);
    const [stat1, setStat1] = useState('0');
    const [stat2, setStat2] = useState('0');
    const [stat3, setStat3] = useState('0');
    const countersStarted = useRef(false);

    const startCounters = useCallback(() => {
        if (countersStarted.current) return;
        countersStarted.current = true;
        animateCounter(1200, '+', 2000, setStat1);
        animateCounter(24, '', 1800, setStat2);
        animateCounter(99, '.9%', 2000, setStat3);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = 0;
        let height = 0;
        let particles: Particle[] = [];

        const resize = () => {
            width = canvas!.width = canvas!.offsetWidth;
            height = canvas!.height = canvas!.offsetHeight;
        };

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.6,
                    vy: (Math.random() - 0.5) * 0.6,
                    r: Math.random() * 1.5 + 0.5,
                });
            }
        };

        const draw = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            const style = getComputedStyle(document.documentElement);
            const accent = style.getPropertyValue('--accent').trim() || '#00CFFF';

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = accent;
                ctx.globalAlpha = 0.6;
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const q = particles[j];
                    const dx = p.x - q.x;
                    const dy = p.y - q.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < CONNECTION_DIST) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(q.x, q.y);
                        ctx.strokeStyle = accent;
                        ctx.globalAlpha = 0.15 * (1 - dist / CONNECTION_DIST);
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
            ctx.globalAlpha = 1;
            animFrameRef.current = requestAnimationFrame(draw);
        };

        resize();
        initParticles();
        draw();

        window.addEventListener('resize', () => {
            resize();
            initParticles();
        });

        startCounters();

        return () => {
            cancelAnimationFrame(animFrameRef.current);
            window.removeEventListener('resize', resize);
        };
    }, [startCounters]);

    const badges = [
        { cls: 'hero__badge--1', text: 'AI/ML' },
        { cls: 'hero__badge--2', text: 'WEB3' },
        { cls: 'hero__badge--3', text: 'CYBER' },
        { cls: 'hero__badge--4', text: 'DEVOPS' },
    ];

    const cubeFaces = [
        { cls: 'hero__cube-face--front', code: '<N/>' },
        { cls: 'hero__cube-face--back', code: '&lt;code/&gt;' },
        { cls: 'hero__cube-face--right', code: 'AI_ML' },
        { cls: 'hero__cube-face--left', code: '010110' },
        { cls: 'hero__cube-face--top', code: 'NX' },
        { cls: 'hero__cube-face--bottom', code: 'DEV' },
    ];

    return (
        <section className="hero" id="hero">
            <canvas className="hero__canvas" ref={canvasRef} />
            <div className="hero__grid-overlay" />

            <div className="hero__floating-badges">
                {badges.map((b) => (
                    <div className={`hero__badge ${b.cls}`} key={b.cls}>
                        {b.text}
                    </div>
                ))}
            </div>

            <div className="hero__container container">
                <div className="hero__content">
                    <div className="hero__pre-title">
                        <span className="hero__status-dot" />
                        {t('hero.status')}
                    </div>

                    <h1 className="hero__title">
                        <span className="hero__title-line--1">{t('hero.title1')}</span>
                        <span className="hero__title-line--2">
                            <span className="glitch-text" data-glitch={t('hero.title2')}>
                                {t('hero.title2')}
                            </span>
                        </span>
                        <span className="hero__title-line--3">{t('hero.title3')}</span>
                    </h1>

                    <p className="hero__subtitle">{t('hero.subtitle')}</p>

                    <div className="hero__actions">
                        <a href="#courses" className="btn btn--primary btn--lg">
                            {t('hero.cta1')}
                            <svg className="btn__arrow" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 9h10M10 5l4 4-4 4" />
                            </svg>
                        </a>
                        <a href="#about" className="btn btn--ghost btn--lg">
                            {t('hero.cta2')}
                        </a>
                    </div>

                    <div className="hero__stats">
                        <div className="hero__stat">
                            <span className="hero__stat-value">{stat1}</span>
                            <span className="hero__stat-label">{t('hero.stat1')}</span>
                        </div>
                        <div className="hero__stat-divider" />
                        <div className="hero__stat">
                            <span className="hero__stat-value">{stat2}</span>
                            <span className="hero__stat-label">{t('hero.stat2')}</span>
                        </div>
                        <div className="hero__stat-divider" />
                        <div className="hero__stat">
                            <span className="hero__stat-value">{stat3}</span>
                            <span className="hero__stat-label">{t('hero.stat3')}</span>
                        </div>
                    </div>
                </div>

                <div className="hero__visual">
                    <div className="hero__orbit hero__orbit--1" />
                    <div className="hero__orbit hero__orbit--2" />
                    <div className="hero__orbit hero__orbit--3" />
                    <div className="hero__cube-wrap">
                        <div className="hero__cube">
                            {cubeFaces.map((f) => (
                                <div className={`hero__cube-face ${f.cls}`} key={f.cls}>
                                    <span className="hero__cube-code">{f.code}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="hero__scroll-indicator">
                <div className="hero__scroll-mouse">
                    <div className="hero__scroll-wheel" />
                </div>
                <span className="hero__scroll-text">{t('hero.scroll')}</span>
            </div>
        </section>
    );
}
