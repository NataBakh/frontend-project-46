import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import parseFile from './parsers.js'

const supportedFormats = ['stylish', 'plain', 'json']

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {

if (!supportedFormats.includes(formatName)) {
    throw new Error(`Unknown output format: ${formatName}`);
  }

  const content1 = fs.readFileSync(path.resolve(filepath1), 'utf-8')
  const content2 = fs.readFileSync(path.resolve(filepath2), 'utf-8')

  const format1 = path.extname(filepath1).slice(1)
  const format2 = path.extname(filepath2).slice(1)

  const parsedData1 = parseFile(content1, format1)
  const parsedData2 = parseFile(content2, format2)

  const keys1 = Object.keys(parsedData1)
  const keys2 = Object.keys(parsedData2)
  const sortedKeys = _.sortBy(_.union(keys1, keys2))

  const stringify = (value) => {
    if (_.isObject(value)) {
      return JSON.stringify(value)
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
    if (_.isEqual(parsedData1[key], parsedData2[key])) {
      return `    ${key}: ${stringify(parsedData1[key])}`
    }
    return [
      `  - ${key}: ${stringify(parsedData1[key])}`,
      `  + ${key}: ${stringify(parsedData2[key])}`,
    ]
  })

  return `{\n${result.join('\n')}\n}`
}

export default gendiff
