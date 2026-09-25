import type { IconName } from "./components/Icon";

/* ------------------------------------------------------------------ brand */
export const BRAND = {
  name: "Avalin Cargo",
  full: "Avalin Express Cargo",
  version: "v1.2.0",
  logo: "/img/avalin-mark.webp",
  mark: "/img/avalin-mark.webp",
  banner: "/img/avalin-full.webp",
  navy: "#16244F",
  gold: "#E5B03C",
};

/* ------------------------------------------------------------------ user */
export const DEFAULT_USER = {
  name: "",
  firstName: "",
  lastName: "",
  phone: "",
  code: "AV3647",
  gender: "male" as "male" | "female",
  avatar: "",
};

export const WAREHOUSE = {
  contact: "AV3647",
  phone: "13626696998",
  address: "浙江省 金华市义乌市福田街道\n下骆宅村紫金三区21栋5单元\n#AV3647号",
};

/* ---------------------------------------------------------- marketplaces */
export type Marketplace = {
  id: string;
  name: string;
  logo: string;
  url: string;
};

/* official app icons (App Store) */
export const MARKETPLACES: Marketplace[] = [
  { id: "pinduoduo", name: "Pinduoduo", logo: "/img/mp/pinduoduo.png?v=3", url: "https://mobile.yangkeduo.com" },
  { id: "1688", name: "1688", logo: "/img/mp/1688.jpg", url: "https://m.1688.com" },
  { id: "taobao", name: "Taobao", logo: "/img/mp/taobao.jpg", url: "https://m.taobao.com" },
  { id: "poizon", name: "Poizon", logo: "/img/mp/poizon.jpg", url: "https://www.dewu.com" },
];

/* --------------------------------------------------------------- tariffs */
export const TARIFFS = {
  weight: [{ from: 0, price: 2.5 }],
  volume: [{ from: 0, price: 240 }],
};

/* ---------------------------------------------------------------- orders */
export type OrderStatus =
  | "waiting"
  | "china"
  | "transit"
  | "customs"
  | "dushanbe"
  | "sorted"
  | "ready"
  | "done";

export const IN_TRANSIT: OrderStatus[] = ["china", "transit", "customs", "dushanbe", "sorted"];

export const STATUS_FLOW: OrderStatus[] = [
  "waiting",
  "china",
  "transit",
  "customs",
  "dushanbe",
  "sorted",
  "ready",
  "done",
];

export const STATUS_META: Record<
  OrderStatus,
  { key: string; icon: IconName; color: string; bg: string }
> = {
  waiting: { key: "st_waiting", icon: "clock", color: "#8C93A8", bg: "var(--gray-50)" },
  china: { key: "st_china", icon: "box", color: "#2448C8", bg: "var(--blue-50)" },
  transit: { key: "st_transit", icon: "clock", color: "#F5A524", bg: "var(--amber-50)" },
  customs: { key: "st_customs", icon: "shield", color: "#8B5CF6", bg: "var(--purple-50)" },
  dushanbe: { key: "st_dushanbe", icon: "pin", color: "#12B5A8", bg: "var(--teal-50)" },
  sorted: { key: "st_sorted", icon: "inbox", color: "#2448C8", bg: "var(--blue-50)" },
  ready: { key: "st_ready", icon: "box", color: "#2448C8", bg: "var(--blue-50)" },
  done: { key: "st_done", icon: "checkCircle", color: "#34B37E", bg: "var(--green-50)" },
};

export type Order = {
  id: string;
  track: string;
  title: string;
  status: OrderStatus;
  paid: boolean;
  weight: number;
  volume: number;
  price: number;
  createdAt: string;
  history: { status: OrderStatus; date: string }[];
};

const h = (list: [OrderStatus, string][]) => list.map(([status, date]) => ({ status, date }));

