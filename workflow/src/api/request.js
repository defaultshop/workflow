// 返回值是一个promise对象

import axios from 'axios';
import baseUrl from './env';
// import store from '../store';
import { Message } from 'element-ui';

// 请求的接口前缀
axios.defaults.baseURL = baseUrl;
// 传过去的头部信息类型
axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.timeout = 30000; // 设置接口超时时间

// 封装字符串 String 类型的原型链方法
String.prototype.get = function(options) {
  // this：url
  return request(this, 'get', options);
};
String.prototype.post = function(options) {
  return request(this, 'post', options);
};
String.prototype.put = function(options) {
  return request(this, 'put', options);
};
String.prototype.delete = function(options) {
  return request(this, 'delete', options);
};

export default function request(url, type, data = {}) {
  return new Promise((resolve, reject) => {
    // 执行异步请求
    let promise;

    if (type === 'get') {
      // 发送请求
      promise = axios.get(url, data);
    } else if (type === 'post') {
      promise = axios.post(url, data);
    } else if (type === 'put') {
      promise = axios.put(url, data);
    } else if (type === 'delete') {
      promise = axios.delete(url, data);
    }

    promise
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        //   ------------- 请求的 状态码 != 200 会进这里
        //   ------------- 请求的 状态码 != 200 会进这里
        console.log(error,'error');
        reject(error);
        if (
          error.config.url.indexOf('File/UploadForBase64') > -1 &&
          error.response == undefined
        ) {
          Message.error('上传的图片过大！');
        } else if (
          error.response.status == 500 &&
          error.response.data.error.code == -1
        ) {
          Message.error(error.response.data.error);
        } else {
          Message.error('网络错误，请稍后重试');
        }
      });
  });
}

// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    // store.commit('changeLoadValue', true);

    let token = sessionStorage.getItem('accessToken');

    //  设置 token 到 头部
    if (token) {
      config.headers.Authorization =  'Bearer' + token;
    }

    return config;
  },
  error => {
    // store.commit('changeLoadValue', true);

    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  async config => {
    if (config.data.error) {
      // 201: 跳到首页  402: 跳到验证码页   403: 跳到输入账号密码页   401: 刷新token
      switch (config.data.error.code) {
        case 401:
          sessionStorage.getItem('isLogin', 'no');

          break;
      }
    }

    // 对响应数据做点什么
    // store.commit('changeLoadValue', false);

    //  请求外面的 状态码 == 200，但是里面有错误信息会进入这里
    if (!config.data.success && config.data.error.code != 200) {
      //  失败(这里应该是要一个 this.$Message.error 类似效果的弹出层)
      Message.error(config.data.error.message);
    }
    return config;
  },
  error => {
    // 对响应错误做点什么
    // store.commit('changeLoadValue', false);

    return Promise.reject(error);
  }
);
