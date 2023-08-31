/*
 * @Author: hvvvvvv- 1264178545@qq.com
 * @Date: 2023-08-30 12:51:30
 * @LastEditors: hvvvvvv- 1264178545@qq.com
 * @LastEditTime: 2023-08-30 12:58:54
 * @FilePath: \node-learn\18_nodemon\index.js
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
const express = require("express")

const app = express()

// app.use("/", (req, res, next) => {
//   console.log("111", Date.now())
//   res.send("111")
//   next()
// })

app.get("/hello", (req, res) => {
  res.send("<h1>这是hello路由!hi</h1>")
})

app.listen(3000, () => {
  console.log('服务器已经启动')
})