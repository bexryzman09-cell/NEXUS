export interface Course {
    category: string;
    icon: string;
    levelKey: string;
    titleKey: string;
    descKey: string;
    durKey: string;
    formatKey: string;
    price: string;
    delay?: number;
}

export interface Teacher {
    avatarClass: string;
    initials: string;
    nameKey: string;
    roleKey: string;
    bioKey: string;
    quoteKey: string;
    tags: string[];
    stats: { years: number; students: string; rating: string; courses: number };
    delay?: number;
}

export interface Student {
    avatarClass: string;
    initials: string;
    company: string;
    nameKey: string;
    courseKey: string;
    quoteKey: string;
    salary: string;
}

export interface NewsItem {
    id: number;
    featured?: boolean;
    imgClass: string;
    categoryKey: string;
    date: string;
    titleKey: string;
    excerptKey?: string;
    linkKey: string;
}

export const courses: Course[] = [
    { category: 'frontend', icon: '⬡', levelKey: 'level.junior', titleKey: 'course1.title', descKey: 'course1.desc', durKey: 'course1.dur', formatKey: 'format.online', price: 'от 299 $' },
    { category: 'backend', icon: '◈', levelKey: 'level.middle', titleKey: 'course2.title', descKey: 'course2.desc', durKey: 'course2.dur', formatKey: 'format.hybrid', price: 'от 349 $', delay: 100 },
    { category: 'ai', icon: '⬟', levelKey: 'level.senior', titleKey: 'course3.title', descKey: 'course3.desc', durKey: 'course3.dur', formatKey: 'format.online', price: 'от 499 $', delay: 200 },
    { category: 'mobile', icon: '⬡', levelKey: 'level.junior', titleKey: 'course4.title', descKey: 'course4.desc', durKey: 'course4.dur', formatKey: 'format.offline', price: 'от 379 $', delay: 300 },
    { category: 'design', icon: '◈', levelKey: 'level.junior', titleKey: 'course5.title', descKey: 'course5.desc', durKey: 'course5.dur', formatKey: 'format.online', price: 'от 249 $', delay: 100 },
    { category: 'backend', icon: '⬟', levelKey: 'level.middle', titleKey: 'course6.title', descKey: 'course6.desc', durKey: 'course6.dur', formatKey: 'format.hybrid', price: 'от 449 $', delay: 200 },
    { category: 'security', icon: '⚠', levelKey: 'level.middle', titleKey: 'course7.title', descKey: 'course7.desc', durKey: 'course7.dur', formatKey: 'format.hybrid', price: 'от 399 $', delay: 300 },
    { category: 'frontend', icon: '⌘', levelKey: 'level.senior', titleKey: 'course8.title', descKey: 'course8.desc', durKey: 'course8.dur', formatKey: 'format.online', price: 'от 459 $', delay: 100 },
    { category: 'ai', icon: '∑', levelKey: 'level.senior', titleKey: 'course12.title', descKey: 'course12.desc', durKey: 'course12.dur', formatKey: 'format.online', price: 'от 499 $', delay: 200 },
];

