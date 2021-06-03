<template>
    <view class="login">
        <image class="title" src="../../../images/more/title.png"></image>
        <view class="content">
            <view class="hd" :style="'transform:rotateZ('+angle+'deg);'">
                <image class="logo" src="../../../images/more/logo.png"></image>
                <image class="wave" src="../../../images/more/wave.png" mode="aspectFill"></image>
                <image class="wave wave-bg" src="../../../images/more/wave.png" mode="aspectFill"></image>
            </view>
            <view class="bd">
                <form class="login-form">
                    <view class="'input-group">
                        <text class="input-label">帐号</text>
                        <input cursor-spacing="30" id="userid" maxlength="9" placeholder="请输入您的学号" bindinput="useridInput" bindfocus="inputFocus" bindblur="inputBlur" />
                    </view>
                    <view class="input-group">
                        <text class="input-label">密码</text>
                        <input password="true" cursor-spacing="30" id="passwd" placeholder="请输入对应密码" bindinput="passwdInput" bindfocus="inputFocus" bindblur="inputBlur" />
                    </view>
                    <view class="input-group">
                        <image class="input-lable-authcd" :src="captcha" mode="aspectFit"></image>
                        <input cursor-spacing="30" id="authcd" maxlength="4" placeholder="输入图中验证码" bindinput="authcdInput" bindfocus="inputFocus" bindblur="inputBlur" />
                    </view>
                    <view class="login-help" >
                        <AtButton size="small" :onClick="showHelp" class="no-border">
                            帮助
                            <view class='at-icon at-icon-help'></view>
                        </AtButton>
                        
                    </view>
                </form>
                <view class="confirm-btn" @tap="handleConfirm">
                    <text>登录</text>
                </view>
            </view>
            <view class="help" v-if="help_status">
                <view class="box">
                    <view class="box-hd">
                        <text class="box-title">帮助</text>
                        <image class="box-close" src="../../../images/more/close.png" @tap="help_status=false"></image>
                        
                    </view>
                    <view class="box-bd">
                        <view class="help-q">1、帐号和密码是什么？</view>
                        <view class="help-a">
                            <text>帐号：统一身份认证学号</text>
                            <text>密码：统一身份认证密码</text>
                        </view>
                        <view class="help-q">2、忘记密码？</view>
                        <view class="help-a">
                            <text>请访问南京大学统一身份认证平台重置密码</text>
                        </view>
                    </view>
                </view>
            </view>

        </view>
    </view>
</template>

<script>
import Taro from "@tarojs/taro";
import request from '../../../utils/request';
import * as api from '../../../configs/api';
import {AtButton} from "taro-ui-vue";
import "taro-ui-vue/dist/style/components/button.scss"
import {CheckNJUIdentity} from "../../../utils/api";
import "./login.less";
export default {
    async mounted() {
        let data = {}
        const result = await CheckNJUIdentity(data)
        this.data = result
        console.log(result)
    },
    data() {
        return {
            data:[],
            captcha:"",
            angle: 0,
            help_status:false
        } 
    },
    components: {
        AtButton
    },
    methods:{
        showHelp() {
            this.help_status = true
            console.log("click")
        },
        hideHelp() {
            this.help_status = false
        },
        handleConfirm() {
            console.log("hello")
        }
    }
}
</script>

