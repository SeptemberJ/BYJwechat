//logs.js
const util = require('../../utils/util.js')
import h from '../../utils/url.js'

Page({
  data: {
    imgpath_write_logo: h.imgNetSrc + 'write_logo.png',
    imgpath_bg_bottle: h.imgNetSrc + 'bg_bottle.png',
    imgpath_bottleBorder: h.imgNetSrc + 'bottleBorder.png',
    canvasWidth: 750,
    waterHeight: 0,
  },
  onReady: function (e) {
    var that = this
    var time = setInterval(function () {
      console.log('setInterval---')
      if (that.data.waterHeight <= 60) {
        let temp = that.data.waterHeight + 10
        that.setData({
          waterHeight: temp
        })
        that.Draw(temp)
      } else {
        clearInterval(time);
      }
    }, 100)
    //that.Draw(that.data.waterHeight)
  },
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
  Draw11: function (WATERHEGHT) {
    let TextColor = '#dec538';
    var contextT = wx.createCanvasContext('CanvasT');
    var contextB = wx.createCanvasContext('CanvasB');
    contextB.fillStyle = "#FF0000";
    //contextB.fillRect(0, 0, 72, this.daa.waterHeight);
    contextB.moveTo(0, 0);
    contextB.lineTo(0, this.daa.waterHeight)
    contextB.moveTo(0, 5);
   // contextB.lineTo(72, 5);
    for (var i = 1; i < 72; i += 0.1) { // x 应该等于canvas的 width/10
      var x = i * 10;
      var y = Math.sin(i) * 10 + 0;
      contextB.lineTo(x, y);
      console.log(y);
    }
    contextB.strokeStyle = "blue"
    contextB.stroke();
    contextB.draw();

  }

})
