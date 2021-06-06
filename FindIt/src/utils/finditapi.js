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
    itemDetail:function(id) {
        return request({
            url: api.ITEM_GET + id,
            method:'GET',
            header:{
                'content-type': 'application/json' 
            },
            oauth2: true
        })
    },
    itemCreate:function() {
        
    },
    deleteItem:function() {
        return request({
            url: api.ITEM_DELETE + id,
            method:'DELETE',
            oauth2: true
        })
    },
    tagList: function() {
        return request({
            url: api.TAG_LIST_GET,
            method:'GET',
            header:{
                'content-type': 'application/json' 
            },
            oauth2: true
        })
    },
    todayItemList: function() {

    },

    // Post Api
    postList: function(page = 0) {
        return request({
            url: api.POST_LIST_GET,
            method:'GET',
            header:{
                'content-type': 'application/json' 
            },
            data:{
                page
            },
            oauth2: false
        })
    },
    recentPostList: function() { // 获取最近的三条公告

    },

    // Data Api
    findItData: function() {
        
    },

    // Image Api
    uploadImage: function() {
        // 这里要调用Taro.uploadFile()
    }

}

export default findItApi