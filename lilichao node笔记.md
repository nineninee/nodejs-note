### 1. node的安装与简介
基础概念：客户端 服务器 数据库
客户端向服务器发送请求，服务器创建线程，线程访问数据库等操作来处理请求，服务器返回数据。

与Java的不同点：
（客户 线程-服务员 厨师）
- 在Java中，每个客户端请求都会创建一个线程，初始可能还会有很多线程，这样会造成资源浪费。node中，就只是单线程的。
- java中创建的线程会花费很多很多时间来等待请求处理结果，每个线程只针对某个特定的请求；node中，一个线程在请求结果没有处理好的时候会去相应其他请求，请求处理好了就返回结果

Node..js特点：
- 运行在服务器端的js
- 用来编写服务器
- 特点：
	- 单线程、异步(可以在等待的时候相应其他请求)、非阻塞(操作数据库的时候不会阻塞其他程序的运行)
	- 统一API
当然node也有缺点，他的开发者目前正在放弃它，转而开发deno.js

Node.js版本：
16 LTS：长期维护版

nvm与npm：
npm是管理node中的包的，
nvm就是管理node本身的（安装卸载切换版本）
```js
//查看nvm版本
nvm version
//查看nvm下已安装的node
nvm list
//安装指定版本node
nvm install 版本
//配置nvm镜像服务器
nvm  node_mirror https://npmmirror.com/mirrors/node/
//指定要使用的node版本
nvm use 版本
```

执行node
```js
//进入到node命令行（node riple界面）和浏览器的控制行是一样的，可以写js
node
//执行某个脚本
node test.js
//键盘F5选择调试器

```

node与js的区别：
js有三部分组成：
- ECMAScript(语法标准)
- DOM(文档对象模型，操作网页)
- BOM(浏览器对象模型，操作浏览器)
node.js也遵循ECMAScript标准，但是没有dom和bom，这两个是浏览器运行时独有的。
不过node还保留了一些有用的，如consoloe，setTimeOut等，而window，navigation，location，alert等就没保留。






### 2. 同步和异步
#### 进程和线程
进程：进程是程序运行的环境。我们的程序运行时需要开辟空间来存储代码，这个空间就可以理解成一个进程。类似于厂房。
线程：线程是实际进行运算的东西。类似于工人。
#### 同步
通常情况下我们的代码都是自上而下一行一行执行。
如果前面的代码不执行，后面的代码也不会执行。
同步代码执行会出现阻塞的情况，一行代码执行慢会影响到整个程序的执行。

#### 解决同步的问题
- Java python
	通过多线程来解决。但是多线程对计算机的性能要求更高，要能容纳多线程；其次对代码能力要求也比较高，需要能编写程序管理线程。
- node.js
	通过异步的方式来解决。等待异步代码的过程中继续执行后面的代码。

#### 异步
- 一段代码的执行不会影响到其他代码的执行。
	比如setTimeOut。
- 异步的问题
	异步的代码无法通过return来设置返回值，可以通过回调函数来解决
- 特点
	1. 不会阻塞其他代码的执行
	2. 需要通过回调函数来返回结果
- 基于回调函数的异步带来的问题（回调地狱）
	1. 代码可读性差
	2. 可调试性差
归根结底就是因为异步调用必须要通过回调函数来返回结果
- 解决回调地狱
	1. 需要一个东西可以代替回调函数来给我们返回结果
	2. Promise横空出世
		Promise是可以用来存储数据的对象
			Promise存储数据的方式比较特殊，这种特殊方式使得Promise可以用来存储异步调用的数据。



### 3. Promise介绍
异步调用必须要通过回调函数来返回数据
	当我们进行一些复杂的调用的时候，会出现“回调地狱”
	
问题：
异步必须通过回调函数来返回结果，回调函数一多就很痛苦

Promise：
- Promise可以帮助我们解决异步中回调函数的问题
- promise就是一个用来存储数据的容器
	它拥有一套特殊的存取数据的方式
	这个方式使得他里边可以存储异步调用的结果


#### 创建promise、向promise中存数据、从promise中读数据
```js
// 创建Promise
// 创建Promise时，构造函数中需要一个函数作为参数
// Promise构造函数的回调函数，他会在创建Promise时调用，调用时会有两个参数传进去
const promise = new Promise((resolve, reject) => {
  // resolv和reject是两个函数，通过这两个函数可以向promise中存储数据
  // resolve在执行正常时存储数据，reject在执行错误时存储数据
  // resolve(1)
  // 通过函数向promise中添加数据，好处就是可以用来添加异步调用的数据
  // setTimeout(() => {
  //   resolve('1')
  // }, 1000)

  // throw new Error('error')

  // resolve('resolve')

  reject('reject')
})

/**
 * 从Promise中读取数据
 *  可以通过promise的实例方法then来读取promise中存储的数据
 *  then需要两个回调函数作为参数，回调函数用来获取Promise中的数据
 *    通过resolve存储的数据，会调用第一个函数返回，可以在第一个函数中编写处理数据的代码
 *    通过reject存储的数据或出现异常时，会调用第二个函数返回，可以在第二个函数中编写处理异常的代码
 */
promise.then((result) => {
  console.log('1', result)
}, (reason) => {
  console.log('2', reason)
})
```

#### promise的原理：
 * Promsie中维护了两个隐藏属性：
	 * PromiseResult：
			 用来存储数据
	 *  PromiseState：
		 * 记录Promise的状态（三种状态）
		 *       pending（进行中） 无论哪种状态的数据都还没存进去
		 *       fullfilled（完成） 通过resolve存储数据
		 *       rejected（拒绝，出错了） 出错了或通过rejected存储数据
		 *    -state只能修改一次，修改后永远不会再变
	 *  流程：
		 *    当Promise创建时，PromiseState初始值为pending，
			 *      当通过resolve存储数据时，PremiseState变为fullfilled，PromiseResult变为存储的数据；
			 *      当通过reject存储数据时，PremiseState变为rejected，PromiseResult变为存储的数据 或 异常对象；
		 *    当通过then读取数据时，相当于为Promise设置了回调函数，
			 *      如果PromiseState变为fullfilled，则调用then的第一个回调函数来返回数据；
			 *      如果PromiseState变为rejected，则调用then的第二个回调函数来返回数据；
	-  catch()用法和then类似，但是只需要一个回调函数作为参数
		- catch中的回调函数只会在Promise被拒绝时调用
		- catch相当于then(null, reason=>{})
		- catch就是一个专门处理Promise异常的方法
	- finall()
		- 无论正常存储数据还是出现异常了，finally总会执行
		- 但是finally接收的回调函数中不会接收到数据
		- finally通常用来编写一些无论成功与否都要执行的代码
```js
// 三、promise的原理
const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('resolve')
  }, 2000)

  // resolve('resolve')

  // reject('reject')
})
promise2.then((result) => {
  console.log(result)
}, reason => {
  console.log(reason)
})
```



### 4. Promise详解
Promise就是一个存储数据的对象
但是由于Promise存取数据的方式比较特殊，所以可以直接将异步调用的结果存储到Promise中

```js
function sum(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve(a + b)
    }, 2000)
  })
}
sum(123, 456).then(res => {
  console.log(res)
})
```

#### Promise中的then、catch、finally这三个方法都会返回一个新的Promise, Promise会存储回调函数的返回值
- then (return new Promise())
- catch
- finally
	- finally的返回值，不会存储到新的Promise中
```js
const p2 = promise.then(result => {
  console.log('回调函数', result)
})
console.log(p2) //undefined
```

```js
const p2 = promise.then(result => {
  console.log('回调函数', result)
  return 'hello'
})
console.log(p2) //undefined 因为这行先执行
```

```js
const p2 = promise.then(result => {
  console.log('回调函数', result)
  return 'hello'
})
setTimeout(() => {
  console.log(p2) //Promise:hello
}, 1000)
```

##### promise的链式调用(then/catch)
```js
function sum(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve(a + b)
    }, 2000)
  })
}

sum(123, 456).then(res => {
  sum(res, 7).then(res => {
    sum(res, 8).then(res => {
      console.log(res)
    })
  })
})

sum(123, 456)
  .then(res => res + 7)
  .then(res => res + 8)
  .then(res=> console.log(res))

```

对Promise进行链式调用时，后边的方法（then/catch）读取上一步的执行结果，如果上一步的执行结果不是当前想要的结果，则跳过当前的方法。
```js
const promise = new Promise((resolve, reject) => {
  resolve("hi")
})
promise
  .then(res => 'haha')
  .catch(r => console.log(r)) //
  .then(r => console.log(r)) // haha
//这里catch没捕获到异常，等于不执行这条语句
```

```js
const promise = new Promise((resolve, reject) => {
  reject("hi")
})
promise
  .then(res => console.log('first then', res))
  .catch(r => {
    console.log(r)
    return 'xixi'
  })
  .then(r => console.log('second then', r))
//第一个then等于不执行
//hi
//second then xixi
```


当Promise中出现异常时，而整个调用链中没有出现catch，则异常会向外抛出
```js
const promise = new Promise((resolve, reject) => {
  reject("hi")
})
promise
  .then(res => console.log('first then', res))
  .catch(r => {
    throw new Error('error')
    console.log(r)
    return 'xixi'
  })
  .then(r => console.log('second then', r))
// Process exited with code 1
// Uncaught Error Error: error
```

```js
const promise = new Promise((resolve, reject) => {
  reject("hi")
})
promise
  .then(res => console.log('first then', res))
  .catch(r => {
    throw new Error('error')
    console.log(r)
    return 'xixi'
  })
  .then(r => console.log('second then', r))
  .catch(r=>console.log('chucuole'))
//chucuole
```






#### 静态方法
##### Promise.resolve() 
 创建一个立即完成的Promise
```js
Promise.resolve(10).then(  r=> console.log(r))
```

```js
Promise.resolve(10)
new Promise((resolve, reject) => {
  resolve(10)
})
```

##### Promise.rejec() 
创建一个立即拒绝的Promise
```js
Promise.reject('error')
```



##### Promise.All([...])
同时返回多个Promise的执行结果
有一个报错，就返回错误
```js
function sum(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve(a + b)
    }, 2000)
  })
}
Promise.all([
  sum(124, 456),
  sum(5, 6),
  sum(33, 44)
]).then(r=> console.log(r))
//[580, 11, 77]
```

```js
function sum(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve(a + b)
    }, 2000)
  })
}
Promise.all([
  sum(124, 456),
  sum(5, 6),
  Promise.reject('cuowu'),
  sum(33, 44)
]).then(r=> console.log(r))
//Uncaught Error UnhandledPromiseRejection: This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). The promise rejected with the reason "cuowu".
```

