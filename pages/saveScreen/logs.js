//logs.js
const util = require('../../utils/util.js')


Page({
  data: {
    canvasWidth:750,
    waterHeight:50,
    imgpath:''
  },
  onShareAppMessage: function () {
    return {
      title: '微信小程序联盟',
      desc: '最具人气的小程序开发联盟!',
      path: 'pages/dd/logs'
    }
  },
  onLoad: function () {
    
    
  },
  onReady: function (e) {
    var str ='初入江湖初入江湖初入江湖初入江湖初入江湖初入江湖初入江湖初入江湖初入江湖初入江湖初入江湖初入江湖';
    var ctx = wx.createCanvasContext('mycanvas');
    ctx.drawImage('../../images/bg.png', 0, 0, 450, '100%')
    ctx.drawImage('../../images/bottle.jpg', 120, 320, 100, 100)
    ctx.font = "8px";
    ctx.fillStyle = '#fff';

    var lineWidth = 0;
    var canvasWidth = 200;//计算canvas的宽度
    var initHeight = 15;//绘制字体距离canvas顶部初始的高度
    var lastSubStrIndex = 0; //每次开始截取的字符串的索引
    for (let i = 0; i < str.length; i++) {
      lineWidth += ctx.measureText(str[i]).width;
      if (lineWidth > canvasWidth) {
        ctx.fillText(str.substring(lastSubStrIndex, i), 50, 50 + initHeight);//绘制截取部分
        initHeight += 20;//20为字体的高度
        lineWidth = 0;
        lastSubStrIndex = i;
      }
      if (i == str.length - 1) {//绘制剩余部分
        ctx.fillText(str.substring(lastSubStrIndex, i + 1), 50, 50 + initHeight);
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
          var tempFilePath = res.tempFilePath;
          console.log(tempFilePath);
          that.setData({
            imgpath: tempFilePath,
          });
        },
        fail: function (res) {
          console.log(res);
        }
      });
    }, 2000);
    setTimeout(function () {
      wx.previewImage({
        current: that.data.imgpath, // 当前显示图片的http链接
        urls: [that.data.imgpath] // 需要预览的图片http链接列表
      })
    },3000);
  },

})
