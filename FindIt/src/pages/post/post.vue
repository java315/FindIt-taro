<template>
  <view class="form-box">
    <AtMessage />

    <AtForm>
      <view class="spilt" />
      <view class="spilt" />

      <view
        class="at-row at-row__align--center at-row__justify--center buttonView"
      >
        <view class="at-col at-col-2">
          <AtButton
            type="secondary"
            style="margin-left: 10px"
            size="small"
            :onClick="backToList"
          >
            取消
          </AtButton>
        </view>
        <view class="at-col at-col-6 at-col__offset-1">
          <view class="post-title" style="text-align: center; font-size: 18px"
            >发布</view
          >
        </view>
        <view class="at-col at-col-2 at-col__offset-1">
          <AtButton
            type="primary"
            size="small"
            :onClick="onSubmit"
            style="margin-right: 10px"
          >
            提交
          </AtButton>
        </view>
      </view>

      <view class="spilt" />

      <view class="panel">
        <view class="panel__title">稍微描述下它</view>
        <view class="panel__content">
          <AtTextarea
            class="textArea"
            :value="description"
            :onChange="onChange.bind(this, 'description')"
            :maxLength="50"
            placeholder="快快交代(￣▽￣)~*"
            height="100"
            required
          />
        </view>
      </view>
      <view class="panel">
        <view class="panel__title">大概在哪呀</view>
        <view class="panel__content">
          <AtTextarea
            class="textArea"
            :value="method"
            :onChange="onChange.bind(this, 'method')"
            placeholder="写上失主的寻回方式（失物招领）or写上大概在哪里丢的吧QAQ（寻物启事）"
            :maxLength="50"
            height="100"
            required
          />
        </view>
      </view>
      <view class="panel">
        <view class="panel__title">选一下标签</view>
        <view class="panel__content">
          <picker
            mode="selector"
            :range="tags"
            :value="selectedTagIndex"
            @change="handleChange"
            @cancel="handleCancel"
          >
            <view class="selector-item">
              <view class="selector-item__label">发布类型</view>
              <view class="selector-item__value">{{
                tags[selectedTagIndex]
              }}</view>
            </view>
          </picker>
        </view>
      </view>
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
import findItApi from "../../utils/finditapi"
import "taro-ui-vue/dist/style/components/message.scss";
import "taro-ui-vue/dist/style/components/textarea.scss";
import "taro-ui-vue/dist/style/components/icon.scss";
import "taro-ui-vue/dist/style/components/image-picker.scss";
import "taro-ui-vue/dist/style/components/button.scss";
import "taro-ui-vue/dist/style/components/nav-bar.scss";
import "taro-ui-vue/dist/style/components/radio.scss";
import "taro-ui-vue/dist/style/components/form.scss";
import { getGlobalData } from "../../utils/global";
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
      selectedTagIndex: 0,
      method: "",
      imgs: [],
      imgPickerLength: 3,
      imgPickerCnt: 9,
      imgPickerShowAddBtn: true,
      tags: ["失物招领", "寻物启事"],
    };
  },
  mounted() {
    findItApi.tagList().then((tags) => {
      console.log(tags);
    })
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

    backToList() {
      Taro.switchTab({
        url: "/pages/list/list",
      });
    },
    
    onSubmit() {
      if (this.description.length < 5) {
        Taro.showToast({
          title: '描述请再详细些',
          icon: 'error',
          duration: 1000
        });
      }
      else {
        let description = this.description
        let method = this.method
        let photos = this.imgs
        let selectedTag = this.tags[this.selectedTagIndex]
        findItApi.postItem({
          tags:[selectedTag],
          description,
          method,
          photos
        }).then(() => {
          
        })
      }

    },

    onFail(mes) {
      console.log(mes);
    },
    onImgClick(index, file) {
      console.log(index, file);
    },
    handleChange(e) {
      this.selectedTagIndex = e.detail.value;
    },
    handleCancel(e) {},
  },
};
</script>

