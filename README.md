### Hexlet tests and linter status:
[![Actions Status](https://github.com/NataBakh/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/NataBakh/frontend-project-46/actions)

[![my-check](https://github.com/NataBakh/frontend-project-46/actions/workflows/myCheck.yml/badge.svg?branch=main)](https://github.com/NataBakh/frontend-project-46/actions/workflows/myCheck.yml)

[![SonarQube Cloud](https://sonarcloud.io/images/project_badges/sonarcloud-light.svg)](https://sonarcloud.io/summary/new_code?id=NataBakh_frontend-project-46)

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
**Склонируйте репозиторий проекта локально**<br>
`git clone`<br> 

**Перейдите в директорию проекта**<br>
`cd frontend-project-46` 

**Для установки всех необходимых зависимостей**<br>
`make install`

**Установить пакет в систему глобально с помощью команды (может потребоваться sudo!)**<br>
`npm link ` или `sudo npm link`


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