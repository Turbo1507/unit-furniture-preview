/* UNIT.FURNITURE — данные каталога, решений и проектов.
   Источник: Figma, страница «Каталог» (презентация collection 2026, обновлена 02.10.2026).
   Полная выжимка презентации RU+EN (тексты бренда, материалы, климат, процесс) —
   refs/catalog-2026-10/catalog-db.json. Цен в каталоге нет: «по запросу».

   cat — категория как в каталоге: chairs|beds|armchairs|sofas|nightstands|outdoor|sunbeds|textile.
   tags — доп. вкладки витрины (chairs|poufs|outdoor|commercial|decor), чтобы модель
   была видна и в смежной вкладке. env: indoor|outdoor · use: home|villa|hotel|restaurant.
   collection — линейка (Awan / Axis / Reason). img — предметное фото на белом,
   life — интерьерный кадр из каталога. dims — В × Ш × Г, мм. */
window.PRODUCTS = [
  // Стулья
  { id: 'awan-scandi', cat: 'chairs', collection: 'Awan', env: 'indoor', use: ['home', 'villa', 'restaurant'], fabric: true,
    name: 'Awan Scandi', img: 'assets/c26/p-awan-scandi.jpg', life: 'assets/c26/life-dining.jpg',
    dims: '450 × 400 × 400 мм',
    specs: { 'Каркас': 'Тиковое дерево', 'Цвет': 'Серый' } },
  { id: 'axis-stool', cat: 'chairs', collection: 'Axis', env: 'indoor', use: ['home', 'villa', 'restaurant'], fabric: true,
    name: 'Axis Stool', img: 'assets/c26/p-axis-stool.jpg', life: 'assets/c26/life-dining.jpg',
    dims: '—',
    specs: { 'Каркас': 'Тиковое дерево', 'Цвет': 'Серый' } },
  { id: 'axis-dining-chair', cat: 'chairs', collection: 'Axis', env: 'indoor', use: ['home', 'villa', 'restaurant'], fabric: true,
    name: 'Axis Dining Chair', img: 'assets/c26/p-axis-dining-chair.jpg',
    dims: '—',
    specs: { 'Каркас': 'Тиковое дерево', 'Цвет': 'Серый' } },
  { id: 'reason-bar', cat: 'chairs', collection: 'Reason', env: 'indoor', use: ['hotel', 'restaurant'], fabric: true, tags: ['commercial'],
    name: 'Reason Bar', img: 'assets/c26/p-reason-bar.jpg',
    dims: '950 × 470 × 470 мм',
    specs: { 'Каркас': 'Тиковое дерево', 'Цвет': 'Серый' } },
  { id: 'reason-dining-chair', cat: 'chairs', collection: 'Reason', env: 'indoor', use: ['home', 'villa', 'restaurant'], fabric: true,
    name: 'Reason Dining Chair', img: 'assets/c26/p-reason-dining-chair.jpg', life: 'assets/c26/life-reason-dining-chair.jpg',
    dims: '750 × 550 × 550 мм',
    specs: { 'Каркас': 'Тиковое дерево', 'Цвет': 'Тёмно-серый' } },

  // Кровати
  { id: 'reason-bed', cat: 'beds', collection: 'Reason', env: 'indoor', use: ['home', 'villa', 'hotel'], fabric: true,
    name: 'Reason Bed', img: 'assets/c26/p-reason-bed.jpg', life: 'assets/c26/life-beds.jpg',
    dims: '1205 × 3450 × 2230 мм',
    specs: { 'Изголовье': 'HMR 18 мм, орех', 'Каркас': 'Фанера 18 мм', 'Цвет': 'Серый' } },
  { id: 'axis-bed', cat: 'beds', collection: 'Axis', env: 'indoor', use: ['home', 'villa', 'hotel'], fabric: true,
    name: 'Axis Bed', img: 'assets/c26/p-axis-bed.jpg', life: 'assets/c26/life-axis-bed.jpg',
    dims: '950 × 1970 × 2590 мм',
    specs: { 'Изголовье': 'HMR 18 мм, орех', 'Каркас': 'Фанера 18 мм', 'Цвет': 'Серый' } },
  { id: 'awan-bed', cat: 'beds', collection: 'Awan', env: 'indoor', use: ['home', 'villa', 'hotel'], fabric: true,
    name: 'Awan Bed', img: 'assets/c26/p-awan-bed.jpg',
    dims: '950 × 1970 × 2270 мм',
    specs: { 'Изголовье': 'Фанера 18 мм', 'Каркас': 'Фанера 18 мм', 'Цвет': 'Серый' } },

  // Кресла и пуфы
  { id: 'axis-chair', cat: 'armchairs', collection: 'Axis', env: 'indoor', use: ['home', 'villa', 'hotel'], fabric: true,
    name: 'Axis Chair', img: 'assets/c26/p-axis-chair.jpg', life: 'assets/c26/life-armchairs.jpg',
    dims: '850 × 900 × 700 мм',
    specs: { 'Каркас': 'Металл', 'Цвет': 'Серый' } },
  { id: 'awan-chair', cat: 'armchairs', collection: 'Awan', env: 'indoor', use: ['home', 'villa', 'hotel'], fabric: true,
    name: 'Awan Chair', img: 'assets/c26/p-awan-chair.jpg', life: 'assets/c26/life-bedroom-chairs.jpg',
    dims: '—',
    specs: { 'Каркас': 'Тиковое дерево', 'Цвет': 'Серый' } },
  { id: 'awan-core', cat: 'armchairs', collection: 'Awan', env: 'indoor', use: ['home', 'villa'], fabric: true, tags: ['poufs'],
    name: 'Awan Core', img: 'assets/c26/p-awan-core.jpg', life: 'assets/c26/life-armchairs.jpg',
    dims: '450 × 400 × 400 мм',
    specs: { 'Каркас': 'Фанера 18 мм', 'Цвет': 'Синий' } },
  { id: 'awan-pouf', cat: 'armchairs', collection: 'Awan', env: 'indoor', use: ['home', 'villa'], fabric: true, tags: ['poufs'],
    name: 'Awan Pouf', img: 'assets/c26/p-awan-pouf.jpg', life: 'assets/c26/life-bedroom-chairs.jpg',
    dims: '400 × 780 × 780 мм',
    specs: { 'Каркас': 'Фанера 18 мм', 'Цвет': 'Серый' } },

  // Диваны
  { id: 'axis-sofa', cat: 'sofas', collection: 'Axis', env: 'indoor', use: ['home', 'villa'], fabric: true,
    name: 'Axis Sofa', img: 'assets/c26/p-axis-sofa.jpg', life: 'assets/c26/life-sofa-grey.jpg',
    dims: '700 × 2400 × 900 мм',
    specs: { 'Каркас': 'Фанера 18 мм', 'Ножки': 'Металл (Китай)', 'Цвет': 'Серый' } },
  { id: 'sofa-a', cat: 'sofas', env: 'indoor', use: ['home', 'villa'], fabric: true,
    name: 'Sofa A', img: 'assets/c26/p-sofa-a.jpg', life: 'assets/c26/life-sofa-light.jpg',
    dims: '700 × 2400 × 900 мм',
    specs: { 'Каркас': 'Фанера 18 мм', 'Ножки': 'Металл (Китай)', 'Цвет': 'Светлый' } },
  { id: 'sofa-reception', cat: 'sofas', env: 'indoor', use: ['hotel', 'restaurant'], fabric: true, tags: ['commercial'],
    name: 'Sofa Reception Restaurant', img: 'assets/c26/p-sofa-reception.jpg', life: 'assets/c26/life-sofa-reception.jpg',
    dims: '650 × 2150 × 1280 мм',
    specs: { 'Цвет': 'Серый', 'Назначение': 'Ресепшн, ресторан' } },
  { id: 'awan-sofa', cat: 'sofas', collection: 'Awan', env: 'indoor', use: ['home', 'villa'], fabric: true,
    name: 'Awan Sofa', img: 'assets/c26/p-awan-sofa.jpg', life: 'assets/c26/life-awan-sofa.jpg',
    dims: '705 × 2570 × 1550 мм',
    specs: { 'Цвет': 'Серый', 'Тип': 'Угловой, модульный' } },
  { id: 'sofa-obsidian', cat: 'sofas', env: 'indoor', use: ['home', 'villa'], fabric: true,
    name: 'Sofa Obsidian', img: 'assets/c26/p-sofa-obsidian.jpg', life: 'assets/c26/life-sofa-obsidian.jpg',
    dims: '800 × 3795 × 1565 мм',
    specs: { 'Каркас': 'Фанера 18 мм', 'Цвет': 'Графитовый' } },
  { id: 'sofa-anatholy', cat: 'sofas', env: 'indoor', use: ['home', 'villa'], fabric: true,
    name: 'Sofa Anatholy', img: 'assets/c26/p-sofa-anatholy.jpg', life: 'assets/c26/life-sofa-anatholy.jpg',
    dims: '850 × 4600 × 2950 мм',
    specs: { 'Каркас': 'Фанера 18 мм', 'Цвет': 'Коричневый', 'Тип': 'Угловой' } },

  // Тумбы
  { id: 'bed-nakas-l', cat: 'nightstands', env: 'indoor', use: ['home', 'villa', 'hotel'], tags: ['decor'],
    name: 'Bed Nakas L', img: 'assets/c26/p-bed-nakas-l.jpg', life: 'assets/c26/life-nightstands.jpg',
    dims: '400 × 400 × 400 мм',
    specs: { 'Цвет': 'Чёрно-белый' } },
  { id: 'bed-nakas-r', cat: 'nightstands', env: 'indoor', use: ['home', 'villa', 'hotel'], tags: ['decor'],
    name: 'Bed Nakas R', img: 'assets/c26/p-bed-nakas-r.jpg', life: 'assets/c26/life-nightstands-2.jpg',
    dims: '400 × 400 × 400 мм',
    specs: { 'Цвет': 'Зеркальный' } },

  // Уличные диваны
  { id: 'outdoor-5', cat: 'outdoor', env: 'outdoor', use: ['home', 'villa', 'hotel'], fabric: true,
    name: 'Sofa Outdoor Type 5 · угловой', img: 'assets/c26/p-outdoor-5.jpg', life: 'assets/c26/life-outdoor-corner.jpg',
    dims: '720 × 2850 × 1900 мм',
    specs: { 'Каркас': 'Тиковое дерево', 'Ножки': 'Металл (Китай)', 'Цвет': 'Серый' } },
  { id: 'outdoor-4', cat: 'outdoor', env: 'outdoor', use: ['home', 'villa', 'hotel'], fabric: true,
    name: 'Sofa Outdoor Type 4', img: 'assets/c26/p-outdoor-4.jpg', life: 'assets/c26/life-outdoor-sofa.jpg',
    dims: '720 × 1900 × 950 мм',
    specs: { 'Каркас': 'Тиковое дерево', 'Ножки': 'Металл (Китай)', 'Цвет': 'Серый' } },
  { id: 'outdoor-3', cat: 'outdoor', env: 'outdoor', use: ['home', 'villa', 'hotel'], fabric: true,
    name: 'Sofa Outdoor Type 3', img: 'assets/c26/p-outdoor-3.jpg',
    dims: '720 × 2850 × 950 мм',
    specs: { 'Каркас': 'Тиковое дерево', 'Ножки': 'Металл (Китай)', 'Цвет': 'Серый' } },

  // Шезлонги
  { id: 'outdoor-2', cat: 'sunbeds', env: 'outdoor', use: ['villa', 'hotel'], tags: ['outdoor'],
    name: 'Sofa Outdoor Type 2 · шезлонг', img: 'assets/c26/p-outdoor-2.jpg', life: 'assets/c26/life-lounger.jpg',
    dims: '—',
    specs: { 'Каркас': 'Тиковое дерево', 'Ножки': 'Металл (Китай)', 'Цвет': 'Серый' } },
  { id: 'outdoor-1', cat: 'sunbeds', env: 'outdoor', use: ['villa', 'hotel'], tags: ['outdoor'],
    name: 'Sofa Outdoor Type 1 · дейбед', img: 'assets/c26/p-outdoor-1.jpg', life: 'assets/c26/life-loungers.jpg',
    dims: '—',
    specs: { 'Каркас': 'Тиковое дерево', 'Ножки': 'Металл (Китай)', 'Цвет': 'Серый' } },

  // Подушки (варианты A/B — отдельные фото в variants)
  { id: 'pillows-anatholy', cat: 'textile', env: 'indoor', use: ['home', 'villa'], fabric: true, tags: ['decor'],
    name: 'Pillows · Sofa Anatholy', img: 'assets/c26/p-pillows-anatholy-a.jpg',
    variants: { A: 'assets/c26/p-pillows-anatholy-a.jpg', B: 'assets/c26/p-pillows-anatholy-b.jpg' },
    dims: '—',
    specs: { 'Варианты': 'A — оранжевый, B — тёмный' } },
  { id: 'pillows-obsidian', cat: 'textile', env: 'indoor', use: ['home', 'villa'], fabric: true, tags: ['decor'],
    name: 'Pillows · Sofa Obsidian', img: 'assets/c26/p-pillows-obsidian-a.jpg',
    variants: { A: 'assets/c26/p-pillows-obsidian-a.jpg', B: 'assets/c26/p-pillows-obsidian-b.jpg' },
    dims: '—',
    specs: { 'Варианты': 'A — серый меланж, B — графит' } },
  { id: 'pillows-outdoor', cat: 'textile', env: 'outdoor', use: ['home', 'villa', 'hotel'], fabric: true, tags: ['decor'],
    name: 'Pillows · Sofa Outdoor', img: 'assets/c26/p-pillows-outdoor-a.jpg',
    variants: { A: 'assets/c26/p-pillows-outdoor-a.jpg', B: 'assets/c26/p-pillows-outdoor-b.jpg' },
    dims: '—',
    specs: { 'Варианты': 'A — синий, B — серый' } },
];

