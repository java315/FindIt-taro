<template>
  <view class="apiTest">
    <view class="index">
    <AtNoticebar marquee>
      此页面用于测试api
    </AtNoticebar>
    <AtButton
      type="primary"
      :onClick="handleClick"
    >
      执行
    </AtButton>
  </view>
  </view>
</template>

<script>
import findItApi from "../../utils/finditapi"
// 按需引入, 更小的应用体积
import { AtButton, AtNoticebar } from 'taro-ui-vue'
import "taro-ui-vue/dist/style/components/button.scss"
import "taro-ui-vue/dist/style/components/noticebar.scss"
import './apiTest.less' 
export default {
    components: {
    AtButton,
    AtNoticebar
  },
  data () {
    return {
    }
  },
  methods: {
    handleClick () {
      findItApi.itemList(0).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.error(err)
      })
    },
  },
}
</script>
