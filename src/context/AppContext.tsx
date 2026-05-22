import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { T, type Lang } from '../data/translations';

type Theme = 'dark-blue' | 'dark-green' | 'dark-orange' | 'light';

interface Toast {
    id: number;
    msg: string;
    type: 'success' | 'error' | 'info';
}

interface AppContextType {
    theme: Theme;
    setTheme: (t: Theme) => void;
    lang: Lang;
    setLang: (l: Lang) => void;
    t: (key: string) => string;
    toasts: Toast[];
    showToast: (msg: string, type?: 'success' | 'error' | 'info', duration?: number) => void;
    loading: boolean;
    setLoading: (v: boolean) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<Theme>(() => (localStorage.getItem('nexus-theme') as Theme) || 'dark-blue');
    const [lang, setLangState] = useState<Lang>(() => (localStorage.getItem('nexus-lang') as Lang) || 'ru');
    const [toasts, setToasts] = useState<Toast[]>([]);
    const [loading, setLoading] = useState(true);
    let toastId = 0;

    const setTheme = useCallback((t: Theme) => {
        setThemeState(t);
        document.documentElement.setAttribute('data-theme', t);
        localStorage.setItem('nexus-theme', t);
    }, []);

    const setLang = useCallback((l: Lang) => {
        setLangState(l);
        document.documentElement.setAttribute('data-lang', l);
        localStorage.setItem('nexus-lang', l);
    }, []);

    const t = useCallback((key: string) => T[lang]?.[key] ?? key, [lang]);

    const showToast = useCallback((msg: string, type: 'success' | 'error' | 'info' = 'info', duration = 4000) => {
        const id = ++toastId;
        setToasts(prev => [...prev, { id, msg, type }]);
        setTimeout(() => setToasts(prev => prev.filter(x => x.id !== id)), duration);
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.setAttribute('data-lang', lang);
    }, []);

