import { useState, type FormEvent } from 'react';
import { useApp } from '../../context/AppContext';
import { courses } from '../../data/siteData';

const TG_BOT_TOKEN = '8937634246:AAH237E6VdIq7dTFiTXFg6bgKxDEyrKWhdY';
const TG_CHAT_IDS = ['7017966153', '6491651938'];

async function sendTelegram(message: string): Promise<boolean> {
    const results = await Promise.allSettled(
        TG_CHAT_IDS.map((chatId) =>
            fetch(
                `https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'HTML' }),
                }
            ).then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
        )
    );
    return results.every((r) => r.status === 'fulfilled');
}

export default function Contact() {
    const { t, showToast } = useApp();

    // Main form state
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [course, setCourse] = useState('');
    const [message, setMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    // Cancel form state
    const [cancelPhone, setCancelPhone] = useState('');
    const [cancelCourse, setCancelCourse] = useState('');
    const [cancelSubmitting, setCancelSubmitting] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !phone.trim()) {
            showToast('Please fill in all required fields', 'error');
            return;
        }

        setSubmitting(true);
        setStatus('idle');

        const text = [
            '<b>New Application</b>',
            `Name: ${name}`,
            `Phone: ${phone}`,
            `Course: ${course || 'Not selected'}`,
            `Message: ${message || '—'}`,
        ].join('\n');

        const ok = await sendTelegram(text);
        setSubmitting(false);

        if (ok) {
            setStatus('success');
            showToast('Application sent successfully!', 'success');
            setName('');
            setPhone('');
            setCourse('');
            setMessage('');
        } else {
            setStatus('error');
            showToast('Failed to send. Please try again.', 'error');
        }
    };

    const handleCancel = async (e: FormEvent) => {
        e.preventDefault();
        if (!cancelPhone.trim() || !cancelCourse.trim()) {
            showToast('Please fill in all fields', 'error');
            return;
        }

        setCancelSubmitting(true);

        const text = [
            '<b>Course Cancellation Request</b>',
            `Phone: ${cancelPhone}`,
            `Course: ${cancelCourse}`,
        ].join('\n');

        const ok = await sendTelegram(text);
        setCancelSubmitting(false);

        if (ok) {
            showToast('Cancellation request sent', 'success');
            setCancelPhone('');
            setCancelCourse('');
        } else {
            showToast('Failed to send cancellation request', 'error');
        }
    };

    return (
        <section className="section" id="contact">
            <div className="container">
                <div className="section-header">
                    <div className="section-header__tag">{t('contact.tag')}</div>
                    <h2
                        className="section-header__title"
                        dangerouslySetInnerHTML={{ __html: t('contact.title') }}
                    />
                    <p className="section-header__subtitle">{t('contact.subtitle')}</p>
                </div>

                <div className="contact__grid">
                    {/* Contact Form */}
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="contact-form__row">
                            <div className="contact-form__field">
                                <label className="contact-form__label">{t('form.name')}</label>
                                <input
                                    className="contact-form__input"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder={t('form.name')}
                                    required
                                />
                            </div>
                            <div className="contact-form__field">
                                <label className="contact-form__label">{t('form.phone')}</label>
                                <input
                                    className="contact-form__input"
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder={t('form.phone')}
                                    required
                                />
                            </div>
                        </div>

                        <div className="contact-form__field">
                            <label className="contact-form__label">{t('form.course')}</label>
                            <select
                                className="contact-form__input contact-form__select"
                                value={course}
                                onChange={(e) => setCourse(e.target.value)}
                            >
                                <option value="">{t('form.select')}</option>
                                {courses.map((c, i) => (
                                    <option key={i} value={t(c.titleKey)}>
                                        {t(c.titleKey)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="contact-form__field">
                            <label className="contact-form__label">{t('form.message')}</label>
                            <textarea
                                className="contact-form__input contact-form__textarea"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder={t('form.message')}
                            />
                        </div>

                        <button
                            className="btn btn--primary btn--full"
                            type="submit"
                            disabled={submitting}
                        >
                            {submitting ? '...' : t('form.submit')}
                        </button>

                        {status === 'success' && (
                            <div className="contact-form__status success">
                                Application sent successfully!
                            </div>
                        )}
                        {status === 'error' && (
                            <div className="contact-form__status error">
                                Failed to send. Please try again.
                            </div>
                        )}
                    </form>

                    {/* Contact Info */}
                    <div className="contact__info">
                        <div className="contact-info__item">
                            <span className="contact-info__icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                            </span>
                            <div>
                                <strong>{t('contact.addr.label')}</strong>
                                <p>{t('contact.addr.value')}</p>
                            </div>
                        </div>

                        <div className="contact-info__item">
                            <span className="contact-info__icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                            </span>
                            <div>
                                <strong>{t('contact.phone.label')}</strong>
                                <p>
                                    <a className="contact-info__link" href="tel:+998901234567">
                                        +998 90 123-45-67
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cancel Section */}
                <div className="cancel-section">
                    <h3>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="15" y1="9" x2="9" y2="15" />
                            <line x1="9" y1="9" x2="15" y2="15" />
                        </svg>
                        Cancel Course
                    </h3>
                    <p>If you need to cancel your enrollment, please fill out the form below.</p>
                    <form className="cancel-form" onSubmit={handleCancel}>
                        <div className="cancel-form__field">
                            <label className="contact-form__label">{t('form.phone')}</label>
                            <input
                                className="contact-form__input"
                                type="tel"
                                value={cancelPhone}
                                onChange={(e) => setCancelPhone(e.target.value)}
                                placeholder={t('form.phone')}
                                required
                            />
                        </div>
                        <div className="cancel-form__field">
                            <label className="contact-form__label">{t('form.course')}</label>
                            <select
                                className="contact-form__input contact-form__select"
                                value={cancelCourse}
                                onChange={(e) => setCancelCourse(e.target.value)}
                                required
                            >
                                <option value="">{t('form.select')}</option>
                                {courses.map((c, i) => (
                                    <option key={i} value={t(c.titleKey)}>
                                        {t(c.titleKey)}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            className="btn btn--danger"
                            type="submit"
                            disabled={cancelSubmitting}
                        >
                            {cancelSubmitting ? '...' : 'Cancel'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
