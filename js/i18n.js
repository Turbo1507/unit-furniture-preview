/* UNIT.FURNITURE — i18n RU/EN. Паттерн unitdeveloper.com:
   window.I18N словарь, data-i18n / data-i18n-ph атрибуты,
   window.setLang(lang), переключатели в шапке и футере, localStorage. */

window.I18N = {
  ru: {
    /* --- навигация и шапка --- */
    "nav.catalog": "Каталог", "nav.solutions": "Решения", "nav.custom": "Кастомизация",
    "nav.projects": "Проекты", "nav.designers": "Дизайнерам", "nav.contacts": "Контакты",
    "nav.materials": "Материалы", "nav.cta": "Получить консультацию",

    /* --- главная: hero --- */
    "hero.title": "Авторская мебель и&nbsp;интерьерные решения на&nbsp;Бали",
    "hero.sub": "Создаём мебель для вилл, домов, отелей, ресторанов и&nbsp;outdoor-пространств. От&nbsp;отдельной модели до&nbsp;полной комплектации объекта под&nbsp;ключ.",
    "hero.cta1": "Получить консультацию", "hero.cta2": "Смотреть каталог", "hero.scroll": "Листайте ↓",

    "mq.1": "Собственное производство", "mq.2": "Кастомизация под&nbsp;объект",
    "mq.3": "Indoor / Outdoor / Commercial", "mq.4": "Тик и&nbsp;материалы для&nbsp;климата Бали",
    "mq.5": "10+ лет на&nbsp;Бали", "mq.6": "Комплектация вилл, отелей и&nbsp;ресторанов",

    /* --- главная: направления --- */
    "dir.h2": "От отдельных предметов до&nbsp;полной комплектации пространства",
    "dir.lead": "Вы можете выбрать готовую модель из&nbsp;каталога или доверить нам подбор мебели под&nbsp;весь объект: спальню, гостиную, террасу, ресторан, отель или виллу целиком.",
    "dir.1.t": "Мебель для дома", "dir.1.p": "Кровати, диваны, кресла, стулья и&nbsp;мягкие элементы для жилых пространств.",
    "dir.2.t": "Outdoor-зоны", "dir.2.p": "Шезлонги, уличные диваны и&nbsp;мебель для террас, бассейнов и&nbsp;садов.",
    "dir.3.t": "Коммерческие объекты", "dir.3.p": "Решения для отелей, ресторанов, lobby, reception и&nbsp;lounge-пространств.",
    "dir.4.t": "Объект под ключ", "dir.4.p": "Комплектация виллы, дома, отеля или ресторана в&nbsp;единой стилистике.",

    /* --- категории --- */
    "cats.h2": "Каталог мебели",
    "cats.lead": "Выберите категорию или отправьте нам запрос&nbsp;— поможем подобрать решение под&nbsp;ваш объект.",
    "cat.beds": "Кровати", "cat.sofas": "Диваны", "cat.chairs": "Кресла и&nbsp;стулья",
    "cat.outdoor": "Аутдор", "cat.sunbeds": "Шезлонги", "cat.poufs": "Пуфы",
    "cat.textile": "Подушки и&nbsp;декор", "cat.commercial": "Коммерческая мебель", "cat.tables": "Столы",
    "cats.beds.n": "3 модели", "cats.sofas.n": "6 моделей", "cats.chairs.n": "9 моделей",
    "cats.outdoor.n": "5 моделей", "cats.sunbeds.n": "2 модели", "cats.poufs.n": "2 модели",
    "cats.textile.n": "3 позиции", "cats.commercial.n": "2 модели", "cats.tables.n": "под заказ",

    /* --- главная: решения --- */
    "sol.h2": "Готовые интерьерные решения",
    "sol.lead": "Собираем мебель под&nbsp;конкретное пространство&nbsp;— от&nbsp;спальни до&nbsp;полной комплектации виллы.",
    "sol.bedroom.t": "Спальня", "sol.bedroom.p": "Кровать, тумбы, кресло, пуф, текстиль.",
    "sol.living.t": "Гостиная", "sol.living.p": "Диван, кресла, журнальный стол, мягкие элементы.",
    "sol.terrace.t": "Outdoor-зона", "sol.terrace.p": "Диваны, шезлонги, столики, подушки для террасы и&nbsp;бассейна.",
    "sol.turnkey.t": "Объект под ключ", "sol.turnkey.p": "Комплектация виллы, дома, отеля или ресторана в&nbsp;едином стиле.",
    "sol.more": "Смотреть решение", "sol.flag": "Формат UNIT",
    "sol.cta": "Подобрать решение под мой объект",

    /* --- главная: кастомизация --- */
    "cust.h2": "Кастомизация под ваш объект",
    "cust.lead": "Размеры, ткани, цвета и&nbsp;комплектация адаптируются под&nbsp;задачу пространства.",
    "cust.hub.t": "Ваш объект", "cust.hub.p": "Индивидуальное решение для виллы, дома, отеля или ресторана.",
    "cust.size.t": "Размеры", "cust.size.p": "Адаптируем длину, ширину, высоту, посадку и&nbsp;конфигурацию.",
    "cust.fabric.t": "Ткани", "cust.fabric.p": "Подбираем фактуры для indoor и&nbsp;outdoor-пространств.",
    "cust.color.t": "Цвета", "cust.color.p": "Выбираем оттенки дерева, обивки и&nbsp;акцентов.",
    "cust.set.t": "Комплектация", "cust.set.p": "Собираем решение от&nbsp;отдельной модели до&nbsp;полного пакета.",
    "cust.cta": "Обсудить кастомизацию",

    /* --- главная: материалы --- */
    "mat.h2": "Материалы, рассчитанные на&nbsp;жизнь на&nbsp;Бали",
    "mat.lead": "Мебель UNIT.FURNITURE создаётся с&nbsp;учётом влажности, солнца, активного использования и&nbsp;особенностей тропического климата.",
    "mat.wood.t": "Дерево", "mat.wood.p": "Подбираем материалы с&nbsp;учётом назначения изделия и&nbsp;условий эксплуатации.",
    "mat.fabric.t": "Ткани", "mat.fabric.p": "Выбираем фактуры для спален, гостиных, террас, отелей и&nbsp;ресторанов.",
    "mat.fill.t": "Наполнители", "mat.fill.p": "Мягкие элементы проектируются так, чтобы сохранять комфорт и&nbsp;форму.",
    "mat.hw.t": "Фурнитура", "mat.hw.p": "Используем надёжные конструктивные решения для долговечности.",

    /* --- главная: влажность --- */
    "clim.h2": "Влажность и&nbsp;эксплуатация",
    "clim.lead": "Мебель создаётся с&nbsp;учётом климата Бали, outdoor-зон и&nbsp;регулярного использования в&nbsp;жилых и&nbsp;коммерческих пространствах.",
    "clim.1.t": "Влажный климат", "clim.1.p": "Подбираем материалы, отделки и&nbsp;конструктивные решения с&nbsp;учётом влажности и&nbsp;перепадов температуры.",
    "clim.2.t": "Солнце и&nbsp;outdoor", "clim.2.p": "Для открытых зон используем решения, рассчитанные на&nbsp;террасы, бассейны, сады и&nbsp;ежедневную эксплуатацию.",
    "clim.3.t": "Регулярное использование", "clim.3.p": "Мебель сохраняет комфорт, внешний вид и&nbsp;устойчивость при&nbsp;использовании в&nbsp;домах, виллах, отелях и&nbsp;ресторанах.",
    "clim.tag1": "Для дома", "clim.tag2": "Для outdoor-зон", "clim.tag3": "Для коммерческих объектов",

    /* --- проекты --- */
    "proj.h2": "Мебель в реальных проектах",
    "proj.lead": "Наши изделия используются в&nbsp;жилых и&nbsp;коммерческих пространствах UNIT&nbsp;— мы&nbsp;видим, как мебель ведёт себя не&nbsp;только на&nbsp;визуализациях, но&nbsp;и&nbsp;в&nbsp;реальной эксплуатации.",
    "proj.f.all": "Все", "proj.f.indoor": "Indoor", "proj.f.outdoor": "Outdoor",
    "proj.f.villas": "Виллы", "proj.f.commercial": "Коммерческие",
    "proj.cta": "Все проекты",
    "proj.pr1.t": "Villa interior", "proj.pr1.p": "Гостиная: диван, кресла, декор",
    "proj.pr2.t": "Villa bedroom", "proj.pr2.p": "Спальня: кровать, текстиль",
    "proj.pr3.t": "Villa terrace", "proj.pr3.p": "Outdoor-диваны и столики",
    "proj.pr4.t": "Poolside lounge", "proj.pr4.p": "Шезлонги у бассейна",
    "proj.pr5.t": "Living room", "proj.pr5.p": "Мягкая зона: диван, подушки",
    "proj.pr6.t": "Resort terrace", "proj.pr6.p": "Outdoor lounge для гостей",
    "proj.pr7.t": "Reception", "proj.pr7.p": "Лобби: диваны и кресла",
    "proj.pr8.t": "Restaurant", "proj.pr8.p": "Посадочная зона ресторана",

    /* --- дизайнерам (блок на главной) --- */
    "des.h2": "Для дизайнеров и&nbsp;архитекторов",
    "des.p": "Мы&nbsp;можем стать производственным партнёром на&nbsp;Бали для интерьерных проектов, вилл, отелей и&nbsp;коммерческих пространств: адаптируем модели каталога или изготовим мебель по&nbsp;вашим чертежам, референсам и&nbsp;спецификациям.",
    "des.li1": "Работа по&nbsp;референсам, чертежам и&nbsp;спецификациям",
    "des.li2": "Адаптация размеров, тканей и&nbsp;материалов под&nbsp;проект",
    "des.li3": "Комплектация объекта и&nbsp;индивидуальный расчёт",
    "des.cta1": "Стать партнёром", "des.cta2": "Обсудить проект",

    /* --- как заказать --- */
    "steps.h2": "Как заказать",
    "steps.lead": "От первого запроса до&nbsp;готовой мебели на&nbsp;объекте.",
    "steps.1.t": "Консультация", "steps.1.p": "Получаем ваш запрос, фото, план помещения или выбранные модели",
    "steps.2.t": "Подбор", "steps.2.p": "Помогаем выбрать мебель, материалы и&nbsp;решение под&nbsp;объект",
    "steps.3.t": "Расчёт", "steps.3.p": "Готовим индивидуальный расчёт по&nbsp;моделям, материалам и&nbsp;объёму",
    "steps.4.t": "Производство", "steps.4.p": "После согласования запускаем изделия в&nbsp;производство на&nbsp;Бали",
    "steps.5.t": "Доставка", "steps.5.p": "Организуем доставку и, при&nbsp;необходимости, установку на&nbsp;объекте",
    "steps.cta": "Получить расчёт",

    /* --- финальный CTA --- */
    "fin.h2": "Давайте создадим мебель для вашего проекта",
    "fin.lead": "Свяжитесь с&nbsp;нами удобным способом&nbsp;— подберём решение, рассчитаем стоимость и&nbsp;подготовим предложение.",
    "fin.qr": "Наведите камеру, чтобы открыть чат WhatsApp",
    "fin.note": "Стоимость рассчитывается индивидуально. Можно отправить фото, план, референсы или выбранные модели.",

    /* --- страница каталога --- */
    "clg.kicker": "Каталог", "clg.h1": "Каталог UNIT.FURNITURE",
    "clg.sub": "Выберите модель или отправьте нам запрос&nbsp;— поможем подобрать мебель под&nbsp;ваш объект. Цен на&nbsp;сайте нет намеренно: каждый комплект считаем под&nbsp;объём и&nbsp;проект.",
    "tab.all": "Все", "clg.filters": "Фильтры",
    "clg.env.all": "Indoor и Outdoor",
    "clg.use.all": "Любой объект", "clg.use.home": "Дом / апартаменты", "clg.use.villa": "Вилла",
    "clg.use.hotel": "Отель", "clg.use.restaurant": "Ресторан",
    "clg.empty": "Под эти фильтры готовых моделей нет&nbsp;— изготовим под&nbsp;заказ. Напишите нам, что ищете.",
    "clg.cta.h2": "Не нашли нужную модель?",
    "clg.cta.p": "Изготовим мебель по&nbsp;вашим размерам, референсам или чертежам&nbsp;— от&nbsp;отдельного предмета до&nbsp;комплекта на&nbsp;весь объект.",
    "clg.cta.b1": "Запросить стоимость", "clg.cta.b2": "Про кастомизацию",

    /* --- карточки товара --- */
    "p.price": "Цена по запросу", "p.more": "Подробнее →", "p.dims_unknown": "Размеры по запросу",
    "p.request": "Запросить стоимость", "p.in_request": "В заявке ✓",
    "badge.teak": "Тик",
    "tag.indoor": "Indoor", "tag.outdoor": "Outdoor", "tag.custom": "Custom size", "tag.fabric": "Fabric options",
    "use.home": "Дом", "use.villa": "Вилла", "use.hotel": "Отель", "use.restaurant": "Ресторан",

    /* --- страница товара --- */
    "crumb.home": "Главная",
    "qv.dims": "Размеры (В×Ш×Г)",
    "pp.price": "Стоимость рассчитывается индивидуально по&nbsp;запросу.",
    "pp.consult": "Получить консультацию",
    "pp.custom.t": "Кастомизация",
    "pp.custom.p": "Можно изменить размер, ткань, оттенок дерева и&nbsp;комплектацию&nbsp;— под&nbsp;ваш объект. Расскажите о&nbsp;задаче, и&nbsp;мы&nbsp;предложим варианты.",
    "pp.similar": "Похожие модели",
    "d.beds": "Кровать UNIT: каркас из&nbsp;фанеры 18&nbsp;мм, изголовья HMR и&nbsp;тик. Размер и&nbsp;обивку адаптируем под&nbsp;спальню виллы, дома или отельного номера.",
    "d.sofas": "Диван UNIT для гостиных, ресепшн и&nbsp;lounge-зон. Ткань, размер и&nbsp;посадку подбираем под&nbsp;пространство и&nbsp;сценарий использования.",
    "d.chairs": "Кресла, стулья и&nbsp;пуфы из&nbsp;тика и&nbsp;металла&nbsp;— обеденные, барные и&nbsp;лаунж. Производство&nbsp;— Джепара.",
    "d.outdoor": "Outdoor-модель из&nbsp;тика с&nbsp;влагостойким текстилем: рассчитана на&nbsp;солнце, дожди и&nbsp;ежедневное использование у&nbsp;бассейна.",
    "d.textile": "Декоративные подушки и&nbsp;текстиль под&nbsp;модели UNIT&nbsp;— для завершённого интерьера.",

    /* --- страница решений --- */
    "sl.h1": "Готовые интерьерные решения",
    "sl.sub": "Собираем мебель под&nbsp;конкретное пространство&nbsp;— от&nbsp;спальни до&nbsp;полной комплектации виллы, отеля или ресторана. Каждое решение адаптируется по&nbsp;размерам, тканям и&nbsp;составу.",
    "sl.includes": "Может включать:",
    "sl.bedroom.t": "Спальня", "sl.bedroom.p": "Готовое решение для виллы, дома, апартаментов или отельного номера.",
    "sl.bedroom.i1": "Кровать", "sl.bedroom.i2": "Тумбы", "sl.bedroom.i3": "Кресло",
    "sl.bedroom.i4": "Пуф", "sl.bedroom.i5": "Текстиль", "sl.bedroom.i6": "Декоративные подушки",
    "sl.bedroom.cta": "Подобрать спальню",
    "sl.living.t": "Гостиная", "sl.living.p": "Мягкая зона для жизни и&nbsp;приёма гостей&nbsp;— в&nbsp;едином стиле с&nbsp;остальным пространством.",
    "sl.living.i1": "Диван", "sl.living.i2": "Кресла", "sl.living.i3": "Журнальный стол",
    "sl.living.i4": "Мягкие элементы", "sl.living.i5": "Декоративные подушки",
    "sl.living.cta": "Подобрать гостиную",
    "sl.terrace.t": "Терраса", "sl.terrace.p": "Outdoor-мебель для террасы и&nbsp;зоны у&nbsp;бассейна&nbsp;— рассчитана на&nbsp;солнце, влажность и&nbsp;ежедневное использование.",
    "sl.terrace.i1": "Outdoor-диваны", "sl.terrace.i2": "Столики", "sl.terrace.i3": "Подушки для улицы", "sl.terrace.i4": "Кресла",
    "sl.terrace.cta": "Подобрать террасу",
    "sl.lounge.t": "Outdoor lounge", "sl.lounge.p": "Зона отдыха у&nbsp;бассейна или в&nbsp;саду: шезлонги, дейбеды и&nbsp;низкая мебель для расслабленного сценария.",
    "sl.lounge.i1": "Шезлонги", "sl.lounge.i2": "Дейбеды", "sl.lounge.i3": "Столики", "sl.lounge.i4": "Outdoor-текстиль",
    "sl.lounge.cta": "Подобрать lounge-зону",
    "sl.reception.t": "Reception / Lobby", "sl.reception.p": "Первое впечатление гостя: мебель для ресепшн, ожидания и&nbsp;lounge-зон отелей и&nbsp;комплексов.",
    "sl.reception.i1": "Диваны для ожидания", "sl.reception.i2": "Кресла", "sl.reception.i3": "Столики", "sl.reception.i4": "Декор и&nbsp;текстиль",
    "sl.reception.cta": "Подобрать решение",
    "sl.restaurant.t": "Ресторанная зона", "sl.restaurant.p": "Посадочные места, барные стулья и&nbsp;мягкие зоны, которые выдерживают ежедневный поток гостей.",
    "sl.restaurant.i1": "Стулья", "sl.restaurant.i2": "Барные стулья", "sl.restaurant.i3": "Диваны", "sl.restaurant.i4": "Столы под заказ",
    "sl.restaurant.cta": "Подобрать решение",
    "sl.turnkey.t": "Полная комплектация объекта",
    "sl.turnkey.p": "Вилла, дом, отель или ресторан в&nbsp;единой стилистике: подбираем состав, адаптируем модели, производим, привозим и&nbsp;расставляем. Один подрядчик&nbsp;— один результат.",
    "sl.turnkey.li1": "Единый стиль всех пространств&nbsp;— от&nbsp;спальни до&nbsp;террасы",
    "sl.turnkey.li2": "Понятный график производства и&nbsp;поставки",
    "sl.turnkey.li3": "Доставка и&nbsp;расстановка на&nbsp;объекте",
    "sl.turnkey.cta": "Подобрать решение под мой объект",

    /* --- страница кастомизации --- */
    "cz.h1": "Кастомизация под ваш объект",
    "cz.sub": "Размеры, ткани, цвета, материалы и&nbsp;комплектация адаптируются под&nbsp;задачу пространства. Мы&nbsp;производитель&nbsp;— не&nbsp;склад готовых размеров.",
    "cz.what.h2": "Что можно изменить",
    "cz.w1": "Размеры: длина, ширина, высота", "cz.w2": "Ткани и&nbsp;фактуры обивки", "cz.w3": "Цвета и&nbsp;акценты",
    "cz.w4": "Оттенки дерева", "cz.w5": "Конфигурация модулей", "cz.w6": "Высота и&nbsp;мягкость посадки",
    "cz.w7": "Состав комплекта", "cz.w8": "Фурнитура", "cz.w9": "Материалы под&nbsp;indoor или outdoor",
    "cz.obj.h2": "Для каких объектов",
    "cz.o1": "Виллы", "cz.o2": "Дома и&nbsp;апартаменты", "cz.o3": "Отели",
    "cz.o4": "Рестораны", "cz.o5": "Outdoor-зоны", "cz.o6": "Дизайнерские проекты",
    "cz.how.h2": "Как проходит кастомизация",
    "cz.s1.t": "Запрос", "cz.s1.p": "Вы отправляете запрос: фото, план или референсы",
    "cz.s2.t": "Задача", "cz.s2.p": "Уточняем пространство, сценарий использования и&nbsp;сроки",
    "cz.s3.t": "Материалы", "cz.s3.p": "Подбираем дерево, ткани и&nbsp;отделки",
    "cz.s4.t": "Адаптация", "cz.s4.p": "Адаптируем модель под&nbsp;размеры и&nbsp;задачу",
    "cz.s5.t": "Расчёт", "cz.s5.p": "Готовим индивидуальный расчёт",
    "cz.s6.t": "Производство", "cz.s6.p": "Запускаем изделия в&nbsp;производство на&nbsp;Бали",
    "cz.cta": "Обсудить кастомную мебель", "cz.cta2": "Смотреть каталог",

    /* --- страница материалов --- */
    "mt.h1": "Материалы и производство на&nbsp;Бали",
    "mt.sub": "Создаём мебель с&nbsp;учётом дизайна, климата, ежедневного использования и&nbsp;долговечности.",
    "mt.wood.t": "Дерево",
    "mt.wood.p": "Основа большинства моделей&nbsp;— тик: плотная порода, которая живёт на&nbsp;улице и&nbsp;переносит влажность Бали. Для каркасов используем фанеру 18&nbsp;мм и&nbsp;HMR-панели&nbsp;— без тонких конструкций.",
    "mt.wood.t1": "Тик", "mt.wood.t2": "Фанера 18&nbsp;мм", "mt.wood.t3": "HMR-панели",
    "mt.fabric.t": "Ткани",
    "mt.fabric.p": "Подбираем фактуры под&nbsp;сценарий: мягкие&nbsp;— для спален и&nbsp;гостиных, износостойкие&nbsp;— для отелей и&nbsp;ресторанов, влагостойкие&nbsp;— для террас и&nbsp;бассейнов.",
    "mt.fabric.t1": "Indoor", "mt.fabric.t2": "Outdoor", "mt.fabric.t3": "Контрактные ткани",
    "mt.fill.t": "Наполнители",
    "mt.fill.p": "Мягкие элементы проектируются так, чтобы сохранять комфорт, форму и&nbsp;внешний вид&nbsp;— в&nbsp;том числе при&nbsp;ежедневной аренде и&nbsp;активной эксплуатации.",
    "mt.hw.t": "Фурнитура",
    "mt.hw.p": "Используем надёжные конструктивные решения и&nbsp;проверенную фурнитуру&nbsp;— чтобы мебель служила долго и&nbsp;оставалась удобной.",
    "mt.clim.t": "Влажность и&nbsp;outdoor",
    "mt.clim.p": "Материалы подбираются под&nbsp;условия эксплуатации: влажный климат, солнце, открытые террасы. Для outdoor-линейки&nbsp;— тик и&nbsp;влагостойкий текстиль.",
    "mt.qc.t": "Контроль качества",
    "mt.qc.p": "Производство&nbsp;— Джепара и&nbsp;локальные фабрики Бали. Каждое изделие проходит приёмку UNIT перед отправкой на&nbsp;объект: геометрия, отделка, швы, устойчивость.",
    "mt.cta.h2": "Расскажите про ваш объект",
    "mt.cta.p": "Подберём материалы и&nbsp;решения под&nbsp;климат, сценарий использования и&nbsp;бюджет.",

    /* --- страница проектов --- */
    "pj.h1": "Мебель в реальных объектах",
    "pj.sub": "UNIT.FURNITURE используется в&nbsp;жилых и&nbsp;коммерческих пространствах UNIT и&nbsp;частных проектах&nbsp;— мы&nbsp;видим, как мебель живёт в&nbsp;реальной эксплуатации, а&nbsp;не&nbsp;только на&nbsp;визуализациях.",
    "pj.cta.h2": "Похожий объект?",
    "pj.cta.p": "Подберём мебель для пространства такого&nbsp;же типа&nbsp;— от&nbsp;отдельных моделей до&nbsp;комплектации под&nbsp;ключ.",
    "pj.cta.b": "Подобрать мебель для похожего объекта",

    /* --- страница для дизайнеров --- */
    "dz.h1": "Производственный партнёр для дизайнеров и&nbsp;архитекторов на&nbsp;Бали",
    "dz.sub": "Изготавливаем мебель по&nbsp;моделям каталога, референсам, чертежам и&nbsp;задачам конкретного проекта. Вы&nbsp;ведёте интерьер&nbsp;— мы&nbsp;закрываем производство.",
    "dz.can.h2": "Что мы можем",
    "dz.c1": "Адаптировать модели каталога под&nbsp;интерьер",
    "dz.c2": "Производить по&nbsp;референсам и&nbsp;чертежам",
    "dz.c3": "Подбирать ткани и&nbsp;материалы под&nbsp;спецификацию",
    "dz.c4": "Комплектовать объект целиком",
    "dz.c5": "Работать с&nbsp;виллами, отелями и&nbsp;ресторанами",
    "dz.c6": "Готовить индивидуальные расчёты по&nbsp;позициям",
    "dz.band.h2": "Ваш проект&nbsp;— наше производство",
    "dz.band.p": "Используйте модели UNIT.FURNITURE в&nbsp;своих проектах, адаптируйте их&nbsp;под&nbsp;интерьер или присылайте чертежи индивидуальных решений. Производство&nbsp;— Джепара и&nbsp;локальные фабрики Бали, приёмка&nbsp;— UNIT.",
    "dz.band.cta1": "Стать партнёром", "dz.band.cta2": "Каталог для дизайнеров (PDF)",
    "dz.how.h2": "Как проходит работа",
    "dz.s1.t": "Бриф", "dz.s1.p": "Задача, референсы, чертежи, сроки",
    "dz.s2.t": "Подбор", "dz.s2.p": "Модели, материалы, ткани под&nbsp;проект",
    "dz.s3.t": "Согласование", "dz.s3.p": "Спецификация и&nbsp;детали изделий",
    "dz.s4.t": "Расчёт", "dz.s4.p": "Индивидуальный расчёт по&nbsp;позициям",
    "dz.s5.t": "Производство", "dz.s5.p": "Изготовление и&nbsp;контроль качества",
    "dz.s6.t": "Доставка", "dz.s6.p": "Поставка и&nbsp;расстановка на&nbsp;объекте",
    "dz.cta1": "Обсудить проект", "dz.cta2": "Связаться в WhatsApp",

    /* --- страница контактов и форма --- */
    "ct.h1": "Свяжитесь с нами",
    "ct.sub": "Подберём решение, рассчитаем стоимость и&nbsp;подготовим предложение. Можно отправить фото, план, референсы или выбранные модели.",
    "req.cart_label": "В заявке:",
    "f.name": "Имя*", "f.phone": "WhatsApp / Telegram*", "f.email": "Email",
    "f.object": "Тип объекта",
    "f.o.villa": "Вилла", "f.o.house": "Дом", "f.o.apt": "Апартаменты", "f.o.hotel": "Отель",
    "f.o.rest": "Ресторан", "f.o.outdoor": "Outdoor-зона", "f.o.design": "Дизайнерский проект",
    "f.topic": "Что нужно подобрать", "opt.all": "Комплектация объекта целиком", "opt.other": "Другое",
    "f.msg": "Сообщение", "f.msg_ph": "Например: вилла 3 спальни, нужны кровати и аутдор к декабрю",
    "f.file": "Фото / план / референсы",
    "f.agree_link": "Согласен на <a href=\"consent.html\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"color:inherit\">обработку персональных данных</a>",
    "f.submit": "Отправить запрос", "f.done": "Заявка отправлена. Ответим в&nbsp;ближайшее время.",

    /* --- корзина --- */
    "cart.title": "Корзина заявки",
    "cart.note": "Цен на&nbsp;сайте нет&nbsp;— посчитаем стоимость комплекта под&nbsp;ваш проект после заявки.",
    "cart.checkout": "Перейти к заявке", "cart.empty": "Пока пусто. Добавьте позиции из каталога.",

    /* --- футер и мобильная планка --- */
    "ft.desc": "Авторская мебель и&nbsp;интерьерные решения под&nbsp;ключ на&nbsp;Бали.",
    "ft.menu": "Меню", "ft.links": "Важные ссылки", "ft.catalog": "Скачать каталог (PDF)",
    "ft.pd": "Согласие на обработку ПД", "ft.legal": "Юр. информация о компании",
    "ft.lang": "Язык страницы", "ft.privacy": "Privacy Policy",
    "ft.line": "UNIT.FURNITURE&nbsp;— авторская мебель и&nbsp;интерьерные решения на&nbsp;Бали",
    "mob.cta": "Получить консультацию"
  },

  en: {
    /* --- navigation & header --- */
    "nav.catalog": "Catalog", "nav.solutions": "Solutions", "nav.custom": "Customization",
    "nav.projects": "Projects", "nav.designers": "For designers", "nav.contacts": "Contacts",
    "nav.materials": "Materials", "nav.cta": "Get a consultation",

    /* --- home: hero --- */
    "hero.title": "Signature furniture and&nbsp;interior solutions in&nbsp;Bali",
    "hero.sub": "We create furniture for villas, homes, hotels, restaurants and&nbsp;outdoor spaces. From&nbsp;a&nbsp;single model to&nbsp;full turnkey furnishing of&nbsp;a&nbsp;property.",
    "hero.cta1": "Get a consultation", "hero.cta2": "View catalog", "hero.scroll": "Scroll ↓",

    "mq.1": "In-house production", "mq.2": "Customized for&nbsp;your property",
    "mq.3": "Indoor / Outdoor / Commercial", "mq.4": "Teak and&nbsp;materials for&nbsp;the Bali climate",
    "mq.5": "10+ years in&nbsp;Bali", "mq.6": "Villa, hotel &amp; restaurant furnishing",

    /* --- home: directions --- */
    "dir.h2": "From single pieces to&nbsp;fully furnished spaces",
    "dir.lead": "Pick a&nbsp;ready model from&nbsp;the catalog&nbsp;— or&nbsp;let&nbsp;us furnish the whole property: bedroom, living room, terrace, restaurant, hotel or&nbsp;an&nbsp;entire villa.",
    "dir.1.t": "Home furniture", "dir.1.p": "Beds, sofas, armchairs, chairs and&nbsp;soft pieces for living spaces.",
    "dir.2.t": "Outdoor areas", "dir.2.p": "Loungers, outdoor sofas and&nbsp;furniture for terraces, pools and&nbsp;gardens.",
    "dir.3.t": "Commercial properties", "dir.3.p": "Solutions for hotels, restaurants, lobby, reception and&nbsp;lounge areas.",
    "dir.4.t": "Turnkey property", "dir.4.p": "Furnishing a&nbsp;villa, home, hotel or&nbsp;restaurant in&nbsp;a&nbsp;single style.",

    /* --- categories --- */
    "cats.h2": "Furniture catalog",
    "cats.lead": "Choose a&nbsp;category or&nbsp;send us a&nbsp;request&nbsp;— we'll help pick a&nbsp;solution for your property.",
    "cat.beds": "Beds", "cat.sofas": "Sofas", "cat.chairs": "Chairs &amp;&nbsp;armchairs",
    "cat.outdoor": "Outdoor", "cat.sunbeds": "Sunbeds", "cat.poufs": "Poufs",
    "cat.textile": "Pillows &amp;&nbsp;decor", "cat.commercial": "Commercial furniture", "cat.tables": "Tables",
    "cats.beds.n": "3 models", "cats.sofas.n": "6 models", "cats.chairs.n": "9 models",
    "cats.outdoor.n": "5 models", "cats.sunbeds.n": "2 models", "cats.poufs.n": "2 models",
    "cats.textile.n": "3 items", "cats.commercial.n": "2 models", "cats.tables.n": "made to order",

    /* --- home: solutions --- */
    "sol.h2": "Ready interior solutions",
    "sol.lead": "We assemble furniture for a&nbsp;specific space&nbsp;— from&nbsp;a&nbsp;bedroom to&nbsp;a&nbsp;fully furnished villa.",
    "sol.bedroom.t": "Bedroom", "sol.bedroom.p": "Bed, nightstands, armchair, pouf, textiles.",
    "sol.living.t": "Living room", "sol.living.p": "Sofa, armchairs, coffee table, soft elements.",
    "sol.terrace.t": "Outdoor area", "sol.terrace.p": "Sofas, loungers, side tables, cushions for the terrace and&nbsp;pool.",
    "sol.turnkey.t": "Turnkey property", "sol.turnkey.p": "Furnishing a&nbsp;villa, home, hotel or&nbsp;restaurant in&nbsp;a&nbsp;single style.",
    "sol.more": "View solution", "sol.flag": "UNIT format",
    "sol.cta": "Find a solution for my property",

    /* --- home: customization --- */
    "cust.h2": "Customized for your property",
    "cust.lead": "Sizes, fabrics, colors and&nbsp;set composition adapt to&nbsp;the task of&nbsp;the space.",
    "cust.hub.t": "Your property", "cust.hub.p": "An individual solution for a&nbsp;villa, home, hotel or&nbsp;restaurant.",
    "cust.size.t": "Sizes", "cust.size.p": "We adapt length, width, height, seat and&nbsp;configuration.",
    "cust.fabric.t": "Fabrics", "cust.fabric.p": "We select textures for indoor and&nbsp;outdoor spaces.",
    "cust.color.t": "Colors", "cust.color.p": "We choose wood tones, upholstery and&nbsp;accents.",
    "cust.set.t": "Set composition", "cust.set.p": "From a&nbsp;single model to&nbsp;a&nbsp;complete package.",
    "cust.cta": "Discuss customization",

    /* --- home: materials --- */
    "mat.h2": "Materials made for&nbsp;life in&nbsp;Bali",
    "mat.lead": "UNIT.FURNITURE is designed for humidity, sun, active use and&nbsp;the specifics of&nbsp;a&nbsp;tropical climate.",
    "mat.wood.t": "Wood", "mat.wood.p": "We select materials for the purpose of&nbsp;the piece and&nbsp;its&nbsp;operating conditions.",
    "mat.fabric.t": "Fabrics", "mat.fabric.p": "Textures for bedrooms, living rooms, terraces, hotels and&nbsp;restaurants.",
    "mat.fill.t": "Fillings", "mat.fill.p": "Soft elements are engineered to&nbsp;keep comfort and&nbsp;shape.",
    "mat.hw.t": "Hardware", "mat.hw.p": "Reliable structural solutions built for durability.",

    /* --- home: climate --- */
    "clim.h2": "Humidity and&nbsp;daily use",
    "clim.lead": "The furniture is designed for the Bali climate, outdoor areas and&nbsp;regular use in&nbsp;residential and&nbsp;commercial spaces.",
    "clim.1.t": "Humid climate", "clim.1.p": "Materials, finishes and&nbsp;structural solutions selected for humidity and&nbsp;temperature swings.",
    "clim.2.t": "Sun and&nbsp;outdoor", "clim.2.p": "For open areas we use solutions made for terraces, pools, gardens and&nbsp;everyday use.",
    "clim.3.t": "Regular use", "clim.3.p": "The furniture keeps its comfort, look and&nbsp;stability in&nbsp;homes, villas, hotels and&nbsp;restaurants.",
    "clim.tag1": "For homes", "clim.tag2": "For outdoor areas", "clim.tag3": "For commercial properties",

    /* --- projects --- */
    "proj.h2": "Furniture in real projects",
    "proj.lead": "Our pieces live in&nbsp;UNIT residential and&nbsp;commercial spaces&nbsp;— we&nbsp;see how the furniture behaves in&nbsp;real use, not&nbsp;only in&nbsp;renders.",
    "proj.f.all": "All", "proj.f.indoor": "Indoor", "proj.f.outdoor": "Outdoor",
    "proj.f.villas": "Villas", "proj.f.commercial": "Commercial",
    "proj.cta": "All projects",
    "proj.pr1.t": "Villa interior", "proj.pr1.p": "Living room: sofa, armchairs, decor",
    "proj.pr2.t": "Villa bedroom", "proj.pr2.p": "Bedroom: bed, textiles",
    "proj.pr3.t": "Villa terrace", "proj.pr3.p": "Outdoor sofas and side tables",
    "proj.pr4.t": "Poolside lounge", "proj.pr4.p": "Loungers by the pool",
    "proj.pr5.t": "Living room", "proj.pr5.p": "Soft zone: sofa, cushions",
    "proj.pr6.t": "Resort terrace", "proj.pr6.p": "Outdoor lounge for guests",
    "proj.pr7.t": "Reception", "proj.pr7.p": "Lobby: sofas and armchairs",
    "proj.pr8.t": "Restaurant", "proj.pr8.p": "Restaurant seating area",

    /* --- designers (home block) --- */
    "des.h2": "For designers and&nbsp;architects",
    "des.p": "We can be your production partner in&nbsp;Bali for interior projects, villas, hotels and&nbsp;commercial spaces: we&nbsp;adapt catalog models or&nbsp;produce furniture from&nbsp;your drawings, references and&nbsp;specifications.",
    "des.li1": "Work from references, drawings and&nbsp;specifications",
    "des.li2": "Adaptation of&nbsp;sizes, fabrics and&nbsp;materials to&nbsp;the project",
    "des.li3": "Property furnishing and&nbsp;individual quotes",
    "des.cta1": "Become a partner", "des.cta2": "Discuss a project",

    /* --- how to order --- */
    "steps.h2": "How to order",
    "steps.lead": "From the first request to&nbsp;furniture installed on&nbsp;site.",
    "steps.1.t": "Consultation", "steps.1.p": "We receive your request, photos, floor plan or&nbsp;selected models",
    "steps.2.t": "Selection", "steps.2.p": "We help choose furniture, materials and&nbsp;a&nbsp;solution for the property",
    "steps.3.t": "Quote", "steps.3.p": "We prepare an&nbsp;individual quote by&nbsp;models, materials and&nbsp;volume",
    "steps.4.t": "Production", "steps.4.p": "Once approved, we&nbsp;start production in&nbsp;Bali",
    "steps.5.t": "Delivery", "steps.5.p": "We arrange delivery and, if&nbsp;needed, installation on&nbsp;site",
    "steps.cta": "Get a quote",

    /* --- final CTA --- */
    "fin.h2": "Let's create furniture for your project",
    "fin.lead": "Contact us any convenient way&nbsp;— we'll pick a&nbsp;solution, quote it and&nbsp;prepare an&nbsp;offer.",
    "fin.qr": "Point your camera to open a WhatsApp chat",
    "fin.note": "Pricing is calculated individually. You can send photos, a&nbsp;floor plan, references or&nbsp;selected models.",

    /* --- catalog page --- */
    "clg.kicker": "Catalog", "clg.h1": "UNIT.FURNITURE catalog",
    "clg.sub": "Choose a&nbsp;model or&nbsp;send us a&nbsp;request&nbsp;— we'll help pick furniture for your property. No&nbsp;prices on&nbsp;the site on&nbsp;purpose: every set is priced by&nbsp;volume and&nbsp;project.",
    "tab.all": "All", "clg.filters": "Filters",
    "clg.env.all": "Indoor & Outdoor",
    "clg.use.all": "Any property", "clg.use.home": "Home / apartment", "clg.use.villa": "Villa",
    "clg.use.hotel": "Hotel", "clg.use.restaurant": "Restaurant",
    "clg.empty": "No ready models under these filters&nbsp;— we'll make them to&nbsp;order. Tell us what you're looking for.",
    "clg.cta.h2": "Didn't find the right model?",
    "clg.cta.p": "We'll produce furniture to&nbsp;your sizes, references or&nbsp;drawings&nbsp;— from&nbsp;a&nbsp;single piece to&nbsp;a&nbsp;full property set.",
    "clg.cta.b1": "Request pricing", "clg.cta.b2": "About customization",

    /* --- product cards --- */
    "p.price": "Price on request", "p.more": "Details →", "p.dims_unknown": "Size on request",
    "p.request": "Request price", "p.in_request": "In request ✓",
    "badge.teak": "Teak",
    "tag.indoor": "Indoor", "tag.outdoor": "Outdoor", "tag.custom": "Custom size", "tag.fabric": "Fabric options",
    "use.home": "Home", "use.villa": "Villa", "use.hotel": "Hotel", "use.restaurant": "Restaurant",

    /* --- product page --- */
    "crumb.home": "Home",
    "qv.dims": "Dimensions (H×W×D)",
    "pp.price": "Pricing is calculated individually on&nbsp;request.",
    "pp.consult": "Get a consultation",
    "pp.custom.t": "Customization",
    "pp.custom.p": "Size, fabric, wood tone and&nbsp;set composition can be&nbsp;changed for your property. Tell us about the task and&nbsp;we'll suggest options.",
    "pp.similar": "Similar models",
    "d.beds": "A UNIT bed: 18&nbsp;mm plywood frame, HMR and&nbsp;teak headboards. Size and&nbsp;upholstery adapt to&nbsp;a&nbsp;villa, home or&nbsp;hotel room.",
    "d.sofas": "A UNIT sofa for living rooms, receptions and&nbsp;lounge areas. Fabric, size and&nbsp;seat are selected for the space and&nbsp;usage scenario.",
    "d.chairs": "Armchairs, chairs and&nbsp;poufs in&nbsp;teak and&nbsp;metal&nbsp;— dining, bar and&nbsp;lounge. Made in&nbsp;Jepara.",
    "d.outdoor": "An outdoor model in&nbsp;teak with water-resistant textile: made for sun, rain and&nbsp;daily poolside use.",
    "d.textile": "Decorative pillows and&nbsp;textiles matching UNIT models&nbsp;— for a&nbsp;finished interior.",

    /* --- solutions page --- */
    "sl.h1": "Ready interior solutions",
    "sl.sub": "We assemble furniture for a&nbsp;specific space&nbsp;— from a&nbsp;bedroom to&nbsp;a&nbsp;fully furnished villa, hotel or&nbsp;restaurant. Every solution adapts by&nbsp;sizes, fabrics and&nbsp;composition.",
    "sl.includes": "May include:",
    "sl.bedroom.t": "Bedroom", "sl.bedroom.p": "A ready solution for a&nbsp;villa, home, apartment or&nbsp;hotel room.",
    "sl.bedroom.i1": "Bed", "sl.bedroom.i2": "Nightstands", "sl.bedroom.i3": "Armchair",
    "sl.bedroom.i4": "Pouf", "sl.bedroom.i5": "Textiles", "sl.bedroom.i6": "Decorative pillows",
    "sl.bedroom.cta": "Get a bedroom set",
    "sl.living.t": "Living room", "sl.living.p": "A soft zone for living and&nbsp;hosting&nbsp;— in&nbsp;one style with the rest of&nbsp;the space.",
    "sl.living.i1": "Sofa", "sl.living.i2": "Armchairs", "sl.living.i3": "Coffee table",
    "sl.living.i4": "Soft elements", "sl.living.i5": "Decorative pillows",
    "sl.living.cta": "Get a living room set",
    "sl.terrace.t": "Terrace", "sl.terrace.p": "Outdoor furniture for the terrace and&nbsp;pool area&nbsp;— made for sun, humidity and&nbsp;daily use.",
    "sl.terrace.i1": "Outdoor sofas", "sl.terrace.i2": "Side tables", "sl.terrace.i3": "Outdoor cushions", "sl.terrace.i4": "Armchairs",
    "sl.terrace.cta": "Get a terrace set",
    "sl.lounge.t": "Outdoor lounge", "sl.lounge.p": "A rest area by&nbsp;the pool or&nbsp;in&nbsp;the garden: loungers, daybeds and&nbsp;low furniture for a&nbsp;relaxed scenario.",
    "sl.lounge.i1": "Loungers", "sl.lounge.i2": "Daybeds", "sl.lounge.i3": "Side tables", "sl.lounge.i4": "Outdoor textiles",
    "sl.lounge.cta": "Get a lounge set",
    "sl.reception.t": "Reception / Lobby", "sl.reception.p": "The guest's first impression: furniture for reception, waiting and&nbsp;lounge areas of&nbsp;hotels and&nbsp;complexes.",
    "sl.reception.i1": "Waiting sofas", "sl.reception.i2": "Armchairs", "sl.reception.i3": "Side tables", "sl.reception.i4": "Decor and&nbsp;textiles",
    "sl.reception.cta": "Get a solution",
    "sl.restaurant.t": "Restaurant area", "sl.restaurant.p": "Seating, bar stools and&nbsp;soft zones that withstand a&nbsp;daily flow of&nbsp;guests.",
    "sl.restaurant.i1": "Chairs", "sl.restaurant.i2": "Bar stools", "sl.restaurant.i3": "Sofas", "sl.restaurant.i4": "Tables to order",
    "sl.restaurant.cta": "Get a solution",
    "sl.turnkey.t": "Full property furnishing",
    "sl.turnkey.p": "A villa, home, hotel or&nbsp;restaurant in&nbsp;a&nbsp;single style: we&nbsp;select the set, adapt the models, produce, deliver and&nbsp;install. One contractor&nbsp;— one result.",
    "sl.turnkey.li1": "One style across all spaces&nbsp;— from bedroom to&nbsp;terrace",
    "sl.turnkey.li2": "A clear production and&nbsp;delivery schedule",
    "sl.turnkey.li3": "Delivery and&nbsp;installation on&nbsp;site",
    "sl.turnkey.cta": "Find a solution for my property",

    /* --- customization page --- */
    "cz.h1": "Customized for your property",
    "cz.sub": "Sizes, fabrics, colors, materials and&nbsp;set composition adapt to&nbsp;the task of&nbsp;the space. We&nbsp;are a&nbsp;manufacturer&nbsp;— not a&nbsp;warehouse of&nbsp;fixed sizes.",
    "cz.what.h2": "What can be changed",
    "cz.w1": "Sizes: length, width, height", "cz.w2": "Upholstery fabrics and&nbsp;textures", "cz.w3": "Colors and&nbsp;accents",
    "cz.w4": "Wood tones", "cz.w5": "Module configuration", "cz.w6": "Seat height and&nbsp;softness",
    "cz.w7": "Set composition", "cz.w8": "Hardware", "cz.w9": "Indoor or&nbsp;outdoor materials",
    "cz.obj.h2": "For which properties",
    "cz.o1": "Villas", "cz.o2": "Homes and&nbsp;apartments", "cz.o3": "Hotels",
    "cz.o4": "Restaurants", "cz.o5": "Outdoor areas", "cz.o6": "Design projects",
    "cz.how.h2": "How customization works",
    "cz.s1.t": "Request", "cz.s1.p": "You send a&nbsp;request: photos, a&nbsp;plan or&nbsp;references",
    "cz.s2.t": "Task", "cz.s2.p": "We clarify the space, usage scenario and&nbsp;timeline",
    "cz.s3.t": "Materials", "cz.s3.p": "We select wood, fabrics and&nbsp;finishes",
    "cz.s4.t": "Adaptation", "cz.s4.p": "We adapt the model to&nbsp;sizes and&nbsp;the task",
    "cz.s5.t": "Quote", "cz.s5.p": "We prepare an&nbsp;individual quote",
    "cz.s6.t": "Production", "cz.s6.p": "We start production in&nbsp;Bali",
    "cz.cta": "Discuss custom furniture", "cz.cta2": "View catalog",

    /* --- materials page --- */
    "mt.h1": "Materials and production in&nbsp;Bali",
    "mt.sub": "We create furniture with design, climate, daily use and&nbsp;durability in&nbsp;mind.",
    "mt.wood.t": "Wood",
    "mt.wood.p": "Most models are based on&nbsp;teak: a&nbsp;dense species that lives outdoors and&nbsp;withstands Bali humidity. Frames use 18&nbsp;mm plywood and&nbsp;HMR panels&nbsp;— no&nbsp;thin structures.",
    "mt.wood.t1": "Teak", "mt.wood.t2": "18&nbsp;mm plywood", "mt.wood.t3": "HMR panels",
    "mt.fabric.t": "Fabrics",
    "mt.fabric.p": "Textures are selected per&nbsp;scenario: soft&nbsp;— for bedrooms and&nbsp;living rooms, heavy-duty&nbsp;— for hotels and&nbsp;restaurants, water-resistant&nbsp;— for terraces and&nbsp;pools.",
    "mt.fabric.t1": "Indoor", "mt.fabric.t2": "Outdoor", "mt.fabric.t3": "Contract fabrics",
    "mt.fill.t": "Fillings",
    "mt.fill.p": "Soft elements are engineered to&nbsp;keep comfort, shape and&nbsp;look&nbsp;— including daily rental turnover and&nbsp;active use.",
    "mt.hw.t": "Hardware",
    "mt.hw.p": "Reliable structural solutions and&nbsp;proven hardware&nbsp;— so&nbsp;the furniture lasts and&nbsp;stays comfortable.",
    "mt.clim.t": "Humidity and&nbsp;outdoor",
    "mt.clim.p": "Materials are chosen for the operating conditions: humid climate, sun, open terraces. The outdoor line uses teak and&nbsp;water-resistant textile.",
    "mt.qc.t": "Quality control",
    "mt.qc.p": "Production&nbsp;— Jepara and&nbsp;local Bali workshops. Every piece passes UNIT acceptance before shipping: geometry, finish, seams, stability.",
    "mt.cta.h2": "Tell us about your property",
    "mt.cta.p": "We'll select materials and&nbsp;solutions for the climate, usage scenario and&nbsp;budget.",

    /* --- projects page --- */
    "pj.h1": "Furniture in real properties",
    "pj.sub": "UNIT.FURNITURE lives in&nbsp;UNIT residential and&nbsp;commercial spaces and&nbsp;private projects&nbsp;— we&nbsp;see how the furniture behaves in&nbsp;real use, not&nbsp;only in&nbsp;renders.",
    "pj.cta.h2": "A similar property?",
    "pj.cta.p": "We'll pick furniture for the same type of&nbsp;space&nbsp;— from single models to&nbsp;turnkey furnishing.",
    "pj.cta.b": "Pick furniture for a similar property",

    /* --- designers page --- */
    "dz.h1": "A production partner for designers and&nbsp;architects in&nbsp;Bali",
    "dz.sub": "We produce furniture from catalog models, references, drawings and&nbsp;the tasks of&nbsp;a&nbsp;specific project. You&nbsp;lead the interior&nbsp;— we&nbsp;cover production.",
    "dz.can.h2": "What we can do",
    "dz.c1": "Adapt catalog models to&nbsp;the interior",
    "dz.c2": "Produce from references and&nbsp;drawings",
    "dz.c3": "Select fabrics and&nbsp;materials per&nbsp;specification",
    "dz.c4": "Furnish the whole property",
    "dz.c5": "Work with villas, hotels and&nbsp;restaurants",
    "dz.c6": "Prepare individual quotes per&nbsp;item",
    "dz.band.h2": "Your project&nbsp;— our production",
    "dz.band.p": "Use UNIT.FURNITURE models in&nbsp;your projects, adapt them to&nbsp;the interior or&nbsp;send drawings of&nbsp;individual pieces. Production&nbsp;— Jepara and&nbsp;local Bali workshops, acceptance&nbsp;— UNIT.",
    "dz.band.cta1": "Become a partner", "dz.band.cta2": "Catalog for designers (PDF)",
    "dz.how.h2": "How we work",
    "dz.s1.t": "Brief", "dz.s1.p": "Task, references, drawings, timeline",
    "dz.s2.t": "Selection", "dz.s2.p": "Models, materials, fabrics for the project",
    "dz.s3.t": "Approval", "dz.s3.p": "Specification and&nbsp;piece details",
    "dz.s4.t": "Quote", "dz.s4.p": "Individual quote per&nbsp;item",
    "dz.s5.t": "Production", "dz.s5.p": "Manufacturing and&nbsp;quality control",
    "dz.s6.t": "Delivery", "dz.s6.p": "Shipping and&nbsp;installation on&nbsp;site",
    "dz.cta1": "Discuss a project", "dz.cta2": "Message us on WhatsApp",

    /* --- contacts page & form --- */
    "ct.h1": "Contact us",
    "ct.sub": "We'll pick a&nbsp;solution, quote it and&nbsp;prepare an&nbsp;offer. You can send photos, a&nbsp;floor plan, references or&nbsp;selected models.",
    "req.cart_label": "In your request:",
    "f.name": "Name*", "f.phone": "WhatsApp / Telegram*", "f.email": "Email",
    "f.object": "Property type",
    "f.o.villa": "Villa", "f.o.house": "House", "f.o.apt": "Apartment", "f.o.hotel": "Hotel",
    "f.o.rest": "Restaurant", "f.o.outdoor": "Outdoor area", "f.o.design": "Design project",
    "f.topic": "What to select", "opt.all": "Full property furnishing", "opt.other": "Other",
    "f.msg": "Message", "f.msg_ph": "E.g. 3-bedroom villa, need beds and outdoor by December",
    "f.file": "Photos / plan / references",
    "f.agree_link": "I agree to <a href=\"consent.html\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"color:inherit\">personal data processing</a>",
    "f.submit": "Send request", "f.done": "Request sent. We'll get back to&nbsp;you shortly.",

    /* --- cart --- */
    "cart.title": "Request cart",
    "cart.note": "There are no&nbsp;prices on&nbsp;the site&nbsp;— we'll quote the set for your project after the request.",
    "cart.checkout": "Go to request", "cart.empty": "Empty so far. Add items from the catalog.",

    /* --- footer & mobile bar --- */
    "ft.desc": "Signature furniture and&nbsp;turnkey interior solutions in&nbsp;Bali.",
    "ft.menu": "Menu", "ft.links": "Important links", "ft.catalog": "Download catalog (PDF)",
    "ft.pd": "Personal data consent", "ft.legal": "Company legal information",
    "ft.lang": "Page language", "ft.privacy": "Privacy Policy",
    "ft.line": "UNIT.FURNITURE&nbsp;— signature furniture and&nbsp;interior solutions in&nbsp;Bali",
    "mob.cta": "Get a consultation"
  }
};

