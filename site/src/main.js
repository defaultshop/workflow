// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import "babel-polyfill";
import Es6Promise from "es6-promise";
import moment from "moment";
import ViewUI from "view-design";

import "view-design/dist/styles/iview.css"
import '@/assets/css/basic.css'
import '@/assets/css/iconfont.css'
import '@/assets/css/style.less'

require("es6-promise").polyfill();
Vue.use(ViewUI);

import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer)
Vue.use(Viewer, {
    defaultOptions: {
        zIndex: 9999,
        title: false
    }
})

import * as until from '@/common/until.js'
Vue.prototype.$until = until

import * as common from '@/common/common.js'
Vue.prototype.$common = common

import store from '@/vuex/store';


Es6Promise.polyfill();
Vue.config.productionTip = false;
Vue.config.productionTip = false;
Vue.filter("dateformat", (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") => {
  return moment(dataStr).format(pattern);
});
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
