import { useEffect, useRef } from 'react';

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement | null>(null);
    const ringRef = useRef<HTMLDivElement | null>(null);
    const posRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const ringPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (window.matchMedia('(pointer: coarse)').matches) return;

        const onMouseMove = (e: globalThis.MouseEvent) => {
            posRef.current = { x: e.clientX, y: e.clientY };
            if (dotRef.current) {
                dotRef.current.style.left = `${e.clientX}px`;
                dotRef.current.style.top = `${e.clientY}px`;
            }
        };

        let animId: ReturnType<typeof requestAnimationFrame>;

        const animate = () => {
            // Коэффициент 0.15 дает красивый футуристичный "догон" кольца
            ringPosRef.current.x += (posRef.current.x - ringPosRef.current.x) * 0.15;
            ringPosRef.current.y += (posRef.current.y - ringPosRef.current.y) * 0.15;

            if (ringRef.current) {
                ringRef.current.style.left = `${ringPosRef.current.x}px`;
                ringRef.current.style.top = `${ringPosRef.current.y}px`;
            }

            animId = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        animId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <div className="custom-cursor">
            <div className="cursor-dot" ref={dotRef} />
            <div className="cursor-ring" ref={ringRef} />
        </div>
    );
}