##### Promise.allSettled([...])
同时返回多个Promise的执行结果（无论成功或失败）
```js
function sum(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve(a + b)
    }, 2000)
  })
}
Promise.allSettled([
  sum(124, 456),
  sum(5, 6),
  Promise.reject('cuowu'),
  sum(33, 44)
]).then(r=> console.log(r))
[
{status: 'fulfilled', value: 580},
{status: 'fulfilled', value: 11},
{status: 'rejected', reason: 'cuowu'},
{status: 'fulfilled', value: 77}



]
```
##### Promise.race([...])
返回执行最快的Promise（不考虑成功或失败）
```js
function sum(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve(a + b)
    }, 2000)
  })
}
Promise.race([
  sum(124, 456),
  sum(5, 6),
  Promise.reject('cuowu'),
  sum(33, 44)
]).then(r => console.log(r))
  .catch(r => console.log(r))
//cuowu

Promise.race([
  sum(124, 456),
  sum(5, 6),
  Promise.resolve('hi'),
  sum(33, 44)
]).then(r => console.log(r))
  .catch(r => console.log(r))
//hi

Promise.race([
  sum(124, 456),
  sum(5, 6),
  sum(33, 44)
]).then(r => console.log(r))
  .catch(r => console.log(r))
//580
```
##### Promise.any([...])
返回执行最快的完成的Promise
```js
function sum(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve(a + b)
    }, 2000)
  })
}
Promise.any([
  sum(124, 456),
  sum(5, 6),
  sum(33, 44)
])
.then(r => console.log(r))
.catch(r => console.log(r))
//580

Promise.any([
  sum(124, 456),
  Promise.resolve('hello'),
  sum(5, 6),
  sum(33, 44)
]).then(r => console.log(r))
  .catch(r => console.log(r))
//hello

Promise.any([
  sum(124, 456),
  Promise.reject('reject'),
  sum(5, 6),
  sum(33, 44)
]).then(r => console.log(r))
  .catch(r => console.log(r))
//580

Promise.any([
  Promise.reject('reject1'),
  Promise.reject('reject2'),
  Promise.reject('reject3'),
]).then(r => console.log(r))
  .catch(r => console.log(r))
//All promises were rejected', message: 'All promises were rejected', errors: Array(3)

```


### 5. 宏任务和微任务
##### 事件循环机制
js是单线程的，它的运行是基于事件循环机制（event loop）
- 调用栈
	- 栈：栈是一种数据结构，后进先出
	- 调用栈中，放的是要执行的代码
- 任务队列
	- 队列：队列是一种数据结构，先进先出
	- 任务队列中的是将要执行的代码
	- 当调用栈中的代码执行完成以后，队列中的代码才会按照顺序依次进入到栈中执行
	- Js中的任务队列有两种
		- 宏任务队列 (大部分代码都会到宏任务队列中去排队)
		- 微任务队列（Promise的回调函数then、catch、finally）
	- 整个流程
		1. 执行调用栈中的代码
		2. 执行微任务队列中的所有任务
		3. 执行宏任务队列中的所有任务

##### 定时器
作用是间隔一段事件后，将函数放到任务队列中，0ms代表立即放到任务队列中
```js
setTimeout(() => {
  console.log(1)
}, 1000)
```

##### Promise的执行原理
- Promise在执行，then就相当于给Promise回调函数
	当Promise的状态从pending变为fullfilled时，then的回调函数被放到任务队列中
```js
Promise.resolve(1).then(() => {
  console.log(3)
})
```

##### queueMicrotask():
用来向微任务队列中添加一个任务
```js
setTimeout(() => {
  console.log(1)
}, 0)

queueMicrotask(() => {
  console.log(2)
})

Promise.resolve(1).then(() => {
  console.log(3)
})

console.log(4)
// 4 3 2 1
```

```js
queueMicrotask(() => {
  console.log(2)
})

Promise.resolve(1).then(() => {
  setTimeout(() => {
    console.log(1)
  }, 0)
})

console.log(3)
// 3 2 1
```

```js
Promise.resolve(1).then(() => {
  Promise.resolve().then(() => {
    console.log(1);
  })
})

queueMicrotask(() => {
  console.log(2)
})
//2 1
```

```js
// 案例4：
console.log(1)

setTimeout(() => {
  console.log(2)
})

Promise.resolve().then(() => {
  console.log(3);
})


Promise.resolve().then(() => {
  setTimeout(() => {
    console.log(4)
  })
})

Promise.resolve().then(() => {
  console.log(5);
})

setTimeout(() => {
  console.log(6)
})

console.log(7)

// 1 7 3 5 2 6 4
```

##### 手写promise

###### MyPromise类及构造函数
```js
class MyPromise{
  constructor(executor){
    executor()
  }
}
const myPromise = new MyPromise((resolve, reject) => {
  console.log('回调函数执行了')
})
//executor相当于回调函数(resolve, reject) => {}
```
###### resolve方法
```js
class MyPromise{
  constructor(executor){
    executor(this.#resolve)
  }
  // 私有的resolv用来存储成功的数据
  #resolve(value) {
    console.log('resolve被调用了 value值是：', value)
  }
}
const myPromise = new MyPromise((resolve, reject) => {
  resolve('sunwukong')
})
//resolve被调用了 value值是： sunwukong
```

###### 创建一个变量用来存储Promise的结果：#result
注意不能直接在#resolve方法中调用`this.#result = value`
```js
#result
#resolve(value) {
	this.#result = value
	console.log('resolve被调用了 value值是：', value)
}
//此时的this是undefined
因为在创建实例时，回调函数中的resolve并没有指定是谁调用的
注：类当中的代码默认实在严格模式下运行的
	如果类中的某个函数调用时没有指定是谁调用的，那么这个函数里的this默认undefined
```

**可以通过两个办法解决**
1. 将#resolve变为箭头函数，和上一个区别是，上面的#resolve是存放在原型上的，而这个#resolve是存放在实例上的，可能会更加耗费内存
```js
#resolve = (value) => {
	this.#result = value
	console.log('resolve被调用了 value值是：', value)
}
```
2. 在构造函数中使用bind绑定this
```js
constructor(executor){
	executor(this.#resolve.bind(this))
}
```

###### 使用state，使得Promise中的数据只能被修改一次

```js
#result
#state = 0 //pending: 0 fullfilled: 1 rejected: 2

constructor(executor){
	executor(this.#resolve.bind(this))
}
#resolve(value) {
	// 禁止重复修改
	// 如果state不等于0，说明值已经被修改，函数直接返回
	if (this.#state !== 0) return 
	
	this.#result = value
	this.#state = 1 //数据填充成功
}
```


###### 添加读取数据的then方法
then方法需要能被访问，所以不能私有，不能带#
```js
class MyPromise{
	// ...
	then(onFullfilled, onRejected) {
		if (this.#state === 1) {
		  onFullfilled(this.#result)
		}
	}
}
const myPromise = new MyPromise((resolve, reject) => {
  resolve('sunwukong')
  resolve('zhubajie')
})
myPromise.then((result) => {
  console.log('读取数据', result)
})
```

###### 存放异步数据问题
现在还有一个问题，还不能存放异步的数据：
因为调用then的时候数据还没存，状态就不是1，then的回调函数就不会执行
```js
const myPromise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('sunwukong')
  }, 1000)
})
myPromise.then((result) => {
  console.log('读取数据', result)
})
```


### 6. 手写promise
#### 把promise状态存到对象中
```js
const PROMISE_STATE = {
  PENDING: 0,
  FULLFILLED: 1,
  REJECTED: 2
}
class MyPromise{
	...
	#state = PROMISE_STATE.PENDING
	#resolve(value) {
    if (this.#state !== PROMISE_STATE.PENDING) return 
	    this.#result = value
	    this.#state = PROMISE_STATE.FULLFILLED
	}
	then(onFullfilled, onRejected) {
	    if (this.#state === PROMISE_STATE.FULLFILLED) {
	      onFullfilled(this.#result)
	    }
	}
  }
}
```

#### 解决不能存放异步数据的问题
目前来讲， then只能读取已经存储到Promise中的数据，而不能读取异步存储的数据。
```js
const myPromise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('sunwukong')
  }, 1000)
})

myPromise.then((result) => {
  console.log('读取数据', result)
})
//没有输出 因为调用then的时候state还不是fullfilled，onFullfilled就不执行，他不执行就不console.log('读取数据', result)
```

当resolve执行时，说明数据已经进来了，需要调用then的回调函数。所以需要在resolve中收到数据时也能访问then中的onFullfilled函数，需要创建一个变量来存储回调函数：
```js
// 创建一个变量来存储回调函数
#callback
#resolve(value) {
	if (this.#state !== PROMISE_STATE.PENDING) return 
	
	this.#result = value
	this.#state = PROMISE_STATE.FULLFILLED
	
	// 当resolve执行时，说明数据已经进来了，需要调用then的回调函数
	this.#callback(this.#result)
}
  
then(onFullfilled, onRejected) {
	if (this.#state === PROMISE_STATE.PENDING) {
	  // 进入判断说明数据还没有进入Promise，将回调函数设置为callback的值
	  this.#callback = onFullfilled
	}
	  
	if (this.#state === PROMISE_STATE.FULLFILLED) {
	  onFullfilled(this.#result)
	}
}
```

这里又存在一个问题是当直接resolve的时候，不能调用callback，会报错,因为此时还没有callback。
```js
const myPromise = new MyPromise((resolve, reject) => {
    resolve('sunwukong')
})
```

可加一个判断
```js
#resolve(value) {
	//..
	this.#callback && this.#callback(this.#result)
}
```


#### 将then回调函数放到为任务队列中
then的回调函数应该放到微任务队列中执行，而不是直接调用
```js
#resolve(value) {
	// 禁止重复修改
	// 如果state不等于0，说明值已经被修改，函数直接返回
	if (this.#state !== PROMISE_STATE.PENDING) return 
	
	this.#result = value
	this.#state = PROMISE_STATE.FULLFILLED //数据填充成功
	
	// 当resolve执行时，说明数据已经进来了，需要调用then的回调函数
	queueMicrotask(() => {
	  this.#callback && this.#callback(this.#result)
	})
}

then(onFullfilled, onRejected) {
	if (this.#state === PROMISE_STATE.PENDING) {
	  this.#callback = onFullfilled
	} else if (this.#state === PROMISE_STATE.FULLFILLED) {
	  queueMicrotask(() => {
		onFullfilled(this.#result) 
	  })
	}
}
```





### 7. 手写Promise
#### Promise下数据应该能反复读
正常的Promise应该能反复读取数据
```js
const p = Promise.resolve('sunwukong')
p.then(r => console.log('第一次读', r))
p.then(r => console.log('第二次读', r))
//第一次读 孙悟空
//第二次读 孙悟空
```
但是我们的Promise不可以，这是因为在第一次then的时候，会将then的回调函数赋值给`#callback`，在执行第二次then的时候，又会将then的回调函数赋值给`#callback`，`#callback`的值被覆盖了，所以只能拿到最后一次
```js
const myPromise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('zhubajie')
  }, 1000)
})

myPromise.then((result) => {
  console.log('读取数据1', result)
})
myPromise.then((result) => {
  console.log('读取数据2', result)
})
//读取数据2 zhubajie
```


#### 解决我们的Promise不能多次回调的问题
由于回调函数可能有多个，我们使用数组来存储回调函数
```js
class MyPromise{
	#callbacks = []
	then(onFullfilled, onRejected) {
		if (this.#state === PROMISE_STATE.PENDING) {
		  this.#callbacks.push(() => {
			onFullfilled(this.#result)
		  })
		} else if (this.#state === PROMISE_STATE.FULLFILLED) {
		  //...
		}
	}
	#resolve(value) {
		// ...
		queueMicrotask(() => {
		  this.#callbacks.forEach(cb => {
			cb()
		  })
		})
	}
}

myPromise.then((result) => {
  console.log('读取数据1', result)
})
myPromise.then((result) => {
  console.log('读取数据2', result)
})
//读取数据1 zhubajie
//读取数据2 zhubajie
```


#### 解决不能链式调用的问题
当前我们的then返回的是undefined
```js
const myPromise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('zhubajie')
  }, 1000)
})

const result = myPromise.then(res => {
  console.log('读取数据1', res)
})
console.log(result) //undefined
```

