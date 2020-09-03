import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import scroll from 'vue-seamless-scroll';
import { setCookie, getCookie, delCookie } from '@/network/cookie.js';
import KFormDesign from 'k-form-design';
import 'k-form-design/lib/k-form-design.css';
import VueWechatTitle from 'vue-wechat-title';

import '@/assets/css/iconfont.css';
import '@/assets/css/basic.css';
import '@/assets/css/common.less';

Vue.use(VueWechatTitle);
Vue.use(MintUI);
Vue.use(scroll);
Vue.use(KFormDesign);

Vue.config.productionTip = false;
Vue.prototype.$setCookie = setCookie;
Vue.prototype.$getCookie = getCookie;
Vue.prototype.$delCookie = delCookie;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
