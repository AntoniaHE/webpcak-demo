// 数组去重
function arrUnique(array) {
  if (!array.length) return
  let newArry = []
  for (let i = 0; i < array.length; i++) {
    if(newArry.indexOf(array[i]) === -1) {
      newArry.push(array[i])
    }
  }
  return newArry
}

// 通过es6的set
function arrUniqueES6(array) {
  // return new Set([...array])
  return Array.from(new Set(array))
}

// 排序再去重
function sortUnique(array) {
  const list = array.sort()
  let arr = []
  for (let i = 0; i < list.length; i++) {
    if (list[i] !== list[i + 1]) {
      arr.push(list[i])
    }
  }
  return arr
}

// 使用splice
function spliceUnique(array) {
  for(let i = 0; i < array.length; i++) {
    for(let j = i + 1; j < array.length; j++) {
      if (array[i] === array[j]) {
        array.splice(j--, 1)
      }
    }
  }
  return array
}

// const newArr = arrUnique([ 1, 2, 1, 2, '1', '11'])
// console.log(newArr)
// const es6Array = arrUniqueES6([1, 3, 5, 3, 2, 5])
// console.log(es6Array)

// const sortArray = sortUnique([1,2,1,2,4,4,5,5])
// console.log(sortArray)

// const spliceArray = spliceUnique([1,2,2,'22','33','22','11','shh','shh'])
// console.log(spliceArray)
export default {
  arrUnique: arrUnique
}