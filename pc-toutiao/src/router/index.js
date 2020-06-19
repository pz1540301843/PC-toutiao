// 引入 Vue
import Vue from "vue";
// 引入路由组件
import VueRouter from "vue-router";
// 将VueRouter添加发哦Vue使用
Vue.use(VueRouter);
// 引入主页文件
import Index from "../components/Index";
// 引入登录页组件
import UserLogin from "../components/login/UserLogin.vue";
//引入注册页组件
import UserEnroll from "../components/login/UserEnroll.vue";
// 引入文章列表详情页
import NewsDetail from "../components/newslist/NewsDetail.vue";
// 引入用户界面组件
import UserCenter from "../components/user/UserCenter.vue";
// 引入用户设置组件
import UserData from "../components/user/UserData.vue";
// 引入用户设置组件
// 路由配置文件
let routes = [
  {
    path: "/",
    name: "index",
    component: Index,
  },
  {
    path: "/userLogin",
    name: "userLogin",
    component: UserLogin,
  },
  {
    path: "/userEnroll",
    name: "userEnroll",
    component: UserEnroll,
  },
  {
    path: "/newsDetail",
    name: "newsDetail",
    component: NewsDetail,
  },
  {
    path: "/userCenter",
    name: "userCenter",
    component: UserCenter,
  },
  {
    path: "/userData",
    name: "userData",
    component: UserData,
  },
];
// 创建VueRouter 实例 将routes 作为参数传入

export default new VueRouter({
  routes,
});
