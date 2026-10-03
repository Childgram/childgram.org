# Childgram

Неофициальный Telegram-клиент с ограничением доступа к незнакомым каналам,
группам и ботам и локальной статистикой времени использования.

**Статус: сайт, исходники и Android-prerelease опубликованы.**

[Версия 0.1.0-alpha.2](https://github.com/Childgram/cg-android/releases/tag/v0.1.0-alpha.2)
доступна для тестирования. APK можно скачать с сайта без входа в GitHub.

Сайт: [childgram.org](https://childgram.org). Лента обновлений:
[update.childgram.org/android.json](https://update.childgram.org/android.json).

## Рабочая директория

```text
Childgram/                  репозиторий общих документов и брендинга
├── AGENTS.md               инструкции по работе с проектом
├── README.md               обзор и навигация
├── branding/               общий SVG-логотип, PNG и экспорт для платформ
├── site/                   сайт childgram.org, публикуемый через GitHub Pages
├── doc/
│   ├── release.md          журнал подготовки и проверки выпусков
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

```sh
git clone https://github.com/Childgram/childgram.org.git Childgram
cd Childgram
git clone --recursive --shallow-submodules https://github.com/Childgram/cg-android.git android
git -C android remote add upstream https://github.com/DrKLO/Telegram.git
```

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

- [Описание клиента](https://github.com/Childgram/cg-android#readme).
- [Разработка, сборка, подпись и проверки](https://github.com/Childgram/cg-android/blob/master/dev/README.md).
- [Правила работы с Android](https://github.com/Childgram/cg-android/blob/master/AGENTS.md).
- [Журнал выпусков Android](doc/release.md).

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
Исходники Childgram опубликованы в `master`; подписанные APK размещаются
в GitHub Releases после ручной публикации черновика. Общие документы и сайт:
[Childgram/childgram.org](https://github.com/Childgram/childgram.org).
