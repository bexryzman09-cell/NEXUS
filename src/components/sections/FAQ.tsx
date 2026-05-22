import { useState } from 'react';
import { useApp } from '../../context/AppContext';

const FAQ_KEYS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'] as const;

export default function FAQ() {
    const { t } = useApp();
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="section" id="faq">
            <div className="container">
                <div className="section-header">
                    <div className="section-header__tag">{t('faq.tag')}</div>
                    <h2
                        className="section-header__title"
                        dangerouslySetInnerHTML={{ __html: t('faq.title') }}
                    />
                    <p className="section-header__subtitle">{t('faq.subtitle')}</p>
                </div>

                <div style={{ display: 'grid', gap: 'var(--space-md)', maxWidth: 800, marginInline: 'auto' }}>
                    {FAQ_KEYS.map((key, i) => (
                        <div
                            className={`faq-item${openIndex === i ? ' open' : ''}`}
                            key={key}
                        >
                            <div
                                className="faq-item__q"
                                onClick={() => toggle(i)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggle(i); }}
                            >
                                <span className="faq-item__q-text">{t(`faq.${key}`)}</span>
                                <span className="faq-item__icon">+</span>
                            </div>
                            <div className="faq-item__a">
                                <div className="faq-item__a-inner">
                                    {t(`faq.a${key.slice(1)}`)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
