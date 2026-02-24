import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { X } from 'lucide-react';

export default function CookieBanner() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('stepbau_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('stepbau_cookie_consent', 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('stepbau_cookie_consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6"
      data-testid="cookie-banner"
    >
      <div className="max-w-4xl mx-auto bg-[#111111] border border-white/10 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-2xl">
        <p className="text-zinc-300 text-sm flex-1 font-light">
          {t('cookie_text')}
        </p>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={handleAccept}
            className="bg-[#00b4d8] text-white px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-[#0096c7] transition-all"
            data-testid="cookie-accept-btn"
          >
            {t('cookie_accept')}
          </button>
          <button
            onClick={handleDecline}
            className="border border-white/20 text-zinc-400 px-6 py-2 text-xs font-bold uppercase tracking-widest hover:text-white hover:border-white/40 transition-all"
            data-testid="cookie-decline-btn"
          >
            {t('cookie_decline')}
          </button>
        </div>
      </div>
    </div>
  );
}
