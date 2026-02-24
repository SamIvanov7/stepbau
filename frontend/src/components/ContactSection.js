import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function ContactSection() {
  const { t } = useLanguage();
  const sectionRef = useScrollAnimation();
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    name: '',
    firma: '',
    telefon: '',
    email: '',
    nachricht: '',
    datenschutz: false,
  });

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.datenschutz) {
      toast.error(t('form_error'));
      return;
    }
    setSending(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success(t('form_success'));
      setForm({ name: '', firma: '', telefon: '', email: '', nachricht: '', datenschutz: false });
    } catch (err) {
      toast.error(t('form_error'));
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-[#0a0a0a]" data-testid="contact-section" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="animate-on-scroll mb-16">
          <p className="text-xs font-mono text-[#10b981] tracking-[0.3em] uppercase mb-4">{t('nav_contact')}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight" data-testid="contact-title">
            {t('contact_title')}
          </h2>
          <p className="text-zinc-400 mt-4 font-light max-w-lg">{t('contact_subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <form onSubmit={handleSubmit} className="animate-on-scroll lg:col-span-3 space-y-6" data-testid="contact-form">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-zinc-400 text-xs uppercase tracking-wider font-mono">{t('form_name')} *</Label>
                <Input
                  id="name"
                  required
                  value={form.name}
                  onChange={e => handleChange('name', e.target.value)}
                  placeholder={t('form_name_placeholder')}
                  className="bg-[#1a1a1a] border-white/10 focus:border-[#10b981] text-white h-12 rounded-none focus:ring-1 focus:ring-[#10b981] placeholder:text-zinc-600"
                  data-testid="form-name-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="firma" className="text-zinc-400 text-xs uppercase tracking-wider font-mono">{t('form_firma')}</Label>
                <Input
                  id="firma"
                  value={form.firma}
                  onChange={e => handleChange('firma', e.target.value)}
                  placeholder={t('form_firma_placeholder')}
                  className="bg-[#1a1a1a] border-white/10 focus:border-[#10b981] text-white h-12 rounded-none focus:ring-1 focus:ring-[#10b981] placeholder:text-zinc-600"
                  data-testid="form-firma-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="telefon" className="text-zinc-400 text-xs uppercase tracking-wider font-mono">{t('form_telefon')} *</Label>
                <Input
                  id="telefon"
                  required
                  type="tel"
                  value={form.telefon}
                  onChange={e => handleChange('telefon', e.target.value)}
                  placeholder={t('form_telefon_placeholder')}
                  className="bg-[#1a1a1a] border-white/10 focus:border-[#10b981] text-white h-12 rounded-none focus:ring-1 focus:ring-[#10b981] placeholder:text-zinc-600"
                  data-testid="form-telefon-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-400 text-xs uppercase tracking-wider font-mono">{t('form_email')} *</Label>
                <Input
                  id="email"
                  required
                  type="email"
                  value={form.email}
                  onChange={e => handleChange('email', e.target.value)}
                  placeholder={t('form_email_placeholder')}
                  className="bg-[#1a1a1a] border-white/10 focus:border-[#10b981] text-white h-12 rounded-none focus:ring-1 focus:ring-[#10b981] placeholder:text-zinc-600"
                  data-testid="form-email-input"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nachricht" className="text-zinc-400 text-xs uppercase tracking-wider font-mono">{t('form_nachricht')} *</Label>
              <Textarea
                id="nachricht"
                required
                rows={5}
                value={form.nachricht}
                onChange={e => handleChange('nachricht', e.target.value)}
                placeholder={t('form_nachricht_placeholder')}
                className="bg-[#1a1a1a] border-white/10 focus:border-[#10b981] text-white rounded-none focus:ring-1 focus:ring-[#10b981] placeholder:text-zinc-600 resize-none"
                data-testid="form-nachricht-input"
              />
            </div>

            {/* Datenschutz Checkbox */}
            <div className="flex items-start gap-3">
              <Checkbox
                id="datenschutz"
                checked={form.datenschutz}
                onCheckedChange={val => handleChange('datenschutz', val)}
                className="mt-0.5 border-white/20 data-[state=checked]:bg-[#10b981] data-[state=checked]:border-[#10b981]"
                data-testid="form-datenschutz-checkbox"
              />
              <Label htmlFor="datenschutz" className="text-xs text-zinc-400 leading-relaxed cursor-pointer">
                {t('form_datenschutz')}
              </Label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={sending || !form.datenschutz}
              className="inline-flex items-center justify-center gap-3 bg-[#10b981] text-white px-10 py-4 text-sm font-bold uppercase tracking-widest hover:bg-[#0096c7] transition-all hover:shadow-[0_0_30px_rgba(0,180,216,0.4)] disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
              data-testid="form-submit-btn"
            >
              <Send className="w-4 h-4" />
              {sending ? t('form_sending') : t('form_submit')}
            </button>
          </form>

          {/* Contact Info */}
          <div className="animate-on-scroll lg:col-span-2">
            <div className="bg-[#111111] border border-white/10 p-8 space-y-8 sticky top-24">
              <h3 className="text-lg font-bold text-white tracking-tight" data-testid="contact-info-title">
                {t('contact_info_title')}
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center border border-[#2dd4bf]/30 flex-shrink-0">
                    <MapPin className="w-4 h-4 text-[#10b981]" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{t('contact_company')}</p>
                    <p className="text-zinc-400 text-sm">{t('contact_person')}</p>
                    <p className="text-zinc-500 text-sm mt-1">{t('contact_address')}</p>
                    <p className="text-zinc-500 text-sm">{t('contact_city')}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center border border-[#2dd4bf]/30 flex-shrink-0">
                    <Phone className="w-4 h-4 text-[#10b981]" />
                  </div>
                  <a href="tel:+4917641810937" className="text-white hover:text-[#10b981] transition-colors text-sm" data-testid="contact-phone-link">
                    {t('contact_phone')}
                  </a>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center border border-[#2dd4bf]/30 flex-shrink-0">
                    <Mail className="w-4 h-4 text-[#10b981]" />
                  </div>
                  <a href="mailto:step.bau@outlook.de" className="text-white hover:text-[#10b981] transition-colors text-sm" data-testid="contact-email-link">
                    {t('contact_email')}
                  </a>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center border border-[#2dd4bf]/30 flex-shrink-0">
                    <MessageCircle className="w-4 h-4 text-[#25d366]" />
                  </div>
                  <a
                    href="https://wa.me/4917641810937"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[#25d366] transition-colors text-sm"
                    data-testid="contact-whatsapp-link"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