/* Категории витрины каталога: ключи i18n + счётчик моделей.
   Категории без моделей (столы) показываем как «под заказ» — производство кастомное. */
window.CATEGORIES = [
  { id: 'beds',        img: 'assets/c26/life-axis-bed.jpg' },
  { id: 'sofas',       img: 'assets/c26/life-sofa-light.jpg' },
  { id: 'chairs',      img: 'assets/c26/life-dining.jpg' },
  { id: 'armchairs',   img: 'assets/c26/life-armchairs.jpg' },
  { id: 'nightstands', img: 'assets/c26/life-nightstands.jpg' },
  { id: 'outdoor',     img: 'assets/c26/life-outdoor-corner.jpg' },
  { id: 'sunbeds',     img: 'assets/c26/life-loungers.jpg' },
  { id: 'poufs',       img: 'assets/c26/p-awan-core.jpg' },
  { id: 'textile',     img: 'assets/c26/p-pillows-outdoor-a.jpg' },
  { id: 'commercial',  img: 'assets/c26/life-sofa-reception.jpg' },
  { id: 'tables',      img: 'assets/c26/sol-turnkey.jpg', custom: true },
];

/* Готовые решения (каталог, слайд «Сотрудничество») */
window.SOLUTIONS = [
  { id: 'bedroom',    img: 'assets/c26/sol-bedroom.jpg',  products: ['reason-bed', 'bed-nakas-l', 'awan-chair', 'awan-pouf', 'pillows-obsidian'] },
  { id: 'living',     img: 'assets/c26/sol-living.jpg',   products: ['axis-sofa', 'axis-chair', 'awan-core', 'pillows-anatholy'] },
  { id: 'terrace',    img: 'assets/c26/sol-outdoor.jpg',  products: ['outdoor-5', 'outdoor-4', 'pillows-outdoor'] },
  { id: 'lounge',     img: 'assets/c26/life-loungers.jpg', products: ['outdoor-1', 'outdoor-2', 'pillows-outdoor'] },
  { id: 'reception',  img: 'assets/c26/life-sofa-reception.jpg', products: ['sofa-reception', 'axis-chair', 'awan-chair'] },
  { id: 'restaurant', img: 'assets/c26/life-dining.jpg',  products: ['reason-bar', 'axis-dining-chair', 'reason-dining-chair', 'sofa-reception'] },
  { id: 'turnkey',    img: 'assets/c26/sol-turnkey.jpg',  products: [], featured: true },
];

