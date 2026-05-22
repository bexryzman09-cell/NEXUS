import { useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { students } from '../../data/siteData';

export default function Students() {
    const { t } = useApp();
    const trackRef = useRef<HTMLDivElement>(null);
    const [scrollPos, setScrollPos] = useState(0);

    const scroll = (direction: 'left' | 'right') => {
        const track = trackRef.current;
        if (!track) return;
        const amount = 340;
        track.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
    };

    const handleScroll = () => {
        const track = trackRef.current;
        if (!track) return;
        setScrollPos(track.scrollLeft);
    };

    const maxScroll = trackRef.current
        ? trackRef.current.scrollWidth - trackRef.current.clientWidth
        : 1;
    const progress = maxScroll > 0 ? Math.round((scrollPos / maxScroll) * 100) : 0;

    return (
        <section className="section" id="students">
            <div className="container">
                <div className="section-header">
                    <div className="section-header__tag">{t('students.tag')}</div>
                    <h2
                        className="section-header__title"
                        dangerouslySetInnerHTML={{ __html: t('students.title') }}
                    />
                    <p className="section-header__subtitle">{t('students.subtitle')}</p>
                </div>

                <div className="students__track-wrap">
                    <div
                        className="students__track"
                        ref={trackRef}
                        onScroll={handleScroll}
                    >
                        {students.map((s, i) => (
                            <div className="student-card" key={i}>
                                <div className="student-card__top">
                                    <div className={`student-card__avatar ${s.avatarClass}`}>
                                        {s.initials}
                                    </div>
                                    <span className="student-card__company-badge">{s.company}</span>
                                </div>
                                <h4 className="student-card__name">{t(s.nameKey)}</h4>
                                <span className="student-card__course">{t(s.courseKey)}</span>
                                <p className="student-card__quote">{t(s.quoteKey)}</p>
                                <div className="student-card__salary">
                                    <span className="student-card__salary-label">{t('students.salary') || 'Salary'}</span>
                                    <span className="student-card__salary-value">{s.salary}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="students__controls">
                    <button className="students__nav-btn" onClick={() => scroll('left')} aria-label="Previous">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </button>
                    <span className="students__status">{progress}%</span>
                    <button className="students__nav-btn" onClick={() => scroll('right')} aria-label="Next">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}