要支持链式调用，必须要让我们的then返回Promise
```js
then(onFullfilled, onRejected) {
	return new MyPromise((resolve, reject)=>{
	  if (this.#state === PROMISE_STATE.PENDING) {
		// 进入判断说明数据还没有进入Promise，将回调函数设置为callback的值
		this.#callbacks.push(() => {
		  onFullfilled(this.#result)
		})
	  } else if (this.#state === PROMISE_STATE.FULLFILLED) {
		queueMicrotask(() => {
		  onFullfilled(this.#result) 
		})
	  }
	})
}
```

但是此时then返回的Promise的state总是0（penging）
此时我们要搞清楚谁将成为then返回的新的Promise中的数据：then回调函数的返回值，会成为新的Promise中的数据。所以我们可以使用resolve将then回调函数保存在新的Promise中：
```js
then(onFullfilled, onRejected) {
	return new MyPromise((resolve, reject)=>{
	  if (this.#state === PROMISE_STATE.PENDING) {
		this.#callbacks.push(() => {
		  resolve(onFullfilled(this.#result))
		})
	  } else if (this.#state === PROMISE_STATE.FULLFILLED) {
		//...
	})
}
```
这里也解释了为什么`callbacks`中存放的是箭头函数：
因为这里我们需要将回调函数的返回值存放在`resolve`中，如果我们直接将`onFullfilled`存放在`callbacks`中，那么我们就需要到外层Promise的`resolve`中去获取`onFullfilled`的返回值再放到内层的resolve中
```js
this.#callbacks.push(() => {
  resolve(onFullfilled(this.#result))
})
```

此时就支持链式调用了：
```js
const myPromise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('zhubajie')
  }, 1000)
})

myPromise.then(res => {
  console.log('读取数据1', res)
  return 'sunwukong'
}).then(res => {
  console.log('读取数据2', res)
})
```

### 8. async && await
#### async可以快速创建异步函数
通过async可以快速创建异步函数，异步函数的返回值会自动封装到一个Promise中，他其实是Promise的语法糖
```js
function fn1() {
  return new Promise((resolve, reject) => {
    resolve(100)
  })
}
let res = fn1()
console.log(res) //Promise 100

function fn1() {
  return 10
}
let res = fn1()
console.log(res) //10

async function fn1() {
  return 10
}
let res = fn1()
res.then(r=>console.log(r)) //10
console.log(res) //Promise 10
```

#### 使用await来调用异步函数
Promise虽然通过链式调用解决了异步调用中回调函数的问题，但是链式调用太多了以后还是不好看。
```js
function sum(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b)
    }, 1000)
  })
}

async function fn3() {
  sum(123, 456)
    .then(r => r + 7)
    .then(r => r + 8)
    .then(r => console.log(r))
}

fn3()
```

我们更希望以同步的方式调用异步的代码（一行一行写）;
在async声明的异步函数中可以使用await关键字来调用异步函数，当我们通过await去调用异步函数时，他会暂停代码的运行，直到异步代码有结果时才会把结果返回;
```js
async function fn3() {
  let result = await sum(123, 456)
  console.log(result)
}
```

注意await只能用于async声明的异步函数中，或es模块的顶级作用域中，这几样就是为了避免我们的await阻塞其他程序的执行, 所以await阻塞的只是异步函数内部的代码，不会影响外部的。
阻塞内部的代码是没问题的，因为他后面的代码往往就是需要等待await的结果才继续执行。
```js
async function fn3() {
  let result = await sum(123, 456)
  console.log(result)
}
fn3()

console.log('全局的输出')
//全局的输出
//579
```

通过await调用异步代码，需要通过try-catch来处理异常
```js
async function fn3() {
  try {
    let result = await sum(123, 456)
    result = await sum(result, 7)
    result = await sum(result, 8)
    console.log(result)
  } catch(e) {
    console.log('出错了')
  }
}
```

如果async声明的异步函数中没有写await，那么他里面就是一次执行，与其它函数的不同区别是他会返回一个Promise
```js
async function fn3() {
  console.log(1)
  console.log(2)
  console.log(3)
}
fn3()

console.log(4)
//1234
```
上面地`fn3`等价于
```js
async function fn3() {
  return new Promise(resolve => {
    console.log(1)
    console.log(2)
    console.log(3)
    resolve()
  })
}

```

当我们使用await调用函数后，当前函数后面的所有代码会在当前函数执行完毕以后，被放入到微任务队列
```js
async function fn3() {
  console.log(1)
  await console.log(2)
  //后面的所有代码会在当前函数执行完毕以后，被放入到微任务队列
  console.log(3)
}
fn3()

console.log(4)
//1243
```
上面的fn3等价于：
```js
function fn3() {
  new Promise((resolve, reject) => {
    console.log(1)
    console.log(2)
    resolve()
  }).then(r => {
    console.log(3)
  })
}

```

#### es模块的顶级作用域
普通script标签
```js
<script>
	await console.log(1243)
</script>
//Uncaught SyntaxError: await is only valid in async functions and the top level bodies of modules
```

type="module"的script 
```html
<script type="module">
	await console.log(1243)
</script>
//控制台：1243
```

普通js文件
```js
await console.log(123)
//报错
```

mjs文件
```js
await console.log(123)
//123
```

要在普通js文件中直接使用await，可以使用匿名立即执行函数
注：这里要注意分号的问题， 避免把立即执行函数的分号和前面的代码合并
```js
fn5();
(async()=>{
	await console.log(111)
})()
```

### 9. CommonJS规范
#### 早期的网页中没有实质的模块化规范
 - 我们实现模块化的方式，就是最原始的通过script标签来引入多个js文件
 问题：
 - 无法选择要引入模块的哪些内容
	 比如引入jquery就要引入全部的jquery
 - 在复杂的场景下给肠溶衣出错
	 有的库相互依赖，比如jquery-ui依赖jquery，如果引入顺序出错，jquery-ui就不能用了
于是我们急需在js中引入一个模块化的解决方案
	nodejs在09年出来，这中规范15年才有，于是前端工程师自己设计了一套
	
#### CommonJS
commonjs
是js当中的模块化规范，不是js官方定义的规范，是社区第三方设计的规范。同时他也是nodejs中默认使用的模块化规范。

在node中，默认支持的模块化规范叫做CommonJS；
在CommonJS中，一个js文件就是一个模块。

##### CommonJS规范
引入模块的方式不同于script标签直接把代码复制粘贴到某个位置
- 引入模块
	- 使用require('模块路径')函数来引入模块
		require可以加载模块内容，并把引进来的内容作为返回值返回，可以用变量接收
	- 引入自定义模块时，模块名要以./ ../开头
		- 定义模块时，模块中的内容默认是不能被外部看到的,可以通过exports来设置要向外部暴露的内容。
		- 访问exports的方式有两种
			- exports
			- module.exports
			- 当我们在其他模块引入当前模块时，require函数返回的就是exports
			- 可以将希望暴露给外部模块的内容设置成exports的属性
		- 扩展名可以不写
			- 在CommonJS中，如果省略js文件的扩展名，node会自动为文件补全扩展名，
			- js-->json-->node（特殊）
	- 引入核心模块时
		- 直接写核心模块的名字即可
		- 也可以在核心模块前添加`node：`来说明是核心模块，这样找的更快

##### require引入模块
CommonJS导出的变量我们可以用变量接收，变量叫什么就叫什么，所以不涉及别名
```js
//m1.js
let a = 10
let b = 20
console.log('m1')

//index.js
const m1 = require('./m1.js') //m1
console.log(m1) //{}
```

只引入模块中的部分内容
```js
// 一个
const d = require('./m1').d
console.log(d)

//多个
const {a, d} = require('./m1')
console.log(d)
```
##### 内部模块使用exports / module.exports导出
```js
//m1.js
// console.log(exports) //{}
// console.log(module.exports) //{}
// console.log(exports === module.exports) //true
exports.a = 'sunwukong'
exports.b = 'zhubajie'
exports.c = 'shaseng'

//index.js
const m1 = require('./m1.js') 
console.log(m1) //{a: 'sunwukong', b: 'zhubajie', c: 'shaseng'}
console.log(m1.a) //sunwukong
```
#####  module.exports 导出多个模块
```js
module.exports = {
  d: 'hello',
  c: () => {
    console.log('haha')
  }
}

//不能写成下面这种形式，这个形式等于该exports，上面的形式等于修改module对象的属性；这种形式导入以后输出这个模块还是空对象
exports = {
  d: 'hello',
  c: () => {
    console.log('haha')
  }
}
```

##### Nodejs默认会将一下内容视为CommonJS规范
- 使用.cjs为扩展名的
- 
- 
- 
- 
- 文件 (此时要注意引入该模块时必须要带拓展名了)
	- cjs为文件扩展名，表示是一个CommonJS标准的模块
- 当前的package.json的type属性为commonjs的时候，拓展名为.js的文件
- 当前的package.json不包含type属性时，拓展名为.js的文件
- 文件的扩展名是mjs、cjs、json、node、js以外的值时（type不是module时）


##### 文件夹作为模块
文件夹整体是一个大模块，内部有很多小模块，但是往往会有一个主体，这个主文件默认是`index.js`, 在这个文件中统筹其他模块。
```js
require('./hello')
require('./hello/index.js')
//两条语句等价
```
如果主文件不是`index.js`，引入时要指明。


#### CommonJS原理

我们可以直接使用module、exports、require，但并不代表他们是全局变量。
```js
m1.js
let a = 10
let b = 20
```

当我们在`m1.js`模块中写入上述代码时，实际上等于下面的代码，会在外面套一个函数，所以上面三个并不是全局变量，而是参数。
```js
(function (exports, require, module, __filename, __dirname) {
  let a = 10
  let b = 20
})
```

这些就是一个闭包，因为模块时执行在一个函数里的，a、b都是藏在闭包里的。
要证明这一点只需要在`m1.js`中输出arguments，会发现他有5个参数。
 __filename：当前模块的绝对路径，在哪里打印就是哪里的路径
 __dirname：当前模块所在目录的路径（没有文件名）


### 10. ES模块化规范
CommonJS规范是比较早的。ESMAScript后来也意识到js中没有模块化，是与时代脱轨的，于是在2015年es6标准发布时定义了自己的模块标准，并且在Nodejs中同样也支持ES标准的模块化。
说来说去模块化无非是文件的导入导出。

#### 默认情况下，node中的模块化标准是CommonJS；
要想使用ES的模块化，可以使用以下两种方案：
1. 使用mjs作为文件扩展名
	想要验证可以在模块`m1.mjs`文件中打印`console.log(module)`，会报错`module is not defined in ES module scope`
2. 直接修改`package.json`的`"type": 'module'`将模块化规范设置为ES模块，这就等于将整个项目都改成es6模块化标准。
	此时即使是在.js文件中打印`console.log(module)`，还是会报错`module is not defined in ES module scope`
```js
{
	"type": 'module'
	//"type": 'commonjs'
}	
```


#### 开发时使用哪个规范
`"type": 'module'`要不要都行，但是一般还是CommonJS规范用的多一点，并且他是默认的。

#### ES模块使用
##### 导入自定义模块
导入自定义模块时，官方标准是es模块不能省略扩展名。
核心模块另说；
当我们使用框架react时，可以不用写是因为有webpack打包工具，他会帮助我们自动补这个扩展名。
```js
// m1.mjs
export let a = 10
export let b = 'sunwukong'
export const c = {
  name: 'zhunajie'
}
console.log('haha')
```

```js
// index.mjs
import './m1.mjs'
import {a, b, c } from './m1.mjs'
console.log(a, b, c)
//haha
//10 sunwukong {name: 'zhunajie'}
```

