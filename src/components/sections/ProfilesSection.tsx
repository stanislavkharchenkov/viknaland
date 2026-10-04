'use client';

import { useState } from 'react';
import OrderModal from '@/components/ui/OrderModal';
import { CheckIcon, ArrowRightIcon } from '@/components/ui/Icons';

const PROFILES = [
  {
    id: 'b58',
    title: 'Viknaland B58',
    badge: 'Економічний стандарт',
    description:
      'Чотирикамерна система з монтажною шириною 58 мм. Ідеальне рішення для скління балконів, лоджій, дачних будинків та комерційних приміщень.',
    specs: [
      { label: 'Кількість камер', value: '4 камери' },
      { label: 'Монтажна ширина', value: '58 мм' },
      { label: 'Товщина склопакета', value: 'до 32 мм' },
      { label: 'Опір теплопередачі', value: '0.77 м²·°C/Вт' },
      { label: 'Шумоізоляція', value: 'до 32 дБ' },
      { label: 'Клас профілю', value: 'Клас А (ДСТУ)' },
    ],
    features: [
      'Оптимальна ціна без переплат',
      'Глянцева біла поверхня, стійка до ультрафіолету',
      'Екологічний склад без свинцю (Greenline)',
    ],
    priceNote: 'від 2 450 грн/м²',
  },
  {
    id: 'b70',
    title: 'Viknaland B70',
    badge: 'Хіт продажів — Рекомендовано',
    description:
      'Шестикамерний профіль преміум-класу глибиною 70 мм. Найпопулярніший вибір для теплих міських квартир, спалень та дитячих кімнат.',
    specs: [
      { label: 'Кількість камер', value: '6 камер' },
      { label: 'Монтажна ширина', value: '70 мм' },
      { label: 'Товщина склопакета', value: 'до 40 мм' },
      { label: 'Опір теплопередачі', value: '0.91 м²·°C/Вт' },
      { label: 'Шумоізоляція', value: 'до 42 дБ' },
      { label: 'Клас профілю', value: 'Клас А (товщина 3.0 мм)' },
    ],
    features: [
      'Зберігає на 35% більше тепла, ніж звичайні вікна',
      'Покращена звукоізоляція від траси та міського шуму',
      'Підвищена стійкість до зламів завдяки посиленому армуванню',
    ],
    isPopular: true,
    priceNote: 'від 3 150 грн/м²',
  },
  {
    id: 'v85',
    title: 'Viknaland 85',
    badge: 'Флагман Passivhaus',
    description:
      'Семикамерна енергопасивна система з глибиною 85 мм та трьома контурами ущільнення. Максимальне енергозбереження для котеджів та заміських вілл.',
    specs: [
      { label: 'Кількість камер', value: '7 камер' },
      { label: 'Монтажна ширина', value: '85 мм' },
      { label: 'Товщина склопакета', value: 'до 48 мм' },
      { label: 'Опір теплопередачі', value: '1.15 м²·°C/Вт' },
      { label: 'Шумоізоляція', value: 'до 46 дБ (тиша студії)' },
      { label: 'Контури ущільнення', value: '3 контури EPDM' },
    ],
    features: [
      'Максимальний захист від промерзання при -35°C',
      'Знижує витрати на опалення котеджу у 2.5 рази',
      'Можливість виготовлення надвеликих панорамних стулок',
    ],
    priceNote: 'від 4 300 грн/м²',
  },
];

export default function ProfilesSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<string>('');

  const handleConsult = (name: string) => {
    setSelectedProfile(name);
    setIsModalOpen(true);
  };

  return (
    <section id="profiles" className="py-20 lg:py-28 bg-white text-slate-900 relative border-b border-slate-200/80">
      <div className="container-vl">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FE5B36] uppercase tracking-wider mb-2">
            <span>(</span>
            <span>Модельний ряд заводу</span>
            <span>)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mt-1">
            Профільні системи VIKNALAND під будь-яке завдання
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600">
            Всі профілі виготовляються згідно з вимогами ДСТУ Б В.2.6-15:2011 на сучасному австрійському обладнанні Greiner та мають підтверджений термін служби понад 50 років.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {PROFILES.map((p) => (
            <div
              key={p.id}
              className={`rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 relative ${
                p.isPopular
                  ? 'bg-white border-2 border-[#FE5B36] shadow-xl shadow-[#FE5B36]/10'
                  : 'bg-slate-50 border border-slate-200 shadow-sm hover:shadow-md'
              }`}
            >
              {p.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FE5B36] text-white text-[11px] font-black px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
                  Вибір 78% покупців
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${
                    p.isPopular ? 'bg-orange-50 text-[#FE5B36] border border-orange-200' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {p.badge}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500">{p.priceNote}</span>
                </div>

                <h3 className="text-2xl font-black text-slate-900 mb-2">{p.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">{p.description}</p>

                {/* Технічні характеристики */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200 space-y-2 mb-6 shadow-xs">
                  {p.specs.map((s, idx) => (
                    <div key={idx} className="flex justify-between text-xs py-1 border-b border-slate-100 last:border-none">
                      <span className="text-slate-500">{s.label}:</span>
                      <span className="font-bold text-slate-900 text-right">{s.value}</span>
                    </div>
                  ))}
                </div>

                {/* Переваги списком з SVG галочками */}
                <div className="space-y-2.5 mb-6">
                  {p.features.map((f, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <span className="text-[#FE5B36] flex-shrink-0 mt-0.5">
                        <CheckIcon size={14} color="#FE5B36" />
                      </span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleConsult(p.title)}
                className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  p.isPopular
                    ? 'bg-[#FE5B36] hover:bg-[#ff6c47] text-white shadow-md shadow-[#FE5B36]/25'
                    : 'bg-white hover:bg-slate-100 border border-slate-300 text-slate-800'
                }`}
              >
                <span>Консультація по {p.title}</span>
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Розрахунок системи ${selectedProfile}`}
        subtitle="Залиште контакт — інженер надасть порівняння характеристик та прорахує знижку"
      />
    </section>
  );
}

