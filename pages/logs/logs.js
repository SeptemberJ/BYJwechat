//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    imgpath:'../../images/bg.gif'
  },
  onLoad: function () {
    var that = this
    var ctx = wx.createCanvasContext('mycanvas');
    // setTimeout(function(){
    //   console.log('haha')
    //   ctx.drawImage('../../images/bg1.jpg', 0, 0, '100%', 200)
    //   ctx.draw();
    // },0)
    // setTimeout(function () {
    //   console.log('haha')
    //   ctx.drawImage('../../images/bg2.jpg', 0, 0, '100%', 200)
    //   ctx.draw();
    // }, 2000)
    // setTimeout(function () {
    //   console.log('haha')
    //   ctx.drawImage('../../images/bg1.jpg', 0, 0, '100%', 200)
    //   ctx.draw();
    // }, 3000)
    // setTimeout(function () {
    //   console.log('haha')
    //   ctx.drawImage('../../images/bg2.jpg', 0, 0, '100%', 200)
    //   ctx.draw();
    // }, 4000)
    
    // setInterval(function(){
    //   that.setData({
    //     imgpath: that.data.imgpath == '../../images/bg.png' ? '../../images/images/bg.png' : '../../images/bg.png'
    //   })
    // },1000)
    
  }
})
