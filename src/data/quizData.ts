export interface QuizOption {
    text: { ru: string; en: string; uz: string };
    scores: Record<string, number>;
}

export interface QuizQuestion {
    ru: string;
    en: string;
    uz: string;
    options: QuizOption[];
}

export interface DirectionCard {
    title: { ru: string; en: string; uz: string };
    level: { ru: string; en: string; uz: string };
    stack: string;
    desc: { ru: string; en: string; uz: string };
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
    {
        ru: "Что вас больше всего привлекает в работе с технологиями?",
        en: "What attracts you the most about working with technology?",
        uz: "Texnologiyalar bilan ishlash sizni nima eng ko'p jalb qiladi?",
        options: [
            {
                text: { ru: "Создание красивых и удобных интерфейсов", en: "Creating beautiful and user-friendly interfaces", uz: "Chiroyli va qulay interfeyslarni yaratish" },
                scores: { ui: 3, front: 1, mobile: 1 }
            },
            {
                text: { ru: "Разработка логики и функциональности приложений", en: "Developing application logic and functionality", uz: "Ilovalar mantiqi va funksionalligini ishlab chiqish" },
                scores: { back: 3, front: 1, ai: 1 }
            },
            {
                text: { ru: "Автоматизация процессов и управление серверами", en: "Automating processes and managing servers", uz: "Jarayonlarni avtomatlashtirish va serverlarni boshqarish" },
                scores: { devops: 3, back: 1, cyber: 1 }
            },
            {
                text: { ru: "Защита данных и обеспечение безопасности систем", en: "Protecting data and ensuring system security", uz: "Ma'lumotlarni himoya qilish va tizim xavfsizligini ta'minlash" },
                scores: { cyber: 3, devops: 1, back: 1 }
            }
        ]
    },
    {
        ru: "Какой тип задач вам интереснее решать?",
        en: "What type of tasks do you find more interesting to solve?",
        uz: "Qanday turdagi vazifalarni yechish sizga qiziqaroq?",
        options: [
            {
                text: { ru: "Визуальное оформление и анимация", en: "Visual design and animation", uz: "Vizual dizayn va animatsiya" },
                scores: { ui: 3, front: 2, mobile: 1 }
            },
            {
                text: { ru: "Обработка данных и создание API", en: "Data processing and creating APIs", uz: "Ma'lumotlarni qayta ishlash va API yaratish" },
                scores: { back: 3, devops: 1, ai: 1 }
            },
            {
                text: { ru: "Настройка pipelines и CI/CD", en: "Setting up pipelines and CI/CD", uz: "Pipelines va CI/CD sozlash" },
                scores: { devops: 3, back: 1, cyber: 1 }
            },
            {
                text: { ru: "Анализ уязвимостей и пентестинг", en: "Vulnerability analysis and pentesting", uz: "Zaifliklarni tahlil qilish va pentesting" },
                scores: { cyber: 3, devops: 1, back: 1 }
            }
        ]
    },
    {
        ru: "Как вы предпочитаете работать?",
        en: "How do you prefer to work?",
        uz: "Qanday ishlashni afzal ko'rasiz?",
        options: [
            {
                text: { ru: "Визуальный результат важнее — люблю видеть, что создаю", en: "Visual result matters more — I love seeing what I create", uz: "Vizual natija muhimroq — nima yaratayotganimni ko'rishni yaxshi ko'raman" },
                scores: { ui: 3, front: 2, mobile: 2 }
            },
            {
                text: { ru: "Важно, чтобы всё работало надёжно под капотом", en: "It's important that everything works reliably under the hood", uz: "Hammasi ishonchli ishlashi muhim" },
                scores: { back: 3, devops: 1, cyber: 1 }
            },
            {
                text: { ru: "Мне нравится оптимизировать и автоматизировать процессы", en: "I enjoy optimizing and automating processes", uz: "Jarayonlarni optimallashtirish va avtomatlashtirish yoqadi" },
                scores: { devops: 3, back: 1, ai: 1 }
            },
            {
                text: { ru: "Мне нравится искать и устранять слабые места в системах", en: "I enjoy finding and fixing weak points in systems", uz: "Tizimdagi zaif nuqtalarni topish va tuzatish yoqadi" },
                scores: { cyber: 3, devops: 1, back: 1 }
            }
        ]
    },
    {
        ru: "Какая область технологий вызывает у вас наибольший интерес?",
        en: "Which area of technology interests you the most?",
        uz: "Texnologiyaning qaysi sohasi sizga eng qiziq?",
        options: [
            {
                text: { ru: "Figma, дизайн-системы, типографика", en: "Figma, design systems, typography", uz: "Figma, dizayn tizimlari, tipografiya" },
                scores: { ui: 3, front: 1, mobile: 1 }
            },
            {
                text: { ru: "React, Node.js, базы данных", en: "React, Node.js, databases", uz: "React, Node.js, ma'lumotlar bazalari" },
                scores: { front: 2, back: 3, devops: 1 }
            },
            {
                text: { ru: "Docker, Kubernetes, облачные сервисы", en: "Docker, Kubernetes, cloud services", uz: "Docker, Kubernetes, bulutli xizmatlar" },
                scores: { devops: 3, back: 1, cyber: 1 }
            },
            {
                text: { ru: "Машинное обучение, нейросети, анализ данных", en: "Machine learning, neural networks, data analysis", uz: "Mashinnoe obuchenie, neyron tarmoqlar, ma'lumotlarni tahlil qilish" },
                scores: { ai: 3, back: 2, devops: 1 }
            }
        ]
    },
    {
        ru: "Что вы делаете, когда сталкиваетесь с проблемой?",
        en: "What do you do when you face a problem?",
        uz: "Muammoga duch kelganingizda nima qilasiz?",
        options: [
            {
                text: { ru: "Анализирую визуальную сторону и ищу лучший вариант", en: "I analyze the visual side and look for the best option", uz: "Vizual tomonni tahlil qilaman va eng yaxshi variantni qidiraman" },
                scores: { ui: 3, front: 1, mobile: 1 }
            },
            {
                text: { ru: "Погружаюсь в логику и код, чтобы найти корень проблемы", en: "I dive into the logic and code to find the root cause", uz: "Mantiq va kodga sho'ng'iyman, muammoning ildizini topish uchun" },
                scores: { back: 3, front: 1, ai: 1 }
            },
            {
                text: { ru: "Проверяю конфигурации и логи серверов", en: "I check server configurations and logs", uz: "Server konfiguratsiyalari va jurnallarini tekshiraman" },
                scores: { devops: 3, back: 1, cyber: 1 }
            },
            {
                text: { ru: "Ищу уязвимости и проверяю все возможные точки входа", en: "I look for vulnerabilities and check all possible entry points", uz: "Zaifliklarni qidiraman va barcha mumkin bo'lgan kirish nuqtalarini tekshiraman" },
                scores: { cyber: 3, devops: 1, back: 1 }
            }
        ]
    },
    {
        ru: "Какой проект вам хотелось бы создать?",
        en: "What project would you like to create?",
        uz: "Qanday loyihani yaratishni xohlaysiz?",
        options: [
            {
                text: { ru: "Стильное мобильное приложение с отличным UX", en: "A stylish mobile app with great UX", uz: "Ajoyib UXga ega zamonaviy mobil ilova" },
                scores: { mobile: 3, ui: 2, front: 1 }
            },
            {
                text: { ru: "Высоконагруженный сервер с мгновенным откликом", en: "A high-load server with instant response", uz: "Bir lahzada javob beradigan yuqori yuklamali server" },
                scores: { back: 3, devops: 1, ai: 1 }
            },
            {
                text: { ru: "Систему автоматического деплоя и мониторинга", en: "An automatic deployment and monitoring system", uz: "Avtomatik deploy va monitoring tizimi" },
                scores: { devops: 3, back: 1, cyber: 1 }
            },
            {
                text: { ru: "Умного ассистента на основе ИИ", en: "An AI-powered smart assistant", uz: "Sun'iy intellektga asoslangan aqlli yordamchi" },
                scores: { ai: 3, back: 2, mobile: 1 }
            }
        ]
    },
    {
        ru: "Как вы относитесь к командной работе?",
        en: "How do you feel about teamwork?",
        uz: "Jamoa bilan ishlashga qanday qarasiz?",
        options: [
            {
                text: { ru: "Люблю обсуждать визуальные решения с командой", en: "I enjoy discussing visual solutions with the team", uz: "Jamoa bilan vizual yechimlarni muhokama qilish yoqadi" },
                scores: { ui: 3, front: 1, mobile: 1 }
            },
            {
                text: { ru: "Предпочитаю чётко разделённые задачи и API-контракты", en: "I prefer clearly divided tasks and API contracts", uz: "Aniq bo'lingan vazifalar va API shartnomalarini afzal ko'raman" },
                scores: { back: 3, front: 1, devops: 1 }
            },
            {
                text: { ru: "Важно наладить процессы и коммуникацию в команде", en: "It's important to establish processes and communication in the team", uz: "Jamoada jarayonlar va kommunikatsiyani yo'lga qo'yish muhim" },
                scores: { devops: 3, back: 1, cyber: 1 }
            },
            {
                text: { ru: "Работаю автономно, но готов делиться знаниями", en: "I work autonomously but am ready to share knowledge", uz: "Mustaqil ishlayman, lekin bilimlarni ulashishga tayyorman" },
                scores: { cyber: 3, ai: 2, back: 1 }
            }
        ]
    },
    {
        ru: "Какой навык вы хотите развивать в первую очередь?",
        en: "What skill do you want to develop first?",
        uz: "Qaysi ko'nikmani birinchi o'rabda rivojlantirmoqchisiz?",
        options: [
            {
                text: { ru: "Дизайн-мышление и работа с прототипами", en: "Design thinking and prototyping", uz: "Dizayn-fikrlash va prototiplash" },
                scores: { ui: 3, front: 1, mobile: 1 }
            },
            {
                text: { ru: "Алгоритмы и структуры данных", en: "Algorithms and data structures", uz: "Algoritmlar va ma'lumotlar tuzilmalari" },
                scores: { back: 3, ai: 1, front: 1 }
            },
            {
                text: { ru: "Скриптинг и управление инфраструктурой", en: "Scripting and infrastructure management", uz: "Skripting va infratuzilmani boshqarish" },
                scores: { devops: 3, back: 1, cyber: 1 }
            },
            {
                text: { ru: "Криптография и сетевая безопасность", en: "Cryptography and network security", uz: "Kriptografiya va tarmoq xavfsizligi" },
                scores: { cyber: 3, devops: 1, back: 1 }
            }
        ]
    },
    {
        ru: "Что вас мотивирует в карьере?",
        en: "What motivates you in your career?",
        uz: "Karyerangizda sizni nima motivatsiya qiladi?",
        options: [
            {
                text: { ru: "Видеть, как люди пользуются моим дизайном", en: "Seeing people use my design", uz: "Odamlar mening dizaynimdan foydalanishini ko'rish" },
                scores: { ui: 3, mobile: 2, front: 1 }
            },
            {
                text: { ru: "Создавать масштабируемые и надёжные системы", en: "Building scalable and reliable systems", uz: "Masshtablanuvchi va ishonchli tizimlarni yaratish" },
                scores: { back: 3, devops: 1, ai: 1 }
            },
            {
                text: { ru: "Гарантировать бесперебойную работу сервисов", en: "Ensuring uninterrupted operation of services", uz: "Xizmatlarning uzluksiz ishlashini ta'minlash" },
                scores: { devops: 3, back: 1, cyber: 1 }
            },
            {
                text: { ru: "Создавать инновации с помощью ИИ", en: "Creating innovations with AI", uz: "Sun'iy intellekt yordamida innovatsiyalar yaratish" },
                scores: { ai: 3, back: 2, mobile: 1 }
            }
        ]
    }
];

