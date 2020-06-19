<!--  -->
<template>
  <div class ="user-userdata">
    <div class="userdata-tab">
      <div :class="['tab-item' ,{'active': tab == nav.id}]" v-for="nav in navs" :key="nav.id" @click.stop="switchtab(nav.id)">
          {{nav.title}}
      </div>
    </div>
    <div class="userdat-content">
      <div class="content-userinfo" v-show = "tab == 1">
          <div class="username">
            <span>名称</span>
            <input type="text" v-model="username">
          </div>
           <div class="userurl">
            <span>头像</span>
            <div class="userimg">
              <img :src="userimg" alt="">
              <input type="file" name="" id="" accept=".jpg,.png" @change.stop = "upimg">
            </div>
            
          </div>
          <button class="updata" @click.stop = "updatauser">更新资料</button>
      </div>
      <div class="content-userpassword" v-show = "tab == 2">
          <div class="thispssword">
            <span>当前密码</span>
            <input type="text" v-model="thispssword">
          </div>
          <div class="newpassword">
          <span>新密码</span>
          <input type="password" v-model="newpassword">
        </div>
        <button class="updata" @click.stop = "updatapassword">更新资料</button>
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
        {id:1,title:"账户管理"},
        {id:2,title:"密码管理"}
      ],
      tab: 1,
      username : this.$store.state.userInfo.nickname,
      userimg  : this.$store.state.userInfo.avator,
      thispssword : "",
      newpassword : "",
     
    };
  },
  //监听属性 类似于data概念
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    switchtab(id) {
      this.tab = id
    },
    upimg(e) {
      console.log(e)
      Array.from(e.target.files).forEach(f => {
        let params = new FormData();
        params.append("file" , f);

        this.$axios.post("/aliossUpload" , 
          params
        ).then( res=> {
          this.$message({
            msg:res.msg
          })
          if(status == 0) {
            this.userimg = res.url
          }
          
        }).catch(err => {
            console.log(err);
          });
      })
    },
    updatauser() {
      if(!this.username) {
        this.$message({
          msg:"账户名不能为空"
        })
        return false
      }
      this.$axios.post("updateUserInfo",{
        nickname : this.username,
        avator : this.userimg
      }).then(res => {
        if(status == 0) {
          this.$message({
            msg:res.msg
          })
          let userinfo = this.$store.state.userInfo
          userinfo.nickname = this.username
          userinfo.avator = this.userimg
          this.$store.commit("updateUserInfo" , userinfo)
        }
      })
    },
    updatapassword() {
       if(!this.thispssword || !this.newpassword) {
        this.$message({
          msg:"密码不能为空!"
        })
        return false
      }
      this.$axios.post("updateUserInfo",{
        currentPassword : this.thispssword,
        updatePassword : this.newpassword
      }).then(res => {
        if(status == 0) {
          this.$message({
            msg:res.msg
          })
        
        }
      }).catch(err => {
            console.log(err);
          });
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
.user-userdata {
.userdata-tab {
  display: flex;
  border-bottom: 1px solid #ccc;
.tab-item {
    width: 100px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    }
    .active {
      border-bottom: 2px solid var(--themeColor);
    }
  }

.userdat-content {
  padding: 5px;
.content-userinfo {
.username {
    display: flex;
    height: 50px;
    align-items: center;
        span {
          flex: 1;
          text-align: center;
        }

        input {
          flex: 9;
          height: 40px;
        }
      }

.userurl {
  display: flex;
  align-items: center;
  margin: 10px 0;
        span {
            flex: 1;
            text-align: center;
          }

.userimg {
  flex: 9;
  
  position: relative;
          img {
            width: 120px;
            height: 120px;
            border-radius: 50%;
          }

          input {
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0;
            width: 120px;
            height: 120px;
            border-radius: 50%;
          }
        }

       
      }
       .updata {
          width: 70px;
          height: 30px;
          margin-left: 160px;
          background-color: #589afa;
          border-radius: 5px;
          border: 0;
          color: white;

        }
    }

.content-userpassword {
.thispssword {
  display: flex;
    height: 50px;
    align-items: center;
  span {
          flex: 1;
          text-align: center;
  }

  input {
          flex: 9;
          height: 40px;
  }
}

.newpassword {
  display: flex;
    height: 50px;
     align-items: center;
  span {
          flex: 1;
          text-align: center;
  }

  input {
          flex: 9;
          height: 40px;       
  }
}

.updata {
          width: 70px;
          height: 30px;
          margin-left: 30px;
          background-color: #589afa;
            border-radius: 5px;
            border: 0;
            color: white;
}
    }
  }
}
</style>