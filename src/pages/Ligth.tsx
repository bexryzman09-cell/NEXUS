import React, { useState, useRef, ChangeEvent, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
// Определение интерфейса для структуры цвета в БД
interface ColorItem {
    r: number;
    g: number;
    b: number;
    en: string;
    ru: string;
    uz: string;
}

// Интерфейс для хранения данных о выбранном цвете
interface DetectedColorState {
    r: number;
    g: number;
    b: number;
    en: string;
    ru: string;
    uz: string;
}

// База данных цветов
const colorsDB: ColorItem[] = [
    { r: 255, g: 0, b: 0, en: "Red", ru: "Красный", uz: "Qizil" },
    { r: 0, g: 255, b: 0, en: "Green", ru: "Зеленый", uz: "Yashil" },
    { r: 0, g: 0, b: 255, en: "Blue", ru: "Синий", uz: "Ko'k" },
    { r: 255, g: 255, b: 0, en: "Yellow", ru: "Желтый", uz: "Sariq" },
    { r: 255, g: 165, b: 0, en: "Orange", ru: "Оранжевый", uz: "To'q sariq" },
    { r: 128, g: 0, b: 128, en: "Purple", ru: "Фиолетовый", uz: "Binafsha" },
    { r: 255, g: 192, b: 203, en: "Pink", ru: "Розовый", uz: "Pushti" },
    { r: 139, g: 69, b: 19, en: "Brown", ru: "Коричневый", uz: "Jigarrang" },
    { r: 255, g: 255, b: 255, en: "White", ru: "Белый", uz: "Oq" },
    { r: 0, g: 0, b: 0, en: "Black", ru: "Черный", uz: "Qora" },
    { r: 128, g: 128, b: 128, en: "Grey", ru: "Серый", uz: "Kulrang" },
    { r: 0, g: 255, b: 255, en: "Cyan / Aqua", ru: "Голубой / Бирюзовый", uz: "Och ko'k / Firuza" },
    { r: 255, g: 0, b: 255, en: "Magenta", ru: "Пурпурный", uz: "To'q binafsha" },
    { r: 128, g: 128, b: 0, en: "Olive", ru: "Оливковый", uz: "Zaytun rangi" },
    { r: 192, g: 192, b: 192, en: "Light Grey", ru: "Светло-серый", uz: "Och kulrang" },
    { r: 47, g: 79, b: 79, en: "Dark Grey", ru: "Темно-серый", uz: "To'q kulrang" }
];

const ColorIdentifier: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
    const [detectedColor, setDetectedColor] = useState<DetectedColorState | null>(null);

    // Функция поиска ближайшего цвета по евклидову расстоянию
    const getColorName = (r: number, g: number, b: number): ColorItem => {
        let minDistance = Infinity;
        let closestColor = colorsDB[0];

        for (const color of colorsDB) {
            const distance = Math.sqrt(
                Math.pow(r - color.r, 2) +
                Math.pow(g - color.g, 2) +
                Math.pow(b - color.b, 2)
            );
            if (distance < minDistance) {
                minDistance = distance;
                closestColor = color;
            }
        }
        return closestColor;
    };

    // Обработчик загрузки изображения
    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = canvasRef.current;
                if (!canvas) return;

                const ctx = canvas.getContext('2d');
                if (!ctx) return;

                const maxW = 600;
                const scale = Math.min(maxW / img.width, 1);
                canvas.width = img.width * scale;
                canvas.height = img.height * scale;

                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                setIsImageLoaded(true);
            };
            if (event.target?.result) {
                img.src = event.target.result as string;
            }
        };
        reader.readAsDataURL(file);
    };

    // Обработчик клика по canvas
    const handleCanvasClick = (e: MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (canvas.width / rect.width);
        const y = (e.clientY - rect.top) * (canvas.height / rect.height);

        const pixelData = ctx.getImageData(x, y, 1, 1).data;
        const r = pixelData[0];
        const g = pixelData[1];
        const b = pixelData[2];

        const colorMatch = getColorName(r, g, b);

        setDetectedColor({
            r, g, b,
            en: colorMatch.en,
            ru: colorMatch.ru,
            uz: colorMatch.uz
        });
    };

    // Логика сброса (Кнопка Назад)
    const handleReset = () => {
        setIsImageLoaded(false);
        setDetectedColor(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx?.clearRect(0, 0, canvas.width, canvas.height);
        }
    };

    return (
        <div style={styles.body}>
            <div style={styles.container}>
                <h1 style={styles.h1}>Определитель цвета / Color Identifier</h1>
                <p style={styles.instruction}>
                    Загрузите фото и кликните на любой пиксель, чтобы узнать цвет / Загрузите фото и нажимайте на цвет
                </p>

                <label htmlFor="imageInput" style={styles.uploadBtn}>
                    Выбрать изображение / Choose Image
                </label>
                <input
                    type="file"
                    id="imageInput"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                />

                <div style={styles.canvasContainer}>
                    {!isImageLoaded && (
                        <span style={{ color: '#aaa' }}>Здесь будет ваше фото</span>
                    )}
                    <canvas
                        ref={canvasRef}
                        onClick={handleCanvasClick}
                        style={{
                            ...styles.canvas,
                            display: isImageLoaded ? 'block' : 'none',
                        }}
                    />
                </div>

                <div style={styles.resultBox}>
                    {detectedColor && (
                        <>
                            <div
                                style={{
                                    ...styles.colorPreview,
                                    backgroundColor: `rgb(${detectedColor.r}, ${detectedColor.g}, ${detectedColor.b})`,
                                }}
                            />
                            <div style={styles.translations}>
                                <div style={{ ...styles.langLine, color: '#2c3e50' }}>
                                    🇬🇧 EN: {detectedColor.en}
                                </div>
                                <div style={{ ...styles.langLine, color: '#16a085' }}>
                                    🇷🇺 RU: {detectedColor.ru}
                                </div>
                                <div style={{ ...styles.langLine, color: '#d35400' }}>
                                    🇺🇿 UZ: {detectedColor.uz}
                                </div>
                                <div style={{ fontSize: '12px', color: '#aaa', marginTop: '10px' }}>
                                    RGB({detectedColor.r}, {detectedColor.g}, {detectedColor.b})
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

           
            <Link
                to="/courses"
                className="btn-back"
                style={styles.backBtn}>
            
                ← Назад / Back / Orqaga
            </Link>
        </div>
    );
};

// Стили, перенесенные из тега <style> в CSS-in-JS объекты
const styles: { [key: string]: React.CSSProperties } = {
    body: {
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: '#f4f7f6',
        color: '#333',
        margin: 0,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
    },
    container: {
        maxWidth: '800px',
        width: '100%',
        background: 'white',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    },
    h1: {
        color: '#2c3e50',
        marginBottom: '10px',
        textAlign: 'center',
    },
    uploadBtn: {
        display: 'inline-block',
        backgroundColor: '#3498db',
        color: 'white',
        padding: '12px 20px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background 0.3s',
    },
    canvasContainer: {
        margin: '20px 0',
        maxWidth: '100%',
        overflow: 'auto',
        border: '2px dashed #ccc',
        borderRadius: '8px',
        minHeight: '200px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#fafafa',
    },
    canvas: {
        cursor: 'crosshair',
        maxWidth: '100%',
    },
    instruction: {
        color: '#7f8c8d',
        fontSize: '14px',
    },
    resultBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '20px',
        padding: '15px',
        borderTop: '2px solid #eee',
    },
    colorPreview: {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        border: '3px solid #fff',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        marginBottom: '15px',
    },
    translations: {
        fontSize: '18px',
        lineHeight: 1.6,
        fontWeight: 'bold',
    },
    langLine: {
        margin: '5px 0',
    },
    backBtn: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#e74c3c',
        color: 'white',
        padding: '10px 18px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        transition: 'background 0.3s, transform 0.2s',
        zIndex: 1000,
    },
};

export default ColorIdentifier;