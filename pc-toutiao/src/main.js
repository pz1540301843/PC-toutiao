import Vue from 'vue'
import App from './App.vue'
//引入路由配置信息
import router from "./router"
//引入axios
import axios from "./axios/axios"
// 将引入的axios挂载在原型上
Vue.prototype.$axios = axios;
// 引入工具类的提示消息功能模块
import {Message} from "./utils/message"
// 将引入的message挂载在原型上
Vue.prototype.$message = Message;
// 引入vuex 
import store from "./vex/store"
// 将vuex挂载在原型上


//阻止启动生产消息 提示运行（开发/生产）环境
Vue.config.productionTip = false;


new Vue({
  // 配置路由信息
  router,
  store,
  render: h => h(App),
}).$mount('#app')
