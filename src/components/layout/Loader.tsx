import { useEffect, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';

const TERMINAL_LINES = [
    { text: '> Booting NEXUS OS v4.2.0...', cls: '' },
    { text: '[OK] Kernel loaded', cls: 't-ok' },
    { text: '[OK] Memory initialized — 16GB DDR5', cls: 't-ok' },
    { text: '[OK] GPU driver detected', cls: 't-ok' },
    { text: '[WARN] Thermal throttle active', cls: 't-warn' },
    { text: '[OK] Network interface online', cls: 't-ok' },
    { text: '[OK] Filesystem mounted /dev/nexus', cls: 't-ok' },
    { text: '[OK] Security protocols engaged', cls: 't-ok' },
    { text: '> Loading modules...', cls: '' },
    { text: '[OK] React +18.2', cls: 't-ok' },
    { text: '[OK] TypeScript 5.4', cls: 't-ok' },
    { text: '[OK] Vite 5.0', cls: 't-ok' },
    { text: '> System ready._', cls: 't-gray' },
];

export default function Loader() {
    const { t, loading, setLoading } = useApp();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [progress, setProgress] = useState(0);
    const [lines, setLines] = useState<number>(0);
    const loaderRef = useRef<HTMLDivElement>(null);

    // Matrix rain canvas effect
    useEffect(() => {
        if (!loading) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animId: number;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>{}[]|/\\';
        const fontSize = 14;
        let columns: number;
        let drops: number[];

        function resize() {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            columns = Math.floor(canvas.width / fontSize);
            drops = Array(columns).fill(1);
        }

        resize();
        window.addEventListener('resize', resize);

        function draw() {
            if (!ctx || !canvas) return;
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const style = getComputedStyle(document.documentElement);
            const matrixColor = style.getPropertyValue('--matrix-color').trim() || '#00CFFF';
            ctx.fillStyle = matrixColor;
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < columns; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
            animId = requestAnimationFrame(draw);
        }

        draw();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
        };
    }, [loading]);

    // Terminal lines + progress animation
    useEffect(() => {
        if (!loading) return;

        // Skip if already visited
        if (localStorage.getItem('nexus_os_visited')) {
            setLoading(false);
            document.body.classList.remove('loading');
            return;
        }

        document.body.classList.add('loading');

        let lineIdx = 0;
        let currentProgress = 0;

        const lineInterval = setInterval(() => {
            if (lineIdx < TERMINAL_LINES.length) {
                setLines(lineIdx + 1);
                lineIdx++;
            }
        }, 180);

        const progressInterval = setInterval(() => {
            currentProgress += Math.random() * 3 + 1;
            if (currentProgress >= 100) {
                currentProgress = 100;
                setProgress(100);
                clearInterval(progressInterval);
                clearInterval(lineInterval);

                // Finish loading
                setTimeout(() => {
                    localStorage.setItem('nexus_os_visited', '1');
                    if (loaderRef.current) {
                        loaderRef.current.classList.add('hidden');
                    }
                    setTimeout(() => {
                        setLoading(false);
                        document.body.classList.remove('loading');
                    }, 600);
                }, 400);
            } else {
                setProgress(Math.floor(currentProgress));
            }
        }, 60);

        return () => {
            clearInterval(lineInterval);
            clearInterval(progressInterval);
        };
    }, [loading, setLoading]);

    if (!loading) return null;

    return (
        <div className="loader" ref={loaderRef}>
            <canvas className="loader__matrix-canvas" ref={canvasRef} />

            <div className="loader__content">
                {/* Hex ring spinner */}
                <div className="loader__hex-ring">
                    <div className="loader__hex-spin">
                        <svg viewBox="0 0 100 100" fill="none">
                            <polygon
                                points="50,2 93,25 93,75 50,98 7,75 7,25"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeDasharray="10 5"
                                className="logo-hex"
                                style={{ color: 'var(--accent)' }}
                            />
                        </svg>
                    </div>
                    <div className="loader__hex-inner">
                        <span className="loader__hex-text">N</span>
                    </div>
                </div>

                {/* System name */}
                <div className="loader__system-name">
                    <span className="loader__system-prefix">{t('loader.prefix')}</span>
                    <span className="loader__system-title">NEXUS OS</span>
                </div>

                {/* Terminal */}
                <div className="loader__terminal">
                    {TERMINAL_LINES.slice(0, lines).map((line, i) => (
                        <div className="loader__terminal-line" key={i}>
                            {line.cls ? <span className={line.cls}>{line.text}</span> : line.text}
                        </div> 
                    ))}
                </div>

                {/* Progress bar */}
                <div className="loader__progress-wrap">
                    <div className="loader__progress-bar">
                        <div className="loader__progress-fill" style={{ width: `${progress}%` }} />
                    </div>
                    <span className="loader__progress-value">{progress}%</span>
                </div>
            </div>

            {/* Corner decorations */}
            <div className="loader__corner loader__corner--tl" />
            <div className="loader__corner loader__corner--tr" />
            <div className="loader__corner loader__corner--bl" />
            <div className="loader__corner loader__corner--br" />
        </div>
    );
}
 