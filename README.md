# Childgram

Неофициальный Telegram-клиент с ограничением доступа к незнакомым каналам,
группам и ботам и локальной статистикой времени использования.

**Статус: подготовка первого Android-релиза. Публичный выпуск ещё не выполнен.**

## Рабочая директория

```text
Childgram/                  репозиторий общих документов и брендинга
├── AGENTS.md               инструкции по работе с проектом
├── README.md               обзор и навигация
├── branding/               общий SVG-логотип, PNG и экспорт для платформ
├── site/                   сайт childgram.org, публикуемый через GitHub Pages
├── doc/
│   ├── release.md          подготовка первого релиза
│   └── updates.md          обновления приложения, черновики и домены
└── android/                независимый репозиторий Android-клиента
    ├── .git/               исходная история Telegram и изменения Childgram
    ├── AGENTS.md           правила Android-разработки
    ├── README.md           описание Android-форка и атрибуция upstream
    ├── dev/                сборка, проверки и работа с эмулятором
    ├── TMessagesProj/      исходники клиента
    └── .local/             ключи, данные AVD и логи; исключены из Git
```

Репозитории независимы: верхний не включает содержимое `android/` и не закрепляет
его как подмодуль. Это позволяет хранить общие документы и брендинг отдельно, сохраняя внутри
Android-форка исходную структуру Telegram для сравнения и обновления кода.
Клонирование верхнего репозитория само по себе не загружает Android-клиент.

Сайт и выпуск Android: [порядок публикации и подключения доменов](doc/updates.md).
Локальный предпросмотр сайта: `node site/check.cjs && python3 site/build.py`, затем
`python3 -m http.server 8766 --bind 127.0.0.1 --directory .local/site`.

Состояние проверяется отдельно:

```sh
git status
git -C android status
```

## Android

Общий исходник логотипа: [branding/childgram-logo.svg](branding/childgram-logo.svg).
PNG и Android-ресурсы обновляются командой `python3 branding/export.py`
(Python 3 и `rsvg-convert`). SVG — квадратная основа с цветом `#1BBB8D`, без
внешних полей и скругления. Фон `background` и знак `symbol` редактируются отдельно.
Экспортированные Android-ресурсы хранятся в `android/dev/res/`: самостоятельной
сборке Android верхний репозиторий не нужен. Маску адаптивной иконки задаёт Android;
белый знак уменьшен до безопасной области и доступен в монохромном варианте.

- [Описание клиента](android/README.md).
- [Разработка, сборка, подпись и проверки](android/dev/README.md).
- [Правила работы с Android](android/AGENTS.md).
- [Подготовка первого релиза](doc/release.md).

Команды из корня этой рабочей директории:

```sh
./android/dev/build --release
./android/dev/emulator --release install
./android/dev/check-release --device
./android/dev/emulator --release smoke
```

Для установки и проверок нужен запущенный проектный эмулятор:
`./android/dev/emulator start` в отдельном терминале. Сборка использует Docker.

Upstream: [DrKLO/Telegram](https://github.com/DrKLO/Telegram).
Репозиторий Android, GitHub Fork от Telegram:
[Childgram/cg-android](https://github.com/Childgram/cg-android).
В Android настроены `origin` (наш форк) и `upstream` (Telegram).
Изменения Childgram и APK пока не опубликованы.
Верхний репозиторий пока локальный, без удалённого адреса.
