<!--  -->
<template>
  <div class="newlist-newdetail">
    <h1 class="newdetail-title">{{article.title}}</h1>
    <div class="user">
    <img  class="avator" v-if="article.n_user" :src="article.n_user.avator" alt="">
    <div class="newdetail-userinfo">
        <span class="nickname" v-if="article.n_user" >{{article.n_user.nickname}} </span> 
       <span class="created-at">{{article.created_at}}</span>
    
    </div>
     </div> 
    <div class="content">
      <div class="user-img" v-if="article.imgs" v-for="(img,index) in article.imgs" :key="index">
          <div class="user-img-item"> 
             <img :src="img" alt="">
            </div>
           
      </div>
        <div class="user-content" v-html="article.content"></div>
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
    return {
      article: {},
      
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
   
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
     let nid = this.$router.history.current.query.nid;
    this.$axios
      .post("getArticleById", {
        nid: nid
      })
      .then(res => {
        console.log(res);
        this.$message({
          msg: res.msg
        });
        this.article = res.article;
        
        console.log(this.article)
      });
  },
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
.newlist-newdetail {
  padding: 20px;
  .newdetail-title {
   
    height: 60px;
  }

  .user {
    display: flex;
  .avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }

  .newdetail-userinfo {
    display: flex;
    flex-direction: column;
    padding: 20px;
  
    // justify-content: space-around;
   .nickname {
     flex: 4;
     text-align: center;
    }

    .created-at {
      flex: 6;
       
    }
  }
}
  .content {
    margin-top: 30px;
    display: flex;
     .user-img {
      .user-img-item {
        img {
        width: 150px;
        
        }
      }
    }
    .user-content {
      margin-left: 10px;
      font-size: 18px;
       width: 10em;
       text-indent: 2em;
    }

   
  }
}
</style>