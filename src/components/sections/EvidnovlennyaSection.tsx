'use client';

import { useState } from 'react';
import OrderModal from '@/components/ui/OrderModal';
import { FlagUaIcon, DocumentCheckIcon, ZapIcon, ShieldCheckIcon, ArrowRightIcon } from '@/components/ui/Icons';

export default function EvidnovlennyaSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="evidnovlennya" className="py-20 lg:py-28 bg-slate-100/80 text-slate-900 relative overflow-hidden border-t border-b border-slate-200/80">
      <div className="container-vl relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FE5B36] uppercase tracking-wider mb-3">
              <span>(</span>
              <FlagUaIcon size={16} />
              <span>Державна програма допомоги</span>
              <span>)</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Заміна вікон за програмою <br />
              <span className="text-[#FE5B36]">«єВідновлення»</span>
            </h2>

            <p className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed">
              Якщо ваше житло постраждало від бойових дій, ви можете встановити нові енергоефективні вікна VIKNALAND за рахунок державної грошової допомоги. Ми беремо на себе всі юридичні формальності.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-8">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="text-[#FE5B36] text-xs font-black uppercase tracking-wider mb-1 flex items-center gap-2">
                  <ShieldCheckIcon size={16} color="#FE5B36" />
                  Оплата карткою
                </div>
                <p className="text-xs text-slate-600">
                  Приймаємо кошти безпосередньо зі спеціальної картки «єВідновлення» будь-якого банку.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="text-[#FE5B36] text-xs font-black uppercase tracking-wider mb-1 flex items-center gap-2">
                  <DocumentCheckIcon size={16} color="#FE5B36" />
                  Повний пакет актів
                </div>
                <p className="text-xs text-slate-600">
                  Видаємо договір, фіскальний чек та деталізований акт для швидкого закриття виплати в «Дія».
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="text-[#FE5B36] text-xs font-black uppercase tracking-wider mb-1 flex items-center gap-2">
                  <ZapIcon size={16} color="#FE5B36" />
                  Пріоритетне виготовлення
                </div>
                <p className="text-xs text-slate-600">
                  Замовлення за програмою виготовляються в першу чергу на заводі — термін від 4 днів.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="text-[#FE5B36] text-xs font-black uppercase tracking-wider mb-1 flex items-center gap-2">
                  <ShieldCheckIcon size={16} color="#FE5B36" />
                  Юридичний супровід
                </div>
                <p className="text-xs text-slate-600">
                  Юрист заводу безкоштовно проконсультує та допоможе заповнити звітність для комісії.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 bg-[#FE5B36] hover:bg-[#ff6c47] text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-[#FE5B36]/25 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Оформити замір за програмою «єВідновлення»</span>
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-lg text-slate-900">
              <h3 className="text-lg font-bold mb-4 text-slate-900">
                Як отримати нові вікна за 4 кроки:
              </h3>

              <ol className="space-y-4 text-xs">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#FE5B36] text-white font-black flex items-center justify-center text-[11px] flex-shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <strong className="block text-slate-900 text-sm">Подайте заявку</strong>
                    <span className="text-slate-500">Викликайте нашого інженера для точного виміру.</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#FE5B36] text-white font-black flex items-center justify-center text-[11px] flex-shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <strong className="block text-slate-900 text-sm">Отримайте офіційний кошторис</strong>
                    <span className="text-slate-500">Складаємо специфікацію за всіма стандартами програми.</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#FE5B36] text-white font-black flex items-center justify-center text-[11px] flex-shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <strong className="block text-slate-900 text-sm">Оплатіть карткою «єВідновлення»</strong>
                    <span className="text-slate-500">Без комісій та переплат за фіксованими заводськими цінами.</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#FE5B36] text-white font-black flex items-center justify-center text-[11px] flex-shrink-0 mt-0.5">
                    4
                  </span>
                  <div>
                    <strong className="block text-slate-900 text-sm">Швидкий монтаж та акти</strong>
                    <span className="text-slate-500">Встановлюємо вікна за ДСТУ та надаємо повний пакет для Дія.</span>
                  </div>
                </li>
              </ol>

              <div className="mt-6 pt-5 border-t border-slate-100 text-xs text-slate-500 text-center">
                Гаряча лінія заводу з питань «єВідновлення»: <strong className="text-slate-900 block mt-1 font-mono text-sm">0 800 30 30 30</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Заявка за програмою «єВідновлення»"
        subtitle="Замірник приїде з бланками та допоможе розрахувати точну суму компенсації"
      />
    </section>
  );
}

