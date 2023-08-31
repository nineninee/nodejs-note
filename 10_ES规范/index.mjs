/*
 * @Author: hvvvvvv- 1264178545@qq.com
 * @Date: 2023-08-23 14:30:15
 * @LastEditors: hvvvvvv- 1264178545@qq.com
 * @LastEditTime: 2023-08-23 15:04:15
 * @FilePath: \node-learn\10_ES规范\index.mjs
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */

// 一、##### 导入自定义模块
// import './m1.mjs'

// import {a, b, c } from './m1.mjs'
// console.log(a, b, c)

// // 二、别名
// // import {a as namedA, b, c } from './m1.mjs'
// // console.log(namedA)

// import * as m1 from './m1.mjs'
// console.log(m1)
// console.log(m1.a)

// // 三、默认导出
// // import sum from './m1.mjs'
// // console.log(sum)

// import hello from './m1.mjs'
// console.log(hello)

// // 四、默认导出+匿名导出
// import sum, {a, b} from './m1.mjs'
// console.log(sum, a)


// 五、通过ES模块化，导入的内容都是常量
// import sum, {a, b} from './m1.mjs'
// console.log(a)
// a = 20

import sum, {a, b, c} from './m1.mjs'
console.log(c)
c.name = 'sunwukong'
console.log(c)