<template>

    <view :style='css' class="item-card" >
        
        <AtSwipeAction :options="cardOptions" :onClick="handleClick" auto-close>
        <At-Card :title="data[index].description" :icon="{ value: 'tags', color: '#77a1fd' }" hoverClass="item-card__hover" hoverStayTime="50" :onClick="jumpToDetail">
        <view class="item-content at-row" >
            <view class="item-thumb at-col at-col-4">
                <image mode='aspectFill' style="height:90px;width:100px" :src="data[index].thumb"></image>
            </view>
            <view class="item-detail at-col at-col-8"> 
                <AtTag 
                    v-if="data[index].tags[0]=='lost'" 
                    class="lost-tag" 
                    size="small"
                    active
                    name="寻物启事"
                >
                    寻物启事
                </AtTag>
                <AtTag class="found-tag" v-else
                    size="small"
                    active
                >
                    失物招领
                </AtTag>
                <view class="split"></view>
                <AtTag class="method-tag bg-green light" size="small" >{{ data[index].method }}</AtTag>
                <view class="split"></view>
                <AtTag class="time-tag bg-purple light" size="small" >{{ data[index].createdTime }}</AtTag>
            </view>
        </view>
        </At-Card>
        </AtSwipeAction>
    </view>
    
</template>
<script>
import Taro from "@tarojs/taro";
import { AtTag,AtCard,AtSwipeAction } from 'taro-ui-vue';
import "taro-ui-vue/dist/style/components/message.scss";
import "taro-ui-vue/dist/style/components/tag.scss";
import "taro-ui-vue/dist/style/components/flex.scss";
import "taro-ui-vue/dist/style/components/card.scss";
import "taro-ui-vue/dist/style/components/swipe-action.scss";
import "./card.less";
export default{
    props: ['index', 'data', 'css'],
    data() {
        return {
           cardOptions:[
               {
                   text:'感谢',
                   style:{
                       backgroundColor:'#39b54a',
                       opacity:'0.8',     
                   }
               },
               {
                   text:'举报',
                   style:{
                       backgroundColor:"#e54d42",
                       opacity:'0.8',
                   }
               }
           ],
           cardOpened:false
        }
    },
    components:{
        AtTag,AtCard,AtSwipeAction
    },
    mounted() {
       
    },
    methods:{
        jumpToDetail() {
            console.log("jump")
            // Taro.navigateTo({
            //     url: "/pages/detail/detail",
            // });
        },
        thank() {
            Taro.atMessage({
                message:"感谢你的感谢！",
                type:'success'
            })
            console.log(this.data[this.index].isOpened)
            this.cardOpened = false
            console.log(this.data[this.index].isOpened)
        },
        report() {
            Taro.atMessage({
                message:"反馈已收到",
                type:'success'
            })
        },
        handleClick(e) {
            if (e.text == "感谢") {
                this.thank()
            }
            else if (e.text == "举报") {
                this.report()
            }
        },
    }
}
</script>
<style lang="less">
.item-card__hover{
    background-color: rgb(235, 235, 235);
    opacity: 0.8;
}
</style>
