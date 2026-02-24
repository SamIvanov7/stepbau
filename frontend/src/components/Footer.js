import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Phone, Mail } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const LOGO_URL = "https://customer-assets.emergentagent.com/job_bau-partner-de/artifacts/ucc8647d_stepbau_logo.png";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#080808] border-t border-white/5 py-16" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Company */}
          <div>
            <img src={LOGO_URL} alt="STEPBAU" className="h-12 w-auto mb-4" />
            <p className="text-zinc-500 text-sm font-light leading-relaxed">
              {t('contact_company')}<br />
              {t('contact_person')}
            </p>
          </div>

          {/* Address */}
          <div>
            <h4 className="text-xs font-mono text-[#10b981] tracking-[0.2em] uppercase mb-4">Adresse</h4>
            <p className="text-zinc-400 text-sm">
              {t('contact_address')}<br />
              {t('contact_city')}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-mono text-[#10b981] tracking-[0.2em] uppercase mb-4">{t('footer_contact')}</h4>
            <div className="space-y-3">
              <a href="tel:+4917641810937" className="flex items-center gap-2 text-zinc-400 hover:text-white text-sm transition-colors" data-testid="footer-phone">
                <Phone className="w-3.5 h-3.5" />
                {t('contact_phone')}
              </a>
              <a href="mailto:step.bau@outlook.de" className="flex items-center gap-2 text-zinc-400 hover:text-white text-sm transition-colors" data-testid="footer-email">
                <Mail className="w-3.5 h-3.5" />
                {t('contact_email')}
              </a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-mono text-[#10b981] tracking-[0.2em] uppercase mb-4">Legal</h4>
            <div className="space-y-3">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="text-zinc-400 hover:text-white text-sm transition-colors block" data-testid="footer-impressum">
                    {t('footer_impressum')}
                  </button>
                </DialogTrigger>
                <DialogContent className="bg-[#111111] border-white/10 text-white max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-white">{t('impressum_title')}</DialogTitle>
                  </DialogHeader>
                  <div className="text-zinc-300 text-sm whitespace-pre-line leading-relaxed mt-4">
                    {t('impressum_text')}
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <button className="text-zinc-400 hover:text-white text-sm transition-colors block" data-testid="footer-datenschutz">
                    {t('footer_datenschutz')}
                  </button>
                </DialogTrigger>
                <DialogContent className="bg-[#111111] border-white/10 text-white max-w-lg max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-white">{t('datenschutz_title')}</DialogTitle>
                  </DialogHeader>
                  <div className="text-zinc-300 text-sm whitespace-pre-line leading-relaxed mt-4">
                    {t('datenschutz_text')}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-zinc-600 text-xs font-mono">
            &copy; {year} STEPBAU. {t('footer_rights')}
          </p>
          <p className="text-zinc-700 text-xs font-mono">
            Trockenbau &bull; Innenausbau &bull; Bodenverlegung
          </p>
        </div>
      </div>
    </footer>
  );
}
