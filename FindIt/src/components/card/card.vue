<template>
    <view :style='css' class="item-card">
        <At-Card :title="data[index].description" :icon="{ value: 'tags', color: '#77a1fd' }">
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
    </view>
</template>
<script>
import { AtTag,AtCard } from 'taro-ui-vue';
import "taro-ui-vue/dist/style/components/tag.scss";
import "taro-ui-vue/dist/style/components/flex.scss";
import "taro-ui-vue/dist/style/components/card.scss";
import "./card.less";
export default{
    props: ['index', 'data', 'css'],
    data() {
        return {
           
        }
    },
    components:{
        AtTag,AtCard
    },
    mounted() {
       
    }
}
</script>
