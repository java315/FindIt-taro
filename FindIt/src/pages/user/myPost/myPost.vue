<template>
  <view>
    <AtMessage/>
    <AtNavBar
      color="#000"
      title="我的发布"
    >
    </AtNavBar>

    <my-list v-if="dataLen > 0" :itemHeight="itemHeight" :items="items" @scroll="onScroll" />
    <view v-else style="text-align:center;font-size:50px;height:600px;line-height:200px">这里啥也没有</view>
  </view>
</template>

<script>
import Taro from "@tarojs/taro";
import {
  AtNavBar,AtMessage
} from "taro-ui-vue";
import {setGlobalData,getGlobalData} from '../../utils/global'
import findItApi from "../../../utils/finditapi"
import myList from "../../../components/myList/myList";
import "taro-ui-vue/dist/style/components/message.scss";
import "taro-ui-vue/dist/style/components/icon.scss";
import "taro-ui-vue/dist/style/components/drawer.scss";
import "taro-ui-vue/dist/style/components/nav-bar.scss";
import "./myPost.less";

export default {
  components: {
    AtMessage,
    AtNavBar,
    myList,
  },
  data() {
    return {
      items: [],
      loading: false,
      itemHeight: 150,
      page:0,
    };
  },
  computed: {
    dataLen() {
      return this.items.length;
    },
  },
  mounted() {
      console.log("mounted")
      findItApi.itemList(this.page).then((data) => {
        data.forEach(e => {
          e.thumb = e.photos[0] ? e.photos[0].url : ''
          e.tags = e.tags.sort((a,b) => a.priority - b.priority).map(e => e.name)
        })
        this.items = data
      }).catch(err => {
        console.log(err.message)
      })
    },
  methods: {

    // methods about list
    listReachBottom() {
      this.loading = true;
      let page = this.page + 1
      findItApi.itemList(page).then((data) => {
        if (data.length > 0) {
          this.page = page
        }
        data.forEach(e => {
          e.thumb = e.photos[0] ? e.photos[0].url : ''
          e.tags = e.tags.sort((a,b) => a.priority - b.priority).map(e => e.name)
        })
        let items = this.items 
        this.items = items.concat(data)
        this.loading = false
      })
    },

    onScroll({ scrollDirection, scrollOffset }) {
      if (
        // 避免重复加载数据
        !this.loading &&
        // 只有向前滚动才触发
        scrollDirection === "forward" &&
        // 5 = (列表高度 / 单项列表高度)
        // 滚动提前加载量, 可根据样式情况调整
        scrollOffset > (this.dataLen - 5) * this.itemHeight - 100
      ) {
        this.listReachBottom();
      }
    },
  },
};
</script>

<style>
</style>