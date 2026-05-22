import { useApp } from '../../context/AppContext';
const values = [
    {
        titleKey: 'about.val1.title',
        textKey: 'about.val1.text',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
        )
    },
    {
        titleKey: 'about.val2.title',
        textKey: 'about.val2.text',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
                <path d="M12 2a6 6 0 0 1 6 6v5a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8a6 6 0 0 1 6-6z" />
            </svg>
        )
    },
    {
        titleKey: 'about.val3.title',
        textKey: 'about.val3.text',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.5 16.5c-1.5 1.26-2 3.43-2 3.43s2.17-.5 3.43-2" />
                <path d="M22 2s-5.7 4.5-8 11.5c-.2.6-.5 1.2-.8 1.8a21.2 21.2 0 0 0-2.2 4.7c-1.1 3.3-.5 3.3-.5 3.3s0 .6 3.3-.5a21.2 21.2 0 0 0 4.7-2.2c.6-.3 1.2-.6 1.8-.8C21.5 13.3 22 2 22 2z" />
                <path d="M9 12l-6 6" />
                <path d="M12 9l6-6" />
            </svg>
        )
    }
];
const historyItems = [
    'about.history.item1',
    'about.history.item2',
    'about.history.item3',
    'about.history.item4',
];

const terminalLines = [
    { prompt: true, cmd: 'nexus --status' },
    { output: true, text: '● System: ONLINE', success: true },
    { prompt: true, cmd: 'nexus --mission' },
    { output: true, text: '> Train 10,000 developers by 2027' },
    { output: true, text: '> Become #1 IT school in Central Asia' },
    { prompt: true, cmd: 'nexus --version' },
    { output: true, text: 'v3.0.0 — 2026 Release', success: true },
    { prompt: true, cmd: '█', blink: true },
];

export default function About() {
    const { t } = useApp();

    return (
        <section className="section" id="about">
            <div className="container">
                <div className="section-header">
                    <span className="section-header__tag">{t('about.tag')}</span>
                    <h2 className="section-header__title" dangerouslySetInnerHTML={{ __html: t('about.title') }} />
                    <p className="section-header__subtitle">{t('about.subtitle')}</p>
                </div>

                <div className="about__grid">
                    <div className="about__text">
                        <p className="about__lead">{t('about.lead')}</p>

                        <div className="about__values">
                            {values.map((v) => (
                                <div className="about__value-item" key={v.titleKey}>
                                    <span className="about__value-icon">{v.icon}</span>
                                    <div>
                                        <strong>{t(v.titleKey)}</strong>
                                        <p>{t(v.textKey)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="about__history">
                            <h3>{t('about.history.title')}</h3>
                            <p>{t('about.history.text')}</p>
                            <ul>
                                {historyItems.map((key) => (
                                    <li key={key}>{t(key)}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="about__visual">
                        <div className="about__terminal-card">
                            <div className="about__terminal-header">
                                <span className="about__terminal-dot about__terminal-dot--red" />
                                <span className="about__terminal-dot about__terminal-dot--yellow" />
                                <span className="about__terminal-dot about__terminal-dot--green" />
                                <span className="about__terminal-filename">nexus.sh</span>
                            </div>
                            <div className="about__terminal-body">
                                {terminalLines.map((line, i) => {
                                    if (line.prompt) {
                                        return (
                                            <div className="about__terminal-line" key={i}>
                                                <span className="t-prompt">$ </span>
                                                <span className={line.blink ? 't-cmd t-blink' : 't-cmd'}>{line.cmd}</span>
                                            </div>
                                        );
                                    }
                                    return (
                                        <div className="about__terminal-line" key={i}>
                                            <span className={line.success ? 't-output t-success' : 't-output'}>{line.text}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
