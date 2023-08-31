/*
 * @Author: hvvvvvv- 1264178545@qq.com
 * @Date: 2023-08-22 20:46:57
 * @LastEditors: hvvvvvv- 1264178545@qq.com
 * @LastEditTime: 2023-08-22 22:34:11
 * @FilePath: \node-learn\8_async&await\index.js
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */

// 一、async可以快速创建异步函数
// 通过async可以快速创建异步函数，异步函数的返回值会自动封装到一个Promise中
// function fn1() {
//   return new Promise((resolve, reject) => {
//     resolve(100)
//   })
// }
// let res = fn1()
// console.log(res) //Promise 100

// function fn1() {
//   return 10
// }
// let res = fn1()
// console.log(res) //10

// async function fn1() {
//   return 10
// }
// let res = fn1()
// res.then(r=>console.log(r))
// console.log(res)

// 二 使用await来调用异步函数
// 2.1
// function sum(a, b) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(a + b)
//     }, 1000)
//   })
// }

// async function fn3() {
//   sum(123, 456)
//     .then(r => r + 7)
//     .then(r => r + 8)
//     .then(r => console.log(r))
// }

// fn3()


// 2.2
// function sum(a, b) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(a + b)
//     }, 1000)
//   })
// }

// async function fn3() {
//   try {
//     let result = await sum(123, 456)
//     result = await sum(result, 7)
//     result = await sum(result, 8)
//     console.log(result)
//   } catch(e) {
//     console.log('出错了')
//   }
// }

// fn3()

// console.log('全局的输出')

// 2.3 async声明的异步函数中没有写await
// async function fn3() {
//   console.log(1)
//   console.log(2)
//   console.log(3)
// }

// // async function fn3() {
// //   return new Promise(resolve => {
// //     console.log(1)
// //     console.log(2)
// //     console.log(3)
// //     resolve()
// //   })
// // }

// fn3()

// console.log(4)

// 2.4 await后面跟同步代码
// // async function fn3() {
// //   console.log(1)
// //   await console.log(2)
// //   console.log(3)
// // }

// function fn3() {
//   new Promise((resolve, reject) => {
//     console.log(1)
//     console.log(2)
//     resolve()
//   }).then(r => {
//     console.log(3)
//   })
// }


// fn3()

// console.log(4)


// 2.5
(async()=>{
	await console.log(111)
})()