import path from 'path'
import parse from './parser.js'
import fs from 'fs'
import process from 'process'

const gendiff = (filepath1, filepath2) => {
  const content1 = fs.readFileSync(path.resolve(filepath1), 'utf-8')
  const content2 = fs.readFileSync(path.resolve(filepath2), 'utf-8')
  const parsedDate1 = parse(content1)
  const parsedDate2 = parse(content2)
  console.log('parsedDate1', parsedDate1)
  console.log('parsedDate2', parsedDate2)
  return content1 === content2
}

export default gendiff