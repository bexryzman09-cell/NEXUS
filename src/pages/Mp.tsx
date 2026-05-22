import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Расширяем глобальный интерфейс Window для поддержки Webkit-версий распознавания речи
interface ExtendedWindow extends Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
}

type LangOption = 'ru-RU' | 'en-US' | 'uz-UZ';

const AudioToText: React.FC = () => {
    const [selectedLang, setSelectedLang] = useState<LangOption>('ru-RU');
    const [fileName, setFileName] = useState<string>('📁 Нажмите, чтобы выбрать аудиофайл');
    const [isFileSelected, setIsFileSelected] = useState<boolean>(false);
    const [status, setStatus] = useState<{ text: string; type: 'idle' | 'active' | 'success' }>({
        text: '',
        type: 'idle',
    });
    const [resultText, setResultText] = useState<string>('Здесь появится текст из аудиофайла...');
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    // Используем useRef для сохранения ссылок на аудио и процесс распознавания между рендерами
    const recognitionRef = useRef<any>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const isProcessingRef = useRef<boolean>(false); // ref-дубликат для синхронного доступа в колбэках
    const fullTextRef = useRef<string>('');

    // Очистка процессов при размонтировании компонента (важно для SPA)
    useEffect(() => {
        return () => {
            stopAllProcesses();
        };
    }, []);

    const stopAllProcesses = () => {
        isProcessingRef.current = false;
        setIsProcessing(false);
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
        }
    };

    // Обработчик выбора файла
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setFileName(`🎵 Выбран файл: ${files[0].name}`);
            setIsFileSelected(true);
        } else {
            setFileName('📁 Нажмите, чтобы выбрать аудиофайл');
            setIsFileSelected(false);
        }
    };

    // Запуск конвертации
    const startConversion = () => {
        const files = fileInputRef.current?.files;
        if (!files || files.length === 0) {
            alert('Пожалуйста, выберите аудиофайл!');
            return;
        }

        const currentWindow = window as ExtendedWindow;
        const SpeechRecognition = currentWindow.SpeechRecognition || currentWindow.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert('Ваш браузер не поддерживает распознавание речи. Откройте страницу через Google Chrome.');
            return;
        }

        // Создаем аудио-объект
        const file = files[0];
        const audioUrl = URL.createObjectURL(file);
        const audio = new Audio(audioUrl);
        audio.volume = 0.001;
        audio.muted = false;
        audioRef.current = audio;

        // Сбрасываем промежуточный текст
        fullTextRef.current = '';
        setResultText('');
        setIsProcessing(true);
        isProcessingRef.current = true;
        setStatus({ text: 'Идет тихая обработка файла...', type: 'active' });

        // Инициализируем распознавание речи
        const recognition = new SpeechRecognition();
        recognition.lang = selectedLang;
        recognition.interimResults = false;
        recognition.continuous = true;
        recognitionRef.current = recognition;

        recognition.onresult = (event: any) => {
            let currentTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    currentTranscript += event.results[i][0].transcript + ' ';
                }
            }
            fullTextRef.current += currentTranscript;
            setResultText(fullTextRef.current.trim());
        };

        recognition.onend = () => {
            // Если аудио еще проигрывается, перезапускаем распознавание (фикс лимита времени Web Speech API)
            if (isProcessingRef.current) {
                try {
                    recognition.start();
                } catch (e) {
                    console.warn('Распознавание уже запущено или перезапускается');
                }
            } else {
                setStatus({ text: 'Успешно завершено!', type: 'success' });
                setIsProcessing(false);
            }
        };

        recognition.onerror = (e: any) => {
            console.error('Системный лог:', e.error);
        };

        // Запускаем процессы
        recognition.start();
        audio.play().catch((err) => {
            console.error('Ошибка воспроизведения аудио:', err);
            stopAllProcesses();
            setStatus({ text: 'Ошибка воспроизведения аудио.', type: 'idle' });
        });

        audio.onended = () => {
            isProcessingRef.current = false;
            setIsProcessing(false);
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    };

  

    return (
        <div style={styles.body}>
            <div style={styles.container}>
                <h2 style={styles.h2}>Конвертер аудио в текст</h2>

                {/* Выбор языка */}
                <div style={styles.formGroup}>
                    <label htmlFor="languageSelect" style={styles.titleLabel}>Выберите язык аудио:</label>
                    <select
                        id="languageSelect"
                        value={selectedLang}
                        onChange={(e) => setSelectedLang(e.target.value as LangOption)}
                        style={styles.select}
                    >
                        <option value="ru-RU">Русский (RUS)</option>
                        <option value="en-US">English (EN)</option>
                        <option value="uz-UZ">O'zbekcha (UZ)</option>
                    </select>
                </div>

                {/* Загрузка файла */}
                <div style={styles.formGroup}>
                    <label style={styles.titleLabel}>Выберите файл:</label>
                    <div style={styles.fileUploadWrapper}>
                        <input
                            type="file"
                            id="audioInput"
                            accept="audio/*"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={styles.inputFileHidden}
                        />
                        <div
                            style={{
                                ...styles.customFileUpload,
                                ...(isFileSelected ? styles.customFileUploadSelected : {}),
                            }}
                        >
                            {fileName}
                        </div>
                    </div>
                </div>

                {/* Кнопка старта */}
                <button
                    onClick={startConversion}
                    disabled={isProcessing}
                    style={{
                        ...styles.btnMain,
                        ...(isProcessing ? styles.btnMainDisabled : {}),
                    }}
                >
                    Начать конвертацию
                </button>

                {/* Статус-бар */}
                <div
                    style={{
                        ...styles.statusBox,
                        ...(status.type === 'active' ? styles.statusActive : {}),
                        ...(status.type === 'success' ? styles.statusSuccess : {}),
                    }}
                >
                    {status.text}
                </div>

                {/* Поле вывода результата */}
                <div style={styles.formGroup}>
                    <label style={styles.titleLabel}>Распознанный текст:</label>
                    <div style={styles.result}>
                        {resultText}
                    </div>
                </div>

                {/* Кнопка назад */}
                <Link
                    to="/courses"
                    className="btnBack"
                    style={{ textDecoration: 'none', display: 'inline-block' }}
                >Назад

                </Link>
            </div>

            {/* Стилизация CSS-Keyframes инжектится динамически для поддержки анимации пульсации */}
            <style>{`
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
      `}</style>
        </div>
    );
};

