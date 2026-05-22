import { useState, useEffect, useRef, useCallback } from 'react';
import './Xus.css';
import { Link } from 'react-router-dom';

declare global {
    interface Window {
        SpeechRecognition?: any;
        webkitSpeechRecognition?: any;
    }
}

interface LogEntry {
    id: number;
    origin: 'operator' | 'xus-core' | 'system';
    stamp: string;
    message: string;
    typing?: boolean;
}

interface ToastItem {
    id: number;
    message: string;
    type: 'info' | 'warn';
}

const coreBrain: Record<string, any> = {
    "ru-RU": {
        init: "Система тактического интерфейса XUS инициализирована. Расширенный синтез речи активен.",
        statusReady: "СТАТУС: ГОТОВ К КОМАНДАМ",
        statusRec: "СТАТУС: ЗАХВАТ РЕЧЕВОГО СИГНАЛА...",
        protocolSafe: "Штатный режим",
        protocolCombat: "Боевой протокол",
        hold: "Введите команду...",
        tagUser: "ОПЕРАТОР",
        tagXus: "XUS CORE",
        testSignal: "Голосовые контуры перекалиброваны. Сигнал подтвержден.",
        fail: "Команда не идентифицирована. Паттерн отклонен системой.",
        logCleared: "// ЖУРНАЛ ОЧИЩЕН ОПЕРАТОРОМ //",
        combatOn: "// БОЕВОЙ ПРОТОКОЛ АКТИВИРОВАН //",
        combatOff: "// ШТАТНЫЙ РЕЖИМ ВОССТАНОВЛЕН //",
        copied: "Сообщение скопировано",
        quickCmds: ["привет", "статус системы", "тревога", "активировать"],
        db: {
            test: [
                { keys: ["привет", "здравствуй", "хай"], ans: ["Приветствую, оператор. Все системы в норме.", "Привет! Тактические модули готовы к работе."] },
                { keys: ["статус", "проверка", "отчет"], ans: ["Ядро XUS работает на 100%. Угроз не обнаружено.", "Все аудиоканалы стабильны. Сенсоры в штатном режиме."] },
                { keys: ["время", "дата", "когда"], ans: [`Системное время: ${new Date().toLocaleString('ru-RU')}`] },
                { keys: ["помощь", "команды", "что умеешь"], ans: ["Доступные режимы: голосовой ввод, текстовые команды, быстрые клавиши. Нажмите ↑↓ для истории."] }
            ],
            production: [
                { keys: ["активировать", "вход", "запуск"], ans: ["Добро пожаловать в боевой контур. Протоколы инициализированы.", "Авторизация подтверждена. Уровень угрозы — критический."] },
                { keys: ["тревога", "опасность", "угроза"], ans: ["ВНИМАНИЕ! Обнаружено несанкционированное вторжение!", "ПРЕДУПРЕЖДЕНИЕ! Критическая угроза на периметре!"] },
                { keys: ["цель", "захват", "отслеживать"], ans: ["Цель захвачена. Навожу системы на объект.", "Захват произведен. Координаты переданы."] }
            ]
        }
    },
    "en-US": {
        init: "XUS tactical interface initialized. Advanced speech synthesis is online.",
        statusReady: "STATUS: READY",
        statusRec: "STATUS: CAPTURING SIGNAL...",
        protocolSafe: "Safe Mode",
        protocolCombat: "Combat Protocol",
        hold: "Enter command...",
        tagUser: "OPERATOR",
        tagXus: "XUS CORE",
        testSignal: "Voice circuits recalibrated. Signal confirmed.",
        fail: "Command unrecognized. Pattern rejected by system.",
        logCleared: "// LOG CLEARED BY OPERATOR //",
        combatOn: "// COMBAT PROTOCOL ACTIVATED //",
        combatOff: "// SAFE MODE RESTORED //",
        copied: "Message copied",
        quickCmds: ["hello", "system status", "alert", "activate"],
        db: {
            test: [
                { keys: ["hello", "hi", "hey", "greetings"], ans: ["Greetings, operator. All systems nominal.", "Hello! Tactical modules are ready."] },
                { keys: ["status", "check", "report"], ans: ["XUS core operating at 100%. No threats detected.", "All audio channels stable. Sensors nominal."] },
                { keys: ["time", "date"], ans: [`System time: ${new Date().toLocaleString('en-US')}`] },
                { keys: ["help", "commands"], ans: ["Available: voice input, text commands, quick keys. Press ↑↓ for history."] }
            ],
            production: [
                { keys: ["activate", "login", "launch"], ans: ["Welcome to the combat circuit. Protocols initialized.", "Authorization confirmed. Threat level: critical."] },
                { keys: ["alert", "danger", "threat"], ans: ["WARNING! Unauthorized intrusion detected!", "ALERT! Critical threat on perimeter!"] },
                { keys: ["target", "acquire", "track"], ans: ["Target acquired. Locking systems onto object.", "Lock confirmed. Coordinates transmitted."] }
            ]
        }
    },
    "uz-UZ": {
        init: "XUS taktik interfeys ishga tushirildi. Kengaytirilgan nutq sintezi faol.",
        statusReady: "STATUS: TAYYOR",
        statusRec: "STATUS: SIGNAL QABUL QILINYAPTI...",
        protocolSafe: "Shtat rejimi",
        protocolCombat: "Jangy protokol",
        hold: "Buyruq kiriting...",
        tagUser: "OPERATOR",
        tagXus: "XUS YADRO",
        testSignal: "Ovozli konturlar qayta kalibrlandi. Signal tasdiqlandi.",
        fail: "Buyruq aniqlanmadi. Shablon rad etildi.",
        logCleared: "// JURNAL TOZALANDI //",
        combatOn: "// JANGY PROTOKOL FAOLLASHTIRILDI //",
        combatOff: "// SHTAT REJIMI TIKLANDI //",
        copied: "Xabar nusxalandi",
        quickCmds: ["salom", "tizim holati", "xavf", "faollashtirish"],
        db: {
            test: [
                { keys: ["salom", "assalomu"], ans: ["Salom, operator. Barcha tizimlar normal.", "Salom! Taktik modullar tayyor."] },
                { keys: ["holat", "tekshirish"], ans: ["XUS yadrosi 100% ishlayapti. Tahdid aniqlanmadi.", "Barcha kanallar barqaror."] },
                { keys: ["vaqt", "sana"], ans: [`Tizim vaqti: ${new Date().toLocaleString()}`] },
                { keys: ["yordam", "buyruqlar"], ans: ["Mavjud: ovozli kiritish, matn buyruqlari. Tarix uchun ↑↓ bosing."] }
            ],
            production: [
                { keys: ["faollashtirish", "kirish"], ans: ["Jangovar konturga xush kelibsiz. Protokollar ishga tushirildi.", "Avtorizatsiya tasdiqlandi. Xavf darajasi kritik."] },
                { keys: ["xavf", "tashvish", "tahdid"], ans: ["DIQQAT! Ruxsatsiz kirishga urinish aniqlandi!", "OGOHLANTIRISH! Kritik tahdid!"] },
                { keys: ["nishon", "kuzatish"], ans: ["Nishon aniqlandi. Tizimlar yo'naltirilmoqda.", "Qulflash tasdiqlandi. Koordinatalar uzatildi."] }
            ]
        }
    }
};

