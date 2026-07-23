import path from 'path'
import parse from './parser.js'
import fs from 'fs'
import _ from 'lodash'

const gendiff = (filepath1, filepath2) => {
  const content1 = fs.readFileSync(path.resolve(filepath1), 'utf-8')
  const content2 = fs.readFileSync(path.resolve(filepath2), 'utf-8')

  const parsedData1 = parse(content1)
  const parsedData2 = parse(content2)

  const keys1 = Object.keys(parsedData1)
  const keys2 = Object.keys(parsedData2)
  const sortedKeys = _.sortBy(_.union(keys1, keys2))

const stringify = (value) => {
  if (_.isObject(value)) {
    return JSON.stringify(value); // Или кастомная функция для красивого вывода объектов
  }
  return String(value)
}

  const result = sortedKeys.flatMap((key) => {
    if (!_.has(parsedData2, key)) {
      return `  - ${key}: ${stringify(parsedData1[key])}`
    }
    if (!_.has(parsedData1, key)) {
      return `  + ${key}: ${stringify(parsedData2[key])}`
    }
    if (parsedData1[key] === parsedData2[key]) {
      return `    ${key}: ${stringify(parsedData1[key])}`
    }
     return [
      `  - ${key}: ${stringify(parsedData1[key])}`,
      `  + ${key}: ${stringify(parsedData2[key])}`
    ]
  })

  return `{\n${result.join('\n')}\n}`
}

export default gendiff