/*
 * @Author: hvvvvvv- 1264178545@qq.com
 * @Date: 2023-09-02 10:42:37
 * @LastEditors: hvvvvvv- 1264178545@qq.com
 * @LastEditTime: 2023-09-06 15:02:14
 * @FilePath: \node-learn\28_csrf\index.js
 * @Description:  = reuqi
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
const express = require("express")
const path = require("node:path")
const fs = require('node:fs/promises')
const cookieParser = require("cookie-parser")
const session = require("express-session")
let FileStore = require("session-file-store")(session)

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'views'))
app.use(express.static(path.resolve(__dirname, "./public")))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(session({
  store: new FileStore({
    path: path.resolve(__dirname, "./sessions"),
    secret: "hello",
    // ttl: 10,
    // reapInterval: 10,
  }),
  secret: 'hello',
  // cookie: {
  //   maxAge: 1000 * 3600
  // }
}))

app.use('/students', require('./routes/students'))

app.get("/", (req, res) => {
  res.render("login")
})

app.post("/login", (req, res) => {
  const { username, password } = req.body
  if (username === "admin" && password === "123123") {
    req.session.loginUser = username
    req.session.save(() => {
      res.redirect("students/list")
    })
  } else {
    res.send("用户名或密码错误")
  }
})

app.get("/logout", (req, res) => {
  // 使session失效
  req.session.destroy(() => {
    res.redirect("/")
  })
})

app.get("/set", (req, res) => {
  req.session.username = "sunwukong"
  res.send("查看session")
})

app.get("/get", (req, res) => {
  const username = req.session.username
  console.log(username)
  res.send("读取session")
})

app.use((req, res) => {
  res.send('sorry, you are hacked')
})

app.listen(3000, () => {
  console.log('服务器已经启动')
})