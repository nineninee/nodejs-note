// 一、 fs.readFileSync
// const path = require('node:path')
// const fs = require('node:fs')
// const buf = fs.readFileSync(path.resolve(__dirname, './hello.txt'))
// console.log(buf)

// const path = require('node:path')
// const fs = require('node:fs')
// const buf = fs.readFileSync(path.resolve(__dirname, './hello.txt'))
// console.log(buf.toString())


// 二、fs.readFile
// const path = require('node:path')
// const fs = require('node:fs')
// const buf = fs.readFile(
//   path.resolve(__dirname, './hello.txt'),
//   (err, buffer) => {
//     if(err) console.log('出错了')
//     else console.log(buffer.toString())
//   }
// )
// console.log('后续代码')


// const path = require('node:path')
// const fs = require('node:fs/promises')
// const buf = fs.readFile(
//   path.resolve(__dirname, './hello.txt')
// )
//   .then(buffer =>
//   console.log(buffer.toString())
//   ).catch(e => console.log('出错了'))

// const path = require('node:path')
// const fs = require('node:fs/promises')
// ; (async () => {
//   try {
//     const buf = await fs.readFile(path.resolve(__dirname, './helle.txt'))
//     console.log(buf.toString())
//   } catch (e) {
//     console.log('出错了')
//   }
// })()


// 三、 fs.appendFile
// const path = require('node:path')
// const fs = require('node:fs/promises')
// const buf = fs.appendFile(
//   path.resolve(__dirname, './hello.txt'),
//   '，但是我们会尽量玩的开心点'
// )
//   .then(r =>
//   console.log('添加成功')
//   )

// const path = require('node:path')
// const fs = require('node:fs/promises')
// const buf = fs.appendFile(
//   path.resolve(__dirname, './hello123.txt'),
//   '，但是我们会尽量玩的开心点'
// )
//   .then(r =>
//   console.log('添加成功')
//   )

// // 复制图片（文件）
// const path = require('node:path')
// const fs = require('node:fs/promises')
// fs.readFile('D:\\Microsoft Edge\\download\\meinv.jpg')
//   .then(buffer=> {
//     return fs.appendFile(path.resolve(__dirname, './meinvzi.jpg'), buffer)
//   })
//   .then(() => console.log('操作结束'))
  


// // 四、fs.mkdir()
// const path = require('node:path')
// const fs = require('node:fs/promises')
// fs.mkdir(
//   path.resolve(__dirname, './hello/abc'),
//   {
//     recursive: true
//   })
//   .then(r => {
//   console.log('操作成功')
//   })
//   .catch(e=>console.log(e))

// 五、fs.rmdir()
// const path = require('node:path')
// const fs = require('node:fs/promises')
// fs.rmdir(path.resolve(__dirname, './hello'))
//   .then(r => {
//   console.log('操作成功')
//   })
//   .catch(e=>console.log(e))

// 六、fs.rename()
const path = require('node:path')
const fs = require('node:fs/promises')
fs.rename(path.resolve(__dirname, '../meinvzi.jpg'), path.resolve(__dirname, './dameinvzi.jpg'))
  .then(r => {
  console.log('操作成功')
  })
  .catch(e => console.log(e))
  