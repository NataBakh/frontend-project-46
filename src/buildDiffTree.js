import _ from 'lodash'

const buildDiffTree = (obj1, obj2) => {
  // 1. Находим все уникальные ключи из обоих объектов
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  // Объединяем ключи и сортируем их в алфавитном порядке
  const unionKeys = _.sortBy(_.union(keys1, keys2))

  // 2. Маппим каждый ключ в узел нашего Дифф-дерева
  const tree = unionKeys.map((key) => {
    // Если ключа нет в первом объекте, значит он добавлен во второй
    if (!_.has(obj1, key)) {
      return { key, type: 'added', value: obj2[key] }
    }

    // Если ключа нет во втором объекте, значит он был удален
    if (!_.has(obj2, key)) {
      return { key, type: 'deleted', value: obj1[key] }
    }

    // Если оба значения являются объектами, уходим в рекурсию (вложенность)
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return {
        key,
        type: 'nested',
        children: buildDiffTree(obj1[key], obj2[key]), // Рекурсивный вызов
      }
    }

    // Если значения не равны, значит они изменились
    if (!_.isEqual(obj1[key], obj2[key])) {
      return {
        key,
        type: 'changed',
        valueOld: obj1[key],
        valueNew: obj2[key],
      }
    }

    // Если ни одно условие выше не сработало, значения идентичны
    return { key, type: 'unchanged', value: obj1[key] }
  })

  return tree
}
export default buildDiffTree
