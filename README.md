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