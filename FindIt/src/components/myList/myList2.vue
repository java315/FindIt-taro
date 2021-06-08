<template>
  <view class="item-box">
    <virtual-list
      wclass="List"
      :height="height"
      :item-data="items"
      :item-count="dataLen"
      :item-size="itemHeight"
      :item="Card"
      width="100%"
      @scroll="onScroll"
    />
  </view>
</template>
<script>
import { values } from "lodash";
import Card from "../card/myCard";
import "./myList.less";

export default {
  props: {
    height: {
      type: Number,
      default: 600,
    },
    items:{
      type:Array,
      default:()=>[],
    },
    itemHeight:{
      type: Number,
      default: 150,
    },
  },
  data() {
    return {
      Card,
    };
  },
  computed: {
    dataLen() {
      return this.items.length;
    },
  },
  methods: {
    onScroll(values) {
      this.$emit("scroll", values);
    },
  },
};
</script>
