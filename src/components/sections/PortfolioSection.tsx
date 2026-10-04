'use client';

import { useState } from 'react';
import OrderModal from '@/components/ui/OrderModal';
import { ArrowRightIcon } from '@/components/ui/Icons';

const PROJECTS = [
  {
    title: 'Скління котеджу в передмісті',
    location: 'с. Козин, Київська обл.',
    profile: 'Viknaland 85 (7 камер, Passivhaus)',
    glass: '40 мм Solar з аргоном',
    lamination: 'Антрацит (RAL 7016)',
    term: '5 робочих днів',
    price: '84 500 грн',
    tag: 'Котедж',
  },
  {
    title: 'Панорамний французький балкон',
    location: 'ЖК «Французький квартал», Київ',
    profile: 'Viknaland B70 (6 камер)',
    glass: '32 мм мультифункція + триплекс',
    lamination: 'Базальтово-сірий',
    term: '4 робочих дні',
    price: '38 200 грн',
    tag: 'Балкон',
  },
  {
    title: 'Заміна вікон 3-к квартири за «єВідновлення»',
    location: 'м. Ірпінь',
    profile: 'Viknaland B70 (6 камер)',
    glass: '32 мм енергозберігаючий з Аргоном',
    lamination: 'Класичний білий',
    term: '4 робочих дні',
    price: '46 800 грн',
    tag: 'єВідновлення',
  },
  {
    title: 'Тепле скління лоджії під робочий кабінет',
    location: 'ЖК «Варшавський», Київ',
    profile: 'Viknaland B70 + підвіконня Danke',
    glass: '40 мм енергозберігаючий',
    lamination: 'Золотий дуб',
    term: '3 робочих дні',
    price: '27 400 грн',
    tag: 'Лоджія',
  },
];

export default function PortfolioSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="portfolio" className="py-20 lg:py-28 bg-white text-slate-900 relative border-b border-slate-200/80">
      <div className="container-vl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FE5B36] uppercase tracking-wider mb-2">
              <span>(</span>
              <span>Реалізовані обʼєкти</span>
              <span>)</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mt-1 text-slate-900">
              Наші нещодавні роботи
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-xl">
              Подивіться приклади встановлених віконних конструкцій з реальними характеристиками та вартістю під ключ.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3.5 bg-[#FE5B36] hover:bg-[#ff6c47] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#FE5B36]/20 self-start md:self-auto cursor-pointer flex items-center gap-2"
          >
            <span>Хочу такий розрахунок</span>
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROJECTS.map((proj, idx) => (
            <div
              key={idx}
              className="bg-slate-50 rounded-3xl p-6 border border-slate-200 flex flex-col justify-between hover:border-[#FE5B36]/50 hover:shadow-lg hover:shadow-slate-200/50 transition-all group"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-extrabold uppercase px-3 py-1 rounded-full bg-white text-slate-700 border border-slate-200 shadow-xs">
                    {proj.tag}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-[#FE5B36]">
                    {proj.term}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-[#FE5B36] transition-colors">
                  {proj.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 mb-4">{proj.location}</p>

                <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-200/80 pt-3">
                  <div>
                    <span className="text-slate-400">Профіль:</span>{' '}
                    <strong className="text-slate-900">{proj.profile}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Скло:</span> {proj.glass}
                  </div>
                  <div>
                    <span className="text-slate-400">Колір:</span> {proj.lamination}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Під ключ:</div>
                  <div className="text-base font-black font-mono text-[#FE5B36]">{proj.price}</div>
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-8 h-8 rounded-xl bg-white hover:bg-[#FE5B36] text-slate-700 hover:text-white border border-slate-200 hover:border-transparent flex items-center justify-center transition-colors text-xs font-bold cursor-pointer shadow-xs"
                  aria-label="Замовити"
                >
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Розрахунок вашого обʼєкта"
        subtitle="Залиште контакти — інженер складе пропозицію з урахуванням специфіки вашого приміщення"
      />
    </section>
  );
}
