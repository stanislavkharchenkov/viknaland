'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import type { ProfileSystem } from '@/types/viknaland';

/* ══════════════════════════════════════════════════════════════════
   VIKNALAND — Фотореалістичний 3D-розріз кута металопластикового вікна
   
   1:1 точна відповідність заводському фото еталонного зразка:
   - Рама:
     * Зовнішній наплав з боку вулиці (Z=0, Y=64 мм)
     * Внутрішня полка під стулку (Y=44 мм, Z=D)
     * Багатокамерна структура з порожнистими камерами
     * Оцинкована сталева труба з фірмовим червоним зрізом на торці
   - Стулка:
     * Зовнішнє зміщення (уступ 14 мм відносно рами зовні)
     * Зовнішній скіс 15° до склопакету
     * Внутрішній наплав у бік кімнати (виступає на 8 мм уперед та перекриває раму на 8 мм униз)
     * Оцинкований армуючий профіль з червоним зрізом
   - Штапік (Glazing Bead):
     * Елегантна скруглена форма з боку кімнати
     * Внутрішня порожниста повітряна камера
     * Коекструдований чорний ущільнювач біля скла
     * Кутовий різ під 45°
   - Склопакет:
     * 3 скла (або 2 для B58) з фірмовим діагональним зрізом
     * Темні поліровані кромки зрізу скла
     * Дистанційні рамки з гранулами силікагелю в розрізі торця
     * Яскраво-зелена опорна підкладка (фальцевий вкладиш)
   - Бездоганний стик 45° між горизонтальним і вертикальним профілями
     з реалістичними зварними швами
   ══════════════════════════════════════════════════════════════════ */

// ── Масштаб: 1 мм = 0.042 одиниць сцени Three.js ──
const S = 0.042;

// ── Палітра матеріалів ──
const PAL = {
  pvc:          0xFDFDFE,   // Блискучий білий заводський ПВХ профіль
  pvcCut:       0xEEF2F6,   // Матовий зріз пластику на торці
  pvcLines:     0x8A9BB2,   // Лінії фальців та контурів
  steel:        0x8A96A4,   // Оцинкована сталь
  steelRed:     0xE53935,   // Червоний фірмовий зріз сталі (як на фото)
  steelGlow:    0x00E5FF,   // Електрична підсвітка сталі
  epdm:         0x111317,   // Глибокий чорний матовий каучук EPDM
  glass:        0xD0ECFC,   // Кришталеве флоат-скло
  glassCutEdge: 0x0C131D,   // Темна полірована кромка діагонального зрізу скла
  spacer:       0x333B44,   // Темний анодований алюміній рамки
  desiccant:    0x7A5E44,   // Бурий силікагель у розрізі рамки
  settingPad:   0x16A34A,   // Фірмова яскраво-зелена підкладка під скло
  weldSeam:     0xD0D8E4,   // Фабричний зварний шов 45°
};

interface ProfileSpec {
  name: string;
  shortName: string;
  depth: number;       // Глибина профілю в мм (58, 70, 85)
  frameH: number;      // Висота рами в мм
  sashH: number;       // Висота стулки в мм
  chambers: number;    // Кількість камер (4, 5, 7)
  steelW: number;      // Ширина сталі
  steelH: number;      // Висота сталі
  steelThk: number;    // Товщина сталі
  panes: number;       // Кількість стекол (2 або 3)
  glassFormula: string;// Формула (4-16-4i / 4-10-4-10-4i / 4sol-14-4-14-4i)
  glassTotal: number;  // Товщина склопакету в мм
  paneThk: number;     // Товщина одного скла в мм
  gapWidths: number[]; // Ширина дистанційних рамок
  seals: number;       // Контури ущільнення
  rValue: string;
  noise: string;
  target: string;
}

const SPECS: Record<ProfileSystem, ProfileSpec> = {
  b58: {
    name: 'VIKNALAND B58',
    shortName: 'B58',
    depth: 58,
    frameH: 64,
    sashH: 74,
    chambers: 4,
    steelW: 24,
    steelH: 30,
    steelThk: 1.2,
    panes: 2,
    glassFormula: '4-16-4i',
    glassTotal: 24,
    paneThk: 4,
    gapWidths: [16],
    seals: 2,
    rValue: '0.77 м²·°C/Вт',
    noise: '32 дБ',
    target: 'Балкони, лоджії, дачі, теплі перегородки',
  },
  b70: {
    name: 'VIKNALAND B70',
    shortName: 'B70',
    depth: 70,
    frameH: 66,
    sashH: 78,
    chambers: 5,
    steelW: 28,
    steelH: 34,
    steelThk: 1.5,
    panes: 3,
    glassFormula: '4-10-4-10-4i',
    glassTotal: 32,
    paneThk: 4,
    gapWidths: [10, 10],
    seals: 2,
    rValue: '0.91 м²·°C/Вт',
    noise: '42 дБ',
    target: 'Квартири, приватні будинки, спальні та дитячі',
  },
  v85: {
    name: 'VIKNALAND 85',
    shortName: '85',
    depth: 85,
    frameH: 70,
    sashH: 82,
    chambers: 7,
    steelW: 34,
    steelH: 38,
    steelThk: 2.0,
    panes: 3,
    glassFormula: '4sol-14-4-14-4i',
    glassTotal: 40,
    paneThk: 4,
    gapWidths: [14, 14],
    seals: 3,
    rValue: '1.15 м²·°C/Вт',
    noise: '46 дБ',
    target: 'Котеджі високої енергоефективності, пасивні будинки',
  },
};

/* ══════════════════════════════════════════════════════════════════
   ІНТЕРАКТИВНІ КОМПОНЕНТИ ВІКНА (3D АНАТОМІЯ)
   ══════════════════════════════════════════════════════════════════ */
export interface ProfileComponentInfo {
  id: string;
  name: string;
  shortTag: string;
  category: string;
  categoryColor: string;
  summary: string;
  purpose: string;
  impacts: string[];
  specs: { label: string; value: string }[];
}

