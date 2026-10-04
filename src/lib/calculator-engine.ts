import type {
  CalculatorOptions,
  CalculatedPrice,
  WindowType,
  OpeningType,
  ProfileSystem,
  GlassUnit,
  HardwareBrand,
  LaminationColor,
} from '@/types/viknaland';

/*
 * Калібрування за реальною комерційною пропозицією № 25268в (Viknaland 70, Maco, 4sol-14-4-14-4i):
 *  - Вікно 1100×1550, глухе + поворотно-відкидне  → 10 386 грн / шт, монтаж 1 918 грн / шт
 *  - Балконний блок 1850×2226 (двері + глухе)     → 18 561 грн, монтаж 3 797 грн
 *  - Монтаж ≈ 1 125 грн/м², доставка 1 350 грн на замовлення
 */
const PROFILE_RATE: Record<ProfileSystem, number> = { b58: 2950, b70: 3600, v85: 4700 };
const GLASS_ADJ: Record<GlassUnit, number> = { single_chamber: -450, two_chamber_energy: -180, two_chamber_solar: 0 };
const OPENING_COST: Record<HardwareBrand, number> = { axor: 2100, maco: 2600, siegenia: 3150 };
const DOOR_COST: Record<HardwareBrand, number> = { axor: 4100, maco: 4760, siegenia: 5450 };
const LAMINATION_K: Record<LaminationColor, number> = {
  white: 1,
  anthracite: 1.22,
  golden_oak: 1.2,
  dark_oak: 1.2,
  basalt_grey: 1.22,
};

const BASE_PER_CONSTRUCTION = 1200;
const IMPOST = 450;
const MONTAGE_M2 = 1125;
const WARM_MOUNT_M2 = 290;
const DELIVERY = 1350;

export interface SashLayout {
  sashes: number;
  openings: number;
  door: boolean;
}

export function getSashLayout(type: WindowType, opening: OpeningType): SashLayout {
  switch (type) {
    case 'single':
      return { sashes: 1, openings: opening === 'fixed' ? 0 : 1, door: false };
    case 'double':
      return { sashes: 2, openings: opening === 'fixed' ? 0 : opening === 'both_tilt_turn' ? 2 : 1, door: false };
    case 'triple':
      return { sashes: 3, openings: opening === 'fixed' ? 0 : opening === 'both_tilt_turn' ? 2 : 1, door: false };
    case 'balcony_block':
      return { sashes: 2, openings: opening === 'both_tilt_turn' ? 1 : 0, door: true };
    case 'balcony_glazing':
      return { sashes: 4, openings: opening === 'fixed' ? 0 : opening === 'both_tilt_turn' ? 4 : 2, door: false };
  }
}

export function getOpeningOptions(type: WindowType): { id: OpeningType; label: string }[] {
  switch (type) {
    case 'single':
      return [
        { id: 'tilt_turn', label: 'Поворотно-відкидне' },
        { id: 'fixed', label: 'Глухе' },
      ];
    case 'balcony_block':
      return [
        { id: 'turn_and_fixed', label: 'Двері + глухе вікно' },
        { id: 'both_tilt_turn', label: 'Двері + відкривне' },
      ];
    default:
      return [
        { id: 'turn_and_fixed', label: 'Глухе + відкривне' },
        { id: 'both_tilt_turn', label: 'Усі відкривні' },
        { id: 'fixed', label: 'Усі глухі' },
      ];
  }
}

/** Типові розміри для кожного типу конструкції (мм) */
export const DEFAULT_SIZES: Record<WindowType, { width: number; height: number }> = {
  single: { width: 700, height: 1400 },
  double: { width: 1100, height: 1550 },
  triple: { width: 2100, height: 1500 },
  balcony_block: { width: 1850, height: 2226 },
  balcony_glazing: { width: 2800, height: 1500 },
};

export function calculateWindowPrice(o: CalculatorOptions): CalculatedPrice {
  const qty = Math.max(1, Math.round(o.quantity || 1));
  const area = (o.width * o.height) / 1_000_000;
  const layout = getSashLayout(o.windowType, o.openingType);

  const construction =
    (area * (PROFILE_RATE[o.profile] + GLASS_ADJ[o.glass]) +
      layout.openings * OPENING_COST[o.hardware] +
      (layout.door ? DOOR_COST[o.hardware] : 0) +
      BASE_PER_CONSTRUCTION +
      IMPOST * (layout.sashes - 1)) *
    LAMINATION_K[o.lamination];

  const montage = area * (MONTAGE_M2 + (o.warmMount ? WARM_MOUNT_M2 : 0));

  const widthM = o.width / 1000;
  let extras = 0;
  if (o.sill) extras += (widthM + 0.1) * 820;
  if (o.drip) extras += (widthM + 0.05) * 340;
  if (o.mosquitoNet) extras += 650 * layout.openings;
  if (o.childLock) extras += 420 * (layout.openings + (layout.door ? 1 : 0));

  const total = Math.round((construction + montage + extras) * qty + DELIVERY);
  const totalArea = area * qty;

  let savings = totalArea * 850;
  if (o.profile !== 'b58') savings *= 1.4;
  if (o.glass === 'two_chamber_solar') savings *= 1.3;

  return {
    area,
    totalArea,
    construction: Math.round(construction),
    montage: Math.round(montage),
    extras: Math.round(extras),
    delivery: DELIVERY,
    total,
    perM2: Math.round(total / totalArea),
    openings: layout.openings,
    basePrice: total,
    discountedPrice: total,
    installmentMonthly: Math.round(total / 6),
    savingsPerYear: Math.round(savings),
  };
}
