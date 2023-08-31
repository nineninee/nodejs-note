/*
 * @Author: hvvvvvv- 1264178545@qq.com
 * @Date: 2023-08-22 23:14:27
 * @LastEditors: hvvvvvv- 1264178545@qq.com
 * @LastEditTime: 2023-08-23 14:02:28
 * @FilePath: \node-learn\9_CommonJS规范\index.js
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
// require('./m1.js')

// const m1 = require('./m1.js')
// console.log(m1)
// console.log(m1.c)


// 引入核心模块
// const path = require('path')
// const path = require('node:path')


// 只引入模块中的部分内容
const {a, d} = require('./m1')
console.log(d)