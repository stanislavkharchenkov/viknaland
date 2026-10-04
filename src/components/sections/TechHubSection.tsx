'use client';

import React, { useState } from 'react';
import {
  LayersIcon,
  ShieldCheckIcon,
  ZapIcon,
  CpuIcon,
  WrenchIcon,
  CheckIcon,
  ArrowRightIcon,
} from '@/components/ui/Icons';

type TabKey = 'glass' | 'hardware' | 'pvc' | 'mounting' | 'commercial';

interface TechItem {
  id: TabKey;
  label: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  points: { title: string; desc: string }[];
  statNumber: string;
  statLabel: string;
  secondaryStat: string;
  secondaryLabel: string;
}

const TECH_DATA: Record<TabKey, TechItem> = {
  glass: {
    id: 'glass',
    label: 'Склопакети Solar & Аргон',
    badge: 'Енергозбереження до 70%',
    title: 'Мультифункціональне скло Solar з нанонапиленням срібла',
    subtitle: 'Працює як прозорий терморегулятор: взимку зберігає тепло, влітку захищає від спеки.',
    description:
      'У звичайному склопакеті до 45% тепла виходить через скло. У склопакетах Viknaland використовується подвійне напилення оксидів срібла та заповнення міжскляного простору інертним газом Аргон 90%, що за теплоізоляцією дорівнює цегляній стіні завтовшки 65 см.',
    points: [
      {
        title: 'Захист від спеки (Solar-ефект)',
        desc: 'Відбиває до 58% інфрачервоного сонячного випромінювання. Кімната не нагрівається влітку — економія на кондиціонері.',
      },
      {
        title: 'Енергозберігаюче i-Glass покриття',
        desc: 'Відбиває теплові хвилі від батарей та обігрівачів назад у кімнату, знижуючи витрати на газ або електрику.',
      },
      {
        title: 'Тепла полімерна дистанційна рамка',
        desc: 'Замість стандартного холодного алюмінію використовуємо композитний спейсер, що усуває місток холоду та конденсат.',
      },
      {
        title: 'Інертний газ Аргон у камерах',
        desc: 'Має на 34% меншу теплопровідність, ніж звичайне повітря, та підвищує звукоізоляцію приміщення.',
      },
    ],
    statNumber: '1.25',
    statLabel: 'м²·°C/Вт опір теплопередачі',
    secondaryStat: '-58%',
    secondaryLabel: 'менше нагріву від сонця',
  },
  hardware: {
    id: 'hardware',
    label: 'Антизламна фурнітура RC2',
    badge: 'Безпека 40 000 циклів',
    title: 'Німецька фурнітура Siegenia Titan AF & Maco',
    subtitle: 'Механізми з титанового сплаву та грибоподібні цапфи проти віджимання стулки.',
    description:
      'Вікно має надійно захищати ваш дім не лише від протягів, а й від несанкціонованого проникнення. Ми встановлюємо сталеві грибоподібні цапфи та відповідні планки з легованої сталі, які блокують віджимання рами навіть при використанні ломика.',
    points: [
      {
        title: 'Грибоподібні цапфи з 3D-регулюванням',
        desc: 'Забезпечують щільне замикання по всьому периметру стулки та легкий плавний хід ручки.',
      },
      {
        title: 'Мікрощілинне провітрювання',
        desc: 'Відкривання стулки на 2–3 мм забезпечує свіже повітря взимку без протягів та охолодження кімнати.',
      },
      {
        title: 'Блокіратор помилкової дії',
        desc: 'Виключає випадання стулки при одночасному відкриванні в поворотному та відкидному положенні.',
      },
      {
        title: 'Дитячий замок безпеки (Baby Safe Lock)',
        desc: 'Дозволяє відкидати вікно на провітрювання, але надійно блокує повне відкривання дітьми без ключа.',
      },
    ],
    statNumber: '40 000',
    statLabel: 'гарантованих циклів відкривання',
    secondaryStat: 'RC2',
    secondaryLabel: 'європейський клас захисту від зламу',
  },
  pvc: {
    id: 'pvc',
    label: 'ПВХ-рецептура Greenline',
    badge: 'Клас А товщина 3.0 мм',
    title: 'Екологічний профіль без свинцю та важких металів',
    subtitle: 'Стабілізація кальцій-цинком для бездоганної білизни та довговічності понад 50 років.',
    description:
      'Профільні системи Viknaland виробляються за німецькою технологією без використання свинцевих стабілізаторів. Пластик абсолютно безпечний для дитячих кімнат та лікарень, не виділяє запахів при нагріванні на літньому сонці та не жовтіє під дією ультрафіолету.',
    points: [
      {
        title: 'Клас профілю А (товщина стінок 3.0 мм)',
        desc: 'На відміну від полегшених профілів класу В (2.5 мм), профіль класу А має на 25% вищу міцність кутових зварних швів.',
      },
      {
        title: 'Стійкість до екстремальних температур',
        desc: 'Витримує температурні перепади від -40°C до +65°C без тріщин, деформацій та зміни геометрії.',
      },
      {
        title: 'Ущільнювачі EPDM з каучуку',
        desc: 'Німецька гума залишається еластичною взимку, не пересихає на сонці та забезпечує повну герметичність.',
      },
      {
        title: 'Німецька ламінація Renolit',
        desc: 'Багатошарова фактурна плівка відтворює структуру натурального дерева або трендового антрациту.',
      },
    ],
    statNumber: '50+',
    statLabel: 'років підтвердженого терміну служби',
    secondaryStat: '0%',
    secondaryLabel: 'свинцю та токсичних домішок',
  },
  mounting: {
    id: 'mounting',
    label: 'Теплий монтаж за ДСТУ',
    badge: 'Захист від вологи та плісняви',
    title: 'Триконтурний монтажний шов за європейськими нормами',
    subtitle: 'Чому 80% проблем з вікнами виникають через неправильний монтаж і як ми це вирішуємо.',
    description:
      'Звичайна монтажна піна без захисту вбирає вологу з кімнати та руйнується сонячними променями з вулиці вже за 2 роки. Теплий монтаж за ДСТУ ізолює піну з двох боків паро- та гідроізоляційними стрічками Illbruck, зберігаючи її теплоізоляційні властивості на десятиліття.',
    points: [
      {
        title: 'Зовнішня паропроникна стрічка (ПСУЛ)',
        desc: 'Випускає пару з монтажного шва назовні, але не пропускає вологу, дощ та вітер всередину.',
      },
      {
        title: 'Внутрішня пароізоляційна мембрана',
        desc: 'Блокує вологе повітря з квартири, захищаючи утеплювач від намокання та появи чорної плісняви.',
      },
      {
        title: 'Теплий підставочний профіль із пінополістиролу',
        desc: 'Повністю усуває найхолоднішу точку вікна — стик рами та підвіконня, де зазвичай утворюється крига.',
      },
      {
        title: 'Сертифіковані монтажні бригади',
        desc: 'Всі монтажники заводу проходять регулярну атестацію та мають практичний досвід роботи від 7 років.',
      },
    ],
    statNumber: '100%',
    statLabel: 'відсутність продувань та конденсату',
    secondaryStat: 'ДСТУ',
    secondaryLabel: 'Б В.2.6-79:2009 сертифіковано',
  },
  commercial: {
    id: 'commercial',
    label: 'Великі проєкти & Скління ЖК',
    badge: 'Обʼєкти будь-якої складності',
    title: 'Виробнича потужність 15 000 м² конструкцій на місяць',
    subtitle: 'Комплексне скління котеджних містечок, житлових комплексів та комерційних бізнес-центрів.',
    description:
      'Завод VIKNALAND має власний конструкторський відділ, що розробляє складні статичні розрахунки вітрових навантажень для панорамного скління на високих поверхах, фасадних портальних систем HS та безрамного скління терас.',
    points: [
      {
        title: 'Портальні розсувні системи HS-Portal',
        desc: 'Скління шириною до 6 метрів з легким відкриванням важких стулок вагою до 400 кг одним пальцем.',
      },
      {
        title: 'Статичний розрахунок вітрових навантажень',
        desc: 'Враховуємо поверх, розу вітрів та площу скла, підбираючи правильну товщину армування та триплексу.',
      },
      {
        title: 'Точне дотримання графіків забудовника',
        desc: 'Поетапна доставка та шеф-монтаж спецтранспортом за затвердженим календарним планом будівництва.',
      },
      {
        title: 'Прямий контракт із заводом',
        desc: 'Спеціальні умови для архітекторів, дизайнерів інтерʼєрів та генеральних підрядників.',
      },
    ],
    statNumber: '15 000',
    statLabel: 'м² віконних систем щомісяця',
    secondaryStat: '25+',
    secondaryLabel: 'великих ЖК склилися нашими системами',
  },
};

