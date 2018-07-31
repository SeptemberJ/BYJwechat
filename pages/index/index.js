//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: ['../../images/index_Bottle.png', '../../images/index_Bottle.png','../../images/index_Bottle.png'],
    indicatorDots: false,
    autoplay: false,
    circular: false,
    interval: 5000,
    duration: 1000
  },
  //事件处理函数
  ToWrite: function() {
    wx.navigateTo({
      url: '../write/index'
    })
  },
  Animationfinish: function(){
    //开始draw文字
    console.log('end----------------')
  },
  onLoad: function () {
  },
})
