import Vue from 'vue'
import './app.less'
import VirtualList from '@tarojs/components/virtual-list'
// vscode 这里的报错是错的
Vue.use(VirtualList)

const App = {
  onShow (options) {
  },
  render(h) {
    // this.$slots.default 是将要会渲染的页面
    return h('block', this.$slots.default)
  }
}



export default App
