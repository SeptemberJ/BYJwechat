import h from '../../utils/url.js'
var util = require('../../utils/util.js')
var requestPromisified = util.wxPromisify(wx.request)
import regeneratorRuntime from '../../utils/regenerator-runtime'
var app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgpath_write_logo: h.imgNetSrc + 'write_logo.png',
    imgpath_bg_bottle: h.imgNetSrc + 'bg_bottle.png',
    imgpath_bottleBorder: h.imgNetSrc + 'bottleBorder.png',
    IfUploadBg:false,
    UploadBg:'',
    BgPathIdx:0,
    yuluIdx: 0, 
    BgPathList: ['../../images/write_bg/1.png', '../../images/write_bg/2.png', '../../images/write_bg/3.png', '../../images/write_bg/4.png', h.imgNetSrc + 'write_bg/5.png'],
    BgPathList2: [h.imgNetSrc + 'write_bg/1.png', h.imgNetSrc + 'write_bg/2.png', h.imgNetSrc + 'write_bg/3.png', h.imgNetSrc + 'write_bg/4.png', '../../images/write_bg/5.png'],
    BottleIdx: -1,
    BottleList: [h.imgNetSrc + 'write/1.png', h.imgNetSrc + 'write/2.png', h.imgNetSrc + 'write/3.png', h.imgNetSrc + 'write/4.png', h.imgNetSrc + 'write/5.png', h.imgNetSrc + 'write/6.png'],
    yuluList: ['宁可"相忘于江湖"的人，一定在爱里受过挫折。', '司机师傅,你知道什么是爱情吗？不知道，但是在我车上吐一次两百。', '初入江湖孤单路长,一路前行海阔天光。', '有些东西是抓不住的，比如爱情和时间。有些东西不抓就在身前,比如梦想和远方。', '三杯酒下肚,都是有故事的人。', '平庸是懒惰的孪生兄弟，奇迹是努力的另一个名字。', '彷徨的人常常心累,坚定的人轻松前行。', '人生是棋，这一步狭路相逢，下一步海阔天空。', '人生是取舍，有失有得；缘分是宴席,有聚有散；感情是杯酒,有醒有醉。', '如风自在，不求归宿,扬鞭策马,一样很酷。','能约酒的都是同路人,能下酒的都是好故事。','儿女私情什么的都太影响闯荡江湖了。哦,这就是你单身二十多年的理由。','曾今像仗剑走天涯,如今还差一壶酒。','你摔倒了我会扶你起来,不过先等我笑完。','宿舍里结拜的"辈分"缘分十年如一,喝酒的酒杯永远不分高低。','我看你酒量那么好,一定吃过不少苦吧。','爱笑的女子,运气不会差。爱笑的男子,最早开始长鱼尾纹。','少年感就是好奇心,人在失去好奇心的一瞬间步入中年。','老友就是:一碟花生米,一拼酒,聊一宿。','我们能实现一个很香的梦,只因为我们是一群臭味相投的人。','有的人假传很努力,最后都是在和自己飙演技。','要翻过一座山不难,就看谁在山的那一面等你。'],
    yulu_content: '',
    marginBot: 0,
    fontSize: 28,
    padt:0,
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
    this.setData({
      ImgWidth: app.globalData.screenWidth - 20,
      yulu_nickname: app.globalData.yulu_nickname
    })
    console.log(app.globalData.openid)
  },
  onShow(){
    this.DrawBt()
    this.setData({
      yulu_address: app.globalData.yulu_address
    })
    
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
      this.JuageFontSize(util.GetStrLength(this.data.yuluList[Idx + 1]))
    } else {
      this.setData({
        yuluIdx: 0,
        yulu_content: this.data.yuluList[0]
      })
      this.JuageFontSize(util.GetStrLength(this.data.yuluList[0]))
    }
  },
  //选择地址
  ChooseAddress: function(){
    wx.showLoading({
      title: '加载中...',
    })
    wx.chooseLocation({
      success: (res)=> {
        console.log(res)
        let wholeAddress = res.address.slice(0)
        let address = wholeAddress.substr(0, wholeAddress.indexOf('市')+1)
        console.log(address)
        // success
        this.setData({
          yulu_address: address //res.name
        })
        app.globalData.yulu_address = address
        wx.hideLoading()
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
          UploadBg: res.tempFilePaths[0]
        })
        //var tempFilePaths = res.tempFilePaths
      }
    })
  },
  //填写语录
  WriteYulu: function(e){
    let len = util.GetStrLength(e.detail.value)
    debugger           
    this.JuageFontSize(len)
    this.setData({
      yulu: e.detail.value
    })
  },
  Focus: function(){
    this.setData({
      marginBot: 300
    })
  },
  Blur: function () {
    this.setData({
      marginBot: 0
    })
  },
  //判断字体大小
  JuageFontSize(len){
    console.log(len)
    if (len >= 0 && len < 20) {
      console.log('1----------')
      this.setData({
        fontSize: 28
      })
    }
    if (len >= 20 && len < 40) {
      console.log('1----------')
      this.setData({
        fontSize: 24
      })
    }
    if (len >= 40 && len < 60) {
      console.log('2----------')
      this.setData({
        fontSize: 24
      })
    }
    if (len >= 60 && len < 80) {
      console.log('3----------')
      this.setData({
        fontSize: 18
      })
    }
    if (len >= 80) {
      console.log('4----------')
      this.setData({
        fontSize: 18,
        padt:10,
      })
    }
  },
  //保存语录
  SaveYulu (){
    if (this.data.yulu_content == '' && !this.data.yulu_content){
      wx.showToast({
        image: '../../images/icons/attention.png',
        title: '请输入语录！'
      });
      return false
    }
    if (this.data.yulu_address == '' && !this.data.yulu_address) {
      wx.showToast({
        image: '../../images/icons/attention.png',
        title: '请选择地址！'
      });
      return false
    }
    this.setData({
      IfProducing: true
    })
    app.globalData.yulu_bg = this.data.IfUploadBg ? this.data.UploadBg : this.data.BgPathList[this.data.BgPathIdx];
    app.globalData.yulu_content = this.data.yulu_content
    app.globalData.yulu_address = this.data.yulu_address
    //调起produce page
    var time = setInterval(() => {
      //console.log('setInterval---')
      if (this.data.waterHeight <= 99) {
        let temp = this.data.waterHeight + 1
        this.setData({
          waterHeight: temp
        })
        this.Draw(temp)
        if (temp == 100) {
          wx.navigateTo({
            url: '../card/index',
          })
        }
      } else {
        clearInterval(time);
      }
    }, 70)
  },
  async SaveYulu2(){
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
    //app.globalData.yulu_nickname = this.data.yulu_nickname
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
    //app.globalData.yulu_nickname = this.data.yulu_nickname
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
  onShareAppMessage: function () {
  
  }
})