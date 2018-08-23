import h from '../../utils/url.js'
var util = require('../../utils/util.js')
var requestPromisified = util.wxPromisify(wx.request)
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgpath_write_logo: h.imgNetSrc + 'write_logo.png',
    imgpath_bg_bottle: h.imgNetSrc + 'bg_bottle.png',
    imgpath_bottleBorder: h.imgNetSrc + 'bottleBorder.png',
    imgpath_uFpLbYt2: h.imgNetSrc + 'uFpLbYt2.png',
    imgpath_uFpLbYt: h.imgNetSrc + 'uFpLbYt.png',
    bgImgPath1: h.imgNetSrc + 'BgCard1.png',
    bgImgPath2: h.imgNetSrc + 'bgCard_bg.png',
    imgpath:'',
    FontSize:30,
    FontSizeS: 8,
    LineHeight:15,
    LineHeightPB: 8,
    ReadyShow:false,
    hasready: false,
    waterHeight: 0,     //produce page
  
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    setTimeout(()=>{
      console.log('setTimeout------=======================')
      wx.hideLoading()
      this.setData({
        hasready: true
      })
    }, 2000)
    setTimeout(() => {
      //调起produce page
      var time = setInterval(() => {
        this.setData({
          showBG:true
        })
        if (this.data.waterHeight <= 99) {
          console.log('start---')
          let temp = this.data.waterHeight + 1
          this.setData({
            waterHeight: temp
          })
          if (temp == 100) {
            console.log('10000------')
            this.setData({
              ReadyShow: true
            })
            setTimeout(() => {
              this.SaveYulu()
            },2000)
          }
        } else {
          clearInterval(time);
        }
      }, 70)
    }, 4000)


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
    var len = util.GetStrLength(app.globalData.yulu_content)
    if (len >= 0 && len <= 20) {
      console.log('1----------')
      this.setData({
        FontSize: 30,
        LineHeight: 27
      })
    }
    if (len > 20) {
      console.log('2----------')
      this.setData({
        FontSize: 22,
        LineHeight: 17
      })
    }
   
    this.setData({
      WidthWrap: app.globalData.screenWidth - 50,
      HeightWrap: app.globalData.screenHeight * 0.7,//app.globalData.screenHeight - 180,
      Width: app.globalData.screenWidth - 50,
      Height: app.globalData.screenHeight*0.7,//app.globalData.screenHeight - 180,
      BgImg : app.globalData.yulu_bg,
      //FontSize: 22,//this.BackFontSize(),//app.globalData.screenWidth>=768?20:10,
      //LineHeight: 15//this.BackFontSize(),//app.globalData.screenWidth >= 768 ? 30 : 15,
    })




    var _this = this;
    var canvasWidth = app.globalData.screenWidth - 50;//计算canvas的宽度
    var BubbleFrameWidth = canvasWidth * (6 / 8);
    var PictureHeight = this.data.Height - this.data.Height * 0.13;//app.globalData.screenHeight - 180 - 60;
    var BubbleFrameHeight = PictureHeight/3; //100;
    var LogoHeight = 30;
    var Padding = canvasWidth * (1 / 8);
    var _Padding = 20;
    var BottleHeight = PictureHeight * 0.45 
    // var BottleHeight = PictureHeight * 0.38  //PictureHeight / 3;
    var LineWidth = 1;
    var BubbleR = 15;
    
    var BgImg = app.globalData.yulu_bg;//'../../images/bg_write.png';
    var ContentWidth = BubbleFrameWidth - _Padding*2;
    var ContentWidthPB = (BottleHeight / 2) - 10
    var initHeightPB = 22
    var initHeight = 30;//绘制字体距离canvas顶部初始的高度
    var ImgPadding = 10;
    var YuLu = app.globalData.yulu_content;
    var NickName = app.globalData.yulu_nickname;
    var Address = app.globalData.yulu_address;

    var ctx = wx.createCanvasContext('mycanvas');


    ctx.drawImage('../../images/BgCard1.png', 0, 0, this.data.Width, this.data.Height);
    var raito = (this.data.Width - ImgPadding * 2) / PictureHeight
    //原版
    ctx.drawImage(BgImg, ImgPadding * 1, ImgPadding * 1, raito * PictureHeight, PictureHeight);

    //修改一
    //ctx.drawImage(BgImg, 0, 0, app.globalData.imgInfo_width, app.globalData.imgInfo_width / raito, ImgPadding * 1, ImgPadding * 1, raito * PictureHeight, PictureHeight);
    console.log(util.imageUtil(app.globalData.imgInfo_width, app.globalData.imgInfo_height, raito * PictureHeight, PictureHeight))
    var ImgInfo = util.imageUtil(app.globalData.screenWidth * app.globalData.pixelRatio * 1.5, (app.globalData.screenHeight + 41*2) * app.globalData.pixelRatio, this.data.Width - ImgPadding * 2, PictureHeight)
   // ctx.drawImage(BgImg, ImgPadding * 1, ImgPadding * 1, ImgInfo.imageWidth, ImgInfo.imageHeight);

    //ctx.drawImage(BgImg, 0, 0, ImgInfo.imageWidth, ImgInfo.imageHeight, ImgPadding * 1, ImgPadding * 1, raito * PictureHeight, PictureHeight);



    console.log('canvas info--------------')
    console.log(this.data.Width - ImgPadding * 2)
    console.log(PictureHeight)
   
    //yulu内容

    this.DrawYuLu(0, ctx, ContentWidth, Padding + _Padding, YuLu, Padding, 'start', initHeight);
    this.DrawYuLu(1, ctx, ContentWidth, Padding + BubbleFrameWidth - _Padding, NickName, BubbleFrameHeight - 15, 'right', initHeight);
    this.DrawYuLu(2, ctx, ContentWidth, Padding + BubbleFrameWidth - _Padding, Address, BubbleFrameHeight, 'right', initHeight);

    ctx.drawImage('../../images/bottle.png', (this.data.Width - BottleHeight) / 2, BubbleFrameHeight + Padding * 1.5, BottleHeight, BottleHeight)

    
  //瓶标语录
    if (app.globalData.screenWidth <= 320) {
      console.log('1111111111111111111111111111111111111')
      ContentWidthPB = (BottleHeight / 2) - 10
      initHeightPB = 25
      this.DrawYuLuPB(0, ctx, ContentWidthPB, (this.data.Width - BottleHeight) / 2 + 15, YuLu, BubbleFrameHeight + Padding * 1.5 + (BottleHeight / 2) - 5, 'left', initHeightPB);
      this.DrawYuLuPB(1, ctx, ContentWidthPB, (this.data.Width - BottleHeight) / 2 + (BottleHeight / 2) + 5, NickName, BubbleFrameHeight + Padding * 1.5 + (BottleHeight / 2) + 8, 'right', initHeight);
      this.DrawYuLuPB(2, ctx, ContentWidthPB, (this.data.Width / 2) + 5, Address, BubbleFrameHeight + Padding * 1.5 + (BottleHeight / 2) + 15, 'right', initHeight);
    } if (app.globalData.screenHeight >= 812) {
      console.log('222222222222222222222222222222222222')
      ContentWidthPB = (BottleHeight / 2) - 15
      initHeightPB = 25
      this.DrawYuLuPB(0, ctx, ContentWidthPB, (this.data.Width - BottleHeight) / 2 + 25, YuLu, BubbleFrameHeight + Padding * 1.5 + (BottleHeight / 2) + 2, 'left', initHeightPB);
      this.DrawYuLuPB(1, ctx, ContentWidthPB, (this.data.Width - BottleHeight) / 2 + (BottleHeight / 2) + 10, NickName, BubbleFrameHeight + Padding * 1.5 + (BottleHeight / 2) + 17, 'right', initHeight);
      this.DrawYuLuPB(2, ctx, ContentWidthPB, (this.data.Width / 2) + 10, Address, BubbleFrameHeight + Padding * 1.5 + (BottleHeight / 2) + 25, 'right', initHeight);
    } else {
      console.log('33333333333333333333333333333333333')
      ContentWidthPB = (BottleHeight / 2) - 15
      initHeightPB = 25
      this.DrawYuLuPB(0, ctx, ContentWidthPB, (this.data.Width - BottleHeight) / 2 + 20, YuLu, BubbleFrameHeight + Padding * 1.5 + (BottleHeight / 2) - 5, 'left', initHeightPB);
      this.DrawYuLuPB(1, ctx, ContentWidthPB, (this.data.Width - BottleHeight) / 2 + (BottleHeight / 2) + 5, NickName, BubbleFrameHeight + Padding * 1.5 + (BottleHeight / 2) + 12, 'right', initHeight);
      this.DrawYuLuPB(2, ctx, ContentWidthPB, (this.data.Width / 2) + 5, Address, BubbleFrameHeight + Padding * 1.5 + (BottleHeight / 2) + 20, 'right', initHeight);
    }


    


    


    ctx.drawImage('../../images/write_logo_0.png', (this.data.Width - 250)/2 , PictureHeight - 41 +10, 250, 41)
    //ctx.drawImage('../../images/write_logo_1.png', (this.data.Width - 38 - 84) / 2, PictureHeight - 30, 38, 20)
    //ctx.drawImage('../../images/write_logo_2.png', (this.data.Width - 38 - 84) / 2 + 38, PictureHeight - 30, 84, 27)





    //ctx.drawImage('../../images/write_logo.png', (this.data.Width - 100) / 2, PictureHeight - 40, this.data.Width, 17)

    // ctx.drawImage('../../images/bottle.png', Padding+30, BubbleFrameHeight + Padding * 2, 150, 142)
    // ctx.drawImage('../../images/write_logo.png', Padding + 50, BubbleFrameHeight + Padding * 2 + 142, 100, 17)
    

   
    //ctx.drawImage('../../images/QRcode.png', this.data.Width - ImgPadding * 2 - 132, PictureHeight + 17, 130, 40);

    
    

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
    console.log('in 保存至相册-------------')
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
  //语录内容瓶标
  DrawYuLuPB: function (type,CTX, LimitWidth, Padding, Content, Distance, Right, InitHeight) {
    CTX.beginPath()
    if (app.globalData.screenWidth <= 320) {
      CTX.font = (type == 0) ? 'bold 5px 宋体' : "5px 宋体";
    }else{
      CTX.font = (type == 0) ? 'bold 7px 宋体' : "7px 宋体";
    }
    
    CTX.fillStyle = '#fff';
    CTX.textAlign = Right;
    let lineWidth = 0;
    let lastSubStrIndex = 0; //每次开始截取的字符串的索引
    // 绘制内容
    for(let i = 0; i <Content.length; i++) {
      lineWidth += CTX.measureText(Content[i]).width;
      if (lineWidth > LimitWidth) {
        CTX.fillText(Content.substring(lastSubStrIndex, i), Padding, Distance + InitHeight);//绘制截取部分
        InitHeight = InitHeight + this.data.LineHeightPB
        lineWidth = 0;
        lastSubStrIndex = i;
      }
      if (i == Content.length - 1) {//绘制剩余部分
        CTX.fillText(Content.substring(lastSubStrIndex, i + 1), Padding, Distance + InitHeight);
      }
    }
    CTX.closePath()
  },
  DrawYuLu: function (type, ctx, LimitWidth, Padding, Content, Distance, Right, InitHeight) {
    ctx.beginPath()
    ctx.font = (type == 0) ? 'bold ' + this.data.FontSize + "px SimHei" : "bold 10px SimHei";

    //ctx.font = "10px 微软雅黑";

    ctx.fillStyle = '#fff';

    ctx.textAlign = Right;

    let lineWidth = 0;

    let lastSubStrIndex = 0; //每次开始截取的字符串的索引

    // 绘制内容

    for (let i = 0; i < Content.length; i++) {

      lineWidth += ctx.measureText(Content[i]).width;

      if (lineWidth > LimitWidth) {

        ctx.fillText(Content.substring(lastSubStrIndex, i), Padding, Distance + InitHeight);//绘制截取部分

        InitHeight = InitHeight + this.data.LineHeight + this.data.LineHeight / 2;//20为字体的高度

        lineWidth = 0;

        lastSubStrIndex = i;

      }

      if (i == Content.length - 1) {//绘制剩余部分

        ctx.fillText(Content.substring(lastSubStrIndex, i + 1), Padding, Distance + InitHeight);

      }

    }
    ctx.closePath()

  },
  //语录内容
  DrawYuLu9: function (type, ctx, LimitWidth, Padding, Content, Distance, Right, InitHeight) {
    ctx.font = (type == 0) ? 'bold ' + this.data.FontSize + "px SimHei" : "bold 10px SimHei";
    //ctx.font = "bold 20px BenmoJinhei";
    ctx.fillStyle = '#fff';
    //ctx.lineWidth = 4;
    ctx.textAlign = Right;
    let lineWidth = 0;
    let lastSubStrIndex = 0; //每次开始截取的字符串的索引
    // 绘制内容
    for (let i = 0; i < Content.length; i++) {
      lineWidth += ctx.measureText(Content[i]).width;
      if (lineWidth > LimitWidth) {
        ctx.fillText(Content.substring(lastSubStrIndex, i), Padding, Distance + InitHeight);//绘制截取部分
        InitHeight = InitHeight + this.data.LineHeight;//20为字体的高度 + this.data.LineHeight / 2
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
      return 22
    }
    if (ContentLen >= 20 && ContentLen <= 40) {
      console.log('2----------')
      console.log(ContentLen)
      return 2
    }
    if (ContentLen > 40 && ContentLen < 50) {
      console.log('3----------')
      console.log(ContentLen)
      return 22
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