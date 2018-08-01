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
    wx.getSetting({
      success(res) {
        console.log(res)
        if (!res.authSetting['scope.writePhotosAlbum']) {
          console.log('false')
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: (res)=> {
              console.log('授权成功')
            },
            fali: (res) => {
              console.log('授权失败')
            }
          })
        }
      }
    })
  
  },
  onReady: function (e) {
    this.setData({
      WidthWrap: app.globalData.screenWidth - 50,
      HeightWrap: app.globalData.screenHeight - 180,
      Width: app.globalData.screenWidth - 50,
      Height: app.globalData.screenHeight - 180,
    })
    var _this = this;
    var canvasWidth = app.globalData.screenWidth - 50;//计算canvas的宽度
    var BubbleFrameWidth = canvasWidth * (6 / 8);
    var PictureHeight = app.globalData.screenHeight - 180 - 60;
    var BubbleFrameHeight = 100;
    var LogoHeight = 30;
    var Padding = canvasWidth * (1 / 8);
    var _Padding = 20;
    var BottleHeight = PictureHeight - BubbleFrameHeight - LogoHeight - Padding * 3;
    console.log(BottleHeight)
    var LineWidth = 1;
    var BubbleR = 15;
    
    var BgImg = '../../images/bg_write.png'//;app.globalData.yulu_bg;
    var ContentWidth = BubbleFrameWidth - _Padding*2;
    var initHeight = 15;//绘制字体距离canvas顶部初始的高度
    var ImgPadding = 10;
    var YuLu = app.globalData.yulu_content;
    var NickName = app.globalData.yulu_nickname;
    var Address = app.globalData.yulu_address;

    var ctx = wx.createCanvasContext('mycanvas');


    ctx.drawImage('../../images/BgCard1.png', 0, 0, this.data.Width, this.data.Height);
    ctx.drawImage(BgImg, ImgPadding * 2, ImgPadding * 2, this.data.Width - ImgPadding * 4, PictureHeight);

    // ctx.drawImage('../../images/bottle.png', Padding, BubbleFrameHeight + Padding * 2, canvasWidth * (3 / 4), BottleHeight)
    // ctx.drawImage('../../images/write_logo.png', Padding, BubbleFrameHeight + Padding * 2.5 + BottleHeight, canvasWidth * (3 / 4), LogoHeight)

    ctx.drawImage('../../images/bottle.png', Padding+30, BubbleFrameHeight + Padding * 2, 150, 142)
    ctx.drawImage('../../images/write_logo.png', Padding + 50, BubbleFrameHeight + Padding * 2 + 142, 100, 17)
    

   
    ctx.drawImage('../../images/QRcode.png', this.data.Width - ImgPadding * 2 - 100, ImgPadding * 2 + PictureHeight, 100, 36);

    
    //yulu

    this.DrawYuLu(ctx, ContentWidth, Padding + _Padding, YuLu, 50, 'start', initHeight);
    this.DrawYuLu(ctx, ContentWidth, Padding + BubbleFrameWidth - _Padding, NickName, 90, 'right', initHeight);
    this.DrawYuLu(ctx, ContentWidth, Padding + BubbleFrameWidth - _Padding, Address, 105, 'right', initHeight);
    //气泡
    this.DrawBubble(ctx, LineWidth, BubbleFrameWidth, BubbleFrameHeight, BubbleR,Padding);
    
    ctx.draw()
  },

  SeeImg: function () {
    wx.previewImage({
      current: this.data.imgpath, // 当前显示图片的http链接
      urls: [this.data.imgpath] // 需要预览的图片http链接列表
    })
  },
  //保存语录
  SaveYulu: function () {
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success: (res)=> {
        var tempFilePath = res.tempFilePath;
        wx.saveImageToPhotosAlbum({
          filePath: tempFilePath,
          success: (res) => {
            console.log('saveImageToPhotosAlbum success')
            console.log(res)
            wx.showToast({
              title: '保存成功\r\n保存成功!',
              icon: 'success',
              duration: 1500
            })
          },
          fail: (res) => {
            console.log(res)
            console.log('saveImageToPhotosAlbum fail')
          }
        })
      },
      fail: (res) => {
        console.log(res);
      }
    });
  },
  //再写一条
  WriteAgin: function(){
    wx.navigateTo({
      url: '../write/index',
    })

  },
  //进入商城
  GoToShop: function () {
    if (wx.navigateToMiniProgram) {
      wx.navigateToMiniProgram({
        appId: 'wx6a30d2c0aea74559',
        path: '',
        extraData: {
        },
        envVersion: 'trial',
        success(res) {
          // 打开成功
          console.log(res)
        },
        fali(res) {
          // 打开失败
          console.log(res)
        },
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  //语录内容
  DrawYuLu: function (ctx, LimitWidth, Padding, Content, Distance, Right, InitHeight) {
    ctx.font = "10px sans-serif";
    ctx.fillStyle = '#fff';
    ctx.textAlign = Right;
    let lineWidth = 0;
    let lastSubStrIndex = 0; //每次开始截取的字符串的索引
    // 绘制内容
    for(let i = 0; i <Content.length; i++) {
      lineWidth += ctx.measureText(Content[i]).width;
      if (lineWidth > LimitWidth) {
        ctx.fillText(Content.substring(lastSubStrIndex, i), Padding, Distance + InitHeight);//绘制截取部分
        InitHeight += 15;//20为字体的高度
        lineWidth = 0;
        lastSubStrIndex = i;
      }
      if (i == Content.length - 1) {//绘制剩余部分
        ctx.fillText(Content.substring(lastSubStrIndex, i + 1), Padding, Distance + InitHeight);
      }
    }
  },
  //气泡框
  DrawBubble: function (ctx, LineWidth, w, h, r, p){
    ctx.setLineWidth(LineWidth);
    ctx.setStrokeStyle("#fff");
    ctx.beginPath();
    ctx.moveTo(p + r, p);
    ctx.arcTo(p + w, p, p + w, p + r, r);
    ctx.lineTo(p + w, p + h - r);
    ctx.arcTo(p + w, p + h, p + w - r, p + h, r);
    //尖角start
    ctx.moveTo(p + w - r, p + h);
    ctx.lineTo(p + w * (3 / 4), p + h);
    ctx.lineTo(p + w * (3 / 4) - 20, p + h + 20);
    ctx.lineTo(p + w * (3 / 4) - 10, p + h);
    //尖角end
    ctx.lineTo(p + r, p + h);
    ctx.arcTo(p, p + h, p, p + h - r, r);
    ctx.lineTo(p, p + r);
    ctx.arcTo(p, p, p + r, p, r);
    ctx.stroke();
  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})