export const PROFILE_COMPONENTS: Record<string, ProfileComponentInfo> = {
  steel: {
    id: 'steel',
    name: 'Сталеве армування (підсилювач 1.5–2.0 мм)',
    shortTag: 'Сталевий підсилювач',
    category: 'Міцність та стабільність',
    categoryColor: 'bg-red-500/15 text-red-700 border-red-300 dark:text-red-400 dark:border-red-500/30',
    summary: 'Внутрішній сталевий хребет вікна з гарячеоцинкованої антикорозійної сталі',
    purpose: 'Встановлюється всередину центральних камер рами та стулки. Пластик (ПВХ) має високий коефіцієнт лінійного розширення від сонця та морозу, тому саме сталевий каркас бере на себе всі механічні зусилля.',
    impacts: [
      'Запобігає провисанню важких стулок і перекосу у віконному отворі',
      'Витримує вітрові навантаження до 1200 Па без деформацій',
      'Унеможливлює зимові протяги, які виникають при вигинанні слабкого пластику',
      'Служить надійною точкою фіксації замків та петель протизламної фурнітури',
    ],
    specs: [
      { label: 'Товщина стінки', value: '1.5 мм (ДСТУ) / 2.0 мм (посилена)' },
      { label: 'Захист від іржі', value: 'Цинкове покриття I класу 180 г/м²' },
      { label: 'Конфігурація', value: 'Замкнений квадрат (рама) / П-швелер (стулка)' },
    ],
  },
  glass: {
    id: 'glass',
    name: 'Енергозберігаючий склопакет (i-Glass)',
    shortTag: 'Склопакет з i-склом',
    category: 'Енергозбереження',
    categoryColor: 'bg-sky-500/15 text-sky-700 border-sky-300 dark:text-sky-400 dark:border-sky-500/30',
    summary: 'Багатошаровий блок із полірованого флоат-скла та іонного срібного напилення',
    purpose: 'Скло займає понад 80% площі вікна. Спеціальне іонно-вакуумне напилення атомів срібла працює як прозоре теплодзеркало — відбиває кімнатне тепло назад у приміщення взимку та відсікає надлишкову сонячну спеку влітку.',
    impacts: [
      'Знижує витрати на опалення та кондиціонування до 55%',
      'Поглинає до 42–46 дБ вуличного шуму, забезпечуючи тишу в спальнях',
      'Усуває конденсат завдяки теплій поверхні внутрішнього скла',
      'Пропускає до 88% природного денного світла без затемнення кімнати',
    ],
    specs: [
      { label: 'Товщина склопакету', value: '32 мм (B70) / 40 мм (V85)' },
      { label: 'Енергонапилення', value: 'Низькоемисійне срібне (Low-E i-Glass)' },
      { label: 'Заповнення камер', value: 'Інертний газ Аргон (Ar 90%)' },
    ],
  },
  'pvc-profile': {
    id: 'pvc-profile',
    name: 'Багатокамерний ПВХ-профіль VIKNALAND',
    shortTag: 'ПВХ-профіль рами та стулки',
    category: 'Теплоізоляція',
    categoryColor: 'bg-blue-500/15 text-blue-700 border-blue-300 dark:text-blue-400 dark:border-blue-500/30',
    summary: 'Фірмовий український профіль класу А з товщиною зовнішньої стінки 3 мм',
    purpose: 'Створює теплу та міцну несучу коробку вікна. Складається з 5 або 7 ізольованих повітряних камер: нерухоме повітря всередині є природним теплоізолятором із мінімальною теплопровідністю.',
    impacts: [
      'Високий опір тепловтратам: коефіцієнт R до 1.15 м²·°C/Вт',
      'Екологічна чистота: безсвинцева рецептура Greenline на кальцій-цинку',
      'Стійкість до ультрафіолету: білизна та глянцева поверхня на десятиліття',
      'Абсолютна вологостійкість: не гниє і не потребує фарбування',
    ],
    specs: [
      { label: 'Монтажна ширина', value: '58 мм / 70 мм / 85 мм' },
      { label: 'Кількість камер', value: '4, 5 або 7 термоізоляційних камер' },
      { label: 'Клас профілю', value: 'Клас А (зовнішня стінка 3.0 мм)' },
    ],
  },
  seals: {
    id: 'seals',
    name: 'Двоконтурні ущільнювачі притвору EPDM',
    shortTag: 'Ущільнювачі EPDM',
    category: 'Герметичність',
    categoryColor: 'bg-emerald-500/15 text-emerald-700 border-emerald-300 dark:text-emerald-400 dark:border-emerald-500/30',
    summary: 'Пружний етилен-пропіленовий синтетичний каучук довговічного притвору',
    purpose: 'Перекривають щілину між рухомою стулкою та нерухомою рамою по всьому периметру, а також герметизують посадку склопакета з обох боків.',
    impacts: [
      'Забезпечують найвищий 4-й клас повітронепроникності (без протягів)',
      'Надійно захищають від проникнення зливової води, вуличного пилу та кіптяви',
      'Зберігають еластичність від -50°C до +80°C без засихання та тріщин',
      'Гасять звукові хвилі, додатково підвищуючи шумоізоляцію вікна',
    ],
    specs: [
      { label: 'Матеріал', value: 'Високоякісний первинний каучук EPDM' },
      { label: 'Форма', value: 'Трубчаста пелюсткова з повітряною порожниною' },
      { label: 'Термін служби', value: 'Понад 15–20 років без втрати пружності' },
    ],
  },
  bead: {
    id: 'bead',
    name: 'Фігурний штапік із коекструдованим контуром',
    shortTag: 'Штапік скла',
    category: 'Надійність',
    categoryColor: 'bg-indigo-500/15 text-indigo-700 border-indigo-300 dark:text-indigo-400 dark:border-indigo-500/30',
    summary: 'Спеціальна планка з надійним замком для легкого сервісу склопакета',
    purpose: 'Надійно притискає склопакет до стулки зсередини приміщення. Завдяки запатентованій системі защіпання гарантує цілісність конструкції.',
    impacts: [
      'Дозволяє швидко замінити склопакет у разі пошкодження без демонтажу вікна',
      'Спаяний ущільнювач коекструдується разом із пластиком — ніколи не випадає',
      'Естетичний закруглений дизайн гармонійно вписується в сучасний інтерʼєр',
      'Внутрішня камера штапіка захищає край скла від переохолодження',
    ],
    specs: [
      { label: 'Фіксація', value: 'Пружний замок-защіпка по всій довжині' },
      { label: 'Дизайн', value: 'Закруглений європейський радіус R=2.5 мм' },
    ],
  },
  pad: {
    id: 'pad',
    name: 'Фальцевий вкладиш (опорна підкладка під скло)',
    shortTag: 'Опорна підкладка',
    category: 'Міцність',
    categoryColor: 'bg-amber-500/15 text-amber-700 border-amber-300 dark:text-amber-400 dark:border-amber-500/30',
    summary: 'Яскраво-зелена підкладка з первинного поліпропілену для розподілу ваги',
    purpose: 'Вкладається у фальц стулки під нижній торець склопакета. Передає вагу важкого склопакета (до 50 кг) безпосередньо на сталеве армування та петлі.',
    impacts: [
      'Унеможливлює точкове розтріскування скла від прямого тиску на пластик',
      'Зберігає бездоганну прямокутність стулки роками (діагональне розклинювання)',
      'Забезпечує вентиляцію фальця та вільне стікання конденсату через дренаж',
      'Не деформується і не гниє при тривалому контакті з вологою',
    ],
    specs: [
      { label: 'Матеріал', value: 'Термостійкий первинний поліпропілен PP' },
      { label: 'Конструкція', value: 'Вентиляційні пази для циркуляції повітря' },
    ],
  },
  spacer: {
    id: 'spacer',
    name: 'Дистанційна рамка з гранулами силікагелю',
    shortTag: 'Тепла рамка + силікагель',
    category: 'Герметичність',
    categoryColor: 'bg-teal-500/15 text-teal-700 border-teal-300 dark:text-teal-400 dark:border-teal-500/30',
    summary: 'Внутрішня рамка склопакета з молекулярним ситом-вологопоглиначем',
    purpose: 'Задає точну дистанцію між листами скла (10–16 мм). Всередині заповнена сухими гранулами силікагелю, які миттєво вбирають залишкову вологу.',
    impacts: [
      'Повністю унеможливлює внутрішнє запотівання склопакета на 20+ років',
      'Тепла дистанційна рамка зменшує промерзання по контуру скла на 80%',
      'Подвійний шар герметиків (первинний бутил + вторинний полісульфід) тримає газ',
      'Стійка до термічних розширень під час літнього нагріву сонцем',
    ],
    specs: [
      { label: 'Наповнювач', value: 'Молекулярне сито (синтетичний силікагель)' },
      { label: 'Герметизація', value: 'Двокомпонентний бутил + полісульфід/тіокол' },
    ],
  },
};

export const COMPONENT_KEYS = ['steel', 'glass', 'pvc-profile', 'seals', 'bead', 'pad', 'spacer'];

/* ──────────────────────────────────────────────────────────────────
   Геометрія з'єднання 45°:
   - Горизонтальний профіль: від X=0 до площини X + Y = L_corner
   - Вертикальний профіль: від площини X + Y = L_corner вгору до Y=L_top
   ────────────────────────────────────────────────────────────────── */
const L_corner = 205 * S;
const L_top = 280 * S;
const L_glass = L_corner - 98 * S;

// Реверс обходу трикутників для правильних зовнішніх нормалей
function flipTriangleWinding(geo: THREE.BufferGeometry) {
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i += 3) {
    const x1 = pos.getX(i + 1), y1 = pos.getY(i + 1), z1 = pos.getZ(i + 1);
    const x2 = pos.getX(i + 2), y2 = pos.getY(i + 2), z2 = pos.getZ(i + 2);
    pos.setXYZ(i + 1, x2, y2, z2);
    pos.setXYZ(i + 2, x1, y1, z1);
  }
}

function createHorizontalMiter(shape: THREE.Shape): THREE.BufferGeometry {
  const geo = new THREE.ExtrudeGeometry(shape, { depth: 1, bevelEnabled: false, steps: 1 });
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const shapeZ = pos.getX(i);
    const shapeY = pos.getY(i);
    const isEnd = pos.getZ(i) > 0.5;
    const x = isEnd ? (L_corner - shapeY) : 0;
    pos.setXYZ(i, x, shapeY, shapeZ);
  }
  flipTriangleWinding(geo);
  geo.computeVertexNormals();
  return geo;
}

function createVerticalMiter(shape: THREE.Shape): THREE.BufferGeometry {
  const geo = new THREE.ExtrudeGeometry(shape, { depth: 1, bevelEnabled: false, steps: 1 });
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const shapeZ = pos.getX(i);
    const shapeY = pos.getY(i);
    const isEnd = pos.getZ(i) > 0.5;
    const x = L_corner - shapeY;
    const y = isEnd ? L_top : shapeY;
    pos.setXYZ(i, x, y, shapeZ);
  }
  flipTriangleWinding(geo);
  geo.computeVertexNormals();
  return geo;
}

/* Допоміжне додавання округленого отвору для камер */
function addRectHole(
  shape: THREE.Shape,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  if (w <= 0.6 * S || h <= 0.6 * S) return;
  const rad = Math.min(r, w * 0.22, h * 0.22);
  const hole = new THREE.Path();
  hole.moveTo(x + rad, y);
  hole.lineTo(x + w - rad, y);
  hole.quadraticCurveTo(x + w, y, x + w, y + rad);
  hole.lineTo(x + w, y + h - rad);
  hole.quadraticCurveTo(x + w, y + h, x + w - rad, y + h);
  hole.lineTo(x + rad, y + h);
  hole.quadraticCurveTo(x, y + h, x, y + h - rad);
  hole.lineTo(x, y + rad);
  hole.quadraticCurveTo(x, y, x + rad, y);
  shape.holes.push(hole);
}

/* ──────────────────────────────────────────────────────────────────
   1. КОНТУР РАМИ (в площині Z, Y):
   - Z: 0 (вулиця) → D (кімната)
   - Зовні (Z=0..3): наплав рами висотою 64 мм з пазом під ущільнювач
   - Полиця під стулку: Y=44 мм, Z=20..46 мм
   - Внутрішня грань (Z=D): висота 44 мм
   ────────────────────────────────────────────────────────────────── */
