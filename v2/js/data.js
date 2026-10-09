/* UNIT.FURNITURE — данные каталога, решений и проектов.
   Модель заложена под будущий e-commerce: карточка = товар с категорией,
   средой (indoor/outdoor), назначением и тегами — фильтры и корзина
   работают уже сейчас, цена появится полем price позже. */

/* env: indoor|outdoor · use: home|villa|hotel|restaurant ·
   tags: sunbeds|poufs|commercial|decor — доп. категории из ТЗ */
window.PRODUCTS = [
  // Кровати
  { id: 'bed1', cat: 'beds', env: 'indoor', use: ['home', 'villa', 'hotel'], fabric: true,
    name: 'Bed Type 1', img: 'assets/c26/p-reason-bed.jpg', life: 'assets/c26/life-beds.jpg',
    dims: '1205 × 3450 × 2230 мм',
    specs: { 'Изголовье': 'HMR 18 мм, орех', 'Каркас': 'Фанера 18 мм', 'Цвет': 'Серый', 'Производство': 'IDEFAB, Бали' } },
  { id: 'bed2', cat: 'beds', env: 'indoor', use: ['home', 'villa', 'hotel'], fabric: true,
    name: 'Bed Type 2', img: 'assets/c26/p-awan-bed.jpg',
    dims: '950 × 1970 × 2270 мм',
    specs: { 'Изголовье': 'Фанера 18 мм', 'Каркас': 'Фанера 18 мм', 'Цвет': 'Серый', 'Производство': 'Китай' } },
  { id: 'bed3', cat: 'beds', env: 'indoor', use: ['home', 'villa', 'hotel'], fabric: true,
    name: 'Bed Type 3', img: 'assets/c26/p-axis-bed.jpg', life: 'assets/c26/life-axis-bed.jpg',
    dims: '950 × 1970 × 2590 мм',
    specs: { 'Изголовье': 'HMR 18 мм, орех', 'Каркас': 'Фанера 18 мм', 'Цвет': 'Серый', 'Производство': 'Kain Interior Hikaron' } },

  // Диваны
  { id: 'sofaA', cat: 'sofas', env: 'indoor', use: ['home', 'villa'], fabric: true,
    name: 'Sofa A', img: 'assets/c26/p-sofa-a.jpg', life: 'assets/c26/life-sofa-light.jpg',
    dims: '700 × 2400 × 900 мм',
    specs: { 'Каркас': 'Фанера 18 мм', 'Ножки': 'Металл', 'Цвет': 'Светлый' } },
  { id: 'sofaB', cat: 'sofas', env: 'indoor', use: ['home', 'villa'], fabric: true,
    name: 'Sofa B', img: 'assets/c26/p-axis-sofa.jpg', life: 'assets/c26/life-sofa-grey.jpg',
    dims: '700 × 2400 × 900 мм',
    specs: { 'Каркас': 'Фанера 18 мм', 'Ножки': 'Металл', 'Цвет': 'Серый' } },
  { id: 'sofaObs', cat: 'sofas', env: 'indoor', use: ['home', 'villa'], fabric: true,
    name: 'Sofa Obsidian', img: 'assets/c26/p-sofa-obsidian.jpg', life: 'assets/c26/life-sofa-obsidian.jpg',
    dims: '800 × 3795 × 1565 мм',
    specs: { 'Каркас': 'Фанера 18 мм', 'Цвет': 'Графитовый' } },
  { id: 'sofaAna', cat: 'sofas', env: 'indoor', use: ['home', 'villa'], fabric: true,
    name: 'Sofa Anatholy', img: 'assets/c26/p-sofa-anatholy.jpg', life: 'assets/c26/life-sofa-anatholy.jpg',
    dims: '850 × 4600 × 2950 мм',
    specs: { 'Каркас': 'Фанера 18 мм', 'Цвет': 'Коричневый', 'Тип': 'Угловой' } },
  { id: 'sofaRec', cat: 'sofas', env: 'indoor', use: ['hotel', 'restaurant'], fabric: true, tags: ['commercial'],
    name: 'Sofa Reception Restaurant', img: 'assets/c26/p-sofa-reception.jpg', life: 'assets/c26/life-sofa-reception.jpg',
    dims: '650 × 2150 × 1280 мм',
    specs: { 'Цвет': 'Серый', 'Назначение': 'Ресепшн, ресторан' } },
  { id: 'sofaUlu', cat: 'sofas', env: 'indoor', use: ['home', 'villa'], fabric: true,
    name: 'Sofa Uluwatu', img: 'assets/c26/p-awan-sofa.jpg', life: 'assets/c26/life-awan-sofa.jpg',
    dims: '705 × 2570 × 1550 мм',
    specs: { 'Цвет': 'Серый', 'Тип': 'Угловой, модульный' } },

  // Кресла и стулья
  { id: 'ch1', cat: 'chairs', env: 'indoor', use: ['home', 'villa', 'restaurant'], fabric: true,
    name: 'Chair Type 1', img: 'assets/c26/p-axis-chair.jpg', life: 'assets/c26/life-armchairs.jpg',
    dims: '850 × 900 × 700 мм',
    specs: { 'Каркас': 'Металл', 'Цвет': 'Серый', 'Производство': 'Китай' } },
  { id: 'ch2', cat: 'chairs', env: 'indoor', use: ['home', 'villa', 'restaurant'],
    name: 'Chair Type 2', img: 'assets/c26/p-awan-scandi.jpg', life: 'assets/c26/life-dining.jpg',
    dims: '450 × 400 × 400 мм',
    specs: { 'Каркас': 'Тиковое дерево', 'Цвет': 'Серый' } },
  { id: 'ch3', cat: 'chairs', env: 'indoor', use: ['home', 'villa', 'restaurant'],
    name: 'Chair Type 3', img: 'assets/c26/p-axis-stool.jpg', life: 'assets/c26/life-dining.jpg',
    dims: '—',
    specs: { 'Каркас': 'Тиковое дерево', 'Цвет': 'Серый' } },
  { id: 'ch4', cat: 'chairs', env: 'indoor', use: ['home', 'villa'], fabric: true, tags: ['poufs'],
    name: 'Chair Type 4, пуф', img: 'assets/c26/p-awan-core.jpg', life: 'assets/c26/life-armchairs.jpg',
    dims: '450 × 400 × 400 мм',
    specs: { 'Каркас': 'Фанера 18 мм', 'Цвет': 'Синий' } },
  { id: 'ch5', cat: 'chairs', env: 'indoor', use: ['home', 'villa', 'restaurant'],
    name: 'Chair Type 5', img: 'assets/c26/p-axis-dining-chair.jpg',
    dims: '—',
    specs: { 'Каркас': 'Тиковое дерево', 'Цвет': 'Серый' } },
  { id: 'ch6', cat: 'chairs', env: 'indoor', use: ['hotel', 'restaurant'], tags: ['commercial'],
    name: 'Chair Type 6, барный', img: 'assets/c26/p-reason-bar.jpg',
    dims: '950 × 470 × 470 мм',
    specs: { 'Каркас': 'Тиковое дерево', 'Цвет': 'Серый' } },
  { id: 'ch7', cat: 'chairs', env: 'indoor', use: ['home', 'villa'], fabric: true,
    name: 'Chair Type 7', img: 'assets/c26/p-reason-dining-chair.jpg', life: 'assets/c26/life-reason-dining-chair.jpg',
    dims: '750 × 550 × 550 мм',
    specs: { 'Каркас': 'Тиковое дерево', 'Цвет': 'Тёмно-серый' } },
  { id: 'ch8', cat: 'chairs', env: 'indoor', use: ['home', 'villa'], fabric: true, tags: ['poufs'],
    name: 'Chair Type 8, оттоманка', img: 'assets/c26/p-awan-pouf.jpg', life: 'assets/c26/life-bedroom-chairs.jpg',
    dims: '400 × 780 × 780 мм',
    specs: { 'Каркас': 'Фанера 18 мм', 'Цвет': 'Серый' } },
  { id: 'ch9', cat: 'chairs', env: 'indoor', use: ['home', 'villa', 'restaurant'],
    name: 'Chair Type 9', img: 'assets/c26/p-awan-chair.jpg', life: 'assets/c26/life-bedroom-chairs.jpg',
    dims: '—',
    specs: { 'Каркас': 'Тиковое дерево', 'Цвет': 'Серый' } },

  // Аутдор
  { id: 'out1', cat: 'outdoor', env: 'outdoor', use: ['villa', 'hotel'], tags: ['sunbeds'],
    name: 'Sofa Outdoor Type 1, дейбед', img: 'assets/c26/p-outdoor-1.jpg', life: 'assets/c26/life-loungers.jpg',
    dims: '—',
    specs: { 'Каркас': 'Тиковое дерево', 'Ножки': 'Металл', 'Цвет': 'Серый' } },
  { id: 'out2', cat: 'outdoor', env: 'outdoor', use: ['villa', 'hotel'], tags: ['sunbeds'],
    name: 'Sofa Outdoor Type 2, шезлонг', img: 'assets/c26/p-outdoor-2.jpg', life: 'assets/c26/life-lounger.jpg',
    dims: '—',
    specs: { 'Каркас': 'Тиковое дерево', 'Ножки': 'Металл', 'Цвет': 'Серый' } },
  { id: 'out3', cat: 'outdoor', env: 'outdoor', use: ['home', 'villa', 'hotel'], fabric: true,
    name: 'Sofa Outdoor Type 3', img: 'assets/c26/p-outdoor-3.jpg',
    dims: '720 × 2850 × 950 мм',
    specs: { 'Каркас': 'Тиковое дерево', 'Ножки': 'Металл', 'Цвет': 'Серый' } },
  { id: 'out4', cat: 'outdoor', env: 'outdoor', use: ['home', 'villa', 'hotel'], fabric: true,
    name: 'Sofa Outdoor Type 4', img: 'assets/c26/p-outdoor-4.jpg', life: 'assets/c26/life-outdoor-sofa.jpg',
    dims: '720 × 1900 × 950 мм',
    specs: { 'Каркас': 'Тиковое дерево', 'Ножки': 'Металл', 'Цвет': 'Серый' } },
  { id: 'out5', cat: 'outdoor', env: 'outdoor', use: ['home', 'villa', 'hotel'], fabric: true,
    name: 'Sofa Outdoor Type 5, угловой', img: 'assets/c26/p-outdoor-5.jpg', life: 'assets/c26/life-outdoor-corner.jpg',
    dims: '720 × 2850 × 1900 мм',
    specs: { 'Каркас': 'Тиковое дерево', 'Ножки': 'Металл', 'Цвет': 'Серый' } },

  // Текстиль и декор
  { id: 'pilAna', cat: 'textile', env: 'indoor', use: ['home', 'villa'], fabric: true, tags: ['decor'],
    name: 'Pillows Sofa Anatholy', img: 'assets/c26/p-pillows-anatholy-a.jpg',
    dims: '—',
    specs: { 'Варианты': 'A: оранжевый, B: тёмный' } },
  { id: 'pilObs', cat: 'textile', env: 'indoor', use: ['home', 'villa'], fabric: true, tags: ['decor'],
    name: 'Pillows Sofa Obsidian', img: 'assets/c26/p-pillows-obsidian-a.jpg',
    dims: '—',
    specs: { 'Варианты': 'A: серый меланж, B: графит' } },
  { id: 'pilOut', cat: 'textile', env: 'outdoor', use: ['home', 'villa', 'hotel'], fabric: true, tags: ['decor'],
    name: 'Pillows Sofa Outdoor', img: 'assets/c26/p-pillows-outdoor-a.jpg',
    dims: '—',
    specs: { 'Варианты': 'A: синий, B: серый' } },

  // Тумбы
  { id: 'nakasL', cat: 'nightstands', env: 'indoor', use: ['home', 'villa', 'hotel'],
    name: 'Bed Nakas L', img: 'assets/c26/p-bed-nakas-l.jpg', life: 'assets/c26/life-nightstands.jpg',
    dims: '400 × 400 × 400 мм',
    specs: { 'Цвет': 'Чёрно-белый' } },
  { id: 'nakasR', cat: 'nightstands', env: 'indoor', use: ['home', 'villa', 'hotel'],
    name: 'Bed Nakas R', img: 'assets/c26/p-bed-nakas-r.jpg', life: 'assets/c26/life-nightstands-2.jpg',
    dims: '400 × 400 × 400 мм',
    specs: { 'Цвет': 'Зеркальный' } },
];

