import path from 'path'
import parse from './parser.js'
import fs from 'fs'
import process from 'process'

const gendiff = (filepath1, filepath2) => {
  const content1 = fs.readFileSync(path.resolve(filepath1), 'utf-8')
  const content2 = fs.readFileSync(path.resolve(filepath2), 'utf-8')
  const parsedData1 = parse(content1)
  const parsedData2 = parse(content2)
  console.log('parsedData1', parsedData1)
  console.log('parsedData2', parsedData2)
  return parsedData1 === parsedData2
}

export default gendiff