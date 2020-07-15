import Vue from "vue";

import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    enum_allData: null, //  所有枚举
    schoolRegisterType: "", // 学校报名类型
    businessTypes: "", // 业务类型
    isLoadShow: false //  正在加载是否需要显示
  },
  mutations: {
    setAllEnum(state, value) {
      state.enum_allData = value;
    },
    setSchoolRegisterType(state, value) {
      state.schoolRegisterType = value;
    },
    setBusinessTypes(state, value) {
      state.businessTypes = value;
    },
    changeLoadValue(state, value) {
      state.isLoadShow = value;
    }
  },
  actions: {}
});
