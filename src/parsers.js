import * as yaml from 'js-yaml'

const parseFile = (fileData, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(fileData)
    case 'yml':
      return yaml.load(fileData)
    case 'yaml':
      return yaml.load(fileData)
    default:
      throw new Error(`Unexpected out of range value - ${format}`)
  }
}

export default parseFile