export const teachers: Teacher[] = [
    { avatarClass: 'teacher-avatar--1', initials: 'AK', nameKey: 'teacher1.name', roleKey: 'teacher1.role', bioKey: 'teacher1.bio', quoteKey: 'teacher1.quote', tags: ['React', 'WebGL', 'TypeScript'], stats: { years: 10, students: '500+', rating: '4.9', courses: 12 } },
    { avatarClass: 'teacher-avatar--2', initials: 'МУ', nameKey: 'teacher2.name', roleKey: 'teacher2.role', bioKey: 'teacher2.bio', quoteKey: 'teacher2.quote', tags: ['Python', 'PyTorch', 'NLP'], stats: { years: 8, students: '320+', rating: '5.0', courses: 6 }, delay: 100 },
    { avatarClass: 'teacher-avatar--3', initials: 'ДН', nameKey: 'teacher3.name', roleKey: 'teacher3.role', bioKey: 'teacher3.bio', quoteKey: 'teacher3.quote', tags: ['K8s', 'Terraform', 'AWS'], stats: { years: 12, students: '280+', rating: '4.8', courses: 4 }, delay: 200 },
    { avatarClass: 'teacher-avatar--4', initials: 'ЗА', nameKey: 'teacher4.name', roleKey: 'teacher4.role', bioKey: 'teacher4.bio', quoteKey: 'teacher4.quote', tags: ['Figma', 'UX Research', 'Motion'], stats: { years: 9, students: '400+', rating: '4.9', courses: 8 }, delay: 300 },
    { avatarClass: 'teacher-avatar--5', initials: 'РС', nameKey: 'teacher5.name', roleKey: 'teacher5.role', bioKey: 'teacher5.bio', quoteKey: 'teacher5.quote', tags: ['Go', 'Redis', 'gRPC'], stats: { years: 11, students: '210+', rating: '4.7', courses: 5 }, delay: 100 },
    { avatarClass: 'teacher-avatar--6', initials: 'НК', nameKey: 'teacher6.name', roleKey: 'teacher6.role', bioKey: 'teacher6.bio', quoteKey: 'teacher6.quote', tags: ['Pandas', 'Spark', 'LLM'], stats: { years: 7, students: '350+', rating: '4.9', courses: 7 }, delay: 200 },
    { avatarClass: 'teacher-avatar--7', initials: 'ЕС', nameKey: 'teacher7.name', roleKey: 'teacher7.role', bioKey: 'teacher7.bio', quoteKey: 'teacher7.quote', tags: ['Product', 'A/B Tests', 'Metrics'], stats: { years: 8, students: '190+', rating: '4.8', courses: 3 } },
    { avatarClass: 'teacher-avatar--8', initials: 'ИП', nameKey: 'teacher8.name', roleKey: 'teacher8.role', bioKey: 'teacher8.bio', quoteKey: 'teacher8.quote', tags: ['Swift', 'Combine', 'CoreAudio'], stats: { years: 14, students: '410+', rating: '5.0', courses: 9 }, delay: 100 },
    { avatarClass: 'teacher-avatar--9', initials: 'ОЛ', nameKey: 'teacher9.name', roleKey: 'teacher9.role', bioKey: 'teacher9.bio', quoteKey: 'teacher9.quote', tags: ['CyberSec', 'Pentest', 'Linux'], stats: { years: 10, students: '150+', rating: '4.9', courses: 2 }, delay: 200 },
    { avatarClass: 'teacher-avatar--10', initials: 'ТВ', nameKey: 'teacher10.name', roleKey: 'teacher10.role', bioKey: 'teacher10.bio', quoteKey: 'teacher10.quote', tags: ['Selenium', 'Java', 'CI/CD'], stats: { years: 6, students: '310+', rating: '4.8', courses: 5 } },
    { avatarClass: 'teacher-avatar--11', initials: 'АН', nameKey: 'teacher11.name', roleKey: 'teacher11.role', bioKey: 'teacher11.bio', quoteKey: 'teacher11.quote', tags: ['SQL', 'Tableau', 'Statistics'], stats: { years: 7, students: '240+', rating: '4.9', courses: 4 }, delay: 100 },
    { avatarClass: 'teacher-avatar--12', initials: 'МБ', nameKey: 'teacher12.name', roleKey: 'teacher12.role', bioKey: 'teacher12.bio', quoteKey: 'teacher12.quote', tags: ['Kotlin', 'Compose', 'Dagger'], stats: { years: 9, students: '290+', rating: '4.7', courses: 6 }, delay: 200 },
];

export const students: Student[] = [
    { avatarClass: 'student-card__avatar--1', initials: 'АД', company: 'Google', nameKey: 'student1.name', courseKey: 'student1.course', quoteKey: 'student1.quote', salary: '$4 500 / мес' },
    { avatarClass: 'student-card__avatar--2', initials: 'НТ', company: 'Yandex', nameKey: 'student2.name', courseKey: 'student2.course', quoteKey: 'student2.quote', salary: '$5 200 / мес' },
    { avatarClass: 'student-card__avatar--3', initials: 'ОМ', company: 'Uzum', nameKey: 'student3.name', courseKey: 'student3.course', quoteKey: 'student3.quote', salary: '$3 800 / мес' },
    { avatarClass: 'student-card__avatar--4', initials: 'ФХ', company: 'Epam', nameKey: 'student4.name', courseKey: 'student4.course', quoteKey: 'student4.quote', salary: '$2 900 / мес' },
    { avatarClass: 'student-card__avatar--5', initials: 'МК', company: 'Tinkoff', nameKey: 'student5.name', courseKey: 'student5.course', quoteKey: 'student5.quote', salary: '$4 100 / мес' },
    { avatarClass: 'student-card__avatar--6', initials: 'АС', company: 'Meta', nameKey: 'student6.name', courseKey: 'student6.course', quoteKey: 'student6.quote', salary: '$3 600 / мес' },
    { avatarClass: 'student-card__avatar--7', initials: 'БР', company: 'EPAM', nameKey: 'student7.name', courseKey: 'student7.course', quoteKey: 'student7.quote', salary: '$4 300 / мес' },
];

    export const partners: string[] = ['Google', 'Yandex', 'Amazon', 'Meta', 'Tinkoff', 'EPAM', 'Uzum', 'Sber', 'Kaspersky', 'Wolt'];

