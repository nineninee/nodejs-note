/*
 * @Author: hvvvvvv- 1264178545@qq.com
 * @Date: 2023-08-22 15:20:45
 * @LastEditors: hvvvvvv- 1264178545@qq.com
 * @LastEditTime: 2023-08-22 16:10:58
 * @FilePath: \node-learn\5_宏任务与微任务\myPromise.js
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
  }
  
  // 私有的reject用来存储失败的数据
  #reject(reason) {
    console.log(reason)
  }

  // 添加读取数据的then方法
  then(onFullfilled, onRejected) {
    if (this.#state === PROMISE_STATE.FULLFILLED) {
      onFullfilled(this.#result)
    }
  }
}
const myPromise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('sunwukong')
  }, 1000)
})
myPromise.then((result) => {
  console.log('读取数据', result)
})