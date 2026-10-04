'use client';

import { useState } from 'react';
import Link from 'next/link';
import OrderModal from '@/components/ui/OrderModal';
import { FlagUaIcon, ZapIcon, ShieldCheckIcon, RulerIcon, CheckIcon, ArrowRightIcon } from '@/components/ui/Icons';

export default function HeroSection() {
  const [quickPhone, setQuickPhone] = useState('');
  const [quickSuccess, setQuickSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickPhone) return;

    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: quickPhone,
          name: 'Швидка заявка з першого екрана',
          preferredContact: 'phone',
        }),
      });
      setQuickSuccess(true);
    } catch {
      setQuickSuccess(true);
    }
  };

  return (
    <section className="relative pt-12 sm:pt-16 lg:pt-20 pb-16 lg:pb-24 bg-gradient-to-b from-white via-slate-50 to-slate-100/70 text-slate-900 overflow-hidden border-b border-slate-200/80">
      {/* Декоративні м'які архітектурні акценти */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-sky-200/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-orange-100/30 blur-3xl pointer-events-none" />

      <div className="container-vl relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Ліва колонка: Заголовок та кругла кнопка (7 колонок) */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Головний титр */}
            <h1 className="font-black tracking-tight leading-[0.88] select-none text-[60px] sm:text-[96px] md:text-[118px] lg:text-[132px]">
              <span className="text-[#0F2B5C]">VIKNA</span>
              <br />
              <div className="flex items-baseline flex-nowrap">
                <span className="text-[#FE5B36]">LAND</span>
                {/* Бейдж */}
                <div className="inline-flex items-center gap-1.5 ml-4 sm:ml-6 select-none flex-shrink-0 align-middle">
                  <span className="text-[#FE5B36] font-bold text-lg sm:text-2xl lg:text-3xl">(</span>
                  <span className="text-left text-[11px] sm:text-sm lg:text-base font-bold leading-[1.2] text-slate-800 tracking-normal">
                    Завод
                    <br />
                    енергоефективних
                    <br />
                    віконних систем
                  </span>
                  <span className="text-[#FE5B36] font-bold text-lg sm:text-2xl lg:text-3xl">)</span>
                </div>
              </div>
            </h1>

            <p className="mt-8 text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed font-normal">
              Металопластикові вікна, балконні блоки та розсувні системи безпосередньо від заводу-виробника без націнок посередників. 10 років повної гарантії, німецька фурнітура, армування 1.5–2.0 мм та монтаж за ДСТУ.
            </p>

            {/* 4 ключові тригери з SVG-іконками (без смайлів) */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 my-8 max-w-xl">
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <FlagUaIcon size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Програма «єВідновлення»</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Оплата карткою, повний пакет актів</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0 text-[#FE5B36]">
                  <ZapIcon size={18} color="#FE5B36" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Виготовлення від 4 днів</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Автоматизовані лінії Schirmer</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0 text-[#FE5B36]">
                  <ShieldCheckIcon size={18} color="#FE5B36" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Гарантія 10 років</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Офіційний договір та сервіс заводу</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 text-slate-800">
                  <RulerIcon size={18} color="#0F2B5C" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Безкоштовний замір</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Лазерний вимір та зразки профілів</p>
                </div>
              </div>
            </div>

            {/* Кругла кнопка та виклик майстра */}
            <div className="flex items-center gap-6 mt-2">
              <Link
                href="#configurator"
                className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-[#FE5B36] hover:bg-[#ff6c47] text-white flex items-center justify-center font-bold text-sm sm:text-base transition-transform duration-300 hover:scale-105 shadow-xl shadow-[#FE5B36]/30 text-center leading-tight cursor-pointer"
              >
                <span>Розрахувати<br />вікно</span>
              </Link>

              <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-4 rounded-2xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs uppercase tracking-wider transition-colors shadow-xs cursor-pointer flex items-center gap-2"
              >
                <span>Викликати майстра</span>
                <ArrowRightIcon className="w-3.5 h-3.5 text-[#FE5B36]" />
              </button>
            </div>
          </div>

          {/* Права колонка: Швидкий прорахунок (5 колонок) */}
          <div className="lg:col-span-5 pt-4 lg:pt-8">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl relative text-slate-900">
              <div className="inline-block px-3 py-1 bg-[#FE5B36] text-white text-[11px] font-black uppercase tracking-wider rounded-full mb-3 shadow-xs">
                Знижка заводу -35%
              </div>

              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                Дізнайтесь точну вартість вікон за 2 хвилини
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm mt-1.5 mb-6">
                Залиште номер — інженер заводу прорахує вартість у 3 варіантах під ваш бюджет та зафіксує акційну ціну.
              </p>

              {quickSuccess ? (
                <div className="p-6 bg-slate-50 border border-[#FE5B36]/40 rounded-2xl text-center">
                  <div className="w-12 h-12 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center mx-auto mb-2 text-[#FE5B36]">
                    <CheckIcon size={24} color="#FE5B36" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-base mb-1">
                    Заявку успішно відправлено!
                  </h4>
                  <p className="text-xs text-slate-500">
                    Менеджер зателефонує вам найближчим часом для розрахунку.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleQuickSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Ваш номер телефону
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+380 (__) ___-__-__"
                      value={quickPhone}
                      onChange={(e) => setQuickPhone(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FE5B36] focus:bg-white text-sm font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#FE5B36] hover:bg-[#ff6c47] active:scale-95 text-white font-extrabold text-sm uppercase tracking-wider rounded-xl transition-all shadow-xl shadow-[#FE5B36]/25 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Отримати розрахунок вартості</span>
                    <ArrowRightIcon className="w-4 h-4 text-white" />
                  </button>

                  <div className="space-y-2 pt-2 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <span className="text-[#FE5B36] flex-shrink-0">
                        <CheckIcon size={14} color="#FE5B36" />
                      </span>
                      <span>Безкоштовний виїзд інженера з лазером</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#FE5B36] flex-shrink-0">
                        <CheckIcon size={14} color="#FE5B36" />
                      </span>
                      <span>Зразки профілів та ламінації на вибір</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#FE5B36] flex-shrink-0">
                        <CheckIcon size={14} color="#FE5B36" />
                      </span>
                      <span>Енергопакет з аргоном у подарунок</span>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <OrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}

