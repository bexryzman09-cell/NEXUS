import { useApp } from '../../context/AppContext';

const MAPS_EMBED_URL =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.7!2d69.2797!3d41.33!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE5JzQ4LjAiTiA2OcKwMTYnNDYuOSJF!5e0!3m2!1sru!2s!4v1700000000000';

export default function MapSection() {
    const { t } = useApp();

    return (
        <section className="section" id="location">
            <div className="container">
                <div className="section-header">
                    <div className="section-header__tag">{t('location.tag')}</div>
                    <h2
                        className="section-header__title"
                        dangerouslySetInnerHTML={{ __html: t('location.title') }}
                    />
                    <p className="section-header__subtitle">{t('location.subtitle')}</p>
                </div>

                <div className="location__grid">
                    <div className="location__text">
                        <p>{t('location.text')}</p>
                        <ul className="location__list">
                            <li>{t('location.item1')}</li>
                            <li>{t('location.item2')}</li>
                            <li>{t('location.item3')}</li>
                        </ul>
                    </div>
                    <div className="location__map-wrap">
                        <iframe
                            className="location__map"
                            src={MAPS_EMBED_URL}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Nexus IT School location"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
