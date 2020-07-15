export const isString = o => {
  return Object.prototype.toString.call(o).slice(8, -1) === "String"; //是否字符串
};
export const isObj = o => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Object"; //是否是对象
};
export const isArray = o => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Array"; //是否是数组
};
export const isNumber = o => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Number"; //是否是数字
};
export const isFunction = o => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Function"; //是否是函数
};
export const isNull = o => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Null"; //是否Null
};
export const isUndefined = o => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Undefined"; //是否Undefined
};
export const isBoolean = o => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Boolean"; //是否Boolean
};
export const isDate = o => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Date"; //是否Date
};
/**
 * 判断手机是否是ios
 *
 */
export const isIos = () => {
  var u = navigator.userAgent;
  if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
    //安卓手机
    // return "Android";
    return false;
  } else if (u.indexOf("iPhone") > -1) {
    //苹果手机
    // return "iPhone";
    return true;
  } else if (u.indexOf("iPad") > -1) {
    //iPad
    // return "iPad";
    return false;
  } else if (u.indexOf("Windows Phone") > -1) {
    //winphone手机
    // return "Windows Phone";
    return false;
  } else {
    return false;
  }
};
/**
 * 判断是否是pc
 *
 */
export const isPC = () => {
  var userAgentInfo = navigator.userAgent;
  var Agents = [
    "Android",
    "iPhone",
    "SymbianOS",
    "Windows Phone",
    "iPad",
    "iPod"
  ];
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
};

/**
 * 判断浏览器类型
 *
 */
export const browserType = () => {
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
  var isIE =
    userAgent.indexOf("compatible") > -1 &&
    userAgent.indexOf("MSIE") > -1 &&
    !isOpera; //判断是否IE浏览器
  var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
  var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
  var isSafari =
    userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
  var isChrome =
    userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器
  if (isIE) {
    var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    var fIEVersion = parseFloat(RegExp["$1"]);
    if (fIEVersion == 7) return "IE7";
    else if (fIEVersion == 8) return "IE8";
    else if (fIEVersion == 9) return "IE9";
    else if (fIEVersion == 10) return "IE10";
    else if (fIEVersion == 11) return "IE11";
    else return "IE7以下"; //IE版本过低
  }
  if (isFF) return "FF";
  if (isOpera) return "Opera";
  if (isEdge) return "Edge";
  if (isSafari) return "Safari";
  if (isChrome) return "Chrome";
};

/*判断一个元素是否在数组中*/
export const arr_contains = (arr, val) => {
  return arr.indexOf(val) != -1 ? true : false;
};
/**
 * @param {arr} 数组排序
 * @param {type} 1：从小到大  2：从大到小  3：随机
 * @return {Array}
 */
export const arr_sort = (arr, type = 1) => {
  return arr.sort((a, b) => {
    switch (type) {
      case 1:
        return a - b;
      case 2:
        return b - a;
      case 3:
        return Math.random() - 0.5;
      default:
        return arr;
    }
  });
};
/*数组去重*/
export const arr_unique = arr => {
  if (Array.hasOwnProperty("from")) {
    return Array.from(new Set(arr));
  } else {
    var n = {},
      r = [];
    for (var i = 0; i < arr.length; i++) {
      if (!n[arr[i]]) {
        n[arr[i]] = true;
        r.push(arr[i]);
      }
    }
    return r;
  }
};

/**
 * @param {str}
 * @param {type}
 *    type: 1:首字母大写 2：首页母小写 3：大小写转换 4：全部大写 5：全部小写
 * @return {String}
 */
export const str_changeCase = (str, type) => {
  type = type || 4;
  switch (type) {
    case 1:
      return str.replace(/\b\w+\b/g, function(word) {
        return (
          word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase()
        );
      });
    case 2:
      return str.replace(/\b\w+\b/g, function(word) {
        return (
          word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase()
        );
      });
    case 3:
      return str
        .split("")
        .map(function(word) {
          if (/[a-z]/.test(word)) {
            return word.toUpperCase();
          } else {
            return word.toLowerCase();
          }
        })
        .join("");
    case 4:
      return str.toUpperCase();
    case 5:
      return str.toLowerCase();
    default:
      return str;
  }
};
/**
 * 时间格式化
 */
export const dateFormat = (val, fmt) => {
  if (!val) return "";
  let getDate = new Date(val);
  let o = {
    "M+": getDate.getMonth() + 1,
    "d+": getDate.getDate(),
    "h+": getDate.getHours(),
    "m+": getDate.getMinutes(),
    "s+": getDate.getSeconds(),
    "q+": Math.floor((getDate.getMonth() + 3) / 3),
    S: getDate.getMilliseconds()
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (getDate.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
};
/**
 * 设置localStorage
 */
export const setLocal = (key, val) => {
  var setting = arguments[0];
  if (Object.prototype.toString.call(setting).slice(8, -1) === "Object") {
    for (var i in setting) {
      localStorage.setItem(i, JSON.stringify(setting[i]));
    }
  } else {
    localStorage.setItem(key, JSON.stringify(val));
  }
};
/**
 * 获取localStorage
 */
export const getLocal = key => {
  if (key) return JSON.parse(localStorage.getItem(key));
  return null;
};

export const forEach = (arr, fn) => {
  if (!arr.length || !fn) return;
  let i = -1;
  let len = arr.length;
  while (++i < len) {
    let item = arr[i];
    fn(item, i, arr);
  }
};

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的交集, 两个数组的元素为数值或字符串
 */
export const getIntersection = (arr1, arr2) => {
  let len = Math.min(arr1.length, arr2.length);
  let i = -1;
  let res = [];
  while (++i < len) {
    const item = arr2[i];
    if (arr1.indexOf(item) > -1) res.push(item);
  }
  return res;
};

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的并集, 两个数组的元素为数值或字符串
 */
export const getUnion = (arr1, arr2) => {
  return Array.from(new Set([...arr1, ...arr2]));
};

/**
 * @param {Array} target 目标数组
 * @param {Array} arr 需要查询的数组
 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
 */
export const hasOneOf = (targetarr, arr) => {
  return targetarr.some(_ => arr.indexOf(_) > -1);
};

/**
 * @param {String|Number} value 要验证的字符串或数值
 * @param {*} validList 用来验证的列表
 */
export function oneOf(value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true;
    }
  }
  return false;
}

