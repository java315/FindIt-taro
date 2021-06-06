import Taro from "@tarojs/taro";
import { resolve } from "node:path";
import * as api from "../configs/api";
import request from "./request";

const findItApi = {
    
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

    }
}

export default findItApi