'use client';

import { useState } from 'react';
import OrderModal from '@/components/ui/OrderModal';
import {
  ShieldCheckIcon,
  ZapIcon,
  LayersIcon,
  CheckIcon,
  DocumentCheckIcon,
} from '@/components/ui/Icons';

interface GlassLayerInfo {
  id: number;
  name: string;
  shortName: string;
  role: string;
  description: string;
  materials: string;
}

const GLASS_LAYERS: GlassLayerInfo[] = [
  {
    id: 1,
    name: 'Первинний герметик (Бутил)',
    shortName: '№1 Бутил',
    role: 'Бар’єр проти вологи та дифузії газу',
    description:
      'Тонкий шар поліізобутилену наноситься на бічні грані дистанційної рамки. Він забезпечує абсолютну газонепроникність (утримує аргон усередині камери) та не пропускає молекули водяної пари ззовні.',
    materials: 'Поліізобутиленовий склад високої пластичності',
  },
  {
    id: 2,
    name: 'Дистанційна перфорована рамка',
    shortName: '№2 Рамка',
    role: 'Фіксована товщина камери та дегідратація',
    description:
      'Порожнистий профіль з алюмінію або «теплий край» (композитний полімер). На внутрішній грані має перфорацію, через яку повітря з камери контактує з силікагелем, гарантуючи сухість середовища.',
    materials: 'Анодований алюміній або поліпропілен зі сталевою підкладкою',
  },
  {
    id: 3,
    name: 'Молекулярне сито (Силікагель / Осушувач)',
    shortName: '№3 Осушувач',
    role: 'Поглинання залишкової вологи',
    description:
      'Синтетичний цеоліт або силікагель у вигляді мікрогранул. Вбирає найдрібніші залишки вологи з повітря всередині камери склопакета, повністю виключаючи випадання конденсату між стеклами за будь-яких морозів.',
    materials: 'Високопористі цеолітні гранули фракції 1.0–1.5 мм',
  },
  {
    id: 4,
    name: 'Вторинний герметик (Полісульфід / Тіокол)',
    shortName: '№4 Тіокол',
    role: 'Механічна міцність та структурне склеювання',
    description:
      'Двокомпонентний полісульфідний або поліуретановий герметик, який заливається у зовнішній паз по всьому периметру склопакета. Він твердне, утворюючи монолітний міцний шов, що тримає стекла разом десятки років.',
    materials: 'Двокомпонентний полісульфід (тіокол) міцністю на розрив > 1.2 МПа',
  },
  {
    id: 5,
    name: 'Високоякісні поліровані стекла',
    shortName: '№5 Стекла',
    role: 'Теплозбереження, звукоізоляція та світлопропускання',
    description:
      'Флоат-скло марки М1 товщиною від 4 мм. У сучасних пакетах використовується енергозберігаюче i-скло з іонним напиленням срібла (Low-E), мультифункціональне Solar-скло або ударостійкий триплекс.',
    materials: 'Флоат-скло М1 + мікронапилення срібла та оксидів титану',
  },
];

