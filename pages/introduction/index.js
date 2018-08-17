import h from '../../utils/url.js'
//获取应用实例
const app = getApp()
Page({
  data: {
    ifChecked: false,
    bgImgPathCheck: h.imgNetSrc + 'introduction.jpg',
    bgImgPathChecked: h.imgNetSrc + 'introduction_checked.jpg',
    bottom: 20,
    bottomBt: 0
  },

  onLoad: function (options) {
    if (app.globalData.screenHeight >= 812) {
      this.setData({
        bgImgPathCheck: h.imgNetSrc + 'introduction_X.png',
        bgImgPathChecked: h.imgNetSrc + 'introduction_checked_X.png',
        bottom:30,
        bottomBt: 10
      })
    }
  
  },
  onShow: function(){
    this.setData({
      ifChecked: false
    })
  },
  Agree: function(){
    console.log('hahha')
    this.setData({
      ifChecked: !this.data.ifChecked
    })
  },
  ToWrite: function(){
    if (this.data.ifChecked){
      wx.navigateTo({
        url: '../write/index',
      })
    }else{
      wx.showToast({
        title: '请先同意协议！',
        icon: '',
        image: '../../images/icons/attention.png',
      })
    }
    
  }
})