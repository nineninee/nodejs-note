/*
 * @Author: hvvvvvv- 1264178545@qq.com
 * @Date: 2023-09-05 22:52:03
 * @LastEditors: hvvvvvv- 1264178545@qq.com
 * @LastEditTime: 2023-09-06 10:59:43
 * @FilePath: \node-learn\26_session\routes\students.js
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
const express = require('express')
const fs = require("node:fs/promises")
const path = require("node:path")
const router = express.Router()
let STUDENTS_INFO = require('../data/students.json')

router.use((req, res, next) => {
  if (req.session.loginUser) {
    next()
  } else {
    res.redirect("/")
  }
})

//  展示
router.get('/list', (req, res) => {
  res.render("students", { stus: STUDENTS_INFO, username: req.session.loginUser })
})

// 添加
router.post('/add', (req, res, next) => {
  const id = STUDENTS_INFO.at(-1) ? STUDENTS_INFO.at(-1).id + 1 : 1

  const newUser = {
    id,
    name: req.body.name,
    age: +req.body.age,
    sex: req.body.sex,
    address: req.body.address,
  }

  STUDENTS_INFO.push(newUser)

  // 调用next交由后续路由继续处理
  next()

})

// 删除
router.get('/delete', (req, res, next) => {
  const id = +req.query.id
  STUDENTS_INFO = STUDENTS_INFO.filter(stu => stu.id !== id)
  next()
})

// 修改
router.post('/update', (req, res, next) => {
  // const id = req.query.id 
  const { id, name, age, sex, address } = req.body
  
  const student = STUDENTS_INFO.find(item => item.id === +id)

  
  student.name = name
  student.age = age
  student.sex = sex
  student.address = address

  next()
  
})

router.get('/to_update', (req, res) => {
  const id = +req.query.id
  const student = STUDENTS_INFO.find(item => item.id === id)

  res.render("update", {student})
})

// 处理存储文件的中间件
router.use((req, res) => {
  fs.writeFile(path.resolve(__dirname, '../data/students.json'), JSON.stringify(STUDENTS_INFO))
    .then(() => {
      res.redirect('/students/list')
    }).catch(() => {
      res.send("处理失败")
  })
})
module.exports = router