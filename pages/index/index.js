//index.js
import h from '../../utils/url.js'
//获取应用实例
const app = getApp()

Page({
  data: {
    bgImgPath: h.imgNetSrc + 'index.gif',
    imgUrls: [h.imgNetSrc + 'carousel/1.png', h.imgNetSrc + 'carousel/2.png', h.imgNetSrc + 'carousel/3.png', h.imgNetSrc + 'carousel/4.png', h.imgNetSrc + 'carousel/5.png', h.imgNetSrc + 'carousel/6.png', h.imgNetSrc + 'carousel/7.png', h.imgNetSrc + 'carousel/8.png', h.imgNetSrc + 'carousel/9.png', h.imgNetSrc + 'carousel/10.png',],
    // imgUrls: ['../../images/index_Bottle.png', '../../images/index_Bottle.png','../../images/index_Bottle.png'],
    indicatorDots: false,
    autoplay: false,
    circular: false,
    interval: 5000,
    duration: 1000,
    imageWidth: 0,
    imageHeight: 0,
    phoneWidth: 0,  //屏幕宽 根据屏幕的宽度,三分之一为li的宽度
    phoneHeight: 0, //屏幕高
    swiperWidth: 0,
    imgindex: 9,//中间的下标 重点
    middlePhoneWidthMarLeft: 0, //背景的图片的margin-left=-aaa 
    middlePhoneWidth: 0, //背景
    swiperUlWidth: 0, //移动的ul的宽度 
    swiperLiWidth: 0, //移动的li的宽度
    swiperLeft: 0,  //移动的定位left 
    animationData: {},//运动 
    startClientX: 0,//点击开始 X 轴位置
    endClientX: 0,//点击结束 X 轴位置
    images: [], //图片的数据
    styleArr: [], //所有图片的样式数组 对中间的图片放大的操作组
    duration: 1000, //动画时间
  },
  //跳转活动说明页面
  ToIntroduction: function() {
    wx.navigateTo({
      url: '../introduction/index'
    })
  },
  Animationfinish: function(){
    //开始draw文字
    console.log('end----------------')
  },
  onLoad: function () {
    var _this = this;
    //===取屏幕宽度=======
    wx.getSystemInfo({
      success: (res)=> {
        // if (res.windowWidth >414 && res.windowWidth<=768){
        //   this.setData({
        //     swiperLeft: -160 - (res.windowWidth / 2)*5
        //   })
        // }
        // if (res.windowWidth > 768 && res.windowWidth <= 834) {
        //   this.setData({
        //     swiperLeft: -180 - (res.windowWidth / 2) * 5
        //   })
        // }
        // if (res.windowWidth > 320 && res.windowWidth <= 3750) {
        //   this.setData({
        //     swiperLeft: -(res.windowWidth / 2) * (5 - 1.5) + 20
        //   })
        // }
        // if (res.windowWidth <= 320) {
        //   this.setData({
        //     swiperLeft: -(res.windowWidth / 2) * (5 - 1.5) + 20
        //   })
        // }
        _this.setData({
          phoneWidth: res.windowWidth,
          swiperLeft: -(res.windowWidth / 2) * (10 - 1.5) + 20
        })
        console.log((res.windowWidth / 2))
        console.log(-(res.windowWidth / 2) * (10 - 1.5) + 20)
      }
    });
    //=======带data参数 请求数据====================
    var Imgs = [
      {
        picUrl: h.imgNetSrc + 'carousel/1.png',
        id: '0'
      },
      {
        picUrl: h.imgNetSrc + 'carousel/2.png',
        id: '1'
      },
      {
        picUrl: h.imgNetSrc + 'carousel/3.png',
        id: '2'
      },
      {
        picUrl: h.imgNetSrc + 'carousel/4.png',
        id: '3'
      },
      {
        picUrl: h.imgNetSrc + 'carousel/5.png',
        id: '4'
      },
      {
        picUrl: h.imgNetSrc + 'carousel/6.png',
        id: '5'
      },
      {
        picUrl: h.imgNetSrc + 'carousel/7.png',
        id: '6'
      },
      {
        picUrl: h.imgNetSrc + 'carousel/8.png',
        id: '7'
      },
      {
        picUrl: h.imgNetSrc + 'carousel/9.png',
        id: '8'
      },
      {
        picUrl: h.imgNetSrc + 'carousel/10.png',
        id: '9'
      }
    ]
    _this.setData({
      images: Imgs,
      // persNub: 4,
    })
    console.log(_this.data.images)
    //swiper li 赋值 宽度
    let swiperLiWidth = _this.data.swiperLiWidth;//li宽
    let phoneWidth = _this.data.phoneWidth; //屏幕宽
    swiperLiWidth = phoneWidth / 2;   //li的宽度赋值 三分之一的屏幕宽度
    var arrimages = _this.data.images;//获取图片Arr的数组
    let swiperUlWidth = _this.data.swiperUlWidth; //移动的ul 的宽度
    swiperUlWidth = swiperLiWidth * arrimages.length  //赋值移动的ul 的宽度
    let middlePhoneWidth = swiperLiWidth + 30; // 背景参照物  可不写
    let middlePhoneWidthMarLeft = middlePhoneWidth // 2; 背景参照物 可不写
    //初始化所有的图片的宽度占70%父级宽高
    var arrimages = _this.data.images;
    let styleArr = _this.data.styleArr;

    for (let i = 0; i < arrimages.length; i++) {
      var obj = {
        imgwidth: 70,
        imgheight: 70,
        animationliscal: ""
      }
      styleArr.push(obj)
    }
    styleArr[arrimages.length - 1] = {
      imgwidth: 100,
      imgheight: 100,
      animationliscal: ""
    };
    // 传输data 赋值  这样写不知道对不对
    _this.setData({
      styleArr: styleArr,
      swiperUlWidth: swiperUlWidth,
      swiperLiWidth: swiperLiWidth,
      middlePhoneWidth: swiperLiWidth + 30,
      middlePhoneWidthMarLeft: middlePhoneWidthMarLeft
    })
  },
  startTou: function (e) {
    let _this = this;
    _this.data.startClientX = e.touches[0].clientX;  //触摸按下 距离屏幕左边的值
  },
  scroll: function (e) {
    let _this = this;
    _this.data.endClientX = e.touches[0].clientX; //滑动值  
  },
  endTou: function (e) {
    let _this = this;
    // API animation 滑动动画创建
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    var swiperLiWidthLeft = _this.data.swiperLiWidth;
    this.animation = animation;
    let startClientX = _this.data.startClientX;
    let endClientX = _this.data.endClientX;
    let phoneWidth = _this.data.phoneWidth;
    if (endClientX == 0) {   //move的值为0 时定为点击   
      //点击的时候 点左边,左边的小图,移动到中间变大 点击右边的时候 同理
      if (startClientX < phoneWidth / 2 - 70) {  //点击开始的位置,与图片的一半减70px  为左边点击
        this.animation = animation;
        animation.left(_this.data.swiperLeft).step() //移动动画
        let imgindex = _this.data.imgindex - 1; //下标值
        if (imgindex < 0) {
          console.log("超出了最小数组长度")
          return;
        }
        _this.setData({
          swiperLeft: _this.data.swiperLeft + swiperLiWidthLeft,  //ul向右移动值
          imgindex: _this.data.imgindex - 1, //下标值
          animationData: animation.export()
        })
        console.log("左边点击" + _this.data.imgindex)
      } else if (startClientX > phoneWidth / 2 + 70) {   //点击开始的位置,与图片的一半减70px  为右边点击
        let imgindex = _this.data.imgindex + 1;
        if (imgindex > _this.data.images.length - 1) {
          console.log("超出了数组最大长度")
          return;
        }
        console.log("右边点击" + _this.data.imgindex)
        animation.left(_this.data.swiperLeft).step()  //移动动画
        _this.setData({
          swiperLeft: _this.data.swiperLeft - swiperLiWidthLeft,//UL向左移动
          imgindex: _this.data.imgindex + 1, //下标的值
          animationData: animation.export()
        })
      } else {   //点击中间的大图,带参跳入图片的详情
        let imgindexclick = _this.data.imgindex;
        let picUrl = _this.data.images[imgindexclick].picUrl
        let clicks = _this.data.images[imgindexclick].clicks;
        let picUpTime = _this.data.images[imgindexclick].picUpTime;
        let picId = _this.data.images[imgindexclick].picId;
        // wx.navigateTo({
        //   url: './../PictDetails/PictDetails?picUrl=' + picUrl
        // })
      }
    } else {  //滑动左边 ul向左移动 右边的小图放大  滑动右边ul向右移动 右边的小图放大
      if (endClientX - startClientX > 0) {
        let imgindex = _this.data.imgindex - 1;
        if (imgindex < 0) {
          console.log("超出了")
          return;
        }
        animation.left(_this.data.swiperLeft).step() //移动动画
        _this.setData({
          swiperLeft: _this.data.swiperLeft + swiperLiWidthLeft, //右边滑动 ul向右移动
          imgindex: _this.data.imgindex - 1,
          animationData: animation.export()
        })
        console.log("右边滑动" + _this.data.imgindex)
      }
      if (endClientX - startClientX < 0) {
        let imgindex = _this.data.imgindex + 1;
        if (imgindex > _this.data.images.length - 1) {
          console.log("超出了")
          return;
        }
        this.animation = animation
        animation.left(_this.data.swiperLeft).step() //移动动画
        _this.setData({
          swiperLeft: _this.data.swiperLeft - swiperLiWidthLeft,  //左边滑动 ul向左移动
          imgindex: _this.data.imgindex + 1, //下标的值
          animationData: animation.export()
        })
        console.log("左边滑动" + _this.data.imgindex)
      }
    }
    //修改中间大图的宽高 
    let NewstyleArr = _this.data.styleArr;
    for (let a = 0; a < NewstyleArr.length; a++) {
      if (a == _this.data.imgindex) {
        NewstyleArr[_this.data.imgindex] = {
          imgwidth: 100,
          imgheight: 100,
          animationliscal: ""
        };
      } else {
        NewstyleArr[a] = {
          imgwidth: 70,
          imgheight: 70,
          animationliscal: ""
        };
      }
    }
    _this.setData({
      startClientX: 0,
      endClientX: 0,
      styleArr: NewstyleArr
    })
  }
})