/* Реальные объекты (страница «Проекты»). Тексты карточек — ключи proj.prN в i18n.
   type: indoor|outdoor · place: villas|commercial */
window.PROJECTS = [
  { id: 'pr1', img: 'assets/c26/proj-51_703_112.jpg', type: 'indoor',  place: 'villas' },
  { id: 'pr2', img: 'assets/c26/proj-53_63_112.jpg',  type: 'indoor',  place: 'villas' },
  { id: 'pr3', img: 'assets/c26/proj-51_703_318.jpg', type: 'outdoor', place: 'villas' },
  { id: 'pr4', img: 'assets/c26/proj-53_634_112.jpg', type: 'outdoor', place: 'villas' },
  { id: 'pr5', img: 'assets/c26/proj-52_326_111.jpg', type: 'indoor',  place: 'villas' },
  // коммерческих кадров в каталоге нет — пока старые заглушки
  { id: 'pr6', img: 'assets/life-terrace.jpg',    type: 'outdoor', place: 'commercial' },
  { id: 'pr7', img: 'assets/life-lobby.jpg',      type: 'indoor',  place: 'commercial' },
  { id: 'pr8', img: 'assets/life-restaurant.jpg', type: 'indoor',  place: 'commercial' },
];

/* Все кадры «Реальные проекты» из каталога (слайды 51–53) — для галереи */
window.PROJECT_PHOTOS = [
  '51_703_112', '51_703_318', '51_63_318', '51_276_318', '51_490_318',
  '52_63_111', '52_326_111', '52_800_111', '52_63_374', '52_402_374', '52_634_374',
  '53_63_112', '53_402_112', '53_634_112', '53_63_374', '53_292_374', '53_800_374',
].map(k => `assets/c26/proj-${k}.jpg`);
