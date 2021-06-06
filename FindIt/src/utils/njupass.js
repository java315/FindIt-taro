import request from "./request";
import Taro from '@tarojs/taro'
import {encryptAES} from "./encrypt"
import {getGlobalData,setGlobalData} from "./global";

function guard(v) {
    if (v instanceof Object) {
        return v[1]
    }
    else {
        return 0
    }    
}

const njupass = {
    getCookie : function() {
        return new Promise(async function(resolve,reject) {
            var result = await Taro.request({
                url: 'https://authserver.nju.edu.cn/authserver/login',
                method: 'GET',
                header:{
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });
            if (result.statusCode != 200) {
                reject()
                return
            }
            
            var code = result.data
            var lt = guard(code.match(/<input type="hidden" name="lt" value="(.*)"\/>/))
            var dllt = guard(code.match(/<input type="hidden" name="dllt" value="(.*)"\/>/))
            var execution = guard(code.match(/<input type="hidden" name="execution" value="(.*)"\/>/))
            var _eventId = guard(code.match(/<input type="hidden" name="_eventId" value="(.*)"\/>/))
            var rmShown = guard(code.match(/<input type="hidden" name="rmShown" value="(.*)"/))
            var pwdDefaultEncryptSalt = guard(code.match(/var pwdDefaultEncryptSalt = "(.*)"/))
            let cookie = getGlobalData("nju_cookie")
            if (cookie instanceof Object) {

            }
            else {
                Taro.setStorageSync('nju_cookie', result.header['Set-Cookie'])
                setGlobalData("nju_cookie",cookie)
            }
            
            Taro.setStorageSync('njupass_data',{
                lt,
                dllt,
                execution,
                _eventId,
                rmShown,
            })
            Taro.setStorageSync('pwdDefaultEncryptSalt', pwdDefaultEncryptSalt)
            resolve()

        })
        
    },
    getCaptchaCode : function() {
        return new Promise(async function (resolve,reject) {
            var cookie = Taro.getStorageSync('nju_cookie')
            var res = await Taro.request({
                url: 'https://authserver.nju.edu.cn/authserver/captcha.html', 
                method: 'GET',
                responseType: 'arraybuffer',
                header: {
                    'Cookie':cookie,
                    'Content-Type': "image/jpeg"
                },       
            });
            if (res.statusCode == 200) {
                let captchaImg = "data:image/jpeg;base64," + Taro.arrayBufferToBase64(res.data)
                resolve(captchaImg)
            }
            else {
                reject(res)
            }
        })
    },
    needCaptcha : function(stuId) {
        return new Promise(async function (resolve,reject) {
            var cookie = Taro.getStorageSync('nju_cookie')
            var r = await Taro.request({
                url: 'https://authserver.nju.edu.cn/authserver/needCaptcha.html?username='+stuId, 
                header: {
                    'Cookie':cookie
                },
            });
            if (r.statusCode == 200) {
                resolve(r.data)
            }          
            else {
                reject(r)
            }
                
        })
        
    },
    encryptPwd : function(pwd,salt) {
        return encryptAES(pwd,salt)
    },
    checkIdentity : function({stuId,password,captchaResponse=""}) {
        return new Promise(async function (resolve,reject) {
            var data = Taro.getStorageSync('njupass_data')
            var cookie = Taro.getStorageSync('nju_cookie')
            var pwdDefaultEncryptSalt = Taro.getStorageSync('pwdDefaultEncryptSalt')
            data['username'] = stuId
            data['password'] = njupass.encryptPwd(password,pwdDefaultEncryptSalt) // 加密
            data['captchaResponse'] = captchaResponse
            const result = await Taro.request({
                url: 'https://authserver.nju.edu.cn/authserver/login', 
                method: 'POST',
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Origin': 'https://authserver.nju.edu.cn',
                    'Referer': 'https://authserver.nju.edu.cn/authserver/login',
                    'Cookie': cookie,
                },
                data:data
            });
            // wx.request 在底层自动完成了302重定向，无法获取到302的响应包
            // https://developers.weixin.qq.com/community/develop/doc/0000e034594dd042c469d77be51c00?highLine=302
            // if (result.statusCode == 302) {
            //     resolve({
            //         code:result.statusCode
            //     })
            // }
            // else {
            //     console.log
            //     reject({
            //         message:'验证失败',
            //         code:result.statusCode
            //     })
            // }

            njupass.needCaptcha(stuId).then((res) => {
                // 需要验证码说明上次登录失败
                if (res) {
                    reject({
                        message:'验证失败',
                        code:result.statusCode
                    })
                }
                else {
                    resolve()
                }
            })
        })
        
    }
}

export default njupass
