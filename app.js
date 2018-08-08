import regeneratorRuntime from './utils/regenerator-runtime/runtime-module.js';
import h from '/utils/url.js'
var util = require('./utils/util.js')
var requestPromisified = util.wxPromisify(wx.request)
//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.getUserInfo()
    wx.getSystemInfo({
      success: (res)=> {
        this.globalData.screenWidth = res.screenWidth
        this.globalData.screenHeight = res.screenHeight
      }
    })

    // wx.login({
    //   success: function () {
    //     wx.getUserInfo({
    //       success: function (res) {
    //         console.log( "*******************")
    //         console.log(res)
    //         //that.globalData.userInfo = res.userInfo
    //         //that.globalData.code = code
    //         //Login(code, encryptedData, iv);
    //         //typeof cb == "function" && cb(that.globalData.userInfo)
    //       }
    //     })
    //   },
    //   fali: function (res) {
    //     console.log(res)
    //   }
    // })
    // wx.openSetting({
    //   success: (res) => {
    //     res.authSetting = {
    //       "scope.userInfo": true,
    //        "scope.userLocation": true,
    //        "writePhotosAlbum": true,
    //     }
    //   }
    // })


    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     console.log(res)
    //   }
    // })
    
    // 获取用户信息

    wx.login({
      success: (res)=> {
        var _this = this
        let Code = res.code
        wx.getUserInfo({
          success: (res) => {
            console.log(res)
            this.globalData.avatarUrl = res.userInfo.avatarUrl
            this.globalData.yulu_nickname = '@' + res.userInfo.nickName
            this.Login(Code, res.userInfo.nickName, res.userInfo.avatarUrl, _this);
          }
        })
      }
    })

    
  },

  getUserInfo: function () {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: (res) => {
              console.log(res)
              this.globalData.nickName = res.userInfo.nickName
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    //nickName:null,
    openid: 'oD9Ge4g7wSeq6ZEamF04dUrUjWYU',   //
    avatarUrl: null,
    yulu_bg:'http://scimg.dameigong.cn/b/20180613/20180613224750_43525.jpg',
    yulu_content: '初入江湖初入江湖初入江湖初入江湖初入江湖初入江湖初入江湖初入江湖初入江湖初入江湖初入江湖初入',
    yulu_address: '江苏省南通市通州区XX路3888号',
    yulu_nickname: '',
    screenWidth:'',
    screenHeight:''
  },
  Login(code, realname, head_img, _this) {
    requestPromisified({
      url: h.main + '/userInsertWsc',
      data: {
        code: code,
        realname: realname,
        head_img: head_img
      },
      method: 'GET',
    }).then((res) => {
      console.log(res)
      _this.globalData.openid = res.data.oppen_id
    }).catch((res) => {
      console.log(res)
      wx.hideLoading()
      wx.showToast({
        image: './images/icon/attention.png',
        title: '服务器繁忙！'
      })
    });
  }
})