    return (
        <AppContext.Provider value={{ theme, setTheme, lang, setLang, t, toasts, showToast, loading, setLoading }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error('useApp must be used within AppProvider');
    return ctx;
}








export const megaLabsData = {
    ru: [
        {
            id: "xus",
            code: "SYS_NODE // XUS_TERMINAL_CORE",
            title: "XUS TERMINAL CORE",
            hash: "0x7F_INIT_XUS",
            target: "/xus",
            techStack: ["Docker", "Linux Kernel", "Bash", "Wireshark", "gRPC"],
            metrics: { complexity: "9/10", load: "1.2M req/sec", isolation: "LXC Containers" },
            features: [
                "Эмуляция критических сбоев инфраструктуры и split-brain сценариев",
                "Развертывание изолированных промышленных сетей внутри кластера",
                "Стресс-тестирование High-Load систем под искусственным DDOS-давлением",
                "Анализ и перехват пакетов на сетевом уровне модели OSI"
            ],
            details: "Закрытый симуляционный комплекс. Архитектура разработана для жесткого стресс-тестирования систем. Новичок или опытный дев сталкивается здесь с каскадными падениями баз данных, аппаратными отказами и симуляцией изоляции узлов сети. Задача — развернуть автоматический мониторинг и восстановить стабильность ядра без потери транзакций."
        },
        {
            id: "mp",
            code: "SYS_NODE // MULTI_PROCESSING_HUB",
            title: "MP HUB (MULTI-PROCESSING)",
            hash: "0x9E_ASYNC_THREADS",
            target: "/Mp ",
            techStack: ["Go Lang", "Kafka", "RabbitMQ", "Redis", "RxJS"],
            metrics: { complexity: "8/10", load: "450K events/sec", isolation: "Goroutines Matrix" },
            features: [
                "Параллельные распределенные вычисления на базе кастомных планировщиков",
                "Оптимизация асинхронных потоков данных и неблокирующий ввод-вывод",
                "Прямая работа с потоками процессора и распределение по ядрам ОС",
                "Построение отказоустойчивых брокеров сообщений с гарантированной доставкой"
            ],
            details: "Инженерная база, уничтожающая задержки (latency). Здесь изучается конкурентное программирование, примитивы синхронизации, пулы потоков и race conditions. Студенты пишут распределенные шины данных, способные переваривать терабайты логов и трансляций без ухода памяти в OOM (Out of Memory)."
        },
        {
            id: "light",
            code: "SYS_NODE // LIGHTSPEED_ENGINE",
            title: "LIGHTSPEED ENGINE",
            hash: "0x1A_ZERO_COST_COMP",
            target: "/light",
            techStack: ["Rust", "C++ 23", "WebAssembly", "LLVM", "SIMD"],
            metrics: { complexity: "10/10", load: "Real-time Vectoring", isolation: "Hardware Native" },
            features: [
                "Экстремальная оптимизация компиляторов и флагов сборки под архитектуры",
                "Низкоуровневый системный код с ручным управлением аллокацией памяти",
                "Сборка и инжекция сверхбыстрых WebAssembly-модулей в браузерные движки",
                "Использование SIMD-инструкций для параллельной обработки массивов"
            ],
            details: "Сектор бескомпромиссной производительности. Никаких виртуальных машин и сборщиков мусора — только прямой контроль над памятью и регистрами. Лаборатория обучает концепциям владения и заимствования (Borrow Checker), оптимизации кэш-линий процессора и созданию движков с ультра-низким временем отклика."
        },
        {
            id: "fast",
            code: "SYS_NODE // FAST_TRACK_PROTOCOL",
            title: "FAST-TRACK PROTOCOL",
            hash: "0x4D_INSTANT_DEPLOY",
            target: "/fast",
            techStack: ["Kubernetes", "Terraform", "Ansible", "GitHub Actions", "ArgoCD"],
            metrics: { complexity: "7/10", load: "Auto-scaling Clusters", isolation: "Namespaces / Pods" },
            features: [
                "Автоматизация сквозных CI/CD конвейеров от коммита до продакшена",
                "Управление облачной и локальной инфраструктурой через код (IaC)",
                "Оркестрация отказоустойчивых кластеров с автоматическим лечением нод",
                "Внедрение стратегий развертывания Blue-Green и Canary без простоя систем"
            ],
            details: "Высокоскоростной конвейер автоматизации для Middle-инженеров. Протокол исключает ручную настройку серверов. Весь процесс сборки, тестирования, линтинга и деплоя пакуется в декларативные манифесты. Инженер учится разворачивать масштабируемые кластеры за минуты и управлять терабайтными хранилищами."
        },
        {
            id: "laboratory",
            code: "SYS_NODE // RESEARCH_LABORATORY",
            title: "NEXUS RESEARCH LABORATORY",
            hash: "0xBF_AI_WEB3_MATRIX",
            target: "/laboratory",
            techStack: ["PyTorch", "Python", "Solidity", "Ethers.js", "Transformers"],
            metrics: { complexity: "10/10", load: "Neural / Cryptographic", isolation: "Sandbox Vault" },
            features: [
                "Обучение и тюнинг глубоких нейроморфных и трансформерных сетей",
                "Криптографический аудит безопасности смарт-контрактов в сетях EVM",
                "Проектирование автономных многоагентных систем и AI-ассистентов",
                "Анализ векторов атак на децентрализованные консенсусы (PoW/PoS)"
            ],
            details: "Центр долгосрочных технологических исследований. Модуль объединяет две самые дорогие индустрии: Искусственный Интеллект и Web3-архитектуру. Практика включает в себя написание безопасных распределенных контрактов, создание локальных LLM-моделей и развертывание децентрализованных систем шифрования данных."
        }
    ],
    en: [
        {
            id: "xus",
            code: "SYS_NODE // XUS_TERMINAL_CORE",
            title: "XUS TERMINAL CORE",
            hash: "0x7F_INIT_XUS",
            target: "xus",
            techStack: ["Docker", "Linux Kernel", "Bash", "Wireshark", "gRPC"],
            metrics: { complexity: "9/10", load: "1.2M req/sec", isolation: "LXC Containers" },
            features: [
                "Infrastructure critical failure and split-brain scenarios emulation",
                "Deployment of isolated industrial networks inside the cluster",
                "High-Load systems stress testing under artificial DDoS pressure",
                "Packet analysis and interception at the OSI model network layer"
            ],
            details: "Closed simulation complex. The architecture is designed for brutal stress testing of systems. A beginner or experienced dev encounters cascading database drops, hardware failures, and simulated network node isolation here. The task is to deploy automatic monitoring and restore core stability without losing transactions."
        },
        {
            id: "mp",
            code: "SYS_NODE // MULTI_PROCESSING_HUB",
            title: "MP HUB (MULTI-PROCESSING)",
            hash: "0x9E_ASYNC_THREADS",
            target: "/Mp ",
            techStack: ["Go Lang", "Kafka", "RabbitMQ", "Redis", "RxJS"],
            metrics: { complexity: "8/10", load: "450K events/sec", isolation: "Goroutines Matrix" },
            features: [
                "Parallel distributed computing based on custom schedulers",
                "Asynchronous data streams optimization and non-blocking I/O",
                "Direct work with CPU threads and allocation across OS cores",
                "Building fault-tolerant message brokers with guaranteed delivery"
            ],
            details: "Engineering base that destroys latency. It covers concurrent programming, synchronization primitives, thread pools, and race conditions. Students write distributed data buses capable of processing terabytes of logs and broadcasts without running into OOM (Out of Memory)."
        },
        {
            id: "light",
            code: "SYS_NODE // LIGHTSPEED_ENGINE",
            title: "LIGHTSPEED ENGINE",
            hash: "0x1A_ZERO_COST_COMP",
            target: "/light",
            techStack: ["Rust", "C++ 23", "WebAssembly", "LLVM", "SIMD"],
            metrics: { complexity: "10/10", load: "Real-time Vectoring", isolation: "Hardware Native" },
            features: [
                "Extreme optimization of compilers and build flags for specific architectures",
                "Low-level system code with manual memory allocation management",
                "Assembly and injection of ultra-fast WebAssembly modules into browser engines",
                "SIMD instructions utilization for parallel processing of arrays"
            ],
            details: "The sector of uncompromising performance. No virtual machines or garbage collectors — only direct control over memory and registers. The lab teaches ownership and borrowing concepts (Borrow Checker), CPU cache-line optimization, and building engines with ultra-low response times."
        },
        {
            id: "fast",
            code: "SYS_NODE // FAST_TRACK_PROTOCOL",
            title: "FAST-TRACK PROTOCOL",
            hash: "0x4D_INSTANT_DEPLOY",
            target: "/fast",
            techStack: ["Kubernetes", "Terraform", "Ansible", "GitHub Actions", "ArgoCD"],
            metrics: { complexity: "7/10", load: "Auto-scaling Clusters", isolation: "Namespaces / Pods" },
            features: [
                "End-to-end CI/CD pipelines automation from commit to production",
                "Cloud and on-premise infrastructure management via code (IaC)",
                "Orchestration of fault-tolerant clusters with automated node self-healing",
                "Implementation of Blue-Green and Canary deployment strategies with zero downtime"
            ],
            details: "High-speed automation pipeline for Middle engineers. The protocol completely eliminates manual server configuration. The entire build, test, lint, and deploy lifecycle is packed into declarative manifests. Engineers learn to spin up scalable clusters in minutes."
        },
        {
            id: "laboratory",
            code: "SYS_NODE // RESEARCH_LABORATORY",
            title: "NEXUS RESEARCH LABORATORY",
            hash: "0xBF_AI_WEB3_MATRIX",
            target: "/laboratory",
            techStack: ["PyTorch", "Python", "Solidity", "Ethers.js", "Transformers"],
            metrics: { complexity: "10/10", load: "Neural / Cryptographic", isolation: "Sandbox Vault" },
            features: [
                "Training and fine-tuning of deep neuromorphic and transformer networks",
                "Cryptographic security auditing of smart contracts in EVM networks",
                "Designing autonomous multi-agent systems and AI assistants",
                "Analysis of attack vectors on decentralized consensuses (PoW/PoS)"
            ],
            details: "Center for long-term technological research. The module combines two of the most high-value industries: Artificial Intelligence and Web3 architecture. Practice includes writing secure distributed contracts, setting up local LLM models, and deploying decentralized data encryption systems."
        }
    ],
    uz: [
        {
            id: "xus",
            code: "SYS_NODE // XUS_TERMINAL_CORE",
            title: "XUS TERMINAL CORE",
            hash: "0x7F_INIT_XUS",
            target: "/xus",
            techStack: ["Docker", "Linux Kernel", "Bash", "Wireshark", "gRPC"],
            metrics: { complexity: "9/10", load: "1.2M req/sec", isolation: "LXC Containers" },
            features: [
                "Kritik infratuzilma nosozliklari va split-brain ssenariylarini simulyatsiya qilish",
                "Klaster ichida izolyatsiyalangan sanoat tarmoqlarini joylashtirish",
                "Sun'iy DDoS bosimi ostida High-Load tizimlarini stress-testdan o'tkazish",
                "OSI modelining tarmoq darajasida paketlarni tahlil qilish va tutib qolish"
            ],
            details: "Yopiq simulyatsiya majmuasi. Arxitektura tizimlarni qattiq stress-testdan o'tkazish uchun mo'ljallangan. Bu yerda boshlang'ich yoki tajribali dasturchi ma'lumotlar bazasining kaskadli uzilishlari, apparat nosozliklari va tarmoq tugunlarining izolyatsiyasi bilan to'qnash keladi. Vazifa — avtomatlashtirilgan monitoringni yo'lga qo'yish va tranzaksiyalarni yo'qotmasdan yadroning barqarorligini tiklash."
        },
        {
            id: "mp",
            code: "SYS_NODE // MULTI_PROCESSING_HUB",
            title: "MP HUB (MULTI-PROCESSING)",
            hash: "0x9E_ASYNC_THREADS",
            target: "/Mp ",
            techStack: ["Go Lang", "Kafka", "RabbitMQ", "Redis", "RxJS"],
            metrics: { complexity: "8/10", load: "450K events/sec", isolation: "Goroutines Matrix" },
            features: [
                "Maxsus rejalashtiruvchilar (schedulers) asosida parallel taqsimlangan hisoblashlar",
                "Asinxron ma'lumotlar oqimini optimallashtirish va bloklamaydigan I/O",
                "Protsessor oqimlari bilan to'g'ridan-to'g'ri ishlash va OT yadrolari bo'ylab taqsimlash",
                "Kafolatlangan yetkazib berishga ega bo'lgan nosozliklarga chidamli xabar brokerlarini qurish"
            ],
            details: "Kechikishlarni (latency) yo'q qiladigan muhandislik bazasi. Bu yerda parallel dasturlash, sinxronizatsiya primitivlari, oqim pullari (thread pools) va race conditions o'rganiladi. Talabalar xotirani OOM (Out of Memory) holatiga olib kelmasdan, terabaytlab loglarni qayta ishlay oladigan taqsimlangan ma'lumotlar shinalarini yozadilar."
        },
        {
            id: "light",
            code: "SYS_NODE // LIGHTSPEED_ENGINE",
            title: "LIGHTSPEED ENGINE",
            hash: "0x1A_ZERO_COST_COMP",
            target: "/light",
            techStack: ["Rust", "C++ 23", "WebAssembly", "LLVM", "SIMD"],
            metrics: { complexity: "10/10", load: "Real-time Vectoring", isolation: "Hardware Native" },
            features: [
                "Kompilyatorlarni va ma'lum arxitekturalar uchun build flaglarini ekstremal optimallashtirish",
                "Xotirani qo'lda boshqarishga ega past darajali (low-level) tizimli kod",
                "Brauzer dvigatellariga o'ta tezkor WebAssembly modullarini yig'ish va kiritish",
                "Massivlarni parallel qayta ishlash uchun SIMD instruksiyalaridan foydalanish"
            ],
            details: "Murosasiz unumdorlik sektori. Hech qanday virtual mashina yoki garbage collector yo'q — faqat xotira va registrlar ustidan to'g'ridan-to'g'ri nazorat. Laboratoriya egalik va ijaraga olish (Borrow Checker) konsepsiyalarini, protsessor kesh-liniyalarini optimallashtirishni va o'ta past javob vaqtiga ega dvigatellarni yaratishni o'rgatadi."
        },
        {
            id: "fast",
            code: "SYS_NODE // FAST_TRACK_PROTOCOL",
            title: "FAST-TRACK PROTOCOL",
            hash: "0x4D_INSTANT_DEPLOY",
            target: "/fast",
            techStack: ["Kubernetes", "Terraform", "Ansible", "GitHub Actions", "ArgoCD"],
            metrics: { complexity: "7/10", load: "Auto-scaling Clusters", isolation: "Namespaces / Pods" },
            features: [
                "Kommitdan productiongacha bo'lgan uzluksiz CI/CD konveyerlarini avtomatlashtirish",
                "Kod orqali bulutli va lokal infratuzilmani boshqarish (IaC)",
                "Tugunlarni avtomatik tiklaydigan nosozliklarga chidamli klasterlarni orkestratsiya qilish",
                "Tizim uzilishlarisiz Blue-Green va Canary deploy strategiyalarini joriy etish"
            ],
            details: "Middle muhandislar uchun yuqori tezlikdagi avtomatlashtirish konveyeri. Protokol serverlarni qo'lda sozlashni butunlay istisno qiladi. Loyihani yig'ish, testlash, linting va deploy qilish jarayonlari deklarativ manifestlarga joylanadi. Muhandis bir necha daqiqada kengayadigan klasterlarni ishga tushirishni o'rganadi."
        },
        {
            id: "laboratory",
            code: "SYS_NODE // RESEARCH_LABORATORY",
            title: "NEXUS RESEARCH LABORATORY",
            hash: "0xBF_AI_WEB3_MATRIX",
            target: "/laboratory",
            techStack: ["PyTorch", "Python", "Solidity", "Ethers.js", "Transformers"],
            metrics: { complexity: "10/10", load: "Neural / Cryptographic", isolation: "Sandbox Vault" },
            features: [
                "Chuqur neyromorf va transformer tarmoqlarini o'qitish hamda sozlash (fine-tuning)",
                "EVM tarmoqlarida smart-kontraktlarning kriptografik xavfsizlik auditi",
                "Avtonom ko'p agentli tizimlar va AI assistentlarini loyihalash",
                "Markazlashtirilmagan konsensuslarga (PoW/PoS) hujum vektorlarini tahlil qilish"
            ],
            details: "Uzoq muddatli texnologik tadqiqotlar markazi. Modul eng qimmat ikkita industriyani birlashtiradi: Sun'iy Intellekt va Web3 arxitekturasi. Amaliyot xavfsiz taqsimlangan kontraktlarni yozish, lokal LLM modellarini yaratish va ma'lumotlarni shifrlashning markazlashtirilmagan tizimlarini joriy etishni o'z ichiga oladi."
        }
    ]
};









