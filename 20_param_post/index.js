/*
 * @Author: hvvvvvv- 1264178545@qq.com
 * @Date: 2023-08-30 17:28:24
 * @LastEditors: hvvvvvv- 1264178545@qq.com
 * @LastEditTime: 2023-08-31 16:54:26
 * @FilePath: \node-learn\20_param_post\index.js
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
// 一、登录复习
// const express = require("express")
// const path = require("node:path")

// const app = express()

// app.use(express.static(path.resolve(__dirname, "./public")))

// app.get("/login", (req, res) => {
//   const { username, password } = req.query
//   if (username === "sun" && password === "123456") {
//     res.send("登录成功")
//   } else {
//     res.send("账号或密码错误")
//   }
  
// })

// app.listen(3000, () => {
//   console.log('服务器已经启动')
// })


// // 二、get请求传参的第二种方式
// const express = require("express")
// const path = require("node:path")

// const app = express()

// app.use(express.static(path.resolve(__dirname, "./public")))

// // app.get("/hello/:id", (req, res) => {
// //   const params = req.params
// //   console.log(params)
// //   res.send("这是hello路由")
// // })

// app.get("/hello/:id/:password/:age", (req, res) => {
//   const params = req.params
//   console.log(params)
//   res.send("这是hello路由")
// })

// app.listen(3000, () => {
//   console.log('服务器已经启动')
// })

// 三、post
const express = require("express")
const path = require("node:path")

const app = express()

app.use(express.static(path.resolve(__dirname, "./public")))

app.use(express.urlencoded())

app.post("/login", (req, res) => {
  // console.log(req.body)
  const { username, password } = req.body
  if (username === 'sun' && password === '123') {
    res.send("<h1>登录成功</h1>")
  } else {
    res.send("<h1>登录失败</h1>")
  }
})

app.listen(3000, () => {
  console.log('服务器已经启动')
})