// Typewriter effect helper
function typewriterEffect(
    text: string,
    onUpdate: (partial: string) => void,
    onDone: () => void,
    speed = 18
) {
    let i = 0;
    const interval = setInterval(() => {
        i++;
        onUpdate(text.slice(0, i));
        if (i >= text.length) {
            clearInterval(interval);
            onDone();
        }
    }, speed);
    return interval;
}

export default function TacticalTerminal() {
    const [isCombatMode, setIsCombatMode] = useState(false);
    const [currentLang, setCurrentLang] = useState("ru-RU");
    const [cmdInput, setCmdInput] = useState("");
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [toasts, setToasts] = useState<ToastItem[]>([]);

    const [pitch, setPitch] = useState(0.85);
    const [rate, setRate] = useState(1.05);
    const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedVoice, setSelectedVoice] = useState("");

    const [metrics, setMetrics] = useState({ cpu: 0, ram: 0, ping: 24 });
    const [pingHistory, setPingHistory] = useState<number[]>(Array(16).fill(24));
    const [micActive, setMicActive] = useState(false);
    const [waveHeights, setWaveHeights] = useState<number[]>(Array(20).fill(4));

    // Command history
    const cmdHistoryRef = useRef<string[]>([]);
    const histIdxRef = useRef(-1);

    const recEngineRef = useRef<any>(null);
    const logsEndRef = useRef<HTMLDivElement>(null);
    const waveIntervalRef = useRef<any>(null);
    const typingIntervalsRef = useRef<Map<number, any>>(new Map());

    const stateRef = useRef({ isCombatMode, currentLang, selectedVoice, pitch, rate });
    useEffect(() => {
        stateRef.current = { isCombatMode, currentLang, selectedVoice, pitch, rate };
    }, [isCombatMode, currentLang, selectedVoice, pitch, rate]);

    const dataSet = coreBrain[currentLang] || coreBrain["ru-RU"];

    useEffect(() => {
        logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    // Toast helper
    const showToast = useCallback((message: string, type: 'info' | 'warn' = 'info') => {
        const id = Math.random();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3200);
    }, []);

    // Write log with optional typewriter
    const writeLog = useCallback((
        origin: 'operator' | 'xus-core' | 'system',
        message: string,
        useTypewriter = false
    ) => {
        const stamp = new Date().toLocaleTimeString([], { hour12: false });
        const id = Math.random();

        if (useTypewriter && origin === 'xus-core') {
            setLogs(prev => [...prev, { origin, message: '', stamp, id, typing: true }]);

            const interval = typewriterEffect(
                message,
                (partial) => {
                    setLogs(prev => prev.map(l => l.id === id ? { ...l, message: partial } : l));
                },
                () => {
                    setLogs(prev => prev.map(l => l.id === id ? { ...l, typing: false } : l));
                    typingIntervalsRef.current.delete(id);
                }
            );
            typingIntervalsRef.current.set(id, interval);
        } else {
            setLogs(prev => [...prev, { origin, message, stamp, id }]);
        }
    }, []);

    const executeSpeech = useCallback((phrase: string) => {
        if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(phrase);
        utterance.lang = stateRef.current.currentLang;
        utterance.pitch = stateRef.current.pitch;
        utterance.rate = stateRef.current.rate;
        if (stateRef.current.selectedVoice) {
            const v = window.speechSynthesis.getVoices().find(v => v.name === stateRef.current.selectedVoice);
            if (v) utterance.voice = v;
        }
        window.speechSynthesis.speak(utterance);
    }, []);

    const analyzeCommand = useCallback((phrase: string) => {
        const { currentLang: lang, isCombatMode: combat } = stateRef.current;
        const currentData = coreBrain[lang] || coreBrain["ru-RU"];
        const activePool = combat ? currentData.db.production : currentData.db.test;
        const found = activePool.find((unit: any) => unit.keys.some((k: string) => phrase.includes(k)));
        const resolution = found
            ? found.ans[Math.floor(Math.random() * found.ans.length)]
            : currentData.fail;

        setTimeout(() => {
            writeLog("xus-core", resolution, true);
            executeSpeech(resolution);
        }, 300);
    }, [writeLog, executeSpeech]);

    // Copy message on click
    const handleCopyMessage = useCallback((message: string, nodeId: number) => {
        navigator.clipboard.writeText(message).then(() => {
            const el = document.querySelector(`[data-nodeid="${nodeId}"] .output-block`);
            if (el) {
                el.classList.add('copied');
                setTimeout(() => el.classList.remove('copied'), 900);
            }
            const lang = stateRef.current.currentLang;
            const data = coreBrain[lang] || coreBrain["ru-RU"];
            showToast(data.copied, 'info');
        });
    }, [showToast]);

    // Clear logs
    const clearLogs = useCallback(() => {
        typingIntervalsRef.current.forEach(v => clearInterval(v));
        typingIntervalsRef.current.clear();
        setLogs([]);
        setTimeout(() => writeLog("system", dataSet.logCleared), 100);
    }, [writeLog, dataSet]);

    // Toggle combat mode
    const handleCombatToggle = useCallback(() => {
        setIsCombatMode(prev => {
            const next = !prev;
            const lang = stateRef.current.currentLang;
            const data = coreBrain[lang] || coreBrain["ru-RU"];
            setTimeout(() => {
                writeLog("system", next ? data.combatOn : data.combatOff);
                executeSpeech(next ? data.protocolCombat : data.protocolSafe);
            }, 50);
            return next;
        });
    }, [writeLog, executeSpeech]);

    // Waveform animation
    useEffect(() => {
        if (micActive) {
            waveIntervalRef.current = setInterval(() => {
                setWaveHeights(Array.from({ length: 20 }, () => Math.random() * 28 + 4));
            }, 80);
        } else {
            clearInterval(waveIntervalRef.current);
            setWaveHeights(Array(20).fill(4));
        }
        return () => clearInterval(waveIntervalRef.current);
    }, [micActive]);

    // Voices
    useEffect(() => {
        if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
        const updateVoiceList = () => {
            const allVoices = window.speechSynthesis.getVoices();
            const langPrefix = currentLang.split('-')[0];
            const filtered = allVoices.filter(v => v.lang.toLowerCase().startsWith(langPrefix));
            setAvailableVoices(filtered);
            if (filtered.length > 0) {
                const hq = filtered.find(v => v.name.includes("Google") || v.name.includes("Natural") || v.name.includes("Microsoft"));
                setSelectedVoice(hq ? hq.name : filtered[0].name);
            } else setSelectedVoice("");
        };
        updateVoiceList();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = updateVoiceList;
        }
    }, [currentLang]);

    // Speech recognition engine
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) return;

        if (recEngineRef.current) recEngineRef.current.abort();

        const rec = new SpeechRecognition();
        rec.interimResults = false;
        rec.continuous = false;
        rec.lang = currentLang;
        rec.onstart = () => setMicActive(true);
        rec.onend = () => setMicActive(false);
        rec.onresult = (event: any) => {
            const text = event.results[0][0].transcript;
            writeLog("operator", text);
            analyzeCommand(text.toLowerCase());
        };
        recEngineRef.current = rec;

        writeLog("xus-core", dataSet.init, true);
        const t = setTimeout(() => executeSpeech(dataSet.init), 200);
        return () => { clearTimeout(t); rec.abort(); };
    }, [currentLang]); // eslint-disable-line react-hooks/exhaustive-deps

    // Metrics + ping history
    useEffect(() => {
        const interval = setInterval(() => {
            const combat = stateRef.current.isCombatMode;
            const cpu = Math.floor(Math.random() * (combat ? 33 : 33) + (combat ? 65 : 12));
            const ram = Math.floor(Math.random() * 30 + 40);
            const ping = Math.floor(Math.random() * 40) + 12;
            setMetrics({ cpu, ram, ping });
            setPingHistory(prev => [...prev.slice(1), ping]);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const handleVoiceConfigChange = (type: 'pitch' | 'rate' | 'voice', value: any) => {
        if (type === 'pitch') setPitch(value);
        if (type === 'rate') setRate(value);
        if (type === 'voice') setSelectedVoice(value);
        setTimeout(() => {
            const data = coreBrain[stateRef.current.currentLang] || coreBrain["ru-RU"];
            executeSpeech(data.testSignal);
        }, 30);
    };

    const processInput = () => {
        const trimmed = cmdInput.trim();
        if (!trimmed) return;
        writeLog("operator", trimmed);
        analyzeCommand(trimmed.toLowerCase());
        // Save to history
        cmdHistoryRef.current = [trimmed, ...cmdHistoryRef.current.slice(0, 49)];
        histIdxRef.current = -1;
        setCmdInput("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') { processInput(); return; }
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            const nextIdx = Math.min(histIdxRef.current + 1, cmdHistoryRef.current.length - 1);
            histIdxRef.current = nextIdx;
            if (cmdHistoryRef.current[nextIdx]) setCmdInput(cmdHistoryRef.current[nextIdx]);
        }
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIdx = Math.max(histIdxRef.current - 1, -1);
            histIdxRef.current = nextIdx;
            setCmdInput(nextIdx === -1 ? '' : cmdHistoryRef.current[nextIdx] ?? '');
        }
    };

    const toggleVoiceCapture = () => {
        if (!recEngineRef.current) return;
        micActive ? recEngineRef.current.stop() : recEngineRef.current.start();
    };

    const triggerBack = () => {
        const phrase = currentLang === "en-US" ? "Terminal closing." : currentLang === "uz-UZ" ? "Terminalni yopish." : "Терминал закрыт.";
        executeSpeech(phrase);
    };

    const cpuClass = metrics.cpu > 85 ? 'crit' : metrics.cpu > 65 ? 'warn' : '';
    const ramClass = metrics.ram > 85 ? 'crit' : metrics.ram > 70 ? 'warn' : '';
    const pingMax = Math.max(...pingHistory, 1);

    return (
        <div className="terminal-screen-wrapper">
            <div className={`os-frame ${isCombatMode ? 'combat-active' : ''}`}>

                <div className="decor-corner corner-tl" />
                <div className="decor-corner corner-tr" />
                <div className="decor-corner corner-bl" />
                <div className="decor-corner corner-br" />

                {/* Toast zone */}
                <div className="toast-zone">
                    {toasts.map(t => (
                        <div key={t.id} className={`toast-item ${t.type === 'warn' ? 'warn' : ''}`}>
                            {t.message}
                        </div>
                    ))}
                </div>

                {/* ── LEFT PANEL ── */}
                <section className="hologram-sector">
                    <div className="sys-title">
                        <h1>XUS CORE v9.7</h1>
                        <p className={micActive ? 'status-active' : ''}>
                            {micActive ? dataSet.statusRec : dataSet.statusReady}
                        </p>
                    </div>

                    {/* Arc Reactor */}
                    <div className={`arc-reactor-v9 ${micActive ? 'mic-scanning' : ''}`}>
                        <div className="layer layer-1" />
                        <div className="layer layer-2" />
                        <div className="layer layer-3" />
                        <div className="layer layer-4" />
                        <div className="layer layer-core" onClick={() => showToast('XUS CORE v9.7 — ONLINE', 'info')}>
                            <span className="core-brand">XUS</span>
                            <span className="core-version">v9.7.1</span>
                            <div className="core-pulse-line" />
                        </div>
                    </div>

                    {/* Waveform visualizer */}
                    <div className="waveform-container">
                        {waveHeights.map((h, i) => (
                            <div
                                key={i}
                                className={`wave-bar ${micActive ? 'active' : ''}`}
                                style={{
                                    height: `${micActive ? h : 4}px`,
                                    '--d': `${0.2 + Math.random() * 0.4}s`,
                                    '--h': `${h}px`,
                                } as any}
                            />
                        ))}
                    </div>

                    {/* Resource monitor */}
                    <div className="resource-monitor">
                        <div className="stat-row">
                            <div className="stat-info">
                                <span className="stat-label">CPU</span>
                                <span className={`stat-value ${cpuClass}`}>{metrics.cpu}%</span>
                            </div>
                            <div className="progress-bar">
                                <div className={`progress-fill ${cpuClass}`} style={{ width: `${metrics.cpu}%` }} />
                            </div>
                        </div>
                        <div className="stat-row">
                            <div className="stat-info">
                                <span className="stat-label">RAM</span>
                                <span className={`stat-value ${ramClass}`}>{metrics.ram}%</span>
                            </div>
                            <div className="progress-bar">
                                <div className={`progress-fill ${ramClass}`} style={{ width: `${metrics.ram}%` }} />
                            </div>
                        </div>

                        {/* Ping with mini chart */}
                        <div className="ping-chart-wrap">
                            <div className="stat-info">
                                <span className="stat-label">PING</span>
                                <span className="stat-value">{metrics.ping}ms</span>
                            </div>
                            <div className="ping-chart">
                                {pingHistory.map((p, i) => (
                                    <div
                                        key={i}
                                        className="ping-bar"
                                        style={{ height: `${(p / pingMax) * 100}%` }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Voice tuning */}
                    <div className="voice-tuning">
                        <div className="tuning-header">
                            {currentLang === 'en-US' ? 'Voice Engine Config' : currentLang === 'uz-UZ' ? 'Ovoz konfiguratsiyasi' : 'Настройка голосового движка'}
                        </div>
                        <div className="tuning-row">
                            <span className="tuning-label">{currentLang === 'en-US' ? 'Pitch' : currentLang === 'uz-UZ' ? 'Ton' : 'Тон'}</span>
                            <input type="range" min="0.4" max="1.6" step="0.05" value={pitch}
                                onChange={(e) => handleVoiceConfigChange('pitch', parseFloat(e.target.value))} />
                            <span className="tuning-val">{pitch.toFixed(2)}</span>
                        </div>
                        <div className="tuning-row">
                            <span className="tuning-label">{currentLang === 'en-US' ? 'Speed' : currentLang === 'uz-UZ' ? 'Tezlik' : 'Скор.'}</span>
                            <input type="range" min="0.6" max="1.5" step="0.05" value={rate}
                                onChange={(e) => handleVoiceConfigChange('rate', parseFloat(e.target.value))} />
                            <span className="tuning-val">{rate.toFixed(2)}</span>
                        </div>
                        <div className="tuning-row" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '6px' }}>
                            <span className="tuning-label">
                                {currentLang === 'en-US' ? 'Voice' : currentLang === 'uz-UZ' ? 'Ovoz' : 'Голос'}
                            </span>
                            <select value={selectedVoice} onChange={(e) => handleVoiceConfigChange('voice', e.target.value)}>
                                {availableVoices.length === 0
                                    ? <option value="">{currentLang === 'en-US' ? 'No voices found' : currentLang === 'uz-UZ' ? 'Topilmadi' : 'Голоса не найдены'}</option>
                                    : availableVoices.map(v => (
                                        <option key={v.name} value={v.name}>
                                            {v.name.replace("Microsoft", "MS").replace("Google", "GGL")}
                                            {v.localService ? ' [local]' : ''}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>

                    {/* Quick commands */}
                    <div className="quick-cmds">
                        <div className="quick-cmds-title">
                            {currentLang === 'en-US' ? 'Quick Commands' : currentLang === 'uz-UZ' ? 'Tez buyruqlar' : 'Быстрые команды'}
                        </div>
                        <div className="quick-cmds-grid">
                            {(dataSet.quickCmds as string[]).map((cmd: string) => (
                                <button
                                    key={cmd}
                                    className="quick-cmd-btn"
                                    onClick={() => {
                                        writeLog("operator", cmd);
                                        analyzeCommand(cmd.toLowerCase());
                                    }}
                                >
                                    &gt; {cmd}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── RIGHT PANEL ── */}
                <section className="terminal-sector">
                    <div className="terminal-header">
                        <div className="header-left">
                            <div className="stream-title">TACTICAL LOG STREAM</div>
                            <div className="stream-subtitle">
                                {currentLang === 'en-US' ? 'Click message to copy' : currentLang === 'uz-UZ' ? 'Nusxalash uchun bosing' : 'Нажмите на сообщение чтобы скопировать'}
                            </div>
                        </div>
                        <div className="header-actions">
                            <span className="log-count-badge">{logs.length} LOG{logs.length !== 1 ? 'S' : ''}</span>
                            <button className="btn-clear-logs" title="Clear logs" onClick={clearLogs}>✕</button>
                            <button
                                className={`btn-combat-toggle ${isCombatMode ? 'combat-on' : ''}`}
                                onClick={handleCombatToggle}
                            >
                                {isCombatMode ? dataSet.protocolCombat : dataSet.protocolSafe}
                            </button>
                            <select value={currentLang} onChange={(e) => setCurrentLang(e.target.value)}>
                                <option value="ru-RU">RU</option>
                                <option value="en-US">EN</option>
                                <option value="uz-UZ">UZ</option>
                            </select>
                        </div>
                    </div>

                    <div className="terminal-logs-wrapper">
                        <div className="terminal-logs">
                            {logs.length === 0 && (
                                <div className="logs-empty">
                                    <div className="logs-empty-icon">◈</div>
                                    <span>
                                        {currentLang === 'en-US' ? 'Awaiting input...' : currentLang === 'uz-UZ' ? 'Kiritish kutilmoqda...' : 'Ожидание ввода...'}
                                    </span>
                                </div>
                            )}
                            {logs.map((log) => (
                                <div
                                    key={log.id}
                                    data-nodeid={log.id}
                                    className={`node ${log.origin}`}
                                    onClick={() => log.origin !== 'system' && handleCopyMessage(log.message, log.id)}
                                >
                                    <div className="info">
                                        <span>[{log.stamp}]</span>
                                        <span>//</span>
                                        <span>{log.origin === 'operator' ? dataSet.tagUser : log.origin === 'system' ? 'SYS' : dataSet.tagXus}</span>
                                        {log.origin !== 'system' && <span className="copy-hint">⧉ copy</span>}
                                    </div>
                                    <div className={`output-block ${log.typing ? 'typing' : ''}`}>
                                        {log.message}
                                    </div>
                                </div>
                            ))}
                            <div ref={logsEndRef} />
                        </div>
                    </div>

                    <div className="console-action-bar">
                        <div className="cmd-history-hint">
                            {currentLang === 'en-US' ? '↑↓ command history  •  Enter to send' : currentLang === 'uz-UZ' ? '↑↓ buyruqlar tarixi  •  Enter yuborish' : '↑↓ история команд  •  Enter для отправки'}
                        </div>
                        <div className="action-row">
                            <div className="input-matrix">
                                <input
                                    type="text"
                                    placeholder={dataSet.hold}
                                    value={cmdInput}
                                    onChange={(e) => setCmdInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    autoComplete="off"
                                    spellCheck={false}
                                />
                                <button className="matrix-btn" onClick={processInput}>EXEC</button>
                            </div>

                            <button
                                className={`mic-trigger ${micActive ? 'active' : ''}`}
                                onClick={toggleVoiceCapture}
                                title={micActive ? 'Stop' : 'Voice input'}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                                    <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
                                    <line x1="12" x2="12" y1="19" y2="22" />
                                </svg>
                            </button>

                            <Link
                                to="/courses"
                                className="btn-back"
                                style={{ textDecoration: 'none' }}
                                onClick={triggerBack}
                            >
                                {currentLang === 'en-US' ? 'BACK' : currentLang === 'uz-UZ' ? 'ORQAGA' : 'НАЗАД'}
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}