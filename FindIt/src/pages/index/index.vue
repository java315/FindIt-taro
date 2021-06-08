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
          <view class="broadcast" v-if="posts.length > 0">
          <AtNoticebar v-for="post in posts" :key="post.id" icon='volume-plus' showMore single :onGotoMore="onGotoMore.bind(this,post)">
            {{ post.title }}
          </AtNoticebar>
          </view>
          <view class="broadcast" v-else>
          <AtNoticebar icon='volume-plus' single>
            [公告]最近没啥公告
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
import findItApi from "../../utils/finditapi"

import "taro-ui-vue/dist/style/components/grid.scss";
import "taro-ui-vue/dist/style/components/flex.scss";
import "taro-ui-vue/dist/style/components/button.scss"
import "taro-ui-vue/dist/style/components/noticebar.scss";
import './index.less' 

import cardimg from '../../images/colorful/card.png'
import foundimg from '../../images/colorful/found.png'
import lostimg from '../../images/colorful/lost.png'
import moneyimg from '../../images/colorful/money.png'
import { setGlobalData } from '../../utils/global';
export default {
  components: {
    AtButton,AtGrid,AtTag,AtNoticebar
  },
  data () {
    return {
      posts:[],
      quickNavIcon : [
        {
          image: cardimg,
          value: '找校园卡',
        },
        {
          image: lostimg,
          value: '寻物启事',
        },
        {
          image: foundimg,
          value: '失物招领',
        },
        {
          image: moneyimg,
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
  mounted() {
    findItApi.recentPostList().then((posts) => {
      console.log(posts)
      this.posts = posts
    })
    findItApi.findItData().then((data) => {
      console.log(data)
      this.todayData = data
    })
  },
  methods: {
    quickRoute(value, index) {
      setGlobalData("listTag",value.value)
      Taro.switchTab({
         url: '/pages/list/list',
      });
    },
    onGotoMore(e) {
      console.log(e)
      Taro.showModal({
        title: e.title,
        content: e.content,
        showCancel: false
      })
    },
    
  },
    }
</script>
