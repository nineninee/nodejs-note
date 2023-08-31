/*
 * @Author: hvvvvvv- 1264178545@qq.com
 * @Date: 2023-08-30 11:38:22
 * @LastEditors: hvvvvvv- 1264178545@qq.com
 * @LastEditTime: 2023-08-30 12:38:38
 * @FilePath: \node-learn\17_express\index.js
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */

// 引入express
const express = require("express")

// 获取服务器的实例（对象）
const app = express()


// app.use("/", (req, res) => {
//   console.log("收到请求...", Date.now())
//   res.send("这是通过中间件返回的响应")
// })
app.use("/", (req, res, next) => {
  console.log("111", Date.now())
  res.send("111")
  next()
})

app.use("/", (req, res, next) => {
  console.log("222", Date.now())
  // res.send("222")
  next()

})

app.use("/", (req, res) => {
  console.log("333", Date.now())
  res.send("333")
})


// 如果希望服务器可以正常访问，则需要为服务器配置路由，路由可以根据不同的请求方式和请求地址来处理用户的请求
app.get("/", (req, res) => {
  console.log("有人访问我了")

  console.log(req.url)

  res.send("<h1>你的请求没有问题，但是就是不给你看</h1>")
})



// 启动服务器
// app.listen（端口号）用来启动服务器
// 服务器启动后，我们便可以通过3000端口来访问了
// 协议名://ip地址：端口号/路径
// express是http服务
app.listen(3000, () => {
  // 这个回调函数表示服务器启动后执行
  console.log('服务器已经启动')
})