export const newsData: Record<number, {
    category: { ru: string; en: string; uz: string };
    date: string;
    title: { ru: string; en: string; uz: string };
    text: { ru: string; en: string; uz: string };
    details: { title: string; text?: string; items?: string[] }[];
}> = {
    1: {
        category: { ru: 'Событие', en: 'Event', uz: 'Tadbir' },
        date: '01 МАЯ 2026',
        title: { ru: 'Nexus HackFest 2026: 72 часа кода, идей и инноваций', en: 'Nexus HackFest 2026: 72 hours of code', uz: 'Nexus HackFest 2026' },
        text: { ru: 'Nexus HackFest — самый масштабный технологический марафон Центральной Азии. 500+ участников из 12 стран.', en: 'Nexus HackFest is the largest tech marathon in Central Asia. 500+ participants from 12 countries.', uz: 'Nexus HackFest — Markaziy Osiyoning eng yirik texnologiya marafoni.' },
        details: [
            { title: '📅 Даты и место', text: '15–17 июня 2026. Ташкент, технопарк Nexus IT School.' },
            { title: '🏆 Треки и призы', items: ['AI & LLM Solutions — $20 000', 'EdTech & Social Impact — $15 000', 'FinTech & Web3 — $10 000', 'Best Student Team — $5 000'] },
            { title: '📋 Условия', text: 'Команды 2-5 человек. Регистрация бесплатная.' },
            { title: '🎙️ Жюри', items: ['Александр Ким — Senior Engineer @ Google', 'Мадина Усманова — ML Engineer @ Yandex', 'Зарина Ахмедова — UX Lead @ Meta'] }
        ]
    },
    2: {
        category: { ru: 'Партнёрство', en: 'Partnership', uz: 'Hamkorlik' },
        date: '15 АПР 2026',
        title: { ru: 'Google стал официальным партнёром Nexus', en: 'Google became official Nexus partner', uz: 'Google Nexusning rasmiy hamkoriga aylandi' },
        text: { ru: 'Подписание официального партнёрского соглашения с Google. Новые возможности для студентов.', en: 'Official partnership with Google. New opportunities for students.', uz: 'Google bilan rasmiy hamkorlik shartnomasi imzolandi.' },
        details: [
            { title: '🤝 Для студентов', items: ['Приоритетный доступ к стажировкам', 'Воркшопы с инженерами Google', 'Сертификаты Google'] },
            { title: '📚 Совместные программы', text: '3 новых курса: Google Cloud Architecture, Android Development, Advanced Data Analytics.' }
        ]
    },
    3: {
        category: { ru: 'Курс', en: 'Course', uz: 'Kurs' },
        date: '03 АПР 2026',
        title: { ru: 'Новый курс: Prompt Engineering и работа с LLM', en: 'New course: Prompt Engineering and LLMs', uz: 'Yangi kurs: Prompt Engineering va LLM' },
        text: { ru: 'Запускаем курс по Prompt Engineering — искусству работы с большими языковыми моделями.', en: 'We are launching a Prompt Engineering course.', uz: 'Prompt Engineering kursini ishga tushiryapmiz.' },
        details: [
            { title: '🎯 Что изучите', items: ['GPT-4, Claude, Gemini', 'Chain-of-Thought, Few-Shot, RAG', 'Интеграция LLM через API', 'AI-агенты и автоматизация'] },
            { title: '⏱️ Формат', text: '3 месяца, онлайн, 2 раза в неделю. Старт: 1 июня 2026.' },
            { title: '💰 Стоимость', text: 'от 199 $ — цена для первых 50 студентов.' }
        ]
    }
};

export const newsCards: NewsItem[] = [
    { id: 1, featured: true, imgClass: 'news-card__img--1', categoryKey: 'news.cat.event', date: '01 МАЯ 2026', titleKey: 'news1.title', excerptKey: 'news1.excerpt', linkKey: 'news.read' },
    { id: 2, imgClass: 'news-card__img--2', categoryKey: 'news.cat.partner', date: '15 АПР 2026', titleKey: 'news2.title', linkKey: 'news.read' },
    { id: 3, imgClass: 'news-card__img--3', categoryKey: 'news.cat.course', date: '03 АПР 2026', titleKey: 'news3.title', linkKey: 'news.read' },
];
 