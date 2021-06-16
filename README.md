# vue_template

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

# 项目布局

### public

存放公共静态资源

### src

```
.env.development 正式环境：开发环境配置
.env.production 正式环境：生产环境配置
```

### src-源码目录

```
┌── api -- axios网络请求定义
├── assets -- 静态图片资源文件
├── components -- 通用组件封装
|    ├── common -- 通用组件
|    └── public -- 公用组件
|         ├── errorPage -- 错误页面组件
|         |    ├── 403 -- 403页面
|         |    └── 404 -- 404页面
|         ├── VHeader -- 头部组件
|         |    └──index --头部页面
|         └── VFooter -- 页脚组件
|              └── index -- 脚部页面
├── config -- 配置文件
|    └── config -- 全局配置文件
├── netService -- axios封装
|    └── http --get,post请求封装
├── router -- vue-router路由配置
|    └── index -- router及静态添加路由
├── store -- vuex的状态管理
|    └── index -- vuex
├── utils -- 工具类
├── pages -- 前端页面
|    └── home -- 页面入口
├── App.vue --全局入口文件
└── main.js --全局入口配置

```
