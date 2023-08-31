/*
 * @Author: hvvvvvv- 1264178545@qq.com
 * @Date: 2023-08-23 22:43:33
 * @LastEditors: hvvvvvv- 1264178545@qq.com
 * @LastEditTime: 2023-08-23 23:08:09
 * @FilePath: \node-learn\11_核心模块\path.js
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */

// // 一、引入
// const path = require('node:path')
// console.log(path)


// // 二、path.resolve(\[...paths])
// const path = require('node:path')
// const result = path.resolve()
// console.log(result)

// // 三、path.resolve(\[...paths])
// const path = require('node:path')
// const result = path.resolve('./hello.js')
// console.log(result)

// // 四、path.resolve(\[...paths])
// const path = require('node:path')
// const result = path.resolve('D:\\VSC\\node-learn','../../hello.js')
// console.log(result)

// 五、path.resolve(\[...paths])
const path = require('node:path')
const result = path.resolve(__dirname,'./hello.js')
console.log(result)