import axios from 'axios';
// import { Message } from 'element-ui';
import { Toast } from 'mint-ui';
import router from '../router';
import store from '../store';

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
  return new Promise((resolve) => {
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
        resolve(response.data);
      })
      .catch(error => {
        if (error.response.status === 401) {
          Toast('登录失效，请重新登录');
          router.push('/login2');
        } else {
          Toast(error.response.data.error.message);
        }
      });
  });
}

// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    // store.commit('changeLoadValue', true);
    config.headers.Authorization = 'Bearer ' + store.state.access_token;
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
    // 对响应数据做点什么
    // store.commit('changeLoadValue', false);

    return config;
  },
  error => {
    // 对响应错误做点什么
    // store.commit('changeLoadValue', false);

    return Promise.reject(error);
  }
);

export function gettime(date) {
  const d = new Date(date);
  const yy = d.getFullYear();
  const mm = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
  const dd = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
  const hh = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
  const ss = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
  const ff = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
  return yy + '-' + mm + '-' + dd + ' ' + hh + ':' + ss + ':' + ff;
}

export function getversion(version) {
  const arr = version.split('.');
  console.log(arr);
  const math = Number(arr[2]) + 1;
  if (math > 9) {
    arr[2] = 1;
    const math2 = Number(arr[1]) + 1;
    if (math2 > 9) {
      arr[1] = 1;
      arr[0] = Number(arr[0]) + 1;
    } else {
      arr[1] = Number(arr[1]) + 1;
    }
  } else {
    arr[2] = Number(arr[2]) + 1;
  }
  return arr.join('.');
}
