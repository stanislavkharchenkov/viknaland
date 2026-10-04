'use client';

import { useState, useMemo } from 'react';
import {
  WindowType,
  OpeningType,
  ProfileSystem,
  GlassUnit,
  HardwareBrand,
  LaminationColor,
  CalculatorOptions,
} from '@/types/viknaland';
import {
  calculateWindowPrice,
  DEFAULT_SIZES,
  getOpeningOptions,
} from '@/lib/calculator-engine';
import OrderModal from '@/components/ui/OrderModal';
import WindowCanvasVisualizer from './WindowCanvasVisualizer';
import {
  WindowSingleIcon,
  WindowDoubleIcon,
  WindowTripleIcon,
  BalconyDoorIcon,
  PanoramaIcon,
  CheckIcon,
  ArrowRightIcon,
  PlusIcon,
  MinusIcon,
} from '@/components/ui/Icons';

export default function WindowConfigurator() {
  const [windowType, setWindowType] = useState<WindowType>('balcony_block');
  const [openingType, setOpeningType] = useState<OpeningType>('turn_and_fixed');
  const [width, setWidth] = useState<number>(DEFAULT_SIZES.balcony_block.width);
  const [height, setHeight] = useState<number>(DEFAULT_SIZES.balcony_block.height);
  const [profile, setProfile] = useState<ProfileSystem>('b70');
  const [glass, setGlass] = useState<GlassUnit>('two_chamber_energy');
  const [hardware, setHardware] = useState<HardwareBrand>('siegenia');
  const [lamination, setLamination] = useState<LaminationColor>('white');
  const [mosquitoNet, setMosquitoNet] = useState<boolean>(true);
  const [sill, setSill] = useState<boolean>(true);
  const [drip, setDrip] = useState<boolean>(true);
  const [childLock, setChildLock] = useState<boolean>(false);
  const [warmMount, setWarmMount] = useState<boolean>(true);
  const [disassembly, setDisassembly] = useState<boolean>(true);

  // Специфічні опції для балконного блоку
  const [balconyDoorSide, setBalconyDoorSide] = useState<'right' | 'left'>('right');
  const [balconyBottomType, setBalconyBottomType] = useState<'sandwich' | 'glass'>('sandwich');

  // Інтерактивні режими візуалізатора: Студія / CAD / Тепловізор
  const [viewMode, setViewMode] = useState<'studio' | 'cad' | 'thermal'>('studio');
  const [sashState, setSashState] = useState<'closed' | 'open' | 'tilt'>('closed');

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Межі слайдерів розміру залежно від типу
  const sizeLimits = useMemo(() => {
    switch (windowType) {
      case 'single':
        return { minW: 450, maxW: 1300, minH: 500, maxH: 1800 };
      case 'double':
        return { minW: 900, maxW: 2200, minH: 800, maxH: 1900 };
      case 'triple':
        return { minW: 1500, maxW: 3200, minH: 800, maxH: 1900 };
      case 'balcony_block':
        return { minW: 1400, maxW: 2600, minH: 1950, maxH: 2500 };
      case 'balcony_glazing':
        return { minW: 2000, maxW: 4500, minH: 1000, maxH: 2200 };
    }
  }, [windowType]);

  // Швидкі типові розміри за типами українських будинків
  const sizePresets = useMemo(() => {
    switch (windowType) {
      case 'single':
        return [
          { label: '800 × 1200', w: 800, h: 1200, sub: 'Кухня' },
          { label: '900 × 1400', w: 900, h: 1400, sub: 'Стандарт' },
          { label: '1100 × 1450', w: 1100, h: 1450, sub: 'Чешка' },
        ];
      case 'double':
        return [
          { label: '1300 × 1400', w: 1300, h: 1400, sub: 'Хрущовка' },
          { label: '1450 × 1450', w: 1450, h: 1450, sub: 'Чешка / 96' },
          { label: '1800 × 1450', w: 1800, h: 1450, sub: 'Новобудова' },
        ];
      case 'triple':
        return [
          { label: '1800 × 1400', w: 1800, h: 1400, sub: 'Спальня' },
          { label: '2100 × 1450', w: 2100, h: 1450, sub: 'Вітальня' },
          { label: '2400 × 1500', w: 2400, h: 1500, sub: 'Новобудова' },
        ];
      case 'balcony_block':
        return [
          { label: '1800 × 2150', w: 1800, h: 2150, sub: 'Хрущовка' },
          { label: '2050 × 2150', w: 2050, h: 2150, sub: 'Чешка' },
          { label: '2200 × 2250', w: 2200, h: 2250, sub: 'Новобудова' },
        ];
      case 'balcony_glazing':
        return [
          { label: '2800 × 1500', w: 2800, h: 1500, sub: '3-метровий' },
          { label: '3200 × 1550', w: 3200, h: 1550, sub: 'Лоджія' },
          { label: '3600 × 1600', w: 3600, h: 1600, sub: 'Панорама' },
        ];
    }
  }, [windowType]);

  const canOpen = useMemo(() => {
    if (windowType === 'single' && openingType === 'fixed') return false;
    return true;
  }, [windowType, openingType]);

  const handleWindowTypeChange = (newType: WindowType) => {
    setWindowType(newType);
    const def = DEFAULT_SIZES[newType];
    setWidth(def.width);
    setHeight(def.height);
    const available = getOpeningOptions(newType);
    if (!available.some((op) => op.id === openingType)) {
      setOpeningType(available[0].id);
    }
    setSashState('closed');
  };

  const currentOptions: CalculatorOptions = useMemo(
    () => ({
      windowType,
      openingType,
      width,
      height,
      quantity: 1,
      profile,
      glass,
      hardware,
      lamination,
      mosquitoNet,
      sill,
      drip,
      childLock,
      warmMount,
      disassembly,
    }),
    [
      windowType,
      openingType,
      width,
      height,
      profile,
      glass,
      hardware,
      lamination,
      mosquitoNet,
      sill,
      drip,
      childLock,
      warmMount,
      disassembly,
    ]
  );

  const priceResult = useMemo(() => calculateWindowPrice(currentOptions), [currentOptions]);

  const openingOptions = useMemo(() => getOpeningOptions(windowType), [windowType]);


  return (
    <section id="configurator" className="py-16 lg:py-24 bg-white text-slate-900 relative overflow-hidden border-b border-slate-200/80">
      <div className="container-vl">
        {/* Заголовок секції */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FE5B36] uppercase tracking-wider mb-2">
            <span>(</span>
            <span>Онлайн-конструктор вікон</span>
            <span>)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Сконфігуруйте вікна під ключ <br />
            та отримайте чесну ціну заводу
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600">
            Оберіть тип, розміри та опції — калькулятор миттєво порахує вартість зі знижкою <strong>-30%</strong> без прихованих націнок посередників.
          </p>
        </div>

        {/* Головна сітка: Ліворуч — Візуалізація + Розміри, Праворуч — Всі параметри */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Ліва колонка: Інтерактивний архітектурний візуалізатор (5 колонок) */}
          <div className="lg:col-span-5 bg-slate-50 rounded-3xl p-3.5 sm:p-6 lg:p-7 border border-slate-200/90 shadow-xl lg:sticky lg:top-20">
            {/* Інтерактивний архітектурний візуалізатор вікон VIKNALAND */}
            <WindowCanvasVisualizer
              windowType={windowType}
              openingType={openingType}
              width={width}
              height={height}
              profile={profile}
              glass={glass}
              hardware={hardware}
              lamination={lamination}
              mosquitoNet={mosquitoNet}
              sill={sill}
              drip={drip}
              childLock={childLock}
              balconyDoorSide={balconyDoorSide}
              balconyBottomType={balconyBottomType}
              viewMode={viewMode}
              setViewMode={setViewMode}
              sashState={sashState}
              setSashState={setSashState}
              onToggleDoorSide={() =>
                setBalconyDoorSide((prev) => (prev === 'right' ? 'left' : 'right'))
              }
            />

            {/* Швидкі типові розміри */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <span>Типові серії будинків:</span>
                <span className="text-slate-400 font-normal">в 1 клік</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                {sizePresets.map((preset, idx) => {
                  const isCurrent = width === preset.w && height === preset.h;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setWidth(preset.w);
                        setHeight(preset.h);
                      }}
                      className={`p-2 rounded-xl text-left transition-all cursor-pointer border ${
                        isCurrent
                          ? 'bg-[#FE5B36] text-white border-[#FE5B36] shadow-sm'
                          : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-800'
                      }`}
                    >
                      <div className="font-mono font-bold text-xs leading-none">{preset.label}</div>
                      <div
                        className={`text-[10px] mt-1 truncate ${
                          isCurrent ? 'text-white/80' : 'text-slate-500'
                        }`}
                      >
                        {preset.sub}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Точні повзунки та ручне введення розмірів */}
            <div className="space-y-4 mt-4 pt-4 border-t border-slate-200">
              {/* Ширина */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
                  <span>Ширина конструкції:</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setWidth((prev) => Math.max(sizeLimits.minW, prev - 10))}
                      className="w-5 h-5 rounded bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-700 cursor-pointer font-bold"
                      title="-10 мм"
                    >
                      <MinusIcon size={12} />
                    </button>
                    <span className="text-[#FE5B36] font-bold font-mono text-sm min-w-[64px] text-center bg-white px-2 py-0.5 rounded border border-slate-200">
                      {width} мм
                    </span>
                    <button
                      type="button"
                      onClick={() => setWidth((prev) => Math.min(sizeLimits.maxW, prev + 10))}
                      className="w-5 h-5 rounded bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-700 cursor-pointer font-bold"
                      title="+10 мм"
                    >
                      <PlusIcon size={12} />
                    </button>
                  </div>
                </div>
                <input
                  type="range"
                  min={sizeLimits.minW}
                  max={sizeLimits.maxW}
                  step="10"
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#FE5B36]"
                />
              </div>

              {/* Висота */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
                  <span>
                    Висота {windowType === 'balcony_block' ? 'дверей' : 'конструкції'}:
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setHeight((prev) => Math.max(sizeLimits.minH, prev - 10))}
                      className="w-5 h-5 rounded bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-700 cursor-pointer font-bold"
                      title="-10 мм"
                    >
                      <MinusIcon size={12} />
                    </button>
                    <span className="text-[#FE5B36] font-bold font-mono text-sm min-w-[64px] text-center bg-white px-2 py-0.5 rounded border border-slate-200">
                      {height} мм
                    </span>
                    <button
                      type="button"
                      onClick={() => setHeight((prev) => Math.min(sizeLimits.maxH, prev + 10))}
                      className="w-5 h-5 rounded bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-700 cursor-pointer font-bold"
                      title="+10 мм"
                    >
                      <PlusIcon size={12} />
                    </button>
                  </div>
                </div>
                <input
                  type="range"
                  min={sizeLimits.minH}
                  max={sizeLimits.maxH}
                  step="10"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#FE5B36]"
                />
              </div>
            </div>

            {/* Блок вартості під ключ */}
            <div className="mt-5 pt-4 border-t border-slate-200">
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-xs text-slate-500">Базова вартість:</span>
                <span className="text-sm line-through text-slate-400 font-medium font-mono">
                  {priceResult.basePrice.toLocaleString('uk-UA')} грн
                </span>
              </div>

              <div className="flex items-baseline justify-between mb-3">
                <span className="text-sm font-bold text-slate-900">
                  Ціна заводу (-30%):
                </span>
                <span className="text-3xl font-black text-[#FE5B36] tracking-tight font-mono">
                  {priceResult.discountedPrice.toLocaleString('uk-UA')} грн
                </span>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between text-xs text-slate-700 font-medium mb-3.5 shadow-xs">
                <span>Оплата частинами 0%:</span>
                <span className="font-bold text-[#FE5B36]">від {priceResult.installmentMonthly} грн/міс</span>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full py-4 bg-[#FE5B36] hover:bg-[#ff6c47] active:scale-[0.99] text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-[#FE5B36]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Зафіксувати ціну та викликати замірника</span>
                <ArrowRightIcon className="w-4 h-4 ml-1" />
              </button>

              <div className="mt-2 text-center">
                <span className="text-[11px] text-slate-500">
                  Енергозберігаючий склопакет з аргоном у подарунок
                </span>
              </div>
            </div>
          </div>

          {/* Права колонка: Параметри та комплектація (7 колонок) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Крок 1: Тип вікна з векторними SVG-іконками */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-md">
              <h3 className="text-xs font-bold text-[#FE5B36] uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-orange-100 text-[#FE5B36] flex items-center justify-center text-[10px] font-bold">
                  1
                </span>
                Тип віконної конструкції
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { id: 'single', label: 'Одностулкове', icon: <WindowSingleIcon color="#FE5B36" /> },
                  { id: 'double', label: 'Двостулкове', icon: <WindowDoubleIcon color="#FE5B36" /> },
                  { id: 'triple', label: 'Тристулкове', icon: <WindowTripleIcon color="#FE5B36" /> },
                  { id: 'balcony_block', label: 'Балконний блок', icon: <BalconyDoorIcon color="#FE5B36" /> },
                  { id: 'balcony_glazing', label: 'Скління балкону', icon: <PanoramaIcon color="#FE5B36" /> },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleWindowTypeChange(item.id as WindowType)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      windowType === item.id
                        ? 'border-[#FE5B36] bg-orange-50/70 ring-1 ring-[#FE5B36]'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                    }`}
                  >
                    <div className="mb-2">{item.icon}</div>
                    <div className="text-xs font-bold text-slate-900">{item.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Крок 2: Спосіб відкривання стулок */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-md">
              <h3 className="text-xs font-bold text-[#FE5B36] uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-orange-100 text-[#FE5B36] flex items-center justify-center text-[10px] font-bold">
                  2
                </span>
                Конфігурація відкривання та стулок
              </h3>

              <div className="grid sm:grid-cols-2 gap-3 mb-4">
                {openingOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setOpeningType(opt.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      openingType === opt.id
                        ? 'border-[#FE5B36] bg-orange-50/70 ring-1 ring-[#FE5B36]'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900">{opt.label}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {opt.id === 'turn_and_fixed' ? 'Стандартний вибір' : 'Максимальний комфорт'}
                      </div>
                    </div>
                    {openingType === opt.id && <CheckIcon className="w-4 h-4 text-[#FE5B36]" />}
                  </button>
                ))}
              </div>

              {/* Додаткові перемикачі для балконного блоку */}
              {windowType === 'balcony_block' && (
                <div className="pt-3 border-t border-slate-200 grid sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-700 block mb-2">
                      Розташування дверей:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setBalconyDoorSide('right')}
                        className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          balconyDoorSide === 'right'
                            ? 'border-[#0F2B5C] bg-[#0F2B5C] text-white shadow-xs'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        Праворуч
                      </button>
                      <button
                        type="button"
                        onClick={() => setBalconyDoorSide('left')}
                        className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          balconyDoorSide === 'left'
                            ? 'border-[#0F2B5C] bg-[#0F2B5C] text-white shadow-xs'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        Ліворуч
                      </button>
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-slate-700 block mb-2">
                      Низ балконних дверей:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setBalconyBottomType('sandwich')}
                        className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          balconyBottomType === 'sandwich'
                            ? 'border-[#0F2B5C] bg-[#0F2B5C] text-white shadow-xs'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        Сендвіч 24мм
                      </button>
                      <button
                        type="button"
                        onClick={() => setBalconyBottomType('glass')}
                        className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          balconyBottomType === 'glass'
                            ? 'border-[#0F2B5C] bg-[#0F2B5C] text-white shadow-xs'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        Склопакет
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Крок 3: Профільна система Viknaland */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-md">
              <h3 className="text-xs font-bold text-[#FE5B36] uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-orange-100 text-[#FE5B36] flex items-center justify-center text-[10px] font-bold">
                  3
                </span>
                Профільна система VIKNALAND
              </h3>
              <div className="grid sm:grid-cols-3 gap-3.5">
                {[
                  {
                    id: 'b58',
                    name: 'Viknaland B58',
                    desc: '4 камери / 58 мм',
                    sub: 'Оптимально для балконів та дач',
                    r: '0.77 м²·°C/Вт',
                  },
                  {
                    id: 'b70',
                    name: 'Viknaland B70',
                    desc: '6 камер / 70 мм',
                    sub: 'Хіт продажів для квартир',
                    tag: 'ХІТ',
                    r: '0.91 м²·°C/Вт',
                  },
                  {
                    id: 'v85',
                    name: 'Viknaland 85',
                    desc: '7 камер / 85 мм',
                    sub: 'Преміум Passivhaus для котеджів',
                    r: '1.15 м²·°C/Вт',
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setProfile(item.id as ProfileSystem)}
                    className={`p-4 rounded-2xl border text-left transition-all relative cursor-pointer ${
                      profile === item.id
                        ? 'border-[#FE5B36] bg-orange-50/70 ring-1 ring-[#FE5B36]'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                    }`}
                  >
                    {item.tag && (
                      <span className="absolute -top-2.5 right-3 bg-[#FE5B36] text-white text-[9px] font-black px-2 py-0.5 rounded-full">
                        {item.tag}
                      </span>
                    )}
                    <div className="font-bold text-slate-900 text-sm">{item.name}</div>
                    <div className="text-xs font-semibold text-[#FE5B36] mt-0.5">
                      {item.desc}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-2">{item.sub}</div>
                    <div className="mt-2 text-[10px] font-mono text-slate-400">
                      R = {item.r}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Крок 4: Склопакет */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-md">
              <h3 className="text-xs font-bold text-[#FE5B36] uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-orange-100 text-[#FE5B36] flex items-center justify-center text-[10px] font-bold">
                  4
                </span>
                Тип склопакета
              </h3>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  {
                    id: 'single_chamber',
                    name: '1-камерний (24 мм)',
                    sub: 'Базовий стандарт для неопалюваних лоджій',
                  },
                  {
                    id: 'two_chamber_energy',
                    name: '2-камерний Енерго (32 мм)',
                    sub: 'i-Glass + газ Аргон у подарунок',
                    badge: 'ПОДАРУНОК',
                  },
                  {
                    id: 'two_chamber_solar',
                    name: 'Мультифункція Solar (40 мм)',
                    sub: 'Зберігає тепло взимку та прохолоду влітку',
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setGlass(item.id as GlassUnit)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      glass === item.id
                        ? 'border-[#FE5B36] bg-orange-50/70 ring-1 ring-[#FE5B36]'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                    }`}
                  >
                    {item.badge && (
                      <span className="inline-block bg-[#FE5B36] text-white text-[9px] font-black px-1.5 py-0.5 rounded mb-1">
                        {item.badge}
                      </span>
                    )}
                    <div className="text-xs font-bold text-slate-900">{item.name}</div>
                    <div className="text-[11px] text-slate-500 mt-1">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Крок 5: Ламінація */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-md">
              <h3 className="text-xs font-bold text-[#FE5B36] uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-orange-100 text-[#FE5B36] flex items-center justify-center text-[10px] font-bold">
                  5
                </span>
                Колір профілю (ламінація Renolit Німеччина)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {[
                  { id: 'white', name: 'Білий', hex: '#FFFFFF', border: '#CBD5E1' },
                  { id: 'anthracite', name: 'Антрацит', hex: '#293548', border: '#1E293B' },
                  { id: 'golden_oak', name: 'Золотий дуб', hex: '#9E6534', border: '#78441A' },
                  { id: 'dark_oak', name: 'Темний дуб', hex: '#543825', border: '#3B2314' },
                  { id: 'basalt_grey', name: 'Базальт', hex: '#56606E', border: '#3F4752' },
                ].map((col) => (
                  <button
                    key={col.id}
                    type="button"
                    onClick={() => setLamination(col.id as LaminationColor)}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 cursor-pointer ${
                      lamination === col.id
                        ? 'border-[#FE5B36] bg-orange-50/70 ring-1 ring-[#FE5B36]'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                    }`}
                  >
                    <span
                      className="w-7 h-7 rounded-full shadow-sm border"
                      style={{ backgroundColor: col.hex, borderColor: col.border }}
                    />
                    <span className="text-[11px] font-semibold text-slate-800">{col.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Крок 6: Фурнітура */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-md">
              <h3 className="text-xs font-bold text-[#FE5B36] uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-orange-100 text-[#FE5B36] flex items-center justify-center text-[10px] font-bold">
                  6
                </span>
                Фурнітура (витримує 40 000 циклів)
              </h3>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { id: 'axor', name: 'Axor Komfort', country: 'Україна', sub: 'Доступна якість' },
                  { id: 'maco', name: 'Maco Multi-Trend', country: 'Австрія', sub: 'Мікропровітрювання' },
                  { id: 'siegenia', name: 'Siegenia Titan AF', country: 'Німеччина', sub: 'Преміум захист' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setHardware(item.id as HardwareBrand)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      hardware === item.id
                        ? 'border-[#FE5B36] bg-orange-50/70 ring-1 ring-[#FE5B36]'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900">{item.name}</div>
                    <div className="text-[11px] text-[#FE5B36] font-semibold">{item.country}</div>
                    <div className="text-[11px] text-slate-500 mt-1">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Крок 7: Додаткові опції */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-md">
              <h3 className="text-xs font-bold text-[#FE5B36] uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-orange-100 text-[#FE5B36] flex items-center justify-center text-[10px] font-bold">
                  7
                </span>
                Комплектація під ключ
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  {
                    checked: mosquitoNet,
                    setter: setMosquitoNet,
                    label: 'Москітна сітка Anwis',
                    price: '+450 грн',
                  },
                  {
                    checked: sill,
                    setter: setSill,
                    label: 'Підвіконня Danke преміум',
                    price: '+680 грн',
                  },
                  {
                    checked: drip,
                    setter: setDrip,
                    label: 'Водовідлив антигул',
                    price: '+330 грн',
                  },
                  {
                    checked: childLock,
                    setter: setChildLock,
                    label: 'Дитячий замок безпеки',
                    price: '+350 грн',
                  },
                  {
                    checked: warmMount,
                    setter: setWarmMount,
                    label: 'Теплий монтаж за ДСТУ',
                    price: '+990 грн',
                  },
                  {
                    checked: disassembly,
                    setter: setDisassembly,
                    label: 'Демонтаж старих рам',
                    price: '0 грн (АКЦІЯ)',
                  },
                ].map((opt, idx) => (
                  <label
                    key={idx}
                    className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-colors ${
                      opt.checked ? 'border-[#FE5B36] bg-orange-50/70' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={opt.checked}
                        onChange={(e) => opt.setter(e.target.checked)}
                        className="w-4 h-4 rounded text-[#FE5B36] focus:ring-[#FE5B36]"
                      />
                      <span className="text-xs font-semibold text-slate-800">{opt.label}</span>
                    </div>
                    <span className="text-xs font-bold text-[#FE5B36]">{opt.price}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        calculatorState={{ options: currentOptions, price: priceResult }}
      />
    </section>
  );
}