export default function BlogArticleSection() {
  const [activeGlassLayer, setActiveGlassLayer] = useState<number>(3);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedLayer = GLASS_LAYERS.find((l) => l.id === activeGlassLayer) || GLASS_LAYERS[0];

  return (
    <section id="blog" className="py-16 sm:py-24 bg-white text-slate-900 border-b border-slate-200">
      <div className="container-vl">
        {/* Шапка статті */}
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/80 text-[11px] font-bold text-[#FE5B36] uppercase tracking-wider mb-4">
            <DocumentCheckIcon size={14} />
            <span>Експертний блог VIKNALAND · Стаття №1</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Будова, склад та конструкція пластикових вікон
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Повний технічний розбір: з чого насправді складається сучасне металопластикове вікно,
            як влаштований склопакет за ДСТУ, навіщо потрібне сталеве армування та як уникнути конденсату.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Час читання: ~5 хв</span>
            </span>
            <span>•</span>
            <span>Інженерний відділ заводу VIKNALAND</span>
            <span>•</span>
            <span className="text-[#0F2B5C] font-semibold">Стандарти ДСТУ Б В.2.6-23:2009</span>
          </div>
        </div>

        {/* ── БЛОК 1: ІНТЕРАКТИВНА СХЕМА СКЛОПАКЕТА (ЗА НАДАНИМ КРЕСЛЕННЯМ №1-5) ── */}
        <div className="max-w-5xl mx-auto mb-16 bg-slate-50 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[11px] font-bold text-[#0F2B5C] uppercase tracking-wider">
              ( Анатомія теплого скла )
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              Будова склопакета в розрізі (вузол дистанційної рамки)
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
              Натисніть на номер шару або назву, щоб дізнатися, за що відповідає кожен елемент герметизації
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Графічна візуалізація за кресленням */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-64 h-80 bg-white rounded-2xl border-2 border-slate-300 p-4 shadow-md flex items-center justify-center">
                {/* SVG-схема, що відтворює надане креслення */}
                <svg viewBox="0 0 200 260" className="w-full h-full select-none" fill="none">
                  {/* Стекла (№5) зліва та справа */}
                  {/* Ліве скло */}
                  <rect x="25" y="20" width="16" height="220" fill="#E2E8F0" stroke="#1E293B" strokeWidth="2.5" />
                  <line x1="33" y1="20" x2="33" y2="240" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="3 3" />
                  
                  {/* Праве скло */}
                  <rect x="159" y="20" width="16" height="220" fill="#E2E8F0" stroke="#1E293B" strokeWidth="2.5" />
                  <line x1="167" y1="20" x2="167" y2="240" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="3 3" />

                  {/* Вторинний герметик №4 (знизу, заливка тіоколом) */}
                  <path
                    d="M 41 185 Q 100 205 159 185 L 159 235 L 41 235 Z"
                    fill={activeGlassLayer === 4 ? '#FE5B36' : '#334155'}
                    stroke="#0F172A"
                    strokeWidth="2"
                    className="cursor-pointer transition-colors duration-300"
                    onClick={() => setActiveGlassLayer(4)}
                  />

                  {/* Первинний герметик №1 (бутил вздовж бортиків рамки) */}
                  <rect
                    x="41"
                    y="105"
                    width="6"
                    height="80"
                    fill={activeGlassLayer === 1 ? '#FE5B36' : '#0F172A'}
                    className="cursor-pointer transition-colors"
                    onClick={() => setActiveGlassLayer(1)}
                  />
                  <rect
                    x="153"
                    y="105"
                    width="6"
                    height="80"
                    fill={activeGlassLayer === 1 ? '#FE5B36' : '#0F172A'}
                    className="cursor-pointer transition-colors"
                    onClick={() => setActiveGlassLayer(1)}
                  />

                  {/* Дистанційна рамка №2 (контур алюмінієвої коробки) */}
                  <path
                    d="M 47 105 L 153 105 L 153 175 Q 100 195 47 175 Z"
                    fill="#F8FAFC"
                    stroke={activeGlassLayer === 2 ? '#FE5B36' : '#64748B'}
                    strokeWidth="2.5"
                    className="cursor-pointer transition-colors"
                    onClick={() => setActiveGlassLayer(2)}
                  />
                  {/* Перфораційний паз вгорі рамки */}
                  <rect x="96" y="105" width="8" height="6" fill="#0F172A" />

                  {/* Силікагель №3 (гранули всередині рамки) */}
                  <g
                    className="cursor-pointer transition-opacity"
                    onClick={() => setActiveGlassLayer(3)}
                    opacity={activeGlassLayer === 3 ? 1 : 0.85}
                  >
                    {[
                      [65, 125], [80, 120], [100, 122], [120, 118], [135, 124],
                      [58, 140], [75, 138], [95, 136], [115, 142], [138, 139],
                      [68, 155], [88, 152], [108, 156], [128, 154],
                      [80, 168], [100, 172], [120, 168],
                    ].map(([cx, cy], idx) => (
                      <circle
                        key={idx}
                        cx={cx}
                        cy={cy}
                        r="3.5"
                        fill={activeGlassLayer === 3 ? '#FE5B36' : '#92400E'}
                        stroke="#78350F"
                        strokeWidth="1"
                      />
                    ))}
                  </g>

                  {/* Виносні лінії та маркери 1-5 */}
                  {/* Маркер №5 (Скло) */}
                  <circle cx="15" cy="50" r="10" fill={activeGlassLayer === 5 ? '#FE5B36' : '#0F2B5C'} />
                  <text x="15" y="54" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">5</text>
                  <line x1="15" y1="60" x2="25" y2="70" stroke="#0F2B5C" strokeWidth="1.5" />

                  {/* Маркер №1 (Бутил) */}
                  <circle cx="15" cy="115" r="10" fill={activeGlassLayer === 1 ? '#FE5B36' : '#0F2B5C'} />
                  <text x="15" y="119" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">1</text>
                  <line x1="25" y1="115" x2="41" y2="115" stroke="#0F2B5C" strokeWidth="1.5" />

                  {/* Маркер №3 (Силікагель) */}
                  <circle cx="100" cy="50" r="10" fill={activeGlassLayer === 3 ? '#FE5B36' : '#0F2B5C'} />
                  <text x="100" y="54" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">3</text>
                  <line x1="100" y1="60" x2="100" y2="100" stroke="#0F2B5C" strokeWidth="1.5" />

                  {/* Маркер №2 (Рамка) */}
                  <circle cx="185" cy="115" r="10" fill={activeGlassLayer === 2 ? '#FE5B36' : '#0F2B5C'} />
                  <text x="185" y="119" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">2</text>
                  <line x1="175" y1="115" x2="153" y2="125" stroke="#0F2B5C" strokeWidth="1.5" />

                  {/* Маркер №4 (Тіокол) */}
                  <circle cx="15" cy="220" r="10" fill={activeGlassLayer === 4 ? '#FE5B36' : '#0F2B5C'} />
                  <text x="15" y="224" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">4</text>
                  <line x1="25" y1="220" x2="41" y2="215" stroke="#0F2B5C" strokeWidth="1.5" />
                </svg>
              </div>

              <span className="text-[11px] text-slate-400 mt-3 font-mono">
                Креслення вузла подвійної герметизації ДСТУ
              </span>
            </div>

            {/* Опис виділеного компонента */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Перемикачі 1-5 */}
              <div className="flex flex-wrap gap-2 mb-5">
                {GLASS_LAYERS.map((layer) => {
                  const isAct = activeGlassLayer === layer.id;
                  return (
                    <button
                      key={layer.id}
                      onClick={() => setActiveGlassLayer(layer.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isAct
                          ? 'bg-[#FE5B36] text-white shadow-md shadow-orange-500/25 scale-105'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {layer.shortName}
                    </button>
                  );
                })}
              </div>

              {/* Картка детального опису шару */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm relative overflow-hidden">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-[#0F2B5C] text-white flex items-center justify-center font-black text-sm">
                    {selectedLayer.id}
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                      {selectedLayer.name}
                    </h4>
                    <span className="text-xs text-[#FE5B36] font-semibold">
                      {selectedLayer.role}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mt-2">
                  {selectedLayer.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">Матеріал:</span>
                  <span>{selectedLayer.materials}</span>
                </div>
              </div>

              {/* Порада інженера щодо газу аргон */}
              <div className="mt-4 bg-blue-50/80 border border-blue-200/80 rounded-xl p-3.5 flex items-start gap-3">
                <ShieldCheckIcon size={18} color="#0284C7" />
                <p className="text-xs text-blue-950 leading-relaxed">
                  <strong>Чому газ аргон не вивітрюється?</strong> Завдяки первинному бутиловому шару (№1)
                  та вторинному тіоколу (№4), витік інертного газу становить менше 1% на рік. Склопакет
                  зберігає повну теплоізоляцію понад 20–25 років.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── БЛОК 2: ПОВНИЙ ТЕКСТ СТАТТІ В СУЧАСНОМУ РЕДАКЦІЙНОМУ СТИЛІ ── */}
        <div className="max-w-4xl mx-auto">
          {/* Вступний акцент */}
          <div className="bg-gradient-to-r from-slate-50 via-white to-orange-50/40 border-l-4 border-[#FE5B36] p-6 rounded-r-2xl mb-10 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Головний принцип будови сучасного металопластикового вікна
            </h3>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              На відміну від старих дерев’яних вікон зі спареними або роздільними стулками, де використовувалося звичайне
              одинарне скло та поролонові ущільнювачі, сучасне вікно будується за принципом{' '}
              <strong>жорсткої монолітної коробки (рами)</strong> та{' '}
              <strong>герметичної одинарної стулки зі склопакетом</strong>. Стулка притискається по всьому периметру
              завдяки рухомим цапфам фурнітури до двох або трьох контурів каучуку EPDM.
            </p>
          </div>

          {/* 4 головних складових вікна */}
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {[
              {
                title: '1. Багатокамерний ПВХ-профіль',
                desc: 'Спеціальний екструдований пластик з 4–7 внутрішніми ізольованими повітряними камерами. Чим більше камер — тим вищий коефіцієнт R-опору.',
                icon: LayersIcon,
              },
              {
                title: '2. Оцинковане сталеве армування',
                desc: 'Сталевий каркас товщиною 1.5–2.0 мм усередині центральної камери. Запобігає викривленню профілю на сонці та під дією вітру.',
                icon: ShieldCheckIcon,
              },
              {
                title: '3. Герметичний склопакет',
                desc: 'Конструкція з 2 або 3 стекол, розділених перфорованою дистанційною рамкою з силікагелем та подвійним шаром герметиків.',
                icon: ZapIcon,
              },
              {
                title: '4. Периметральна фурнітура',
                desc: 'Сталевий механізм з антикорозійним захистом по всьому периметру стулки. Забезпечує мікропровітрювання та притиск до 8 точок.',
                icon: LayersIcon,
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 hover:border-slate-300 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-orange-100/80 text-[#FE5B36] flex items-center justify-center mb-3">
                  <item.icon size={20} />
                </div>
                <h4 className="font-bold text-slate-900 text-base mb-1.5">{item.title}</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Детальні розділи статті */}
          <div className="space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 tracking-tight">
                Навіщо всередині профілю повітряні камери?
              </h3>
              <p>
                ПВХ-профілі VIKNALAND виготовляються методом екструзії з високостійкого полівінілхлориду.
                Внутрішній простір профілю не є суцільним — він поділений перегородками на ізольовані повітряні камери
                (від 4 у системі B58 до 7 у системі VIKNALAND 85).
              </p>
              <p className="mt-2">
                Нерухоме сухе повітря має надзвичайно низьку теплопровідність. Кожна камера працює як послідовний
                термобар’єр: зовнішня камера відводить конденсат і приймає вуличний холод, центральна містить сталь,
                а внутрішні зберігають кімнатне тепло.
              </p>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 tracking-tight">
                Чому вікна називають саме «металопластиковими»?
              </h3>
              <p>
                Сам по собі полівінілхлорид є пружним термопластом. Під впливом сонячного тепла влітку та сильних
                морозів узимку пластик відчуває температурне розширення (до 2–3 мм на метр довжини). Щоб стулка не
                провисала, не втрачала геометрію та витримувала ураганні пориви вітру, всередину кожної деталі
                вставляється сталевий армуючий вкладиш.
              </p>
              <p className="mt-2">
                Завод VIKNALAND використовує <strong>оцинковану сталь товщиною від 1.5 мм</strong> замкнутого квадратного
                або посиленого П-подібного перерізу, що гарантує 100% стабільність стулок будь-яких габаритів.
              </p>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 tracking-tight">
                Чому виникає конденсат на вікнах і як його уникнути?
              </h3>
              <p>
                Старі дерев’яні вікна забезпечували «природну вентиляцію» за рахунок численних щілин і нещільностей.
                Металопластикове вікно з якісними EPDM-ущільнювачами герметичне на 100%. Якщо в приміщенні підвищується
                вологість (готування їжі, сушіння білизни, душ, рослини), волозі нікуди виходити. Вона осідає у вигляді
                крапель роси на найхолоднішій поверхні — зазвичай це нижня кромка скла або підвіконня.
              </p>
              <div className="mt-4 bg-amber-50 border border-amber-200/90 rounded-2xl p-4 sm:p-5">
                <h4 className="font-bold text-amber-950 text-sm sm:text-base flex items-center gap-2 mb-2">
                  <CheckIcon size={18} color="#D97706" />
                  <span>3 правила боротьби з конденсатом від технологів:</span>
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-amber-900">
                  <li>• <strong>Обирайте енергозберігаючий склопакет:</strong> склопакет з аргоном та Low-E напиленням має внутрішнє скло тепліше на 5–7°C, що запобігає випаданню точки роси.</li>
                  <li>• <strong>Використовуйте мікрощілинне провітрювання:</strong> поворот ручки на 45° віджимає стулку всього на 2–3 мм, постійно оновлюючи повітря без протягів.</li>
                  <li>• <strong>Не перекривайте підвіконням радіатор:</strong> тепле повітря від батареї повинно вільно омивати поверхню вікна.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Блок заклику до дії (CTA) */}
          <div className="mt-14 bg-gradient-to-br from-[#0A1B3B] via-[#0F2B5C] to-[#163B7A] rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-xl">
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#FE5B36]/15 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl">
              <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">
                ( Безкоштовна консультація інженера )
              </span>
              <h3 className="text-xl sm:text-3xl font-black tracking-tight mt-1 leading-tight">
                Бажаєте розрахувати правильну конфігурацію для вашої оселі?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                Наші інженери допоможуть обрати оптимальну кількість камер профілю, правильну формулу склопакета
                під ваш поверх та сторону світу, а також безкоштовно виконають точний лазерний замір.
              </p>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-6">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-6 py-3 rounded-xl bg-[#FE5B36] hover:bg-[#e04825] text-white text-xs sm:text-sm font-bold shadow-lg shadow-orange-500/30 transition-all cursor-pointer"
                >
                  Викликати замірника безкоштовно
                </button>
                <a
                  href="#configurator"
                  className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold border border-white/20 transition-all"
                >
                  Відкрити 3D-калькулятор
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Модальне вікно замовлення */}
      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Консультація технолога та безкоштовний замір"
        subtitle="Зафіксуйте заводську ціну та отримайте точний прорахунок конфігурації за ДСТУ"
      />
    </section>
  );
}
