import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { courses } from '../../data/siteData';

const filters = ['all', 'frontend', 'backend', 'mobile', 'ai', 'design', 'security'] as const;

const filterLabelKeys: Record<string, string> = {
    all: 'filter.all',
    frontend: 'nav.courses',
    backend: 'nav.courses',
    mobile: 'nav.courses',
    ai: 'nav.courses',
    design: 'nav.courses',
    security: 'nav.courses',
};
void filterLabelKeys;

export default function Courses() {
    const { t } = useApp();
    const [activeFilter, setActiveFilter] = useState<string>('all');

    const filterLabels: Record<string, string> = {
        all: t('filter.all'),
        frontend: 'Frontend',
        backend: 'Backend',
        mobile: 'Mobile',
        ai: 'AI',
        design: 'Design',
        security: 'Security',
    };

    return (
        <section className="section" id="courses">
            <div className="container">
                <div className="section-header">
                    <span className="section-header__tag">{t('courses.tag')}</span>
                    <h2 className="section-header__title" dangerouslySetInnerHTML={{ __html: t('courses.title') }} />
                    <p className="section-header__subtitle">{t('courses.subtitle')}</p>
                </div>

                <div className="courses__filters">
                    {filters.map((f) => (
                        <button
                            key={f}
                            className={`filter-btn ${activeFilter === f ? 'active' : ''}`}
                            onClick={() => setActiveFilter(f)}
                        >
                            {filterLabels[f]}
                        </button>
                    ))}
                </div>

                <div className="courses__grid">
                    {courses.map((course, idx) => {
                        const isHidden = activeFilter !== 'all' && course.category !== activeFilter;
                        return (
                            <div
                                className={`course-card ${isHidden ? 'hidden' : ''}`}
                                key={idx}
                                data-animate
                                data-animate-delay={course.delay ?? 0}
                            >
                                <div className="course-card__header">
                                    <span className="course-card__icon">{course.icon}</span>
                                    <span className="course-card__level">{t(course.levelKey)}</span>
                                </div>
                                <h3 className="course-card__title">{t(course.titleKey)}</h3>
                                <p className="course-card__desc">{t(course.descKey)}</p>
                                <div className="course-card__meta">
                                    <span className="course-card__duration">{t(course.durKey)}</span>
                                    <span className="course-card__format">{t(course.formatKey)}</span>
                                </div>
                                <div className="course-card__footer">
                                    <span className="course-card__price">{course.price}</span>
                                    <button className="btn btn--primary btn--sm">{t('btn.apply')}</button>
                                </div>
                                <div className="course-card__accent-line" />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
