<template>
  <view class="about">
    <view class="cover">
      <image mode="aspectFill" :src="coverSrc"></image>
      <view class="name-tags-log">
        南浔
        <AtTag
          v-for="tag in tags"
          class="tag"
          disabled
          size="small"
          :key="tag"
          >{{ tag }}</AtTag
        >
        <AtBadge :dot="haveUpdate">
          <AtButton class="updateLog" size="small">更新日志</AtButton>
        </AtBadge>
      </view>
    </view>

    <view class="spilt" />

    <view class="at-article">
      <view class="at-article__h1">简介</view>
      <view class="at-article__content">
        <view class="at-article__p">
          带着这些问题，我们来审视一下南寻。 既然如此，
          对我个人而言，南寻不仅仅是一个重大的事件，还可能会改变我的人生。
          可是，即使是这样，南寻的出现仍然代表了一定的意义。
          迈克尔·F·斯特利在不经意间这样说过，最具挑战性的挑战莫过于提升自我。
          这启发了我。就我个人来说，南寻对我的意义，不能不说非常重大。
          南寻，到底应该如何实现。
          了解清楚南寻到底是一种怎么样的存在，是解决一切问题的关键。 既然如此，
          佚名曾经说过，感激每一个新的挑战，因为它会锻造你的意志和品格。这不禁令我深思。
        </view>
      </view>
    </view>

    <view class="spilt" />

    <view class="developer">
      <view class="at-article">
        <view class="at-article__h1">和开发者交朋友</view>
      </view>
      <image
        mode="aspectFill"
        v-for="{ name, src } in developerImages"
        :src="src"
        :key="name"
      ></image>
    </view>
  </view>
</template>

<script>
// 按需引入, 更小的应用体积
import { AtButton, AtToast, AtNoticebar, AtTag, AtBadge } from "taro-ui-vue";
import "taro-ui-vue/dist/style/components/button.scss";
import "taro-ui-vue/dist/style/components/toast.scss";
import "taro-ui-vue/dist/style/components/badge.scss";
import "taro-ui-vue/dist/style/components/article.scss";
import "taro-ui-vue/dist/style/components/tag.scss";
import "taro-ui-vue/dist/style/components/noticebar.scss";
import "./about.less";
export default {
  components: {
    AtButton,
    AtToast,
    AtNoticebar,
    AtTag,
    AtBadge,
  },
  data() {
    return {
      msg: "Hello world!",
      show: false,
      coverSrc:
        "https://cbu01.alicdn.com/img/ibank/2016/597/960/3694069795_1624996386.jpg",
      tags: ["v1.0.0", "正式发布"],
      haveUpdate: true,
      developerImages: [
        {
          name: "1",
          src:
            "https://cbu01.alicdn.com/img/ibank/2016/597/960/3694069795_1624996386.jpg",
        },
        {
          name: "2",
          src:
            "https://cbu01.alicdn.com/img/ibank/2016/597/960/3694069795_1624996386.jpg",
        },
      ],
    };
  },
  methods: {
    handleClick() {
      this.show = true;
    },
    handleClose() {
      this.show = false;
    },
    jumpToUpdateLog() {
      Taro.navigateTo({
        url: "updateLog",
      });
    },
  },
};
</script>
