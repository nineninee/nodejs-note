/*
 * @Author: hvvvvvv- 1264178545@qq.com
 * @Date: 2023-09-02 10:42:37
 * @LastEditors: hvvvvvv- 1264178545@qq.com
 * @LastEditTime: 2023-09-05 13:01:42
 * @FilePath: \node-learn\22_练习\index.js
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
const express = require("express")
const path = require("node:path")
const fs = require('node:fs/promises')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'views'))

app.use(express.static(path.resolve(__dirname, "./public")))

app.use(express.urlencoded({ extended: true }))

app.get('/hello', (req, res) => {
  res.send('hello')
})

let STUDENTS_INFO = require("./data/students.json")

app.get('/students', (req, res) => {
  res.render(
    "students",
    { stus: STUDENTS_INFO }
  )
})

// 创建一个添加学生信息的路由
app.post('/add_students', (req, res) => {
  // 路由要做什么
  // 生成一个id 不用length是因为他的变化太大了，如果删除一个可能会出现重复的id
  const id = STUDENTS_INFO.at(-1) ? STUDENTS_INFO.at(-1).id + 1 : 1

  // 1.获取用户填写的信息
  const newUser = {
    id,
    name: req.body.name,
    age: +req.body.age,
    sex: req.body.sex,
    address: req.body.address,
  }

  // 2.验证用户信息（比如验证是否重复等 比较麻烦 可以能还要数据库）

  // 3.将用户添加到数组中
  STUDENTS_INFO.push(newUser)

  // 4.返回响应
  // res.send('添加成功')
  // res.render('students', {stus: STUDENTS_INFO})
  // res.redirect()用来发起请求重定向

  // 将新的数据写入json中
  fs.writeFile(path.resolve(__dirname, './data/students.json'), JSON.stringify(STUDENTS_INFO))
    .then(() => {
      res.redirect('students')
    }).catch(() => {
    // ... 
  })

})

app.get('/delete', (req, res) => {
  const id = +req.query.id

  STUDENTS_INFO = STUDENTS_INFO.filter(stu => stu.id !== id)
  
  fs.writeFile(path.resolve(__dirname, './data/students.json'), JSON.stringify(STUDENTS_INFO))
  .then(() => {
    res.redirect('students')
  }).catch(() => {
  // ... 
})
})

app.post('/update_student', (req, res) => {
  // const id = req.query.id 
  const { id, name, age, sex, address } = req.body
  
  const student = STUDENTS_INFO.find(item => item.id === +id)

  
  student.name = name
  student.age = age
  student.sex = sex
  student.address = address

  fs.writeFile(path.resolve(__dirname, './data/students.json'), JSON.stringify(STUDENTS_INFO))
  .then(() => {
    res.redirect('students')
  }).catch(() => {
  // ... 
})
  
})

app.get('/to_update', (req, res) => {
  const id = +req.query.id
  const student = STUDENTS_INFO.find(item => item.id === id)

  res.render("update", {student})
})

app.use((req, res) => { 
  res.send('<h1>你的请求已被外星人劫持</h1>')
})

app.listen(3000, () => {
  console.log('服务器已经启动')
})