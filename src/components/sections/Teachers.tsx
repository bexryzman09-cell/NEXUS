import { useState, useRef, useEffect, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { teachers, type Teacher } from '../../data/siteData';

function TeacherCard({ teacher, t, flipped, onFlip }: { teacher: Teacher; t: (k: string) => string; flipped: boolean; onFlip: () => void }) {
    return (
        <div className={`teacher-card-3d ${flipped ? 'flipped' : ''}`} onClick={onFlip}>
            <div className="teacher-card-inner">
                <div className="teacher-card-front">
                    <div className="teacher-avatar-wrap">
                        <div className={`teacher-avatar ${teacher.avatarClass}`}>{teacher.initials}</div>
                        <div className="teacher-avatar-ring" />
                    </div>
                    <div className="teacher-name">{t(teacher.nameKey)}</div>
                    <div className="teacher-role">{t(teacher.roleKey)}</div>
                    <div className="teacher-bio">{t(teacher.bioKey)}</div>
                    <div className="teacher-tags">
                        {teacher.tags.map((tag) => (
                            <span className="teacher-tag" key={tag}>{tag}</span>
                        ))}
                    </div>
                    <div className="teacher-flip-hint">{t('flip.hint')}</div>
                </div>

                <div className="teacher-card-back">
                    <div className="teacher-back-title">{t('back.stats')}</div>
                    <div className="teacher-back-stats">
                        <div className="teacher-stat">
                            <div className="teacher-stat__value">{teacher.stats.years}</div>
                            <div className="teacher-stat__label">{t('back.years')}</div>
                        </div>
                        <div className="teacher-stat">
                            <div className="teacher-stat__value">{teacher.stats.students}</div>
                            <div className="teacher-stat__label">{t('back.students')}</div>
                        </div>
                        <div className="teacher-stat">
                            <div className="teacher-stat__value">{teacher.stats.rating}</div>
                            <div className="teacher-stat__label">{t('back.rating')}</div>
                        </div>
                        <div className="teacher-stat">
                            <div className="teacher-stat__value">{teacher.stats.courses}</div>
                            <div className="teacher-stat__label">{t('back.courses2')}</div>
                        </div>
                    </div>
                    <div className="teacher-back-quote">{t(teacher.quoteKey)}</div>
                    <div className="teacher-back-links">
                        <a href="#contact" className="teacher-back-link">{t('back.apply')}</a>
                        <a href="#courses" className="teacher-back-link">{t('back.courses3')}</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Teachers() {
    const { t } = useApp();
    const trackRef = useRef<HTMLDivElement>(null);
    const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
    const [scrollPos, setScrollPos] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 800);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const handleScroll = useCallback(() => {
        const el = trackRef.current;
        if (!el) return;
        setScrollPos(el.scrollLeft / (el.scrollWidth - el.clientWidth || 1));
    }, []);

    useEffect(() => {
        const el = trackRef.current;
        if (!el) return;
        el.addEventListener('scroll', handleScroll, { passive: true });
        return () => el.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const scrollPrev = () => {
        const el = trackRef.current;
        if (!el) return;
        el.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollNext = () => {
        const el = trackRef.current;
        if (!el) return;
        el.scrollBy({ left: 300, behavior: 'smooth' });
    };

    const handleFlip = (idx: number) => {
        if (!isMobile) return;
        setFlippedIndex((prev) => (prev === idx ? null : idx));
    };

    return (
        <section className="section" id="teachers">
            <div className="container">
                <div className="section-header">
                    <span className="section-header__tag">{t('teachers.tag')}</span>
                    <h2 className="section-header__title" dangerouslySetInnerHTML={{ __html: t('teachers.title') }} />
                    <p className="section-header__subtitle">{t('teachers.subtitle')}</p>
                </div>

                <div className="carousel-track-outer">
                    <div className="teachers-carousel-track" ref={trackRef}>
                        {teachers.map((teacher, idx) => (
                            <TeacherCard
                                key={idx}
                                teacher={teacher}
                                t={t}
                                flipped={flippedIndex === idx}
                                onFlip={() => handleFlip(idx)}
                            />
                        ))}
                    </div>
                </div>

                <div className="carousel-controls">
                    <button className="carousel-btn" onClick={scrollPrev} aria-label="Previous">
                        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 4l-6 6 6 6" />
                        </svg>
                    </button>
                    <span className="carousel-status">
                        {Math.round(scrollPos * 100)}%
                    </span>
                    <button className="carousel-btn" onClick={scrollNext} aria-label="Next">
                        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M8 4l6 6-6 6" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}
