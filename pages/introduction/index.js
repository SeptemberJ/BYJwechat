// pages/introduction/index.js
Page({
  data: {
    ifChecked: false,
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