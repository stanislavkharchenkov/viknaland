'use client';

import { useState } from 'react';
import { PlusIcon } from '@/components/ui/Icons';

const FAQS = [
  {
    q: 'Скільки часу триває виготовлення та монтаж вікон?',
    a: 'Стандартні білі прямокутні конструкції виготовляються на заводі за 4–5 робочих днів. Ламіновані конструкції або нестандартні форми (арки, трапеції) — 8–10 днів. Безпосередній монтаж одного вікна займає близько 2–2.5 годин, після чого майстри прибирають за собою сміття.',
  },
  {
    q: 'Чим профіль VIKNALAND кращий за імпортні аналоги?',
    a: 'VIKNALAND виготовляється в Україні за німецькою технологією на австрійському обладнанні Greiner. Профіль спеціально розроблений під кліматичні умови України (стійкий до морозів -30°C та спеки +40°C), має чесну товщину стінки класу А (3.0 мм) та коштує на 20–30% дешевше завдяки відсутності імпортного мита та логістичних націнок.',
  },
  {
    q: 'Що таке «теплий монтаж за ДСТУ» і чому він важливий?',
    a: 'Звичайний монтаж — це лише монтажна піна, яка з часом руйнується від вологи та ультрафіолету, що призводить до продування та плісняви. Теплий монтаж за ДСТУ включає захист піни спеціальними паро- та гідроізоляційними стрічками (зовні та зсередини), а також теплий підставочний профіль.',
  },
  {
    q: 'Чи можна оформити замовлення в розстрочку під 0%?',
    a: 'Так, ми співпрацюємо з провідними банками України (ПриватБанк, Monobank, Ощадбанк) та надаємо розстрочку «Оплата частинами» під 0% терміном до 6 місяців без комісій та прихованих страховок.',
  },
  {
    q: 'Як замовити вікна за державною програмою «єВідновлення»?',
    a: 'Наш інженер приїжджає на замір, складає кошторис та дефектний акт. Ви оплачуєте замовлення безпосередньо карткою «єВідновлення» через платіжний термінал або реквізити. Ми видаємо повний пакет документів та фіскальний чек для звітування в додатку Дія.',
  },
  {
    q: 'Чи є виїзд замірника обовʼязком щось купувати?',
    a: 'Ні, виїзд замірника з лазерним обладнанням та зразками профілів є абсолютно безкоштовним та ні до чого вас не зобовʼязує. Ви отримаєте точний кошторис у 3 варіантах комплектації та зможете спокійно прийняти рішення.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white text-slate-900 relative border-b border-slate-200/80">
      <div className="container-vl max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FE5B36] uppercase tracking-wider mb-2">
            <span>(</span>
            <span>Відповіді експертів</span>
            <span>)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mt-1 text-slate-900">
            Часті запитання покупців
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Все, що потрібно знати про вибір профілю, терміни, оплату та теплий монтаж.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 transition-all hover:border-[#FE5B36]/30 shadow-xs"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left font-bold text-slate-900 flex justify-between items-center gap-4 hover:bg-slate-100/50 transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base">{faq.q}</span>
                  <span
                    className={`w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center transition-all ${
                      isOpen ? 'rotate-45 text-[#FE5B36] border-[#FE5B36]' : 'text-slate-500'
                    }`}
                  >
                    <PlusIcon className="w-3.5 h-3.5" />
                  </span>
                </button>

                {isOpen && (
                  <div className="p-5 sm:p-6 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/70 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
