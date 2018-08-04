// pages/write/index.js
var util = require('../../utils/util.js')
var requestPromisified = util.wxPromisify(wx.request)
import regeneratorRuntime from '../../utils/regenerator-runtime'
var app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    IfUploadBg:false,
    UploadBg:'',
    BgPathIdx:0,
    yuluIdx:0,
    BgPathList: ['../../images/write_bg/1.png', '../../images/write_bg/2.png', '../../images/write_bg/3.png', '../../images/write_bg/4.png', '../../images/write_bg/5.png', '../../images/write_bg/6.png', '../../images/write_bg/7.png'],
    BottleIdx: 0,
    BottleList: ['../../images/write/1.png', '../../images/write/2.png', '../../images/write/3.png', '../../images/write/4.png', '../../images/write/5.png', '../../images/write/6.png'],
    yuluList: ['如风自在，不求归宿,扬鞭策马,一样很酷。', '人生是取舍，有失有得；缘分是宴席,有聚有散；感情是杯酒,有醒有醉。', '人生是棋，这一步狭路相逢，下一步海阔天空。', '彷徨的人常常心累,坚定的人轻松前行', '平庸是懒惰的孪生兄弟，奇迹是努力的另一个名字。','有些东西是抓不住的，比如爱情和时间。有些东西不抓就在身前,比如梦想和远方。有些东西不抓就在身前,比如梦想和远方'],
    yulu_content:'如风自在，不求归宿,扬鞭策马,一样很酷。',
    yulu_address:'',
    yulu_nickname:'',
    ImgWidth: null,
    IfProducing: false,
    canvasWidth: 750,   //produce page
    waterHeight: 0,     //produce page
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this.getUserInfo()
    this.setData({
      ImgWidth: app.globalData.screenWidth - 20,
      yulu_nickname: app.globalData.nickName
    })
  },
  onShow(){
    this.DrawBt()
  },
  //确认发布绘制
  DrawBt: function(){
    var ctx = wx.createCanvasContext('btCanvas');
    ctx.setLineWidth(2);
    ctx.setStrokeStyle("#fff");
    ctx.moveTo(10, 10);
    ctx.lineTo(10, 5);
    ctx.lineTo(15, 5);

    ctx.moveTo(10, 30);
    ctx.lineTo(10, 35);
    ctx.lineTo(15, 35);

    ctx.moveTo(105, 5);
    ctx.lineTo(110, 5);
    ctx.lineTo(110, 10);

    ctx.moveTo(105, 35);
    ctx.lineTo(110, 35);
    ctx.lineTo(110, 30);
    ctx.stroke();
    ctx.font = "bold 18px Arial ";
    ctx.fillStyle = 'white';
    ctx.fillText('确定发布', (120 - ctx.measureText('确定发布').width)/2,25);
    ctx.draw();

  },
  //改变背景
  ChangeBgPicture: function(){
    let Idx = this.data.BgPathIdx
    if (Idx < this.data.BgPathList.length - 1){
      this.setData({
        BgPathIdx: Idx+1,
        IfUploadBg: false
      })
    }else{
      this.setData({
        BgPathIdx: 0,
        IfUploadBg: false
      })
    }
  },
  //语录示例选择
  ChangeYuluContent: function(){
    let Idx = this.data.yuluIdx
    if (Idx < this.data.yuluList.length - 1) {
      this.setData({
        yuluIdx: Idx + 1,
        yulu_content: this.data.yuluList[Idx + 1]
      })
    } else {
      this.setData({
        yuluIdx: 0,
        yulu_content: this.data.yuluList[0]
      })
    }
  },
  //选择地址
  ChooseAddress: function(){
    wx.chooseLocation({
      success: (res)=> {
        // success
        this.setData({
          yulu_address: res.name//res.address
        })
      },
      fail: (res) => {
        // fail
      },
      complete: (res) => {
        // complete
      }
    })
    // wx.getLocation({
    //   type: 'gcj02', //返回可以用于wx.openLocation的经纬度
    //   success: function (res) {
    //     var latitude = res.latitude
    //     var longitude = res.longitude
    //     wx.openLocation({
    //       latitude: latitude,
    //       longitude: longitude,
    //       scale: 28
    //     })
    //   }
    // })
  },
  //改变颜色
  ChangeColor: function(){
    console.log("haha")
    let BottleIdx = this.data.BottleIdx
    this.setData({
      BottleIdx: BottleIdx == 5 ? 0 : BottleIdx+1
    })
  },
  //上传背景图片
  UploadBg: function(){
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], // ['album', 'camera']
      success: (res)=> {
        this.setData({
          IfUploadBg: true,
          UploadBg: res.tempFilePaths
        })
        //var tempFilePaths = res.tempFilePaths
      }
    })
  },
  //填写语录
  WriteYulu: function(e){
    this.setData({
      yulu: e.detail.value
    })
  },
  //保存语录
  async SaveYulu(){
    let res
    try {
      res = await this.SendYuLuContent()
      console.log('back---')
      console.log(res)
      if(res == 1){
        //调起produce page
        var time = setInterval(() => {
          console.log('setInterval---')
          if (this.data.waterHeight <= 99) {
            let temp = this.data.waterHeight + 1
            this.setData({
              waterHeight: temp
            })
            this.Draw(temp)
            if(temp == 100){
              wx.navigateTo({
                url: '../card/index',
              })
            }
          } else {
            clearInterval(time);
          }
        }, 100)
      }
    } catch (err) {
      console.log(err)
    }
    this.setData({
      IfProducing: true
    })
    app.globalData.yulu_bg = this.data.IfUploadBg ? this.data.UploadBg : this.data.BgPathList[this.data.BgPathIdx];
    app.globalData.yulu_content = this.data.yulu_content
    app.globalData.yulu_address = this.data.yulu_address
    app.globalData.yulu_nickname = this.data.yulu_nickname
    // wx.navigateTo({
    //   url: '../produce/index',
    // })
  },
  SaveYulu0: function () {
    this.setData({
      IfProducing: true
    })
    app.globalData.yulu_bg = this.data.IfUploadBg ? this.data.UploadBg : this.data.BgPathList[this.data.BgPathIdx];
    app.globalData.yulu_content = this.data.yulu_content
    app.globalData.yulu_address = this.data.yulu_address
    app.globalData.yulu_nickname = this.data.yulu_nickname
    wx.navigateTo({
      url: '../produce/index',
    })
    //调起produce page
    var time = setInterval(() => {
      console.log('setInterval---')
      if (this.data.waterHeight <= 99) {
        let temp = this.data.waterHeight + 1
        this.setData({
          waterHeight: temp
        })
        console.log(temp)
        this.Draw(temp)
        if (temp == 100) {

        }
      } else {
        clearInterval(time);
      }
    }, 100)
  },
  //语录内容上传
  SendYuLuContent: function(){
    return new Promise((resolve, reject) => {
      requestPromisified({
        url: 'https://jingshangs.com/hky_JK/selectcookingtype',
        data: {
        },
        method: 'POST',
      }).then((res) => {
        resolve(res.data.result) 
      }).catch((res) => {
        console.log(res)
      });
    })
  },
  // produce page
  Draw: function (WATERHEGHT) {
    let TextColor = '#dec538';
    var contextT = wx.createCanvasContext('CanvasT');
    var contextB = wx.createCanvasContext('CanvasB');
    contextT.font = "25px Arial";
    contextB.font = "25px Arial";
    //使用 wx.createContext 获取绘图上下文 context
    if (WATERHEGHT > 0 && WATERHEGHT < 10) {
      // var contextT = wx.createCanvasContext('CanvasT');
      // contextT.font = "25px Arial";
      contextT.fillStyle = 'white';
      contextT.fillText(WATERHEGHT + 'ml', 15, 65);
      contextT.draw();
      return
    }
    if (WATERHEGHT >= 10 && WATERHEGHT < 40) {
      // var contextT = wx.createCanvasContext('CanvasT');
      // contextT.font = "25px Arial";
      contextT.fillStyle = 'white';
      contextT.fillText(WATERHEGHT + 'ml', 10, 60);
      contextT.draw();
      return
    }
    if (WATERHEGHT >= 40 && WATERHEGHT < 50) {
      // var contextT = wx.createCanvasContext('CanvasT');
      // contextT.font = "25px Arial";
      contextT.fillStyle = 'white';
      contextT.fillText(WATERHEGHT + 'ml', 10, 60);
      contextT.draw();

      // var contextB = wx.createCanvasContext('CanvasB')
      // contextB.font = "25px Arial";
      contextB.fillStyle = TextColor;
      contextB.fillText(WATERHEGHT + 'ml', 10, WATERHEGHT - 40);
      contextB.draw()
      return

    }
    if (WATERHEGHT == 50) {
      // var contextT = wx.createCanvasContext('CanvasT');
      // contextT.font = "25px Arial";
      contextT.fillStyle = 'white';
      contextT.fillText(WATERHEGHT + 'ml', 10, 60);
      contextT.draw();

      // var contextB = wx.createCanvasContext('CanvasB')
      // contextB.font = "25px Arial";
      contextB.fillStyle = TextColor;
      contextB.fillText(WATERHEGHT + 'ml', 10, 10);
      contextB.draw()
      return

    }
    if (WATERHEGHT > 50 && WATERHEGHT <= 60) {
      // var contextT = wx.createCanvasContext('CanvasT');
      // contextT.font = "25px Arial";
      contextT.fillStyle = 'white';
      contextT.fillText(WATERHEGHT + 'ml', 10, 115);
      contextT.draw();

      // var contextB = wx.createCanvasContext('CanvasB')
      // contextB.font = "25px Arial";
      contextB.fillStyle = TextColor;
      contextB.fillText(WATERHEGHT + 'ml', 10, WATERHEGHT - 40);
      contextB.draw()
      return
    }
    if (WATERHEGHT > 60 && WATERHEGHT < 100) {
      // var contextB = wx.createCanvasContext('CanvasB')
      // contextB.font = "25px Arial";
      contextB.fillStyle = TextColor;
      contextB.fillText(WATERHEGHT + 'ml', 10, WATERHEGHT - 40);
      contextB.draw()
      return
    }
    if (WATERHEGHT == 100) {
      // var contextB = wx.createCanvasContext('CanvasB')
      // contextB.font = "25px Arial";
      contextB.fillStyle = TextColor;
      contextB.fillText(WATERHEGHT + 'ml', 1, 60);
      contextB.draw()
      return
    }

  },
  getUserInfo: function () {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)
              // 可以将 res 发送给后台解码出 unionId
              this.setData({
                yulu_nickname: res.userInfo.nickName
              })
              app.globalData.nickName = res.userInfo.nickName

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onShareAppMessage: function () {
  
  }
})