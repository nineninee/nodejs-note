/*
 * @Author: hvvvvvv- 1264178545@qq.com
 * @Date: 2023-08-21 14:50:14
 * @LastEditors: hvvvvvv- 1264178545@qq.com
 * @LastEditTime: 2023-08-21 15:43:11
 * @FilePath: \node-learn\2_同步与异步\yibu.js
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */

// 1. 同步
// function sum(a, b) {
//   const begin = Date.now()

//   while (Date.now() - begin < 10000) {

//   }

//   return a + b;
// }


// console.log('111')

// const result = sum(123, 456)
// console.log(result)

// console.log('222')

// 2. 异步
// function sum(a, b) {
//   setTimeout(() => {
//     return a + b
//   }, 10000)
// }

// console.log('111')

// const result = sum(123, 456)
// console.log(result)

// console.log('222')

// 3.异步+回调函数
// function sum(a, b, cb) {
//   setTimeout(() => {
//     cb(a + b)
//   }, 10000)
// }

// console.log('111')

// const result = sum(123, 456, (res) => {
//   console.log(res)
// })
// console.log(result)

// console.log('222')

// 3.异步+回调函数 ===> 回调地狱
function sum(a, b, cb) {
  setTimeout(() => {
    cb(a + b)
  }, 1000)
} 

console.log('111')

const result = sum(123, 456, (res) => {
  sum(res, 7, (res) => {
    sum(res, 8, (res) => {
      sum(res, 9, (res) => {
        console.log(res)
      })
    })
  })
})
console.log(result)

console.log('222')