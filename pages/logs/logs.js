//logs.js
import h from '../../utils/url.js'
var util = require('../../utils/util.js')
var requestPromisified = util.wxPromisify(wx.request)
const app = getApp()
Page({
  data: {
    ifShowBt: false
  },
  onLoad: function () {
    wx.login({
      success: (res) => {
        console.log(res)
        let Code = res.code
        wx.getUserInfo({
          success: (res)=> {
            this.setData({
              ifShowBt: true
            })
            console.log('用户信息获取成功！')
            console.log(res)
            app.globalData.avatarUrl = res.userInfo.avatarUrl
            app.globalData.yulu_nickname = '@' + res.userInfo.nickName
            console.log(app.globalData.yulu_nickname)
            //this.Login(Code, res.userInfo.nickName, res.userInfo.avatarUrl, this);
          },
          fail: (res) => {
            console.log("用户信息获取失败！")
            this.setData({
              ifShowBt: true
            })
          }
        })
      },
      fali: (res) => {
        console.log(res)
      }
    })
  },
  bindgetuserinfo: function (e) {
    var that = this;
    if (e.detail.userInfo) {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      wx.login({
        success: res => {
          console.log(e.detail)
          app.globalData.avatarUrl = e.detail.userInfo.avatarUrl
          app.globalData.yulu_nickname = '@' + e.detail.userInfo.nickName
          this.Login(res.code, e.detail.userInfo.nickName, e.detail.userInfo.avatarUrl, this)
        }
      })
    } else {
      console.log(333, '执行到这里，说明拒绝了授权')
      wx.showToast({
        title: "为了您更好的体验,请先同意授权",
        icon: 'none',
        duration: 2000
      });
    }
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
      app.globalData.openid = res.data.oppen_id
      app.globalData.avatarUrl = head_img
      app.globalData.yulu_nickname = realname
      wx.redirectTo({
        url: '../loading/index',
      })
    }).catch((res) => {
      console.log(res)
      wx.hideLoading()
      wx.showToast({
        image: '../../images/icons/attention.png',
        title: '服务器繁忙！'
      })
    });
  }
})
