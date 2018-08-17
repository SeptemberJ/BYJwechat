var Promise = require('./blue')

// promise
function wxPromisify(fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        resolve(res)
      }

      obj.fail = function (res) {
        reject(res)
      }

      fn(obj)
    })
  }
}

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const CompareDate = (date1, date2)=>{
  return ((new Date(date1.replace(/-/g, "\/"))) > (new Date(date2.replace(/-/g, "\/"))));
}

const objDeepCopy = (source)=> {
  var sourceCopy = source instanceof Array ? [] : {};
  for (var item in source) {
    sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item];
  }
  return sourceCopy;
}

function GetStrLength (str){
  var jmz = {};
  jmz.GetLength = function (str) {
    return str.replace(/[\u0391-\uFFE5]/g, "aa").length;  //先把中文替换成两个字节的英文，在计算长度
  };
  return jmz.GetLength(str)
}
function UrlEncode(str) {

  return transform(str);

}

function UrlEncode(str) {

  return transform(str);

} 

function transform(s) {

  var hex = ''

  var i, j, t



  j = 0

  for (i = 0; i < s.length; i++) {

    t = hexfromdec(s.charCodeAt(i));

    if (t == '25') {

      t = '';

    }

    hex += '%' + t;

  }

  return hex;

}



function hexfromdec(num) {

  if (num > 65535) { return ("err!") }

  var first = Math.round(num / 4096 - .5);

  var temp1 = num - first * 4096;

  var second = Math.round(temp1 / 256 - .5);

  var temp2 = temp1 - second * 256;

  var third = Math.round(temp2 / 16 - .5);

  var fourth = temp2 - third * 16;

  return ("" + getletter(third) + getletter(fourth));

} 

function getletter(num) {

  if (num < 10) {

    return num;

  }

  else {

    if (num == 10) { return "A" }

    if (num == 11) { return "B" }

    if (num == 12) { return "C" }

    if (num == 13) { return "D" }

    if (num == 14) { return "E" }

    if (num == 15) { return "F" }

  }

} 

//image
function imageUtil(ImgW, ImgH,needW,needH) {

  var imageSize = {};

  var originalWidth = ImgW ? ImgW:650;//图片原始宽  

  var originalHeight = ImgH ? ImgH: 975;//图片原始高  

  var originalScale = originalHeight / originalWidth;//图片高宽比  

  var windowWidth = needW;
  var windowHeight = needH;
  var windowscale = windowHeight / windowWidth;//屏幕高宽比  
  if (originalScale < windowscale) {//图片高宽比小于屏幕高宽比  
    console.log('宽小了，图片缩放后的宽为屏幕宽-----')
    console.log('需要的高' + windowHeight)
    console.log('现在的高' + originalHeight)
    console.log('需要的宽' + windowWidth)
    console.log('现在的宽' + originalWidth)
    //console.log('调整后宽' + windowWidth + '调整后高' + (windowWidth * originalHeight) / originalWidth)
    //图片缩放后的宽为屏幕宽  
    imageSize.imageWidth = windowWidth;
    imageSize.imageHeight = (windowWidth * originalHeight) / originalWidth;
    // imageSize.imageHeight = ((windowWidth * originalHeight) / originalWidth) < windowHeight ? windowHeight : ((windowWidth * originalHeight) / originalWidth);
  } else {//图片高宽比大于屏幕高宽比  
    console.log('高小了，图片高宽比大于屏幕高宽比-----')
    console.log('需要的高' + windowHeight)
    console.log('现在的高' + originalHeight)
    console.log('需要的宽' + windowWidth)
    console.log('现在的宽' + originalWidth)
    //console.log('调整后宽' + (windowHeight * originalWidth) / originalHeight + '调整后高' + windowHeight)
    //图片缩放后的高为屏幕高  
    imageSize.imageHeight = windowHeight;
    imageSize.imageWidth = (windowHeight * originalWidth) / originalHeight;

  }
  console.log('缩放后的宽: ' + imageSize.imageWidth)
  console.log('缩放后的高: ' + imageSize.imageHeight)
  return imageSize;
}

module.exports = {
  formatTime: formatTime,
  wxPromisify: wxPromisify,
  CompareDate: CompareDate,
  objDeepCopy: objDeepCopy,
  GetStrLength: GetStrLength,
  UrlEncode: UrlEncode,
  imageUtil: imageUtil
}
