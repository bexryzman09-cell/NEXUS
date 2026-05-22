import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UI_TRANSLATIONS } from '../data/translations';
import { QUIZ_QUESTIONS, DIRECTIONS_CARDS } from '../data/quizData';
import { Link } from 'react-router-dom';

type Screen = 'start' | 'quiz' | 'result';

export default function Quiz() {
    const { lang } = useApp();
    const [screen, setScreen] = useState<Screen>('start');
    const [currentIdx, setCurrentIdx] = useState(0);
    const [scores, setScores] = useState<Record<string, number>>({ ui: 0, front: 0, back: 0, mobile: 0, devops: 0, cyber: 0, ai: 0 });
    const [winner, setWinner] = useState<string>('front');

    const tr = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.ru;

    const start = () => {
        setCurrentIdx(0);
        setScores({ ui: 0, front: 0, back: 0, mobile: 0, devops: 0, cyber: 0, ai: 0 });
        setScreen('quiz');
    };

    const selectOption = (optScores: Record<string, number>) => {
        const newScores = { ...scores };
        for (const role in optScores) {
            if (newScores.hasOwnProperty(role)) {
                newScores[role] += optScores[role];
            }
        }
        setScores(newScores);

        if (currentIdx + 1 >= QUIZ_QUESTIONS.length) {
            let maxVal = -1;
            let winnerKey = 'front';
            for (const role in newScores) {
                if (newScores[role] > maxVal) { maxVal = newScores[role]; winnerKey = role; }
            }
            setWinner(winnerKey);
            setScreen('result');
        } else {
            setCurrentIdx(currentIdx + 1);
        }
    };

    const data = DIRECTIONS_CARDS[winner];

    return (
        <div className="quiz-container">
            {screen === 'start' && (
                <div className="quiz-screen active">
                    <h1 dangerouslySetInnerHTML={{ __html: tr['start.title'] }} />
                    <p className="lead-text">{tr['start.subtitle']}</p>
                    <div className="benefits-container">
                        <h3>{tr['start.whyTitle']}</h3>
                        <ul className="benefits-list">
                            <li dangerouslySetInnerHTML={{ __html: tr['start.b1'] }} />
                            <li dangerouslySetInnerHTML={{ __html: tr['start.b2'] }} />
                            <li dangerouslySetInnerHTML={{ __html: tr['start.b3'] }} />
                        </ul>
                    </div>
                    <button className="btn-action" onClick={start}>{tr['start.btnStart']}</button>
                </div>
            )}

            {screen === 'quiz' && (
                <div className="quiz-screen active">
                    <div className="quiz-meta-info">
                        <span>{tr['quiz.stepPrefix']}</span>
                        <span className="mono-font">{currentIdx + 1}/{QUIZ_QUESTIONS.length}</span>
                    </div>
                    <div className="progress-container">
                        <div className="progress-bar" style={{ width: `${(currentIdx / QUIZ_QUESTIONS.length) * 100}%` }} />
                    </div>
                    <h2 className="question-title">
                        {QUIZ_QUESTIONS[currentIdx][lang] || QUIZ_QUESTIONS[currentIdx].ru}
                    </h2>
                    <div className="options-grid">
                        {QUIZ_QUESTIONS[currentIdx].options.map((opt, i) => (
                            <button key={i} className="option-card" onClick={() => selectOption(opt.scores)}>
                                {opt.text[lang] || opt.text.ru}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {screen === 'result' && data && (
                <div className="quiz-screen active">
                    <h2 className="mono-font">{tr['result.header']}</h2>
                    <div className="display-title">{data.title[lang] || data.title.ru}</div>
                    <div className="meta-wrapper">
                        <span className="meta-box">{data.level[lang] || data.level.ru}</span>
                        <span className="meta-box">{data.stack}</span>
                    </div>
                    <p className="lead-text">{data.desc[lang] || data.desc.ru}</p>
                    <Link to="/" className="btn-action" style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none' }}>
                        {tr['result.btnCta']}
                    </Link>
                </div>
            )}
        </div>
    );
}
