import request from "./request";
import Taro from '@tarojs/taro'
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
            console.log(result)
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
            var pwdDefaultEncryptSalt = guard(code.match(/<input type="hidden" id="pwdDefaultEncryptSalt" value="(.*)"/))
            Taro.setStorageSync('nju_cookie', result.header['Set-Cookie'])
            Taro.setStorageSync('njupass_data',{
                lt,
                dllt,
                execution,
                _eventId,
                rmShown,
                pwdDefaultEncryptSalt,
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit 537.36 (KHTML, like Gecko) Chrome"
            })
            resolve()

        })
        
    },
    getCaptchaCode : function() {
        return new Promise(async function (resolve,reject) {
            var cookie = Taro.getStorageSync('nju_cookie')
            var res = await Taro.request({
                url: 'https://authserver.nju.edu.cn/authserver/captcha.html', 
                method: 'GET',
                header: {
                    'Cookie':cookie
                },       
            });
            if (res.statusCode == 200) {
                resolve(res)
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
                url: 'https://authserver.nju.edu.cn/authserver/needCaptcha.html', 
                data: {
                    username: stuId
                },
                header: {
                    'Cookie':cookie
                },
            });
            // console.log(r)
            if (r.statusCode == 200) {
                resolve(r.data)
            }          
            else {
                reject(r)
            }
                
        })
        
    },
    checkIdentity : function({stuId,password,capychaResponse=""}) {
        return new Promise(async function (resolve,reject) {
            var data = Taro.getStorageSync('njupass_data')
            var cookie = Taro.getStorageSync('nju_cookie')
            data['username'] = stuId
            data['password'] = (password)
            const result = await Taro.request({
                url: 'https://authserver.nju.edu.cn/authserver/login', 
                method: 'POST',
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cookie': cookie,
                },
            });
            if (result.statusCode == 302) {
                resolve({
                    code:result.statusCode
                })
            }
            else {
                reject({
                    message:'验证失败',
                    code:result.statusCode
                })
            }
        })
        
    }
}

export default njupass
