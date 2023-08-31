/*
 * @Author: hvvvvvv- 1264178545@qq.com
 * @Date: 2023-08-22 14:06:15
 * @LastEditors: hvvvvvv- 1264178545@qq.com
 * @LastEditTime: 2023-08-22 14:42:12
 * @FilePath: \node-learn\5_宏任务与微任务\index.js
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */

// 一、宏任务队列与微任务队列
// // 定时器的作用是间隔一段事件后，将函数放到任务队列中，0ms代表立即放到任务队列中
// setTimeout(() => {
//   console.log(1)
// }, 1000)

// // Promise的执行原理
// // - Promise在执行，then就相当于给Promise回调函数
// // 	  当Promise的状态从pending变为fullfilled时，then的回调函数被放到任务队列中
// Promise.resolve(1).then(() => {
//   console.log(3)
// })

// console.log(2)

// // 2 3 1


// 二、queueMicrotask()

// // 案例1：
// setTimeout(() => {
//   console.log(1)
// }, 0)

// queueMicrotask(() => {
//   console.log(2)
// })

// Promise.resolve(1).then(() => {
//   console.log(3)
// })

// console.log(4)
// // 4 3 2 1

// // 案例2：
// queueMicrotask(() => {
//   console.log(2)
// })

// Promise.resolve(1).then(() => {
//   setTimeout(() => {
//     console.log(1)
//   }, 0)
// })

// console.log(3)
// // 3 2 1


// // 案例3：
// Promise.resolve(1).then(() => {
//   Promise.resolve().then(() => {
//     console.log(1);
//   })
// })

// queueMicrotask(() => {
//   console.log(2)
// })
// //2 1


// 案例4：
console.log(1)

setTimeout(() => {
  console.log(2)
})

Promise.resolve().then(() => {
  console.log(3);
})


Promise.resolve().then(() => {
  setTimeout(() => {
    console.log(4)
  })
})

Promise.resolve().then(() => {
  console.log(5);
})

setTimeout(() => {
  console.log(6)
})

console.log(7)

// 1 7 3 5 2 6 4