##### 别名
**通过as指定别名**
`import {a, b, c } from './m1.mjs'`，在`m1.mjs`中的名字是什么，导入时{}里就是什么。
```js
import {a as namedA, b, c } from './m1.mjs'
console.log(namedA)
//haha
//10
```

**import * as m1 from './m1.mjs'**
```js
import * as m1 from './m1.mjs'
console.log(m1)
console.log(m1.a)
//haha
//Module {a: <accessor>, b: <accessor>, c: <accessor>, Symbol(Symbol.toStringTag): 'Module'}
//10
```
需要注意的是开发时要尽量避免使用`import *` 的情况；
在写后台项目的时候，`import *` 还是一个一个`import`区别影响不大； 
如果是前端项目，使用`import *` 是非常可怕的，因为webpack会会对我们的文件进行检索，把我们需要的js、图片等所有资源打包到一个文件最后上线供我们使用； 当我们使用`import *` 时会引入模块所有内容，webpack打包时会默认所有代码都有用，灰会把所有代码都打包进去，会时项目变得臃肿，影响性能。


##### export default 设置默认导出
export default后面一定必须跟值（数字，对象，函数等），不能写一个语句。
```js
//不允许
export default let d = 'hello'

//允许
let d 
export default d = 'hello'
```

**export default 设置默认导出**
```js
//m1.mjs
export default function sum(a, b){
  return a + b
}
```

**导入模块的默认导出**
```js
//index.js
import sum from './m1.mjs'
console.log(sum)
//ƒ sum(a, b){ return a + b }
```

**默认导出的内容，可以随意命名**
```js
import hello from './m1.mjs'
console.log(hello)
//ƒ sum(a, b){ return a + b }
```

**一个模块中只有一个默认导出**

**默认导出+匿名导出**
默认导出不带{}， 匿名导出带{}
```js
import sum, {a, b} from './m1.mjs'
console.log(sum, a)
//ƒ sum(a, b){ return a + b }     10
```

##### 通过ES模块化，导入的内容都是常量
```js
export let a = 10

import sum, {a, b} from './m1.mjs'
console.log(a)
a = 20
//10
//Assignment to constant variable.
```

```js
export let a = 10

import sum, {a, b} from './m1.mjs'
console.log(a)
a = 20
// {name: 'zhunajie'}
// {name: 'sunwukong'}
```

##### ES模块都是运行在严格模式下的

##### ES模块化在浏览器中同样支持，但是通常我们不会直接使用
因为在浏览器中运行我们要考虑兼容性问题，服务器开发兼容性问题比较少，客户端数量很多，可能chrome支持，但是其他浏览器不支持。
所以通常都会结合打包工具使用。

### 11. 核心模块
核心模块时node中的内置模块，这些模块有的可以直接在node中使用，有的直接引入即可使用。

window是浏览器的宿主对象，node中是没有的；
global是node中的全局对象，作用类似于window；
但他们两个都不是es规定的全局对象的标准名，window是浏览器自己起的，global是node自己起的。
在ES标准下，全局对象的标准名应该是globalThis。
```js
console.log(window)  //undefined
console.log(global) //global对象
console.log(global === globalThis) //true
```

在浏览器中打印globalThis输出window对象
```shell
> globalThis
< Window{..}
```

核心模块有很多，这里简单介绍几个。

#### Process
process表示当前的node进程；
通过该对象可以过去进程的信息，或者对进程的信息做各种操作；
如何使用：
- 如何获取：process是一个全局变量，可以直接使用
- 有哪些属性和方法：
	- process.exit()：结束当前进程
		- 可传数字，表示程序结束的原因，数字意义自己来定，通常我们用不上
	- process.nextTicl(callback\[, ...args])：将函数插入到tick队列中
		-  调用栈-tick队列-微任务队列-宏任务队列，tick队列中的代码，会在下一次事件循环之前执行，即会在微任务和宏任务队列之前执行。

```js
console.log(process)
// process对象
```

**process.exit()**
```js
console.log(11)
process.exit()
console.log(22)
console.log(33)
// 11
```

**process.nextTicl(callback\[, ...args])**
```js
setTimeout(() => {
  console.log(1)
})

queueMicrotask(() => {
  console.log(2)
})

process.nextTick(() => {
  console.log(3)
})

console.log(4)
// 4 3 2 1
```

#### path
path表示路径，通过path可以用来获取各种路径；
要使用path，需要先对其进行引入；
```js
console.log(path)
//Uncaught ReferenceError ReferenceError: path is not defined
```

```js
const path = require('node:path')
console.log(path)
//{resolve: ƒ, normalize: ƒ, isAbsolute: ƒ, join: ƒ, relative: ƒ, …}里面有join relative等的方法
```

##### 方法
###### path.resolve(\[...paths])
用来生成一个绝对路径
- 相对路径： ./xx    ../xx    xx
- 绝对路径：
	- 在计算机本地：c:\xx    /User/xxx
	- 在网络中：http://www.xxx/  https://www.xxx/

**如果直接调用resolve，则返回当前的工作目录**
- 注意当我们通过不同的方式执行代码时，他的工作目录可能发生变化（比如F5和Terminal）
```js
const path = require('node:path')
const result = path.resolve()
console.log(result)
// D:\VSC\node-learn
```

**如果resolve传一个相对路径作为参数，那么resolve会将其转换为绝对路径**
- 因为F5和Terminal会根据工作目录的不同，产生的绝对路径也不同
- 一般会将一个绝对路径作为第一个参数，一个相对路径作为第二个参数，这样它会自动计算出最终的路径
	- 绝对路径可以直接使用字符串，这里需要注意windows的路径是`\`，在指定绝对路径时`\`会被认为是转义字符，我们可以把`\`换成`\\`或`/`
	- 绝对路径也可以使用`__dirname`, `__dirname`获取当前脚本的绝对路径，并且Debug Console和Terminal都一样。提高了代码的健壮性。
```js
const path = require('node:path')
const result = path.resolve('./hello.js')
console.log(result)
```

```js
const path = require('node:path')
const result = path.resolve('D:\\VSC\\node-learn','./hello.js')
console.log(result)
//这样Debug Console和Terminal都会输出D:\VSC\node-learn\hello.js

const result = path.resolve('D:\\VSC\\node-learn','../hello.js')
console.log(result)
//D:\VSC\hello.js

const result = path.resolve('D:\\VSC\\node-learn','../../hello.js')
console.log(result)
//D:\hello.js
```

```js
const path = require('node:path')
const result = path.resolve(__dirname,'./hello.js')
console.log(result)
// Debug Console和Terminal都会输出D:\VSC\node-learn\11_核心模块\hello.js
```

#### fs(file system)
文件系统，帮助node来操作计算机磁盘中的文件；
文件操作也就是所谓的IO操作。
使用fs模块，同样需要引入。

##### fs.readFileSync()
fs.readFileSync('filename')
readFileSync是同步的方法，换句话说，他会阻塞我们代码的执行。
```js
const fs = require('node:fs')
fs.readFileSync('./hello.txt')
//F5报错no such file 'hello.txt',
//Terminal正常输出 <Buffer e4 b8 8b e9 9d a2 e5 87 a0 e5 a4 a9 e5 a4 a9 e6 b0 94 e9 a2 84 e6 8a a5 e9 83 bd e4 b8 8d e5 a4 aa e5 a5 bd>
//这是因为工作路径不同，f5的工作路径是NODE-LEARN，也就是当前打开的文件夹。

//可以通过path的__dirname来解决
const path = require('node:path')
const fs = require('node:fs')
const buf = fs.readFileSync(path.resolve(__dirname, './hello.txt'))
console.log(buf)
```

当我们通过fs模块读取磁盘中的数据时，读取到的数据总会以Buffer对象的形式返回，Buffer是一个临时用来存储数据的缓冲区，磁盘中的数据--缓冲区--内存。

我们读取的文件可能是视频、音频和文本等。可以通过`toString()`方法判断。
```js
// ...
console.log(buf.toString())
//下面几天天气预报都不太好
```


##### fs.readFile()
fs.readFile()是异步读取文件的方法, 他需要回调函数。
不建议使用fs.readFileSync来读取文件，因为他是同步的，如果文件很大，程序就会在这里停留很长时间。
```js
const path = require('node:path')
const fs = require('node:fs')
const buf = fs.readFile(
  path.resolve(__dirname, './hello.txt'),
  (err, buffer) => {
    if(err) console.log('出错了')
    else console.log(buffer.toString())
  }
)
//后续代码
//下面几天天气预报都不太好
```

Promise版本的fs
`const fs = require('node:fs/promises')`
```js
const path = require('node:path')
const fs = require('node:fs/promises')
const buf = fs.readFile(path.resolve(__dirname, './hello.txt'))
  .then(buffer => console.log(buffer.toString())
  ).catch(e => console.log('出错了'))
//下面几天天气预报都不太好
```

```js
const path = require('node:path')
const fs = require('node:fs/promises')
; (async () => {
  try {
    const buf = await fs.readFile(path.resolve(__dirname, './helle.txt'))
    console.log(buf.toString())
  } catch (e) {
    console.log('出错了')
  }
})()
```



##### fs.appendFile(file, data)
fs.appendFile(file, data)创建新文件，或将数据添加到已有的文件中
```js
const path = require('node:path')
const fs = require('node:fs/promises')
const buf = fs.appendFile(
  path.resolve(__dirname, './hello.txt'),
  '，但是我们会尽量玩的开心点'
)
  .then(r =>
  console.log('添加成功')
  )
// 目录下的hello.txt文件末尾会添加我们的指定的内容。
```

如果`path.resolve(__dirname, './hello123.txt')`找不到对应的文件，则会创建这个文件并写入相应的内容。

复制文件(图片)
```js
const path = require('node:path')
const fs = require('node:fs/promises')
fs.readFile('D:\\Microsoft Edge\\download\\meinv.jpg')
  .then(buffer=> {
    return fs.appendFile(path.resolve(__dirname, './meinvzi.jpg'), buffer)
  })
  .then(()=>console.log('操作结束'))
```

##### fs.mkdir(file, {})
创建目录
```js
const path = require('node:path')
const fs = require('node:fs/promises')
fs.mkdir(path.resolve(__dirname, './hello/abc'))
  .then(r => {
  console.log('操作成功')
  })
  .catch(e=>console.log(e))
```
如果当前目录有hello文件夹，则成功，若没有则、报错。

`mkdir`可以接受一个配置对象作为第二个参数，通过该对象可以对方法的功能进行配置
- recursive：默认为false，设置成true以后会自动创建不存在的上一级目录。

##### fs.rmdir(file, {})
删除目录
```js
const path = require('node:path')
const fs = require('node:fs/promises')
fs.rmdir(path.resolve(__dirname, './hello'))
  .then(r => {
  console.log('操作成功')
  })
  .catch(e=>console.log(e))
```
如果hello目录下有内容，删除失败。否则删除成功。

`rmdir`可以接受一个配置对象作为第二个参数，通过该对象可以对方法的功能进行配置
- recursive：默认为false，设置成true以后会递归删除。

递归删除要慎重

##### fs.rm()
删除文件

##### fs.rename(old, new)
重命名
```js
const path = require('node:path')
const fs = require('node:fs/promises')
fs.rename(path.resolve(__dirname, '../meinvzi.jpg'), path.resolve(__dirname, './dameinvzi.jpg'))
  .then(r => {
  console.log('操作成功')
  })
  .catch(e=>console.log(e))