export const MOCK_ORDERS: Order[] = [
  {
    id: "o1",
    track: "AV7712398452",
    title: "Кроссовки Nike Air",
    status: "ready",
    paid: false,
    weight: 1.8,
    volume: 0.012,
    price: 45,
    createdAt: "02.09.2026",
    history: h([
      ["waiting", "02.09.2026"],
      ["china", "04.09.2026"],
      ["transit", "06.09.2026"],
      ["customs", "11.09.2026"],
      ["dushanbe", "13.09.2026"],
      ["sorted", "14.09.2026"],
      ["ready", "15.09.2026"],
    ]),
  },
  {
    id: "o2",
    track: "AV7712400193",
    title: "Чехлы для телефонов, 20 шт",
    status: "ready",
    paid: true,
    weight: 3.4,
    volume: 0.02,
    price: 85,
    createdAt: "29.08.2026",
    history: h([
      ["waiting", "29.08.2026"],
      ["china", "31.08.2026"],
      ["transit", "03.09.2026"],
      ["customs", "09.09.2026"],
      ["dushanbe", "12.09.2026"],
      ["sorted", "13.09.2026"],
      ["ready", "14.09.2026"],
    ]),
  },
  {
    id: "o3",
    track: "AV7712415560",
    title: "Куртка зимняя",
    status: "sorted",
    paid: false,
    weight: 2.2,
    volume: 0.03,
    price: 55,
    createdAt: "05.09.2026",
    history: h([
      ["waiting", "05.09.2026"],
      ["china", "07.09.2026"],
      ["transit", "09.09.2026"],
      ["customs", "14.09.2026"],
      ["dushanbe", "16.09.2026"],
      ["sorted", "17.09.2026"],
    ]),
  },
  {
    id: "o4",
    track: "AV7712433871",
    title: "Смарт-часы Xiaomi",
    status: "dushanbe",
    paid: false,
    weight: 0.6,
    volume: 0.004,
    price: 15,
    createdAt: "07.09.2026",
    history: h([
      ["waiting", "07.09.2026"],
      ["china", "08.09.2026"],
      ["transit", "10.09.2026"],
      ["customs", "15.09.2026"],
      ["dushanbe", "17.09.2026"],
    ]),
  },
  {
    id: "o5",
    track: "AV7712441002",
    title: "Запчасти для авто",
    status: "customs",
    paid: false,
    weight: 12.5,
    volume: 0.08,
    price: 312,
    createdAt: "09.09.2026",
    history: h([
      ["waiting", "09.09.2026"],
      ["china", "10.09.2026"],
      ["transit", "12.09.2026"],
      ["customs", "16.09.2026"],
    ]),
  },
  {
    id: "o6",
    track: "AV7712450318",
    title: "Постельное бельё",
    status: "transit",
    paid: false,
    weight: 5.1,
    volume: 0.06,
    price: 128,
    createdAt: "11.09.2026",
    history: h([
      ["waiting", "11.09.2026"],
      ["china", "12.09.2026"],
      ["transit", "14.09.2026"],
    ]),
  },
  {
    id: "o7",
    track: "AV7712466745",
    title: "Игрушки детские",
    status: "transit",
    paid: false,
    weight: 4.0,
    volume: 0.11,
    price: 264,
    createdAt: "12.09.2026",
    history: h([
      ["waiting", "12.09.2026"],
      ["china", "13.09.2026"],
      ["transit", "15.09.2026"],
    ]),
  },
  {
    id: "o8",
    track: "AV7712470991",
    title: "Наушники AirPods",
    status: "china",
    paid: false,
    weight: 0.35,
    volume: 0.002,
    price: 9,
    createdAt: "14.09.2026",
    history: h([
      ["waiting", "14.09.2026"],
      ["china", "16.09.2026"],
    ]),
  },
  {
    id: "o9",
    track: "AV7712483204",
    title: "Косметика, набор",
    status: "waiting",
    paid: false,
    weight: 1.2,
    volume: 0.008,
    price: 30,
    createdAt: "16.09.2026",
    history: h([["waiting", "16.09.2026"]]),
  },
  {
    id: "o10",
    track: "AV7712490117",
    title: "Кофеварка",
    status: "done",
    paid: true,
    weight: 6.8,
    volume: 0.05,
    price: 170,
    createdAt: "12.08.2026",
    history: h([
      ["waiting", "12.08.2026"],
      ["china", "14.08.2026"],
      ["transit", "16.08.2026"],
      ["customs", "22.08.2026"],
      ["dushanbe", "24.08.2026"],
      ["sorted", "25.08.2026"],
      ["ready", "26.08.2026"],
      ["done", "28.08.2026"],
    ]),
  },
  {
    id: "o11",
    track: "AV7712491885",
    title: "Рюкзак школьный",
    status: "done",
    paid: true,
    weight: 1.5,
    volume: 0.014,
    price: 37,
    createdAt: "20.08.2026",
    history: h([
      ["waiting", "20.08.2026"],
      ["china", "21.08.2026"],
      ["transit", "23.08.2026"],
      ["customs", "28.08.2026"],
      ["dushanbe", "30.08.2026"],
      ["sorted", "31.08.2026"],
      ["ready", "01.09.2026"],
      ["done", "03.09.2026"],
    ]),
  },
];

