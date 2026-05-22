import { useApp } from '../../context/AppContext';
import { partners } from '../../data/siteData';

export default function Partners() {
    const { t } = useApp();

    return (
        <section className="section" id="partners">
            <div className="container">
                <div className="section-header">
                    <div className="section-header__tag">{t('partners.tag')}</div>
                    <h2
                        className="section-header__title"
                        dangerouslySetInnerHTML={{ __html: t('partners.title') }}
                    />
                    <p className="section-header__subtitle">{t('partners.subtitle')}</p>
                </div>

                <div className="marquee-wrapper">
                    <div className="partners__grid">
                        {partners.map((name, i) => (
                            <div className="partner-badge" key={i}>{name}</div>
                        ))}
                        {/* Duplicate for seamless marquee loop */}
                       
                    </div>
                </div>
            </div>
        </section>
    );
}
