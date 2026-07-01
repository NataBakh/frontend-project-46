### Hexlet tests and linter status:
[![Actions Status](https://github.com/NataBakh/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/NataBakh/frontend-project-46/actions)

**Описание**

Вычислитель отличий – программа, которая определяет разницу между двумя структурами данных. Это популярная задача, для которой существуют онлайн-сервисы вроде jsondiff; похожий механизм используется при выводе тестов и при отслеживании изменений в конфигурационных файлах.

**Возможности утилиты:**
* Поддержка разных входных форматов: YAML, JSON
* Генерация отчёта в форматах plain text, stylish и JSON

**Требования**
* Git клиент
* Node.js 18 или выше
* Make

**Установка**<br>
**Клонировать проект**<br>
`$ git clone`<br>
**Установить пакет(может потребоваться sudo)**<br>
`$ make setup`

**Пример использования**
```# формат plain
gendiff --format plain path/to/file.yml another/path/file.json

Property 'common.follow' was added with value: false
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed

# формат stylish
gendiff filepath1.json filepath2.json

{
  + follow: false
    setting1: Value 1
  - setting2: 200
  - setting3: true
  + setting3: {
        key: value
    }
}
```
[![asciicast](https://asciinema.org/a/dAg6IgzCYUKDkdkA.svg)](https://asciinema.org/a/dAg6IgzCYUKDkdkA)