/* Категории витрины каталога (ТЗ, блок 3): ключи i18n + счётчик моделей.
   Категории без моделей (столы) показываем как «под заказ» — производство кастомное. */
window.CATEGORIES = [
  { id: 'beds',       img: 'assets/c26/life-axis-bed.jpg' },
  { id: 'sofas',      img: 'assets/c26/life-sofa-light.jpg' },
  { id: 'chairs',     img: 'assets/c26/life-reason-dining-chair.jpg' },
  { id: 'outdoor',    img: 'assets/c26/life-outdoor-corner.jpg' },
  { id: 'sunbeds',    img: 'assets/c26/life-loungers.jpg' },
  { id: 'poufs',      img: 'assets/n/cat-poufs.jpg' },
  { id: 'textile',    img: 'assets/n/cat-pillows.jpg' },
  { id: 'commercial', img: 'assets/c26/life-sofa-reception.jpg' },
  { id: 'nightstands', img: 'assets/c26/life-nightstands.jpg' },
];

/* Каталог на главной: ряды по категориям, как у divan.ru */
window.FEATURED = [
  { room: 'living',  cat: 'sofas',   ids: ['sofaAna', 'sofaObs', 'sofaA', 'sofaRec'] },
  { room: 'bedroom', cat: 'beds',    ids: ['bed1', 'bed3', 'bed2', 'ch8'] },
  { room: 'chairs',  cat: 'chairs',  ids: ['ch1', 'ch9', 'ch4', 'ch7'] },
  { room: 'outdoor', cat: 'outdoor', ids: ['out5', 'out4', 'out3', 'out2'] },
];

