'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import OrderModal from '@/components/ui/OrderModal';
import { ShieldCheckIcon, FlagUaIcon, MenuIcon } from '@/components/ui/Icons';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Верхній інформаційний рядок - компактний */}
      <div className="bg-slate-100 text-slate-600 text-[11px] py-1 px-4 border-b border-slate-200 hidden sm:block whitespace-nowrap">
        <div className="container-vl flex items-center justify-between">
          <div className="flex items-center gap-4 lg:gap-6 whitespace-nowrap">
            <span className="flex items-center gap-1.5 text-slate-800 font-semibold whitespace-nowrap">
              <FlagUaIcon size={14} />
              <span>Офіційний завод в Україні</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-600 whitespace-nowrap">
              <ShieldCheckIcon size={13} color="#FE5B36" />
              <span>Гарантія 10 років за ДСТУ</span>
            </span>
            <span className="text-[#FE5B36] font-bold whitespace-nowrap">
              Програма «єВідновлення»
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-600 font-medium whitespace-nowrap">
            <span className="hidden lg:inline whitespace-nowrap">Графік: Пн-Нд 08:00 - 21:00</span>
            <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors whitespace-nowrap">
              Telegram
            </a>
            <a href="viber://chat" className="hover:text-slate-900 transition-colors whitespace-nowrap">
              Viber
            </a>
          </div>
        </div>
      </div>

      {/* Компактний фіксований хедер */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          scrolled
            ? 'glass-header-scrolled py-1.5 shadow-sm'
            : 'bg-white/95 backdrop-blur-md py-2 border-b border-slate-200/80 shadow-xs'
        }`}
      >
        <div className="container-vl flex items-center justify-between gap-3 xl:gap-6">
          {/* Логотип бренду VIKNALAND */}
          <Link href="/" className="flex items-center gap-1.5 group select-none flex-shrink-0 whitespace-nowrap">
            <span className="text-lg sm:text-xl font-black tracking-wider text-[#FE5B36] whitespace-nowrap">
              VIKNA<span className="text-[#0F2B5C]">LAND</span>
            </span>
            <span className="text-slate-400 text-[10px] font-normal tracking-wide hidden xl:inline ml-1 whitespace-nowrap">
              ( завод )
            </span>
          </Link>

          {/* Навігація - один рядок без переносів */}
          <nav className="hidden lg:flex items-center gap-3 xl:gap-5 text-[11px] xl:text-xs uppercase font-bold tracking-wide text-slate-700 whitespace-nowrap flex-shrink-0">
            <Link href="#view3d" className="hover:text-[#FE5B36] transition-colors whitespace-nowrap">
              3D Розріз
            </Link>
            <Link href="#configurator" className="hover:text-[#FE5B36] transition-colors whitespace-nowrap">
              Калькулятор
            </Link>
            <Link href="#technologies" className="hover:text-[#FE5B36] transition-colors whitespace-nowrap">
              Технології
            </Link>
            <Link href="#profiles" className="hover:text-[#FE5B36] transition-colors whitespace-nowrap">
              Профілі
            </Link>
            <Link href="#evidnovlennya" className="text-[#FE5B36] hover:text-[#ff6c47] transition-colors font-extrabold whitespace-nowrap">
              єВідновлення
            </Link>
            <Link href="#advantages" className="hover:text-[#FE5B36] transition-colors whitespace-nowrap">
              Переваги
            </Link>
            <Link href="#portfolio" className="hover:text-[#FE5B36] transition-colors whitespace-nowrap">
              Роботи
            </Link>
            <Link href="#blog" className="hover:text-[#FE5B36] transition-colors whitespace-nowrap">
              Блог
            </Link>
            <Link href="#faq" className="hover:text-[#FE5B36] transition-colors whitespace-nowrap">
              FAQ
            </Link>
          </nav>

          {/* Телефони та фірмова кнопка */}
          <div className="hidden sm:flex items-center gap-3 xl:gap-4 flex-shrink-0 whitespace-nowrap">
            <div className="text-right leading-none whitespace-nowrap">
              <a
                href="tel:0800303030"
                className="text-xs xl:text-sm font-extrabold text-slate-900 hover:text-[#FE5B36] transition-colors block leading-tight tracking-wide font-mono whitespace-nowrap"
              >
                0 800 30 30 30
              </a>
              <span className="text-[9px] xl:text-[10px] text-[#FE5B36] font-semibold block whitespace-nowrap">
                Безкоштовно по Україні
              </span>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-3.5 xl:px-4 py-2 rounded-full bg-[#FE5B36] hover:bg-[#ff6c47] active:scale-95 text-white font-bold text-[11px] xl:text-xs uppercase tracking-wider transition-all shadow-sm shadow-[#FE5B36]/25 cursor-pointer whitespace-nowrap flex-shrink-0"
            >
              <span className="hidden xl:inline">Викликати </span>
              <span>замірника</span>
            </button>
          </div>

          {/* Мобільна кнопка */}
          <div className="flex items-center gap-2 lg:hidden flex-shrink-0 whitespace-nowrap">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-[#FE5B36] text-white font-bold text-xs whitespace-nowrap cursor-pointer"
            >
              Замір
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 cursor-pointer"
              aria-label="Меню"
            >
              <MenuIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

      </header>

      {/* Затемнення фону */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Мобільне виїзне меню (Slide-out Drawer) */}
      <aside
        className={`fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white text-slate-800 z-50 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu lg:hidden border-l border-slate-200 ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Мобільне меню"
      >
        {/* Шапка виїзного меню */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-1.5"
          >
            <span className="text-lg font-black tracking-wider text-[#FE5B36]">
              VIKNA<span className="text-[#0F2B5C]">LAND</span>
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
            aria-label="Закрити меню"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Список посилань */}
        <nav className="flex-1 overflow-y-auto px-5 py-5 space-y-1">
          <Link
            href="#view3d"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-800 hover:bg-slate-100 hover:text-[#FE5B36] transition-colors"
          >
            <span>3D Розріз профілю</span>
            <span className="text-slate-400">→</span>
          </Link>
          <Link
            href="#configurator"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-800 hover:bg-slate-100 hover:text-[#FE5B36] transition-colors"
          >
            <span>Калькулятор онлайн</span>
            <span className="text-slate-400">→</span>
          </Link>
          <Link
            href="#technologies"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-800 hover:bg-slate-100 hover:text-[#FE5B36] transition-colors"
          >
            <span>Технології виробництва</span>
            <span className="text-slate-400">→</span>
          </Link>
          <Link
            href="#profiles"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-800 hover:bg-slate-100 hover:text-[#FE5B36] transition-colors"
          >
            <span>Профільні системи</span>
            <span className="text-slate-400">→</span>
          </Link>
          <Link
            href="#evidnovlennya"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wider text-[#FE5B36] bg-orange-50 hover:bg-orange-100 transition-colors"
          >
            <span>Програма єВідновлення</span>
            <span className="text-[#FE5B36]">→</span>
          </Link>
          <Link
            href="#advantages"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-800 hover:bg-slate-100 hover:text-[#FE5B36] transition-colors"
          >
            <span>Переваги заводу</span>
            <span className="text-slate-400">→</span>
          </Link>
          <Link
            href="#portfolio"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-800 hover:bg-slate-100 hover:text-[#FE5B36] transition-colors"
          >
            <span>Реалізовані обʼєкти</span>
            <span className="text-slate-400">→</span>
          </Link>
          <Link
            href="#blog"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-800 hover:bg-slate-100 hover:text-[#FE5B36] transition-colors"
          >
            <span>Блог: Будова вікон</span>
            <span className="text-slate-400">→</span>
          </Link>
          <Link
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-800 hover:bg-slate-100 hover:text-[#FE5B36] transition-colors"
          >
            <span>FAQ запитання</span>
            <span className="text-slate-400">→</span>
          </Link>
        </nav>

        {/* Футер виїзного меню */}
        <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setIsModalOpen(true);
            }}
            className="w-full py-3 rounded-xl bg-[#FE5B36] hover:bg-[#ff6c47] text-white font-extrabold text-sm shadow-md transition-all cursor-pointer active:scale-98"
          >
            Замовити точний замір
          </button>

          <div className="pt-2 text-center">
            <span className="text-[11px] text-slate-400 block mb-1">Безкоштовна лінія по Україні:</span>
            <a
              href="tel:0800303030"
              className="text-lg font-black text-slate-900 block font-mono hover:text-[#FE5B36] transition-colors"
            >
              0 800 30 30 30
            </a>
          </div>
        </div>
      </aside>

      <OrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