```
##### fs.copyFile(src, dest)
复制文件



### 12. npm包管理器
随着项目复杂度的提升，我们不可能所有的代码都自己一行一行地写，于是我们就需要将一些现成的写好的代码引入我们的项目中来帮助完成开发，例如JQuery。这种外部代码在项目中称为包。

越复杂的项目需要引入更多的包，随着包数量的增加，包管理的问题也被抬上了桌面。如何下载包，如何删除包，如何更新包，等等一系列问题等待我们处理。包管理器便是帮助我们解决这个问题的工具。
#### NPM
node中的包管理器叫做npm。npm是世界上最大的包管理库。作为开发人员，我们可以将自己开发的包上传到npm中供别人说使用，也可以直接从npm中下载别人开发好的包，在自己的项目中使用。

npm由以下三部分组成
1. npm网站（通过npm网站可以查找包，也可以管理自己开发提交到npm中的包。[npm](https://www.npmjs.com/)）
2. **npm CLI**(command line interface 即命令行)（通过npm命令行，可以在计算机中操作npm中的各种包（上传和下载等））
3. 仓库（仓库用来存储包以及包相关的各种信息）

npm在安装node时候已经一起安装，所以只要node正常安装了，npm自然就可以直接使用了。可以在命令行输入`npm -v`来查看npm是否安装

#### package.json
package.json是一个用来描述包的json文件。他里面需要一个json格式的数据（json对象），在json文件中通过各个属性来描述基本信息，像包名、版本、依赖等包相关的一切信息。
node通过该文件来对项目进行描述。
每一个node项目必须要有package.json
```json
{
  "name": "my_project",
  "version": "1.0.0",
  "author": "nineninee",
  "scripts": {
    "test": "dir",
    "hello": "dir"
  },
  "dependencies": {
    "lodash": "^4.17.21"
  }
}
```

json的语法很严格，整体是一个对象，对象中的属性名和属性值都必须要用双引号包裹。
`name`和`version`是必须的。
- name：属性值可以有字母数字下划线，不能有大写字母
- version：表示版本信息。
	- 第一位表示大版本，大版本之间可能不能兼容。
	- 第二位表示在大版本之上新增了一些功能，还是互相兼容的
	- 第三位表示对当前版本的修复，发布补丁。
- scripts：
	- 可以自定义一些命令，例如上面的test，当我执行`test`命令的时候就等于执行了`dir`命令，显示当前文件的结构。
	- 要在当前项目下执行命令，不然会报错。
	- 一般用来写一些很长的命令；
	- 只有`test`和`start`可以直接用`npm test`和`npm start`来执行，如果是其他命令，需要使用`npm run hello`来执行

##### 命令
###### 初始化项目，package.json自动创建
```shell
// 初始化项目，创建package.json文件（需要回答问题）
npm init

// 所有选项都按默认的来（所有值都采用默认值）
npm init -y
```

######  将指定包下载到我们的项目中
包在npm的仓库中，所以需要联网下载，下载速度和网速也有关系。
```shell
// 初始化项目，创建package.json文件（需要回答问题）
npm install packagename
// 简写
npm i packagename

// 指定要安装的包的版本
npm i lodash@3.2.0

// 指定要安装的包大于某个版本
npm i lodash@"> 3.2.0"


```

npm install时发生了什么？
1. 将包下载到当前项目的node_modules目录下
2. 会在package.json的dependencies属性中添加一个新属性
	- ^：匹配最新的4.x.x版本(如果后期lodash更新到了4.18.1，我们的也会一起更新；但是更新新到了5.0.0，我们的包不会随之更新)
	- ~：匹配4.17.x的最新版本
	- \*：匹配最新版本
```json
{
  "name": "my_project",
  "version": "1.0.0",
  "author": "nineninee",
  "dependencies": {
    "lodash": "^4.17.21"
  }
}
```

3. 会自动添加package-lock.json文件
	最早的npm没有，早期的npm没有解决包之间相互依赖的问题，比如A依赖BC，B依赖AC，C依赖AB，那么npm会专门下一个BC给A，然后专门下一个AC给B，然后在下一个AB给C，这样会导致项目构建得非常慢，并且打包以后文件非常大因为有很多重复的包。所以添加package-lock文件来解决这个问题。
	简单来说他就是把我们的包扁平化了，项目里要用到什么包，就在package-lock.json中全部列出来，下载的时候会直接从里面去找去下载，不会像之前一样检索导致出现很多重复的东西。
	所以他是用来加速npm下载的，不用动他。

如果不希望包出现在`package.json`的依赖中，可以添加 `-no-save`指令禁止
```shell
npm install lodash --no-save
```

也可以通过 -D 或 -save-dev，将其添加到开发依赖
```shell
npm install lodash -D
```
###### 全局安装
全局安装是将包安装到计算机中；
全局安装的通常都是一些工具；
安装好了不会再node_modules中，但是可以在命令行中使用。
```shell
// 全局安装
npm install packagename -g 
```

###### 卸载
安装的时候如果全局安装了，那么卸载的时候也要加上-g。如果安装的时候没有全局安装，就没关系。
```shell
// 全局卸载
npm install packagename -g 
```
###### 引入npm下载的包
引入npm下载的包时，不需要写路径，直接写包名即可
```js
const _ = require('lodash')
console.log(_)
```



##### npm镜像
npm仓库会与国外，有时候不是很好使(比如网络不好；比如特殊时期比较严格；还比如文件比较大网速慢)；

为了解决这个问题，可以在npm中配置一个镜像服务器(类似于分身，国内直接把国外的东西直接拷贝过来)；

镜像的配置：
1. **在系统中安装cnpm**
	[npmmirror](https://npmmirror.com)
	`npm install -g cnpm --registry=https://registry.npmmirror.com`
	
	超哥一般 不推荐用cnpm，首先是因为更新频率的关系，没办法和npm仓库时刻保持一致；跟重要的是，使用npm i lodash会在node_modules下创建lodash文件夹，而使用cnpm i lodashlodash会在node_modules下创建lodash文件夹和_lodash@4.17.21@lodash文件夹，lodash文件夹只是一个快捷方式，是和_lodash@4.17.21@lodash的映射，导致结构很奇怪。
	cnpm这么设计的原因是cnpm不跟npm发生冲突，当同时使用npm和cnpm下载时，npm下载的lodash会把cnpm下载的lodash快捷方式覆盖掉。而且现在的IDE都比较智能，尤其是WebStorm，安装好依赖以后，他会给node_modules安装索引。如果依赖是cnpm安装的话，WebStorm的索引可能建不出来，这样就会导致在WebStorm中运行项目的时候，一直在转圈转圈。
	所以一般推荐使用第二种方式。
2. **彻底修改npm仓库地址(超哥推荐)**
	`npm set registry https://registry.npmmirror.com`
	
	还原到原版仓库
	`npm config delete registry`

	查看当前npm仓库配置
	`npm config get registry`


### 13. yarn和pnpm
#### yarn(yet another resource navigator)
早期的npm有很多问题，不是非常好用，yarn的出现帮助我们解决npm中的各种问题，如何解决呢？方案很简单，使用yarn代替npm。当然现在的npm相较于之前的已经得到了很大的优化，所以完全可以选择不适用yarn。

##### 安装yarn的方式
###### 通过npm命令行安装

```shell
// 下载yarn
npm i yarn -g

// 查看yarn版本
yarn -v

// 删除yarn
npm r yarn -g
```

###### 通过corepack
	在新版本的node中，corepack中已经包含了yarn，可以通过启用corepack的方式使yarn启用。
```bash
// 启用corepack
corepack enable

// 然后就可以直接使用yarn和pnpm工具
// 查看yarn版本
yarn -v

// 查看pnpm版本
pnpm -v


// 使用yarn初始化项目(会直接增加package.json和README.md .gitignore yarn.lock等文件，老师的版本会跳过项目设置，而我还需要像npm init一样设置项目名称、版本等等，并且没有yarn.lock)
yarn init

//  使用yarn下载包
(老师的版本下载好以后package.json会等价dependencies，还有有一个.yarn文件夹，但是不会有node_modules)
(我下载好以后package.json会等价dependencies，但没有一个.yarn文件夹，会新增node_modules和yarn.lock文件)
yarn add express

// 通过corepack切换yarn的版本,最新版
corepack prepare yarn@stable --active

// 通过corepack切换yarn的版本,1.x.xbanben
corepack prepare yarn@1 --active
```

##### 使用yarn导入的包
当使用node index.js来执行js文件时，我是可以导入使用的；
但是老师没办法直接导入，因为他的yarn会把node_modules隐藏，再用传统方法去导入包的话回去node_modules里面找，但是没有node_modules所以会报错。

```js
// index.js
const express = require('express')
console.log(express)
```

所以要注意使用yarn3的时候(我的是yarn@1.22.15)，执行的时候要通过yarn node index.js，不然可能会出现包找不到的情况。

##### yarn命令汇总
- yarn init：初始化，创建package.json
- yarn add xxx：添加依赖
- yarn add xxx -D：添加开发依赖
- yarn remove xxx：移除包
- yarn ：自动安装依赖
- yarn run：执行自定义脚本
- yarn <指令>：执行自定义脚本
- yarn global add：全局安装
- yarn global remove：全局卸载
- yarn global bin：全局安装目录



##### yarn镜像配置
yarn npm仓库都是同一个，他们只是不同的管理工具而已
**配置**
```bash
yarn config set registry https://registry.npmmirror.com
```

**恢复**
```bash
yarn config delete registry
```

##### yarn init -number
如果我们安装的yarn或者corepack中yarn的版本是1，但是我们想通过yarn3来初始化项目应该怎么做呢？
```bash
yarn init -2
```
此时package.json中会增加`"packageManager":"yarn@3.2.4"`来告诉我们这个项目中的yarn版本是yarn3

#### pnpm
pnpm又是一款node中的包管理器

##### 安装
###### 1. npm安装
```bash
// npm安装pnpm
npm i -g pnpm

// 查看版本
pnpm -v
```

###### 2. 打开corepack
```bash
// 打开corepack
corepack enable

// 查看版本
pnpm -v
```



##### 命令
- pnpm init：初始化项目，添加package.json
- pnpm add xxx：添加依赖
- pnpm add -D xxx：添加开发依赖
- pnpm add -g xxx：添加全局包
- pnpm install：安装依赖
- pnpm remove xxx：移除包


##### 镜像
**配置**
```bash
pnpm config set registry https://registry.npmmirror.com
```

**恢复**
```bash
pnpm config delete registry
```




### 14. 面试题：在浏览器中输入地址以后发生了什么
这一章主要讲的是网络基础，因为后面就涉及服务器了，现在先来了解一下网络方面的知识；
网络的服务器是基于请求和响应的，并且一定是浏览器先请求，然后服务器后响应。

#### 经典面试题
凡是面试题，都没有标准答案，只是考察你对这个东西的理解。
当在浏览器中输入地址以后发生了什么？https://lilichao.com/hello/index.html
- url的组成：
	- \https://：协议名，表示这个网站使用什么协议。也可以用http协议，但是他不安全，他的数据容易被劫持；ftp协议，访问文件。
	- lilichao.com：域名，domain。整个网络中存在无数个服务器，每个服务器都有他自己的唯一标识，这个标识被称为ip地址，例如192.168.0.1。但是ip地址不方便我们记忆，此时域名就相当于ip地址的别名，方便我们记忆。
	- /hello/index.html：网站资源的路径