/* ------------------------------------------------------------ pickup pts */
export type PickupPoint = {
  id: string;
  city: string;
  name: string;
  address: string;
  hours: string;
  type: "point" | "postamat";
  x: number;
  y: number;
};

export const PICKUP_POINTS: PickupPoint[] = [
  {
    id: "p1",
    city: "Душанбе",
    name: 'Политехникум "Zet-Mobile"',
    address:
      "город Душанбе, проспект Джами (офис Zet-mobile). Ориентир — напротив Политехнического университета.",
    hours: "09:00 – 19:00, без выходных",
    type: "point",
    x: 46,
    y: 38,
  },
  {
    id: "p2",
    city: "Душанбе",
    name: '65мкр "Zet-Mobile"',
    address: "г. Душанбе, ул. Борбад 133/1 (Офис Zet-mobile). Ориентир — Гипрозем, остановка Халоват.",
    hours: "09:00 – 19:00, без выходных",
    type: "point",
    x: 68,
    y: 24,
  },
  {
    id: "p3",
    city: "Душанбе",
    name: '9 км "Zet-Mobile"',
    address: "г. Душанбе, ул. С. Айни 269 (Офис Zet-mobile). Ориентир — Рынок, возле остановки.",
    hours: "09:00 – 19:00, без выходных",
    type: "point",
    x: 28,
    y: 62,
  },
  {
    id: "p4",
    city: "Душанбе",
    name: 'Сино "Avalin"',
    address: "г. Душанбе, ул. Нисор Мухаммад 41. Ориентир — ТЦ Пойтахт-80.",
    hours: "09:00 – 20:00",
    type: "point",
    x: 60,
    y: 70,
  },
  {
    id: "p5",
    city: "Душанбе",
    name: "Постамат «Ашан Сомони»",
    address: "г. Душанбе, пр. Сомони 24, 1 этаж ТЦ. Круглосуточно.",
    hours: "24/7",
    type: "postamat",
    x: 40,
    y: 50,
  },
  {
    id: "p6",
    city: "Душанбе",
    name: "Постамат «Садбарг»",
    address: "г. Душанбе, ул. Рудаки 137, вход со двора.",
    hours: "24/7",
    type: "postamat",
    x: 74,
    y: 56,
  },
  {
    id: "p7",
    city: "Худжанд",
    name: 'Панҷшанбе "Avalin"',
    address: "г. Худжанд, ул. Ленина 178. Ориентир — рынок Панҷшанбе.",
    hours: "09:00 – 18:30",
    type: "point",
    x: 52,
    y: 34,
  },
  {
    id: "p8",
    city: "Худжанд",
    name: '19 мкр "Zet-Mobile"',
    address: "г. Худжанд, 19 мкр, дом 4. Ориентир — остановка Университет.",
    hours: "09:00 – 18:30",
    type: "point",
    x: 30,
    y: 58,
  },
  {
    id: "p9",
    city: "Худжанд",
    name: "Постамат «Мега Сити»",
    address: "г. Худжанд, ТЦ Мега Сити, 1 этаж.",
    hours: "24/7",
    type: "postamat",
    x: 66,
    y: 64,
  },
  {
    id: "p10",
    city: "Бохтар",
    name: 'Марказӣ "Avalin"',
    address: "г. Бохтар, ул. Айни 22. Ориентир — центральный рынок.",
    hours: "09:00 – 18:00",
    type: "point",
    x: 48,
    y: 44,
  },
  {
    id: "p11",
    city: "Куляб",
    name: 'Марказӣ "Avalin"',
    address: "г. Куляб, ул. Борбад 8. Ориентир — автовокзал.",
    hours: "09:00 – 18:00",
    type: "point",
    x: 55,
    y: 52,
  },
];

export const CITIES = ["Душанбе", "Худжанд", "Бохтар", "Куляб"];

/* ------------------------------------------------------------------ news */
export type NewsItem = {
  id: string;
  cover: "recycle" | "invite" | "brand" | "flag";
  title: string;
  date: string;
  likes: number;
  dislikes: number;
  body: string;
};

