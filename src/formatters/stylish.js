import _ from 'lodash'

const stringify = (value, depth = 1) => {
  // Если это не объект (строка, число, boolean, null),
  // принудительно превращаем в строку, чтобы избежать undefined
  if (!_.isObject(value) || value === null) {
    return String(value)
  }

  const spacesCount = 4
  // Отступ для ключей внутри объекта
  const indent = ' '.repeat((depth + 1) * spacesCount)
  // Отступ для закрывающей фигурной скобки объекта
  const closingIndent = ' '.repeat(depth * spacesCount)

  const entries = Object.entries(value)
    .map(([key, val]) => `${indent}${key}: ${stringify(val, depth + 1)}`)
    .join('\n')

  return `{\n${entries}\n${closingIndent}}`
}

const stylish = (tree, depth = 1) => {
  const spacesCount = 4
  const shiftLeft = 2
  const indent = ' '.repeat(depth * spacesCount - shiftLeft)

  const result = tree
    .map((item) => {
      switch (item.type) {
        case 'added':

          return `${indent}+ ${item.key}: ${stringify(item.value, depth)}`
        case 'deleted':
          return `${indent}- ${item.key}: ${stringify(item.value, depth)}`
        case 'unchanged':
          return `${indent}  ${item.key}: ${stringify(item.value, depth)}`
        case 'changed':
          return `${indent}- ${item.key}: ${stringify(item.valueOld, depth)}\n${indent}+ ${item.key}: ${stringify(item.valueNew, depth)}`
        case 'nested':
          return `${indent}  ${item.key}: ${stylish(item.children, depth + 1)}`
        default:
          throw new Error(`Unknown type: ${item.type}!`)
      }
    })
    .join('\n')

  const outerIndent = ' '.repeat((depth - 1) * spacesCount)
  return `{\n${result}\n${outerIndent}}`
}

export default stylish