- 发生了什么
	1. **dns解析，获取网站的ip地址。**
		dns其实也是一个服务器，他里面存放了域名和对应ip地址的映射。如下图所示，首选dns服务器地址和备用dns服务器地址表示会先去这里的服务器查ip地址。
		![[dns服务器.jpg]]
	2. **浏览器需要和服务器建立连接 (tcp/ip) 三次握手**
		客户端如何和服务器建立或者断开连接：三次握手和四次挥手。
		**三次握手：客户端和服务器建立连接的过程**
		- 客户端向服务器发送请求连接
			- SYN(申请和服务器连接)
		- 服务器收到连接请求，向客户端返回消息：同意连接，同时申请连接你
			- SYN(申请和客户端连接)  ACK(服务器同意连接)
		- 客户端向服务器发送同意连接的信息
			- ACK(客户端同意连接)

		**四次挥手(断开连接)**
		- 客户端向服务器发送请求，通知服务器数据发送完毕没请求断开连接
			- FIN(数据发完了)
		- 服务器向客户端返回数据，表示知道了
			- ACK(知道你发完了)
		- 服务器向客户端返回数据，表示数据接收完毕，可以断开连接
			- FIN(你之前发的数据我都收完了)  ACK(可以断开了)
		- 客户端向服务器发送数据，表示可以断开了
			- ACK(好的，那我断开了)
		- 
	3. 向服务器发送请求(http协议)
		连接建立以后，浏览器就可以向服务器发送请求了。
		请求是什么：请求和响应实际上就是一段数据，只是这段数据需要遵循一个特殊的格式。
		这个特殊的格式由http协议来规定。http规定了请求报文和响应报文的格式。
	4. 服务器处理请求，并返回响应（http请求）
		所以学http其实就是学习报文的格式
	5. 浏览器将响应的页面渲染
	6. 断开和服务器的连接（四次挥手）


### 15. 网络通信
#### TCP/IP协议族
##### TCP/IP协议族中包含了一组协议
TCP/IP协议族中包含了一组协议，这组协议规定了互联网中所有的通信的细节。他们里面包含了很多歇息，包括怎么拆包、传包、怎么贴ip、包括路由器的规格，网线有几根，网口什么样的，所有网络通信中的细节在TCP/IP协议族中都能找到。而我们的http协议就是这组协议当中的一个。

##### 网络通信的过程由四层组成(理论上有七层)
- 应用层
	软件层面，浏览器和服务器都属于应用层。（咱们敲网址然后回车就是应用层的操作）
- 传输层
	负责对数据进行拆分，把大数据拆分成一个一个小包。（应用层的数据不能直接发送，因为有可能数据很大，这样只要一次失败了所有的数据可能都要重新发送）
- 网络层
	负责给数据包添加信息
- 数据链路层
	负责传输信息

客户端和服务器端通过数据链路层连接，当数据到达服务器端时，数据链路层负责接收数据，网络层负责取出数据包中的信息，传输层负责组合数据包信息，形成报文。

作为开发人员，我们更关注应用层。
##### HTTP协议就是网络层的协议
他用来规定客户端和服务器间通信的报文格式。

##### 报文
浏览器和服务器之间通信是基于请求和响应的。

浏览器向服务器发送请求（request）
服务器向浏览器返回响应（response）
浏览器向服务器发送请求相当于浏览器给服务器写信，服务器给浏览器响应相当于服务器给浏览器回信。这个信在http协议中就被称为报文。http协议就是对这个报文的格式进行规定。


### 16. http协议
#### 报文
##### 浏览器和服务器之间通信是基于请求和响应的。
浏览器向服务器发送请求（request）
服务器向浏览器返回响应（response）
浏览器向服务器发送请求相当于浏览器给服务器写信，服务器给浏览器响应相当于服务器给浏览器回信。这个信在http协议中就被称为报文。http协议就是对这个报文的格式进行规定。

##### 服务器
一个服务器的主要功能：
- 接收浏览器发送的请求报文
- 可以向浏览提返回响应报文

##### 请求报文（request）
- 客户端发送给服务器的报文称为请求报文
```
GET /16_http%E5%8D%8F%E8%AE%AE/index.html?username=sunwukong HTTP/1.1
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-HK;q=0.6,en-GB;q=0.5
Cache-Control: no-cache
Connection: keep-alive
Host: 127.0.0.1:5500
Pragma: no-cache
Referer: http://127.0.0.1:5500/16_http%E5%8D%8F%E8%AE%AE/index.html?username=%E5%AD%99%E6%82%9F%E7%A9%BA
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: same-origin
Sec-Fetch-User: ?1
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 Edg/116.0.1938.54
sec-ch-ua: "Chromium";v="116", "Not)A;Brand";v="24", "Microsoft Edge";v="116"
sec-ch-ua-mobile: ?0
sec-ch-ua-platform: "Windows"
```

- 请求报文格式如下
	- 请求首行
	- 请求头
	- 空行
	- 请求体

- 请求首行
	请求首行就是报文的第一行
	`GET /index.html?username=sunwukong HTTP/1.1`
	- 第一部分 `get`表示请求的方式，`get`表示发送的是get请求。目前常用的是`get`和`post`请求。
		`get`请求用来向服务请求资源
		`post`请求用来向服务器发送数据
	- 第二部分 ` /index.html?username=sunwukong` 表示请求资源的路径,
		- ? 后面的内容叫做查询字符串，查询字符串是一个名值对，一个名字对应一个值，使用=连接，多个名值对之间使用&分割。`username=sunwukong&password=123`
		- get请求没有请求体（载荷），它通过查询字符串将数据发送给服务器，由于查询字符串会在浏览器地址栏中直接显示，所以存在两个问题：
			- 安全性较差，因为浏览器会有历史记录
			- url地址长度有限，所以get请求无法发送较大的数据
		- post请求通过请求体发送数据
			- 通过请求的载荷来查看 
			- post请求通过请求体发送数据，无法在地址栏直接查看，所以安全性较好。
			- post请求体大小没有限制，可以发送任意大小的数据
			- 所以如果需要向服务器发送数据，能用post尽量用post
	
	- 第三部分 `HTTP/1.1` 协议的版本
- 请求头
	- 请求头也是名值对结构，用来告诉服务器我们浏览器的信息
	- 每一个请求头都有他的作用
		- Accept：浏览器可以接受的文件类型
		- Accept-Encoding：浏览器允许的压缩的编码（用这些方式压缩浏览器才可以打开）
		- Accept-Language：浏览器允许接受的语言
			- zh-CN,zh：表示中文
			- 后面的数字表示优先级，告诉服务器按这个优先级的语言来返回给我相关的数据。
		- User-Agent：表示用户代理。用户代理的范围比浏览器要广，看到这个就是用来说浏览器的。他是一段用来描述浏览器信息的字符串。
			- Mozilla/5.0：规范，不用管
			- (Windows NT 10.0; Win64; x64)：操作系统11 64位
			- 内核等等
```xml
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-HK;q=0.6,en-GB;q=0.5
Cache-Control: no-cache
Connection: keep-alive
Host: 127.0.0.1:5500
Pragma: no-cache
Referer: http://127.0.0.1:5500/16_http%E5%8D%8F%E8%AE%AE/index.html?username=%E5%AD%99%E6%82%9F%E7%A9%BA
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: same-origin
Sec-Fetch-User: ?1
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 Edg/116.0.1938.54
sec-ch-ua: "Chromium";v="116", "Not)A;Brand";v="24", "Microsoft Edge";v="116"
sec-ch-ua-mobile: ?0
sec-ch-ua-platform: "Windows"
```

- 空行
	- 用来分割请求头和请求体

- 请求体
	- post请求通过请求体发送数据


##### 响应报文（response）
网页、css、js、图片这些资源会作为响应报文中的哪一部分发送：响应体

- 响应报文
```
HTTP/1.1 200 OK
Vary: Origin
Access-Control-Allow-Credentials: true
Accept-Ranges: bytes
Cache-Control: public, max-age=0
Last-Modified: Mon, 28 Aug 2023 08:46:20 GMT
ETag: W/"e4-18a3b528e75"
Content-Type: text/html; charset=UTF-8
Content-Length: 1721
Date: Mon, 28 Aug 2023 09:42:04 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```


- 响应报文格式：
	- 响应首行
		- `HTTP/1.1 200 OK`
		- 200：响应状态码
		- ok：对响应状态码的描述
		- 响应状态码的规则：
			- 1xx：请求处理中
			- 2xx：表示成功
			- 3xx：表示请求的重定向
				- 我们访问A.com 回车 网页变成了B.com
			- 4xx：表示客户端错误
				- 没有权限
				- 404：网页没找到，网址输错了
			- 5xx：表示服务器的错误
	- 响应头
		- 响应头也是一个一个的名值对结构，用来告诉浏览器响应的信息
		- ` Content-Type: text/html; charset=UTF-8`：Content-Type用来描述响应体的类型，以及响应类容的编码方式
		- `Content-Length: 1721`：Content-Length描述响应体的大小
	- 空行
		- 分割响应头和响应体
	- 响应体
		- 响应体就是服务器返回给我们客户端的内容
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>请求成功</h1>
<!-- Code injected by live-server -->
<script>
	// <![CDATA[  <-- For SVG support
	if ('WebSocket' in window) {
		(function () {
			function refreshCSS() {
				var sheets = [].slice.call(document.getElementsByTagName("link"));
				var head = document.getElementsByTagName("head")[0];
				for (var i = 0; i < sheets.length; ++i) {
					var elem = sheets[i];
					var parent = elem.parentElement || head;
					parent.removeChild(elem);
					var rel = elem.rel;
					if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
						var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
						elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
					}
					parent.appendChild(elem);
				}
			}
			var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
			var address = protocol + window.location.host + window.location.pathname + '/ws';
			var socket = new WebSocket(address);
			socket.onmessage = function (msg) {
				if (msg.data == 'reload') window.location.reload();
				else if (msg.data == 'refreshcss') refreshCSS();
			};
			if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
				console.log('Live reload enabled.');
				sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
			}
		})();
	}
	else {
		console.error('Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading.');
	}
	// ]]>
</script>
</body>
</html>
```


### 17. express简介
express是node中的服务器软件，通过express可以快速的在node中搭建一个web服务器。
node中原生就有http模块，可以用它创建web服务器，但是他太底层了，express很好的封装了http模块。
#### 使用步骤
##### 1. 创建并初始化项目
	`npm init -y`
##### 2. 安装express
	`npm i express`
##### 3. 创建 index.js， 并编写代码
服务器端运行了很多软件，端口是虚拟的概念，app.listen(3000)表示这个服务器监听3000这个端口，表示客户端访问3000的话，就由监听3000端口的软件来服务。
可以直接teminal中`node index.js`，或者F5执行。
```js
// 引入express
const express = require("express")

// 获取服务器的实例（对象）
const app = express()

// 启动服务器
// app.listen（端口号）用来启动服务器
// 服务器启动后，我们便可以通过3000端口来访问了
// 协议名://ip地址：端口号/路径
// express是http服务
app.listen(3000, () => {
  // 这个回调函数表示服务器启动后执行
})
```

##### 4. 配置路由
如果希望服务器可以正常访问，则需要为服务器设置路由，路由可以根据不同的请求方式和请求地址来处理用户的请求。
`app.METHOD(...)`：`METHOD`可以是`get`或者`post`
```js
const express = require("express")
const app = express()

// 这里的斜杠表示根路径
// http://localhost:3000
app.get("/", () => {
	//这个回调函数在有客户端请求时执行
  console.log("有人访问我了")
})

