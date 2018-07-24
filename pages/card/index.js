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
    
    var BgImg = '../../images/ceshi.jpg'//;app.globalData.yulu_bg;
    var ContentWidth = BubbleFrameWidth - _Padding*2;
    var initHeight = 15;//绘制字体距离canvas顶部初始的高度
    var ImgPadding = 10;
    var YuLu = app.globalData.yulu_content;
    var NickName = app.globalData.yulu_nickname;
    var Address = app.globalData.yulu_address;

    var ctx = wx.createCanvasContext('mycanvas');


    ctx.drawImage('../../images/BgCard.png', 0, 0, this.data.Width, this.data.Height);
    ctx.drawImage(BgImg, ImgPadding, ImgPadding * 2, this.data.Width - ImgPadding * 2, PictureHeight);

    ctx.drawImage('../../images/bottle.jpg', Padding, BubbleFrameHeight + Padding * 2, canvasWidth * (3 / 4), BottleHeight)
    ctx.drawImage('../../images/bottle.jpg', Padding, BubbleFrameHeight + Padding * 2.5 + BottleHeight, canvasWidth * (3 / 4), LogoHeight)

    //ctx.drawImage('../../images/bottle.jpg', canvasWidth - ImgPadding  - 200, PictureHeight + Padding, 200, 50)

    
    //yulu

    this.DrawYuLu(ctx, ContentWidth, Padding + _Padding, YuLu, 50, 'start', initHeight);
    this.DrawYuLu(ctx, ContentWidth, Padding + BubbleFrameWidth - _Padding, NickName, 90, 'right', initHeight);
    this.DrawYuLu(ctx, ContentWidth, Padding + BubbleFrameWidth - _Padding, Address, 105, 'right', initHeight);
    //气泡
    this.DrawBubble(ctx, LineWidth, BubbleFrameWidth, BubbleFrameHeight, BubbleR,Padding);
    
    ctx.draw()

    
    // setTimeout(function () {
    //   wx.canvasToTempFilePath({
    //     canvasId: 'mycanvas',
    //     success: function (res) {
    //       var tempFilePath = res.tempFilePath;
    //       _this.setData({
    //         imgpath: tempFilePath,
    //       });
    //     },
    //     fail: function (res) {
    //       console.log(res);
    //     }
    //   });
    // }, 2000);
  },

  SeeImg: function () {
    wx.previewImage({
      current: this.data.imgpath, // 当前显示图片的http链接
      urls: [this.data.imgpath] // 需要预览的图片http链接列表
    })
  },
  saveImgToPhotosAlbumTap: function () {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.imgpath,
      success: (res)=> {
        console.log('saveImageToPhotosAlbum success')
        console.log(res)
      },
      fail: (res) => {
        console.log(res)
        console.log('saveImageToPhotosAlbum fail')
      }
    })
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