export type WindowType =
  | 'single'          // Одностулкове
  | 'double'          // Двостулкове
  | 'triple'          // Тристулкове
  | 'balcony_block'   // Балконний блок (двері + вікно)
  | 'balcony_glazing'; // Скління балкону / лоджії

export type OpeningType =
  | 'fixed'           // Глухе
  | 'tilt_turn'       // Поворотно-відкидне
  | 'turn_and_fixed'  // Глухе + поворотно-відкидне
  | 'both_tilt_turn'; // Усі стулки відкривні

export type ProfileSystem = 'b58' | 'b70' | 'v85';

export type GlassUnit =
  | 'single_chamber'     // 4-16-4i, 24 мм
  | 'two_chamber_energy' // 4-10-4-10-4i, 32 мм
  | 'two_chamber_solar'; // 4sol-14-4-14-4i, 40 мм

export type HardwareBrand = 'axor' | 'maco' | 'siegenia';

export type LaminationColor = 'white' | 'anthracite' | 'golden_oak' | 'dark_oak' | 'basalt_grey';

export interface CalculatorOptions {
  windowType: WindowType;
  openingType: OpeningType;
  width: number;  // мм
  height: number; // мм
  quantity: number;
  profile: ProfileSystem;
  glass: GlassUnit;
  hardware: HardwareBrand;
  lamination: LaminationColor;
  mosquitoNet: boolean;
  sill: boolean;
  drip: boolean;
  childLock: boolean;
  warmMount: boolean;
  disassembly: boolean;
}

/** Розбивка ціни у форматі комерційної пропозиції заводу */
export interface CalculatedPrice {
  area: number;          // м² однієї конструкції
  totalArea: number;     // м² усіх конструкцій
  construction: number;  // вартість однієї конструкції
  montage: number;       // монтаж однієї конструкції
  extras: number;        // дод. матеріали на одну конструкцію
  delivery: number;      // доставка на замовлення
  total: number;         // разом
  perM2: number;         // разом за 1 м²
  openings: number;      // кількість відкривних стулок
  basePrice: number;
  discountedPrice: number;
  installmentMonthly: number;
  savingsPerYear: number;
}

export interface LeadFormData {
  name: string;
  phone: string;
  city?: string;
  comment?: string;
  preferredContact: 'phone' | 'telegram' | 'viber';
  isEvidnovlennya?: boolean;
  configSummary?: string;
  estimatedPrice?: number;
}
