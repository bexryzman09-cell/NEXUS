import { useState } from 'react';
import { useApp } from '../../context/AppContext';

type Theme = 'light' | 'dark-green' | 'dark-blue' | 'dark-orange';

const THEMES: { id: Theme; swatchClass: string; labelKey: string }[] = [
    { id: 'light', swatchClass: 'cp-theme-btn__swatch--light', labelKey: 'theme.light' },
    { id: 'dark-green', swatchClass: 'cp-theme-btn__swatch--dark-green', labelKey: 'theme.green' },
    { id: 'dark-blue', swatchClass: 'cp-theme-btn__swatch--dark-blue', labelKey: 'theme.blue' },
    { id: 'dark-orange', swatchClass: 'cp-theme-btn__swatch--dark-orange', labelKey: 'theme.orange' },
];

const LANGS: { code: string; flag: string }[] = [
    { code: 'uz', flag: '🇺🇿' },
    { code: 'ru', flag: '🇷🇺' },
    { code: 'en', flag: '🇬🇧' },
];

export default function ControlPanel() {
    const { t, theme, setTheme, lang, setLang } = useApp();
    const [open, setOpen] = useState(false);

    return (
        <div className="control-panel">
            <button
                id="cp-toggle-btn"
                className={`control-panel__toggle${open ? ' open' : ''}`}
                onClick={() => setOpen((v) => !v)}
                aria-label="Toggle control panel"
            >
                <span className="control-panel__toggle-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                </span>
            </button>

            <div className={`control-panel__body${open ? ' open' : ''}`}>
                {/* Theme section */}
                <div className="control-panel__section">
                    <span className="control-panel__label">{t('panel.theme')}</span>
                    <div className="control-panel__themes">
                        {THEMES.map((th) => (
                            <button
                                key={th.id}
                                className={`cp-theme-btn${theme === th.id ? ' active' : ''}`}
                                onClick={() => setTheme(th.id)}
                            >
                                <span className={`cp-theme-btn__swatch ${th.swatchClass}`} />
                                <span className="cp-theme-btn__name">{t(th.labelKey)}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="control-panel__divider" />

                {/* Language section */}
                <div className="control-panel__section">
                    <span className="control-panel__label">{t('panel.lang')}</span>
                    <div className="control-panel__langs">
                        {LANGS.map((l) => (
                            <button
                                key={l.code}
                                className={`cp-lang-btn${lang === l.code ? ' active' : ''}`}
                                onClick={() => setLang(l.code as 'uz' | 'ru' | 'en')}
                            >
                                <span className="cp-lang-btn__flag">{l.flag}</span>
                                <span className="cp-lang-btn__code">{l.code.toUpperCase()}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