/* Готовые решения (ТЗ, блок 4 и страница «Решения») */
window.SOLUTIONS = [
  { id: 'bedroom',    img: 'assets/n/sol-bedroom.jpg',    products: ['bed1', 'ch7', 'ch8', 'pilObs'], items: [['bed1'], [], ['ch7'], ['ch8'], [], ['pilObs']] },
  { id: 'living',     img: 'assets/n/sol-living.jpg',     products: ['sofaB', 'ch7', 'ch8', 'pilAna'], items: [['sofaB'], ['ch7'], [], ['ch8'], ['pilAna']] },
  { id: 'terrace',    img: 'assets/n/sol-outdoor.jpg',    products: ['out3', 'out4', 'pilOut'], items: [['out3', 'out4'], [], ['pilOut'], []] },
  { id: 'lounge',     img: 'assets/life-terrace.jpg',    products: ['out1', 'out2', 'pilOut'], items: [['out2'], ['out1'], [], ['pilOut']] },
  { id: 'reception',  img: 'assets/life-lobby.jpg',      products: ['sofaRec', 'ch1', 'ch5'], items: [['sofaRec'], ['ch1', 'ch5'], [], []] },
  { id: 'restaurant', img: 'assets/life-restaurant.jpg', products: ['ch6', 'ch2', 'sofaRec'], items: [['ch2'], ['ch6'], ['sofaRec'], 'drawing'] },
  { id: 'turnkey',    img: 'assets/n/sol-turnkey.jpg',       products: [], featured: true },
];

