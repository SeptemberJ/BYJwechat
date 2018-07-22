import h from '../../utils/url.js'
var util = require('../../utils/util.js')
var MD5 = require('../../utils/md5.js')
var requestPromisified = util.wxPromisify(wx.request)
//获取应用实例
const app = getApp()

Page({
  data: {
    User_Phone:null,
    User_Psd:null,
  },
  onLoad: (options)=> {
    
  },
  // 注册
  GoSign(){
    wx.navigateTo({
      url: '../Sign/index',
    })
  },
  //手机号
  ChangePhone(e){
    this.setData({
      User_Phone: e.detail.value
    })
  },
  //密码
  ChangePsd(e){
    this.setData({
      User_Psd: e.detail.value
    })
  },
  //登录
  LoginIn(){
    wx.switchTab({
      url: '../Index/index',
    })
  },
  GetLogin() {
    requestPromisified({
      url: h.main + '/updateweight',
      data: {
        weights: DATA
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {
      //   'content-type': 'application/x-www-form-urlencoded',
      //   'Accept': 'application/json'
      // }, // 设置请求的 header
    }).then((res) => {
      switch (res.data.result) {
        case 1:
          wx.showToast({
            title: '提交成功！',
            icon: 'success',
            duration: 1500
          })
          if (this.data.Type == '0') {
            wx.navigateTo({
              url: '../weight/index/index'
            })
          } else {
            wx.navigateTo({
              url: '../diet/index/index'
            })
          }
          break
        case 0:
          wx.showToast({
            image: '../../images/attention.png',
            title: '提交失败!'
          });
          break
        default:
          wx.showToast({
            image: '../../images/attention.png',
            title: '服务器繁忙！'
          });
      }
    }).catch((res) => {
      wx.showToast({
        image: '../../images/icon/attention.png',
        title: '服务器繁忙！'
      });
    })
  }
})

