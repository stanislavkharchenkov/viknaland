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

        {/* Мобільне меню */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 px-4 py-3 space-y-2.5 shadow-xl">
            <Link
              href="#view3d"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-bold uppercase tracking-wider text-slate-800 py-1 hover:text-[#FE5B36]"
            >
              3D Розріз профілю
            </Link>
            <Link
              href="#configurator"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-bold uppercase tracking-wider text-slate-800 py-1 hover:text-[#FE5B36]"
            >
              Калькулятор онлайн
            </Link>
            <Link
              href="#technologies"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-bold uppercase tracking-wider text-slate-800 py-1 hover:text-[#FE5B36]"
            >
              Технології
            </Link>
            <Link
              href="#profiles"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-bold uppercase tracking-wider text-slate-800 py-1 hover:text-[#FE5B36]"
            >
              Профільні системи
            </Link>
            <Link
              href="#evidnovlennya"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-bold uppercase tracking-wider text-[#FE5B36] py-1"
            >
              єВідновлення
            </Link>
            <Link
              href="#advantages"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-bold uppercase tracking-wider text-slate-800 py-1 hover:text-[#FE5B36]"
            >
              Переваги заводу
            </Link>
            <Link
              href="#portfolio"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-bold uppercase tracking-wider text-slate-800 py-1 hover:text-[#FE5B36]"
            >
              Реалізовані обʼєкти
            </Link>
            <Link
              href="#blog"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-bold uppercase tracking-wider text-slate-800 py-1 hover:text-[#FE5B36]"
            >
              Блог: Будова вікон
            </Link>
            <Link
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-bold uppercase tracking-wider text-slate-800 py-1 hover:text-[#FE5B36]"
            >
              FAQ
            </Link>
            <div className="pt-2 border-t border-slate-200">
              <a href="tel:0800303030" className="text-base font-extrabold text-slate-900 block font-mono">
                0 800 30 30 30
              </a>
            </div>
          </div>
        )}
      </header>

      <OrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