/* Реальные объекты (ТЗ, блок 8 и страница «Проекты»).
   type: indoor|outdoor · place: villas|commercial */
window.PROJECTS = [
  { id: 'pr1', img: 'assets/proj-villa-living.jpg',  type: 'indoor',  place: 'villas' },
  { id: 'pr2', img: 'assets/proj-villa-bedroom.jpg', type: 'indoor',  place: 'villas' },
  { id: 'pr3', img: 'assets/proj-villa-terrace.jpg', type: 'outdoor', place: 'villas' },
  { id: 'pr4', img: 'assets/proj-poolside.jpg',      type: 'outdoor', place: 'villas' },
  { id: 'pr5', img: 'assets/proj-living-room.jpg',   type: 'indoor',  place: 'villas' },
  { id: 'pr6', img: 'assets/life-terrace.jpg',     type: 'outdoor', place: 'commercial' },
  { id: 'pr7', img: 'assets/life-lobby.jpg',       type: 'indoor',  place: 'commercial' },
  { id: 'pr8', img: 'assets/life-restaurant.jpg',  type: 'indoor',  place: 'commercial' },
];

/* кадры проектов и модели на них (ключ = файл v2/assets/c26/proj-<ключ>.jpg, модели по имени файла p-<модель>.jpg) */
window.SHOT_ITEMS = {
  '51_276_318': ['reason-bar'],
  '51_490_318': ['bed-nakas-r'],
  '51_63_318':  ['axis-bed', 'bed-nakas-l'],
  '51_703_112': ['axis-sofa', 'axis-chair'],
  '51_703_318': ['outdoor-5', 'pillows-outdoor'],
  '52_326_111': ['sofa-a'],
  '52_402_374': ['awan-scandi'],
  '52_634_374': ['bed-nakas-l'],
  '52_63_111':  ['reason-bed'],
  '52_63_374':  ['axis-chair'],
  '52_800_111': ['awan-pouf'],
  '53_292_374': ['sofa-reception'],
  '53_402_112': ['awan-core'],
  '53_634_112': ['outdoor-2'],
  '53_63_112':  ['awan-bed'],
  '53_63_374':  ['bed-nakas-l'],
  '53_800_374': ['awan-scandi'],
};
