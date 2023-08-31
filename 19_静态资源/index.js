/*
 * @Author: hvvvvvv- 1264178545@qq.com
 * @Date: 2023-08-30 12:51:30
 * @LastEditors: hvvvvvv- 1264178545@qq.com
 * @LastEditTime: 2023-08-30 17:13:10
 * @FilePath: \node-learn\19_静态资源\index.js
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
const express = require("express")
const path = require("node:path")

const app = express()

app.use(express.static(path.resolve(__dirname, "./public")))

app.get("/login", (req, res) => {
  const { username, password } = req.query
  // console.log(username, password)
  if (username === "sun" && password === "123456") {
    res.send("登录成功")
  } else {
    res.send("账号或密码错误")
  }
  
})

app.get("/", (req, res) => {
  res.send(`
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>这是一个网页</title>
    </head>
    <body>
      <h1>这是网页的标题</h1>
    </body>
  </html>
  `)
})

app.listen(3000, () => {
  console.log('服务器已经启动')
})