function buildFrameShape(spec: ProfileSpec): THREE.Shape {
  const D = spec.depth * S;
  const shape = new THREE.Shape();

  // Низ рами з монтажними пазами
  shape.moveTo(0, 0);
  shape.lineTo(11 * S, 0);
  shape.lineTo(11 * S, 2.5 * S);
  shape.lineTo(16 * S, 2.5 * S);
  shape.lineTo(16 * S, 0);
  shape.lineTo(D - 13 * S, 0);
  shape.lineTo(D - 13 * S, 2.5 * S);
  shape.lineTo(D - 8 * S, 2.5 * S);
  shape.lineTo(D - 8 * S, 0);
  shape.lineTo(D, 0);

  // Внутрішня стінка рами (кімната)
  shape.lineTo(D, 44 * S);

  // Внутрішня полиця рами під притвор стулки (Y=44)
  shape.lineTo(46 * S, 44 * S);
  shape.lineTo(46 * S, 42 * S);
  shape.lineTo(20 * S, 42 * S);
  shape.lineTo(20 * S, 44 * S);

  // Прямий горизонтальний фальц рами до зовнішнього наплаву (без скосів під кутом)
  shape.lineTo(16 * S, 44 * S);

  // Прямий вертикальний уступ наплаву рами (90°) з маленьким заводським скругленням R=2.5 мм
  shape.lineTo(16 * S, 61.5 * S);
  shape.quadraticCurveTo(16 * S, 64 * S, 13.5 * S, 64 * S);

  // Пряма верхня грань наплаву рами
  shape.lineTo(2.5 * S, 64 * S);

  // Маленьке витончене скруглення зовнішнього кута з боку вулиці (R=2.5 мм)
  shape.quadraticCurveTo(0, 64 * S, 0, 61.5 * S);

  // Пряма зовнішня фасадна стінка рами (вулиця)
  shape.lineTo(0, 0);
  shape.closePath();

  // Повітряні камери рами (строго за заводським каталогом VIKNALAND B70):
  // Камера 1 (зовнішня верхня під наплавом)
  addRectHole(shape, 3 * S, 24 * S, 10.5 * S, 36 * S, 0.8 * S);
  // Камера 2 (зовнішня нижня)
  addRectHole(shape, 3 * S, 4 * S, 12 * S, 17 * S, 0.8 * S);
  // Камера 3 (центральна основна камера під сталеву трубу)
  addRectHole(shape, 20 * S, 4 * S, 24 * S, 34 * S, 1.0 * S);
  // Камера 4 (внутрішня нижня)
  addRectHole(shape, 47 * S, 4 * S, (D - 50 * S), 17 * S, 0.8 * S);
  // Камера 5 (внутрішня верхня під наплавом стулки)
  if (spec.chambers >= 5) {
    addRectHole(shape, 47 * S, 24 * S, (D - 50 * S), 17 * S, 0.8 * S);
  }

  return shape;
}

/* ──────────────────────────────────────────────────────────────────
   2. КОНТУР СТУЛКИ (в площині Z, Y):
   - Зовні (вулиця): прямий контур з маленькими скругленнями R≈2.5мм
   - Зовнішня губка скла: пряма вертикальна стінка з витонченим скругленням
   - Полиця склопакету: Y=95 мм, Z=18.8..(20 + glassTotal)
   - Полиця штапіка: Y=95 мм, Z=(20 + glassTotal)..(D + 8)
   - Внутрішній наплав (кімната): Z=(D + 8 мм), перекриває раму до Y=36 мм
   ────────────────────────────────────────────────────────────────── */
function buildSashShape(spec: ProfileSpec): THREE.Shape {
  const D = spec.depth * S;
  const glassEnd = (20 + spec.glassTotal) * S;
  const roomZ = (spec.depth + 8) * S;

  const shape = new THREE.Shape();
  // Посадка стулки над рамою з технологічним зазором притвору
  shape.moveTo(20 * S, 56 * S);
  shape.lineTo(20 * S, 48 * S);
  shape.lineTo(46 * S, 48 * S);

  // Внутрішній наплав стулки (перекриває раму на 8 мм униз до Y=36 мм)
  shape.lineTo(46 * S, 36 * S);
  shape.lineTo(roomZ, 36 * S);

  // Лицьова поверхня стулки з боку кімнати
  shape.lineTo(roomZ, 98 * S);

  // Фальц під штапік (сходинка 3 мм для надійної фіксації ніжки штапіка)
  shape.lineTo(glassEnd + 3.0 * S, 98 * S);
  shape.lineTo(glassEnd + 3.0 * S, 95 * S);

  // Фальц скління (горизонтальна полиця склопакету)
  shape.lineTo(18.8 * S, 95 * S);

  // Зовнішня губка стулки під скло (пряма стінка з маленьким витонченим скругленням R=2мм)
  shape.lineTo(18.8 * S, 101.5 * S);
  shape.quadraticCurveTo(18.8 * S, 103.5 * S, 17.0 * S, 103.5 * S);

  // Пряма верхня грань зовнішньої губки стулки
  shape.lineTo(15.5 * S, 103.5 * S);

  // Маленьке скруглення на переході до зовнішньої стінки з боку вулиці
  shape.quadraticCurveTo(13.8 * S, 103.5 * S, 13.8 * S, 101.5 * S);

  // Пряма зовнішня фасадна стінка стулки (вулиця)
  shape.lineTo(13.8 * S, 58.5 * S);

  // Маленьке скруглення зовнішнього нижнього кута наплаву стулки (R=2мм)
  shape.quadraticCurveTo(13.8 * S, 56 * S, 15.8 * S, 56 * S);

  // Пряма нижня грань наплаву стулки, що перекриває ущільнювач рами
  shape.lineTo(20 * S, 56 * S);
  shape.closePath();

  // Повітряні камери стулки:
  // Камера 1 (зовнішня нижня)
  addRectHole(shape, 16 * S, 60 * S, 5 * S, 30 * S, 0.5 * S);
  // Камера 2 (зовнішня верхня під склом)
  addRectHole(shape, 15.5 * S, 94 * S, 2.0 * S, 6 * S, 0.3 * S);
  // Камера 3 (центральна основна камера під сталевий підсилювач)
  addRectHole(shape, 24 * S, 52 * S, 20 * S, 38 * S, 1.0 * S);
  // Камера 4 (внутрішня нижня в наплаві)
  addRectHole(shape, 48 * S, 40 * S, (roomZ - 51 * S), 24 * S, 0.8 * S);
  // Камера 5 (внутрішня верхня під штапіком)
  addRectHole(shape, 48 * S, 68 * S, (roomZ - 51 * S), 24 * S, 0.8 * S);

  return shape;
}

/* ──────────────────────────────────────────────────────────────────
   3. КОНТУР ШТАПІКА (GLAZING BEAD):
   - Прямий контур з маленьким скругленням до скла як на заводському фото 2
   - Точно зістикований з чорним ущільнювачем на Z = bStart
   - Порожниста термоізоляційна камера
   ────────────────────────────────────────────────────────────────── */
function buildGlazingBeadShape(spec: ProfileSpec): THREE.Shape {
  const bStart = (20 + spec.glassTotal + 1.8) * S; // стик з коекструдованим ущільнювачем
  const bEnd = (spec.depth + 8) * S;               // примикання до кімнатної стінки стулки

  const shape = new THREE.Shape();
  // Посадка на полицю стулки
  shape.moveTo(bStart, 95 * S);
  shape.lineTo(bEnd, 95 * S);
  shape.lineTo(bEnd, 98 * S);

  // Лицьова поверхня: пряма з маленьким витонченим скругленням R=2.5мм біля скла
  const beadW = bEnd - bStart;
  shape.lineTo(bEnd, 104 * S);
  shape.quadraticCurveTo(bEnd - 2 * S, 105.5 * S, bEnd - 4 * S, 105.5 * S);
  shape.lineTo(bStart + 3.0 * S, 105.5 * S);
  shape.quadraticCurveTo(bStart, 105.5 * S, bStart, 102.5 * S);

  // Вертикальна грань стику з чорним ущільнювачем
  shape.lineTo(bStart, 95 * S);
  shape.closePath();

  // Внутрішня порожниста повітряна камера штапіка
  if (beadW > 8 * S) {
    addRectHole(shape, bStart + 2.5 * S, 97 * S, beadW - 5.0 * S, 6.5 * S, 0.8 * S);
  }

  return shape;
}

/* ──────────────────────────────────────────────────────────────────
   3.1. ЧОРНИЙ КОЕКСТРУДОВАНИЙ УЩІЛЬНЮВАЧ ШТАПІКА (BEAD EPDM GASKET):
   - Акуратний прямий притиск до скла з витонченим скругленням
   ────────────────────────────────────────────────────────────────── */
function buildBeadGasketShape(spec: ProfileSpec): THREE.Shape {
  const gGlassZ = (20 + spec.glassTotal) * S;      // площина скла
  const gBeadZ = (20 + spec.glassTotal + 1.8) * S; // площина штапіка

  const shape = new THREE.Shape();
  shape.moveTo(gGlassZ, 95 * S);
  shape.lineTo(gGlassZ, 102.5 * S);
  shape.quadraticCurveTo(gGlassZ + 0.4 * S, 103.2 * S, gBeadZ, 102.5 * S);
  shape.lineTo(gBeadZ, 95 * S);
  shape.closePath();
  return shape;
}

/* ──────────────────────────────────────────────────────────────────
   3.2. ЗОВНІШНІЙ ЧОРНИЙ УЩІЛЬНЮВАЧ СТУЛКИ (SASH OUTER EPDM GASKET):
   - Тонкий фірмовий коекструдований ущільнювач (товщина 1.2 мм)
   - Прямий притиск до скла з маленьким скругленням, без грубих скосів
   ────────────────────────────────────────────────────────────────── */
function buildSashOuterGasketShape(): THREE.Shape {
  const gGlassZ = 20 * S;
  const gSashZ = 18.8 * S;

  const shape = new THREE.Shape();
  shape.moveTo(gGlassZ, 95 * S);
  shape.lineTo(gGlassZ, 102.5 * S);
  shape.quadraticCurveTo(gGlassZ - 0.3 * S, 103.0 * S, gSashZ, 102.5 * S);
  shape.lineTo(gSashZ, 95 * S);
  shape.closePath();
  return shape;
}

/* ──────────────────────────────────────────────────────────────────
   3.3. ПРИТВОРНІ УЩІЛЬНЮВАЧІ РАМИ ТА СТУЛКИ:
   - Формовані D-подібні EPDM ущільнювачі в пазах притвору
   ────────────────────────────────────────────────────────────────── */
function buildFrameRebateSealShape(): THREE.Shape {
  const shape = new THREE.Shape();
  // Акуратний ущільнювач на вертикальній стінці наплаву рами (Z=16 мм)
  shape.moveTo(16 * S, 56.5 * S);
  shape.lineTo(16 * S, 61.5 * S);
  shape.quadraticCurveTo(14.2 * S, 61.5 * S, 14.2 * S, 59.0 * S);
  shape.quadraticCurveTo(14.2 * S, 56.5 * S, 16 * S, 56.5 * S);
  shape.closePath();
  return shape;
}

