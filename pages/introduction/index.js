import h from '../../utils/url.js'
Page({
  data: {
    ifChecked: false,
    bgImgPathCheck: h.imgNetSrc + 'introduction.jpg',
    bgImgPathChecked: h.imgNetSrc + 'introduction_checked.jpg',
  },

  onLoad: function (options) {
  
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