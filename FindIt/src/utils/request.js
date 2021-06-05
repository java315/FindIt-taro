import Taro from "@tarojs/taro";
import * as api from "../configs/api";
import { appApiPrefix, h5ApiPrefix } from "../configs/config";

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
      const userId = Taro.getStorageSync("userId");
      if (!userId) {
        // 登录
        await weappRequest.signin();
        data.userId = Taro.getStorageSync("userId");
        const result = await weappRequest.request({
          url,
          method,
          data,
          header,
          oauth2
        });
        return resolve(result);
      }
      // 处理请求头
      if (oauth2) {
        const token = Taro.getStorageSync("token");
        header["Authorization"] = `Bearer ${token}`;
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
        // // 未认证，重新请求 token
        // await weappRequest.getToken()
        // const result = await weappRequest.request({ url, method, data, header, oauth2 })
        // resolve(result)
        console.log("不大对劲");
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
  signin: async function() {
    // const { code } = await Taro.login()
    // const result = await Taro.request({
    //     url: weappRequest.apiPrefix + api.OAUTH_SIGNIN_WX,
    //     data: { code },
    //     method: 'POST',
    // })
    // const { userId, openId, token, nickname, avatarUrl } = result.data && result.data.data
    let userId = "123";
    Taro.setStorageSync("userId", userId);
    // Taro.setStorageSync('openId', openId)
    // Taro.setStorageSync('token', token)
    // Taro.setStorageSync('nickname', nickname)
    // Taro.setStorageSync('avatarUrl', avatarUrl)
  },
  getToken: async function() {
    // const userId = Taro.getStorageSync('userId')
    Taro.login().then(res => {
      if (res.code) {
        const result = Taro.request({
          url: weappRequest.apiPrefix + "/login/wx",
          method: "GET",
          data: {
            NJUID: "181860106",
            code: res.code
            // "signature":
          }
        }).then(res => {
          console.log(res.data.Authorization);
          Taro.request({
            url: weappRequest.apiPrefix + api.ITEM_GET,
            method: "GET",
            header: {
              "Authorization": res.data.Authorization
            }
          }).then(res => console.log(res));

          // Taro.setStorageSync('token', result.data.data.token);
        });
      } else {
        console.log("登录失败！" + res.errMsg);
      }
    });
    // const result = await Taro.request({
    //     url: weappRequest.apiPrefix + "/login/wx",
    //     method: 'GET',
    //     data: { "NJUID": userId,
    //             "code":
    //  },
    // })
    // Taro.setStorageSync('token', result.data.data.token)
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
let getToken;
if (process.env.TARO_ENV === "weapp") {
  request = weappRequest.request;
  getToken = weappRequest.getToken;
} else {
  request = h5Request.request;
  getToken = h5Request.getToken;
}

export default request;
export { getToken };
