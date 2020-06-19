<!--  -->
<template>
  <div>
    <div class="tt-index-not-login" v-if="!userInfo.oauth_token">
      <p class="login-p">登录后可以保存您的浏览器喜好、评论、收藏，并预APP同步，更可以发布微头条</p>
      <button class="login-button" @click.stop="goUserLogin">登录</button>
    </div>
    <div class="tt-index-login " v-else>
      <div class="logout " @click.stop="logout">退出登录</div>
      <div class="clearfix"></div>
      <div class="imagerWrapper ">
        <img :src="userInfo.avator" alt @click.stop="userDetails"/>
      </div>
      <div class="nickname">{{userInfo.nickname}}</div>
      <div class="button">
        <div class="left">
          <div class="count">{{userInfo.tt_count}}</div>
          <div class="text">头条数</div>
        </div>
        <div class="right">
          <div class="count">{{userInfo.article_count}}</div>
          <div class="text">文章数</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {
    userInfo: function() {
      return this.$store.state.userInfo;
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    goUserLogin() {
      this.$router.push({
        path: "/userLogin"
      });
    },
    // 退出登录
    logout() {
      this.$axios.post("./logout").then(res => {
        this.$message({
          msg: res.msg
        });
        this.$store.commit("updateUserInfo", {});
      });
    },
    // 用户详情页面
    userDetails() {
      this.$router.push({
        name:"userCenter"
      })
    }
  },
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
.clearfix:after {
  /*伪元素是行内元素 正常浏览器清除浮动方法*/
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.clearfix {
  *zoom: 1; /*ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行*/
}

.tt-index-not-login {
  width: 350px;
  height: 250px;
  border: 1px solid #ddd;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 50px 45px;
  .login-p {
    font-size: 12px;
    color: #7b7b7b;
    text-align: center;
  }

  .login-button {
    width: 250px;
    height: 40px;
    background-color: var(--themeColor);
    border: 1px solid #ddd;
    border-radius: 5px;
    color: #ffffff;
    font-size: 16px;
  }
}
.tt-index-login {
  width: 350px;
  height: 150px;
 
  padding: 5px;
 
  border: 1px solid #ccc;
 
  .logout {
    
     float: right;
    font-size: 14px;
    color: #c7c7c7;
   
  }

 
  .imagerWrapper {
      
       text-align: center;
    img {
     
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }

  .nickname {
    text-align: center;
  }

  .button {
    display: flex;
    justify-content: space-around;
    .left {
      text-align: center;
     
      .count {
        
      }

      .text {

      }
    }

    .right {
      text-align: center;
      .count {
      }

      .text {
      }
    }
  }
}
</style>