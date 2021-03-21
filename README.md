# 书签

> 2021/01/17

+ Lerna中文翻译
  + <https://segmentfault.com/a/1190000023954051>

>2021/01/20

+ `vscode` 调试`nuxt.js`源码
  + `cwd` 是最重要的步骤
  + [vscode调试官方文档](https://github.com/nuxt/nuxtjs.org/blob/master/content/en/_archives/guide/contribution-guide.md)

  ```js
  {
      "type": "node",
      "request": "launch",
      "name": "Launch via NPM",
      "runtimeExecutable": "npm",
      "runtimeArgs": [
          "run-script",
          "nuxt"
      ],
      "port": 9229,
      "stopOnEntry": true,
      "skipFiles": [
          "<node_internals>/**"
      ],
      "cwd": "${workspaceRoot}/Nuxtjs/nuxt.js"
  }
  ```

>2021/01/23

+ `require()`
  + <https://segmentfault.com/a/1190000009060866>
    + 解释了`require`加载一个模块的过程
    + `require`默认加载的是一个对象即`module.exports || exports`

> 2021/02/10

+ `miniminst`
  + [github](https://www.npmjs.com/package/minimist)
  + [中文解析](https://jarvys.github.io/2014/06/01/minimist-js/)
    + 一个`Node`命令行参数解析库

>2021/02/12

+ `defu`
  + [一个Object.assign的解决方案](https://www.lodashjs.com/docs/lodash.defaultsDeep)
  + `defu`也是一个`Object.assign`解决方案

> 2021/02/15

+ `create-require`
  + `Nodejs`module`模块中`createRequire`的Polyfill [create-require(filename)](https://www.npmjs.com/package/create-require)
  
  ```js
    <!-- esm 开启不然 node是Commonjs 规范 使用Esm模块语法报错 -->
    // node 12.2版本以上
    import { createRequire } from 'module'
    import path from 'path’
    const modules = createRequire(path.resolve(process.cwd(), 'a.js')) // 根目录下面有一个a.js
    
    // <= v12.2.0
    const createRequire = require('create-require')
    import path from 'path’
    const modules = createRequire(path.resolve(process.cwd(), 'a.js')) // 根目录下面有一个a.js
  ```

> 2021/03/06

+ `fs-extra`
  + [掘金介绍](https://juejin.cn/post/6844903641594216455)

> 2021/03/20

+ `nodemon`
  + 一个自动重启`node`服务的npm包
  + [掘金中文文档翻译](https://juejin.cn/post/6844904191316459527)

+ `inquirer`
  + [使用简介](https://blog.csdn.net/qq_26733915/article/details/80461257)
    + 目前有一个Bug,就是无法使用箭头选中，window 上可以，mac不行，[具体issure](https://github.com/SBoudrias/Inquirer.js/issues/970)