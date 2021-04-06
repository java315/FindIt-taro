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