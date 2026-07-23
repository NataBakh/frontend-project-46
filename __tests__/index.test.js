import { describe, expect, test } from '@jest/globals'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

import gendiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)

const readExpected = (filename) => {
  return fs.readFileSync(getFixturePath(filename), 'utf-8').trim()
}

describe('Тестирование gendiff', () => {
  test('Положительный: файлы одинаковые — выводит структуру без изменений', () => {
    const result = gendiff(getFixturePath('file1.json'), getFixturePath('file1.json'))
    const expected = readExpected('ResultFileNotDiff.txt')

    expect(result).toBe(expected)
  })
  test('Отрицательный: файлы разные — выводит корректный diff со знаками + и -', () => {
    const result = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'))
    const expected = readExpected('ResultFileIsDiff.txt')
    expect(result).toBe(expected)
  })
})
