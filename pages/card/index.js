import h from '../../utils/url.js'
var util = require('../../utils/util.js')
var requestPromisified = util.wxPromisify(wx.request)
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImgPath1: h.imgNetSrc + 'BgCard1.png',
    bgImgPath2: h.imgNetSrc + 'bgCard_bg.png',
    imgpath:'',
    FontSize:10,
    FontSizeS: 10,
    LineHeight:15,
    ReadyShow:true
  
  },
  onLoad: function (options) {
    setTimeout(()=>{
      console.log('setTimeout------=======================')
      this.SaveYulu()
    }, 2000)

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
    console.log('app.globalData.yulu_bg-------------------')
    console.log(app.globalData.yulu_bg)
   
    this.setData({
      WidthWrap: app.globalData.screenWidth - 50,
      HeightWrap: app.globalData.screenHeight * 0.7,//app.globalData.screenHeight - 180,
      Width: app.globalData.screenWidth - 50,
      Height: app.globalData.screenHeight*0.7,//app.globalData.screenHeight - 180,
      FontSize: this.BackFontSize(),//app.globalData.screenWidth>=768?20:10,
      LineHeight: this.BackFontSize(),//app.globalData.screenWidth >= 768 ? 30 : 15,
    })




    var _this = this;
    var canvasWidth = app.globalData.screenWidth - 50;//计算canvas的宽度
    var BubbleFrameWidth = canvasWidth * (6 / 8);
    var PictureHeight = this.data.Height - this.data.Height * 0.13;//app.globalData.screenHeight - 180 - 60;
    var BubbleFrameHeight = PictureHeight/3; //100;
    var LogoHeight = 30;
    var Padding = canvasWidth * (1 / 8);
    var _Padding = 20;
    var BottleHeight = PictureHeight / 3;  //PictureHeight - BubbleFrameHeight - LogoHeight - Padding * 3;
    console.log(BottleHeight)
    var LineWidth = 1;
    var BubbleR = 15;
    
    var BgImg = app.globalData.yulu_bg;//'../../images/bg_write.png';
    var ContentWidth = BubbleFrameWidth - _Padding*2;
    var initHeight = 30;//绘制字体距离canvas顶部初始的高度
    var ImgPadding = 10;
    var YuLu = app.globalData.yulu_content;
    var NickName = app.globalData.yulu_nickname;
    var Address = app.globalData.yulu_address;

    var ctx = wx.createCanvasContext('mycanvas');


    ctx.drawImage('../../images/BgCard1.png', 0, 0, this.data.Width, this.data.Height);
    // ctx.drawImage(BgImg, ImgPadding * 1, ImgPadding * 1, this.data.Width - ImgPadding * 2, PictureHeight);
    var raito = this.data.Width / this.data.Height
    ctx.drawImage(BgImg, ImgPadding * 1, ImgPadding * 1, raito * PictureHeight, PictureHeight);


    // ctx.drawImage(h.imgNetSrc + 'bottle.png', (this.data.Width - BottleHeight)/2, BubbleFrameHeight + Padding * 2, BottleHeight, BottleHeight)
    // ctx.drawImage(h.imgNetSrc + 'write_logo_1.png', (this.data.Width - 38 - 84) / 2, PictureHeight - 30, 38, 20)
    // ctx.drawImage(h.imgNetSrc + 'write_logo_2.png', (this.data.Width - 38 - 84) / 2 + 38, PictureHeight - 30, 84, 27)

    ctx.drawImage('../../images/bottle.png', (this.data.Width - BottleHeight) / 2, BubbleFrameHeight + Padding * 2, BottleHeight, BottleHeight)
    ctx.drawImage('../../images/write_logo_1.png', (this.data.Width - 38 - 84) / 2, PictureHeight - 30, 38, 20)
    ctx.drawImage('../../images/write_logo_2.png', (this.data.Width - 38 - 84) / 2 + 38, PictureHeight - 30, 84, 27)





    //ctx.drawImage('../../images/write_logo.png', (this.data.Width - 100) / 2, PictureHeight - 40, this.data.Width, 17)

    // ctx.drawImage('../../images/bottle.png', Padding+30, BubbleFrameHeight + Padding * 2, 150, 142)
    // ctx.drawImage('../../images/write_logo.png', Padding + 50, BubbleFrameHeight + Padding * 2 + 142, 100, 17)
    

   
    //ctx.drawImage('../../images/QRcode.png', this.data.Width - ImgPadding * 2 - 132, PictureHeight + 17, 130, 40);

    
    //yulu

    this.DrawYuLu(0,ctx, ContentWidth, Padding + _Padding, YuLu, Padding, 'start', initHeight);
    this.DrawYuLu(1, ctx, ContentWidth, Padding + BubbleFrameWidth - _Padding, NickName, BubbleFrameHeight - 15, 'right', initHeight);
    this.DrawYuLu(2,ctx, ContentWidth, Padding + BubbleFrameWidth - _Padding, Address, BubbleFrameHeight, 'right', initHeight);

    // this.DrawYuLu(0, ctx, ContentWidth, Padding + _Padding, YuLu, Padding, 'start', initHeight);
    // this.DrawYuLu(1, ctx, ContentWidth, Padding + BubbleFrameWidth - _Padding, NickName, BubbleFrameHeight - 30, 'right', initHeight);
    // this.DrawYuLu(2, ctx, ContentWidth, Padding + BubbleFrameWidth - _Padding, Address, BubbleFrameHeight, 'right', initHeight);
    
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
  //保存至相册
  //保存语录
  SaveToAlbum: function () {
    //this.SaveYulu()
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success: (res) => {
        var tempFilePath = res.tempFilePath;
        wx.saveImageToPhotosAlbum({
          filePath: tempFilePath,
          success: (res) => {
            console.log('saveImageToPhotosAlbum success')
            console.log(res)
            wx.showToast({
              title: '保存成功!',
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
  //保存语录
  SaveYulu: function () {
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success: (res) => {
        console.log(res)
        var tempFilePath = res.tempFilePath;
        wx.uploadFile({
          url: h.main + '/uploadimg',
          filePath: tempFilePath,
          name: 'file',
          formData: {
          },
          header: {
            'content-type': 'multipart/form-data',
          },
          success: (res) => {
            console.log('图片上传backInfo-----')
            let result = JSON.parse(res.data)
            if (result.code == 0){
              this.SaveYuluContent(result.fileName)
            }else{
              wx.showToast({
                title: '发布失败!',
                image: '../../image/icons/attention.png'
              })
            }
          },
          fail: (res) => {
            wx.hideLoading()
            console.log('图片上传失败backInfo-----')
            console.log(res)
          },
          complete: (res) => {
          }
        })
      },
      fail: (res) => {
        wx.hideLoading()
        console.log(res);
      }
    });
      
  },
  SaveYulu0: function () {
    wx.showLoading({
      title: '加载中...',
    })
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success: (res) => {
        console.log(res)
        var tempFilePath = res.tempFilePath;
        wx.uploadFile({
          url: h.main + '/uploadimg',
          filePath: tempFilePath,
          name: 'file',
          formData: {
          },
          header: {
            'content-type': 'multipart/form-data',
          },
          success: (res) => {
            console.log('图片上传backInfo-----')
            let result = JSON.parse(res.data)
            if (result.code == 0) {
              this.SaveYuluContent(result.fileName)
            } else {
              wx.showToast({
                title: '保存失败!',
                image: '../../image/icons/attention.png'
              })
            }
          },
          fail: (res) => {
            wx.hideLoading()
            console.log('图片上传失败backInfo-----')
            console.log(res)
          },
          complete: (res) => {
          }
        })
      },
      fail: (res) => {
        wx.hideLoading()
        console.log(res);
      }
    });

  },
  SaveYuluContent: function (ServerImgUrl) {
    console.log('ServerImgUrl--------------')
    console.log(ServerImgUrl)
    requestPromisified({
      url: h.main + '/addYulu',
      data: {
        yulu: app.globalData.yulu_content,
        faddress: app.globalData.yulu_address,
        wxname: app.globalData.yulu_nickname,
        openid: app.globalData.openid,
        wxpic: app.globalData.avatarUrl,    //头像
        fpic: ServerImgUrl     //生成的图片
      },
      method: 'POST',
    }).then((res) => {
      switch(res.data.result){
        case '2':
          wx.hideLoading()
          wx.showToast({
            title: '发布成功!',
            icon: 'success'
          })
        break
        default:
          wx.hideLoading()
          wx.showToast({
            image: '../../images/icons/attention.png',
            title: '发布失败！'
          })
      }
    }).catch((res) => {
      wx.hideLoading()
      console.log(res)
      wx.showToast({
        image: '../../images/icons/attention.png',
        title: '服务器繁忙！'
      })
    });

    // wx.saveImageToPhotosAlbum({
    //   filePath: tempFilePath,
    //   success: (res) => {
    //     console.log('saveImageToPhotosAlbum success')
    //     console.log(res)
    //     wx.showToast({
    //       title: '保存成功\r\n保存成功!',
    //       icon: 'success',
    //       duration: 1500
    //     })
    //   },
    //   fail: (res) => {
    //     console.log(res)
    //     console.log('saveImageToPhotosAlbum fail')
    //   }
    // })
  },
  //再写一条
  WriteAgin: function(){
    wx.navigateTo({
      url: '../write/index',
    })

  },
  urlTobase64(url) {
    wx.request({
      url: url,
      responseType: 'arraybuffer', //最关键的参数，设置返回的数据格式为arraybuffer
      success: res => {
        console.log(res)
        let base64 = wx.arrayBufferToBase64(res); //把arraybuffer转成base64
        console.log('base64')
        console.log(wx.arrayBufferToBase64(res))
        base64 　= 'data:image/jpeg;base64,' + base64　//不加上这串字符，在页面无法显示的哦
        console.log(base64)　//打印出base64字符串，可复制到网页校验一下是否是你选择的原图片呢
      }
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
  DrawYuLu: function (type,ctx, LimitWidth, Padding, Content, Distance, Right, InitHeight) {
    ctx.font = (type == 0) ? this.data.FontSize + "px 宋体" : "10px 宋体";
    //ctx.font = "10px 微软雅黑";
    ctx.fillStyle = '#fff';
    ctx.textAlign = Right;
    let lineWidth = 0;
    let lastSubStrIndex = 0; //每次开始截取的字符串的索引
    // 绘制内容
    for(let i = 0; i <Content.length; i++) {
      lineWidth += ctx.measureText(Content[i]).width;
      if (lineWidth > LimitWidth) {
        ctx.fillText(Content.substring(lastSubStrIndex, i), Padding, Distance + InitHeight);//绘制截取部分
        InitHeight = InitHeight + this.data.LineHeight + this.data.LineHeight/2;//20为字体的高度
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
    ctx.arc(p+w-r, p+h-r, r, 0, 0.5 * Math.PI);
    //尖角start
    ctx.lineTo(p + w * (3 / 4), p + h);
    ctx.lineTo(p + w * (3 / 4) - 30, p + h + 20);
    ctx.lineTo(p + w * (3 / 4) - 25, p + h);
    //尖角end
    ctx.lineTo(p + r, p + h);
    ctx.arcTo(p, p + h, p, p + h - r, r);
    ctx.lineTo(p, p + r);
    ctx.arc(p + r, p + r, r, 1 * Math.PI, 1.5 * Math.PI);
    ctx.stroke();
  },

  DrawBubble0: function (ctx, LineWidth, w, h, r, p) {
    ctx.setLineWidth(LineWidth);
    ctx.setStrokeStyle("#fff");
    ctx.beginPath();
    ctx.moveTo(p + r, p);
    ctx.arcTo(p + w, p, p + w, p + r, r);
    ctx.lineTo(p + w, p + h - r);
    //ctx.arcTo(p + w, p + h, p + w, p + h, r);
    // ctx.arcTo(p + w, p + h, p + w - r, p + h, r);
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

  //返回字体大小
  BackFontSize(){
    let ContentLen = util.GetStrLength(app.globalData.yulu_content)
    if (ContentLen >= 0 && ContentLen < 20) {
      console.log('1----------')
      console.log(ContentLen)
      return 24
    }
    if (ContentLen >= 20 && ContentLen < 40) {
      console.log('2----------')
      console.log(ContentLen)
      return 19
    }
    if (ContentLen >= 40 && ContentLen < 60) {
      console.log('3----------')
      console.log(ContentLen)
      return 17
    }
    if (ContentLen >= 60 && ContentLen < 80) {
      console.log('4----------')
      console.log(ContentLen)
      return 12
    }
    if (ContentLen >= 80) {
      console.log('5----------')
      console.log(ContentLen)
      return 10
    }

  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: '粱大侠小程序',
      path: 'pages/index/index',
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  }
})