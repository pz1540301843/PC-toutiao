// 引入Vue
import Vue from "vue";
// 引入vuex
import Vuex from "vuex";

// 在  Vue 里面使用Vuex
Vue.use(Vuex);
// 定义用户信息的键名
let storageKey = "userInfo";
// 获取用户信息
const state = {
  userInfo: JSON.parse(localStorage.getItem(storageKey)) || {},
};
// 存储用户信息
const mutations = {
  updateUserInfo: function (state, userInfo) {
    localStorage.setItem(storageKey, JSON.stringify(userInfo));
    state.userInfo = userInfo;
  },
};
export default new Vuex.Store({ state, mutations });
