const express = require('express')

const router = express.Router()
router.get("/hello", (req, res) => {
  res.send("hello, im goods")
})

module.exports = router