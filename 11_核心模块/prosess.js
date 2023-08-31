/*
 * @Author: hvvvvvv- 1264178545@qq.com
 * @Date: 2023-08-23 16:20:39
 * @LastEditors: hvvvvvv- 1264178545@qq.com
 * @LastEditTime: 2023-08-23 22:36:34
 * @FilePath: \node-learn\11_核心模块\prosess.js
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */

// 一、ES标准的全局对象globalThis
// // console.log(window)
// console.log(global)
// console.log(global === globalThis)

// // 二、process.exit
// console.log(11)
// process.exit()
// console.log(22)
// console.log(33)

// 三、process.nextTicl(callback[, ...args])
setTimeout(() => {
  console.log(1)
})

queueMicrotask(() => {
  console.log(2)
})

process.nextTick(() => {
  console.log(3)
})

console.log(4)