app.listen(3000, () => {
  console.log('服务器已经启动')
})
```

在路由中应该要做两件事
- 读取用户的请求(request)
- 根据用户的请求返回响应(response)

路由的回调函数执行时，会受到三个参数：
- request：表示的是用户的请求信息，通过req可以可以获取用户传递的数据
- response：表示服务器发送非客户端的响应信息，可以通过res来向客户端返回数据。
	- sendStatus()：向客户端发送响应状态码
	- status()：用来设置响应状态码，但是并不发送
	- send()：设置并发送响应体，没设置状态码直接send的话默认状态码是200，设置的话按照设置的来。如果设置404，send中的信息还是能显示，但是“网络”那里的请求是红色的，并且装填是404。
	- res.sendStatus(404)
	- res.status(200)

#### 中间件
在`express`中我们使用`app.use()`来定义一个中间件，中间件和路由很想，用法很像。
但是路由不区分请求的方式，只看路径。

##### 和路由的区别：
1. 会匹配所有请求
2. 路径设置的是父目录，所有父目录下面的请求都会匹配到
3. `app.use()`第一个路径参数可以省略不写，不写表示根路径

多个中间件时，中间件类似一个队列，先到谁就是谁处理，如果他不想放行，后面的中间件都不执行。
```js
app.use("/", (req, res) => {
  console.log("111", Date.now())
  res.send("111")
})

app.use("/", (req, res) => {
  console.log("222", Date.now())
  res.send("222")
})

app.use("/", (req, res) => {
  console.log("333", Date.now())
  res.send("333")
})
//111 1693369825917
```

##### next
next是回调函数的第三个参数，他是一个函数，调用函数后，可以触发后续的中间件。
```js
app.use("/", (req, res, next) => {
  console.log("111", Date.now())
  // res.send("111")
  next()
})

app.use("/", (req, res, next) => {
  console.log("222", Date.now())
  // res.send("222")
  next()

})

app.use("/", (req, res) => {
  console.log("333", Date.now())
  res.send("333")
})

111 1693370234795
222 1693370234798
333 1693370234799
```

next不能在响应处理完毕后调用
```js
app.use("/", (req, res, next) => {
  console.log("111", Date.now())
  // res.send("111")
  next()
})

app.use("/", (req, res, next) => {
  console.log("222", Date.now())
  // res.send("222")
  next()

})

app.use("/", (req, res) => {
  console.log("333", Date.now())
  res.send("333")
})

111 1693370348995
222 1693370349010
333 1693370349011
Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
```

##### 中间件用途
中间见得用途主要是用来处理多个路由的共同业务。比如有四个路由ABCD，每个路由都需要进行权限鉴定的操作，那如果分别在四个路由中进行鉴权，就会有很多重复的代码。
这个时候我们就可以利用中间件进行鉴权，比如在访问路由A前，先在中间件中进行鉴权看是否有权利访问路由A，有权限的话在进行放行。
很多这种类型的功能都可以通过中间件来完成。

### 18. nodemon
目前，服务器代码修改以后必须要重启。我们希望可以自动监视代码修改，代码修改以后可以自动重启服务器。

要实现这个功能，我们需要安装一个nodemon模块。（nodemon类似于node monitor的拼写）

使用方式：
1. 全局安装
	- `npm i nodemon -g`
	- `yarn global add nodemon`
		通过yarn进行全局安装时，默认yarn的目录并不在环境变量中
		需要手动将路径添加到环境变量中
		找yarn的全局安装路径：`yarn global bin`，在环境变量的path中添加全局安装路径即可
	
	- 启动
		`nodemon`：运行index.js
		`nodemon xxx`：运行指定的js

2. 在项目中安装
	- `npm i nodemon -D`：设置为开发依赖，不要设置为项目依赖。
	- `yarn add nodemon -D`
	正常的项目依赖会在dependencies中，开发依赖会在DevDependencies中。项目打包时会删掉开发依赖，开发依赖只在开发时有用

	- 启动
		`npx nodemon`


### 19. 静态资源
#### express配置可被请求的静态资源
当我们想要请求网页资源时，如果按照上述的方法，应该这么编码：
```js
const express = require("express")
const app = express()

app.get("/", (req, res) => {
  res.send(`
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>这是一个网页</title>
    </head>
    <body>
      <h1>这是网页的标题</h1>
    </body>
  </html>
  `)
})

app.listen(3000, () => {
  console.log('服务器已经启动')
})
```
但是这样不利于我们编码，因为往往一个html网页会包含上千行的代码。所以我们做好需要的是返回一个html文件。

```html
// public/index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>静态资源</h1>
</body>
</html>
```
当然我们也不能使用http://localhost:3000/public/index.html的方式去访问服务器下面的静态资源，正常情况下，服务器的根目录下的资源浏览器是不能直接访问到的，甚至连node服务器本身也不能被浏览器访问到。部署的时候不会让用户直接访问node服务器，会在node服务器前面架一个Nginx或者Apache，我们的node服务器藏在后面，由Nginx或者Apache做反向代理。

所以服务器中的代码，对于外部来说是不可见的，我们写的html页面，浏览器也无法直接访问。如果希望浏览器可以访问，组需要将页面所在的目录设置为静态资源目录。

express是很简单的可插拔工具，我们可以通过设置中间件来将public目录设置为静态目录。
设置static中间件后，浏览器访问时，会自动去public目录下寻找是否有匹配的静态资源。
访问的时候不用带public。
```js
// index.js
const express = require("express")
const path = require("node:path")
const app = express()
app.use(express.static(path.resolve(__dirname), "./public"))

app.get("/", (req, res) => {
  res.send(``)
})

app.listen(3000, () => {
  console.log('服务器已经启动')
})

// 访问http://localhost:3000/index.html就能显示“静态资源了”
http://localhost:3000/index.html和http://localhost:3000/是一样的，会默认去找index.html
```

这里需要注意F5和terminal运行的问题，他们的工作目录不同。
`app.use(express.static(path.resolve(__dirname), "./public"))`表示的是当我们访问某个资源的时候先去public目录下找，所以我们访问资源时不用写public。

如果我们在public/index.html下面使用根目录中的图片，是不能正常显示的。所以图片 js css等静态资源如果需要外部资源能访问，一定要放到public目录下。当然这种情况和使用webpack时用require和import引入不一样。
```html
<body>
  <h1>静态资源</h1>
  <img src="../dameinvzi.jpg" />
</body>
```



#### 练习：简单的登录功能

### 20. param和post请求
#### 复习：简单的登录功能
##### 绝对路由：
以斜杠开头的路径叫做绝对路径，斜杠代表根目录
`/login`-->`http://localhost:3000/login`
```js
app.get("/login", (req, res) => {
  res.send()
})
```


##### 获取get请求的参数：
`get`请求可以通过`req.query`来获取请求中的查询字符串
```js
app.get("/login", (req, res) => {
  const { username, password } = req.query
  if (username === "sun" && password === "123456") {
    res.send("登录成功")
  } else {
    res.send("账号或密码错误")
  }
  
})
```

#### get请求发送参数的第二种方式
在路径中通过冒号命名参数。
在路径中通过**冒号**命名的部分我们称为`param`，在get请求他可以他可以被解析为请求参数。

/hello/:id 表示当用户访问/hello/xxx时就会触发
```js
app.get("/hello/:id", (req, res) => {
  const params = req.params
  console.log(params)
  res.send("这是hello路由")
})
url:http://localhost:3000/hello: 
网页显示：Cannot GET /hello
控制台输出：

url:http://localhost:3000/hello/sun
网页显示：这是hello路由
控制台输出：{ id: 'sun' }

url:http://localhost:3000/hello/sun/123
网页显示：Cannot GET /hello/sun/123
控制台输出：
```

/hello/:id/:password/:age 表示当用户访问/hello/xxx/xxx/xxx时就会触发
```js
app.get("/hello/:id/:password/:age", (req, res) => {
  const params = req.params
  console.log(params)
  res.send("这是hello路由")
})
url: http://localhost:3000/hello/sun/1223456/16
网页显示：这是hello路由
控制台输出：{ id: 'sun', password: '1223456', age: '16' }
```

本质上和查询字符串传参没有区别，都是通过路径去传参数。
但是查询字符串传参的时候要写属性名和属性值。

**param传参一般不会传特别复杂的参数，一般就传一个参数，例如用户名和用户ID等。**

#### 约定由于配置
查询字符串中前后端指定了username='sun'
param中规定了url后面的第一个参数就是id，第二个参数就是password，我们都遵守这个规定。

#### post请求
get请求会直接将请求参数暴露在url地址中，并且一般表单请求都是post。

##### 获取post请求的参数
通过req.body来获取post请求的参数（请求体中的参数）
默认情况下，express不会自动解析请求体，需要通过中间件来为其增加功能。
```js
app.post("/login", (req, res) => {
  console.log(req.body)
  res.send("<h1>post请求已收到</h1>")
})
// undefined
```

引入解析请求体的中间件
```js
app.use(express.urlencoded())

app.post("/login", (req, res) => {
  console.log(req.body)
  res.send("<h1>post请求已收到</h1>")
})
// { username: 'sun', password: '123' }
```

##### post请求实现登录功能
简单，略。

**注意：**
中间件和路由的执行顺序是从上到下执行的，所以解析请求体的中间件一定要放在post请求前面，一遍都把中间件放在最前面。



### 21. 模板引擎
#### 上节课配置请求解析体遗留问题
当配置请求体解析器的时候，如果F5运行index.js可能调试控制台没什么问题，但是如果是在terminal中运行的话，可能会报错
```js
app.use(express.urlencoded())
```
`body-parser deprecated undefined extended: provide extended option index.js:18:17`
提示我们要g给body-parser配置拓展，改成：
```js
app.use(express.urlencoded({ extended: true }))
```
配置项不论是true还是false都没关系，是用来处理一些复杂的请求体的，不用过于深究。


#### 配置错误路由
可以在所有路由后面配置错误路由；
只要这个中间件一执行，说明上边的地址都没有匹配。
```js
const express = require("express")
const path = require("node:path")

const app = express()

app.use(express.static(path.resolve(__dirname, "./public")))

app.use(express.urlencoded({ extended: true }))

app.get('/hello', (req, res) => {
  res.send('hello')
})

app.use((req, res) => {
  res.send('<h1>你的请求已被外星人劫持</h1>')
})

app.listen(3000, () => {
  console.log('服务器已经启动')
})
```

#### 模板

##### 模板的概念
我们希望用户在访问students路由的时候，可以给用户返回一个显示有学生信息的网页。
我们可以直接创建一个students的html页面，但是html页面属于静态资源，创建的时候什么样子，用户看到的就是什么样子，不会自动跟随服务器中数据的变化而变化。
所以我们希望有一个东西，他长得像一个网页，但是他里面可以嵌入变量，这个东西在node中被称为模板。

在node中存在很多个模板引擎，都各具特色，lichao爱用ejs。

##### 使用步骤
ejs是node中的一款模板引擎，使用步骤：
- 安装ejs
	- `npm i ejs `
- 配置express的模板引擎为ejs
	- 将ejs设置为默认的模板引擎
	- `app.set('view engine', 'ejs')`
- 创建模板
	- 新建views文件夹用来放模板
	- 新建views/students.ejs为模板
- 配置模板路径
	- `app.set('views', path.resolve(__dirname, 'views'))`

注意：我们创建的students.ejs不能直接被访问，模板引擎需要被express渲染后才能被用。
```js
app.get('/students', (req, res) => {
  res.render("students")
})
```
render其实就是把ejs转换为网页，然后再发给用户。

react其实也是做了这个工作，只是react是把渲染的工作放到前端去执行，我们这里是把渲染的工作放在后端执行。

