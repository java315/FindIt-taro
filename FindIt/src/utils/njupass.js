import request from "./request";
import Taro from '@tarojs/taro'
const njupass = {
    getCookie : function() {
        var result = await Taro.request({
            url: 'https://authserver.nju.edu.cn/authserver/login',
            method: 'GET',
            header:{
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
        // console.log(result)
        if (result.statusCode != 200) {
            
        }
        
        var code = result.data
        var lt = code.match(/<input type="hidden" name="lt" value="(.*)"\/>/g)[0]
        var dllt = code.match(/<input type="hidden" name="dllt" value="(.*)"\/>/g)[0]
        var execution = code.match(/<input type="hidden" name="execution" value="(.*)"\/>/g)[0]
        var _eventId = code.match(/<input type="hidden" name="_eventId" value="(.*)"\/>/g)[0]
        var rmShown = code.match(/<input type="hidden" name="rmShown" value="(.*)"/g)[0]
        var pwdDefaultEncryptSalt = code.match(/<input type="hidden" id="pwdDefaultEncryptSalt" value="(.*)"/g)[0]
        Taro.setStorageSync('nju_cookie', result.header['Set-Cookie'])
        Taro.setStorageSync('njupass_data',{
            lt,
            dllt,
            execution,
            _eventId,
            rmShown,
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit 537.36 (KHTML, like Gecko) Chrome"
        })
    },
    getCaptchaCode : function() {
        var cookie = Taro.getStorageSync('nju_cookie')
        var res = await Taro.request({
            url: 'https://authserver.nju.edu.cn/authserver/captcha.html', 
            method: 'GET',
            header: {
                'Cookie':cookie
            },       
        });
        // TODO
    },
    needCaptcha : function(stuId) {
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
        if (r.text.includes('true'))
            return true
        else 
            return false
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