export const DIRECTIONS_CARDS: Record<string, DirectionCard> = {
    ui: {
        title: {
            ru: "UI/UX Дизайн",
            en: "UI/UX Design",
            uz: "UI/UX Dizayn"
        },
        level: {
            ru: "Начинающий — Продвинутый",
            en: "Beginner — Advanced",
            uz: "Boshlang'ich — Ilg'or"
        },
        stack: "Figma, Adobe XD, Sketch, Prototyping, Design Systems",
        desc: {
            ru: "Создавайте интуитивные и красивые интерфейсы, которые пользователи полюбят с первого взгляда. Вы научитесь дизайн-мышлению, прототипированию, работе с типографикой и цветовыми палитрами, а также созданию дизайн-систем для масштабных продуктов.",
            en: "Create intuitive and beautiful interfaces that users will love at first sight. You will learn design thinking, prototyping, working with typography and color palettes, as well as building design systems for large-scale products.",
            uz: "Foydalanuvchilar birinchi qarashda sevib qoladigan intuitiv va chiroyli interfeyslarni yaratish. Siz dizayn-fikrlash, prototiplash, tipografiya va rang palitralari bilan ishlash, shuningdek keng ko'lamli mahsulotlar uchun dizayn tizimlarini yaratishni o'rganasiz."
        }
    },
    front: {
        title: {
            ru: "Frontend Разработка",
            en: "Frontend Development",
            uz: "Frontend Ishlab chiqish"
        },
        level: {
            ru: "Начинающий — Продвинутый",
            en: "Beginner — Advanced",
            uz: "Boshlang'ich — Ilg'or"
        },
        stack: "HTML, CSS, JavaScript, TypeScript, React, Next.js, Tailwind CSS",
        desc: {
            ru: "Превращайте дизайн в живые, интерактивные веб-приложения. Освойте современные фреймворки, состояние приложений, анимации и оптимизацию производительности для создания быстрых и отзывчивых пользовательских интерфейсов.",
            en: "Turn design into living, interactive web applications. Master modern frameworks, application state, animations, and performance optimization to build fast and responsive user interfaces.",
            uz: "Dizaynni jonli, interaktiv veb-ilovalarga aylantiring. Zamonaviy freymvorklar, ilova holati, animatsiyalar va performans optimallashtirishni o'rganib, tez va sezgir foydalanuvchi interfeyslarini yarating."
        }
    },
    back: {
        title: {
            ru: "Backend Разработка",
            en: "Backend Development",
            uz: "Backend Ishlab chiqish"
        },
        level: {
            ru: "Начинающий — Продвинутый",
            en: "Beginner — Advanced",
            uz: "Boshlang'ich — Ilg'or"
        },
        stack: "Node.js, Python, PostgreSQL, MongoDB, REST API, GraphQL, Docker",
        desc: {
            ru: "Стройте надёжные серверные решения и API, которые выдерживают высокие нагрузки. Вы освоите проектирование баз данных, создание микросервисных архитектур, обеспечение безопасности на серверном уровне и масштабирование приложений.",
            en: "Build reliable server solutions and APIs that handle high loads. You will master database design, creating microservice architectures, ensuring server-level security, and scaling applications.",
            uz: "Yuqori yuklamalarga chidamli ishonchli server yechimlari va APIlarni quring. Siz ma'lumotlar bazasi dizayni, mikroservis arxitekturalarini yaratish, server darajasida xavfsizlikni ta'minlash va ilovalarni masshtablashni o'rganasiz."
        }
    },
    mobile: {
        title: {
            ru: "Мобильная Разработка",
            en: "Mobile Development",
            uz: "Mobil Ishlab chiqish"
        },
        level: {
            ru: "Начинающий — Продвинутый",
            en: "Beginner — Advanced",
            uz: "Boshlang'ich — Ilg'or"
        },
        stack: "React Native, Flutter, Swift, Kotlin, Firebase",
        desc: {
            ru: "Разрабатывайте нативные и кросс-платформенные мобильные приложения для iOS и Android. Вы научитесь работать с навигацией, состоянием, нативными модулями, пуш-уведомлениями и публикацией в App Store и Google Play.",
            en: "Develop native and cross-platform mobile applications for iOS and Android. You will learn to work with navigation, state, native modules, push notifications, and publishing to App Store and Google Play.",
            uz: "iOS va Android uchun native va kross-platforma mobil ilovalarni ishlab chiqing. Siz navigatsiya, holat, native modullar, push-bildirishnomalar va App Store hamda Google Playga nashr qilish bilan ishlashni o'rganasiz."
        }
    },
    devops: {
        title: {
            ru: "DevOps Инженерия",
            en: "DevOps Engineering",
            uz: "DevOps Muhandislik"
        },
        level: {
            ru: "Средний — Продвинутый",
            en: "Intermediate — Advanced",
            uz: "O'rtacha — Ilg'or"
        },
        stack: "Docker, Kubernetes, CI/CD, AWS, Terraform, Linux, Monitoring",
        desc: {
            ru: "Автоматизируйте процессы разработки,.deploy и эксплуатации приложений. Вы освоите контейнеризацию, оркестрацию, настройку CI/CD пайплайнов, управление облачной инфраструктурой и мониторинг производительности систем.",
            en: "Automate development, deployment, and operations processes. You will master containerization, orchestration, CI/CD pipeline setup, cloud infrastructure management, and system performance monitoring.",
            uz: "Ishlab chiqish, deploy va operatsion jarayonlarni avtomatlashtiring. Siz konteynerizatsiya, orkestratsiya, CI/CD pipeline sozlash, bulutli infratuzilmani boshqarish va tizim performansi monitoringini o'rganasiz."
        }
    },
    cyber: {
        title: {
            ru: "Кибербезопасность",
            en: "Cybersecurity",
            uz: "Kiberxavfsizlik"
        },
        level: {
            ru: "Средний — Продвинутый",
            en: "Intermediate — Advanced",
            uz: "O'rtacha — Ilg'or"
        },
        stack: "Network Security, Penetration Testing, SIEM, Cryptography, OWASP, Linux",
        desc: {
            ru: "Защищайте системы и данные от киберугроз. Вы изучите методы пентестинга, анализ уязвимостей, криптографию, защиту сетей, соблюдение стандартов безопасности и реагирование на инциденты для обеспечения надёжной защиты информационных активов.",
            en: "Protect systems and data from cyber threats. You will study penetration testing methods, vulnerability analysis, cryptography, network defense, compliance with security standards, and incident response to ensure reliable protection of information assets.",
            uz: "Tizimlar va ma'lumotlarni kiber-xavflardan himoya qiling. Siz pentesting usullari, zaifliklarni tahlil qilish, kriptografiya, tarmoq himoyasi, xavfsizlik standartlariga rioya qilish va voqealarga javob berishni o'rganasiz."
        }
    },
    ai: {
        title: {
            ru: "ИИ и Машинное Обучение",
            en: "AI & Machine Learning",
            uz: "Sun'iy Intellekt va Mashinaviy O'qitish"
        },
        level: {
            ru: "Средний — Продвинутый",
            en: "Intermediate — Advanced",
            uz: "O'rtacha — Ilg'or"
        },
        stack: "Python, TensorFlow, PyTorch, Scikit-learn, NLP, Computer Vision",
        desc: {
            ru: "Создавайте интеллектуальные системы, способные обучаться и принимать решения. Вы освоите основы машинного обучения, глубокое обучение, обработку естественного языка, компьютерное зрение и развёртывание моделей в продакшн.",
            en: "Create intelligent systems capable of learning and making decisions. You will master the fundamentals of machine learning, deep learning, natural language processing, computer vision, and deploying models to production.",
            uz: "O'rganish va qaror qabul qila oladigan intellektual tizimlarni yarating. Siz mashinaviy o'qitish asoslari, chuqur o'qitish, tabiiy tilni qayta ishlash, kompyuter ko'rish va modellarni ishlab chiqarishga joylashtirishni o'rganasiz."
        }
    }
};