export const MOCK_NEWS: NewsItem[] = [
  {
    id: "n1",
    cover: "recycle",
    title: "Утилизация",
    date: "17 сентября 2026 г.",
    likes: 0,
    dislikes: 0,
    body: `Уважаемые клиенты Avalin Cargo!
Товары, поступившие на склад в Душанбе в мае, июне и июле, которые до сих пор не оплачены или владельцы которых не установлены, будут утилизированы. Последний срок — 20 сентября 2026 года. Просим проверить свои трек-коды, добавить их в приложение, оплатить карго или связаться с оператором.

С уважением, Avalin Cargo.`,
  },
  {
    id: "n2",
    cover: "invite",
    title: "🎁 Приглашайте друзей — получайте бонусы! Дӯстонатонро даъват кунед — бонус гиред!",
    date: "04 сентября 2026 г.",
    likes: 6,
    dislikes: 1,
    body: `Приглашайте друзей в Avalin Cargo по своей реферальной ссылке и получайте бонусы!
• За каждого приглашённого друга — 10 сомони вам.
• Ваш друг получает 5 сомони бонуса.
• После оформления заказа вашим приглашённым другом вы дополнительно получаете 5% от суммы его заказа.
• Полученные бонусы действительны 40 дней.
Чем больше друзей пригласите — тем больше бонусов получите!

Дӯстонатонро ба Avalin Cargo тавассути ссылкаи рефералии худ даъват кунед ва бонусҳо гиред!
• Барои ҳар як дӯсти даъваткардаатон — 10 сомонӣ бонус мегиред.
• Дӯсти шумо 5 сомонӣ бонус мегирад.
• Пас аз он ки дӯсти даъваткардаи шумо фармоиш медиҳад, шумо иловатан 5% аз маблағи фармоиши ӯ ҳамчун бонус мегиред.
• Бонусҳои гирифташуда 40 рӯз эътибор доранд.
Ҳар қадар дӯстони бештарро даъват кунед — ҳамон қадар бонусҳои бештар мегиред!`,
  },
  {
    id: "n3",
    cover: "brand",
    title: "Avalin Express Cargo — авиа за 1–4 дня и карго за 14–25 дней",
    date: "01 сентября 2026 г.",
    likes: 24,
    dislikes: 0,
    body: `Международная логистика и байерский сервис Avalin Cargo.

• АВИА — 1–4 дня
• КАРГО — 14–25 дней
• Выкуп товаров под ключ
• Надёжно и безопасно

Наши склады: Иу, Гуанчжоу, Пекин, Урумчи, Сиань, Фошан.
Доставляем ваши грузы с заботой — от склада в Китае до пункта выдачи рядом с вашим домом.`,
  },
  {
    id: "n4",
    cover: "flag",
    title: "🇹🇯 С 35-летием Государственной независимости!",
    date: "09 сентября 2026 г.",
    likes: 41,
    dislikes: 0,
    body: `Пусть наша Родина будет процветающей и благополучной, а в каждом доме всегда будут мир, достаток и радость!

Коллектив Avalin Cargo поздравляет всех клиентов с Днём Государственной независимости Республики Таджикистан.`,
  },
];

/* --------------------------------------------------------------- lessons */
export type Lesson = { id: string; title: string; duration: string; note?: string };
export type LessonCategory = {
  id: string;
  name: string;
  marketplace: string;
  lessons: Lesson[];
};

export const LESSON_CATEGORIES: LessonCategory[] = [
  {
    id: "pinduoduo",
    name: "Pinduoduo",
    marketplace: "pinduoduo",
    lessons: [
      { id: "l1", title: "Регистрация в Пиндуодуо", duration: "1:12" },
      { id: "l2", title: "Как правильно добавить карту VISA в Пиндуодуо?", duration: "00:40" },
      {
        id: "l3",
        title: "Как правильно добавлять адрес Avalin Карго в Пиндуодуо?",
        duration: "00:21",
        note: "Как правильно добавлять адрес Avalin Карго и заполнение адреса склада.",
      },
      { id: "l4", title: "Как работает поисковик в Пиндуодуо?", duration: "00:21" },
      { id: "l5", title: "Как анализировать товар и магазин в Пиндуодуо?", duration: "00:36" },
    ],
  },
  {
    id: "taobao",
    name: "Taobao",
    marketplace: "taobao",
    lessons: [
      { id: "l6", title: "Регистрация в Taobao", duration: "1:04" },
      { id: "l7", title: "Оплата заказа в Taobao", duration: "00:52" },
      { id: "l8", title: "Добавление адреса склада Avalin Cargo", duration: "00:33" },
      { id: "l9", title: "Поиск товара по фото", duration: "00:28" },
    ],
  },
  {
    id: "1688",
    name: "1688",
    marketplace: "1688",
    lessons: [
      { id: "l10", title: "Регистрация и вход в 1688", duration: "1:20" },
      { id: "l11", title: "Оптовые закупки: как считать цену", duration: "00:47" },
      { id: "l12", title: "Как связаться с продавцом", duration: "00:39" },
    ],
  },
];

