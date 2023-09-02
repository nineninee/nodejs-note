/*
 * @Author: hvvvvvv- 1264178545@qq.com
 * @Date: 2023-08-31 22:23:17
 * @LastEditors: hvvvvvv- 1264178545@qq.com
 * @LastEditTime: 2023-09-01 23:23:16
 * @FilePath: \node-learn\21_模板引擎\index.js
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
const express = require("express")
const path = require("node:path")

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'views'))

app.use(express.static(path.resolve(__dirname, "./public")))

app.use(express.urlencoded({ extended: true }))

app.get('/hello', (req, res) => {
  res.send('hello')
})

// app.get('/students', (req, res) => {
//   res.render(
//     "students",
//     { name: 'sunwukong', age: 15 }
//   )
// })

app.get('/students', (req, res) => {
  res.render(
    "students",
    { name: '<h1>sunwukong</h1>' }
  )
})


app.get('/set_name', (req, res) => {
  let name = ''
  name = req.query.name
  res.render('students', {name})
})

app.use((req, res) => {
  res.send('<h1>你的请求已被外星人劫持</h1>')
})

app.listen(3000, () => {
  console.log('服务器已经启动')
})