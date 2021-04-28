# FindIt-taro

## 如何运行

[参考](https://taro-docs.jd.com/taro/docs/GETTING-STARTED/)

环境配置：

- npm：安装[nodejs](https://nodejs.org/en/)

- taro-cli：`npm install -g @tarojs/cli` 或 `cnpm install -g @tarojs/cli`

- [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

  

在FindIt目录下使用npm打包：

```
# 二选一 前者是开发版本，后者是发布版本
npm run dev:weapp
npm run build:weapp
```

或者用taro-cli打包：

```
# 二选一 同上 去掉 --watch 将不会监听文件修改，并会对代码进行压缩打包
taro build --type weapp --watch
taro build --type weapp
```

打包后打开微信开发者工具，选择导入项目，并选择FindIt文件夹打开即可预览



##  项目描述

- ui组件：[taro-ui-vue](https://taro-ui.aotu.io/#/docs/introduction)

## 开发阶段逐渐丰富的问题清单

#### 1、为什么选择taro？

考虑过的方案：

- uni-app、weex
- taro、mpvue、wepy

需求：

- 跨平台：主要是微信、QQ、H5，也考虑过Android和IOS，但是uni-app的想法过于美好，大一统的解决方案可能导致很多开发问题，而weex又不支持小程序开发，并且对客户端开发不大熟悉
- 知识基础：Vue、原生的小程序框架
- 社区成熟度：根据star数、awesome仓库和文档详细程度判断



#### 2、为什么使用taro-ui-vue，遇到了什么问题？

毕竟是taro配套的ui方案，感觉上应该靠谱

遇到的问题：

**（1）自定义主题：**官方给出的[解决方案](https://taro-ui.aotu.io/#/docs/customizetheme)是：

>- SCSS变量覆盖
>- globalClass全局样式类
>- 配置customStyle属性（仅有部分组件支持，请查看组件文档，不建议使用）







## 使用Taro过程中的一些吐槽

1. 官方的Vue文档提供示例代码有些是直接复制的React代码，有些离谱

