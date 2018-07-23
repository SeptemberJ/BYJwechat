// pages/card/index.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgpath:''
  
  },
  onLoad: function (options) {
  
  },
  onReady: function (e) {
    var YuLu = app.globalData.yulu_content;
    var NickName = app.globalData.yulu_nickname;
    var Address = app.globalData.yulu_address;
    var BgImg = '../../images/ceshi.jpg'//;app.globalData.yulu_bg;
    var lineWidth_yulu = 0;
    var lineWidth_nickName = 0;
    var lineWidth_address = 0;
    var canvasWidth = app.globalData.screenWidth;//计算canvas的宽度
    var initHeight = 15;//绘制字体距离canvas顶部初始的高度
    var lastSubStrIndex_yulu = 0; //每次开始截取的字符串的索引
    var lastSubStrIndex_nickName = 0; //每次开始截取的字符串的索引
    var lastSubStrIndex_address = 0; //每次开始截取的字符串的索引
    var padding = 10;

    var ctx = wx.createCanvasContext('mycanvas');
    ctx.drawImage(BgImg, padding, padding * 2, canvasWidth - padding*2 ,400);
    //ctx.drawImage('../../images/bottle.jpg', 120, 320, 100, 100)
    ctx.font = "10px sans-serif";
    ctx.fillStyle = '#fff';

    // 绘制语录内容
    for (let i = 0; i < YuLu.length; i++) {
      lineWidth_yulu += ctx.measureText(YuLu[i]).width;
      if (lineWidth_yulu > parseInt(canvasWidth/2)) {
        ctx.fillText(YuLu.substring(lastSubStrIndex_yulu, i), parseInt(canvasWidth / 4), 50 + initHeight);//绘制截取部分
        initHeight += 15;//20为字体的高度
        lineWidth_yulu = 0;
        lastSubStrIndex_yulu = i;
      }
      if (i == YuLu.length - 1) {//绘制剩余部分
        ctx.fillText(YuLu.substring(lastSubStrIndex_yulu, i + 1), parseInt(canvasWidth / 4), 50 + initHeight);
      }
    }
    // 绘制微信昵称
    for (let i = 0; i < NickName.length; i++) {
      lineWidth_nickName += ctx.measureText(NickName[i]).width;
      if (lineWidth_nickName > parseInt(canvasWidth / 2)) {
        //ctx.font = "6px sans-serif";
        ctx.textAlign = "right"; 
        ctx.fillStyle = '#efefef';
        ctx.fillText(NickName.substring(lastSubStrIndex_nickName, i), parseInt(canvasWidth * 3 / 4), 75 + initHeight);//绘制截取部分
        initHeight += 15;//20为字体的高度
        lineWidth_nickName = 0;
        lastSubStrIndex_nickName = i;
      }
      if (i == NickName.length - 1) {//绘制剩余部分
        //ctx.font = "6px";
        ctx.textAlign = "right";
        ctx.fillStyle = '#efefef';
        ctx.fillText(NickName.substring(lastSubStrIndex_nickName, i + 1), parseInt(canvasWidth * 3 / 4), 75 + initHeight);
      }
    }

    // 绘制地址信息
    for (let i = 0; i < Address.length; i++) {
      lineWidth_address += ctx.measureText(Address[i]).width;
      if (lineWidth_address > parseInt(canvasWidth / 2)) {
        //ctx.font = "6px";
        ctx.textAlign = "right";
        ctx.fillStyle = '#efefef';
        ctx.fillText(Address.substring(lastSubStrIndex_address, i), parseInt(canvasWidth * 3 / 4), 90 + initHeight);//绘制截取部分
        initHeight += 15;//20为字体的高度
        lineWidth_address = 0;
        lastSubStrIndex_address = i;
      }
      if (i == Address.length - 1) {//绘制剩余部分
        //ctx.font = "6px";
        ctx.textAlign = "right";
        ctx.fillStyle = '#efefef';
        ctx.fillText(Address.substring(lastSubStrIndex_address, i + 1), parseInt(canvasWidth * 3 / 4), 90 + initHeight);
      }
    }


    ctx.draw()

    var that = this
    setTimeout(function () {
      wx.canvasToTempFilePath({
        // x: 100,
        // y: 200,
        // width: 50,
        // height: 50,
        // destWidth: 200,
        // destHeight: 300,
        canvasId: 'mycanvas',
        success: function (res) {
          //console.log(res.tempFilePath)
          var tempFilePath = res.tempFilePath;
          // wx.chooseImage({
          //   success: function (res) {
          //     console.log(res)
          //     var tempFilePaths = res.tempFilePaths
          //     wx.saveFile({
          //       tempFilePath: tempFilePath,
          //       success: function (res) {
          //         var savedFilePath = res.savedFilePath
          //         console.log(res)
          //         that.setData({
          //           imgpath: res.savedFilePath,
          //         });
          //         wx.showToast({
          //           title: '保存成功',
          //           icon: 'success',
          //           duration: 1500
          //         })
          //       }
          //     })
          //   }
          // })
          
          that.setData({
            imgpath: tempFilePath,
          });
        },
        fail: function (res) {
          console.log(res);
        }
      });
    }, 2000);
    // setTimeout(function () {
    //   wx.previewImage({
    //     current: that.data.imgpath, // 当前显示图片的http链接
    //     urls: [that.data.imgpath] // 需要预览的图片http链接列表
    //   })
    // }, 3000);
  },

  SeeImg: function () {
    wx.previewImage({
      current: this.data.imgpath, // 当前显示图片的http链接
      urls: [this.data.imgpath] // 需要预览的图片http链接列表
    })
  },
  saveImgToPhotosAlbumTap: function () {
    wx.downloadFile({
      url: this.data.imgpath,
      success: function (res) {
        console.log(res)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (res) {
            console.log(res)
          },
          fail: function (res) {
            console.log(res)
            console.log('fail')
          }
        })
      },
      fail: function () {
        console.log('fail')
      }
    })
  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})