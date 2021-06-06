import Taro from "@tarojs/taro";
import { resolve } from "node:path";
import * as api from "../configs/api";
import request from "./request";

const findItApi = {
    // Item api
    itemList: function(page=0) {
        return request({
            url: api.ITEM_LIST_GET,
            method:'GET',
            header:{
                'content-type': 'application/json' 
            },
            data: {
                page
            },
            oauth2: true
        })
    },
    itemDetail:function() {

    },
    itemCreate:function() {

    },
    deleteItem:function() {

    },
    tagList: function() {

    },
    todayItemList: function() {

    },

    // Post Api
    postList: function() {

    },

    // Data Api
    findItData: function() {
        Taro.request({
            url: 'https://www.example.com/request', //仅为示例，并非真实接口地址。
            data: {
                text: 'Taro.request'
            },
            header: {
                'custom-header': 'hello' //自定义请求头信息
            },
            success: (res) => {
                console.log(res.data);
                this.text = 'request success';
            }
        });
    },



}

export default findItApi