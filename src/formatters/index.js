import stylish from './stylish.js'

const format = (diffTree, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(diffTree)
    default:
      throw new Error(`Неизвестный формат вывода: '${formatName}'`)
  }
}

export default format
