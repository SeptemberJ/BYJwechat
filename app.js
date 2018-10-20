import regeneratorRuntime from './utils/regenerator-runtime/runtime-module.js';
import h from '/utils/url.js'
var util = require('./utils/util.js')
var requestPromisified = util.wxPromisify(wx.request)

//app.js
App({
  onLaunch: function () {
    
    //this.getUserInfo()
    wx.getSystemInfo({
      success: (res)=> {
        this.globalData.screenWidth = res.screenWidth
        this.globalData.screenHeight = res.screenHeight
        this.globalData.pixelRatio = res.pixelRatio
      }
    })
  },

  getUserInfo: function (Code) {
    wx.getSetting({
      success: res => {
        console.log(res)

      res.authSetting = {
        "scope.userInfo": true,
      "scope.userLocation": true
      }

        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: (res) => {
              console.log(res)
              this.globalData.avatarUrl = res.userInfo.avatarUrl
              this.globalData.yulu_nickname = '@' + res.userInfo.nickName
              this.Login(Code, res.userInfo.nickName, res.userInfo.avatarUrl, _this);
            }
          })
        }else{

        }
      },
    })
  },
  globalData: {
    userInfo: null,
    //nickName:null,
    openid: 'oD9Ge4g7wSeq6ZEamF04dUrUjWYU',
    avatarUrl: null,
    yulu_bg_index: 0,
    selfYuLu: false,
    yuluIdx: 0,
    IfUploadBg: false,
    // yulu_bg: '../../images/write_bg/1.png',
    // yulu_content: '身在江湖，身不由己',
    // yulu_address: '江苏省海门市',
    // yulu_nickname: '@liubai',
    yulu_bg: '',//'../../images/write_bg/1.png',
    yulu_content: '',//'宁可相忘于江湖,宁可相忘于江湖,宁可相忘于江湖。',
    yulu_address: '',//'江苏省海门市',
    yulu_nickname: '',//'@liubai',
    screenWidth:'',
    screenHeight:'',
    pixelRatio:1,
    imgInfo_width: '',
    imgInfo_height: '',
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
        image: './images/icons/attention.png',
        title: '服务器繁忙！'
      })
    });
  }
})