// pages/water/index.js
const util = require('../../utils/util.js')
import h from '../../utils/url.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgpath_write_logo: h.imgNetSrc + 'write_logo.png',
    imgpath_bg_bottle: h.imgNetSrc + 'bg_bottle.png',
    imgpath_bottleBorder: h.imgNetSrc + 'bottleBorder.png',
    waterHeight: 0,
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var time = setInterval(function () {
      console.log('setInterval---')
      if (that.data.waterHeight <= 99) {
        let temp = that.data.waterHeight + 1
        that.setData({
          waterHeight: temp
        })
      } else {
        clearInterval(time);
      }
    },70)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})