export default function TechHubSection() {
  const [activeTab, setActiveTab] = useState<TabKey>('glass');
  const current = TECH_DATA[activeTab];

  return (
    <section id="technologies" className="py-20 lg:py-28 bg-slate-50 text-slate-900 relative overflow-hidden border-b border-slate-200/80">
      {/* Декоративна фонова сітка */}
      <div className="absolute inset-0 bg-[radial-gradient(#00000005_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-[#FE5B36]/5 blur-3xl pointer-events-none" />

      <div className="container-vl relative z-10">
        {/* Заголовок секції */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FE5B36] uppercase tracking-wider mb-2">
            <span>(</span>
            <span>Інженерний хаб заводу</span>
            <span>)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mt-1 leading-tight">
            Технології тепла та безпеки VIKNALAND
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600">
            Дізнайтеся, чому наші вікна зберігають тепло на 35% краще за стандарти ринку та служать понад 50 років без провисання стулок.
          </p>
        </div>

        {/* Навігаційні таби технологій */}
        <div className="flex flex-wrap gap-2.5 mb-10 pb-4 border-b border-slate-200">
          {(Object.keys(TECH_DATA) as TabKey[]).map((tabKey) => {
            const item = TECH_DATA[tabKey];
            const isActive = activeTab === tabKey;
            return (
              <button
                key={tabKey}
                type="button"
                onClick={() => setActiveTab(tabKey)}
                className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer select-none flex items-center gap-2.5 ${
                  isActive
                    ? 'bg-[#FE5B36] text-white shadow-lg shadow-[#FE5B36]/25 scale-[1.02]'
                    : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200 shadow-xs'
                }`}
              >
                {tabKey === 'glass' && <ZapIcon size={16} color={isActive ? '#FFFFFF' : '#FE5B36'} />}
                {tabKey === 'hardware' && <ShieldCheckIcon size={16} color={isActive ? '#FFFFFF' : '#FE5B36'} />}
                {tabKey === 'pvc' && <LayersIcon size={16} color={isActive ? '#FFFFFF' : '#FE5B36'} />}
                {tabKey === 'mounting' && <WrenchIcon size={16} color={isActive ? '#FFFFFF' : '#FE5B36'} />}
                {tabKey === 'commercial' && <CpuIcon size={16} color={isActive ? '#FFFFFF' : '#FE5B36'} />}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Детальний контент вибраної технології */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Ліва колонка: Опис та переваги (7 колонок) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-7 sm:p-10 border border-slate-200 shadow-md text-slate-900">
            <div className="inline-block px-3.5 py-1 bg-orange-50 border border-orange-200 text-[#FE5B36] text-xs font-black uppercase tracking-wider rounded-full mb-4">
              {current.badge}
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
              {current.title}
            </h3>
            <p className="text-sm font-semibold text-slate-800 mb-4">
              {current.subtitle}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-8">
              {current.description}
            </p>

            {/* 4 ключові інженерні пункти */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              {current.points.map((pt, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
                  <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckIcon size={12} color="#FE5B36" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-900 mb-0.5">{pt.title}</h5>
                    <p className="text-xs text-slate-600 leading-relaxed">{pt.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Права колонка: Інженерні показники + заклик до дії (5 колонок) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Карточка головного показника */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md text-slate-900 relative overflow-hidden">
              <div className="text-5xl sm:text-6xl font-black text-[#FE5B36] font-mono tracking-tight">
                {current.statNumber}
              </div>
              <div className="text-sm font-bold text-slate-900 mt-2">
                {current.statLabel}
              </div>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Показник відповідає вимогам ДСТУ Б В.2.6-15:2011 та перевірений незалежними лабораторними тестами.
              </p>
            </div>

            {/* Карточка другого показника */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md text-slate-900">
              <div className="text-4xl sm:text-5xl font-black text-[#0F2B5C] font-mono tracking-tight">
                {current.secondaryStat}
              </div>
              <div className="text-sm font-bold text-slate-700 mt-2">
                {current.secondaryLabel}
              </div>
            </div>

            {/* Плашка консультації інженера */}
            <div className="bg-gradient-to-br from-[#FE5B36] to-[#E04824] rounded-3xl p-7 text-white shadow-xl shadow-[#FE5B36]/20">
              <h4 className="text-xl font-black mb-1.5 leading-snug">
                Потрібен точний інженерний розрахунок?
              </h4>
              <p className="text-xs text-white/90 mb-5 leading-relaxed">
                Наш технолог безкоштовно проконсультує вас по типах склопакетів, вітрових навантаженнях та допоможе підібрати комплектацію під ваш бюджет.
              </p>
              <a
                href="#configurator"
                className="w-full py-3.5 bg-[#0F2B5C] hover:bg-[#081E46] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <span>Перейти до розрахунку вікна</span>
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
