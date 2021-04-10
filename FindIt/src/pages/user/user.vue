<template>
  <view class="user">
    <view class="userinfo">
      <view>
        <view class="avatar">
          <open-data
            type="userAvatarUrl"
            default-avatar="../../images/icons/user.png"
          />
        </view>
        <view class="nickname">
          <open-data type="userNickName" default-text="请先登录" />
        </view>
      </view>
    </view>

    <AtList class="option-box">
      <AtListItem class="user-option" title="我的发布" arrow="right" :onClick="jumpToMyPost" />
      <AtListItem class="user-option" title="关于我们" arrow="right" :onClick="jumpToAbout" />
      <AtListItem class="user-option" title="设置" arrow="right" :onClick="jumpToSetting" />
    </AtList>
  </view>
</template>

<script>
// 按需引入, 更小的应用体积
import Taro from "@tarojs/taro";
import { AtList, AtListItem } from "taro-ui-vue";
import "taro-ui-vue/dist/style/components/list.scss";
import "taro-ui-vue/dist/style/components/icon.scss";
import "./user.less";
export default {
  components: {
    AtList,
    AtListItem,
  },
  data() {
    return {};
  },
  methods: {
    jumpToSetting:function() {
      Taro.navigateTo({
        url: "setting",
      });   
    },
    jumpToMyPost:function() {
      Taro.navigateTo({
        url: "setting",
      });
    },
    jumpToAbout:function() {
      Taro.navigateTo({
        url: "about",
      });
    }
  },
};
</script>

