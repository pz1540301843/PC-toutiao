<!--  -->
<template>
  <div class="user-center">
    <div class="center-header">
      <img class="userimg" :src="userInfo.avator"></img>
      <span class="username">{{userInfo.nickname}}</span>
      <button class="button" @click.stop="goUserData">编辑</button>
    </div>
    <div class="center-content">
        <div class="user-tabs" >
            <div :class="['tabs-item' ,{'active': nav.id == tabnav}]" 
            v-for="nav in navs" :key="nav.id"
            @click.stop="changetab(nav.id)"
            >{{nav.title}}</div>
        </div>
        <div class="user-content">
            <div class="content-tt" v-if="tabnav == 1">
                <div class="tt-item" v-for="tt in articlestt" :key = "tt.nid">
                  <div class="item-user">
                    <img class="user-url" :src= "userInfo.avator"></img>
                    <div class="user-name">{{userInfo.nickname}}</div>
                  </div>
                  <div class="item-contents">
                  <div class="item-content">{{tt.content}}</div>
                  <img class="item-img" :src="tt.img" v-if="tt.img"></img>
                  </div>
                  <div class="item-battom">
                    <div class="time">{{tt.created_at}}</div>
                    <div class="delete" @click.stop="deletetime(tt.nid)">删除</div>
                  </div>
                </div>
            </div>
             <div class="content-article" v-if="tabnav == 2">
                <div class="tt-item" v-for="tt in articlesArticle" :key = "tt.nid">
                  <div class="item-user">
                    <img class="user-url" :src= "userInfo.avator"></img>
                    <div class="user-name">{{userInfo.nickname}}</div>
                  </div>
                  <div class="item-contents">
                    <div class="title">
                      <span class="tt">标题</span>
                      <span class="item-title">{{tt.title}}</span>
                    </div>
                  
                  <div class="item-content" v-html="tt.content"></div>
                 
                  </div>
                  <div class="item-battom">
                    <div class="time">{{tt.created_at}}</div>
                    <div class="delete" @click.stop="deletetime(tt.nid)">删除</div>
                  </div>
                </div>
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
    return {
      navs:[
        {id:1, title:"微头条"},
        {id:2, title:"文章"}
      ],
      tabnav:1,
      articlestt:[],
      articlesArticle:[]
    };
  },
  //监听属性 类似于data概念
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    changetab(id) {
      this.tabnav = id
    },
    goUserData() {
      this.$router.push({
        name:"userData"
      })
    },
    deletetime(nid) {
      this.$axios.post("deleteArticle",{
        nid:nid
      }).then(res => {
        console.log(res)
        this.$message({
          msg:res.msg
        })
        if(res.status ==0) {
          let index =this.articlestt.findIndex( v => v.nid == nid) 
          if(index != -1) {
            this.articlestt.splice(index , 1)
            let userInfo = this.$store.state.userInfo
            userInfo.tt_count--

              this.$store.commit("updateUserInfo" ,userInfo )
             return true;
          }
          
        }
        if(res.status ==0) {
          let index =this.articlesArticle.findIndex( v => v.nid == nid) 
          if(index != -1) {
            this.articlesArticle.splice(index , 1)

            let userInfo = this.$store.state.userInfo
            userInfo.article_count--

              this.$store.commit("updateUserInfo" ,userInfo )

          }
           return true;
        }
      })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.$axios.post("/getArticlesByType",{
      type:"TT"
    }).then(res => {
      // console.log(res)
      this.$message({        
        msg:res.msg
      })
      this.articlestt = res.articles
    })
    this.$axios.post("/getArticlesByType",{
      type:"Article"
    }).then(res => {
      console.log(res)
      this.$message({        
        msg:res.msg
      })
      this.articlesArticle = res.articles
    })
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
.user-center {
  .center-header {
    height: 90px;
    padding: 15px 0;
    display: flex;
    align-items: center;
    .userimg {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }

    .username {
      margin: 0 10px;
    }

    .button {
      width: 50px;
      height: 20px;
    }
  }

  .center-content {
    .user-tabs {
      display: flex;
      border-bottom: 1px solid #ccc;
      .tabs-item {
        width: 100px;
        height: 40px;
        line-height: 40px;
        text-align: center;
      }
      .active {
        border-bottom: 2px solid var(--themeColor);
      }
    }
    .user-content {
  .content-tt {
    .tt-item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      //  height: 150px;
      .item-user {
        display: flex;       
        .user-url {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }

        .user-name {
          color: #ccc;
        }
      }
    .item-contents {
        margin: 30px 0;
      .item-content {
      
        
      }
      .item-img {
        width: 200px;
        height: 120px;
      }
}
      .item-battom {
        display: flex;
        justify-content: space-between;
        .time {

        }

        .delete {
         
          font-size: 18px;
          display: none;
        }
       
      }
      &:hover {
          .item-battom {
         .delete {
          display: block;
         }
          }
        }
    }
  }
   .content-article {
    .tt-item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      //  height: 150px;
      .item-user {
        display: flex;       
        .user-url {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }

        .user-name {
          color: #ccc;
        }
      }
    .item-contents {
        margin: 30px 0;
        .title {
         
        .tt {
          margin-right: 2em;
        }

      .item-title {

      }
}
      .item-content {
      display: flex;
        
      }
     
}
      .item-battom {
        display: flex;
        justify-content: space-between;
        .time {

        }

        .delete {
         
          font-size: 18px;
          display: none;
        }
       
      }
      &:hover {
          .item-battom {
         .delete {
          display: block;
         }
          }
        }
    }
}
  }
}
}
</style>