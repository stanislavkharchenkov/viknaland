import type { WindowType, OpeningType, ProfileSystem, GlassUnit, HardwareBrand, LaminationColor } from '@/types/viknaland';

export const WINDOW_TYPE_LABELS: Record<WindowType, string> = {
  single: 'Одностулкове вікно',
  double: 'Двостулкове вікно',
  triple: 'Тристулкове вікно',
  balcony_block: 'Балконний блок',
  balcony_glazing: 'Скління балкону',
};

export const OPENING_LABELS: Record<OpeningType, string> = {
  fixed: 'Глухе',
  tilt_turn: 'Поворотно-відкидне',
  turn_and_fixed: 'Глухе + відкривне',
  both_tilt_turn: 'Усі відкривні',
};

export const PROFILE_LABELS: Record<ProfileSystem, string> = {
  b58: 'Viknaland B58',
  b70: 'Viknaland B70',
  v85: 'Viknaland 85',
};

export const GLASS_LABELS: Record<GlassUnit, string> = {
  single_chamber: '1-камерний 24 мм',
  two_chamber_energy: '2-камерний енерго 32 мм',
  two_chamber_solar: '2-камерний Solar 40 мм',
};

export const GLASS_FORMULA: Record<GlassUnit, string> = {
  single_chamber: '4-16-4i',
  two_chamber_energy: '4-10-4-10-4i',
  two_chamber_solar: '4sol-14-4-14-4i',
};

export const HARDWARE_LABELS: Record<HardwareBrand, string> = {
  axor: 'Axor Komfort',
  maco: 'Maco Multi-Trend',
  siegenia: 'Siegenia Titan AF',
};

export const LAMINATION_LABELS: Record<LaminationColor, string> = {
  white: 'Білий',
  anthracite: 'Антрацит RAL 7016',
  golden_oak: 'Золотий дуб',
  dark_oak: 'Темний дуб',
  basalt_grey: 'Базальт',
};

export const LAMINATION_COLORS: Record<LaminationColor, { fill: string; stroke: string }> = {
  white: { fill: '#F4F6F8', stroke: '#AEB8C4' },
  anthracite: { fill: '#3B424C', stroke: '#22272E' },
  golden_oak: { fill: '#9C6431', stroke: '#6E4320' },
  dark_oak: { fill: '#543825', stroke: '#3A2416' },
  basalt_grey: { fill: '#56606E', stroke: '#3D4550' },
};

/** 48316.67 → "48 317" з нерозривним пробілом, щоб ціна ніколи не переносилась */
export function fmt(n: number): string {
  return Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0');
}
