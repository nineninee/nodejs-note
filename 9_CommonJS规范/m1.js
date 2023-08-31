let a = 10
let b = 20
// console.log('m1')

// console.log(exports)
// console.log(module.exports)
// console.log(exports === module.exports)

// exports.a = 'sunwukong'
// exports.b = 'zhubajie'
// exports.c = 'shaseng'

module.exports = {
  a: 'hi',
  d: 'hello',
  c: () => {
    console.log('haha')
  }
}