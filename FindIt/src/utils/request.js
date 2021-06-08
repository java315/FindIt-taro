import Taro from "@tarojs/taro";
import * as api from "../configs/api";
import { appApiPrefix, h5ApiPrefix } from "../configs/config";
var request_count = 0
const weappRequest = {
  apiPrefix: appApiPrefix,
  
  request: function({
    url,
    method = "GET",
    data = {},
    header = {},
    oauth2 = false
  }) {
    return new Promise(async function(resolve, reject) {
      
      // 处理请求头
      if (oauth2) {
        const stuId = Taro.getStorageSync("stuId");
        if (stuId == null || stuId == "") {
          Taro.showModal({
            title: 'NJU验证',
            content: '该功能需要验证NJU身份，是否前往验证？',
            success: function (res) {
              if (res.confirm) {
                Taro.navigateTo({
                   url: '/pages/user/login/login',
                });
              } else if (res.cancel) {
                // do nothing
                console.log("cancel")
              }
            }
          });
          console.log("cancel")
          return reject({
            message:"等待身份验证"
          })
        }
        const token = Taro.getStorageSync("token");
        header["Authorization"] = token
      }

      await Taro.showLoading({ title: "加载中..." });
      // 请求
      const result = await Taro.request({
        url: weappRequest.apiPrefix + url,
        method,
        data,
        header
      });
      await Taro.hideLoading();

      if (result.statusCode === 401) {
        // token无效或过期，重新请求 token
        await weappRequest.getToken()
        const result = await weappRequest.request({ url, method, data, header, oauth2 })
        resolve(result)
      } else if (result.statusCode >= 200 && result.statusCode < 400) {
        request_count = 0
        resolve(result.data);
      } else {
        request_count = 0
        reject({
          code: "9999",
          message: "服务端出错",
          data: {}
        });
      }
    });
  },
  signup: async function() {
    // 在绑定微信和学号之后，应该只需要通过code就能直接登录
  },
  signin: async function() {
    const { code } = await Taro.login()
    const stuId = Taro.getStorageSync('stuId')
    const result = await Taro.request({
        url: weappRequest.apiPrefix + api.WX_LOGIN,
        data: { 
            code,
            NJUID: stuId 
        },
        method: 'GET',
    })
    Taro.setStorageSync('token', result.data.Authorization)
  },
  getToken: async function() {
    await this.signin()
  }
};

const h5Request = {
  apiPrefix: h5ApiPrefix,
  request: function({
    url,
    method = "GET",
    data = {},
    header = {},
    oauth2 = false
  }) {
    return new Promise(async function(resolve, reject) {
      const userId = Taro.getStorageSync("userId");
      if (!userId) {
        Taro.redirectTo({
          url: "/pages/oauth/signin/index"
        });
        return resolve({ code: "0000", message: "跳转到登录页", data: {} });
      }

      // 处理请求头
      if (oauth2) {
        const token = Taro.getStorageSync("token");
        header["Authorization"] = `Bearer ${token}`;
      }

      if (method !== "GET") {
        header["Content-Type"] = "application/json";
      }

      await Taro.showLoading({ title: "加载中..." });
      const result = await Taro.request({
        url: h5Request.apiPrefix + url,
        method,
        data,
        header
      });
      await Taro.hideLoading();

      if (result.statusCode === 401) {
        // 未认证，重新请求 token
        await h5Request.getToken();
        const result = await h5Request.request({
          url,
          method,
          data,
          header,
          oauth2
        });
        resolve(result);
      } else if (result.statusCode >= 200 && result.statusCode < 400) {
        resolve(result.data);
      } else {
        reject({
          code: "9999",
          message: "服务端出错",
          data: {}
        });
      }
    });
  },
  getToken: async function() {
    // const userId = Taro.getStorageSync('userId')
    // const result = await Taro.request({
    //     url: h5Request.apiPrefix + api.OAUTH_TOKEN_GET,
    //     method: 'GET',
    //     data: { userId },
    // })
    // Taro.setStorageSync('token', result.data.data.token)
  }
};

let request;
if (process.env.TARO_ENV === "weapp") {
  request = weappRequest.request;
} else {
  request = h5Request.request;
}

export default request;
