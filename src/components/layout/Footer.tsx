import { useApp } from '../../context/AppContext';

export default function Footer() {
    const { t } = useApp();

    const schoolLinks = [
        { label: t('nav.about'), href: '#about' },
        { label: t('nav.teachers'), href: '#teachers' },
        { label: t('nav.students'), href: '#students' },
        { label: t('nav.news'), href: '#news' },
        { label: t('nav.faq'), href: '#faq' },
    ];

    const educationLinks = [
        { label: t('nav.courses'), href: '#courses' },
        { label: t('nav.programs'), href: '#programs' },
        { label: t('nav.test'), href: '/test' },
        { label: t('footer.apply'), href: '#contact' },
    ];

    const contactLinks = [
        { label: t('contact.addr.label'), href: '#location' },
        { label: t('contact.phone.label'), href: 'tel:+998901234567' },
        { label: t('nav.contact'), href: '#contact' },
    ];

    return (
        <footer className="footer">
            <div className="container footer__container">
                <div className="footer__top">
                    {/* Brand column */}
                    <div className="footer__brand">
                        <a href="#" className="footer__logo">
                            <span className="footer__logo-main">NEXUS</span>
                            <span className="footer__logo-sub">{t('logo.sub')}</span>
                        </a>
                        <p className="footer__tagline">{t('footer.tagline')}</p>
                    </div>

                    {/* Nav columns */}
                    <div className="footer__nav">
                        <div className="footer__nav-col">
                            <h4>{t('footer.nav.school')}</h4>
                            <ul>
                                {schoolLinks.map((link) => (
                                    <li key={link.href + link.label}>
                                        <a href={link.href}>{link.label}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="footer__nav-col">
                            <h4>{t('footer.nav.courses')}</h4>
                            <ul>
                                {educationLinks.map((link) => (
                                    <li key={link.href + link.label}>
                                        <a href={link.href}>{link.label}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="footer__nav-col">
                            <h4>{t('footer.nav.contact')}</h4>
                            <ul>
                                {contactLinks.map((link) => (
                                    <li key={link.href + link.label}>
                                        <a href={link.href}>{link.label}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="footer__bottom">
                    <span className="footer__copy">
                        &copy; {new Date().getFullYear()} NEXUS IT SCHOOL. {t('footer.rights')}
                    </span>
                </div>
            </div>

            <div className="footer__accent-line" />
        </footer>
    );
}
