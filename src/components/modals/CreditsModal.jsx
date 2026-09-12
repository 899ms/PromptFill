import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Heart, X } from 'lucide-react';

export const CreditsModal = ({ language, isDarkMode, onClose, children }) => {
  const titleId = useId();
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus({ preventScroll: true });

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        onClose();
      }
      if (event.key !== 'Tab') return;
      const controls = Array.from(dialogRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex="0"]'
      ) || []);
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && (document.activeElement === first || !dialogRef.current?.contains(document.activeElement))) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !dialogRef.current?.contains(document.activeElement))) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown, true);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown, true);
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      style={{ padding: 'max(16px, env(safe-area-inset-top)) max(16px, env(safe-area-inset-right)) max(16px, env(safe-area-inset-bottom)) max(16px, env(safe-area-inset-left))' }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`flex min-h-0 max-h-full w-full max-w-xl flex-col overflow-hidden rounded-[28px] border shadow-2xl ${isDarkMode ? 'bg-[#242120] border-white/10' : 'bg-white border-gray-100'}`}
        style={{ maxHeight: 'min(840px, calc(100dvh - 32px - env(safe-area-inset-top) - env(safe-area-inset-bottom)))' }}
      >
        <header className={`flex shrink-0 items-center justify-between gap-4 border-b px-5 py-4 sm:px-7 ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500">
              <Heart size={21} aria-hidden="true" />
            </span>
            <h3 id={titleId} className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {language === 'cn' ? '鸣谢与致敬' : 'Credits & Acknowledgments'}
            </h3>
          </div>
          <button ref={closeRef} type="button" onClick={onClose}
            aria-label={language === 'cn' ? '关闭鸣谢' : 'Close credits'}
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500 ${isDarkMode ? 'text-gray-400 hover:bg-white/10 hover:text-white' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'}`}>
            <X size={22} aria-hidden="true" />
          </button>
        </header>
        <div className={`credits-modal-content min-h-0 overflow-y-auto overscroll-contain px-5 py-6 text-center sm:px-7 ${isDarkMode ? 'dark-mode' : ''}`}
          tabIndex={0} role="region" aria-label={language === 'cn' ? '鸣谢内容' : 'Acknowledgments'}>
          {children}
        </div>
      </section>
    </div>,
    document.body
  );
};
