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


const STUDENTS_INFO = [
  {
    name: '孙悟空',
    age: 18,
    sex: '男',
    address: '花果山'
  },
  {
    name: '猪八戒',
    age: 28,
    sex: '男',
    address: '高老庄'
  },
  {
    name: '沙悟净',
    age: 38,
    sex: '男',
    address: '流沙河'
  },
]

app.get('/students', (req, res) => {
  res.render(
    "students",
    { name: '<h1>sunwukong</h1>' }
  )
})


app.use((req, res) => {
  res.send('<h1>你的请求已被外星人劫持</h1>')
})

app.listen(3000, () => {
  console.log('服务器已经启动')
})