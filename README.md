# Project Management Systems (Тестовое задание Frontend-Spring-2025)

## Описание проекта

Данное веб-приложение предназначено для управления проектами и задачами. Система предоставляет интуитивный интерфейс для создания задач, просмотра досок с задачи и отслеживания прогресса выполнения.

## Запуск проекта

- Клонируйте репозиторий командой `git clone <ссылка_на_репозиторий>`
- Установите необходимые программы и запустите сервер. Ссылка на руководство по установке и запуску сервера:

```sh
https://github.com/avito-tech/tech-internship/tree/main/Tech%20Internships/Frontend/Frontend-trainee-assignment-spring-2025/server
```

- После успешного запуска сервера, перейдите в папку с названием **client**
- Установите зависимости командой:

```sh
npm install
```

- Запуск клиента в режиме разработки:

```sh
npm run dev
```

- После запуска приложение будет доступно по адресу:

```sh
http://localhost:5173

```

- По умолчанию клиент будет _взаимодействовать_ с `http://localhost:8080/api/v1`. Это можно заметить в файле `ApiService.ts`

```sh
 baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1"
```

Если вы хотите защитить свои секреты. Создайте файл `.env` в корне проекта в папке **client** и добавьте строку:

```sh
VITE_API_BASE_URL=<Ваш_PORT>
```

## Реализованные функциональные требования

- Просмотр всех задач: отображение всех созданных задач
- Просмотр досок: отображение всех досок
- Просмотр доски: отображение доски с просмотром задач и краткой информации по ним
- Создание задачи: возможность создать тикет и прикрепить его к нужной доске
- Валидация данных в форме.
- Поиск, фильтрания и пагинация на странице всех задач
- Ограничение количества задач на одной странице — 6

## Нереализованные функциональные требования

- Редактирование задачи со страницы всех задач: возможность со страницы всех задач посмотреть/отредактировать детальную информацию о задаче
- Редактирование задачи со страницы доски: возможность на странице доски посмотреть/отредактировать детальную информацию о задаче
- Возможность со страницы всех задач перейти на страницу доски с открытием детальной информации о выбранной задаче

## Используемые технологии

### Основной стек:

- Node.js v20+
- React v19
- React Router

### Дополнительные технологии:

- TypeScript – строгая типизация
- Redux Toolkit + RTK Query – управление глобальным состоянием и сетевые запросы
- React Hook Form – работа с формами
- hookform/resolvers + Zod – ввалидация формы
- CSS Modules – стилизация
- classnames – для более удобной работой со стилями
- use-debounce – оптимизация поиска
- Vite – сборка проекта
- ESLint + Prettier – автоматическое форматирование кода

## Детали реализации и возможные проблемы проекта

### К сожалению, мне не хватило времени полностью завершить проект. Помимо доработки основного функционала, есть несколько аспектов, которые можно улучшить:

- В приложении присутствует обработка ошибок, но, возможно, не все случаи были покрыты и ее стоит улучшить
- Есть места, где код можно вынести в отдельные компоненты для улучшения читаемости и поддержки
- Улучшение адаптивности сайта и его доступности
- Пересмотр локиги модального окна и создания/редактирования задач
- Улучшение работы с TypeScript

## Итоги

Проект реализован не в полном объеме, но стал для меня полезным этапом моего развития. В процессе разработки я улучшил навыки работы с основными технологиями, освоил решение незнакомых задач в условиях ограниченного времени. Это тестовое задание дало мне бесценный практический опыт.