function buildSashOverlapSealShape(): THREE.Shape {
  const shape = new THREE.Shape();
  shape.moveTo(44.2 * S, 39.5 * S);
  shape.lineTo(46.8 * S, 39.5 * S);
  shape.quadraticCurveTo(47.2 * S, 42.5 * S, 45.5 * S, 42.5 * S);
  shape.quadraticCurveTo(43.8 * S, 42.5 * S, 44.2 * S, 39.5 * S);
  shape.closePath();
  return shape;
}

/* ──────────────────────────────────────────────────────────────────
   Головний конструктор 3D-моделі
   ────────────────────────────────────────────────────────────────── */
function buildWindowCornerModel(
  spec: ProfileSpec,
  highlightSteel: boolean,
  viewMode: 'normal' | 'xray'
): THREE.Group {
  const root = new THREE.Group();
  const D = spec.depth * S;
  const roomZ = (spec.depth + 8) * S;

  const isXray = viewMode === 'xray';

  // ── 1. Матеріали ──
  const pvcMat = new THREE.MeshStandardMaterial({
    color: PAL.pvc,
    roughness: 0.18,
    metalness: 0.02,
    transparent: isXray || highlightSteel,
    opacity: isXray ? 0.14 : (highlightSteel ? 0.70 : 1.0),
    side: THREE.FrontSide,
    polygonOffset: true,
    polygonOffsetFactor: 1.0,
    polygonOffsetUnits: 1.0,
  });

  const pvcCutMat = new THREE.MeshStandardMaterial({
    color: PAL.pvcCut,
    roughness: 0.42,
    metalness: 0.01,
    transparent: isXray,
    opacity: isXray ? 0.20 : 1.0,
    side: THREE.DoubleSide,
  });

  const steelMat = new THREE.MeshStandardMaterial({
    color: highlightSteel ? PAL.steelGlow : PAL.steel,
    emissive: highlightSteel ? PAL.steelGlow : 0x000000,
    emissiveIntensity: highlightSteel ? 0.90 : 0.0,
    metalness: 0.92,
    roughness: 0.22,
  });

  const steelRedMat = new THREE.MeshBasicMaterial({ color: PAL.steelRed });
  const steelHollowMat = new THREE.MeshBasicMaterial({ color: 0x141820 });

  const epdmMat = new THREE.MeshStandardMaterial({
    color: PAL.epdm,
    roughness: 0.94,
    metalness: 0.02,
    side: THREE.DoubleSide,
  });

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: PAL.glass,
    transparent: true,
    opacity: 0.36,
    roughness: 0.04,
    metalness: 0.02,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
    ior: 1.52,
    side: THREE.FrontSide,
    depthWrite: true,
  });

  const glassCutEdgeMat = new THREE.MeshBasicMaterial({
    color: PAL.glassCutEdge,
  });

  const spacerMat = new THREE.MeshStandardMaterial({
    color: PAL.spacer,
    metalness: 0.85,
    roughness: 0.26,
  });

  const desiccantMat = new THREE.MeshStandardMaterial({
    color: PAL.desiccant,
    roughness: 0.94,
    metalness: 0.04,
  });

  const settingBlockMat = new THREE.MeshStandardMaterial({
    color: PAL.settingPad,
    roughness: 0.38,
    metalness: 0.08,
  });

  const weldSeamMat = new THREE.MeshBasicMaterial({ color: PAL.weldSeam });

  // ── 2. Рама (горизонтальна + вертикальна зі стиком 45°) ──
  const frameShape = buildFrameShape(spec);
  const frameHGeo = createHorizontalMiter(frameShape);
  const frameHMesh = new THREE.Mesh(frameHGeo, [pvcCutMat, pvcMat]);
  frameHMesh.castShadow = true;
  frameHMesh.receiveShadow = true;
  frameHMesh.userData = { componentId: 'pvc-profile' };
  root.add(frameHMesh);

  const frameVGeo = createVerticalMiter(frameShape);
  const frameVMesh = new THREE.Mesh(frameVGeo, [pvcCutMat, pvcMat]);
  frameVMesh.castShadow = true;
  frameVMesh.receiveShadow = true;
  frameVMesh.userData = { componentId: 'pvc-profile' };
  root.add(frameVMesh);

  // ── 3. Стулка зі зміщенням 14 мм (горизонтальна + вертикальна зі стиком 45°) ──
  const sashShape = buildSashShape(spec);
  const sashHGeo = createHorizontalMiter(sashShape);
  const sashHMesh = new THREE.Mesh(sashHGeo, [pvcCutMat, pvcMat]);
  sashHMesh.castShadow = true;
  sashHMesh.receiveShadow = true;
  sashHMesh.userData = { componentId: 'pvc-profile' };
  root.add(sashHMesh);

  const sashVGeo = createVerticalMiter(sashShape);
  const sashVMesh = new THREE.Mesh(sashVGeo, [pvcCutMat, pvcMat]);
  sashVMesh.castShadow = true;
  sashVMesh.receiveShadow = true;
  sashVMesh.userData = { componentId: 'pvc-profile' };
  root.add(sashVMesh);

  // ── 4. Штапік із витонченим скругленням (горизонтальний + вертикальний під 45°) ──
  const beadShape = buildGlazingBeadShape(spec);
  const beadHGeo = createHorizontalMiter(beadShape);
  const beadHMesh = new THREE.Mesh(beadHGeo, [pvcCutMat, pvcMat]);
  beadHMesh.castShadow = true;
  beadHMesh.userData = { componentId: 'bead' };
  root.add(beadHMesh);

  const beadVGeo = createVerticalMiter(beadShape);
  const beadVMesh = new THREE.Mesh(beadVGeo, [pvcCutMat, pvcMat]);
  beadVMesh.castShadow = true;
  beadVMesh.userData = { componentId: 'bead' };
  root.add(beadVMesh);

  // ── 4.1. ЧОРНИЙ КОЕКСТРУДОВАНИЙ УЩІЛЬНЮВАЧ ШТАПІКА (BEAD EPDM GASKET) ──
  // Справжній заводський гумовий ущільнювач біля скла з чистим кутовим стиком 45°
  const beadGasketShape = buildBeadGasketShape(spec);
  const beadGasketHGeo = createHorizontalMiter(beadGasketShape);
  const beadGasketHMesh = new THREE.Mesh(beadGasketHGeo, epdmMat);
  beadGasketHMesh.castShadow = true;
  beadGasketHMesh.userData = { componentId: 'seals' };
  root.add(beadGasketHMesh);

  const beadGasketVGeo = createVerticalMiter(beadGasketShape);
  const beadGasketVMesh = new THREE.Mesh(beadGasketVGeo, epdmMat);
  beadGasketVMesh.castShadow = true;
  beadGasketVMesh.userData = { componentId: 'seals' };
  root.add(beadGasketVMesh);

  // ── 4.2. ЗОВНІШНІЙ ЧОРНИЙ УЩІЛЬНЮВАЧ СТУЛКИ (SASH OUTER EPDM GASKET) ──
  // Притискає склопакет зовні, утворюючи бездоганний стик 45°
  const sashGasketShape = buildSashOuterGasketShape();
  const sashGasketHGeo = createHorizontalMiter(sashGasketShape);
  const sashGasketHMesh = new THREE.Mesh(sashGasketHGeo, epdmMat);
  sashGasketHMesh.castShadow = true;
  sashGasketHMesh.userData = { componentId: 'seals' };
  root.add(sashGasketHMesh);

  const sashGasketVGeo = createVerticalMiter(sashGasketShape);
  const sashGasketVMesh = new THREE.Mesh(sashGasketVGeo, epdmMat);
  sashGasketVMesh.castShadow = true;
  sashGasketVMesh.userData = { componentId: 'seals' };
  root.add(sashGasketVMesh);

  // ── 4.3. ПРИТВОРНІ УЩІЛЬНЮВАЧІ РАМИ ТА СТУЛКИ ЗІ СТИКОМ 45° ──
  const frameSealShape = buildFrameRebateSealShape();
  const frameSealH = new THREE.Mesh(createHorizontalMiter(frameSealShape), epdmMat);
  const frameSealV = new THREE.Mesh(createVerticalMiter(frameSealShape), epdmMat);
  frameSealH.userData = { componentId: 'seals' };
  frameSealV.userData = { componentId: 'seals' };
  root.add(frameSealH);
  root.add(frameSealV);

  const sashSealShape = buildSashOverlapSealShape();
  const sashSealH = new THREE.Mesh(createHorizontalMiter(sashSealShape), epdmMat);
  const sashSealV = new THREE.Mesh(createVerticalMiter(sashSealShape), epdmMat);
  sashSealH.userData = { componentId: 'seals' };
  sashSealV.userData = { componentId: 'seals' };
  root.add(sashSealH);
  root.add(sashSealV);

  // ── 5. Сталеве армування з фірмовим червоним зрізом (без нашарувань та Z-fighting) ──
  const stThk = 1.5 * S;

  // 5.1 Армування рами (справжня порожниста оцинкована труба з червоним торцем)
  const stFrameW = 21 * S;
  const stFrameH = 29 * S;
  const stFrameZ = 21.5 * S;
  const stFrameY = 6.5 * S;
  const stFrameLenH = L_corner - 44 * S;

  const tubeShape = new THREE.Shape();
  tubeShape.moveTo(0, 0);
  tubeShape.lineTo(stFrameW, 0);
  tubeShape.lineTo(stFrameW, stFrameH);
  tubeShape.lineTo(0, stFrameH);
  tubeShape.closePath();

  const tubeHole = new THREE.Path();
  tubeHole.moveTo(stThk, stThk);
  tubeHole.lineTo(stFrameW - stThk, stThk);
  tubeHole.lineTo(stFrameW - stThk, stFrameH - stThk);
  tubeHole.lineTo(stThk, stFrameH - stThk);
  tubeHole.closePath();
  tubeShape.holes.push(tubeHole);

  // Горизонтальна труба рами
  const stFrameHGeo = new THREE.ExtrudeGeometry(tubeShape, { depth: stFrameLenH, bevelEnabled: false });
  const posFH = stFrameHGeo.attributes.position;
  for (let i = 0; i < posFH.count; i++) {
    const sZ = posFH.getX(i);
    const sY = posFH.getY(i);
    const x = posFH.getZ(i);
    posFH.setXYZ(i, x, sY, sZ);
  }
  flipTriangleWinding(stFrameHGeo);
  stFrameHGeo.computeVertexNormals();

  const stFrameHMesh = new THREE.Mesh(stFrameHGeo, [steelRedMat, steelMat]);
  stFrameHMesh.position.set(0.05 * S, stFrameY, stFrameZ);
  stFrameHMesh.userData = { componentId: 'steel' };
  root.add(stFrameHMesh);

  // Вертикальна труба рами
  const stFrameLenV = L_top - 48 * S;
  const tubeShapeV = new THREE.Shape();
  tubeShapeV.moveTo(0, 0);
  tubeShapeV.lineTo(stFrameH, 0);
  tubeShapeV.lineTo(stFrameH, stFrameW);
  tubeShapeV.lineTo(0, stFrameW);
  tubeShapeV.closePath();

  const tubeHoleV = new THREE.Path();
  tubeHoleV.moveTo(stThk, stThk);
  tubeHoleV.lineTo(stFrameH - stThk, stThk);
  tubeHoleV.lineTo(stFrameH - stThk, stFrameW - stThk);
  tubeHoleV.lineTo(stThk, stFrameW - stThk);
  tubeHoleV.closePath();
  tubeShapeV.holes.push(tubeHoleV);

  const stFrameVGeo = new THREE.ExtrudeGeometry(tubeShapeV, { depth: stFrameLenV, bevelEnabled: false });
  const posFV = stFrameVGeo.attributes.position;
  for (let i = 0; i < posFV.count; i++) {
    const sX = posFV.getX(i);
    const sZ = posFV.getY(i);
    const y = posFV.getZ(i);
    posFV.setXYZ(i, sX, y, sZ);
  }
  flipTriangleWinding(stFrameVGeo);
  stFrameVGeo.computeVertexNormals();

  const stFrameVMesh = new THREE.Mesh(stFrameVGeo, [steelRedMat, steelMat]);
  stFrameVMesh.position.set(L_corner - stFrameY - stFrameH, 44 * S, stFrameZ);
  stFrameVMesh.userData = { componentId: 'steel' };
  root.add(stFrameVMesh);

  // 5.2 Армування стулки (справжній порожнистий П-подібний оцинкований швелер з червоним торцем)
  const stSashW = 18 * S;
  const stSashH = 34 * S;
  const stSashZ = 25 * S;
  const stSashY = 54 * S;
  const stSashLenH = L_corner - 98 * S;

  const uShape = new THREE.Shape();
  uShape.moveTo(0, 0);
  uShape.lineTo(stSashW, 0);
  uShape.lineTo(stSashW, stSashH);
  uShape.lineTo(stSashW - stThk, stSashH);
  uShape.lineTo(stSashW - stThk, stThk);
  uShape.lineTo(stThk, stThk);
  uShape.lineTo(stThk, stSashH);
  uShape.lineTo(0, stSashH);
  uShape.closePath();

  const stSashHGeo = new THREE.ExtrudeGeometry(uShape, { depth: stSashLenH, bevelEnabled: false });
  const posSH = stSashHGeo.attributes.position;
  for (let i = 0; i < posSH.count; i++) {
    const sZ = posSH.getX(i);
    const sY = posSH.getY(i);
    const x = posSH.getZ(i);
    posSH.setXYZ(i, x, sY, sZ);
  }
  flipTriangleWinding(stSashHGeo);
  stSashHGeo.computeVertexNormals();

  const stSashHMesh = new THREE.Mesh(stSashHGeo, [steelRedMat, steelMat]);
  stSashHMesh.position.set(0.05 * S, stSashY, stSashZ);
  stSashHMesh.userData = { componentId: 'steel' };
  root.add(stSashHMesh);

  // Вертикальний швелер стулки
  const stSashLenV = L_top - 102 * S;
  const uShapeV = new THREE.Shape();
  uShapeV.moveTo(0, 0);
  uShapeV.lineTo(stSashH, 0);
  uShapeV.lineTo(stSashH, stSashW);
  uShapeV.lineTo(stSashH - stThk, stSashW);
  uShapeV.lineTo(stSashH - stThk, stThk);
  uShapeV.lineTo(stThk, stThk);
  uShapeV.lineTo(stThk, stSashW);
  uShapeV.lineTo(0, stSashW);
  uShapeV.closePath();

  const stSashVGeo = new THREE.ExtrudeGeometry(uShapeV, { depth: stSashLenV, bevelEnabled: false });
  const posSV = stSashVGeo.attributes.position;
  for (let i = 0; i < posSV.count; i++) {
    const sX = posSV.getX(i);
    const sZ = posSV.getY(i);
    const y = posSV.getZ(i);
    posSV.setXYZ(i, sX, y, sZ);
  }
  flipTriangleWinding(stSashVGeo);
  stSashVGeo.computeVertexNormals();

  const stSashVMesh = new THREE.Mesh(stSashVGeo, [steelRedMat, steelMat]);
  stSashVMesh.position.set(L_corner - stSashY - stSashH, 98 * S, stSashZ);
  stSashVMesh.userData = { componentId: 'steel' };
  root.add(stSashVMesh);

  // ── 6. Яскраво-зелена опорна підкладка під склопакет (фальцевий вкладиш) ──
  // Розміщена з технологічним зазором 0.2 мм, щоб уникнути Z-fighting з фальцем та склом
  const padGeo = new THREE.BoxGeometry(
    L_glass * 0.70,
    3.1 * S,
    (spec.glassTotal - 0.6) * S
  );
  const padMesh = new THREE.Mesh(padGeo, settingBlockMat);
  padMesh.position.set(
    0.3 * S + (L_glass * 0.70) / 2,
    95.2 * S + 1.55 * S,
    20 * S + (spec.glassTotal * S) / 2
  );
  padMesh.renderOrder = 2;
  padMesh.castShadow = true;
  padMesh.receiveShadow = true;
  padMesh.userData = { componentId: 'pad' };
  root.add(padMesh);

  // ── 7. Склопакет зі ступінчастим діагональним зрізом (як на фото 2) ──
  const glassBaseY = 98.5 * S;
  const paneThkS = spec.paneThk * S;

  let curZ = 20 * S; // починаємо від зовнішнього скла і йдемо в кімнату
  for (let p = 0; p < spec.panes; p++) {
    // Ступінчастий зріз: зовнішнє скло нижче, кожне наступне вище на 11 мм
    const pCutY0 = (128 + p * 11) * S;
    const pTopY = (215 + p * 11) * S;

    const paneShape = new THREE.Shape();
    paneShape.moveTo(0, glassBaseY);
    paneShape.lineTo(L_glass, glassBaseY);
    paneShape.lineTo(L_glass, pTopY);
    paneShape.lineTo(0, pCutY0);
    paneShape.closePath();

    const paneGeo = new THREE.ExtrudeGeometry(paneShape, { depth: paneThkS, bevelEnabled: false });
    const paneMesh = new THREE.Mesh(paneGeo, glassMat);
    paneMesh.position.set(0, 0, curZ);
    paneMesh.renderOrder = 10 + p;
    paneMesh.castShadow = false;
    paneMesh.receiveShadow = false;
    paneMesh.userData = { componentId: 'glass' };
    root.add(paneMesh);

    // Темна полірована кромка на діагональному зрізі кожного скла
    const pDx = L_glass;
    const pDy = pTopY - pCutY0;
    const pLen = Math.hypot(pDx, pDy);
    const pAngle = Math.atan2(pDy, pDx);

    const edgeGeo = new THREE.BoxGeometry(pLen, 1.4 * S, paneThkS * 0.98);
    edgeGeo.rotateZ(pAngle);
    const edgeMesh = new THREE.Mesh(edgeGeo, glassCutEdgeMat);
    edgeMesh.position.set(
      L_glass / 2,
      (pCutY0 + pTopY) / 2,
      curZ + paneThkS / 2
    );
    edgeMesh.renderOrder = 15 + p;
    edgeMesh.userData = { componentId: 'glass' };
    root.add(edgeMesh);

    // Дистанційна рамка між стеклами (без перетину з гранулами силікагелю)
    if (p < spec.panes - 1) {
      const gapW = spec.gapWidths[p] * S;
      const spZ = curZ + paneThkS;
      const desLen = 1.8 * S;

      // Гранули силікагелю у розрізі рамки строго на X in [0, desLen]
      const spH = 6.5 * S;
      const desGeo = new THREE.BoxGeometry(desLen, spH * 0.76, gapW * 0.78);
      const desMesh = new THREE.Mesh(desGeo, desiccantMat);
      desMesh.position.set(desLen / 2, glassBaseY + spH / 2, spZ + gapW / 2);
      desMesh.renderOrder = 3;
      desMesh.userData = { componentId: 'spacer' };
      root.add(desMesh);

      // Нижня дистанційна рамка (починається за шаром силікагелю)
      const spBottomGeo = new THREE.BoxGeometry(L_glass - desLen, spH, gapW);
      const spBottomMesh = new THREE.Mesh(spBottomGeo, spacerMat);
      spBottomMesh.position.set(desLen + (L_glass - desLen) / 2, glassBaseY + spH / 2, spZ + gapW / 2);
      spBottomMesh.renderOrder = 3;
      spBottomMesh.userData = { componentId: 'spacer' };
      root.add(spBottomMesh);

      // Вертикальна дистанційна рамка праворуч
      const vertSpH = pTopY - glassBaseY - spH;
      const spVertGeo = new THREE.BoxGeometry(6.5 * S, vertSpH, gapW);
      const spVertMesh = new THREE.Mesh(spVertGeo, spacerMat);
      spVertMesh.position.set(
        L_glass - 3.25 * S,
        glassBaseY + spH + vertSpH / 2,
        spZ + gapW / 2
      );
      spVertMesh.renderOrder = 3;
      spVertMesh.userData = { componentId: 'spacer' };
      root.add(spVertMesh);

      curZ += (paneThkS + gapW);
    } else {
      curZ += paneThkS;
    }
  }

  // ── 8. Інтерактивні 3D-маркери деталей (Hotspots) ──
  const addHotspotPin = (
    id: string,
    x: number,
    y: number,
    z: number,
    colorHex: number
  ) => {
    const pinGroup = new THREE.Group();
    pinGroup.position.set(x, y, z);
    pinGroup.userData = { componentId: id, isHotspot: true };

    const coreGeo = new THREE.SphereGeometry(1.6 * S, 12, 12);
    const coreMat = new THREE.MeshBasicMaterial({ color: colorHex });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.userData = { componentId: id };
    pinGroup.add(coreMesh);

    const ringGeo = new THREE.RingGeometry(2.3 * S, 3.2 * S, 24);
    const ringMat = new THREE.MeshBasicMaterial({
      color: colorHex,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.userData = { componentId: id };
    pinGroup.add(ringMesh);

    root.add(pinGroup);
  };

  addHotspotPin('steel', 0.5 * S, 21 * S, 32 * S, 0xEF4444);
  addHotspotPin('pvc-profile', 0.5 * S, 36 * S, 8 * S, 0x3B82F6);
  addHotspotPin('glass', 24 * S, 142 * S, 24 * S, 0x38BDF8);
  addHotspotPin('pad', 30 * S, 98 * S, 35 * S, 0x22C55E);
  addHotspotPin('spacer', 12 * S, 103 * S, 26 * S, 0x14B8A6);
  addHotspotPin('seals', 45 * S, 104 * S, 18.5 * S, 0x10B981);
  addHotspotPin('bead', 45 * S, 104 * S, (20 + spec.glassTotal + 5) * S, 0x6366F1);

  // Заводський безшовний стик 45° (без грубих накладних швів, як на еталонному фото 2)

  // ── Точне математичне центрування моделі в центрі обертання ──
  const box = new THREE.Box3().setFromObject(root);
  const center = new THREE.Vector3();
  box.getCenter(center);
  root.position.sub(center);

  // Додавання тонких фабричних контурних ліній для підкреслення фальців та уступів
  const lineMat = new THREE.LineBasicMaterial({
    color: PAL.pvcLines,
    transparent: true,
    opacity: isXray ? 0.08 : 0.30,
  });
  root.add(new THREE.LineSegments(new THREE.EdgesGeometry(frameHGeo, 24), lineMat));
  root.add(new THREE.LineSegments(new THREE.EdgesGeometry(frameVGeo, 24), lineMat));
  root.add(new THREE.LineSegments(new THREE.EdgesGeometry(sashHGeo, 24), lineMat));
  root.add(new THREE.LineSegments(new THREE.EdgesGeometry(sashVGeo, 24), lineMat));
  root.add(new THREE.LineSegments(new THREE.EdgesGeometry(beadHGeo, 24), lineMat));
  root.add(new THREE.LineSegments(new THREE.EdgesGeometry(beadVGeo, 24), lineMat));

  const gasketLineMat = new THREE.LineBasicMaterial({
    color: 0x05070B,
    transparent: true,
    opacity: 0.40,
  });
  root.add(new THREE.LineSegments(new THREE.EdgesGeometry(beadGasketHGeo, 20), gasketLineMat));
  root.add(new THREE.LineSegments(new THREE.EdgesGeometry(beadGasketVGeo, 20), gasketLineMat));
  root.add(new THREE.LineSegments(new THREE.EdgesGeometry(sashGasketHGeo, 20), gasketLineMat));
  root.add(new THREE.LineSegments(new THREE.EdgesGeometry(sashGasketVGeo, 20), gasketLineMat));

  return root;
}

/* ══════════════════════════════════════════════════════════════════
   ПОРІВНЯЛЬНІ ПАРАМЕТРИ
   ══════════════════════════════════════════════════════════════════ */
const COMPARE_ITEMS = [
  { label: 'Монтажна глибина', unit: 'мм',  vals: { b58: 58, b70: 70, v85: 85 },     max: 90 },
  { label: 'Кількість камер',  unit: 'шт',  vals: { b58: 4,  b70: 5,  v85: 7 },      max: 8 },
  { label: 'Товщина склопакету', unit: 'мм', vals: { b58: 24, b70: 32, v85: 40 },   max: 48 },
  { label: 'Теплоопір (R)',    unit: '',    vals: { b58: 0.77, b70: 0.91, v85: 1.15 }, max: 1.3 },
  { label: 'Шумоізоляція',     unit: 'дБ',  vals: { b58: 32, b70: 42, v85: 46 },     max: 50 },
];

/* ══════════════════════════════════════════════════════════════════
   REACT КОМПОНЕНТ
   ══════════════════════════════════════════════════════════════════ */
interface Props {
  initialSystem?: ProfileSystem;
}

export default function WindowProfile3DViewer({ initialSystem = 'b70' }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeProfile, setActiveProfile] = useState<ProfileSystem>(initialSystem);
  const [highlightSteel, setHighlightSteel] = useState(false);
  const [viewMode, setViewMode] = useState<'normal' | 'xray'>('normal');
  const [interacting, setInteracting] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);

  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const rootRef = useRef<THREE.Group | null>(null);
  const frameRef = useRef(0);
  const autoRotRef = useRef(true);
  const startTime = useRef(Date.now());

  const selectedComponentRef = useRef<string | null>(null);
  const hoveredComponentRef = useRef<string | null>(null);
  const highlightSteelRef = useRef(highlightSteel);
  const viewModeRef = useRef(viewMode);

  useEffect(() => {
    selectedComponentRef.current = selectedComponent;
  }, [selectedComponent]);

  useEffect(() => {
    hoveredComponentRef.current = hoveredComponent;
  }, [hoveredComponent]);

  useEffect(() => {
    highlightSteelRef.current = highlightSteel;
  }, [highlightSteel]);

  useEffect(() => {
    viewModeRef.current = viewMode;
  }, [viewMode]);

  // Функція скидання ракурсу точно до еталонного заводського фото
  const resetCamera = useCallback(() => {
    if (!rootRef.current || !cameraRef.current) return;
    rootRef.current.rotation.set(0.14, 0.48, 0);
    cameraRef.current.position.set(-14, 7, 27);
    cameraRef.current.lookAt(0.3, 0.2, 0);
  }, []);

  // ── 1. Ініціалізація сцени Three.js ──
  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const w = el.clientWidth;
    const h = el.clientHeight || 600;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Перспективна камера: вид спереду-зліва-зверху на зріз камер та лицьову сторону
    const cam = new THREE.PerspectiveCamera(28, w / h, 0.1, 500);
    cam.position.set(-14, 7, 27);
    cam.lookAt(0.3, 0.2, 0);
    cameraRef.current = cam;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    el.innerHTML = '';
    el.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // ── Студійне триточкове освітлення ──
    scene.add(new THREE.AmbientLight(0xFFFFFF, 0.82));

    // Головне світло (Key light) — м'яко виділяє форму камер та лицьову грань
    const keyLight = new THREE.DirectionalLight(0xFFFAF2, 2.2);
    keyLight.position.set(-16, 18, 22);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    // Заповнююче світло (Fill light) — підсвічує стояк
    const fillLight = new THREE.DirectionalLight(0xD8EEFF, 1.1);
    fillLight.position.set(18, 12, 16);
    scene.add(fillLight);

    // Контрове світло (Rim light) — фірмовий блакитний контур VIKNALAND
    const rimLight = new THREE.DirectionalLight(0x46C2FF, 1.4);
    rimLight.position.set(-10, -8, -16);
    scene.add(rimLight);

    scene.add(new THREE.HemisphereLight(0xFFFFFF, 0x0A1B3B, 0.45));

    // Динамічне точкове світло для потужного підсвічування обраного компонента
    const pulseLight = new THREE.PointLight(0x00E5FF, 0, 45);
    pulseLight.position.set(0, 4, 3);
    scene.add(pulseLight);

    // Коренева група з ракурсом еталонного фото
    const rootGrp = new THREE.Group();
    rootGrp.rotation.set(0.14, 0.48, 0);
    scene.add(rootGrp);
    rootRef.current = rootGrp;

    // ── Рейкастер для інтерактивного вибору елементів вікна ──
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const findHitComponentId = (clientX: number, clientY: number): string | null => {
      if (!mountRef.current || !modelRef.current || !cameraRef.current) return null;
      const rect = mountRef.current.getBoundingClientRect();
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, cameraRef.current);
      const hits = raycaster.intersectObjects(modelRef.current.children, true);
      for (const hit of hits) {
        let curr: THREE.Object3D | null = hit.object;
        while (curr && curr !== modelRef.current) {
          if (curr.userData?.componentId) {
            return curr.userData.componentId;
          }
          curr = curr.parent;
        }
      }
      return null;
    };

    // ── Інтерактивне обертання мишкою або пальцем ──
    let dragging = false;
    let prev = { x: 0, y: 0 };
    let vel = { x: 0, y: 0 };
    let downPos = { x: 0, y: 0 };
    let downTime = 0;

    const onDown = (e: PointerEvent) => {
      dragging = true;
      autoRotRef.current = false;
      setInteracting(true);
      prev = { x: e.clientX, y: e.clientY };
      downPos = { x: e.clientX, y: e.clientY };
      downTime = Date.now();
      vel = { x: 0, y: 0 };
      renderer.domElement.setPointerCapture(e.pointerId);
    };

    const onMove = (e: PointerEvent) => {
      if (!dragging) {
        const hitId = findHitComponentId(e.clientX, e.clientY);
        renderer.domElement.style.cursor = hitId ? 'pointer' : 'grab';
        setHoveredComponent(hitId);
        return;
      }
      const dx = e.clientX - prev.x;
      const dy = e.clientY - prev.y;
      rootGrp.rotation.y += dx * 0.005;
      rootGrp.rotation.x = Math.max(-1.1, Math.min(1.1, rootGrp.rotation.x + dy * 0.005));
      vel = { x: dy * 0.002, y: dx * 0.002 };
      prev = { x: e.clientX, y: e.clientY };
    };

    const onUp = (e: PointerEvent) => {
      dragging = false;
      renderer.domElement.releasePointerCapture(e.pointerId);
      const dist = Math.hypot(e.clientX - downPos.x, e.clientY - downPos.y);
      const elapsed = Date.now() - downTime;

      // Якщо рух мишки був менше 6px — це клік на елемент вікна!
      if (dist < 6 && elapsed < 400) {
        const hitId = findHitComponentId(e.clientX, e.clientY);
        if (hitId) {
          setSelectedComponent((prev) => (prev === hitId ? null : hitId));
        }
      }

      setTimeout(() => {
        if (!dragging) {
          autoRotRef.current = true;
          setInteracting(false);
        }
      }, 3500);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const d = cam.position.length();
      cam.position.setLength(Math.max(10, Math.min(36, d * (1 + e.deltaY * 0.0008))));
    };

    const dom = renderer.domElement;
    dom.style.touchAction = 'none';
    dom.addEventListener('pointerdown', onDown);
    dom.addEventListener('pointermove', onMove);
    dom.addEventListener('pointerup', onUp);
    dom.addEventListener('pointercancel', onUp);
    dom.addEventListener('wheel', onWheel, { passive: false });

    // ── Цикл анімації ──
    startTime.current = Date.now();
    const tick = () => {
      frameRef.current = requestAnimationFrame(tick);
      const t = (Date.now() - startTime.current) * 0.001;
      const isXray = viewModeRef.current === 'xray';

      if (autoRotRef.current) {
        // М'яке коливання навколо еталонного ракурсу для збереження фокусу на зрізі
        rootGrp.rotation.y = 0.48 + Math.sin(t * 0.35) * 0.05;
        rootGrp.rotation.x = 0.14 + Math.cos(t * 0.25) * 0.02;
      } else {
        rootGrp.rotation.y += vel.y;
        rootGrp.rotation.x += vel.x;
        vel.x *= 0.94;
        vel.y *= 0.94;
      }

      // ── Динамічне потужне підсвічування обраного або наведеного елемента ──
      const activeId = selectedComponentRef.current || hoveredComponentRef.current;
      if (activeId) {
        let glowColor = 0x00E5FF;
        if (activeId === 'steel') glowColor = 0xFF1744;
        else if (activeId === 'pad') glowColor = 0x00FF66;
        else if (activeId === 'seals') glowColor = 0x00F59B;
        else if (activeId === 'bead') glowColor = 0xD946EF;
        else if (activeId === 'spacer') glowColor = 0xFFB703;
        else if (activeId === 'pvc-profile') glowColor = 0x38BDF8;
        else if (activeId === 'glass') glowColor = 0x00F0FF;

        pulseLight.color.setHex(glowColor);
        pulseLight.intensity = 5.5 + Math.sin(t * 8.0) * 2.0;
      } else {
        pulseLight.intensity = 0;
      }

      if (modelRef.current) {
        modelRef.current.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            const cId = child.userData?.componentId;
            const isTarget = Boolean(activeId && cId === activeId);
            const mats = Array.isArray(child.material) ? child.material : [child.material];

            mats.forEach((m) => {
              if (m && 'emissive' in m && m.emissive) {
                if (activeId) {
                  if (isTarget) {
                    // Яскравий неоновий колір для виділеного елемента (максимальний контраст)
                    let glowColor = 0x00E5FF;
                    if (cId === 'steel') glowColor = 0xFF1744;
                    else if (cId === 'pad') glowColor = 0x00FF66;
                    else if (cId === 'seals') glowColor = 0x00F59B;
                    else if (cId === 'bead') glowColor = 0xD946EF;
                    else if (cId === 'spacer') glowColor = 0xFFB703;
                    else if (cId === 'pvc-profile') glowColor = 0x38BDF8;
                    else if (cId === 'glass') glowColor = 0x00F0FF;

                    m.emissive.setHex(glowColor);
                    m.emissiveIntensity = 2.6 + Math.sin(t * 8.0) * 0.9;
                    m.transparent = false;
                    m.opacity = 1.0;
                  } else {
                    // Сильне приглушення інших елементів (ефект фокусу на вибраній деталі)
                    m.emissive.setHex(cId === 'steel' && highlightSteelRef.current ? PAL.steelGlow : 0x000000);
                    m.emissiveIntensity = cId === 'steel' && highlightSteelRef.current ? 0.8 : 0;
                    m.transparent = true;
                    m.opacity = isXray ? 0.05 : 0.20;
                  }
                } else {
                  // Нормальний стан без виділення
                  m.transparent = isXray || highlightSteelRef.current;
                  m.opacity = isXray ? 0.14 : (highlightSteelRef.current ? 0.70 : 1.0);
                  m.emissive.setHex(cId === 'steel' && highlightSteelRef.current ? PAL.steelGlow : 0x000000);
                  m.emissiveIntensity = cId === 'steel' && highlightSteelRef.current ? 0.9 : 0;
                }
              }
            });
          }
        });
      }

      renderer.render(scene, cam);
    };
    tick();

    const onResize = () => {
      const nw = el.clientWidth;
      const nh = el.clientHeight || 600;
      cam.aspect = nw / nh;
      cam.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', onResize);
      dom.removeEventListener('pointerdown', onDown);
      dom.removeEventListener('pointermove', onMove);
      dom.removeEventListener('pointerup', onUp);
      dom.removeEventListener('pointercancel', onUp);
      dom.removeEventListener('wheel', onWheel);
      renderer.dispose();
      if (el.contains(dom)) el.removeChild(dom);
    };
  }, []);

  // ── 2. Оновлення 3D-моделі при зміні конфігурації ──
  const rebuild = useCallback(() => {
    const rootGrp = rootRef.current;
    if (!rootGrp) return;

    if (modelRef.current) {
      rootGrp.remove(modelRef.current);
      modelRef.current.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
          const mats = Array.isArray(o.material) ? o.material : [o.material];
          mats.forEach((m) => m.dispose());
        }
      });
    }

    const model = buildWindowCornerModel(
      SPECS[activeProfile],
      highlightSteel,
      viewMode
    );
    rootGrp.add(model);
    modelRef.current = model;

    // Плавний ефект переходу
    model.scale.setScalar(0.92);
    const t0 = Date.now();
    const dur = 280;
    const animate = () => {
      const p = Math.min(1, (Date.now() - t0) / dur);
      const ease = 1 - Math.pow(1 - p, 3);
      model.scale.setScalar(0.92 + 0.08 * ease);
      if (p < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [activeProfile, highlightSteel, viewMode]);

  useEffect(() => {
    rebuild();
  }, [rebuild]);

  const spec = SPECS[activeProfile];

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-7 lg:p-8 shadow-xl relative overflow-hidden text-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(#00000006_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      {/* ── Заголовок та перемикач систем ── */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-200">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#0F2B5C] uppercase tracking-wider mb-1">
            <span>(</span><span>3D-розріз кута вікна VIKNALAND</span><span>)</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight text-slate-900">
            Будова металопластикового вікна в розрізі
          </h3>
          <p className="text-[11px] text-slate-500 mt-1 max-w-lg leading-relaxed">
            Повний демонстраційний кут вікна: рама, стулка зі зміщенням, склопакет з діагональним зрізом, камери та армування. Клікніть на будь-яку деталь для огляду.
          </p>
        </div>

        {/* Таби систем */}
        <div className="flex gap-1.5 shrink-0">
          {(['b58', 'b70', 'v85'] as ProfileSystem[]).map((sys) => {
            const isAct = activeProfile === sys;
            const s = SPECS[sys];
            return (
              <button
                key={sys}
                onClick={() => setActiveProfile(sys)}
                className={`px-3.5 py-2 rounded-xl text-[11px] font-bold tracking-wide transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  isAct
                    ? 'bg-[#0F2B5C] text-white shadow-md shadow-[#0F2B5C]/25 scale-[1.03]'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {s.shortName} · {s.chambers}K
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Швидкий вибір компонентів вікна (Interactive Pills) ── */}
      <div className="relative z-10 mt-4 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1 pr-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
          Анатомія вікна:
        </span>
        {COMPONENT_KEYS.map((k) => {
          const c = PROFILE_COMPONENTS[k];
          const isSel = selectedComponent === k;
          return (
            <button
              key={k}
              onClick={() => setSelectedComponent((prev) => (prev === k ? null : k))}
              className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all duration-200 shrink-0 cursor-pointer border whitespace-nowrap ${
                isSel
                  ? 'bg-[#0F2B5C] text-white border-[#0F2B5C] shadow-sm shadow-[#0F2B5C]/30 scale-[1.03]'
                  : 'bg-slate-100 text-slate-700 border-slate-200/90 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {c.shortTag}
            </button>
          );
        })}
        {selectedComponent && (
          <button
            onClick={() => setSelectedComponent(null)}
            className="px-2.5 py-1 rounded-lg text-[10px] font-semibold text-slate-400 hover:text-slate-700 transition-colors shrink-0 cursor-pointer"
          >
            ✕ Скинути
          </button>
        )}
      </div>

      {/* ── Основна сітка ── */}
      <div className="grid lg:grid-cols-12 gap-6 items-start mt-4 relative z-10">
        {/* 3D Canvas — повністю вільний, жодні панелі його не перекривають! */}
        <div className="lg:col-span-6 flex flex-col gap-2">
          <div className="relative">
            <div
              ref={mountRef}
              className="w-full h-[540px] sm:h-[620px] lg:h-[680px] rounded-2xl bg-gradient-to-br from-[#061124] via-[#091D42] to-[#0D2452] border border-slate-700/80 shadow-inner relative overflow-hidden cursor-grab active:cursor-grabbing"
            />

            {/* Кнопки керування */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
              <button
                onClick={() => setHighlightSteel((v) => !v)}
                className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold backdrop-blur-md border transition-all duration-200 cursor-pointer ${
                  highlightSteel
                    ? 'bg-[#0284C7] text-white border-[#0284C7]/60 shadow-md shadow-[#0284C7]/30'
                    : 'bg-black/50 text-white/80 border-white/10 hover:bg-black/70'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/></svg>
                  <span>Сталь {spec.steelThk}мм</span>
                  {highlightSteel && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                </span>
              </button>
              <button
                onClick={() => setViewMode((v) => (v === 'normal' ? 'xray' : 'normal'))}
                className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold backdrop-blur-md border transition-all duration-200 cursor-pointer ${
                  viewMode === 'xray'
                    ? 'bg-[#0284C7] text-white border-[#0284C7]/60 shadow-md shadow-[#0284C7]/30'
                    : 'bg-black/50 text-white/80 border-white/10 hover:bg-black/70'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20M2 12h20"/></svg>
                  <span>Рентген</span>
                </span>
              </button>
              <button
                onClick={resetCamera}
                className="px-2.5 py-1.5 rounded-lg text-[10px] font-bold backdrop-blur-md border bg-black/50 text-white/80 border-white/10 hover:bg-black/70 transition-all duration-200 cursor-pointer"
                title="Повернути заводський ракурс фото"
              >
                <span className="flex items-center gap-1.5">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                  <span>Ракурс фото</span>
                </span>
              </button>
            </div>

            {/* Інформаційні мітки */}
            <div className="absolute top-3 right-3 hidden sm:flex flex-col gap-1 z-10 pointer-events-none">
              <span className="px-2 py-0.5 rounded bg-black/50 backdrop-blur-md border border-white/10 text-[9px] text-[#38BDF8] font-mono">
                Склопакет: {spec.glassFormula}
              </span>
              <span className="px-2 py-0.5 rounded bg-black/50 backdrop-blur-md border border-white/10 text-[9px] text-white/80 font-mono">
                Рама: {spec.depth} мм · {spec.chambers} камер
              </span>
            </div>

            {/* Watermark VIKNALAND 3D */}
            <div className="absolute bottom-3 right-4 z-10 pointer-events-none select-none">
              <span className="text-[11px] font-mono font-bold tracking-widest text-[#38BDF8]/40 uppercase drop-shadow-sm">
                VIKNALAND 3D
              </span>
            </div>

            {/* Нижня підказка на полотні (компактна, без перекриття моделі) */}
            <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
              <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[9px] text-sky-300 font-medium">
                {selectedComponent ? `Виділено: ${PROFILE_COMPONENTS[selectedComponent]?.shortTag}` : 'Клікніть деталь для фокусу'}
              </span>
            </div>
          </div>
        </div>

        {/* Права панель — коли елемент обрано, тут показується повна анатомія деталі! */}
        <div className="lg:col-span-6 flex flex-col gap-3.5">
          {selectedComponent && PROFILE_COMPONENTS[selectedComponent] ? (() => {
            const comp = PROFILE_COMPONENTS[selectedComponent];
            const curIdx = COMPONENT_KEYS.indexOf(selectedComponent);
            const prevKey = COMPONENT_KEYS[(curIdx - 1 + COMPONENT_KEYS.length) % COMPONENT_KEYS.length];
            const nextKey = COMPONENT_KEYS[(curIdx + 1) % COMPONENT_KEYS.length];

            return (
              <div className="bg-slate-900 border border-sky-500/40 rounded-2xl p-5 text-white shadow-xl animate-in fade-in slide-in-from-right-3">
                {/* Заголовок деталі */}
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${comp.categoryColor}`}>
                        {comp.category}
                      </span>
                      <span className="text-[10px] text-sky-400 font-mono">
                        {curIdx + 1} з {COMPONENT_KEYS.length}
                      </span>
                    </div>
                    <h4 className="text-base sm:text-lg font-black text-white leading-tight">
                      {comp.name}
                    </h4>
                    <p className="text-[11px] text-slate-300 mt-1">
                      {comp.summary}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedComponent(null)}
                    className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
                    title="Повернутися до загальної специфікації"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
                  </button>
                </div>

                {/* Блоки: Для чого призначений та На що впливає */}
                <div className="space-y-3 my-3 text-[11px]">
                  {/* Для чого призначений */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3.5">
                    <span className="text-[9px] uppercase tracking-wider text-sky-400 font-bold block mb-1 flex items-center gap-1.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                      Для чого призначений:
                    </span>
                    <p className="text-slate-200 leading-relaxed">
                      {comp.purpose}
                    </p>
                  </div>

                  {/* На що впливає */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3.5">
                    <span className="text-[9px] uppercase tracking-wider text-emerald-400 font-bold block mb-1 flex items-center gap-1.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                      На що впливає в оселі:
                    </span>
                    <ul className="space-y-1.5 text-slate-200">
                      {comp.impacts.map((imp, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 leading-snug">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1" />
                          <span>{imp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Технічні характеристики */}
                <div className="pt-2.5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-0.5 text-[10px]">
                    {comp.specs.map((s, idx) => (
                      <div key={idx} className="text-slate-400">
                        <strong className="text-white font-medium">{s.label}:</strong> {s.value}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto pt-1 sm:pt-0">
                    <button
                      onClick={() => setSelectedComponent(prevKey)}
                      className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[10px] font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>◄</span>
                      <span>Попередній</span>
                    </button>
                    <button
                      onClick={() => setSelectedComponent(nextKey)}
                      className="px-2.5 py-1.5 rounded-lg bg-[#0284C7] hover:bg-[#0369a1] text-white text-[10px] font-semibold transition-colors flex items-center gap-1 cursor-pointer shadow-sm shadow-[#0284C7]/30"
                    >
                      <span>Наступний</span>
                      <span>►</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })() : (
            /* Загальна специфікація коли нічого не виділено */
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2.5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-[#0F2B5C] font-bold">Специфікація зрізу</span>
                  <h4 className="text-base font-black text-slate-900 leading-tight">{spec.name}</h4>
                </div>
                <span className="w-9 h-9 rounded-lg bg-sky-100 flex items-center justify-center text-xs font-mono font-bold text-[#0F2B5C]">
                  {spec.chambers}K
                </span>
              </div>

              <div className="space-y-0 text-[11px]">
                {([
                  ['Монтажна глибина', `${spec.depth} мм`],
                  ['Повітряні камери', `${spec.chambers} камер у профілі`],
                  ['Формула скла', `${spec.glassFormula} (${spec.glassTotal} мм)`],
                  ['Коефіцієнт R-опору', spec.rValue],
                  ['Шумопоглинання', spec.noise],
                  ['Контури ущільнення', `${spec.seals} контури EPDM`],
                  ['Сталеве армування', `${spec.steelThk} мм оцинк. квадрат`],
                ] as [string, string][]).map(([k, v]) => (
                  <div key={k} className="flex justify-between items-center py-1.5 border-b border-slate-200/60 last:border-0">
                    <span className="text-slate-500">{k}</span>
                    <strong className="text-slate-900 font-semibold">{v}</strong>
                  </div>
                ))}
              </div>

              <p className="text-[9px] text-slate-500 leading-relaxed pt-0.5">{spec.target}</p>
            </div>
          )}

          {/* Порівняльні шкали */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <h5 className="text-[9px] uppercase tracking-widest text-[#0F2B5C] font-bold mb-2.5">Порівняння лінійки</h5>
            <div className="space-y-2.5">
              {COMPARE_ITEMS.map((bar) => (
                <div key={bar.label}>
                  <div className="flex items-center justify-between text-[10px] mb-1">
                    <span className="text-slate-500">{bar.label}</span>
                    <span className="text-slate-900 font-bold tabular-nums">
                      {bar.vals[activeProfile]}
                      {bar.unit && ` ${bar.unit}`}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {(['b58', 'b70', 'v85'] as ProfileSystem[]).map((sys) => {
                      const pct = (bar.vals[sys] / bar.max) * 100;
                      const isAct = sys === activeProfile;
                      return (
                        <div key={sys} className="flex-1">
                          <div className="h-1 rounded-full bg-slate-200 overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500 ease-out"
                              style={{
                                width: `${pct}%`,
                                background: isAct
                                  ? 'linear-gradient(90deg, #0F2B5C, #0284C7)'
                                  : 'rgba(15, 23, 42, 0.2)',
                              }}
                            />
                          </div>
                          <span
                            className={`block text-center text-[7px] mt-0.5 font-medium ${
                              isAct ? 'text-[#0F2B5C] font-bold' : 'text-slate-400'
                            }`}
                          >
                            {sys === 'v85' ? '85' : sys.toUpperCase()}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA до калькулятора */}
          <a
            href="#configurator"
            className="w-full py-3.5 bg-[#FE5B36] hover:bg-[#ff6c47] text-white font-bold text-[11px] uppercase tracking-wider rounded-xl transition-all duration-300 shadow-md shadow-[#FE5B36]/20 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Розрахувати {spec.shortName} у калькуляторі</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </div>
  );
}
