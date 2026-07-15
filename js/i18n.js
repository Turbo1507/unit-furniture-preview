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
    "hero.title": "Авторская мебель и интерьерные решения на Бали",
    "hero.sub": "Создаём мебель для вилл, домов, отелей, ресторанов и outdoor-пространств. От отдельной модели до полной комплектации объекта под ключ.",
    "hero.cta1": "Получить консультацию", "hero.cta2": "Смотреть каталог", "hero.scroll": "Листайте ↓",
    "hero.badge1": "Собственное производство", "hero.badge2": "Кастомизация", "hero.badge3": "Indoor · Outdoor · Commercial",

    "mq.1": "Собственное производство", "mq.2": "Кастомизация под объект",
    "mq.3": "Indoor / Outdoor / Commercial", "mq.4": "Тик и материалы для климата Бали",
    "mq.5": "10+ лет на Бали", "mq.6": "Комплектация вилл, отелей и ресторанов",

    /* --- главная: направления --- */
    "dir.h2": "От отдельных предметов до полной комплектации пространства",
    "dir.lead": "Вы можете выбрать готовую модель из каталога или доверить нам подбор мебели под весь объект: спальню, гостиную, террасу, ресторан, отель или виллу целиком.",
    "dir.1.t": "Мебель для дома", "dir.1.p": "Кровати, диваны, кресла, стулья и мягкие элементы для жилых пространств.",
    "dir.2.t": "Outdoor-зоны", "dir.2.p": "Шезлонги, уличные диваны и мебель для террас, бассейнов и садов.",
    "dir.3.t": "Коммерческие объекты", "dir.3.p": "Решения для отелей, ресторанов, lobby, reception и lounge-пространств.",
    "dir.4.t": "Объект под ключ", "dir.4.p": "Комплектация виллы, дома, отеля или ресторана в единой стилистике.",

    /* --- категории --- */
    "cats.h2": "Каталог мебели",
    "cats.lead": "Выберите категорию или отправьте нам запрос — поможем подобрать решение под ваш объект.",
    "cat.beds": "Кровати", "cat.sofas": "Диваны", "cat.chairs": "Кресла и стулья",
    "cat.outdoor": "Аутдор", "cat.sunbeds": "Шезлонги", "cat.poufs": "Пуфы",
    "cat.textile": "Подушки и декор", "cat.commercial": "Коммерческая мебель", "cat.tables": "Столы",
    "cats.beds.n": "3 модели", "cats.sofas.n": "6 моделей", "cats.chairs.n": "9 моделей",
    "cats.outdoor.n": "5 моделей", "cats.sunbeds.n": "2 модели", "cats.poufs.n": "2 модели",
    "cats.textile.n": "3 позиции", "cats.commercial.n": "2 модели", "cats.tables.n": "под заказ",

    /* --- главная: решения --- */
    "sol.h2": "Готовые интерьерные решения",
    "sol.lead": "Собираем мебель под конкретное пространство — от спальни до полной комплектации виллы.",
    "sol.bedroom.t": "Спальня", "sol.bedroom.p": "Кровать, тумбы, кресло, пуф, текстиль.",
    "sol.living.t": "Гостиная", "sol.living.p": "Диван, кресла, журнальный стол, мягкие элементы.",
    "sol.terrace.t": "Outdoor-зона", "sol.terrace.p": "Диваны, шезлонги, столики, подушки для террасы и бассейна.",
    "sol.turnkey.t": "Объект под ключ", "sol.turnkey.p": "Комплектация виллы, дома, отеля или ресторана в едином стиле.",
    "sol.more": "Смотреть решение", "sol.flag": "Формат UNIT",
    "sol.cta": "Подобрать решение под мой объект",

    /* --- главная: кастомизация --- */
    "cust.h2": "Кастомизация под ваш объект",
    "cust.lead": "Размеры, ткани, цвета и комплектация адаптируются под задачу пространства.",
    "cust.hub.t": "Ваш объект", "cust.hub.p": "Индивидуальное решение для виллы, дома, отеля или ресторана.",
    "cust.size.t": "Размеры", "cust.size.p": "Адаптируем длину, ширину, высоту, посадку и конфигурацию.",
    "cust.fabric.t": "Ткани", "cust.fabric.p": "Подбираем фактуры для indoor и outdoor-пространств.",
    "cust.color.t": "Цвета", "cust.color.p": "Выбираем оттенки дерева, обивки и акцентов.",
    "cust.set.t": "Комплектация", "cust.set.p": "Собираем решение от отдельной модели до полного пакета.",
    "cust.cta": "Обсудить кастомизацию",

    /* --- главная: материалы --- */
    "mat.h2": "Материалы, рассчитанные на жизнь на Бали",
    "mat.lead": "Мебель UNIT.FURNITURE создаётся с учётом влажности, солнца, активного использования и особенностей тропического климата.",
    "mat.wood.t": "Дерево", "mat.wood.p": "Подбираем материалы с учётом назначения изделия и условий эксплуатации.",
    "mat.fabric.t": "Ткани", "mat.fabric.p": "Выбираем фактуры для спален, гостиных, террас, отелей и ресторанов.",
    "mat.fill.t": "Наполнители", "mat.fill.p": "Мягкие элементы проектируются так, чтобы сохранять комфорт и форму.",
    "mat.hw.t": "Фурнитура", "mat.hw.p": "Используем надёжные конструктивные решения для долговечности.",

    /* --- главная: влажность --- */
    "clim.h2": "Влажность и эксплуатация",
    "clim.lead": "Мебель создаётся с учётом климата Бали, outdoor-зон и регулярного использования в жилых и коммерческих пространствах.",
    "clim.1.t": "Влажный климат", "clim.1.p": "Подбираем материалы, отделки и конструктивные решения с учётом влажности и перепадов температуры.",
    "clim.2.t": "Солнце и outdoor", "clim.2.p": "Для открытых зон используем решения, рассчитанные на террасы, бассейны, сады и ежедневную эксплуатацию.",
    "clim.3.t": "Регулярное использование", "clim.3.p": "Мебель сохраняет комфорт, внешний вид и устойчивость при использовании в домах, виллах, отелях и ресторанах.",
    "clim.tag1": "Для дома", "clim.tag2": "Для outdoor-зон", "clim.tag3": "Для коммерческих объектов",

    /* --- проекты --- */
    "proj.h2": "Мебель в реальных проектах",
    "proj.lead": "Наши изделия используются в жилых и коммерческих пространствах UNIT — мы видим, как мебель ведёт себя не только на визуализациях, но и в реальной эксплуатации.",
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
    "des.h2": "Для дизайнеров и архитекторов",
    "des.p": "Мы можем стать производственным партнёром на Бали для интерьерных проектов, вилл, отелей и коммерческих пространств: адаптируем модели каталога или изготовим мебель по вашим чертежам, референсам и спецификациям.",
    "des.li1": "Работа по референсам, чертежам и спецификациям",
    "des.li2": "Адаптация размеров, тканей и материалов под проект",
    "des.li3": "Комплектация объекта и индивидуальный расчёт",
    "des.cta1": "Стать партнёром", "des.cta2": "Обсудить проект",

    /* --- как заказать --- */
    "steps.h2": "Как заказать",
    "steps.lead": "От первого запроса до готовой мебели на объекте.",
    "steps.1.t": "Консультация", "steps.1.p": "Получаем ваш запрос, фото, план помещения или выбранные модели",
    "steps.2.t": "Подбор", "steps.2.p": "Помогаем выбрать мебель, материалы и решение под объект",
    "steps.3.t": "Расчёт", "steps.3.p": "Готовим индивидуальный расчёт по моделям, материалам и объёму",
    "steps.4.t": "Производство", "steps.4.p": "После согласования запускаем изделия в производство на Бали",
    "steps.5.t": "Доставка", "steps.5.p": "Организуем доставку и, при необходимости, установку на объекте",
    "steps.cta": "Получить расчёт",

    /* --- финальный CTA --- */
    "fin.h2": "Давайте создадим мебель для вашего проекта",
    "fin.lead": "Свяжитесь с нами удобным способом — подберём решение, рассчитаем стоимость и подготовим предложение.",
    "fin.qr": "Наведите камеру, чтобы открыть чат WhatsApp",
    "fin.note": "Стоимость рассчитывается индивидуально. Можно отправить фото, план, референсы или выбранные модели.",

    /* --- страница каталога --- */
    "clg.kicker": "Каталог", "clg.h1": "Каталог UNIT.FURNITURE",
    "clg.sub": "Выберите модель или отправьте нам запрос — поможем подобрать мебель под ваш объект. Цен на сайте нет намеренно: каждый комплект считаем под объём и проект.",
    "tab.all": "Все", "clg.filters": "Фильтры",
    "clg.env.all": "Indoor и Outdoor",
    "clg.use.all": "Любой объект", "clg.use.home": "Дом / апартаменты", "clg.use.villa": "Вилла",
    "clg.use.hotel": "Отель", "clg.use.restaurant": "Ресторан",
    "clg.empty": "Под эти фильтры готовых моделей нет — изготовим под заказ. Напишите нам, что ищете.",
    "clg.cta.h2": "Не нашли нужную модель?",
    "clg.cta.p": "Изготовим мебель по вашим размерам, референсам или чертежам — от отдельного предмета до комплекта на весь объект.",
    "clg.cta.b1": "Запросить стоимость", "clg.cta.b2": "Про кастомизацию",
    "bento.custom.t": "Кастомизация", "bento.custom.p": "Размер, ткань и цвет под ваш объект", "bento.custom.link": "Подробнее →",
    "bento.stat.t": "лет на Бали", "bento.stat.p": "Собственное производство",
    "bento.pdf.t": "PDF-каталог", "bento.pdf.p": "Полный список моделей и характеристик", "bento.pdf.link": "Скачать →",
    "mt.bento.made.t": "Джепара + Бали", "mt.bento.made.p": "Собственное производство",
    "mt.bento.stat.t": "группы материалов", "mt.bento.stat.p": "Дерево, ткани, наполнители, фурнитура",
    "pj.bento.cat.p": "Все модели по категориям",
    "pj.bento.stat.t": "реализованных пространств", "pj.bento.stat.p": "Виллы и коммерческие объекты",
    "pj.bento.des.p": "Работаете над проектом клиента?",

    /* --- карточки товара --- */
    "p.price": "Цена по запросу", "p.more": "Подробнее →", "p.dims_unknown": "Размеры по запросу",
    "p.request": "Запросить стоимость", "p.in_request": "В заявке ✓",
    "badge.teak": "Тик",
    "tag.indoor": "Indoor", "tag.outdoor": "Outdoor", "tag.custom": "Custom size", "tag.fabric": "Fabric options",
    "use.home": "Дом", "use.villa": "Вилла", "use.hotel": "Отель", "use.restaurant": "Ресторан",

    /* --- страница товара --- */
    "crumb.home": "Главная",
    "qv.dims": "Размеры (В×Ш×Г)",
    "pp.price": "Стоимость рассчитывается индивидуально по запросу.",
    "pp.consult": "Получить консультацию",
    "pp.custom.t": "Кастомизация",
    "pp.custom.p": "Можно изменить размер, ткань, оттенок дерева и комплектацию — под ваш объект. Расскажите о задаче, и мы предложим варианты.",
    "pp.similar": "Похожие модели",
    "d.beds": "Кровать UNIT: каркас из фанеры 18 мм, изголовья HMR и тик. Размер и обивку адаптируем под спальню виллы, дома или отельного номера.",
    "d.sofas": "Диван UNIT для гостиных, ресепшн и lounge-зон. Ткань, размер и посадку подбираем под пространство и сценарий использования.",
    "d.chairs": "Кресла, стулья и пуфы из тика и металла — обеденные, барные и лаунж. Производство — Джепара.",
    "d.outdoor": "Outdoor-модель из тика с влагостойким текстилем: рассчитана на солнце, дожди и ежедневное использование у бассейна.",
    "d.textile": "Декоративные подушки и текстиль под модели UNIT — для завершённого интерьера.",

    /* --- страница решений --- */
    "sl.h1": "Готовые интерьерные решения",
    "sl.sub": "Собираем мебель под конкретное пространство — от спальни до полной комплектации виллы, отеля или ресторана. Каждое решение адаптируется по размерам, тканям и составу.",
    "sl.includes": "Может включать:",
    "sl.bedroom.t": "Спальня", "sl.bedroom.p": "Готовое решение для виллы, дома, апартаментов или отельного номера.",
    "sl.bedroom.i1": "Кровать", "sl.bedroom.i2": "Тумбы", "sl.bedroom.i3": "Кресло",
    "sl.bedroom.i4": "Пуф", "sl.bedroom.i5": "Текстиль", "sl.bedroom.i6": "Декоративные подушки",
    "sl.bedroom.cta": "Подобрать спальню",
    "sl.living.t": "Гостиная", "sl.living.p": "Мягкая зона для жизни и приёма гостей — в едином стиле с остальным пространством.",
    "sl.living.i1": "Диван", "sl.living.i2": "Кресла", "sl.living.i3": "Журнальный стол",
    "sl.living.i4": "Мягкие элементы", "sl.living.i5": "Декоративные подушки",
    "sl.living.cta": "Подобрать гостиную",
    "sl.terrace.t": "Терраса", "sl.terrace.p": "Outdoor-мебель для террасы и зоны у бассейна — рассчитана на солнце, влажность и ежедневное использование.",
    "sl.terrace.i1": "Outdoor-диваны", "sl.terrace.i2": "Столики", "sl.terrace.i3": "Подушки для улицы", "sl.terrace.i4": "Кресла",
    "sl.terrace.cta": "Подобрать террасу",
    "sl.lounge.t": "Outdoor lounge", "sl.lounge.p": "Зона отдыха у бассейна или в саду: шезлонги, дейбеды и низкая мебель для расслабленного сценария.",
    "sl.lounge.i1": "Шезлонги", "sl.lounge.i2": "Дейбеды", "sl.lounge.i3": "Столики", "sl.lounge.i4": "Outdoor-текстиль",
    "sl.lounge.cta": "Подобрать lounge-зону",
    "sl.reception.t": "Reception / Lobby", "sl.reception.p": "Первое впечатление гостя: мебель для ресепшн, ожидания и lounge-зон отелей и комплексов.",
    "sl.reception.i1": "Диваны для ожидания", "sl.reception.i2": "Кресла", "sl.reception.i3": "Столики", "sl.reception.i4": "Декор и текстиль",
    "sl.reception.cta": "Подобрать решение",
    "sl.restaurant.t": "Ресторанная зона", "sl.restaurant.p": "Посадочные места, барные стулья и мягкие зоны, которые выдерживают ежедневный поток гостей.",
    "sl.restaurant.i1": "Стулья", "sl.restaurant.i2": "Барные стулья", "sl.restaurant.i3": "Диваны", "sl.restaurant.i4": "Столы под заказ",
    "sl.restaurant.cta": "Подобрать решение",
    "sl.turnkey.t": "Полная комплектация объекта",
    "sl.turnkey.p": "Вилла, дом, отель или ресторан в единой стилистике: подбираем состав, адаптируем модели, производим, привозим и расставляем. Один подрядчик — один результат.",
    "sl.turnkey.li1": "Единый стиль всех пространств — от спальни до террасы",
    "sl.turnkey.li2": "Понятный график производства и поставки",
    "sl.turnkey.li3": "Доставка и расстановка на объекте",
    "sl.turnkey.cta": "Подобрать решение под мой объект",

    /* --- страница кастомизации --- */
    "cz.h1": "Кастомизация под ваш объект",
    "cz.sub": "Размеры, ткани, цвета, материалы и комплектация адаптируются под задачу пространства. Мы производитель — не склад готовых размеров.",
    "cz.what.h2": "Что можно изменить",
    "cz.w1": "Размеры: длина, ширина, высота", "cz.w2": "Ткани и фактуры обивки", "cz.w3": "Цвета и акценты",
    "cz.w4": "Оттенки дерева", "cz.w5": "Конфигурация модулей", "cz.w6": "Высота и мягкость посадки",
    "cz.w7": "Состав комплекта", "cz.w8": "Фурнитура", "cz.w9": "Материалы под indoor или outdoor",
    "cz.obj.h2": "Для каких объектов",
    "cz.o1": "Виллы", "cz.o2": "Дома и апартаменты", "cz.o3": "Отели",
    "cz.o4": "Рестораны", "cz.o5": "Outdoor-зоны", "cz.o6": "Дизайнерские проекты",
    "cz.how.h2": "Как проходит кастомизация",
    "cz.s1.t": "Запрос", "cz.s1.p": "Вы отправляете запрос: фото, план или референсы",
    "cz.s2.t": "Задача", "cz.s2.p": "Уточняем пространство, сценарий использования и сроки",
    "cz.s3.t": "Материалы", "cz.s3.p": "Подбираем дерево, ткани и отделки",
    "cz.s4.t": "Адаптация", "cz.s4.p": "Адаптируем модель под размеры и задачу",
    "cz.s5.t": "Расчёт", "cz.s5.p": "Готовим индивидуальный расчёт",
    "cz.s6.t": "Производство", "cz.s6.p": "Запускаем изделия в производство на Бали",
    "cz.cta": "Обсудить кастомную мебель", "cz.cta2": "Смотреть каталог",

    /* --- страница материалов --- */
    "mt.h1": "Материалы и производство на Бали",
    "mt.sub": "Создаём мебель с учётом дизайна, климата, ежедневного использования и долговечности.",
    "mt.wood.t": "Дерево",
    "mt.wood.p": "Основа большинства моделей — тик: плотная порода, которая живёт на улице и переносит влажность Бали. Для каркасов используем фанеру 18 мм и HMR-панели — без тонких конструкций.",
    "mt.wood.t1": "Тик", "mt.wood.t2": "Фанера 18 мм", "mt.wood.t3": "HMR-панели",
    "mt.fabric.t": "Ткани",
    "mt.fabric.p": "Подбираем фактуры под сценарий: мягкие — для спален и гостиных, износостойкие — для отелей и ресторанов, влагостойкие — для террас и бассейнов.",
    "mt.fabric.t1": "Indoor", "mt.fabric.t2": "Outdoor", "mt.fabric.t3": "Контрактные ткани",
    "mt.fill.t": "Наполнители",
    "mt.fill.p": "Мягкие элементы проектируются так, чтобы сохранять комфорт, форму и внешний вид — в том числе при ежедневной аренде и активной эксплуатации.",
    "mt.hw.t": "Фурнитура",
    "mt.hw.p": "Используем надёжные конструктивные решения и проверенную фурнитуру — чтобы мебель служила долго и оставалась удобной.",
    "mt.clim.t": "Влажность и outdoor",
    "mt.clim.p": "Материалы подбираются под условия эксплуатации: влажный климат, солнце, открытые террасы. Для outdoor-линейки — тик и влагостойкий текстиль.",
    "mt.qc.t": "Контроль качества",
    "mt.qc.p": "Производство — Джепара и локальные фабрики Бали. Каждое изделие проходит приёмку UNIT перед отправкой на объект: геометрия, отделка, швы, устойчивость.",
    "mt.cta.h2": "Расскажите про ваш объект",
    "mt.cta.p": "Подберём материалы и решения под климат, сценарий использования и бюджет.",

    /* --- страница проектов --- */
    "pj.h1": "Мебель в реальных объектах",
    "pj.sub": "UNIT.FURNITURE используется в жилых и коммерческих пространствах UNIT и частных проектах — мы видим, как мебель живёт в реальной эксплуатации, а не только на визуализациях.",
    "pj.cta.h2": "Похожий объект?",
    "pj.cta.p": "Подберём мебель для пространства такого же типа — от отдельных моделей до комплектации под ключ.",
    "pj.cta.b": "Подобрать мебель для похожего объекта",

    /* --- страница для дизайнеров --- */
    "dz.h1": "Производственный партнёр для дизайнеров и архитекторов на Бали",
    "dz.sub": "Изготавливаем мебель по моделям каталога, референсам, чертежам и задачам конкретного проекта. Вы ведёте интерьер — мы закрываем производство.",
    "dz.can.h2": "Что мы можем",
    "dz.c1": "Адаптировать модели каталога под интерьер",
    "dz.c2": "Производить по референсам и чертежам",
    "dz.c3": "Подбирать ткани и материалы под спецификацию",
    "dz.c4": "Комплектовать объект целиком",
    "dz.c5": "Работать с виллами, отелями и ресторанами",
    "dz.c6": "Готовить индивидуальные расчёты по позициям",
    "dz.band.h2": "Ваш проект — наше производство",
    "dz.band.p": "Используйте модели UNIT.FURNITURE в своих проектах, адаптируйте их под интерьер или присылайте чертежи индивидуальных решений. Производство — Джепара и локальные фабрики Бали, приёмка — UNIT.",
    "dz.band.cta1": "Стать партнёром", "dz.band.cta2": "Каталог для дизайнеров (PDF)",
    "dz.how.h2": "Как проходит работа",
    "dz.s1.t": "Бриф", "dz.s1.p": "Задача, референсы, чертежи, сроки",
    "dz.s2.t": "Подбор", "dz.s2.p": "Модели, материалы, ткани под проект",
    "dz.s3.t": "Согласование", "dz.s3.p": "Спецификация и детали изделий",
    "dz.s4.t": "Расчёт", "dz.s4.p": "Индивидуальный расчёт по позициям",
    "dz.s5.t": "Производство", "dz.s5.p": "Изготовление и контроль качества",
    "dz.s6.t": "Доставка", "dz.s6.p": "Поставка и расстановка на объекте",
    "dz.cta1": "Обсудить проект", "dz.cta2": "Связаться в WhatsApp",

    /* --- страница контактов и форма --- */
    "ct.h1": "Свяжитесь с нами",
    "ct.sub": "Подберём решение, рассчитаем стоимость и подготовим предложение. Можно отправить фото, план, референсы или выбранные модели.",
    "req.cart_label": "В заявке:",
    "f.name": "Имя*", "f.phone": "WhatsApp / Telegram*", "f.email": "Email",
    "f.object": "Тип объекта",
    "f.o.villa": "Вилла", "f.o.house": "Дом", "f.o.apt": "Апартаменты", "f.o.hotel": "Отель",
    "f.o.rest": "Ресторан", "f.o.outdoor": "Outdoor-зона", "f.o.design": "Дизайнерский проект",
    "f.topic": "Что нужно подобрать", "opt.all": "Комплектация объекта целиком", "opt.other": "Другое",
    "f.msg": "Сообщение", "f.msg_ph": "Например: вилла 3 спальни, нужны кровати и аутдор к декабрю",
    "f.file": "Фото / план / референсы",
    "f.agree_link": "Согласен на <a href=\"consent.html\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"color:inherit\">обработку персональных данных</a>",
    "f.submit": "Отправить запрос", "f.done": "Заявка отправлена. Ответим в ближайшее время.",

    /* --- корзина --- */
    "cart.title": "Корзина заявки",
    "cart.note": "Цен на сайте нет — посчитаем стоимость комплекта под ваш проект после заявки.",
    "cart.checkout": "Перейти к заявке", "cart.empty": "Пока пусто. Добавьте позиции из каталога.",

    /* --- футер и мобильная планка --- */
    "ft.desc": "Авторская мебель и интерьерные решения под ключ на Бали.",
    "ft.menu": "Меню", "ft.links": "Важные ссылки", "ft.catalog": "Скачать каталог (PDF)",
    "ft.pd": "Согласие на обработку ПД", "ft.legal": "Юр. информация о компании",
    "ft.lang": "Язык страницы", "ft.privacy": "Privacy Policy",
    "ft.line": "UNIT.FURNITURE — авторская мебель и интерьерные решения на Бали",
    "mob.cta": "Получить консультацию"
  },

  en: {
    /* --- navigation & header --- */
    "nav.catalog": "Catalog", "nav.solutions": "Solutions", "nav.custom": "Customization",
    "nav.projects": "Projects", "nav.designers": "For designers", "nav.contacts": "Contacts",
    "nav.materials": "Materials", "nav.cta": "Get a consultation",

    /* --- home: hero --- */
    "hero.title": "Signature furniture and interior solutions in Bali",
    "hero.sub": "We create furniture for villas, homes, hotels, restaurants and outdoor spaces. From a single model to full turnkey furnishing of a property.",
    "hero.cta1": "Get a consultation", "hero.cta2": "View catalog", "hero.scroll": "Scroll ↓",
    "hero.badge1": "In-house production", "hero.badge2": "Customization", "hero.badge3": "Indoor · Outdoor · Commercial",

    "mq.1": "In-house production", "mq.2": "Customized for your property",
    "mq.3": "Indoor / Outdoor / Commercial", "mq.4": "Teak and materials for the Bali climate",
    "mq.5": "10+ years in Bali", "mq.6": "Villa, hotel &amp; restaurant furnishing",

    /* --- home: directions --- */
    "dir.h2": "From single pieces to fully furnished spaces",
    "dir.lead": "Pick a ready model from the catalog — or let us furnish the whole property: bedroom, living room, terrace, restaurant, hotel or an entire villa.",
    "dir.1.t": "Home furniture", "dir.1.p": "Beds, sofas, armchairs, chairs and soft pieces for living spaces.",
    "dir.2.t": "Outdoor areas", "dir.2.p": "Loungers, outdoor sofas and furniture for terraces, pools and gardens.",
    "dir.3.t": "Commercial properties", "dir.3.p": "Solutions for hotels, restaurants, lobby, reception and lounge areas.",
    "dir.4.t": "Turnkey property", "dir.4.p": "Furnishing a villa, home, hotel or restaurant in a single style.",

    /* --- categories --- */
    "cats.h2": "Furniture catalog",
    "cats.lead": "Choose a category or send us a request — we'll help pick a solution for your property.",
    "cat.beds": "Beds", "cat.sofas": "Sofas", "cat.chairs": "Chairs &amp; armchairs",
    "cat.outdoor": "Outdoor", "cat.sunbeds": "Sunbeds", "cat.poufs": "Poufs",
    "cat.textile": "Pillows &amp; decor", "cat.commercial": "Commercial furniture", "cat.tables": "Tables",
    "cats.beds.n": "3 models", "cats.sofas.n": "6 models", "cats.chairs.n": "9 models",
    "cats.outdoor.n": "5 models", "cats.sunbeds.n": "2 models", "cats.poufs.n": "2 models",
    "cats.textile.n": "3 items", "cats.commercial.n": "2 models", "cats.tables.n": "made to order",

    /* --- home: solutions --- */
    "sol.h2": "Ready interior solutions",
    "sol.lead": "We assemble furniture for a specific space — from a bedroom to a fully furnished villa.",
    "sol.bedroom.t": "Bedroom", "sol.bedroom.p": "Bed, nightstands, armchair, pouf, textiles.",
    "sol.living.t": "Living room", "sol.living.p": "Sofa, armchairs, coffee table, soft elements.",
    "sol.terrace.t": "Outdoor area", "sol.terrace.p": "Sofas, loungers, side tables, cushions for the terrace and pool.",
    "sol.turnkey.t": "Turnkey property", "sol.turnkey.p": "Furnishing a villa, home, hotel or restaurant in a single style.",
    "sol.more": "View solution", "sol.flag": "UNIT format",
    "sol.cta": "Find a solution for my property",

    /* --- home: customization --- */
    "cust.h2": "Customized for your property",
    "cust.lead": "Sizes, fabrics, colors and set composition adapt to the task of the space.",
    "cust.hub.t": "Your property", "cust.hub.p": "An individual solution for a villa, home, hotel or restaurant.",
    "cust.size.t": "Sizes", "cust.size.p": "We adapt length, width, height, seat and configuration.",
    "cust.fabric.t": "Fabrics", "cust.fabric.p": "We select textures for indoor and outdoor spaces.",
    "cust.color.t": "Colors", "cust.color.p": "We choose wood tones, upholstery and accents.",
    "cust.set.t": "Set composition", "cust.set.p": "From a single model to a complete package.",
    "cust.cta": "Discuss customization",

    /* --- home: materials --- */
    "mat.h2": "Materials made for life in Bali",
    "mat.lead": "UNIT.FURNITURE is designed for humidity, sun, active use and the specifics of a tropical climate.",
    "mat.wood.t": "Wood", "mat.wood.p": "We select materials for the purpose of the piece and its operating conditions.",
    "mat.fabric.t": "Fabrics", "mat.fabric.p": "Textures for bedrooms, living rooms, terraces, hotels and restaurants.",
    "mat.fill.t": "Fillings", "mat.fill.p": "Soft elements are engineered to keep comfort and shape.",
    "mat.hw.t": "Hardware", "mat.hw.p": "Reliable structural solutions built for durability.",

    /* --- home: climate --- */
    "clim.h2": "Humidity and daily use",
    "clim.lead": "The furniture is designed for the Bali climate, outdoor areas and regular use in residential and commercial spaces.",
    "clim.1.t": "Humid climate", "clim.1.p": "Materials, finishes and structural solutions selected for humidity and temperature swings.",
    "clim.2.t": "Sun and outdoor", "clim.2.p": "For open areas we use solutions made for terraces, pools, gardens and everyday use.",
    "clim.3.t": "Regular use", "clim.3.p": "The furniture keeps its comfort, look and stability in homes, villas, hotels and restaurants.",
    "clim.tag1": "For homes", "clim.tag2": "For outdoor areas", "clim.tag3": "For commercial properties",

    /* --- projects --- */
    "proj.h2": "Furniture in real projects",
    "proj.lead": "Our pieces live in UNIT residential and commercial spaces — we see how the furniture behaves in real use, not only in renders.",
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
    "des.h2": "For designers and architects",
    "des.p": "We can be your production partner in Bali for interior projects, villas, hotels and commercial spaces: we adapt catalog models or produce furniture from your drawings, references and specifications.",
    "des.li1": "Work from references, drawings and specifications",
    "des.li2": "Adaptation of sizes, fabrics and materials to the project",
    "des.li3": "Property furnishing and individual quotes",
    "des.cta1": "Become a partner", "des.cta2": "Discuss a project",

    /* --- how to order --- */
    "steps.h2": "How to order",
    "steps.lead": "From the first request to furniture installed on site.",
    "steps.1.t": "Consultation", "steps.1.p": "We receive your request, photos, floor plan or selected models",
    "steps.2.t": "Selection", "steps.2.p": "We help choose furniture, materials and a solution for the property",
    "steps.3.t": "Quote", "steps.3.p": "We prepare an individual quote by models, materials and volume",
    "steps.4.t": "Production", "steps.4.p": "Once approved, we start production in Bali",
    "steps.5.t": "Delivery", "steps.5.p": "We arrange delivery and, if needed, installation on site",
    "steps.cta": "Get a quote",

    /* --- final CTA --- */
    "fin.h2": "Let's create furniture for your project",
    "fin.lead": "Contact us any convenient way — we'll pick a solution, quote it and prepare an offer.",
    "fin.qr": "Point your camera to open a WhatsApp chat",
    "fin.note": "Pricing is calculated individually. You can send photos, a floor plan, references or selected models.",

    /* --- catalog page --- */
    "clg.kicker": "Catalog", "clg.h1": "UNIT.FURNITURE catalog",
    "clg.sub": "Choose a model or send us a request — we'll help pick furniture for your property. No prices on the site on purpose: every set is priced by volume and project.",
    "tab.all": "All", "clg.filters": "Filters",
    "clg.env.all": "Indoor & Outdoor",
    "clg.use.all": "Any property", "clg.use.home": "Home / apartment", "clg.use.villa": "Villa",
    "clg.use.hotel": "Hotel", "clg.use.restaurant": "Restaurant",
    "clg.empty": "No ready models under these filters — we'll make them to order. Tell us what you're looking for.",
    "clg.cta.h2": "Didn't find the right model?",
    "clg.cta.p": "We'll produce furniture to your sizes, references or drawings — from a single piece to a full property set.",
    "clg.cta.b1": "Request pricing", "clg.cta.b2": "About customization",
    "bento.custom.t": "Customization", "bento.custom.p": "Size, fabric and color for your property", "bento.custom.link": "Learn more →",
    "bento.stat.t": "years in Bali", "bento.stat.p": "In-house production",
    "bento.pdf.t": "PDF catalog", "bento.pdf.p": "Full list of models and specifications", "bento.pdf.link": "Download →",
    "mt.bento.made.t": "Jepara + Bali", "mt.bento.made.p": "In-house production",
    "mt.bento.stat.t": "material groups", "mt.bento.stat.p": "Wood, fabrics, fillings, hardware",
    "pj.bento.cat.p": "All models by category",
    "pj.bento.stat.t": "completed spaces", "pj.bento.stat.p": "Villas and commercial properties",
    "pj.bento.des.p": "Working on a client project?",

    /* --- product cards --- */
    "p.price": "Price on request", "p.more": "Details →", "p.dims_unknown": "Size on request",
    "p.request": "Request price", "p.in_request": "In request ✓",
    "badge.teak": "Teak",
    "tag.indoor": "Indoor", "tag.outdoor": "Outdoor", "tag.custom": "Custom size", "tag.fabric": "Fabric options",
    "use.home": "Home", "use.villa": "Villa", "use.hotel": "Hotel", "use.restaurant": "Restaurant",

    /* --- product page --- */
    "crumb.home": "Home",
    "qv.dims": "Dimensions (H×W×D)",
    "pp.price": "Pricing is calculated individually on request.",
    "pp.consult": "Get a consultation",
    "pp.custom.t": "Customization",
    "pp.custom.p": "Size, fabric, wood tone and set composition can be changed for your property. Tell us about the task and we'll suggest options.",
    "pp.similar": "Similar models",
    "d.beds": "A UNIT bed: 18 mm plywood frame, HMR and teak headboards. Size and upholstery adapt to a villa, home or hotel room.",
    "d.sofas": "A UNIT sofa for living rooms, receptions and lounge areas. Fabric, size and seat are selected for the space and usage scenario.",
    "d.chairs": "Armchairs, chairs and poufs in teak and metal — dining, bar and lounge. Made in Jepara.",
    "d.outdoor": "An outdoor model in teak with water-resistant textile: made for sun, rain and daily poolside use.",
    "d.textile": "Decorative pillows and textiles matching UNIT models — for a finished interior.",

    /* --- solutions page --- */
    "sl.h1": "Ready interior solutions",
    "sl.sub": "We assemble furniture for a specific space — from a bedroom to a fully furnished villa, hotel or restaurant. Every solution adapts by sizes, fabrics and composition.",
    "sl.includes": "May include:",
    "sl.bedroom.t": "Bedroom", "sl.bedroom.p": "A ready solution for a villa, home, apartment or hotel room.",
    "sl.bedroom.i1": "Bed", "sl.bedroom.i2": "Nightstands", "sl.bedroom.i3": "Armchair",
    "sl.bedroom.i4": "Pouf", "sl.bedroom.i5": "Textiles", "sl.bedroom.i6": "Decorative pillows",
    "sl.bedroom.cta": "Get a bedroom set",
    "sl.living.t": "Living room", "sl.living.p": "A soft zone for living and hosting — in one style with the rest of the space.",
    "sl.living.i1": "Sofa", "sl.living.i2": "Armchairs", "sl.living.i3": "Coffee table",
    "sl.living.i4": "Soft elements", "sl.living.i5": "Decorative pillows",
    "sl.living.cta": "Get a living room set",
    "sl.terrace.t": "Terrace", "sl.terrace.p": "Outdoor furniture for the terrace and pool area — made for sun, humidity and daily use.",
    "sl.terrace.i1": "Outdoor sofas", "sl.terrace.i2": "Side tables", "sl.terrace.i3": "Outdoor cushions", "sl.terrace.i4": "Armchairs",
    "sl.terrace.cta": "Get a terrace set",
    "sl.lounge.t": "Outdoor lounge", "sl.lounge.p": "A rest area by the pool or in the garden: loungers, daybeds and low furniture for a relaxed scenario.",
    "sl.lounge.i1": "Loungers", "sl.lounge.i2": "Daybeds", "sl.lounge.i3": "Side tables", "sl.lounge.i4": "Outdoor textiles",
    "sl.lounge.cta": "Get a lounge set",
    "sl.reception.t": "Reception / Lobby", "sl.reception.p": "The guest's first impression: furniture for reception, waiting and lounge areas of hotels and complexes.",
    "sl.reception.i1": "Waiting sofas", "sl.reception.i2": "Armchairs", "sl.reception.i3": "Side tables", "sl.reception.i4": "Decor and textiles",
    "sl.reception.cta": "Get a solution",
    "sl.restaurant.t": "Restaurant area", "sl.restaurant.p": "Seating, bar stools and soft zones that withstand a daily flow of guests.",
    "sl.restaurant.i1": "Chairs", "sl.restaurant.i2": "Bar stools", "sl.restaurant.i3": "Sofas", "sl.restaurant.i4": "Tables to order",
    "sl.restaurant.cta": "Get a solution",
    "sl.turnkey.t": "Full property furnishing",
    "sl.turnkey.p": "A villa, home, hotel or restaurant in a single style: we select the set, adapt the models, produce, deliver and install. One contractor — one result.",
    "sl.turnkey.li1": "One style across all spaces — from bedroom to terrace",
    "sl.turnkey.li2": "A clear production and delivery schedule",
    "sl.turnkey.li3": "Delivery and installation on site",
    "sl.turnkey.cta": "Find a solution for my property",

    /* --- customization page --- */
    "cz.h1": "Customized for your property",
    "cz.sub": "Sizes, fabrics, colors, materials and set composition adapt to the task of the space. We are a manufacturer — not a warehouse of fixed sizes.",
    "cz.what.h2": "What can be changed",
    "cz.w1": "Sizes: length, width, height", "cz.w2": "Upholstery fabrics and textures", "cz.w3": "Colors and accents",
    "cz.w4": "Wood tones", "cz.w5": "Module configuration", "cz.w6": "Seat height and softness",
    "cz.w7": "Set composition", "cz.w8": "Hardware", "cz.w9": "Indoor or outdoor materials",
    "cz.obj.h2": "For which properties",
    "cz.o1": "Villas", "cz.o2": "Homes and apartments", "cz.o3": "Hotels",
    "cz.o4": "Restaurants", "cz.o5": "Outdoor areas", "cz.o6": "Design projects",
    "cz.how.h2": "How customization works",
    "cz.s1.t": "Request", "cz.s1.p": "You send a request: photos, a plan or references",
    "cz.s2.t": "Task", "cz.s2.p": "We clarify the space, usage scenario and timeline",
    "cz.s3.t": "Materials", "cz.s3.p": "We select wood, fabrics and finishes",
    "cz.s4.t": "Adaptation", "cz.s4.p": "We adapt the model to sizes and the task",
    "cz.s5.t": "Quote", "cz.s5.p": "We prepare an individual quote",
    "cz.s6.t": "Production", "cz.s6.p": "We start production in Bali",
    "cz.cta": "Discuss custom furniture", "cz.cta2": "View catalog",

    /* --- materials page --- */
    "mt.h1": "Materials and production in Bali",
    "mt.sub": "We create furniture with design, climate, daily use and durability in mind.",
    "mt.wood.t": "Wood",
    "mt.wood.p": "Most models are based on teak: a dense species that lives outdoors and withstands Bali humidity. Frames use 18 mm plywood and HMR panels — no thin structures.",
    "mt.wood.t1": "Teak", "mt.wood.t2": "18 mm plywood", "mt.wood.t3": "HMR panels",
    "mt.fabric.t": "Fabrics",
    "mt.fabric.p": "Textures are selected per scenario: soft — for bedrooms and living rooms, heavy-duty — for hotels and restaurants, water-resistant — for terraces and pools.",
    "mt.fabric.t1": "Indoor", "mt.fabric.t2": "Outdoor", "mt.fabric.t3": "Contract fabrics",
    "mt.fill.t": "Fillings",
    "mt.fill.p": "Soft elements are engineered to keep comfort, shape and look — including daily rental turnover and active use.",
    "mt.hw.t": "Hardware",
    "mt.hw.p": "Reliable structural solutions and proven hardware — so the furniture lasts and stays comfortable.",
    "mt.clim.t": "Humidity and outdoor",
    "mt.clim.p": "Materials are chosen for the operating conditions: humid climate, sun, open terraces. The outdoor line uses teak and water-resistant textile.",
    "mt.qc.t": "Quality control",
    "mt.qc.p": "Production — Jepara and local Bali workshops. Every piece passes UNIT acceptance before shipping: geometry, finish, seams, stability.",
    "mt.cta.h2": "Tell us about your property",
    "mt.cta.p": "We'll select materials and solutions for the climate, usage scenario and budget.",

    /* --- projects page --- */
    "pj.h1": "Furniture in real properties",
    "pj.sub": "UNIT.FURNITURE lives in UNIT residential and commercial spaces and private projects — we see how the furniture behaves in real use, not only in renders.",
    "pj.cta.h2": "A similar property?",
    "pj.cta.p": "We'll pick furniture for the same type of space — from single models to turnkey furnishing.",
    "pj.cta.b": "Pick furniture for a similar property",

    /* --- designers page --- */
    "dz.h1": "A production partner for designers and architects in Bali",
    "dz.sub": "We produce furniture from catalog models, references, drawings and the tasks of a specific project. You lead the interior — we cover production.",
    "dz.can.h2": "What we can do",
    "dz.c1": "Adapt catalog models to the interior",
    "dz.c2": "Produce from references and drawings",
    "dz.c3": "Select fabrics and materials per specification",
    "dz.c4": "Furnish the whole property",
    "dz.c5": "Work with villas, hotels and restaurants",
    "dz.c6": "Prepare individual quotes per item",
    "dz.band.h2": "Your project — our production",
    "dz.band.p": "Use UNIT.FURNITURE models in your projects, adapt them to the interior or send drawings of individual pieces. Production — Jepara and local Bali workshops, acceptance — UNIT.",
    "dz.band.cta1": "Become a partner", "dz.band.cta2": "Catalog for designers (PDF)",
    "dz.how.h2": "How we work",
    "dz.s1.t": "Brief", "dz.s1.p": "Task, references, drawings, timeline",
    "dz.s2.t": "Selection", "dz.s2.p": "Models, materials, fabrics for the project",
    "dz.s3.t": "Approval", "dz.s3.p": "Specification and piece details",
    "dz.s4.t": "Quote", "dz.s4.p": "Individual quote per item",
    "dz.s5.t": "Production", "dz.s5.p": "Manufacturing and quality control",
    "dz.s6.t": "Delivery", "dz.s6.p": "Shipping and installation on site",
    "dz.cta1": "Discuss a project", "dz.cta2": "Message us on WhatsApp",

    /* --- contacts page & form --- */
    "ct.h1": "Contact us",
    "ct.sub": "We'll pick a solution, quote it and prepare an offer. You can send photos, a floor plan, references or selected models.",
    "req.cart_label": "In your request:",
    "f.name": "Name*", "f.phone": "WhatsApp / Telegram*", "f.email": "Email",
    "f.object": "Property type",
    "f.o.villa": "Villa", "f.o.house": "House", "f.o.apt": "Apartment", "f.o.hotel": "Hotel",
    "f.o.rest": "Restaurant", "f.o.outdoor": "Outdoor area", "f.o.design": "Design project",
    "f.topic": "What to select", "opt.all": "Full property furnishing", "opt.other": "Other",
    "f.msg": "Message", "f.msg_ph": "E.g. 3-bedroom villa, need beds and outdoor by December",
    "f.file": "Photos / plan / references",
    "f.agree_link": "I agree to <a href=\"consent.html\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"color:inherit\">personal data processing</a>",
    "f.submit": "Send request", "f.done": "Request sent. We'll get back to you shortly.",

    /* --- cart --- */
    "cart.title": "Request cart",
    "cart.note": "There are no prices on the site — we'll quote the set for your project after the request.",
    "cart.checkout": "Go to request", "cart.empty": "Empty so far. Add items from the catalog.",

    /* --- footer & mobile bar --- */
    "ft.desc": "Signature furniture and turnkey interior solutions in Bali.",
    "ft.menu": "Menu", "ft.links": "Important links", "ft.catalog": "Download catalog (PDF)",
    "ft.pd": "Personal data consent", "ft.legal": "Company legal information",
    "ft.lang": "Page language", "ft.privacy": "Privacy Policy",
    "ft.line": "UNIT.FURNITURE — signature furniture and interior solutions in Bali",
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
