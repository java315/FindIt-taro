<template>
  <view>
    <AtNavBar color="#000" title="发布"> </AtNavBar>
    <view class="form-box">
      <AtForm :onSubmit="onSubmit.bind(this)">
        <AtTextarea
          :value="description"
          :onChange="onChange.bind(this, 'description')"
          placeholder="请输入物品的描述信息"
          height="200"
        />
      </AtForm>
      <AtRadio
        :options="options"
        :value="tag"
        :onClick="onChange.bind(this, 'tag')"
      />
      <AtImagePicker
        multiple
        :showAddBtn="imgPickerShowAddBtn"
        :length="imgPickerLength"
        :count="imgPickerCnt"
        :files="imgs"
        :onChange="onImgPickerChange.bind(this)"
        :onFail="this.onFail.bind(this)"
        :onImageClick="this.onImgClick.bind(this)"
      />
      <AtButton type="primary" formType="submit">提交</AtButton>
    </view>
  </view>
</template>

<script>
import {
  AtForm,
  AtTextarea,
  AtNavBar,
  AtRadio,
  AtImagePicker,
  AtButton,
} from "taro-ui-vue";
import "taro-ui-vue/dist/style/components/textarea.scss";
import "taro-ui-vue/dist/style/components/image-picker.scss";
import "taro-ui-vue/dist/style/components/nav-bar.scss";
import "taro-ui-vue/dist/style/components/button.scss";
import "taro-ui-vue/dist/style/components/radio.scss";
import "taro-ui-vue/dist/style/components/icon.scss";
import "taro-ui-vue/dist/style/components/form.scss";
import "./post.less";
export default {
  components: {
    AtForm,
    AtRadio,
    AtTextarea,
    AtNavBar,
    AtImagePicker,
    AtButton,
  },
  data() {
    return {
      description: "",
      tag: "lost",
      options: [
        { label: "寻物启事", value: "lost" },
        { label: "失物招领", value: "found" },
      ],
      imgs: [],
      imgPickerLength: 3,
      imgPickerCnt: 9,
      imgPickerShowAddBtn: true,
    };
  },
  methods: {
    onChange(stateName, value) {
      console.log(stateName, value);
      this[stateName] = value;
    },
    onImgPickerChange(value) {
      this.imgs = value;
      this.imgPickerCnt = 9 - value.length;
      this.imgPickerShowAddBtn = (this.imgPickerCnt != 0);
      console.log(this.imgPickerCnt);
      console.log(this.imgPickerShowAddBtn);
    },
    onSubmit(event) {
      console.log(event);
    },
    onFail(mes) {
      console.log(mes);
    },
    onImgClick(index, file) {
      console.log(index, file);
    },
  },
};
</script>

<style>
</style>