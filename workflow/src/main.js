import Vue from 'vue';
import i18next from 'i18next';
import VueI18Next from '@panter/vue-i18next';
// import ModelerApp from './ModelerApp.vue';
import BootstrapVue from 'bootstrap-vue';
import './setup/initialLoad';
import translations from '@/setup/translations.json';
import * as VueDeepSet from 'vue-deepset';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import Newbox from '../src/components/newbox/index.vue';
import flowControlPanel from '../src/components/flowControlPanel/flowControlPanel.vue';

import Messagebox2 from './components/newbox/popup/popup.js';
import KFormDesign from 'k-form-design';
import 'k-form-design/lib/k-form-design.css';
import router from './router';
import App from './App';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import eventConfigPanel from '../src/pages/eventConfigPanel/eventConfigPanel.vue';

import Expression from '../src/pages/expression/expression.vue';
import axios from 'axios';
import store from './store.js';
import { getaxios, gettime } from './api/unit';
import './assets/css/iconfont.css';
import Vuetable from 'vuetable-2';
import Viewer from 'v-viewer';
import 'viewerjs/dist/viewer.css';



import '@fortawesome/fontawesome-free/css/all.min.css';
KFormDesign.setConfig({
  uploadFile: '/resource/baitu-workflows/dynamic-form/upload-file', // 上传文件地址
  uploadImage: '/resource/baitu-workflows/dynamic-form/upload-file', // 上传图片地址
  uploadFileName: '', // 上传文件name
  uploadImageName: '', // 上传图片name
  uploadFileData: {  }, // 上传文件额外参数
  uploadImageData: {  }, // 上传图片额外参数
  uploadFileHeaders: {  }, // 上传文件请求头部
  uploadImageHeaders: {  }, // 上传图片请求头部
});

Vue.use(Viewer);
Viewer.setDefaults({
  Options: {
    'inline': true,
    'button': true,
    'navbar': true,
    'title': true,
    'toolbar': true,
    'tooltip': true,
    'movable': true,
    'zoomable': true,
    'rotatable': true,
    'scalable': true,
    'transition': true,
    'fullscreen': true,
    'keyboard': true,
    'url': 'data-source',
  },
});

Vue.use(ElementUI);
Vue.use(KFormDesign);
Vue.use(Messagebox2);
Vue.use(Vuetable);
Vue.prototype.$axios = axios;
Vue.prototype.$getaxios = getaxios;
Vue.prototype.$gettime = gettime;



console.log(Vue.prototype.$message,'p');
Vue.prototype.$message = (msg)=> {
  console.log(typeof msg);
  if (typeof msg == 'string'){
    ElementUI.Message({message:msg,showClose:true});
  } else {
    ElementUI.Message({...msg,showClose:true});
  }
};
  

Vue.use(BootstrapVue);
Vue.use(ViewUI);

Vue.use(VueDeepSet);

Vue.component('Expression',Expression);
Vue.component('flowControlPanel',flowControlPanel);
Vue.component('Eventflow',eventConfigPanel);
Vue.component('Newbox',Newbox);

Vue.config.productionTip = false;

Vue.use(VueI18Next);

i18next.init({
  lng: 'en',
  resources: { en: { translation: translations } },
});

const i18n = new VueI18Next(i18next);

// new Vue({
//   render: h => h(App),
//   router,
//   i18n,
// }).$mount('#modeler-app');
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#modeler-app');
