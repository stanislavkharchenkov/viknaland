# VIKNALAND — Архітектура Strapi 5 та керівництво по наповненню

> **Призначення:** Headless CMS Strapi 5 для керування сайтом-візиткою та онлайн-калькулятором металопластикових вікон Viknaland.

---

## 1. Схема контент-типів у Strapi 5

### 📋 1. Колекція `Lead` (Вхідні заявки з сайту та калькулятора)
Дозволяє відділу продажу та кол-центру миттєво бачити всі заявки з сайту:
- **`name`** (Short Text) — Імʼя клієнта
- **`phone`** (Short Text) — Номер телефону
- **`city`** (Short Text) — Місто / населений пункт
- **`preferredContact`** (Enumeration: `phone`, `telegram`, `viber`) — Бажаний канал звʼязку
- **`isEvidnovlennya`** (Boolean) — Чи потрібна оплата картою «єВідновлення»
- **`configSummary`** (Long Text) — Повний опис конфігурації вікна з калькулятора
- **`estimatedPrice`** (Number) — Розрахована вартість у гривнях
- **`status`** (Enumeration: `new`, `contacted`, `measuring_scheduled`, `deal_won`, `rejected`) — Статус ліда в CRM

---

### 🪟 2. Колекція `ProfileSystem` (Профільні системи заводу)
Керування каталогом профілів (B58, B70, 85):
- **`slug`** (UID) — Ідентифікатор (`b58`, `b70`, `v85`)
- **`title`** (Short Text) — Назва системи (напр. *Viknaland B70*)
- **`chambers`** (Integer) — Кількість повітряних камер (напр. *6*)
- **`depth`** (Integer) — Монтажна глибина в мм (напр. *70*)
- **`heatResistance`** (Short Text) — Опір теплопередачі (напр. *0.91 м²·°C/Вт*)
- **`soundInsulation`** (Short Text) — Шумоізоляція (напр. *до 42 дБ*)
- **`isPopular`** (Boolean) — Позначка «Хіт продажів»
- **`basePricePerM2`** (Number) — Базова ціна за м² для калькулятора

---

### 💰 3. Сингл-тип `CalculatorRates` (Тарифна сітка калькулятора)
Дозволяє директору з маркетингу змінювати ціни в калькуляторі наживо без програміста:
- **`discountPercent`** (Integer) — Розмір поточної акційної знижки (напр. *30%*)
- **`energyGiftActive`** (Boolean) — Чи діє подарунок «Склопакет з аргоном»
- **`macoHardwarePrice`** (Number) — Доплата за австрійську фурнітуру Maco
- **`siegeniaHardwarePrice`** (Number) — Доплата за німецьку фурнітуру Siegenia
- **`laminationMarkup`** (Decimal) — Коефіцієнт націнки за колірну ламінацію (напр. *1.18*)
- **`warmMountPrice`** (Number) — Вартість теплого монтажу за ДСТУ

---

### 🏠 4. Колекція `PortfolioProject` (Виконані обʼєкти)
- **`title`** (Short Text) — Назва обʼєкта
- **`location`** (Short Text) — Локація (напр. *с. Козин, Київська обл.*)
- **`category`** (Enumeration: `cottage`, `apartment`, `balcony`, `evidnovlennya`)
- **`profileUsed`** (Short Text) — Використаний профіль
- **`completionDays`** (Integer) — Термін виконання у днях
- **`totalPrice`** (Short Text) — Вартість під ключ у грн
- **`photos`** (Media: Multiple Images) — Фотографії обʼєкта

---

## 2. Як підключити фронтенд Viknaland до Strapi

У файлі `d:\aurocraft-web\viknaland\.env.local`:
```env
NEXT_PUBLIC_STRAPI_URL=http://127.0.0.1:1337
STRAPI_API_TOKEN=your_generated_read_token_here
```

Всі запити з форми калькулятора автоматично надсилаються на ендпоінт `/api/lead`, який ретранслює їх у Strapi або локально логує, зберігаючи повну історію замовлень.
