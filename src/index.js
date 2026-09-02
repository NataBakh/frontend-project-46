import fs from 'fs'
import path from 'path'
import parseFile from './parsers.js'
import buildDiffTree from './buildDiffTree.js' // Логика сравнения ушла сюда
import format from './formatters/index.js'

const readFile = (filePath) => {
  const absolutePath = path.resolve(process.cwd(), filePath)
  return fs.readFileSync(absolutePath, 'utf-8')
}

const getFormat = (filePath) => {
  // path.extname('file.json') вернет '.json', мы отрезаем точку через slice(1)
  return path.extname(filePath).slice(1)
}

const gendiff = (filePath1, filePath2, formatName = 'stylish') => {
  const fileContent1 = readFile(filePath1)
  const fileContent2 = readFile(filePath2)
  const format1 = getFormat(filePath1)
  const format2 = getFormat(filePath2)

  // 1. Читаем и парсим файлы в обычные JS-объекты
  const data1 = parseFile(fileContent1, format1)
  const data2 = parseFile(fileContent2, format2)

  // 2. Строим дерево различий (уже умеет работать с вложенностью рекурсивно)
  const diffTree = buildDiffTree(data1, data2)

  // 3. Форматируем результат в нужный вид
  return format(diffTree, formatName)
}
export default gendiff
