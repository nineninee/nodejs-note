/*
 * @Author: hvvvvvv- 1264178545@qq.com
 * @Date: 2023-08-21 22:10:02
 * @LastEditors: hvvvvvv- 1264178545@qq.com
 * @LastEditTime: 2023-08-21 22:35:01
 * @FilePath: \node-learn\4_Promise\promise2.js
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */

// 静态方法
//  一、Promise.resolve() 创建一个立即完成的Promise
//  二、Promise.rejec() 创建一个立即拒绝的Promise

// Promise.resolve(10).then(  r=> console.log(r))
// new Promise((resolve, reject) => {
//   resolve(10)
// })

// 三、Promise.all
// function sum(a, b) {
//   return new Promise((resolve, reject) => {
//     setTimeout(()=>{
//       resolve(a + b)
//     }, 2000)
//   })
// }
// Promise.all([
//   sum(124, 456),
//   sum(5, 6),
//   Promise.reject('cuowu'),
//   sum(33, 44)
// ]).then(r => console.log(r))


// 四、Promise.allSettled()
// function sum(a, b) {
//   return new Promise((resolve, reject) => {
//     setTimeout(()=>{
//       resolve(a + b)
//     }, 2000)
//   })
// }
// Promise.allSettled([
//   sum(124, 456),
//   sum(5, 6),
//   Promise.reject('cuowu'),
//   sum(33, 44)
// ]).then(r=> console.log(r))

// 五、Promise.race()
// function sum(a, b) {
//   return new Promise((resolve, reject) => {
//     setTimeout(()=>{
//       resolve(a + b)
//     }, 2000)
//   })
// }
// Promise.race([
//   sum(124, 456),
//   sum(5, 6),
//   sum(33, 44)
// ]).then(r => console.log(r))
//   .catch(r => console.log(r))

// 五、Promise.any()
function sum(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve(a + b)
    }, 2000)
  })
}
// Promise.any([
//   sum(124, 456),
//   Promise.reject('reject'),
//   sum(5, 6),
//   sum(33, 44)
// ]).then(r => console.log(r))
//   .catch(r => console.log(r))

  
Promise.any([
  Promise.reject('reject1'),
  Promise.reject('reject2'),
  Promise.reject('reject3'),
]).then(r => console.log(r))
  .catch(r => console.log(r))
  

