import { useRef, useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ReactNode } from 'react';

interface StatItem {
    target: number;
    suffix: string;
    labelKey: string;
    icon: ReactNode; // Изменяем string на ReactNode
}


const stats: StatItem[] = [
    {
        target: 1200,
        suffix: '+',
        labelKey: 'stat.graduates',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
            </svg>
        )
    },
    {
        target: 24,
        suffix: '',
        labelKey: 'stat.courses',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
        )
    },
    {
        target: 50,
        suffix: '+',
        labelKey: 'stat.partners',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        )
    },
    {
        target: 99,
        suffix: '.9%',
        labelKey: 'stat.employment',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
        )
    },
];

function StatCard({ item, t }: { item: StatItem; t: (k: string) => string }) {
    const ref = useRef<HTMLDivElement>(null);
    const [display, setDisplay] = useState('0');
    const hasAnimated = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    const duration = 2000;
                    const start = performance.now();
                    const target = item.target;
                    const suffix = item.suffix;

                    const step = (now: number) => {
                        const elapsed = now - start;
                        const progress = Math.min(elapsed / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        const current = Math.round(eased * target);
                        setDisplay(current + suffix);
                        if (progress < 1) requestAnimationFrame(step);
                    };
                    requestAnimationFrame(step);
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [item.target, item.suffix]);

    return (
        <div className="stat-card" ref={ref}>
            <span className="stat-card__icon">{item.icon}</span>
            <span className="stat-card__number">{display}</span>
            <span className="stat-card__label">{t(item.labelKey)}</span>
        </div>
    );
}

export default function Stats() {
        const { t } = useApp();

        return (
            <section className="stats-section section" id="stats">
                <div className="container">
                    <div className="stats-grid">
                        {stats.map((item) => (
                            <StatCard key={item.labelKey} item={item} t={t} />
                        ))}
                    </div>
                </div>
            </section>
        );
}
