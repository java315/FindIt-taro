<template>
  <view class="user">
    <AtMessage/>
    <view class="userinfo at-row  at-row__align--center">
      <view class="at-col at-col-3">
        <view class="avatar">
          <open-data
            type="userAvatarUrl"
            default-avatar="../../images/icons/user.png"
          />
        </view>
      </view>
      <view class="at-col at-col-3 at-col__offset-1 at-col--auto">
        <view>
          <view class="nickname">
            哈喽！嚼菜根的<open-data type="userNickName" default-text="请先登录" />
          </view>
          <view>
            <AtTag :class="isNJUer?'checked':'unchecked'" active :onClick="jumpToLogin">{{ state }}</AtTag>
          </view>
        </view>
        
      </view>
      <view class="at-col at-col-1 at-col__offset-3">
        <view @tap="jumpToSetting">
          <AtIcon value='settings' size='32' color="#aaa"></AtIcon>
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
import { AtTag,AtIcon,AtList, AtListItem, AtMessage } from "taro-ui-vue";
import "taro-ui-vue/dist/style/components/list.scss";
import "taro-ui-vue/dist/style/components/icon.scss";
import "taro-ui-vue/dist/style/components/tag.scss";
import {getGlobalData,setGlobalData} from "../../utils/global";
import "./user.less";
export default {
  components: {
    AtIcon,
    AtList,
    AtListItem,
    AtMessage,
    AtTag
  },
  data() {
    return {
      state:"未认证",
      isNJUer:false
    };
  },
  mounted() {
    let state = getGlobalData("state")
    if (state == "checked") {
      this.state = Taro.getStorageSync('stuId')
    }
  },
  methods: {
    jumpToSetting:function() {
      Taro.atMessage({
        message:"敬请期待",
        type:'warning'
      })
      // Taro.navigateTo({
      //   url: "setting",
      // });
    },
    jumpToMyPost:function() {
      Taro.navigateTo({
        url: "/pages/user/myPost/myPost",
      });
    },
    jumpToAbout:function() {
      Taro.navigateTo({
        url: "/pages/user/about/about",
      });
    },
    jumpToLogin() {
      Taro.navigateTo({
        url: "/pages/auth/login/login",
      });
    }
  },
};
</script>

