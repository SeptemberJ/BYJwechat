import regeneratorRuntime from './utils/regenerator-runtime/runtime-module.js';
//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //this.getUserInfo()
    wx.getSystemInfo({
      success: (res)=> {
        this.globalData.screenWidth = res.screenWidth
        this.globalData.screenHeight = res.screenHeight
      }
    })


    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     console.log(res)
    //   }
    // })
    // 获取用户信息
    
  },
  getUserInfo2: function () {
    return new Promise((resolve) => {
      console.log('hahah')
      this.globalData.nickName = 'liubai'
    });
  },
  getUserInfo: function(){
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              return new Promise((resolve) => {
                console.log(res)
                this.globalData.userInfo = res.userInfo
                this.globalData.nickName = res.userInfo.nickName
                resolve(res)
              });

              // console.log(res)
              // // 可以将 res 发送给后台解码出 unionId
              // this.globalData.userInfo = res.userInfo
              // this.globalData.nickName = res.userInfo.nickName

              // // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // // 所以此处加入 callback 以防止这种情况
              // if (this.userInfoReadyCallback) {
              //   this.userInfoReadyCallback(res)
              // }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    nickName:null,
    yulu_bg:'http://scimg.dameigong.cn/b/20180613/20180613224750_43525.jpg',
    yulu_content: '初入江湖初入江湖初入江湖初入江湖初入江湖初入江湖初入江湖初入江湖初入江湖初入江湖初入江湖初入',
    yulu_address: '江苏省南通市通州区XX路3888号',
    yulu_nickname: '@liubai',
    screenWidth:'',
    screenHeight:''

  }
})