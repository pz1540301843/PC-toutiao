import axios from "axios";
// axios.defaults.baseURL = "http://tt.linweiqin.com/api/tt/";

const Axios = axios.create({
  // 配置公共域名部分
  baseURL: "http://tt.linweiqin.com/api/tt/",
  // 配置请求时间
  timeout: 20000,
});

// 请求拦截器
Axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    // 返回时路由拦截处理

    // 查看是否有data属性
    console.log(config.data);
    // console.log(config.data.oauth_token);
    // 建立一个变量data 来对config.data做处理
    let data = config.data || {}; //如果有就用里面的data，没有就新建一个空对象
    // 获取本地用户数据
    let userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
    // 获取本地用户数据里的token数据
    let oauth_token = userInfo["oauth_token"] || "";
    // 若果有数据则  将token数据添加到每次请求到的config.data中
    if (oauth_token)
      // 设置 data里的oauth_token 为 获取到的oauth_token值
      data["oauth_token"] = oauth_token;
    config.data = data;
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// 响应的拦截器
Axios.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default Axios;
