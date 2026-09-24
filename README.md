# Avalin Cargo — барномаи мобилӣ (mock)

Барномаи карго дар услуби Amon Cargo, лекин пурра бо брендинги **Avalin Express Cargo**.
Ҳамаи маълумот mock аст (дар `src/data.ts`), вале ҳама чиз кор мекунад: пардохт, пур кардани ҳамён,
чат, илова кардани трек-код, интихоби нуқтаи гирифтан, забон ва мавзӯъ.

## Оғоз кардан

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # версияи production -> dist/
npm run preview
```

## Экранҳо (22 адад)

| Роҳ | Экран |
|---|---|
| `/` | Асосӣ: банер-карусель, 5 тугмаи тез, маркетплейсҳо, суроғаи анбор |
| `/chat` | Чати дастгирӣ (ҷавоби автоматӣ) |
| `/orders` | Фармоишҳо: ҷустуҷӯ, иловаи трек-код, 10 ҳолат бо ҳисоб |
| `/orders/list/:key` | Рӯйхати фармоишҳо аз рӯи ҳолат |
| `/orders/o/:id` | Тафсилот + пардохт + таърихи ҳаракат (timeline) |
| `/wallet` | Ҳамён: баланс, бонус, пур кардан, таърихи амалиёт |
| `/options` | Танзимот |
| `/profile` | Профил: ном, ҷинс, сурат, баромадан, нест кардани ҳисоб |
| `/language` | Забон (Русский / Тоҷикӣ) ва мавзӯъ (равшан / торик / системавӣ) |
| `/pickup` | Нуқтаҳои гирифтан, постаматҳо, харита, 4 шаҳр |
| `/tariffs` | Тарифҳо: аз рӯи вазн / ҳаҷм |
| `/calculator` | Калкулятори арзиш |
| `/delivery` | Расонидан то дари хона + дархост |
| `/lessons`, `/lessons/:id` | Дарсҳо (Pinduoduo, Taobao, 1688) + плеер |
| `/news`, `/news/:id` | Хабарҳо бо like/dislike |
| `/referral` | Барномаи шарикӣ: код AV3647, шартҳо, рефералҳо, таърих |
| `/notifications` | Огоҳиномаҳо |
| `/info/:slug` | Молҳои манъшуда, шартҳо, пардохт, махфият, созишнома |

## Сохтори файлҳо

```
src/
  data.ts          — ҳамаи маълумоти mock (фармоишҳо, хабарҳо, нуқтаҳо, тарифҳо)
  i18n.ts          — тарҷумаҳо: ru + tj
  store.tsx        — Context: ҳолат, localStorage, амалҳо (пардохт, пур кардан, чат…)
  styles.css       — design-system (ранг, сояҳо, тема торик)
  components/      — Icon, UI (nav, header, sheet, toast), Art (банерҳо, харита), OrderCard
  screens/         — ҳамаи экранҳо
public/img/        — логотип ва банери Avalin
```

## Брендинг

- Логотип: `public/img/avalin-logo.jpg` (аватар, банер, профил)
- Банери расмӣ: `public/img/avalin-banner.jpg` (дар хабарҳо)
- Ранги асосӣ: `#4C7DF0`, тиллоӣ `#E5B03C`, нилобии бренд `#16244F`

## Ба барномаи Android табдил додан (ихтиёрӣ)

```bash
npm i @capacitor/core @capacitor/cli @capacitor/android
npx cap init "Avalin Cargo" tj.avalin.cargo --web-dir=dist
npm run build && npx cap add android && npx cap open android
```

## Скриншот гирифтан (барои санҷиш)

```bash
node tools/screenshot.mjs shots
```
