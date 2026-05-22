import { useState, useEffect } from 'react';

export default function ScrollTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            // Show after scrolling past the hero section (roughly 100vh)
            setVisible(window.scrollY > window.innerHeight * 0.5);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            className={`scroll-top-fixed${visible ? ' visible' : ''}`}
            onClick={scrollToTop}
            aria-label="Scroll to top"
        >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="18 15 12 9 6 15" />
            </svg>
        </button>
    );
}
