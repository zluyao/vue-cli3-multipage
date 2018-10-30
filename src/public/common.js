!function (e) {
  var cl = null;

  function o() {
    var d = e.document, a = d.documentElement;
    var c = a.getBoundingClientRect().width > 750 ? 750 : a.getBoundingClientRect().width, b = c / (750 / 100);
    a.style.fontSize = b + "px";
  }

  window.addEventListener("resize", () => {
    clearTimeout(cl), cl = setTimeout(o, 300);
  }, !1), o();
  
}(window);

import Vue from 'vue';
import VueResouce from 'vue-resource';
import WebStorageCache from 'web-storage-cache';
import WebCookie from 'vue-cookie';
import messageBoxVue from 'components/message-box.vue';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import conf from './conf';
import device from './device';
import app from './app';
import Highcharts from 'highcharts';
import IScrollView from 'vue-iscroll-view';
import IScroll from 'iscroll';

require('highcharts/modules/exporting')(Highcharts);

Vue.use(VueAwesomeSwiper);
Vue.use(VueResouce);
Vue.use(WebCookie);
Vue.use(IScrollView, IScroll);

// 设备判断
!function setDeviceClass(e) {
  var d = e.document, a = d.documentElement;
  a.className = device.classNames.join(" ");
}(window);

//触底
Vue.directive('scroll', {
  bind: (el, binding) => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop + window.innerHeight >= document.getElementById('appMain').clientHeight) {
        let fnc = binding.value;
        fnc();
      }
    });
  }
});

// 根据域名转图片域名
Vue.filter('settel', (val) => {
  return `${val.substring(0, 3)} ${val.substring(3, 7)} ${val.substring(7, 11)}`;
});

// 手机号码
Vue.filter('setimg', (val) => {
  return `${location.protocol}//${val.split('://')[1]}`;
});

//请求开始前
Vue.http.interceptors.push((request, next) => {
  let timeout;
  if (request._timeout) {
    timeout = setTimeout(() => {
      next(request.respondWith(request.body, {
        status: 408,
        statusText: '请求超时'
      }));
    }, request._timeout);
  }
  next((response) => {
    return response;
  });
});

// 弹窗
const MessageBoxConstructor = Vue.extend(messageBoxVue);

let MessageBox = {};
let instance = new MessageBoxConstructor({
  el: document.createElement('div'),
});

MessageBox.alert = (message, title, options) => {
  if (typeof title === 'object') {
    options = title;
    title = '';
  }
  options = common.merge({
    title: title ? title : '',
    message: message,
    confirmButtonText: '知道啦'
  }, options);

  if (!instance.show) {
    for (let prop in options) {
      if (options.hasOwnProperty(prop)) {
        instance[prop] = options[prop];
      }
    }
    instance.callback = msgbox => {
      msgbox.show = false;
      options.callback && options.callback();
    };

    document.body.appendChild(instance.$el);

    Vue.nextTick(() => {
      instance.show = true;
    });
  }
};

var common = {
  MsgBox: MessageBox,
  wsCache: new WebStorageCache(),

  // 判断版本
  retrueisnow(v, a) {
    const list = v.split('.');
    const newlist = a.split('.');
    let state = '';
    if (newlist[0] > list[0]) {
      state = true;
    } else if (newlist[0] == list[0]) {
      if (newlist[1] > list[1]) {
        state = true;
      } else if (newlist[1] == list[1]) {
        if (newlist[1] >= list[1]) {
          state = true;
        } else {
          state = false;
        }
      } else {
        state = false;
      }
    } else {
      state = false;
    }
    return state;
  },

  ajax(options) {
    let data = options.data || {};
    if (!options.noCode) {
    }
    let error = (err) => {
      if (err.status === 0) {
        common.MsgBox.alert("网络异常,请刷新重试");
      }
      if (err.status === 504) {
        common.MsgBox.alert("网络异常,请刷新重试");
      }
      if (err.status === 408) {
        common.MsgBox.alert('请求超时,请刷新重试');
      }
      if (err.status === 500) {
        common.MsgBox.alert("系统错误，请稍后再试");
      }
      options.error && options.error(err);
    }
    if (options.type == "post") {
      Vue.http.post(options.url, data, {
        emulateJSON: false,
        headers: options.headers,
        withCredentials: false,
        _timeout: 10 * 1000
      }).then((response) => {
        common.ajaxResultFilter(response, options)
      }, error);
    }
    if (options.type == "get") {
      Vue.http.get(options.url, {
        params: data,
        headers: options.headers,
        withCredentials: false,
        _timeout: 10 * 1000
      }).then((response) => {
        common.ajaxResultFilter(response, options)
      }, error);
    }
  },

  ajaxResultFilter(response, options) {
    if (!response.body) return;
    let status = response.body.code;
    options.complete && options.complete(response);
    if (status == 0) {
      options.success && options.success(response.body)
    } else {
      // 判断是否弹出接口错误
      if (!options.noAlert && response.body.errorMsg) {
        common.MsgBox.alert(response.body.errorMsg, '', {
          callback: () => options.errorCallBack && options.errorCallBack(response),
        });
      }
    }
  },

  getUrlParam(name) {
    if (name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
      var r = window.location.search.substr(1).match(reg);  //匹配目标参数
      if (r != null) return unescape(r[2]);
      return null; //返回参数值
    } else {
      var url = location.search; //获取url中"?"符后的字串
      var theRequest = new Object();
      if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        if (str.indexOf("&") != -1) {
          strs = str.split("&");
          for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
          }
        } else {
          theRequest[str.split("=")[0]] = unescape(str.split("=")[1]);
        }
      }
      return theRequest;
    }
  },

  /*校验身份证*/
  checkIdCard(IDCard) {
    let isIDCard = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|x|X)$/;
    if (isIDCard.test(IDCard)) {
      return true;
    } else {
      return false;
    }
  },

  /*校验手机*/
  checkPhone(tel) {
    var phone = /^1(2|3|4|5|6|7|8)[0-9]{9}$/;
    if (phone.test(tel)) {
      return true;
    } else {
      return false;
    }
  },

  /*校验验证码*/
  checkNum(num) {
    var number = /^\d{6}$/;
    if (number.test(num)) {
      return true;
    } else {
      return false;
    }
  },

  /*校验数字*/
  checkNums(num) {
    var phone = /^[0-9]*[1-9][0-9]*$/;
    if (phone.test(num)) {
      return true;
    } else {
      return false;
    }
  },

  setcookie(name, value, days) {
    var d = new Date;
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
    window.document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
  },
  getcookie(name) {
    var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
  },
  deletecookie(name) {
    this.set(name, '', -1);
  },

  trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
  },
  // 合并对象
  merge(target) {
    // arguments 类数组对象
    for (let i = 1, j = arguments.length; i < j; i++) {
      let source = arguments[i] || {};
      for (let prop in source) {
        if (source.hasOwnProperty(prop)) {
          let value = source[prop];
          if (value !== undefined) {
            target[prop] = value;
          }
        }
      }
    }
    return target;
  },

  random() {
    return Math.random().toString(36).substr(2) + Date.now().toString(36);
  }
};
module.exports = common;
