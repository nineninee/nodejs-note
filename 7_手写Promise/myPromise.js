/*
 * @Author: hvvvvvv- 1264178545@qq.com
 * @Date: 2023-08-22 15:20:45
 * @LastEditors: hvvvvvv- 1264178545@qq.com
 * @LastEditTime: 2023-08-22 20:37:09
 * @FilePath: \node-learn\7_手写Promise\myPromise.js
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */

const PROMISE_STATE = {
  PENDING: 0,
  FULLFILLED: 1,
  REJECTED: 2
}
class MyPromise{

  // 创建一个变量用来存储Promise的结果
  #result
  // 创建一个变量记录 Promise的状态
  #state = PROMISE_STATE.PENDING //pending: 0 fullfilled: 1 rejected: 2
  // 创建一个变量来存储回调函数
  //  由于回调函数可能有多个，我们使用数组来存储回调函数
  #callbacks = []


  constructor(executor){
    executor(this.#resolve.bind(this))
  }

  // 私有的resolv用来存储成功的数据
  #resolve(value) {
    // 禁止重复修改
    // 如果state不等于0，说明值已经被修改，函数直接返回
    if (this.#state !== PROMISE_STATE.PENDING) return 
    
    this.#result = value
    this.#state = PROMISE_STATE.FULLFILLED //数据填充成功

    // 当resolve执行时，说明数据已经进来了，需要调用then的回调函数
    queueMicrotask(() => {
      this.#callbacks.forEach(cb => {
        cb()
      })
    })
  }
  
  // 私有的reject用来存储失败的数据
  #reject(reason) {
    console.log(reason)
  }

  // 添加读取数据的then方法
  then(onFullfilled, onRejected) {
    return new MyPromise((resolve, reject)=>{
      if (this.#state === PROMISE_STATE.PENDING) {
        // 进入判断说明数据还没有进入Promise，将回调函数设置为callback的值
        this.#callbacks.push(() => {
          resolve(onFullfilled(this.#result))
        })
      } else if (this.#state === PROMISE_STATE.FULLFILLED) {
        queueMicrotask(() => {
          resolve(onFullfilled(this.#result))
        })
      }
    })
  }
}
const myPromise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('zhubajie')
  }, 1000)
})

// 三、解决不能链式调用的问题
// const result = myPromise.then(res => {
//   console.log('读取数据1', res)
// })
// console.log(result)

myPromise.then(res => {
  console.log('读取数据1', res)
  return 'sunwukong'
}).then(res => {
  console.log('读取数据2', res)
})

// 二、解决我们的Promise不能多次回调的问题
// myPromise.then((result) => {
//   console.log('读取数据1', result)
// })
// myPromise.then((result) => {
//   console.log('读取数据2', result)
// })


// 一、Promise下数据应该能反复读
// const p = Promise.resolve('sunwukong')
// p.then(r => console.log('第一次读', r))
// p.then(r => console.log('第二 次读', r))