/* Каталог: перевод спек-ключей и типовых значений (имена собственные не переводятся) */
window.SPEC_TR = {
  keys: {
    'Изголовье': 'Headboard', 'Каркас': 'Frame', 'Цвет': 'Color', 'Производство': 'Made in',
    'Ножки': 'Legs', 'Тип': 'Type', 'Назначение': 'Purpose', 'Варианты': 'Options'
  },
  values: {
    'HMR 18 мм, орех': 'HMR 18 mm, walnut', 'Фанера 18 мм': '18 mm plywood',
    'Серый': 'Grey', 'IDEFAB, Бали': 'IDEFAB, Bali', 'Китай': 'China', 'Металл': 'Metal',
    'Светлый': 'Light', 'Графитовый': 'Graphite', 'Коричневый': 'Brown', 'Угловой': 'Corner',
    'Ресепшн, ресторан': 'Reception, restaurant', 'Угловой, модульный': 'Corner, modular',
    'Тиковое дерево': 'Teak wood', 'Джепара': 'Jepara', 'Синий': 'Blue', 'Тёмно-серый': 'Dark grey',
    'A — оранжевый, B — тёмный': 'A — orange, B — dark',
    'A — серый меланж, B — графит': 'A — grey melange, B — graphite',
    'A — синий, B — серый': 'A — blue, B — grey'
  }
};
window.CAT_LABEL_KEY = {
  beds: 'cat.beds', sofas: 'cat.sofas', chairs: 'cat.chairs', outdoor: 'cat.outdoor',
  textile: 'cat.textile', sunbeds: 'cat.sunbeds', poufs: 'cat.poufs',
  commercial: 'cat.commercial', tables: 'cat.tables'
};
window.NAME_SUFFIX_TR = {
  '· пуф': '· pouf', '· барный': '· bar', '· оттоманка': '· ottoman',
  '· дейбед': '· daybed', '· шезлонг': '· lounger', '· угловой': '· corner'
};

window.setLang = function (lang) {
  const dict = window.I18N[lang] || window.I18N.ru;
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] != null) el.innerHTML = dict[key];
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (dict[key] != null) el.placeholder = dict[key];
  });
  document.querySelectorAll('[data-lang]').forEach(b => {
    b.classList.toggle('is-active', b.dataset.lang === lang);
  });
  window.__uf_lang = lang;
  try { localStorage.setItem('uf_lang', lang); } catch (e) {}
  if (window.__uf_onLangChange) window.__uf_onLangChange(lang);
};
