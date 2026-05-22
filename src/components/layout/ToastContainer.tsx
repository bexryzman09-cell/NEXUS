import { useApp } from '../../context/AppContext';

export default function ToastContainer() {
    const { toasts } = useApp();

    if (toasts.length === 0) return null;

    return (
        <div className="toast-container">
            {toasts.map((toast) => (
                <div key={toast.id} className={`toast ${toast.type}`}>
                    {toast.msg}
                </div>
            ))}
        </div>
    );
}
