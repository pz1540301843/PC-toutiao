<!--  -->
<template>
  <div class="index-newslist">
    <button class="newslist-renovate" @click.stop="newrefresh">刷新</button>
    <div class="newslist-item" v-for="article in articles"
     :key="article.nid"
     @click.stop="goNewsDetail(article.nid)"
     >
      <div class="item-left" v-if="article.img">
        <img class="left-img" :src="article.img" alt />
      </div>
      <div class="item-right">
        <div class="right-delete-article">{{article.title}}</div>
        <div class="right-user">
          <img class="right-user-img" :src="article.user.avator"></img>
          <div class="right-name">{{article.user.nickname}}</div>
        </div>
        <div class="right-time">{{article.created_at}}</div>
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
    return {
      // 最新的一条资讯的id,默认为0
      lastid:0,
      // 当前文章列表
      articles:[],
      // 当前分页页码
      page:0,
      // 一次请求的文章条数
      number:20,
      // 当滚动到底部时判断是否已有请求
      is_loading:false
    };
  },
  //监听属性 类似于data概念
  computed: {
   
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 获取最新资讯
    newrefresh() {
      this.$axios.post("/getArticles",{
        lastid:this.lastid,
          
       
      }).then( res => {
        console.log(res)
        // 最新的资讯列表等于新发布资讯拼接之前发布的资讯
       this.articles = (res.articles || []).concat(this.articles);
        if (this.articles.length > 0) {
            // 获取最后一条文章或头条的 id
            this.lastid = this.articles[0].nid;
          }
      })
    },
    goNewsDetail(nid) {
     this.$router.push({
       name:"newsDetail",
       query:{
         nid:nid
       }
     })
    },
    // 默认请求的数据
    refresh() {
      // 当滚动到底部时已有一次或以上的数据请求 则暂不执行请求
      if(this.is_loading) {
        return false
      }
      this.is_loading = true
      this.$axios.post("/getArticles",{
        lastid:0,
        page: this.page++,
        number:this.number
         
      }).then( res => {
        console.log(res)
        // 最新的资讯列表等于新发布资讯拼接之前发布的资讯
       this.articles =   (this.articles) .concat (res.articles || []);
      // 设置当前页码 如果有新的内容则当前页码为返回的页码 如果没有新的页码则为上一个页码
      this.page = res.articles.length ? this.page : --this.page
        if(res.counts/this.number <= res.current_page) {
          this.$message({
            msg : "已经到最后一页了"
          })
        }
    
    
      }).catch(err=> {console.log(err)}).finally(()=>{this.is_loading=false})
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    let _this = this 
    window.addEventListener("scroll" , () => {
      // 添加页面的滚动事件
          // 1.获取整个屏幕可以滚动的高度
          let htmlElement = document.scrollingElement // 获取html页面
          let scrollHeight = htmlElement.scrollHeight //获取html页面可以滚动的高度
          // 2.获取当前已经滚动的距离
          let scrollTop = htmlElement.scrollTop
          // 3.获取当前浏览器可视区的高度
          let clientHeight = htmlElement.clientHeight
          // scrollHeight-scrollTop<=clientHeight 
          // 可以滚动的距离减去已经滚动的距离如果小于整个可视区的高度说明已经触底
          console.log(scrollHeight-scrollTop <= clientHeight ? "触底" : "未触底")
          // 如果触底则加载新内容
          scrollHeight-scrollTop <= clientHeight ? _this.refresh() : ""
    })
   

    this.refresh()
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
.index-newslist {
    width: 100%;
 .newslist-renovate {
     border: 1px solid #3192d5;
     background-color: #ffffff;
     color: #3192d5;
     height: 30px;
     width: 100%;
     line-height: 30px;
     border-radius: 5px;
    margin-bottom: 10px;

  }

  .newslist-item {
      height: 100px;
      display: flex;
     
      border-bottom: 1px solid #ccc;
    .item-left {
         padding: 5px 5px;
        flex: 1;
        width: 120px;

      img.left-img {
          width: 100%;
          height: 100%;
      }
    }

    .item-right {
       flex: 2;
       
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      .right-delete-article {
          font-weight: 700;
          text-align: left;
      }

      .right-user {
          height: 30px;
          display: flex;
          align-items: center;
        img.right-user-img {
           
            width: 30px;
            height: 100%;
            border-radius: 50%;
           
        }

        .right-name {
         width: 100px;
        color: #7b7b7b;
        }
      }

      .right-time {
        color: #7b7b7b;
      }
    }
  }
}
</style>