<template>
  <view class="index">
    <view class="panel">
        <view class="panel__title">Switch 按钮列表</view>
    </view>
  </view>
</template>

<script>
// 按需引入, 更小的应用体积
import { AtButton, AtGrid, AtNoticebar } from 'taro-ui-vue'
import "taro-ui-vue/dist/style/components/button.scss"
import './index.less' 
export default {
    components: {
    AtButton,
  },
  data () {
    return {
      msg: 'Hello world!',
      show: false
    }
  },
  methods: {
    handleClick () {
      this.show = true
    },
    handleClose () {
      this.show = false
    }
  },
    }
</script>