/* --------------------------------------------------------- notifications */
export type Notif = { id: string; title: string; body: string; time: string; read: boolean };

export const MOCK_NOTIFS: Notif[] = [
  {
    id: "nt1",
    title: "Утилизация",
    body: "Уважаемые клиенты Avalin Cargo! Товары, поступившие на склад в Душанбе в мае, июне и июле, которые до сих пор не оплачены, будут утилизированы 20 сентября 2026 года.",
    time: "7 ч назад",
    read: false,
  },
  {
    id: "nt2",
    title: "Прибывшие товары прошли сортировку",
    body: "Грузы, прибывшие в Душанбе, прошли сортировку. Пожалуйста, произведите оплату и заберите свои посылки в пункте выдачи.",
    time: "2 д назад",
    read: false,
  },
  {
    id: "nt3",
    title: "Борхои бе ному нишон утилизатсия мешаванд",
    body: "📦 Муҳтарам муштариён! Борҳое, ки дар моҳҳои апрел, май ва июн ба анбор ворид шудаанд ва то ҳол пардохт нашудаанд, утилизатсия карда мешаванд.",
    time: "2 д назад",
    read: false,
  },
  {
    id: "nt4",
    title: "🇹🇯 С 35-летием Государственной независимости",
    body: "Пусть наша Родина будет процветающей и благополучной, а в каждом доме всегда будут мир, достаток и радость!",
    time: "09.09.2026",
    read: false,
  },
  {
    id: "nt5",
    title: "Дӯстонатонро даъват кунед — бонус гиред",
    body: "Акнун барои ҳар як дӯсте, ки тавассути ссылкаи рефералии шумо ба мо ҳамроҳ мешавад, 10 сомонӣ бонус мегиред.",
    time: "04.09.2026",
    read: false,
  },
  {
    id: "nt6",
    title: "Заказ AV7712398452 готов к выдаче",
    body: 'Ваш заказ «Кроссовки Nike Air» прибыл в пункт выдачи Политехникум "Zet-Mobile". Не забудьте оплатить его перед получением.',
    time: "15.09.2026",
    read: true,
  },
  {
    id: "nt7",
    title: "Новый тариф на авиадоставку",
    body: "Авиадоставка из Гуанчжоу теперь занимает 1–4 дня. Стоимость уточняйте у оператора в чате поддержки.",
    time: "12.09.2026",
    read: true,
  },
];

/* ---------------------------------------------------------- transactions */
export type Tx = {
  id: string;
  type: "topup" | "payment" | "bonus";
  title: string;
  amount: number;
  date: string;
};

export const MOCK_TX: Tx[] = [
  { id: "t1", type: "topup", title: "Пополнение · Корти милли", amount: 500, date: "14.09.2026 18:24" },
  { id: "t2", type: "payment", title: "Оплата заказа AV7712400193", amount: -85, date: "14.09.2026 18:26" },
  { id: "t3", type: "bonus", title: "Бонус за друга · +10", amount: 10, date: "10.09.2026 11:02" },
  { id: "t4", type: "topup", title: "Пополнение · Алиф Мобайл", amount: 300, date: "03.09.2026 09:41" },
  { id: "t5", type: "payment", title: "Оплата заказа AV7712491885", amount: -37, date: "01.09.2026 16:15" },
];

/* --------------------------------------------------------------- referral */
export const REFERRAL = {
  pct: 5,
  welcomeYou: 10,
  welcomeFriend: 5,
  maxBonusPay: 100,
  bonusLifeDays: 40,
};

export type Referral = { id: string; name: string; date: string; status: "active" | "new"; earned: number };

