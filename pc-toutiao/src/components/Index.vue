<!--  -->
<template>
  <div class="tt-index">
    <div class="tt-index-header">
      <Header></Header>
    </div>
    <div class="tt-index-center">
      <div class="center-left">
        <Nav class="left-nav"></Nav>
      </div>
      <div class="center-middle">
        <Post class="middle-post"></Post>
        <NewsList class="middle-newslist"></NewsList>
      </div>
      <div class="center-right">
        <Searchinput class="right-searchinput"></Searchinput>
        <Login class="right-login"></Login>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Header from "./header/Header";
import Nav from "./nav/Nav";
import Searchinput from "./searchinput/Searchinput";
import Login from "./login/Login";
import Post from "./post/Post";
import NewsList from "./newslist/NewsList";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Header,
    Nav,
    Searchinput,
    Login,
    Post,
    NewsList
  },
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less' scoped>
.tt-index {
  .tt-index-header {
    header {
    }
  }

  .tt-index-center {
    display: flex;
    padding: 10px 5vw 10px 10vw;
    .center-left {
      flex: 1;

      .left-nav {
        margin: 0 auto;
      }
    }

    .center-middle {
      flex: 2;
      .middle-post {
        margin-top: 20px;
      }
      .middle-newslist {
        margin-top: 10px;
      }
    }

    .center-right {
      flex: 2;
      .right-searchinput {
      }
    }
  }
}
</style>