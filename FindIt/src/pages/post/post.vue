<template>
  <view class="form-box">
    <AtForm :onSubmit="onSubmit.bind(this)">
      <view class="spilt" />
      <view class="spilt" />

      <view class="buttonView">
        <!-- <button id="cancelButton" type="secondry" circle size="mini">
            取消
          </button> -->
        <button
          id="submitButton"
          type="primary"
          circle
          size="mini"
          formType="submit"
        >
          提交
        </button>
      </view>

      <view class="spilt" />

      <AtTextarea
        id="textArea"
        :value="description"
        :onChange="onChange.bind(this, 'description')"
        placeholder="说点什么吧"
        height="400"
        required
      />

      <view class="spilt" />

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
    </AtForm>
    <!-- <AtRadio
        :options="options"
        :value="tag"
        :onClick="onChange.bind(this, 'tag')"
      /> -->
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
import Taro from "@tarojs/taro";
import "taro-ui-vue/dist/style/components/textarea.scss";
import "taro-ui-vue/dist/style/components/icon.scss";
import "taro-ui-vue/dist/style/components/image-picker.scss";
import "taro-ui-vue/dist/style/components/button.scss";
import "taro-ui-vue/dist/style/components/radio.scss";
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
      this.imgPickerShowAddBtn = this.imgPickerCnt != 0;
      console.log(this.imgPickerCnt);
      console.log(this.imgPickerShowAddBtn);
    },
    onSubmit(event) {
      console.log(event);
      if (this.description.length == 0) {
        Taro.showToast({
          title: '描述不能为空!',
          // image: '\src\images\icons\alart.png',
          icon: 'none',
          duration: 1000,
        });
      } else {
        Taro.showLoading({
          title: "发布中",
        });
        setTimeout(() => {
          //TODO: 将数据打包提交到服务器
          Taro.hideLoading();
          Taro.switchTab({
            url: "/pages/list/list",
          });
        }, 1000);
      }
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