##### 向模板传参
可以将一个对象作为render的第二个参数传递，这样在模板中可以访问到对象中的数据。
```js
// index.js
app.get('/students', (req, res) => {
  res.render(
    "students",
    { name: 'sunwukong', age: 15 }
  )
})
```

```html
// students.html
<body>
  <h1>hello ejs</h1>
  <h2><%=name %></h2>
  <h2><%=age%></h2>
</body>
```

###### 向模板传html代码

**<%=xxx %>**
```js
app.get('/students', (req, res) => {
  res.render(
    "students",
    { students: '<h1>students</h1>' }
  )
})
```

```html
<body>
  <h1>hello ejs</h1>
  <h2><%=students %></h2>
</body>

// 网页显示：<h1>students</h1>
```

`<%=xxx %>`在ejs中输出内容时，他会自动对字符串中的特殊符号进行转义。

这个设计主要是为了避免xss攻击。

**<%-xxx %>**
直接将内容输出

**<%xxx %>**
可以在其中直接编写js代码，js代码会在服务器中执行
```html
<% console.log('haha') %>
// 控制台输出haha
```

```html
  <% if(name === 'sunwukong') {%>
    <h2>大师兄来了</h2>
  <% } else { %>
    <h2>二师兄来了</h2>
  <% } %>
```
###### xss攻击：跨站脚本攻击
xss攻击其实原名是css攻击，因为重名了改成了xss攻击。
xss攻击就等于网页的注入攻击。
`<%-xxx %>`在ejs中输出内容时，他会不会对字符串中的特殊符号进行转义。
```html
<body>
  <h1>hello ejs</h1>
  <h2><%-students %></h2>
</body>

// 网页显示h1的字体：students
```

`<%-xxx %>`可能存在的问题是：
如果我们前端表单中提交了数据给后台，后台显示表单提交的完整内容，那么如果这个数据是恶意的脚本代码并且没有经过转义，就会存在安全隐患。


### 23. 练习
#### ejs的注释
ejs中不通过`<!-- -->`的方式去注释，因为ejs是运行在服务器的，服务器不知道这个注释。

ejs通过`<%# %>注释

```html
<h2><%=name %></h2>
// 正常显示name

<!-- <%=age %> -->
//因为render没有传age属性，并且这里的注释不起作用，所以还是会报错。

<!-- <h2><%=name %></h2> -->
// 这个注释也不生效

<% 
	// console.log('hi')
%>
// js代码的注释
```

#### ejs动态显示表格信息
```html
// students.ejs
<table>
	<caption>学生列表</caption>
	<thead>
	  <tr>
		<th>学号</th>
		<th>姓名</th>
		<th>年龄</th>
		<th>性别</th>
		<th>地址</th>
	  </tr>
	</thead>
	<tbody>
	  <% for(const stu of stus){ %>
		<tr>
		  <td><%=stu.id %></td>
		  <td><%=stu.name %></td>
		  <td><%=stu.age %></td>
		  <td><%=stu.sex %></td>
		  <td><%=stu.address %></td>
		</tr>
	  <% } %>
	</tbody>
</table>
```

```js
// index.js
const STUDENTS_INFO = [
  {
    id: 1,
    name: '孙悟空',
    age: 18,
    sex: '男',
    address: '花果山'
  },
  {
    id: 2,
    name: '猪八戒',
    age: 28,
    sex: '男',
    address: '高老庄'
  },
  {
    id: 3,
    name: '沙悟净',
    age: 38,
    sex: '男',
    address: '流沙河'
  },
]
app.get('/students', (req, res) => {
	res.render(
		"students",
		{ stus: STUDENTS_INFO }
	)
})
```

##### 在ejs中通过表单增加用户信息
创建表单：
```html
<form action="/add_students" method="post">
	<div>姓名：
	  <input type="text" name="name" />
	</div>
	<div>年龄：
	  <input type="number" name="age" max="150" min="0" />
	</div>
	<div>性别：
	  <input type="radio" name="sex" value="男" />男
	  <input type="radio" name="sex" value="女" />女
	</div>
	<div>地址：
	  <input type="text" name="address" />
	</div>
	<div>
	  <button>添加</button>
	</div>
</form>
```

服务器添加路由处理提交的表单：
```js
// 创建一个添加学生信息的路由
app.post('/add_students', (req, res) => {
  // 路由要做什么
  // 生成一个id 不用length是因为他的变化太大了，如果删除一个可能会出现重复的id
  const id = STUDENTS_INFO.at(-1).id + 1

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
  res.render('students', {stus: STUDENTS_INFO})
})
```
要注意上面表单信息中的两个问题：
- 没有id
- 年龄是字符串，需要使用+转换为数字

##### 表单重复提交问题
在上面的代码中，当我们提交表单信息后，url就停留在了add_students，这时如果我们刷新页面，就会一直提交重复的信息。

重定向的作用是告诉浏览器：你向另一个地址再发一次请求
```js
app.post('/add_students', (req, res) => {
  // ...

  // 4.返回响应
  // res.send('添加成功')
  // res.render('students', {stus: STUDENTS_INFO})
  // res.redirect()用来发起请求重定向
  res.redirect('students')
})
```



#### 持久化存储用户信息
创建data/students.json用来存放用户信息：
```json
[{"id":1,"name":"孙悟空","age":18,"sex":"男","address":"花果山"},{"id":2,"name":"猪八戒","age":28,"sex":"男","address":"高老庄"},{"id":3,"name":"沙悟净","age":38,"sex":"男","address":"流沙河"}]
```

将新的数据写入json中：
```js
app.post('/add_students', (req, res) => {
	// ...
	// 将新的数据写入json中
	fs.writeFile(path.resolve(__dirname, './data/students.json'), JSON.stringify(STUDENTS_INFO))
	.then(() => {
	  res.redirect('students')
	}).catch(() => {
		// ... 
	})
})
```

#### 删除用户信息
删除用户信息
- 点击删除链接后，删除当前数据
- 点击 白骨精 删除 --> 删除id为5的学生
- 流程
	- 点击白骨精的删除链接
	- 向路由发送请求（写一个路由）
	- 路由怎么写
		- 获取学生id n
		- 删除id为n的学生
		- 将新的数组写入文件
		- 重定向到学生列表页面

```html
  <table>
    // ...
    <tbody>
      <% for(const stu of stus){ %>
        <tr>
          // ... 
          <td>
            <a 
              onclick="return confirm('确认删除么？')"
              href="/delete?id=<%=stu.id %>">删除</a>
            <a href="/delete?id=<%=stu.id %>">修改</a>
          </td>
        </tr>
      <% } %>
    </tbody>
  </table>
```
`onclick="return confirm('确认删除么？')"`会弹出提示框，如果点击取消就会取消默认行为，如果点击确认就会继续默认行为，这里的默认行为就是继续根据href发送请求


```js
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
```

##### 没有用户信息的时候不展示表格
```html
<% if(stus && stus.length) { %>
  <table>
    // ...
  </table>
  <% }else { %>
      <p>列表中没有学生数据</p>
  <% } %>
```


#### 修改用户信息
- 点击修改后，显示一个表单，表单中应该有要修改的学生的信息，用户对学生的信息进行修改，修改以后点击按钮提交表单
- 流程
	1. 点击孙悟空的修改链接
	2. 跳转到一个路由
		1. 这个路由返回一个页面，页面中有一个表单，表单中应该有孙悟空的各种信息
##### 展示用户信息表单
```html
students.ejs
<tbody>
	  <td>
		<a href="/to_update?id=<%=stu.id %>">修改</a>
	  </td>
	</tr>
</tbody>
```

```html
update.ejs
<form action="/to_update" method="get">
	<div>姓名：
	  <input type="text" name="name" value="<%=student.name%>"/>
	</div>
	<div>年龄：
	  <input type="number" name="age" value="<%=student.age%>" max="150" min="0" /></div>
	
	<%=student.sex === "女" && "checked"  %>
	<div>性别：
	  <input type="radio" name="sex" value="男" <%=student.sex === "男" && "checked"  %> />男
	  <input type="radio" name="sex" value="女" <%=student.sex === "女" && "checked"  %>  %>"/>女
	</div>
	<div>地址：
	  <input type="text" name="address" value="<%=student.address%>" />
	</div>
	//...
</form>
```

```js
index.js
app.get('/to_update', (req, res) => {
  const id = +req.query.id
  const student = STUDENTS_INFO.find(item => item.id === id)

  res.render("update", {student})
})
```

##### 修改用户信息
###### 获取用户信息
post请求参数可以通过`req.body`来获取到，但是这里没有传id，需要另外处理。

**获取id的方式有两种:**
一种是直接在`form`表单的`action`链接中通过查询字符串传进来，后端通过`req.query.id`获取
```js
<form action="/update_student?id=<%=student.id%>" method="post">
</form>

app.post('/update_student', (req, res) => {
  const id = req.query.id 
})
```

一种是通过**隐藏表单项**来实现， 可以通过隐藏表单项来传递一些不希望被用户看到的数据。
```js
<form action="/update_student" method="post">
    <input type="hidden" name="id" value="<%=student.id%>"></input>
    // ...
</form>

app.post('/update_student', (req, res) => {
  const { id, name, age, sex, address } = req.body
})

```


###### 修改用户信息
```js
app.post('/update_student', (req, res) => {
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
```

### 24. Router
随着项目体量变大，我们的代码中有很多的路由，有get路由，post路由，还有express的中间件，不方便代码管理。

Router实际上是一个中间件，可以在中间件上去绑定各种路由以及其他的中间件。
```js
const express = require("express")
const path = require("node:path")
const fs = require('node:fs/promises')
const app = express()

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'views'))
app.use(express.static(path.resolve(__dirname, "./public")))
app.use(express.urlencoded({ extended: true }))

const router = express.Router()
router.get('/hello', (req, res) => {
  console.log('hi')
  res.send("Hello, Router")
})
app.use(router)

app.listen(3000, () => {
  console.log('服务器已经启动')
})
```
这里的好处就是app和router不是一个对象，那router就可以不用在index.js中去定义。


#### 分离路由文件
routes/user.js
```js
const express = require('express')

const router = express.Router()
router.get("/hello", (req, res) => {
  res.send("hello, router")
})

module.exports = router
```

index.js
```js
const userRouter = require("./routes/user")
const app = express()
app.use(userRouter)
```

#### 不同路由模块之间的相同路由问题
```js
const express = require('express')

const router = express.Router()
router.get("/hello", (req, res) => {
  res.send("hello, im user")
})

module.exports = router
```

```js
const express = require('express')

const router = express.Router()
router.get("/hello", (req, res) => {
  res.send("hello, im goods")
})

module.exports = router
```

```js
const userRouter = require("./routes/user")
const goodsRouter = require("./routes/goods")

app.use('/user', userRouter)
app.use('/goods', goodsRouter)

app.use((req, res) => {
  res.send('sorry, you are hacked')
})
```

```
http://localhost:3000/hello
-->sorry, you are hacked

http://localhost:3000/user/hello
-->hello, im user

http://localhost:3000/goods/hello
-->hello, im goods
```

#### 处理存储文件的中间件
我们使用router来实现上一节课练习的时候，会有多个路由有操作json文件的操作，我们可以封装这个方法，也可以配置一个中间件来处理。
当add路由中的程序执行完以后，调用next进入下一个路由。
```js
routes/students.js
router.get('/list', (req, res) => {
  res.render(
    "students",
    { stus: STUDENTS_INFO }
  )
})

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
```


### 25. Cookie
现在的登录形同虚设，