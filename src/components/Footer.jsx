import React, { memo } from 'react';
import { Mail, Phone, MapPin, Linkedin, Youtube, Instagram, Facebook, Sparkles, ArrowUp } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { useModal } from '../context/ModalContext';
import { scrollToTarget } from '../lib/smoothScroll';
import logoUrl from '../Tech Logo.svg';

const SOCIAL_ICONS = { Linkedin, Youtube, Instagram, Facebook };

export const Footer = () => {
  const { openEnrollModal } = useModal();

  const handleNavClick = (e, href) => {
    if (!href.startsWith('#') || href === '#') return;
    e.preventDefault();
    scrollToTarget(href);
  };

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="contact"
      className="relative z-20 border-t border-line bg-[var(--surface-300)] pt-16 pb-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-9 lg:gap-8">
          {/* ---------- Brand ---------- */}
          <div className="lg:col-span-2">
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              className="inline-flex group rounded-xl"
              aria-label={`${siteConfig.brand.name} — back to top`}
            >
              <span className="logo-plate flex items-center rounded-xl px-3 py-2
                               transition-[transform,box-shadow] duration-300 ease-out-expo
                               group-hover:-translate-y-px group-hover:shadow-glow-blue">
                <img
                  src={logoUrl}
                  alt={siteConfig.brand.name}
                  width={190}
                  height={38}
                  className="h-[26px] w-auto object-contain"
                />
              </span>
            </a>

            <p className="text-body-sm text-ink-muted leading-relaxed max-w-sm mt-4">
              Industry-oriented technology training academy based in Indore, Madhya Pradesh.
              Helping students, job seekers, and IT professionals develop practical, career-focused technology skills.
            </p>

            <ul className="space-y-2 mt-5 text-[12.5px]">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="text-ink-muted hover:text-accent transition-colors">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <a href={`tel:${siteConfig.contact.phone}`} className="text-ink-muted hover:text-accent transition-colors">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="text-ink-muted">{siteConfig.contact.location}</span>
              </li>
            </ul>

            <div className="flex items-center gap-2 mt-5">
              {siteConfig.socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.icon] || Linkedin;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.name}
                    className="p-2 rounded-xl border border-line-strong bg-[var(--surface-100)] text-ink-muted
                               hover:text-accent hover:border-accent/45 hover:-translate-y-0.5
                               active:scale-90 transition-all duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* ---------- Link columns ---------- */}
          <FooterColumn title="Our Programs" links={siteConfig.footerLinks.courses} onNav={handleNavClick} />
          <FooterColumn title="Company" links={siteConfig.footerLinks.company} onNav={handleNavClick} />

          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.09em] text-ink">Quick Support</h3>
            <ul className="space-y-2 mt-3.5">
              {siteConfig.footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-[12.5px] text-ink-muted hover:text-accent transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            <button
              onClick={() => openEnrollModal('')}
              className="w-full mt-4 py-2.5 px-3 rounded-xl text-[12px] font-bold
                         text-accent bg-accent-soft border border-accent/35
                         hover:bg-accent/15 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]
                         transition-all duration-200 cursor-pointer
                         inline-flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Book Free Demo
            </button>
          </div>
        </div>

        {/* ---------- Bottom bar ---------- */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-12 pt-6 border-t border-line">
          <p className="text-[12px] text-ink-soft">
            © {new Date().getFullYear()} {siteConfig.brand.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <span className="text-[12px] text-ink-soft hidden sm:inline">
              From Learning to Leading
            </span>
            <button
              onClick={toTop}
              aria-label="Back to top"
              className="p-2 rounded-xl border border-line-strong bg-[var(--surface-100)] text-ink-muted
                         hover:text-accent hover:border-accent/45 hover:-translate-y-0.5
                         active:scale-90 transition-all duration-200 cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterColumn = memo(function FooterColumn({ title, links, onNav }) {
  return (
    <div>
      <h3 className="text-[11px] font-bold uppercase tracking-[0.09em] text-ink">{title}</h3>
      <ul className="space-y-2 mt-3.5">
        {links.map((link) => (
          <li key={link.name}>
            <a
              href={link.href}
              onClick={(e) => onNav(e, link.href)}
              className="text-[12.5px] text-ink-muted hover:text-accent transition-colors"
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
});
