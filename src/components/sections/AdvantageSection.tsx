import React from 'react';
import { FactoryIcon, CpuIcon, WrenchIcon, ShieldCheckIcon, TruckIcon, DocumentCheckIcon } from '@/components/ui/Icons';

const ADVANTAGES = [
  {
    icon: <FactoryIcon size={26} color="#FE5B36" />,
    title: 'Пряма ціна заводу',
    desc: 'Замовляйте безпосередньо у виробника. Ви заощаджуєте від 25% до 35%, не сплачуючи оренду дилерських салонів та зарплату посередникам.',
  },
  {
    icon: <CpuIcon size={26} color="#FE5B36" />,
    title: 'Роботизовані лінії',
    desc: 'Автоматичне зварювання кутів та зачищення на верстатах Stürtz (Німеччина). Точність до 0.1 мм виключає людський фактор та продування.',
  },
  {
    icon: <WrenchIcon size={26} color="#FE5B36" />,
    title: 'Посилений метал 1.5 мм',
    desc: 'Використовуємо лише оцинковане армування товщиною від 1.5 мм за ДСТУ. Вікно не деформується під дією вітру чи перепадів температур.',
  },
  {
    icon: <ShieldCheckIcon size={26} color="#FE5B36" />,
    title: 'Теплий монтаж за ДСТУ',
    desc: 'Монтуємо із застосуванням тришарових паро- та гідроізоляційних стрічок. Це назавжди захищає ваші відкоси від вологи, конденсату та плісняви.',
  },
  {
    icon: <TruckIcon size={26} color="#FE5B36" />,
    title: 'Доставка спецтранспортом',
    desc: 'Власний автопарк, обладнаний пірамідами для делікатного перевезення скла. Гарантуємо доставку без сколів, тріщин та пилу.',
  },
  {
    icon: <DocumentCheckIcon size={26} color="#FE5B36" />,
    title: 'Офіційна гарантія 10 років',
    desc: 'Укладаємо прозорий юридичний договір. Надаємо сервісний паспорт та безкоштовне гарантійне обслуговування власною сервісною службою.',
  },
];

export default function AdvantageSection() {
  return (
    <section id="advantages" className="py-20 lg:py-28 bg-slate-50 text-slate-900 relative border-b border-slate-200/80">
      <div className="container-vl">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FE5B36] uppercase tracking-wider mb-2">
            <span>(</span>
            <span>Стандарти виробництва</span>
            <span>)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mt-1">
            Чому замовники обирають завод VIKNALAND
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600">
            Понад 15 років виробляємо віконні системи, яким довіряють провідні забудовники та сотні тисяч родин по всій Україні.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {ADVANTAGES.map((adv, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md hover:border-[#FE5B36]/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-6">
                {adv.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{adv.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{adv.desc}</p>
            </div>
          ))}
        </div>

        {/* Інфо-плашка з цифрами заводу */}
        <div className="mt-16 bg-white rounded-3xl p-8 lg:p-12 border border-slate-200 shadow-md">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            <div className="pt-4 lg:pt-0">
              <div className="text-3xl sm:text-5xl font-black text-[#FE5B36] font-mono">15+</div>
              <div className="text-xs text-slate-600 mt-2 font-medium">років досвіду виробництва</div>
            </div>
            <div className="pt-4 lg:pt-0">
              <div className="text-3xl sm:text-5xl font-black text-[#FE5B36] font-mono">280 000+</div>
              <div className="text-xs text-slate-600 mt-2 font-medium">встановлених вікон</div>
            </div>
            <div className="pt-4 lg:pt-0">
              <div className="text-3xl sm:text-5xl font-black text-[#FE5B36] font-mono">4 дні</div>
              <div className="text-xs text-slate-600 mt-2 font-medium">термін виготовлення</div>
            </div>
            <div className="pt-4 lg:pt-0">
              <div className="text-3xl sm:text-5xl font-black text-[#FE5B36] font-mono">10 років</div>
              <div className="text-xs text-slate-600 mt-2 font-medium">гарантії на профіль</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

