/*
 * @Author: hvvvvvv- 1264178545@qq.com
 * @Date: 2023-09-02 10:42:37
 * @LastEditors: hvvvvvv- 1264178545@qq.com
 * @LastEditTime: 2023-09-05 14:32:16
 * @FilePath: \node-learn\24_router\index.js
 * @Description:  = reuqi
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
const express = require("express")
const path = require("node:path")
const fs = require('node:fs/promises')
const userRouter = require("./routes/user")
const goodsRouter = require("./routes/goods")

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'views'))
app.use(express.static(path.resolve(__dirname, "./public")))
app.use(express.urlencoded({ extended: true }))


// app.use('/user', userRouter)
// app.use('/goods', goodsRouter)
app.use('/students', require('./routes/students'))

app.use((req, res) => {
  res.send('sorry, you are hacked')
})

app.listen(3000, () => {
  console.log('服务器已经启动')
})