import { describe, expect, test } from '@jest/globals'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'
import gendiff from '../src/index.js' // Используем gendiff везде одинаково
import stylish from '../src/formatters/stylish.js' // импортируем напрямую в index.test.js

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)

const readFile = filename => fs.readFileSync(getFixturePath(filename), 'utf-8').trim()

test('Тест stylish с неизвестным типом узла', () => {
  const fakeTree = [{ key: 'follow', type: 'ghost', value: 'buh' }]

  expect(() => stylish(fakeTree)).toThrow('Unknown type: ghost!')
})

describe('Тестирование gendiff', () => {
  test('Тест неподдерживаемый формат файла', () => {
    const file1 = getFixturePath('file1.txt')
    const file2 = getFixturePath('file1.txt')
    expect(() => gendiff(file1, file2)).toThrow()
  })

  test('Тест несуществующий формат вывода', () => {
    const file1 = getFixturePath('file1.json')
    const file2 = getFixturePath('file2.json')

    expect(() => {
      gendiff(file1, file2, 'qwerty')
    }).toThrow()
  })

  test('Тест json files в формате по умолчанию', () => {
    const file1 = getFixturePath('file1.json')
    const file2 = getFixturePath('file2.json')
    const expected = readFile('expected_file_stylish.txt')

    expect(gendiff(file1, file2)).toEqual(expected)
  })

  test('Тест yml files в формате по умолчанию', () => {
    const file1 = getFixturePath('file1.yml')
    const file2 = getFixturePath('file2.yml')
    const expected = readFile('expected_file_stylish.txt')

    expect(gendiff(file1, file2)).toEqual(expected)
  })

  test('Тест yaml files в формате по умолчанию', () => {
    const file1 = getFixturePath('file1.yaml') // создайте такую фикстуру, если её нет
    const file2 = getFixturePath('file2.yaml')
    const expected = readFile('expected_file_stylish.txt')

    expect(gendiff(file1, file2)).toEqual(expected)
  })

  test('Тест json files в stylish-формате', () => {
    const file1 = getFixturePath('file1.json')
    const file2 = getFixturePath('file2.json')
    const expected = readFile('expected_file_stylish.txt')

    expect(gendiff(file1, file2, 'stylish')).toEqual(expected)
  })

  test('Тест yml files in stylish-формате', () => {
    const file1 = getFixturePath('file1.yml')
    const file2 = getFixturePath('file2.yml')
    const expected = readFile('expected_file_stylish.txt')

    expect(gendiff(file1, file2, 'stylish')).toEqual(expected)
  })
})