/**
 * @param {Number} timeStamp 判断时间戳格式是否是毫秒
 * @returns {Boolean}
 */
const isMillisecond = timeStamp => {
  const timeStr = String(timeStamp);
  return timeStr.length > 10;
};

/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} currentTime 当前时间时间戳
 * @returns {Boolean} 传入的时间戳是否早于当前时间戳
 */
const isEarly = (timeStamp, currentTime) => {
  return timeStamp < currentTime;
};

/**
 * @param {Number} num 数值
 * @returns {String} 处理后的字符串
 * @description 如果传入的数值小于10，即位数只有1位，则在前面补充0
 */
const getHandledValue = num => {
  return num < 10 ? "0" + num : num;
};

/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} startType 要返回的时间字符串的格式类型，传入'year'则返回年开头的完整时间
 */
const getDate = (timeStamp, startType) => {
  const d = new Date(timeStamp * 1000);
  const year = d.getFullYear();
  const month = getHandledValue(d.getMonth() + 1);
  const date = getHandledValue(d.getDate());
  const hours = getHandledValue(d.getHours());
  const minutes = getHandledValue(d.getMinutes());
  const second = getHandledValue(d.getSeconds());
  let resStr = "";
  if (startType === "year")
    resStr =
      year +
      "-" +
      month +
      "-" +
      date +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      second;
  else resStr = month + "-" + date + " " + hours + ":" + minutes;
  return resStr;
};

/**
 * @param {String|Number} timeStamp 时间戳
 * @returns {String} 相对时间字符串
 */
export const getRelativeTime = timeStamp => {
  // 判断当前传入的时间戳是秒格式还是毫秒
  const IS_MILLISECOND = isMillisecond(timeStamp);
  // 如果是毫秒格式则转为秒格式
  if (IS_MILLISECOND) Math.floor((timeStamp /= 1000));
  // 传入的时间戳可以是数值或字符串类型，这里统一转为数值类型
  timeStamp = Number(timeStamp);
  // 获取当前时间时间戳
  const currentTime = Math.floor(Date.parse(new Date()) / 1000);
  // 判断传入时间戳是否早于当前时间戳
  const IS_EARLY = isEarly(timeStamp, currentTime);
  // 获取两个时间戳差值
  let diff = currentTime - timeStamp;
  // 如果IS_EARLY为false则差值取反
  if (!IS_EARLY) diff = -diff;
  let resStr = "";
  const dirStr = IS_EARLY ? "前" : "后";
  // 少于等于59秒
  if (diff <= 59) resStr = diff + "秒" + dirStr;
  // 多于59秒，少于等于59分钟59秒
  else if (diff > 59 && diff <= 3599)
    resStr = Math.floor(diff / 60) + "分钟" + dirStr;
  // 多于59分钟59秒，少于等于23小时59分钟59秒
  else if (diff > 3599 && diff <= 86399)
    resStr = Math.floor(diff / 3600) + "小时" + dirStr;
  // 多于23小时59分钟59秒，少于等于29天59分钟59秒
  else if (diff > 86399 && diff <= 2623859)
    resStr = Math.floor(diff / 86400) + "天" + dirStr;
  // 多于29天59分钟59秒，少于364天23小时59分钟59秒，且传入的时间戳早于当前
  else if (diff > 2623859 && diff <= 31567859 && IS_EARLY)
    resStr = getDate(timeStamp);
  else resStr = getDate(timeStamp, "year");
  return resStr;
};

/**
 * @returns {String} 当前浏览器名称
 */
export const getExplorer = () => {
  const ua = window.navigator.userAgent;
  const isExplorer = exp => {
    return ua.indexOf(exp) > -1;
  };
  if (isExplorer("MSIE")) return "IE";
  else if (isExplorer("Firefox")) return "Firefox";
  else if (isExplorer("Chrome")) return "Chrome";
  else if (isExplorer("Opera")) return "Opera";
  else if (isExplorer("Safari")) return "Safari";
};

/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function() {
  if (document.addEventListener) {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.attachEvent("on" + event, handler);
      }
    };
  }
})();

/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off = (function() {
  if (document.removeEventListener) {
    return function(element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    return function(element, event, handler) {
      if (element && event) {
        element.detachEvent("on" + event, handler);
      }
    };
  }
})();

/**
 * 判断一个对象是否存在key，如果传入第二个参数key，则是判断这个obj对象是否存在key这个属性
 * 如果没有传入key这个参数，则判断obj对象是否有键值对
 */
export const hasKey = (obj, key) => {
  if (key) return key in obj;
  else {
    let keysArr = Object.keys(obj);
    return keysArr.length;
  }
};

/**
 * @param {*} obj1 对象
 * @param {*} obj2 对象
 * @description 判断两个对象是否相等，这两个对象的值只能是数字或字符串
 */
export const objEqual = (obj1, obj2) => {
  const keysArr1 = Object.keys(obj1);
  const keysArr2 = Object.keys(obj2);
  if (keysArr1.length !== keysArr2.length) return false;
  else if (keysArr1.length === 0 && keysArr2.length === 0) return true;
  /* eslint-disable-next-line */ else
    return !keysArr1.some(key => obj1[key] != obj2[key]);
};
