import Taro from "@tarojs/taro";
import { appApiPrefix, h5ApiPrefix } from "../configs/config";
import * as api from "../configs/api";
import request from "./request";

let apiPrefix;
if (process.env.TARO_ENV === "weapp") {
    apiPrefix = appApiPrefix
} else {
    apiPrefix = h5ApiPrefix
}

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
    postItem: function({description="",method="",tags=[],photos=[]}) {
        
        var photo_paths = photos.map(p => p.url)
        return this.uploadImages(photo_paths).then((res) => {
            return request({
                url: api.ITEM_CREATE,
                method:'POST',
                header:{
                    'content-type': 'application/json' 
                },
                data: {
                    description,
                    method,
                    tags,
                    photos:res
    
                },
                oauth2: true
            })
        })

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
        return this.postList(0)
    },

    // Data Api
    findItData: function() {
        return request({
            url: api.DATA_GET,
            method:'GET',
            header: {
                'content-type': 'application/json' 
            },
            oauth2: false
        })
    },

    // Image Api
    uploadImages: function(photos) {
        return new Promise(async function(resolve, reject) {
            console.log("upload images")
            await findItApi.uploadOneByOne(photos)
            return resolve(photos)
        })
    },
    uploadOneByOne: function(paths=[], count=0, successUp=0, failUp=0) {
        
        Taro.showLoading({
            title: '正在上传第'+count+"张图片"
        });
        Taro.uploadFile({
            url:  apiPrefix + api.IMAGE_UPLOAD,
            filePath: paths[count],
            method: 'POST',
            header: {
                "Content-Type": "multipart/form-data;charset=utf-8",
            },
            name: 'file',
            success: (uploadFileRes) => {
                successUp++
                console.log(uploadFileRes.data); // 这里应该返回了一个图片的url，需要记录下来
                paths[count] = uploadFileRes.data
            },
            fail: () => {
                failUp++
            },
            complete: () => {
                count++
                // 所有图片上传完成
                if(count >= paths.length) {
                    if (successUp == count) {
                        Taro.showToast({
                            title: '上传成功',
                            icon: 'success',
                            duration: 2000
                        });
                    }
                    else {
                        console.log('上传成功' + successUp + ',' + '失败' + failUp)
                    }
                }
                else {
                    // 递归调用，上传下一张
                    findItApi.uploadOneByOne(paths, count, successUp, failUp)
                }
            }
        });
        
    }

}

export default findItApi