'use client';

import React, { useMemo } from 'react';
import {
  WindowType,
  OpeningType,
  ProfileSystem,
  GlassUnit,
  HardwareBrand,
  LaminationColor,
} from '@/types/viknaland';
import {
  DraftingIcon,
  StudioIcon,
  ThermalIcon,
  WindowOpenIcon,
  WindowTiltIcon,
  FlipIcon,
} from '@/components/ui/Icons';

export interface WindowCanvasVisualizerProps {
  windowType: WindowType;
  openingType: OpeningType;
  width: number;
  height: number;
  profile: ProfileSystem;
  glass: GlassUnit;
  hardware: HardwareBrand;
  lamination: LaminationColor;
  mosquitoNet: boolean;
  sill: boolean;
  drip: boolean;
  childLock: boolean;
  balconyDoorSide: 'right' | 'left';
  balconyBottomType: 'sandwich' | 'glass';
  viewMode: 'studio' | 'cad' | 'thermal';
  setViewMode: (mode: 'studio' | 'cad' | 'thermal') => void;
  sashState: 'closed' | 'open' | 'tilt';
  setSashState: (state: 'closed' | 'open' | 'tilt') => void;
  onToggleDoorSide: () => void;
}

export default function WindowCanvasVisualizer({
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
  balconyDoorSide,
  balconyBottomType,
  viewMode,
  setViewMode,
  sashState,
  setSashState,
  onToggleDoorSide,
}: WindowCanvasVisualizerProps) {
  // Кольори ламінації з реалістичними відтінками, фактурою та фасками
  const frameColorMap: Record<
    LaminationColor,
    {
      bg: string;
      border: string;
      lightBevel: string;
      darkBevel: string;
      name: string;
      handleColor: 'white' | 'silver' | 'titanium' | 'bronze';
      isWood: boolean;
    }
  > = {
    white: {
      bg: '#FFFFFF',
      border: '#E2E8F0',
      lightBevel: '#FFFFFF',
      darkBevel: '#CBD5E1',
      name: 'Класичний білий',
      handleColor: 'white',
      isWood: false,
    },
    anthracite: {
      bg: '#25303D',
      border: '#151D28',
      lightBevel: '#3B485A',
      darkBevel: '#141A22',
      name: 'Антрацит (RAL 7016)',
      handleColor: 'silver',
      isWood: false,
    },
    golden_oak: {
      bg: '#8B4E1F',
      border: '#5C310F',
      lightBevel: '#B26E34',
      darkBevel: '#63330E',
      name: 'Золотий дуб',
      handleColor: 'bronze',
      isWood: true,
    },
    dark_oak: {
      bg: '#422716',
      border: '#261307',
      lightBevel: '#5E3820',
      darkBevel: '#261408',
      name: 'Темний дуб',
      handleColor: 'bronze',
      isWood: true,
    },
    basalt_grey: {
      bg: '#545E6E',
      border: '#38404C',
      lightBevel: '#6E7C90',
      darkBevel: '#343B47',
      name: 'Базальтово-сірий',
      handleColor: 'silver',
      isWood: false,
    },
  };

  const currentFrame = frameColorMap[lamination];

  // Специфікація скла
  const glassConfig = useMemo(() => {
    switch (glass) {
      case 'single_chamber':
        return {
          code: '4-16-4',
          thickness: '24 мм',
          name: '1-камерний базовий',
          tintClass: 'from-sky-100/35 via-sky-300/15 to-transparent',
          ug: '1.4 Вт/м²K',
          label: '24мм',
          temp: '+15.2°C',
        };
      case 'two_chamber_energy':
        return {
          code: '4i-14Ar-4-14Ar-4i',
          thickness: '32 мм + Аргон',
          name: '2-кам. Енерго i-Glass',
          tintClass: 'from-cyan-200/40 via-sky-400/25 to-blue-900/15',
          ug: '1.0 Вт/м²K',
          label: '32мм + Ar',
          temp: '+19.6°C',
        };
      case 'two_chamber_solar':
        return {
          code: '4Sol-14Ar-4-14Ar-4i',
          thickness: '40 мм Solar',
          name: 'Мультифункція Solar',
          tintClass: 'from-emerald-200/45 via-cyan-400/25 to-indigo-900/20',
          ug: '0.8 Вт/м²K',
          label: '40мм Solar',
          temp: '+20.4°C',
        };
    }
  }, [glass]);

  // Специфікація профілю
  const profileConfig = useMemo(() => {
    switch (profile) {
      case 'b58':
        return { name: 'VIKNALAND B58', chambers: '4 камери / 58 мм', rValue: '0.77', temp: '+16.5°C' };
      case 'b70':
        return { name: 'VIKNALAND B70', chambers: '6 камер / 70 мм', rValue: '0.91', temp: '+18.4°C' };
      case 'v85':
        return { name: 'VIKNALAND 85', chambers: '7 камер / 85 мм', rValue: '1.15', temp: '+19.8°C' };
    }
  }, [profile]);

  // Специфікація фурнітури
  const hardwareConfig = useMemo(() => {
    switch (hardware) {
      case 'axor':
        return { name: 'Axor Komfort', country: 'Україна', cycles: '25 000 циклів' };
      case 'maco':
        return { name: 'Maco Multi-Trend', country: 'Австрія', cycles: '40 000 циклів' };
      case 'siegenia':
        return { name: 'Siegenia Titan AF', country: 'Німеччина', cycles: '50 000 циклів' };
    }
  }, [hardware]);

  // Чи можна взагалі відкривати цю конфігурацію
  const canOpen = useMemo(() => {
    if (windowType === 'single' && openingType === 'fixed') return false;
    return true;
  }, [windowType, openingType]);

  const toggleSashState = () => {
    if (!canOpen) return;
    setSashState(
      sashState === 'closed' ? 'open' : sashState === 'open' ? 'tilt' : 'closed'
    );
  };

  // Розрахунок фізично пропорційних габаритів у вʼюпорті
  const dimensions = useMemo(() => {
    const aspectRatio = width / height;
    const maxBoxW = 340;
    const maxBoxH = 250;

    let renderW = maxBoxW;
    let renderH = renderW / aspectRatio;

    if (renderH > maxBoxH) {
      renderH = maxBoxH;
      renderW = renderH * aspectRatio;
    }

    renderW = Math.max(160, Math.min(maxBoxW, renderW));
    renderH = Math.max(140, Math.min(maxBoxH, renderH));

    return {
      boxWidth: Math.round(renderW),
      boxHeight: Math.round(renderH),
      areaM2: ((width * height) / 1000000).toFixed(2),
      approxWeightKg: Math.round(((width * height) / 1000000) * 32),
    };
  }, [width, height]);

  // Розрахунок окремих секцій (мм)
  const doorWidthMm = Math.round(width * 0.42);
  const windowWidthMm = width - doorWidthMm;
  const windowHeightMm = Math.round(height * 0.65);
  const parapetHeightMm = height - windowHeightMm;

  const doubleSashWidthMm = Math.round(width / 2);
  const tripleSashWidthMm = Math.round(width / 3);
  const quadSashWidthMm = Math.round(width / 4);

  // Ручка Hoppe Secustik з реалістичним 3-позиційним обертанням
  const renderHandle = (side: 'left' | 'right', isDoor: boolean = false) => {
    const handleStyle =
      currentFrame.handleColor === 'white'
        ? 'from-slate-100 via-white to-slate-300 border-slate-300 text-slate-700'
        : currentFrame.handleColor === 'bronze'
        ? 'from-amber-600 via-amber-700 to-amber-900 border-amber-950 text-amber-200'
        : 'from-slate-200 via-slate-300 to-slate-400 border-slate-500 text-slate-800';

    const rotation =
      sashState === 'open'
        ? side === 'right'
          ? '-rotate-90'
          : 'rotate-90'
        : sashState === 'tilt'
        ? 'rotate-180'
        : 'rotate-0';

    return (
      <div
        className={`absolute ${side === 'right' ? 'right-2' : 'left-2'} ${
          isDoor ? 'top-[50%]' : 'top-[46%]'
        } z-30 transition-transform duration-500 origin-center ${rotation}`}
        title={`Ручка ${hardwareConfig.name} (${sashState === 'closed' ? 'закрито' : sashState === 'open' ? 'відчинено' : 'провітрювання'})`}
      >
        {/* Роетка ручки */}
        <div className="w-2.5 h-6 rounded-sm bg-gradient-to-b from-slate-300 to-slate-500 shadow-md border border-slate-400 relative flex flex-col items-center justify-center">
          {/* Важіль */}
          <div
            className={`w-3 h-8 -mt-2 rounded-t-xs rounded-b-md bg-gradient-to-b ${handleStyle} shadow-lg border relative flex items-center justify-center`}
          >
            <div className="w-1 h-3 rounded-full bg-black/20" />
          </div>
        </div>
      </div>
    );
  };

  // Посилені петлі стулки з ковпачками
  const renderHinges = (side: 'left' | 'right') => (
    <>
      <div
        className={`absolute top-2 ${
          side === 'left' ? 'left-0.5' : 'right-0.5'
        } w-1.5 h-3.5 bg-gradient-to-b from-slate-200 to-slate-400 border border-slate-500 rounded-xs shadow-xs z-20`}
        title="Верхня кутова петля з ножицями"
      />
      <div
        className={`absolute bottom-2 ${
          side === 'left' ? 'left-0.5' : 'right-0.5'
        } w-1.5 h-4 bg-gradient-to-b from-slate-200 to-slate-400 border border-slate-500 rounded-xs shadow-xs z-20`}
        title="Нижня опорна петля Siegenia (витримує 130 кг)"
      />
    </>
  );

  // Ножиці провітрювання при відкиданні
  const renderScissorStay = (side: 'left' | 'right') => {
    if (sashState !== 'tilt') return null;
    return (
      <div
        className={`absolute -top-2 ${
          side === 'left' ? 'left-3 rotate-[12deg]' : 'right-3 -rotate-[12deg]'
        } w-8 h-1 bg-gradient-to-r from-slate-300 via-slate-100 to-slate-400 border border-slate-500 shadow-sm z-30 pointer-events-none`}
        title="Ножиці відкидання фурнітури"
      />
    );
  };

  // Водовідливні ковпачки на нижній рамі
  const renderDrainageCaps = () => (
    <div className="absolute -bottom-1 left-0 right-0 flex justify-around px-6 pointer-events-none z-20">
      <div className="w-2.5 h-1 bg-slate-700/80 rounded-t-xs border border-white/20" title="Водовідливний ковпачок" />
      <div className="w-2.5 h-1 bg-slate-700/80 rounded-t-xs border border-white/20" title="Водовідливний ковпачок" />
    </div>
  );

  // Стиль 3D-відкривання стулки
  const get3DOpeningStyle = (hingeSide: 'left' | 'right') => {
    if (sashState === 'open') {
      const angle = hingeSide === 'left' ? '-26deg' : '26deg';
      return {
        transform: `perspective(700px) rotateY(${angle})`,
        transformOrigin: hingeSide === 'left' ? 'left center' : 'right center',
        boxShadow:
          hingeSide === 'left'
            ? '14px 10px 25px rgba(0,0,0,0.6)'
            : '-14px 10px 25px rgba(0,0,0,0.6)',
      };
    }
    if (sashState === 'tilt') {
      return {
        transform: 'perspective(700px) rotateX(10deg)',
        transformOrigin: 'bottom center',
        boxShadow: '0 -10px 25px rgba(0,0,0,0.5)',
      };
    }
    return {};
  };

  return (
    <div className="w-full select-none">
      {/* ── ВЕРХНЯ ПАНЕЛЬ: РЕЖИМИ ТА ВІДКРИВАННЯ СТУЛОК (100% АДАПТИВНІСТЬ БЕЗ ВИСТУПАННЯ) ── */}
      <div className="flex flex-col gap-2 mb-3 w-full">
        {/* Рядок 1: Режими візуалізації */}
        <div className="grid grid-cols-3 bg-slate-200/90 p-1 rounded-xl border border-slate-300 text-[10px] sm:text-[11px] font-bold w-full">
          <button
            type="button"
            onClick={() => setViewMode('studio')}
            className={`flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 px-1 sm:px-2 rounded-lg transition-all cursor-pointer ${
              viewMode === 'studio'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <StudioIcon size={12} />
            <span>Студія</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('cad')}
            className={`flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 px-1 sm:px-2 rounded-lg transition-all cursor-pointer ${
              viewMode === 'cad'
                ? 'bg-[#0F2B5C] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <DraftingIcon size={12} />
            <span className="hidden sm:inline">CAD-креслення</span>
            <span className="sm:hidden">CAD</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('thermal')}
            className={`flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 px-1 sm:px-2 rounded-lg transition-all cursor-pointer ${
              viewMode === 'thermal'
                ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ThermalIcon size={12} />
            <span>Тепловізор</span>
          </button>
        </div>

        {/* Рядок 2: Стан стулок */}
        {canOpen ? (
          <div className="grid grid-cols-3 bg-slate-200/90 p-1 rounded-xl border border-slate-300 text-[10px] sm:text-[11px] font-bold w-full">
            <button
              type="button"
              onClick={() => setSashState('closed')}
              className={`flex items-center justify-center py-1.5 px-1 sm:px-2 rounded-lg transition-all cursor-pointer text-center ${
                sashState === 'closed'
                  ? 'bg-[#0F2B5C] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Закрито
            </button>
            <button
              type="button"
              onClick={() => setSashState('open')}
              className={`flex items-center justify-center gap-1 py-1.5 px-1 sm:px-2 rounded-lg transition-all cursor-pointer ${
                sashState === 'open'
                  ? 'bg-[#FE5B36] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <WindowOpenIcon size={12} />
              <span>Відчинено</span>
            </button>
            <button
              type="button"
              onClick={() => setSashState('tilt')}
              className={`flex items-center justify-center gap-1 py-1.5 px-1 sm:px-2 rounded-lg transition-all cursor-pointer ${
                sashState === 'tilt'
                  ? 'bg-[#0284C7] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <WindowTiltIcon size={12} />
              <span>Провітр.</span>
            </button>
          </div>
        ) : (
          <div className="text-[10px] font-bold text-slate-500 bg-slate-200/70 py-1.5 px-2.5 rounded-xl border border-slate-300/80 text-center w-full">
            Глухе скління (без відкривання)
          </div>
        )}
      </div>

      {/* ── ГОЛОВНИЙ ВʼЮПОРТ ВІКНА ── */}
      <div
        className={`relative w-full rounded-2xl border transition-all duration-500 overflow-hidden flex flex-col justify-between p-2.5 sm:p-3.5 min-h-[350px] sm:min-h-[390px] ${
          viewMode === 'cad'
            ? 'bg-[#071120] border-sky-900/60 [background-image:linear-gradient(to_right,#1E293B35_1px,transparent_1px),linear-gradient(to_bottom,#1E293B35_1px,transparent_1px)] [background-size:16px_16px]'
            : viewMode === 'thermal'
            ? 'bg-[#060D1A] border-indigo-900/70 [background-image:radial-gradient(#1E293B60_1px,transparent_1px)] [background-size:14px_14px]'
            : 'bg-gradient-to-b from-[#0F1B2E] via-[#162740] to-[#1C3354] border-slate-700/80 shadow-2xl'
        }`}
      >
        {/* Верхній інформаційний рядок */}
        <div className="flex items-center justify-between text-[11px] font-mono font-bold z-20">
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full border border-white/20 shadow-xs"
              style={{ backgroundColor: currentFrame.bg }}
            />
            <span className="text-white/90 font-sans font-bold text-xs">
              {currentFrame.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {windowType === 'balcony_block' && (
              <button
                type="button"
                onClick={onToggleDoorSide}
                className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/20 text-white/90 text-[10px] font-sans font-semibold border border-white/20 transition-all cursor-pointer"
                title="Змінити бік дверей (ліворуч/праворуч)"
              >
                <FlipIcon size={11} />
                <span>Двері {balconyDoorSide === 'right' ? 'справа' : 'зліва'}</span>
              </button>
            )}

            <div className="bg-black/60 backdrop-blur-sm px-2.5 py-0.5 rounded-md border border-white/15 text-[#38BDF8]">
              <span>{width}</span>
              <span className="text-white/40 mx-1">×</span>
              <span>{height} мм</span>
            </div>
          </div>
        </div>

        {/* ── АРХІТЕКТУРНІ РОЗМІРНІ ЛІНІЇ ЗВЕРХУ ── */}
        <div className="w-full flex flex-col items-center justify-center my-1 z-10">
          {/* Загальна ширина */}
          <div
            className="flex items-center justify-between text-[10px] font-mono font-bold text-[#38BDF8]"
            style={{ width: `${dimensions.boxWidth}px` }}
          >
            <div className="w-2 h-2 border-l border-t border-[#38BDF8]" />
            <div className="flex-1 border-t border-dashed border-[#38BDF8]/60 flex items-center justify-center">
              <span className="bg-black/80 px-2 py-0.2 rounded text-[10px] text-sky-300">
                Загальна ширина: {width} мм
              </span>
            </div>
            <div className="w-2 h-2 border-r border-t border-[#38BDF8]" />
          </div>

          {/* Розбивка стулок по ширині */}
          {windowType === 'balcony_block' && (
            <div
              className={`flex items-center justify-between text-[8px] font-mono text-sky-200/80 mt-0.5 ${
                balconyDoorSide === 'left' ? 'flex-row' : 'flex-row-reverse'
              }`}
              style={{ width: `${dimensions.boxWidth}px` }}
            >
              <span className="w-[42%] text-center bg-black/50 rounded px-1">
                Двері: {doorWidthMm} мм
              </span>
              <span className="w-[58%] text-center bg-black/50 rounded px-1">
                Вікно: {windowWidthMm} мм
              </span>
            </div>
          )}

          {windowType === 'double' && (
            <div
              className="flex items-center justify-between text-[8px] font-mono text-sky-200/80 mt-0.5"
              style={{ width: `${dimensions.boxWidth}px` }}
            >
              <span className="w-1/2 text-center bg-black/50 rounded px-1">
                {doubleSashWidthMm} мм
              </span>
              <span className="w-1/2 text-center bg-black/50 rounded px-1">
                {doubleSashWidthMm} мм
              </span>
            </div>
          )}

          {windowType === 'triple' && (
            <div
              className="flex items-center justify-between text-[8px] font-mono text-sky-200/80 mt-0.5"
              style={{ width: `${dimensions.boxWidth}px` }}
            >
              <span className="w-1/3 text-center bg-black/50 rounded px-1">
                {tripleSashWidthMm} мм
              </span>
              <span className="w-1/3 text-center bg-black/50 rounded px-1">
                {tripleSashWidthMm} мм
              </span>
              <span className="w-1/3 text-center bg-black/50 rounded px-1">
                {tripleSashWidthMm} мм
              </span>
            </div>
          )}
        </div>

        {/* ── ЦЕНТРАЛЬНА СЦЕНА ВІКНА ── */}
        <div className="relative w-full flex-1 flex items-center justify-center my-2">
          {/* Ліва розмірна лінія (Висота) */}
          <div
            className="absolute left-1 flex flex-col items-center justify-between text-[10px] font-mono font-bold text-[#38BDF8] z-10 pointer-events-none"
            style={{ height: `${dimensions.boxHeight}px` }}
          >
            <div className="w-2 h-2 border-l border-t border-[#38BDF8]" />
            <div className="flex-1 border-l border-dashed border-[#38BDF8]/60 flex items-center justify-center">
              <span className="bg-black/80 px-1 py-0.5 rounded text-[10px] text-sky-300 -rotate-90 whitespace-nowrap">
                {height} мм
              </span>
            </div>
            <div className="w-2 h-2 border-l border-b border-[#38BDF8]" />
          </div>

          {/* ═══════════════════════════════════════════════════
              1. БАЛКОННИЙ БЛОК (Двері в підлогу + Вікно над стіною)
              ═══════════════════════════════════════════════════ */}
          {windowType === 'balcony_block' && (
            <div
              className={`relative flex items-end transition-all duration-300 ${
                balconyDoorSide === 'left' ? 'flex-row' : 'flex-row-reverse'
              }`}
              style={{
                width: `${dimensions.boxWidth}px`,
                height: `${dimensions.boxHeight}px`,
              }}
            >
              {/* ── БАЛКОННІ ДВЕРІ (НЕРОЗРИВНА КОРОБКА + ПОВНОРОЗМІРНА СТУЛКА) ── */}
              <div
                className="w-[42%] h-full flex flex-col rounded-t-sm shadow-2xl relative z-10 cursor-pointer group p-1"
                onClick={toggleSashState}
                style={{
                  backgroundColor: '#0c1626', // фальц коробки зсередини затінений
                  border: `7px solid ${currentFrame.border}`,
                  boxShadow: '0 12px 30px -4px rgba(0,0,0,0.6)',
                }}
              >
                {/* 45° євростик кутів рами */}
                <div className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-white/40 pointer-events-none" />
                <div className="absolute top-0 right-0 w-2 h-2 border-r-2 border-t-2 border-white/40 pointer-events-none" />

                {/* Петлі та ножиці відкидання */}
                {renderHinges(balconyDoorSide === 'right' ? 'right' : 'left')}
                {renderScissorStay(balconyDoorSide === 'right' ? 'right' : 'left')}

                {/* ── ЄДИНА ЦІЛІСНА ДВЕРНА СТУЛКА (РУХАЄТЬСЯ В 3D ЦІЛКОМ: СКЛО + ІМПОСТ + РУЧКА + СЕНДВІЧ) ── */}
                <div
                  className="flex-1 w-full flex flex-col relative transition-all duration-500 rounded-xs overflow-visible"
                  style={{
                    ...get3DOpeningStyle(balconyDoorSide === 'right' ? 'right' : 'left'),
                    backgroundColor: currentFrame.bg,
                    border: `5px solid ${currentFrame.border}`,
                    boxShadow:
                      sashState === 'open'
                        ? balconyDoorSide === 'right'
                          ? '14px 14px 30px -4px rgba(0,0,0,0.75)'
                          : '-14px 14px 30px -4px rgba(0,0,0,0.75)'
                        : '0 2px 6px rgba(0,0,0,0.3)',
                  }}
                >
                  {/* Скляна частина дверей */}
                  <div
                    className={`flex-[6] m-0.5 rounded-xs relative flex items-center justify-center overflow-hidden border ${
                      viewMode === 'thermal'
                        ? 'bg-gradient-to-b from-blue-700 via-cyan-500 to-blue-800 border-cyan-400'
                        : glassConfig.tintClass
                    } border-sky-400/40 bg-sky-950/30`}
                  >
                    {/* Штапик (beading) 45-градусна фаска */}
                    <div className="absolute inset-0 border border-black/20 pointer-events-none" />

                    {/* Відблиск скла */}
                    {viewMode === 'studio' && (
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none" />
                    )}

                    {/* Москітна сітка */}
                    {mosquitoNet && (
                      <div
                        className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:3px_3px] opacity-50 pointer-events-none border border-slate-600"
                        title="Москітна сітка Anwis"
                      />
                    )}

                    {/* Векторні лінії DIN-стандарту */}
                    {sashState === 'closed' ? (
                      <svg
                        className="w-full h-full text-[#38BDF8]/60 stroke-current"
                        viewBox="0 0 100 100"
                        fill="none"
                      >
                        <path d="M 0,0 L 50,100 L 100,0" strokeWidth="1.8" strokeDasharray="4 3" />
                        <path
                          d={
                            balconyDoorSide === 'right'
                              ? 'M 100,0 L 0,50 L 100,100'
                              : 'M 0,0 L 100,50 L 0,100'
                          }
                          strokeWidth="1.8"
                          strokeDasharray="4 3"
                        />
                      </svg>
                    ) : sashState === 'open' ? (
                      <div className="absolute inset-0 bg-sky-600/30 backdrop-blur-xs flex flex-col items-center justify-center p-2 text-center">
                        <span className="text-[10px] font-black text-white bg-black/80 px-2 py-0.5 rounded shadow">
                          Двері відчинені (3D)
                        </span>
                        <span className="text-[8px] text-sky-200 mt-1 font-mono">
                          Подвійний EPDM
                        </span>
                      </div>
                    ) : (
                      <div className="absolute top-1 text-center">
                        <span className="text-[9px] font-bold text-white bg-[#0284C7] px-2 py-0.5 rounded shadow">
                          Провітрювання 100мм
                        </span>
                      </div>
                    )}

                    <span className="absolute top-1 left-1 text-[8px] font-mono font-bold text-white/90 bg-black/70 px-1 py-0.2 rounded">
                      {glassConfig.label}
                    </span>

                    {viewMode === 'thermal' && (
                      <span className="absolute bottom-1 right-1 text-[8px] font-mono font-black text-cyan-200 bg-black/70 px-1 rounded">
                        {glassConfig.temp}
                      </span>
                    )}
                  </div>

                  {/* Горизонтальний поперечний імпост стулки дверей */}
                  <div
                    className="h-2 w-full self-stretch shadow-inner"
                    style={{ backgroundColor: currentFrame.border }}
                  />

                  {/* Ручка дверей (розташована на стулці на рівні імпоста і рухається разом з нею) */}
                  {renderHandle(balconyDoorSide === 'right' ? 'left' : 'right', true)}

                  {/* Дитячий замок безпеки */}
                  {childLock && (
                    <div
                      className={`absolute ${
                        balconyDoorSide === 'right' ? 'left-2' : 'right-2'
                      } top-[60%] z-30 w-3 h-3 rounded-full bg-amber-400 border border-amber-600 shadow-md flex items-center justify-center text-[7px] font-black text-black`}
                      title="Дитячий замок безпеки"
                    >
                      L
                    </div>
                  )}

                  {/* Нижня частина дверей: Сендвіч або Скло (рухається РАЗОМ зі всією стулкою) */}
                  {balconyBottomType === 'sandwich' ? (
                    <div
                      className="flex-[4] m-0.5 rounded-xs border border-black/30 relative flex flex-col items-center justify-center shadow-inner"
                      style={{
                        backgroundColor:
                          currentFrame.bg === '#FFFFFF' ? '#F1F5F9' : currentFrame.bg,
                      }}
                    >
                      <div className="absolute inset-1 border border-black/10 rounded-xs" />
                      <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider text-center px-1">
                        Сендвіч 24мм
                      </span>
                      <span className="text-[7px] text-slate-400 mt-0.5">утеплена плита</span>
                    </div>
                  ) : (
                    <div
                      className={`flex-[4] m-0.5 rounded-xs border border-sky-400/40 relative flex items-center justify-center overflow-hidden ${glassConfig.tintClass} bg-sky-950/30`}
                    >
                      {viewMode === 'studio' && (
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                      )}
                      <span className="text-[8px] font-bold text-sky-200">
                        Скло {glassConfig.thickness}
                      </span>
                    </div>
                  )}
                </div>

                {/* Теплий алюмінієвий поріг на рамі знизу */}
                <div
                  className="h-2 w-full bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 rounded-b-xs border-t border-black/40 mt-auto"
                  title="Теплий алюмінієвий поріг 20 мм"
                />
              </div>

              {/* Вертикальний зʼєднувач H-профіль */}
              <div className="w-1.5 h-full self-stretch bg-slate-800 border-x border-white/20" />

              {/* ── ВІКОННА ЧАСТИНА (висота ~65% над стіною) ── */}
              <div className="w-[58%] h-full flex flex-col justify-end">
                {/* Віконна коробка */}
                <div
                  className="w-full rounded-t-sm shadow-xl flex flex-col transition-colors duration-300"
                  style={{
                    height: '65%',
                    backgroundColor: currentFrame.bg,
                    border: `7px solid ${currentFrame.border}`,
                  }}
                >
                  <div
                    className={`flex-1 m-1 rounded-xs border relative flex items-center justify-center overflow-hidden ${
                      viewMode === 'thermal'
                        ? 'bg-gradient-to-b from-blue-700 via-cyan-500 to-blue-800 border-cyan-400'
                        : glassConfig.tintClass
                    } border-sky-400/40 bg-sky-950/30`}
                  >
                    {viewMode === 'studio' && (
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none" />
                    )}

                    {openingType === 'both_tilt_turn' ? (
                      <>
                        <svg
                          className="w-full h-full text-[#38BDF8]/60 stroke-current"
                          viewBox="0 0 100 100"
                          fill="none"
                        >
                          <path d="M 0,0 L 50,100 L 100,0" strokeWidth="1.8" strokeDasharray="4 3" />
                          <path
                            d={
                              balconyDoorSide === 'right'
                                ? 'M 0,0 L 100,50 L 0,100'
                                : 'M 100,0 L 0,50 L 100,100'
                            }
                            strokeWidth="1.8"
                            strokeDasharray="4 3"
                          />
                        </svg>
                        <div
                          className={`absolute top-[46%] z-20 w-1.5 h-5 rounded-xs bg-slate-300 border border-slate-500 ${
                            balconyDoorSide === 'right' ? 'right-1' : 'left-1'
                          }`}
                        />
                        <span className="absolute bottom-1 text-[8px] font-bold text-white bg-black/70 px-1.5 py-0.2 rounded">
                          Відкривне
                        </span>
                      </>
                    ) : (
                      <span className="absolute bottom-1 text-[8px] font-bold text-white bg-black/70 px-1.5 py-0.2 rounded">
                        Глухе (широкий панорамний вид)
                      </span>
                    )}
                  </div>
                </div>

                {/* Підвіконня Danke під вікном */}
                {sill ? (
                  <div
                    className="h-3.5 -mx-2 bg-gradient-to-b from-white via-slate-100 to-slate-200 rounded-sm shadow-md border border-slate-300 relative z-20 flex items-center justify-between px-2"
                    title="Преміум підвіконня Danke з акриловим покриттям Elesgo"
                  >
                    <span className="text-[7px] font-black tracking-wider text-slate-600">
                      Danke
                    </span>
                    <div className="w-10 h-[1px] bg-slate-300" />
                  </div>
                ) : (
                  <div className="h-1 bg-slate-700" />
                )}

                {/* Парапетна стіна під вікном */}
                <div
                  className="w-full flex-1 bg-slate-800/80 border-l border-r border-b border-slate-700 rounded-b-xs flex flex-col items-center justify-center p-2 text-center"
                  style={{ height: '35%' }}
                >
                  <div className="w-full h-full border border-dashed border-slate-600 rounded flex flex-col items-center justify-center p-1">
                    <span className="text-[9px] font-bold text-slate-300">
                      Стіна / Парапет
                    </span>
                    <span className="text-[8px] font-mono text-slate-400">
                      {windowWidthMm} × {parapetHeightMm} мм
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════
              2. ОДНОСТУЛКОВЕ ВІКНО
              ═══════════════════════════════════════════════════ */}
          {windowType === 'single' && (
            <div
              className="relative rounded-sm shadow-2xl flex transition-all duration-300 cursor-pointer group"
              onClick={toggleSashState}
              style={{
                width: `${dimensions.boxWidth}px`,
                height: `${dimensions.boxHeight}px`,
                backgroundColor: currentFrame.bg,
                border: `8px solid ${currentFrame.border}`,
              }}
            >
              {renderDrainageCaps()}
              {openingType !== 'fixed' && renderHinges('left')}
              {openingType !== 'fixed' && renderScissorStay('left')}

              {/* Стулка / скло */}
              <div
                className={`flex-1 m-1 rounded-xs relative flex items-center justify-center overflow-hidden transition-all duration-500 border ${
                  viewMode === 'thermal'
                    ? 'bg-gradient-to-b from-blue-700 via-cyan-500 to-blue-800 border-cyan-400'
                    : glassConfig.tintClass
                } border-sky-400/40 bg-sky-950/30`}
                style={openingType !== 'fixed' ? get3DOpeningStyle('left') : {}}
              >
                {viewMode === 'studio' && (
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none" />
                )}

                {mosquitoNet && openingType !== 'fixed' && (
                  <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:3px_3px] opacity-50 pointer-events-none border border-slate-600" />
                )}

                {openingType !== 'fixed' && (
                  <>
                    {sashState === 'closed' ? (
                      <svg
                        className="w-full h-full text-[#38BDF8]/60 stroke-current"
                        viewBox="0 0 100 100"
                        fill="none"
                      >
                        <path d="M 0,0 L 50,100 L 100,0" strokeWidth="2" strokeDasharray="4 3" />
                        <path d="M 0,0 L 100,50 L 0,100" strokeWidth="2" strokeDasharray="4 3" />
                      </svg>
                    ) : sashState === 'open' ? (
                      <div className="absolute inset-0 bg-sky-600/30 flex flex-col items-center justify-center">
                        <span className="text-xs font-black text-white bg-black/80 px-2.5 py-1 rounded shadow">
                          Стулка відчинена (3D)
                        </span>
                        <span className="text-[8px] text-sky-200 mt-1 font-mono">
                          EPDM ущільнення
                        </span>
                      </div>
                    ) : (
                      <div className="absolute top-2">
                        <span className="text-[10px] font-bold text-white bg-[#0284C7] px-2 py-0.5 rounded shadow">
                          Провітрювання
                        </span>
                      </div>
                    )}

                    {renderHandle('right')}
                  </>
                )}

                <span className="absolute bottom-2 text-[9px] font-bold text-white bg-black/70 px-2 py-0.5 rounded">
                  {openingType === 'fixed' ? 'Глухе вікно' : 'Поворотно-відкидна стулка'}
                </span>

                {viewMode === 'thermal' && (
                  <span className="absolute top-2 right-2 text-[9px] font-mono font-black text-cyan-200 bg-black/70 px-1.5 py-0.5 rounded">
                    {glassConfig.temp}
                  </span>
                )}
              </div>

              {/* Підвіконня Danke */}
              {sill && (
                <div className="absolute -bottom-3 -left-3 -right-3 h-3.5 bg-gradient-to-b from-white via-slate-100 to-slate-200 rounded-sm shadow-md border border-slate-300 z-20 flex items-center justify-between px-2">
                  <span className="text-[7px] font-bold text-slate-600">Danke</span>
                  <div className="w-12 h-[1px] bg-slate-300" />
                </div>
              )}
            </div>
          )}

          {/* ═══════════════════════════════════════════════════
              3. ДВОСТУЛКОВЕ ВІКНО
              ═══════════════════════════════════════════════════ */}
          {windowType === 'double' && (
            <div
              className="relative rounded-sm shadow-2xl flex transition-all duration-300 cursor-pointer group"
              onClick={toggleSashState}
              style={{
                width: `${dimensions.boxWidth}px`,
                height: `${dimensions.boxHeight}px`,
                backgroundColor: currentFrame.bg,
                border: `8px solid ${currentFrame.border}`,
              }}
            >
              {renderDrainageCaps()}

              {/* Ліва стулка */}
              <div
                className={`flex-1 m-1 rounded-xs relative flex items-center justify-center overflow-hidden ${
                  viewMode === 'thermal'
                    ? 'bg-gradient-to-b from-blue-700 via-cyan-500 to-blue-800 border-cyan-400'
                    : glassConfig.tintClass
                } border border-sky-400/40 bg-sky-950/30`}
              >
                {viewMode === 'studio' && (
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none" />
                )}

                {openingType === 'both_tilt_turn' ? (
                  <>
                    <svg
                      className="w-full h-full text-[#38BDF8]/60 stroke-current"
                      viewBox="0 0 100 100"
                      fill="none"
                    >
                      <path d="M 0,0 L 50,100 L 100,0" strokeWidth="2" strokeDasharray="4 3" />
                      <path d="M 0,0 L 100,50 L 0,100" strokeWidth="2" strokeDasharray="4 3" />
                    </svg>
                    {renderHandle('right')}
                    <span className="absolute bottom-2 text-[9px] font-bold text-white bg-black/70 px-1.5 py-0.5 rounded">
                      Відкривна
                    </span>
                  </>
                ) : (
                  <span className="absolute bottom-2 text-[9px] font-bold text-white bg-black/70 px-1.5 py-0.5 rounded">
                    Глуха частина
                  </span>
                )}
              </div>

              {/* Вертикальний імпост */}
              <div
                className="w-2.5 h-full self-stretch shadow-inner"
                style={{ backgroundColor: currentFrame.border }}
              />

              {/* Права стулка (активна) з 3D обертанням */}
              <div
                className={`flex-1 m-1 rounded-xs relative flex items-center justify-center overflow-hidden transition-all duration-500 border ${
                  viewMode === 'thermal'
                    ? 'bg-gradient-to-b from-blue-700 via-cyan-500 to-blue-800 border-cyan-400'
                    : glassConfig.tintClass
                } border-sky-400/40 bg-sky-950/30`}
                style={openingType !== 'fixed' ? get3DOpeningStyle('right') : {}}
              >
                {renderHinges('right')}
                {renderScissorStay('right')}

                {viewMode === 'studio' && (
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none" />
                )}

                {mosquitoNet && openingType !== 'fixed' && (
                  <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:3px_3px] opacity-50 pointer-events-none border border-slate-600" />
                )}

                {openingType !== 'fixed' && (
                  <>
                    {sashState === 'closed' ? (
                      <svg
                        className="w-full h-full text-[#38BDF8]/60 stroke-current"
                        viewBox="0 0 100 100"
                        fill="none"
                      >
                        <path d="M 0,0 L 50,100 L 100,0" strokeWidth="2" strokeDasharray="4 3" />
                        <path d="M 100,0 L 0,50 L 100,100" strokeWidth="2" strokeDasharray="4 3" />
                      </svg>
                    ) : sashState === 'open' ? (
                      <div className="absolute inset-0 bg-sky-600/30 flex flex-col items-center justify-center text-center">
                        <span className="text-[10px] font-black text-white bg-black/80 px-2 py-0.5 rounded">
                          Відчинено (3D)
                        </span>
                      </div>
                    ) : (
                      <div className="absolute top-1.5">
                        <span className="text-[8px] font-bold text-white bg-[#0284C7] px-2 py-0.5 rounded">
                          Провітрювання
                        </span>
                      </div>
                    )}

                    {renderHandle('left')}
                  </>
                )}

                <span className="absolute bottom-2 text-[9px] font-bold text-white bg-black/70 px-1.5 py-0.5 rounded">
                  {openingType === 'fixed' ? 'Глуха' : 'Поворотно-відкидна'}
                </span>
              </div>

              {/* Підвіконня Danke */}
              {sill && (
                <div className="absolute -bottom-3 -left-3 -right-3 h-3.5 bg-gradient-to-b from-white via-slate-100 to-slate-200 rounded-sm shadow-md border border-slate-300 z-20 flex items-center justify-between px-2">
                  <span className="text-[7px] font-bold text-slate-600">Danke</span>
                  <div className="w-16 h-[1px] bg-slate-300" />
                </div>
              )}
            </div>
          )}

          {/* ═══════════════════════════════════════════════════
              4. ТРИСТУЛКОВЕ ВІКНО
              ═══════════════════════════════════════════════════ */}
          {windowType === 'triple' && (
            <div
              className="relative rounded-sm shadow-2xl flex transition-all duration-300 cursor-pointer group"
              onClick={toggleSashState}
              style={{
                width: `${dimensions.boxWidth}px`,
                height: `${dimensions.boxHeight}px`,
                backgroundColor: currentFrame.bg,
                border: `8px solid ${currentFrame.border}`,
              }}
            >
              {renderDrainageCaps()}

              {/* Ліва стулка (глуха) */}
              <div
                className={`flex-1 m-1 rounded-xs relative flex items-center justify-center ${
                  viewMode === 'thermal'
                    ? 'bg-gradient-to-b from-blue-700 via-cyan-500 to-blue-800'
                    : glassConfig.tintClass
                } border border-sky-400/40 bg-sky-950/30`}
              >
                <span className="text-[9px] text-white/80 font-medium">Глухе</span>
              </div>

              <div className="w-2 h-full" style={{ backgroundColor: currentFrame.border }} />

              {/* Центральна стулка (відкривна) */}
              <div
                className={`flex-1 m-1 rounded-xs relative flex items-center justify-center transition-all duration-500 border ${
                  viewMode === 'thermal'
                    ? 'bg-gradient-to-b from-blue-700 via-cyan-500 to-blue-800 border-cyan-400'
                    : glassConfig.tintClass
                } border-sky-400/40 bg-sky-950/30`}
                style={openingType !== 'fixed' ? get3DOpeningStyle('left') : {}}
              >
                {renderHinges('left')}
                {renderScissorStay('left')}

                {mosquitoNet && (
                  <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:3px_3px] opacity-50 pointer-events-none border border-slate-600" />
                )}

                {openingType !== 'fixed' && (
                  <>
                    {sashState === 'closed' ? (
                      <svg
                        className="w-full h-full text-[#38BDF8]/60 stroke-current"
                        viewBox="0 0 100 100"
                        fill="none"
                      >
                        <path d="M 0,0 L 50,100 L 100,0" strokeWidth="1.8" strokeDasharray="3 3" />
                        <path d="M 0,0 L 100,50 L 0,100" strokeWidth="1.8" strokeDasharray="3 3" />
                      </svg>
                    ) : (
                      <div className="absolute top-1">
                        <span className="text-[8px] font-bold text-white bg-[#0284C7] px-1.5 py-0.5 rounded shadow">
                          {sashState === 'open' ? 'Відчинено (3D)' : 'Провітрювання'}
                        </span>
                      </div>
                    )}
                    {renderHandle('right')}
                  </>
                )}

                <span className="text-[9px] text-white font-bold absolute bottom-1 bg-black/70 px-1 py-0.2 rounded">
                  {openingType === 'fixed' ? 'Глухе' : 'Відкривна стулка'}
                </span>
              </div>

              <div className="w-2 h-full" style={{ backgroundColor: currentFrame.border }} />

              {/* Права стулка (глуха) */}
              <div
                className={`flex-1 m-1 rounded-xs relative flex items-center justify-center ${
                  viewMode === 'thermal'
                    ? 'bg-gradient-to-b from-blue-700 via-cyan-500 to-blue-800'
                    : glassConfig.tintClass
                } border border-sky-400/40 bg-sky-950/30`}
              >
                <span className="text-[9px] text-white/80 font-medium">Глухе</span>
              </div>

              {sill && (
                <div className="absolute -bottom-3 -left-3 -right-3 h-3.5 bg-gradient-to-b from-white via-slate-100 to-slate-200 rounded-sm shadow-md border border-slate-300 z-20 flex items-center justify-between px-2">
                  <span className="text-[7px] font-bold text-slate-600">Danke</span>
                  <div className="w-20 h-[1px] bg-slate-300" />
                </div>
              )}
            </div>
          )}

          {/* ═══════════════════════════════════════════════════
              5. ПАНОРАМНЕ СКЛІННЯ БАЛКОНУ (4 СЕКЦІЇ)
              ═══════════════════════════════════════════════════ */}
          {windowType === 'balcony_glazing' && (
            <div
              className="relative rounded-sm shadow-2xl flex transition-all duration-300 cursor-pointer group"
              onClick={toggleSashState}
              style={{
                width: `${dimensions.boxWidth}px`,
                height: `${dimensions.boxHeight}px`,
                backgroundColor: currentFrame.bg,
                border: `7px solid ${currentFrame.border}`,
              }}
            >
              {[1, 2, 3, 4].map((i) => {
                const isOpen = i === 2 || i === 3;
                return (
                  <div key={i} className="flex-1 flex items-stretch">
                    <div
                      className={`flex-1 m-1 rounded-xs relative flex items-center justify-center transition-all duration-300 border ${
                        viewMode === 'thermal'
                          ? 'bg-gradient-to-b from-blue-700 via-cyan-500 to-blue-800 border-cyan-400'
                          : glassConfig.tintClass
                      } ${
                        isOpen && sashState === 'open'
                          ? 'scale-[0.97] shadow-xl border-sky-400'
                          : 'border-sky-400/40 bg-sky-950/30'
                      }`}
                    >
                      {isOpen && (
                        <>
                          <svg
                            className="w-full h-full text-[#38BDF8]/60 stroke-current"
                            viewBox="0 0 100 100"
                            fill="none"
                          >
                            <path
                              d={i === 2 ? 'M 0,0 L 100,50 L 0,100' : 'M 100,0 L 0,50 L 100,100'}
                              strokeWidth="1.5"
                              strokeDasharray="3 3"
                            />
                          </svg>
                          <div
                            className={`absolute top-[46%] w-1.5 h-4 rounded-xs bg-slate-300 border border-slate-500 ${
                              i === 2 ? 'right-1' : 'left-1'
                            }`}
                          />
                        </>
                      )}
                      <span className="text-[8px] text-white font-medium absolute bottom-1 bg-black/60 px-1 py-0.2 rounded">
                        {isOpen ? 'Відкр' : 'Глухе'}
                      </span>
                    </div>
                    {i < 4 && (
                      <div
                        className="w-1.5 h-full"
                        style={{ backgroundColor: currentFrame.border }}
                      />
                    )}
                  </div>
                );
              })}

              {sill && (
                <div className="absolute -bottom-3 -left-3 -right-3 h-3.5 bg-gradient-to-b from-white via-slate-100 to-slate-200 rounded-sm shadow-md border border-slate-300 z-20" />
              )}
            </div>
          )}
        </div>

        {/* ── ТЕПЛОВІЗОР: ТЕРМОДАНІ ТА СЕНСОРИ ── */}
        {viewMode === 'thermal' && (
          <div className="w-full bg-black/80 backdrop-blur-md p-2.5 rounded-xl border border-white/10 mb-2 flex items-center justify-between text-[11px] text-white/95">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>
                Термоопір: <strong className="text-cyan-300">R = {profileConfig.rValue} м²·°C/Вт</strong>
              </span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[10px]">
              <span className="text-slate-400">Поверхня рами:</span>
              <span className="text-emerald-400 font-bold">{profileConfig.temp}</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400">Скло:</span>
              <span className="text-cyan-300 font-bold">{glassConfig.temp}</span>
            </div>
          </div>
        )}

        {/* ── CAD BLUEPRINT: ШТАМП КРЕСЛЕННЯ ── */}
        {viewMode === 'cad' && (
          <div className="w-full bg-black/80 backdrop-blur-md p-2 rounded-xl border border-sky-800/80 mb-2 flex items-center justify-between text-[9px] font-mono text-sky-300">
            <div className="flex items-center gap-2">
              <span className="text-[#FE5B36] font-bold">ДСТУ Б В.2.6-23:2009</span>
              <span className="text-white/30">•</span>
              <span>АРМУВАННЯ 1.5 мм (П-подібне оцинковане)</span>
            </div>
            <span className="text-white/60">ШТАПИК: 45° єврокут</span>
          </div>
        )}

        {/* ── НИЖНЯ ПАНЕЛЬ: СПЕЦИФІКАЦІЯ КОНСТРУКЦІЇ ── */}
        <div className="w-full flex flex-wrap items-center justify-between gap-1.5 text-[9px] sm:text-[10px] font-mono text-white/80 bg-black/60 backdrop-blur-md px-2.5 sm:px-3 py-1.5 rounded-xl sm:rounded-full border border-white/10 z-10">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-[#38BDF8] font-bold">
              {dimensions.areaM2} м²
            </span>
            <span className="text-white/30">•</span>
            <span className="text-slate-300">~{dimensions.approxWeightKg} кг</span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-white/50 uppercase tracking-widest text-[8px] sm:text-[9px]">
              {profileConfig.name}
            </span>
            <span className="text-white/30">•</span>
            <span className="text-[#FE5B36] font-bold truncate max-w-[120px] sm:max-w-none">{hardwareConfig.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
