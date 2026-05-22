import { useState, useEffect, MouseEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

interface NavItem {
    key: string;
    href: string;
    isRoute?: boolean;
}

const NAV_ITEMS: NavItem[] = [
    { key: 'nav.about', href: '#about' },
    { key: 'nav.courses', href: '#courses' },
    { key: 'nav.programs', href: '#programs' },
    { key: 'nav.teachers', href: '#teachers' },
    { key: 'nav.students', href: '#students' },
    { key: 'nav.news', href: '#news' },
    { key: 'nav.faq', href: '#faq' },
    { key: 'nav.contact', href: '#contact' },
    { key: 'nav.test', href: '/test', isRoute: true },
    { key: 'nav.work', href: '/courses', isRoute: true },
];

export default function Header() {
    const { t } = useApp();
    const location = useLocation();
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState<boolean>(false);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    // Обработчик клика по ссылкам
    const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, item: NavItem) => {
        setMenuOpen(false);

        if (item.isRoute) {
            window.scrollTo({ top: 0 });
            return;
        }

        // Если мы на главной, делаем плавный скролл сразу
        if (location.pathname === '/') {
            e.preventDefault();
            const element = document.getElementById(item.href.replace('#', ''));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
        // Если мы НЕ на главной, Link сам перенаправит нас на /#about, а код из Шага 2 поймает это.
    };

    const handleLogoClick = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setMenuOpen(false);

        if (location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            navigate('/');
        }
    };

    return (
        <>
            <header className={`header${scrolled ? ' scrolled' : ''}`}>
                <div className="container header__container">
                    {/* Logo */}
                    <Link to="/" className="header__logo" onClick={handleLogoClick}>
                        <div className="header__logo-icon">
                            <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                                <polygon points="30,2 57,17 57,47 30,62 3,47 3,17" stroke="var(--accent)" strokeWidth="2" fill="none" className="logo-hex" />
                                <polygon points="30,10 50,21 50,43 30,54 10,43 10,21" stroke="var(--accent)" strokeWidth="1.5" fill="var(--primary)" fillOpacity="0.1" />
                                <text x="30" y="36" textAnchor="middle" fill="var(--accent)" fontFamily="Orbitron,sans-serif" fontSize="14" fontWeight="700">NX</text>
                            </svg>
                        </div>
                        <div className="header__logo-text">
                            <span className="header__logo-main">NEXUS</span>
                            <span className="header__logo-sub">{t('logo.sub')}</span>
                        </div>
                    </Link>

                    {/* Navigation */}
                    <nav className={`header__nav${menuOpen ? ' open' : ''}`}>
                        <ul className="header__nav-list">
                            {NAV_ITEMS.map((item) => (
                                <li key={item.key}>
                                    <Link
                                        to={item.isRoute ? item.href : `/${item.href}`}
                                        className="header__nav-link"
                                        onClick={(e) => handleNavClick(e, item)}
                                    >
                                        {t(item.key)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* CTA Button */}
                    <Link 
                        to="/#contact"
                        className="btn btn--primary header__cta"
                        onClick={(e) => handleNavClick(e, { key: 'nav.contact', href: '#contact', isRoute: false })}
                    >
                        {t('header.cta')}
                    </Link>

                    {/* Burger */}
                    <button className={`header__burger${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
                        <span className="header__burger-line" />
                        <span className="header__burger-line" />
                        <span className="header__burger-line" />
                    </button>
                </div>
            </header>

            <div className={`nav-backdrop${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(false)} />
        </>
    );
}