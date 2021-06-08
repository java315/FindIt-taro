<template>
  <view>
    <AtMessage/>
    <AtNavBar
      :onClickRgIconSt="jumpToPost"
      :onClickLeftIcon="handleClick"
      color="#000"
      :leftText="currentCategory"
      rightFirstIconType="add-circle"
      title="列表"
    >
    </AtNavBar>

    <AtSearchBar
      showActionButton
      :value="searchTarget"
      :onChange="onChange.bind(this, 'searchTarget')"
      :onActionClick="onSearch"
    />

    <my-list :itemHeight="itemHeight" :items="items" @scroll="onScroll" />

    <AtDrawer
      :show="drawerShow"
      :items="categories"
      mask
      :onClose="onDrawerClose"
      :onItemClick="onItemClick"
    />
  </view>
</template>

<script>
import Taro from "@tarojs/taro";
import {
  AtNavBar,
  AtSearchBar,
  AtDrawer,
  AtMessage
} from "taro-ui-vue";
import {setGlobalData,getGlobalData} from '../../utils/global'
import findItApi from "../../utils/finditapi"
import myList from "../../components/myList/myList"
import "taro-ui-vue/dist/style/components/message.scss";
import "taro-ui-vue/dist/style/components/search-bar.scss";
import "taro-ui-vue/dist/style/components/icon.scss";
import "taro-ui-vue/dist/style/components/button.scss";
import "taro-ui-vue/dist/style/components/drawer.scss";
import "taro-ui-vue/dist/style/components/nav-bar.scss";

export default {
  components: {
    AtSearchBar,
    AtMessage,
    AtDrawer,
    AtNavBar,
    myList,
    
  },
  data() {
    return {
      items: [],
      loading: false,
      initLoading: true,
      drawerShow: false,
      itemHeight: 150,
      searchTarget: "",
      categories: ["所有","失物招领","寻物启事","贵重物品", "校园卡"],
      currentCategory: "所有",
      page:0,
    };
  },
  created() {
    var tag = getGlobalData("listTag")
    if (tag === "") {
      // do nothing
    }
    else {
      this.currentCategory = tag
    }
  },
  mounted() {
    const state = getGlobalData("state")
    console.log(state)
    if (state == "checked") {
      findItApi.itemList(this.page).then((data) => {
        data.forEach(e => {
          e.thumb = e.photos[0] ? e.photos[0].url : ''
          e.tags = e.tags.sort((a,b) => a.priority - b.priority).map(e => e.name)
        })
        this.items = data
        this.initLoading = false
        findItApi.tagList().then(tags => {
          console.log(tags)
        })
      }).catch(err => {
        console.log(err.message)
        this.initLoading = false
      })
    }

    
    
  },
  onShow() {
    if (this.items.length == 0) {
      this.initLoading = true
      findItApi.itemList(this.page).then((data) => {
        data.forEach(e => {
          e.thumb = e.photos[0] ? e.photos[0].url : ''
          e.tags = e.tags.sort((a,b) => a.priority - b.priority).map(e => e.name)
        })
        this.items = data
        this.initLoading = false
      }).catch(err => {
        console.log(err.message)
        this.initLoading = false
      })
    }
  },
  computed: {
    dataLen() {
      return this.items.length;
    },
  },
  methods: {
    onChange(stateName, value) {
      this[stateName] = value;
    },
    onSearch() {
      let page = 0
      let searchTarget = this.searchTarget
      findItApi.searchItem(page,searchTarget).then(data => {
        this.items = data
      })
    },

    // methods about list
    listReachBottom() {
      console.log("bottom")
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
        !this.initLoading &&
        // 只有向前滚动才触发
        scrollDirection === "forward" &&
        // 5 = (列表高度 / 单项列表高度)
        // 滚动提前加载量, 可根据样式情况调整
        scrollOffset > (this.dataLen - 5) * this.itemHeight - 100
      ) {
        this.listReachBottom();
      }
    },

    //
    handleClick() {
      Taro.atMessage({
        message:"标签分类功能，还没做orz",
        type:"warning"
      })
      // this.drawerShow = true;
    },

    jumpToPost() {
      Taro.navigateTo({
         url: '/pages/post/post'
      });
    },  
    // drawer
    onDrawerClose() {
      this.drawerShow = false;
    },
    onItemClick(index) {
      this.currentCategory = this.categories[index];
    },

    

  },
};
</script>

<style>
</style>