import { useEffect } from 'react';

interface ToastProps {
  message: string;
  icon?: string;
  onClose: () => void;
}

export default function Toast({ message, icon = 'download', onClose }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-sm px-md py-sm bg-inverse-surface text-inverse-on-surface rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.18)] animate-[fadeSlideUp_0.25s_ease-out]">
      <span
        className="material-symbols-outlined text-[20px]"
        style={{ fontVariationSettings: '"FILL" 1' }}
      >
        {icon}
      </span>
      <span className="font-body text-label-md font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-sm text-inverse-on-surface/60 hover:text-inverse-on-surface transition-colors"
      >
        <span className="material-symbols-outlined text-[16px]">close</span>
      </button>
    </div>
  );
}
