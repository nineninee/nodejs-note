/*
 * @Author: hvvvvvv- 1264178545@qq.com
 * @Date: 2023-09-02 10:42:37
 * @LastEditors: hvvvvvv- 1264178545@qq.com
 * @LastEditTime: 2023-09-05 21:08:53
 * @FilePath: \node-learn\25_cookie\index.js
 * @Description:  = reuqi
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
const express = require("express")
const path = require("node:path")
const fs = require('node:fs/promises')
const cookieParser = require("cookie-parser")
const userRouter = require("./routes/user")
const goodsRouter = require("./routes/goods")

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'views'))
app.use(express.static(path.resolve(__dirname, "./public")))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get("/", (req, res) => {
  res.render("login")
})

app.post("/login", (req, res) => {
  const { username, password } = req.body
  if (username === "admin" && password === "123123") {
    res.cookie("username", "admin", {
      // expires: new Date(2023, 10, 5)
      maxAge: 10000
      // maxAge: 1000 * 60 * 60 * 24 * 30
    })
    res.redirect("students/list")
  } else {
    res.send("用户名或密码错误")
  }
})

// app.use('/user', userRouter)
// app.use('/goods', goodsRouter)
app.use('/students', require('./routes/students'))

app.get("/get-cookie", (req, res) => {
  res.cookie("username", "admin", {
    expires: new Date(2023, 10, 5)
  })
  res.send("cookie已经发送")
})

app.get("/hello-cookie", (req, res) => {
  console.log(req.cookies)
  res.send("hello cookie")
})

app.get("/delete-cookie", (req, res) => {
  res.cookie("username", "", {
    maxAge: 0
  })
  res.send("cookie失效已设置为立即失效")
})

app.use((req, res) => {
  res.send('sorry, you are hacked')
})

app.listen(3000, () => {
  console.log('服务器已经启动')
})