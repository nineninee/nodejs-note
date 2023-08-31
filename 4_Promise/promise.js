/*
 * @Author: hvvvvvv- 1264178545@qq.com
 * @Date: 2023-08-21 20:59:31
 * @LastEditors: hvvvvvv- 1264178545@qq.com
 * @LastEditTime: 2023-08-21 22:07:00
 * @FilePath: \node-learn\4_Promise\promise.js
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
// Promise就是一个存储数据的对象
// 但是由于Promise存取数据的方式比较特殊，所以可以直接将异步调用的结果存储到Promise中
const promise = new Promise((resolve, reject) => {
  reject("hi")
})

// promise.then(result => {
//   console.log(result)
// }, reason => {
//   console.log(reason)
// })

// function sum(a, b) {
//   return new Promise((resolve, reject) => {
//     setTimeout(()=>{
//       resolve(a + b)
//     }, 2000)
//   })
// }

// sum(123, 456).then(res => {
//   console.log(res)
// })

// sum(123, 456).then(res => {
//   sum(res, 7).then(res => {
//     sum(res, 8).then(res => {
//       console.log(res)
//     })
//   })
// })


// Promise中的then、catch、finally这三个方法都会返回一个新的Promise
// const p2 = promise.then(result => {
//   console.log('回调函数', result)
//   return 'hello'
// })
// console.log(p2) //undefined


// const p2 = promise.then(result => {
//   console.log('回调函数', result)
//   return 'hello'
// })
// setTimeout(() => {
//   console.log(p2) //Promise:hello
// }, 1000)


// 链式调用
// sum(123, 456)
//   .then(res => res + 7)
//   .then(res => res + 8)
//   .then(res => console.log(res))

//链式调用带catch
// promise
//   .then(res => console.log('first then', res))
//   .catch(r => {
//     console.log(r)
//     return 'xixi'
//   })
//   .then(r => console.log('second then', r))


// 链式调用带catch
promise
  .then(res => console.log('first then', res))
  .catch(r => {
    throw new Error('error')
    console.log(r)
    return 'xixi'
  })
  .then(r => console.log('second then', r))
  // .catch(r=>console.log('chucuole'))