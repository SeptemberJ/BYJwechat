//logs.js
const util = require('../../utils/util.js')


Page({
  data: {
    canvasWidth: 750,
    waterHeight: 0,
    // canvasT_height: 165,
    // canvasB_height: 15,
  },
  onLoad: function () {

  },
  onReady: function (e) {
    var that = this

    var time = setInterval(function () {
      console.log('setInterval---')
      if (that.data.waterHeight <= 99) {
        let temp = that.data.waterHeight + 1
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
  Draw3: function () {
    //使用 wx.createContext 获取绘图上下文 context
    var contextT = wx.createCanvasContext('CanvasT');
    contextT.font = "50px Arial";
    contextT.fillStyle = 'white';
    contextT.fillText(this.data.waterHeight, 120, 115);
    contextT.draw();

    var contextB = wx.createCanvasContext('CanvasB')
    contextB.font = "50px Arial";
    contextB.fillStyle = 'yellow';
    contextB.fillText(this.data.waterHeight, 120, 15);
    contextB.draw()
  },
  Draw2: function (WATERHEGHT) {
    let BottleWidth = 250 / 2;
    //使用 wx.createContext 获取绘图上下文 context
    if (WATERHEGHT > 0 && WATERHEGHT < 10) {
      var contextT = wx.createCanvasContext('CanvasT');
      contextT.font = "50px Arial";
      contextT.fillStyle = 'white';
      contextT.fillText(WATERHEGHT, 40, 115);
      contextT.draw();
      return

    }
    if (WATERHEGHT >= 10 && WATERHEGHT <= 40) {
      var contextT = wx.createCanvasContext('CanvasT');
      contextT.font = "50px Arial";
      contextT.fillStyle = 'white';
      contextT.fillText(WATERHEGHT, 25, 115);
      contextT.draw();
      return

    }
    if (WATERHEGHT > 40 && WATERHEGHT < 50) {
      var contextT = wx.createCanvasContext('CanvasT');
      contextT.font = "50px Arial";
      contextT.fillStyle = 'white';
      contextT.fillText(WATERHEGHT, 25, 125);
      contextT.draw();

      var contextB = wx.createCanvasContext('CanvasB')
      contextB.font = "50px Arial";
      contextB.fillStyle = 'yellow';
      contextB.fillText(WATERHEGHT, 25, WATERHEGHT * 2 - 40);
      contextB.draw()
      return

    }
    // if (WATERHEGHT == 50) {
    //   var contextT = wx.createCanvasContext('CanvasT');
    //   contextT.font = "50px Arial";
    //   contextT.fillStyle = 'white';
    //   contextT.fillText(WATERHEGHT, 25, 65);
    //   contextT.draw();

    //   var contextB = wx.createCanvasContext('CanvasB')
    //   contextB.font = "50px Arial";
    //   contextB.fillStyle = 'yellow';
    //   contextB.fillText(WATERHEGHT, 25, 45);
    //   contextB.draw()
    //   return

    // }
    if (WATERHEGHT >= 50 && WATERHEGHT <= 60) {
      var contextT = wx.createCanvasContext('CanvasT');
      contextT.font = "50px Arial";
      contextT.fillStyle = 'white';
      contextT.fillText(WATERHEGHT, 25, 115);
      // contextT.fillText(WATERHEGHT, 25, 105);
      contextT.draw();

      var contextB = wx.createCanvasContext('CanvasB')
      contextB.font = "50px Arial";
      contextB.fillStyle = 'yellow';
      contextB.fillText(WATERHEGHT, 25, WATERHEGHT * 2 - 40);
      // contextB.fillText(WATERHEGHT, 25, 25);
      contextB.draw()
      return
    }
    if (WATERHEGHT > 60 && WATERHEGHT <= 70) {
      var contextB = wx.createCanvasContext('CanvasB')
      contextB.font = "50px Arial";
      contextB.fillStyle = 'yellow';
      contextB.fillText(WATERHEGHT, 25, WATERHEGHT * 2 - 40);
      contextB.draw()
      return
    }
    if (WATERHEGHT > 70 && WATERHEGHT < 100) {
      var contextB = wx.createCanvasContext('CanvasB')
      contextB.font = "50px Arial";
      contextB.fillStyle = 'yellow';
      contextB.fillText(WATERHEGHT, 25, WATERHEGHT * 2 - 40);
      contextB.draw()
      return
    }
    if (WATERHEGHT == 100) {
      var contextB = wx.createCanvasContext('CanvasB')
      contextB.font = "50px Arial";
      contextB.fillStyle = 'yellow';
      contextB.fillText(WATERHEGHT, 10, 110);
      contextB.draw()
      return
    }

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

  }

})
