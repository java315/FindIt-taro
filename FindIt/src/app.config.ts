export default {
  pages: [
    'pages/index/index',
    'pages/post/post',
    'pages/list/list',
    'pages/user/user',
    'pages/card/card',
    'pages/detail/detail',
    'pages/user/about/about',
    'pages/user/myPost/myPost'
  ],
  window: {
    backgroundTextStyle: 'dark',
    navigationBarBackgroundColor: '#6a005f',
    navigationBarTitleText: 'FindIt in NJU',
    navigationBarTextStyle: 'white'
  },
  tabBar: {
    color: "#a9b7b7",
    selectedColor: "#6a005f",
    borderStyle: "white",
    list: [{
      pagePath: "pages/index/index",
      text: "首页",
      iconPath:"images/icons/index.png",
      selectedIconPath:"images/icons/index.png"
    },
    {
      pagePath: "pages/list/list",
      text: "失物",
      iconPath:"images/icons/list.png",
      selectedIconPath:"images/icons/list.png"
    },
    {
      pagePath: "pages/post/post",
      text: "发布",
      iconPath:"images/icons/upload.png",
      selectedIconPath:"images/icons/upload.png"
    },
    {
      pagePath: "pages/user/user",
      text: "我的",
      iconPath:"images/icons/user.png",
      selectedIconPath:"images/icons/user.png"
    }
    ]
  },
}
