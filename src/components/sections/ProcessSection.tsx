import React from 'react';

const STEPS = [
  {
    step: '01',
    title: 'Заявка або дзвінок',
    desc: 'Залиште номер телефону або розрахуйте вікна у 3D-конструкторі. Менеджер звʼяжеться за 5 хвилин для узгодження часу заміру.',
  },
  {
    step: '02',
    title: 'Безкоштовний замір',
    desc: 'Інженер-технолог приїде з лазерним обладнанням, зразками профілів та ламінації. Складе точний кошторис у 3 варіантах.',
  },
  {
    step: '03',
    title: 'Виготовлення на заводі',
    desc: 'За 4–5 днів виготовляємо ваші вікна на автоматизованих європейських лініях. Кожна конструкція проходить контроль ВТК.',
  },
  {
    step: '04',
    title: 'Чистий монтаж за ДСТУ',
    desc: 'Сертифікована бригада демонтує старі рами, встановить нові вікна за 2–3 години та прибере все будівельне сміття.',
  },
];

export default function ProcessSection() {
  return (
    <section className="py-20 lg:py-28 bg-slate-50 text-slate-900 relative border-b border-slate-200/80">
      <div className="container-vl">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FE5B36] uppercase tracking-wider mb-2">
            <span>(</span>
            <span>Етапи співпраці</span>
            <span>)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mt-1 text-slate-900">
            Як відбувається замовлення вікон
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600">
            Без зайвих клопотів, затримок та прихованих платежів.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((s, idx) => (
            <div key={idx} className="relative flex flex-col p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-[#FE5B36]/40 transition-all">
              <div className="text-4xl font-black text-[#FE5B36] font-mono mb-3">
                {s.step}
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">{s.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
