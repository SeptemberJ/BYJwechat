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


module.exports = {
  formatTime: formatTime,
  wxPromisify: wxPromisify,
  CompareDate: CompareDate,
  objDeepCopy: objDeepCopy
}
