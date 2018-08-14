//index.js
import h from '../../utils/url.js'
//获取应用实例
const app = getApp()

Page({
  data: {
    imgpath: h.imgNetSrc + 'bg.png',// '../../images/bg.png', //
    gifpath: h.imgNetSrc + 'pifeng.gif',
    motto: 'Hello World',
    IfShowArrow: false,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    lastX: 0,          //滑动开始x轴位置
    lastY: 0,          //滑动开始y轴位置
    text: "没有滑动",
    currentGesture: 0, //标识手势

  },

  onShow: function(){
    setTimeout(()=>{
      this.setData({
        IfShowArrow: true
      })
    },4000)
  },
  handletap(){
    console.log('pppppp')
  },
  //滑动移动事件
  handletouchmove: function(event) {
     var currentX = event.touches[0].pageX
     var currentY = event.touches[0].pageY
     var tx = currentX - this.data.lastX
     var ty = currentY - this.data.lastY
     var text = ""
     //左右方向滑动
     if (Math.abs(tx) > Math.abs(ty)) {
       if (tx < 0){
         text = "向左滑动"
        wx.redirectTo({
          url: '../index/index',
        })
       }
       else if (tx > 0)
         text = "向右滑动"
     }
     //上下方向滑动
     else {
       if(ty < 0)
         {
         text = "向上滑动"
         wx.redirectTo({
           url: '../index/index',
         })
         }
       else if(ty > 0)
         text = "向下滑动"
     }

     //将当前坐标进行保存以进行下一次计算
      this.data.lastX = currentX
      this.data.lastY = currentY
      this.setData({
        text: text,
      });
  },

   //滑动开始事件
   handletouchtart: function (event) {
     this.data.lastX = event.touches[0].pageX
     this.data.lastY = event.touches[0].pageY
  },
   //滑动结束事件
  handletouchend: function (event) {
     this.data.currentGesture = 0;
     this.setData({
       text: "滑动结束",
     });
  },


  // onLoad: function () {
  //   if (app.globalData.userInfo) {
  //     this.setData({
  //       userInfo: app.globalData.userInfo,
  //       hasUserInfo: true
  //     })
  //   } else if (this.data.canIUse) {
  //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //     // 所以此处加入 callback 以防止这种情况
  //     app.userInfoReadyCallback = res => {
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   } else {
  //     // 在没有 open-type=getUserInfo 版本的兼容处理
  //     wx.getUserInfo({
  //       success: res => {
  //         app.globalData.userInfo = res.userInfo
  //         this.setData({
  //           userInfo: res.userInfo,
  //           hasUserInfo: true
  //         })
  //       }
  //     })
  //   }
  // },
  // getUserInfo: function (e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // }
})
