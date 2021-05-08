<template>
  <view>
    <AtNavBar
      :onClickRgIconSt="handleClick"
      :onClickLeftIcon="handleClick"
      color="#000"
      :leftText="currentCategory"
      rightFirstIconType="bullet-list"
      title="列表"
    >
    </AtNavBar>

    <AtSearchBar
      showActionButton
      :value="searchTarget"
      :onChange="onChange.bind(this, 'value')"
      :onActionClick="onActionClick"
    />

    <my-list :itemHeight="itemHeight" :items="items" @scroll="onScroll" />
    <!-- <view class="item-box">
      <virtual-list
        wclass="List"
        :height="600"
        :item-data="items"
        :item-count="dataLen"
        :item-size="itemHeight"
        :item="Card"
        width="100%"
        @scroll="onScroll"
      />
    </view> -->

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
  AtList,
  AtListItem,
  AtSearchBar,
  AtDrawer,
} from "taro-ui-vue";
import myList from "../../utils/myList/myList"
import "taro-ui-vue/dist/style/components/search-bar.scss";
import "taro-ui-vue/dist/style/components/button.scss";
import "taro-ui-vue/dist/style/components/icon.scss";
import "taro-ui-vue/dist/style/components/drawer.scss";
import "taro-ui-vue/dist/style/components/list.scss";
import "taro-ui-vue/dist/style/components/nav-bar.scss";

function buildData(offset = 0) {
  return Array(20)
    .fill(0)
    .map((_, i) => {
      return {
        thumb:
          "https://cbu01.alicdn.com/img/ibank/2016/597/960/3694069795_1624996386.jpg",
        postTime: "2019-09-21 23:23:21",
        method: "QQ123445",
        tags: [i % 2 == 0 ? "lost" : "found", "手机"],
        text: "社保卡",
      };
    });
}

export default {
  components: {
    AtSearchBar,
    AtList,
    AtListItem,
    AtDrawer,
    AtNavBar,
    myList,
  },
  data() {
    return {
      items: buildData(0),
      loading: false,
      drawerShow: false,
      itemHeight: 150,
      searchTarget: "",
      categories: ["一般", "贵重物品", "校园卡"],
      currentCategory: "一般",
      // Card,
    };
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
    onActionClick() {
      console.log("click search button");
      //console.log(this.dataLen);
      console.log(this.items);
    },

    // methods about list
    listReachBottom() {
      Taro.showLoading({
        title: "加载中",
      });
      this.loading = true;
      setTimeout(() => {
        let data = this.items;
        this.items = data.concat(buildData(data.length));
        this.loading = false;
        Taro.hideLoading();
      }, 1000);
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

    //
    handleClick() {
      this.drawerShow = true;
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