import { describe, expect, test } from '@jest/globals'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'
import parseFile from '../src/parsers.js'

import gendiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)

const readExpected = (filename) => {
  return fs.readFileSync(getFixturePath(filename), 'utf-8').trim()
}

describe('Тестирование gendiff', () => {

  test('Неподдерживаемый формат', () => {
    const file1 = getFixturePath('file1.txt')
    const file2 = getFixturePath('file2.txt')
    expect(() => gendiff(file1, file2)).toThrow('Unexpected out of range value - txt')
  })

  test('Несуществующий формат вывода', () => {
    const file1 = getFixturePath('file1.json')
    const file2 = getFixturePath('file2.json')
    expect(() => {
      gendiff(file1, file2, 'qwerty')
    }).toThrow(Error)
  })


  test('Положительный: json-файлы одинаковые — выводит структуру без изменений', () => {
    const result = gendiff(getFixturePath('file1.json'), getFixturePath('file1.json'))
    const expected = readExpected('ResultFileNotDiff.txt')

    expect(result).toBe(expected)
  })
  test('Отрицательный: json-файлы разные — выводит корректный diff со знаками + и -', () => {
    const result = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'))
    const expected = readExpected('ResultFileIsDiff.txt')
    expect(result).toBe(expected)
  })


  test('Положительный: yml-файлы одинаковые — выводит структуру без изменений', () => {
    const result = gendiff(getFixturePath('file1.yml'), getFixturePath('file1.yml'))
    const expected = readExpected('ResultFileNotDiff.txt')

    expect(result).toBe(expected)
  })
  test('Отрицательный: yml-файлы разные — выводит корректный diff со знаками + и -', () => {
    const result = gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))
    const expected = readExpected('ResultFileIsDiff.txt')
    expect(result).toBe(expected)
  })
})
