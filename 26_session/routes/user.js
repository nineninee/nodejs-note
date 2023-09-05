const express = require('express')

const router = express.Router()
router.get("/hello", (req, res) => {
  res.send("hello, im user")
})

module.exports = router