export const MOCK_REFERRALS: Referral[] = [
  { id: "r1", name: "Фирдавс А.", date: "10.09.2026", status: "active", earned: 22.5 },
  { id: "r2", name: "Сабрина К.", date: "05.09.2026", status: "active", earned: 14 },
  { id: "r3", name: "Далер М.", date: "02.09.2026", status: "new", earned: 10 },
];

/* ------------------------------------------------------------- info pages */
export const INFO_PAGES: Record<string, { titleKey: string; icon: IconName; body: string }> = {
  prohibited: {
    titleKey: "prohibited",
    icon: "ban",
    body: `К перевозке НЕ принимаются:

• Оружие, боеприпасы, их части и копии
• Наркотические и психотропные вещества
• Взрывчатые, легковоспламеняющиеся и едкие вещества
• Аккумуляторы и Power Bank свыше 20 000 mAh без сертификата
• Алкоголь и табачная продукция
• Живые животные и растения
• Скоропортящиеся продукты питания
• Драгоценные металлы, камни, наличные деньги
• Лекарственные препараты без рецепта и сертификата
• Контрафактная продукция брендов

Внимание: при обнаружении запрещённого товара груз изымается, стоимость не возмещается.`,
  },
  terms: {
    titleKey: "terms",
    icon: "truck",
    body: `Сроки доставки:

• АВИА — 1–4 дня от склада в Китае до Душанбе
• КАРГО (авто) — 14–25 дней
• Сортировка и выдача — 1–2 дня после прибытия

Условия:
• Оплата рассчитывается по наибольшей стоимости между весом и объёмом.
• Объёмный вес: длина × ширина × высота (м) = м³.
• Бесплатное хранение на складе в Душанбе — 14 дней, далее 2 TJS в сутки.
• Упаковка в мешок — бесплатно, деревянная обрешётка — по тарифу.
• Обязательно указывайте свой код клиента #AV3647 в адресе склада, иначе груз может быть не идентифицирован.`,
  },
  payment: {
    titleKey: "payment_refund",
    icon: "card",
    body: `Оплата:

• Оплатить заказ можно через кошелёк в приложении, картой (Корти милли, VISA), а также через Алиф Мобайл, DC Wallet и ESKHATA Online.
• Бонусами можно оплатить до 100% стоимости доставки.
• Оплата производится до получения груза в пункте выдачи.

Возврат:
• Возврат средств возможен, если груз утерян по вине компании — компенсация до 100% стоимости доставки и до 10-кратной суммы тарифа за товар.
• Заявление на возврат подаётся через чат поддержки в течение 14 дней.
• Средства возвращаются на кошелёк в приложении в течение 3–5 рабочих дней.`,
  },
  privacy: {
    titleKey: "privacy",
    icon: "shield",
    body: `Политика конфиденциальности Avalin Cargo

1. Мы собираем: номер телефона, имя, выбранный пункт выдачи, историю заказов и платежей.
2. Данные используются только для оказания услуг доставки и информирования о статусе грузов.
3. Мы не передаём персональные данные третьим лицам, кроме случаев, предусмотренных законодательством Республики Таджикистан.
4. Данные хранятся на защищённых серверах; доступ имеют только уполномоченные сотрудники.
5. Вы можете удалить аккаунт и все связанные данные в разделе «Настройка профиля».
6. По вопросам обработки данных пишите в чат поддержки.`,
  },
  agreement: {
    titleKey: "agreement",
    icon: "file",
    body: `Пользовательское соглашение

1. Используя приложение Avalin Cargo, вы соглашаетесь с настоящими условиями.
2. Клиент обязуется указывать достоверные данные и корректный код клиента при заказе товаров.
3. Компания не несёт ответственности за содержимое посылок и соответствие товара описанию продавца.
4. Клиент обязан проверить груз при получении в пункте выдачи. Претензии после выдачи не принимаются.
5. Компания вправе изменять тарифы, уведомив клиентов через раздел «Новости».
6. Неоплаченные и невостребованные грузы утилизируются через 3 месяца хранения.`,
  },
};

export const PAY_METHODS = [
  { id: "korti", name: "Корти милли", icon: "card" as IconName },
  { id: "visa", name: "VISA / Mastercard", icon: "card" as IconName },
  { id: "alif", name: "Алиф Мобайл", icon: "phone" as IconName },
  { id: "dc", name: "DC Wallet", icon: "wallet" as IconName },
];
