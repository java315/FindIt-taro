<template>
  <view class="index">
    <view class="panel">
        <view class="panel__title">快捷导航</view>
        <view class="panel__content">
          <AtGrid
            :data="quickNavIcon"
            :onClick="quickRoute"
            mode="rect"
          />
        </view>
    </view>

    <view class="panel">
        <view class="panel__title">FindIt数据</view>
        <view class="panel__content">
          <view class="at-row at-row--wrap">
            <view class="at-col at-col-6" v-for="d in todayData" :key="d.type">
              <view class="at-row at-row__justify--center at-row__align--center" style="margin-bottom:10px;">
              <view class="at-col at-col-8 data-type">
                <AtTag 
                    active
                >
                  {{ d.type }}
                </AtTag>
              </view>
              <view class="at-col at-col-3 data-value">{{ d.value }}</view>
              </view>
            </view>
          </view>
        </view>
    </view>

    <view class="panel">
        <view class="panel__title">公告区</view>
        <view class="panel__content">
          <view class="broadcast">
          <AtNoticebar v-for="i in 3" :key="i" icon='volume-plus' showMore single :onGotoMore="onGotoMore">
            [公告]
            这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏
          </AtNoticebar>
          </view>
        </view>
    </view>
  </view>
</template>

<script>
// 按需引入, 更小的应用体积
import { AtButton, AtGrid, AtTag, AtNoticebar } from 'taro-ui-vue'
import Taro from "@tarojs/taro";

import "taro-ui-vue/dist/style/components/grid.scss";
import "taro-ui-vue/dist/style/components/flex.scss";
import "taro-ui-vue/dist/style/components/button.scss"
import "taro-ui-vue/dist/style/components/noticebar.scss";
import './index.less' 
export default {
  components: {
    AtButton,AtGrid,AtTag,AtNoticebar
  },
  data () {
    return {
      quickNavIcon : [
        {
          image:
            'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
          value: '找校园卡',
        },
        {
          image:
            'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
          value: '寻物启示',
        },
        {
          image:
            'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
          value: '失物招领',
        },
        {
          image:
            'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
          value: '贵重物品',
        },
      ],
      todayData:[
        {
          type:"今日丢失数",
          value:10,
        },
        {
          type:"今日招领数",
          value:10,
        },
        {
          type:"总共丢失",
          value:100,
        },
        {
          type:"总共招领",
          value:100,
        },
        {
          type:"成功找回",
          value:50,
        },
        {
          type:"用户数",
          value:100,
        },
      ]
    }
  },
  methods: {
    quickRoute(value, index) {
      Taro.showModal({
        title: '提示',
        content: `Value: ${JSON.stringify(value)}, Index: ${index}`,
        showCancel: false,
      })
    },
    onGotoMore() {
      console.log("hello")
    }
  },
    }
</script>
