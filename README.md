## Practice Circle

### 开发环境

* vscode 用户
  - 安装插件 [minapp](https://marketplace.visualstudio.com/items?itemName=qiu8310.minapp-vscode)：提供 wxml 的语法高亮和自动补全功能
  - 安装插件 [dot-template](https://marketplace.visualstudio.com/items?itemName=qiu8310.dot-template-vscode)：提供快速创建模板文件功能

* 非 vscode 用户
  - wxml 插件功能暂时无法提供，你可以搜索对应插件市场是否有类似插件
  - 模板文件可以通过安装 `npm i -g dot-template-cli`，并在 `@minapp/cli` 创建的项目根目录下执行 `dtpl watch` 命令，即可实现 vscode 插件 dot-template 类似的功能

minapp版本： 2.0.0
项目运行包管理工具： yarn

### 安装插件
yarn install

### 项目测试运行
yarn run dev

### 项目组件库：iView
iView代码库地址： https://github.com/TalkingData/iview-weapp
导入方法： 将github中dist目录下相关文件复制至src/base/iView文件夹
