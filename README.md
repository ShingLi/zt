# 书签

> 2021/01/17

+ Lerna中文翻译
  + https://segmentfault.com/a/1190000023954051

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