// Стили CSS-in-JS (соответствуют CSS-переменным из вашего примера)
const styles: { [key: string]: React.CSSProperties } = {
    body: {
        boxSizing: 'border-box',
        margin: 0,
        padding: 0,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: '#f0f4f8',
        color: '#2d3748',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
    },
    container: {
        background: '#ffffff',
        maxWidth: '550px',
        width: '90%',
        padding: '40px',
        borderRadius: '16px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
        boxSizing: 'border-box',
    },
    h2: {
        marginTop: 0,
        color: '#4a6fa5',
        fontSize: '24px',
        marginBottom: '25px',
        textAlign: 'center',
    },
   
    formGroup: {
        textAlign: 'left',
        marginBottom: '20px',
    },
    titleLabel: {
        display: 'block',
        marginBottom: '8px',
        fontWeight: 600,
        fontSize: '14px',
        color: '#4a5568',
    },
    select: {
        width: '100%',
        padding: '12px 15px',
        borderRadius: '8px',
        border: '2px solid #e2e8f0',
        fontSize: '16px',
        background: '#f8fafc',
        boxSizing: 'border-box',
        outline: 'none',
        transition: 'border-color 0.2s',
    },
    fileUploadWrapper: {
        position: 'relative',
        width: '100%',
    },
    inputFileHidden: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0,
        cursor: 'pointer',
        zIndex: 2,
    },
    customFileUpload: {
        display: 'block',
        width: '100%',
        padding: '14px 15px',
        background: '#f8fafc',
        border: '2px dashed #e2e8f0',
        borderRadius: '8px',
        fontSize: '15px',
        color: '#718096',
        textAlign: 'center',
        boxSizing: 'border-box',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
    },
    customFileUploadSelected: {
        borderColor: '#4a6fa5',
        color: '#4a6fa5',
    },
    btnMain: {
        width: '100%',
        padding: '14px',
        borderRadius: '8px',
        border: 'none',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        backgroundColor: '#4a6fa5',
        color: 'white',
        boxShadow: '0 4px 12px rgba(74, 111, 165, 0.2)',
        marginTop: '10px',
    },
    btnMainDisabled: {
        backgroundColor: '#cbd5e1',
        color: '#94a3b8',
        cursor: 'not-allowed',
        boxShadow: 'none',
        transform: 'none',
    },
    statusBox: {
        marginTop: '15px',
        fontSize: '15px',
        fontWeight: 600,
        color: '#4a6fa5',
        minHeight: '22px',
        textAlign: 'center',
    },
    statusActive: {
        color: '#dd6b20',
        animation: 'pulse 1.5s infinite',
    },
    statusSuccess: {
        color: '#38a169',
    },
    result: {
        marginTop: '10px',
        padding: '15px',
        background: '#f8fafc',
        border: '2px solid #e2e8f0',
        borderRadius: '8px',
        textAlign: 'left',
        minHeight: '150px',
        maxHeight: '250px',
        overflowY: 'auto',
        whiteSpace: 'pre-wrap',
        fontSize: '16px',
        lineHeight: 1.6,
        color: '#1a202c',
        boxSizing: 'border-box',
    },
    btnBack: {
        width: '100%',

        padding: '14px',
        borderRadius: '8px',
        border: 'none',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        backgroundColor: '#718096',
        color: 'white',
      
    },
};

export default AudioToText;