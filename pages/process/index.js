//logs.js
const util = require('../../utils/util.js')


Page({
  data: {
    water_height:50,
    canvas_width: 300,
    // canvasT_height_t: 85,
    // canvasB_height_b: 65,  //75
    // canvasT_height: 90,
    // canvasB_height: 15,
  },
  onLoad: function () {
    
  },
  onReady: function (e) {
    this.DrawWater()
    
    

  },
  DrawWater: function(){
    // 使用 wx.createContext 获取绘图上下文 context
    var context = wx.createCanvasContext('myCanvas');
    if (0<=this.data.water_height<=40){
      context.fillStyle = "yellow";
      context.fillRect(0, 0, 300, 150 - this.data.water_height*1.5);
      context.font = "50px Arial";
      context.fillStyle = 'white';
      context.fillText(this.data.water_height, 40, 90);
      context.fillStyle = "white";
      context.fillRect(0, 150 - this.data.water_height * 1.5, 300, 150);
      context.draw();
    }

    if (this.data.water_height=50){
      // ---
      context.fillStyle = "yellow";
      context.fillRect(0, 0, 300, 150 - this.data.water_height * 1.5);
      context.font = "50px Arial";
      context.fillStyle = 'white';
      context.fillText(this.data.water_height, 40, 95);
      //---
      context.fillStyle = "white";
      context.fillRect(0, 150 - this.data.water_height * 1.5, 300, 150);
      context.font = "50px Arial";
      context.fillStyle = 'yellow';
      context.fillText(this.data.water_height, 40, 100);
      context.draw();
    }

    if (this.data.water_height>=75){
      context.fillStyle = "yellow";
      context.fillRect(0, 0, 300, 150 - this.data.water_height * 1.5);



      context.fillStyle = "white";
      context.fillRect(0, 150 - this.data.water_height * 1.5, 300, 150);
      context.font = "50px Arial";
      context.fillStyle = 'yellow';
      context.fillText(this.data.water_height, 40, 100);
      context.draw();
    }


    
    // context.fillStyle = "yellow";
    // context.fillRect(0, 0, 300, 150 - this.data.water_height);
    // context.font = "50px Arial";
    // context.fillStyle = 'white';
    // context.fillText("33", 40, 150 - this.data.water_height + 10);



    // context.fillStyle = "white";
    // context.fillRect(0, 150 - this.data.water_height, 300, 150);
    // context.font = "50px Arial";
    // context.fillStyle = 'red';
    // context.fillText("33", 40, 120);
    //context.draw();
  },

})
