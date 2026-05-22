import { useState, useEffect, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { newsCards, newsData } from '../../data/siteData';

export default function News() {
    const { t, lang } = useApp();
    const [openId, setOpenId] = useState<number | null>(null);

    const openModal = (id: number) => setOpenId(id);
    const closeModal = () => setOpenId(null);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') closeModal();
    }, []);

    useEffect(() => {
        if (openId !== null) {
            document.addEventListener('keydown', handleKeyDown); 
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [openId, handleKeyDown]);

    const currentData = openId !== null ? newsData[openId] : null;

    return (
        <section className="section" id="news">
            <div className="container">
                <div className="section-header">
                    <div className="section-header__tag">{t('news.tag')}</div>
                    <h2
                        className="section-header__title"
                        dangerouslySetInnerHTML={{ __html: t('news.title') }}
                    />
                </div>

                <div className="news__grid">
                    {newsCards.map((card) => (
                        <div
                            className={`news-card${card.featured ? ' news-card--featured' : ''}`}
                            key={card.id}
                            onClick={() => openModal(card.id)}
                        >
                            <div className="news-card__img-wrap">
                                <div className={`news-card__img-placeholder ${card.imgClass}`} />
                            </div>
                            <div className="news-card__body">
                                <span className="news-card__category">{t(card.categoryKey)}</span>
                                <span className="news-card__date">{card.date}</span>
                                <h3
                                    className="news-card__title"
                                    dangerouslySetInnerHTML={{ __html: t(card.titleKey) }}
                                />
                                {card.excerptKey && (
                                    <p className="news-card__excerpt">{t(card.excerptKey)}</p>
                                )}
                                <span className="news-card__link">{t(card.linkKey)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* News Modal */}
            <div className={`modal${openId !== null ? ' modal--open' : ''}`}>
                <div className="modal__overlay" onClick={closeModal} />
                <div className="modal__content">
                    <button className="modal__close" onClick={closeModal} aria-label="Close">
                        &times;
                    </button>

                    {currentData && (
                        <>
                            <div className="modal__category">
                                {currentData.category[lang as keyof typeof currentData.category] || currentData.category.ru}
                            </div>
                            <h2 className="modal__title">
                                {currentData.title[lang as keyof typeof currentData.title] || currentData.title.ru}
                            </h2>
                            <div className="modal__date">{currentData.date}</div>
                            <p className="modal__text">
                                {currentData.text[lang as keyof typeof currentData.text] || currentData.text.ru}
                            </p>

                            <div className="modal__details">
                                {currentData.details.map((block, i) => (
                                    <div className="modal__detail-block" key={i}>
                                        <h4>{block.title}</h4>
                                        {block.text && <p>{block.text}</p>}
                                        {block.items && (
                                            <ul>
                                                {block.items.map((item, j) => (
                                                    <li key={j}>{item}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <button
                                className="btn btn--primary modal__button"
                                onClick={() => {
                                    closeModal();
                                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                {t('news.apply') || 'Apply Now'}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
