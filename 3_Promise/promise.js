/*
 * @Author: hvvvvvv- 1264178545@qq.com
 * @Date: 2023-08-21 16:01:09
 * @LastEditors: hvvvvvv- 1264178545@qq.com
 * @LastEditTime: 2023-08-21 20:43:02
 * @FilePath: \node-learn\3_Promise\promise.js
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */

// 一、异步函数+回调
// function sum(a, b, cb) {
//   setTimeout(() => {
//     cb(a + b)
//   }, 1000)
// }

// sum(123, 456, (res) => {
//   console.log(res)
// })


// 二、创建promise、向promise中存数据、从promise中读数据
// 创建Promise
// 创建Promise时，构造函数中需要一个函数作为参数
// Promise构造函数的回调函数，他会在创建Promise时调用，调用时会有两个参数传进去
const promise = new Promise((resolve, reject) => {
  // resolv和reject是两个函数，通过这两个函数可以向promise中存储数据
  // resolve在执行正常时存储数据，reject在执行错误时存储数据
  // resolve(1)
  // 通过函数向promise中添加数据，好处就是可以用来添加异步调用的数据
  // setTimeout(() => {
  //   resolve('1')
  // }, 1000)

  // throw new Error('error')

  // resolve('resolve')

  reject('reject')
})

// console.log(promise)

// setTimeout(() => {
//   console.log(promise)
// }, 1000)

/**
 * 从Promise中读取数据
 *  可以通过promise的实例方法then来读取promise中存储的数据
 *  then需要两个回调函数作为参数，回调函数用来获取Promise中的数据
 *    通过resolve存储的数据，会调用第一个函数返回，可以在第一个函数中编写处理数据的代码
 *    通过reject存储的数据或出现异常时，会调用第二个函数返回，可以在第二个函数中编写处理异常的代码
 */
// promise.then((result) => {
//   console.log('1', result)
// }, (reason) => {
//   console.log('2', reason)
// })


// 三、promise的原理
/**
 * promsie中维护了两个隐藏属性：
 *  PromiseResult：
 *    - 用来存储数据
 *  PromiseState：
 *    - 记录Promise的状态（三种状态）
 *       pending（进行中） 无论哪种状态的数据都还没存进去
 *       fullfilled（完成） 通过resolve存储数据
 *       rejected（拒绝，出错了） 出错了或通过rejected存储数据
 *    - state只能修改一次，修改后永远不会再变
 *  流程：
 *    当Promise创建时，PromiseState初始值为pending，
 *      当通过resolve存储数据时，PremiseState变为fullfilled，PromiseResult变为存储的数据；
 *      当通过reject存储数据时，PremiseState变为rejected，PromiseResult变为存储的数据 或 异常对象；
 * 
 *    当通过then读取数据时，相当于为Promise设置了回调函数，
 *      如果PromiseState变为fullfilled，则调用then的第一个回调函数来返回数据；
 *      如果PromiseState变为rejected，则调用then的第二个回调函数来返回数据；
 */
const promise2 = new Promise((resolve, reject) => {
  // setTimeout(() => {
  //   resolve('resolve')
  // }, 2000)

  resolve('resolve')

  // reject('reject')
})

// then
// promise2.then((result) => {
//   console.log(result)
// }, reason => {
//   console.log(reason)
// })

// catch
promise2.catch(reason => {
  console.log('catch reason')
})

promise2.finally(result => {
  console.log('无论正常存储数据还是出现异常了，finally总会执行')
})