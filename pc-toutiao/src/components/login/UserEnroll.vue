<!--  -->
<template>
<div class='index-enroll-login'>
    <section class="enroll-login">
        <section class="enroll-login-title">账号注册</section>
        <input class="username" type="text" v-model="username" placeholder="用户名">
        <input class="userpassword"   type="password" v-model="userpassword" placeholder="密码">
        <button class="confirm" @click.stop="confirm">确定</button>
        <section class="bottom-button">
            <div class="button-left">
                登录/注册即表示你同意
                <a href="#">用户协议</a>和
                <a href="#">隐私条款</a>
            </div>
            <div class="button-right">
                <a href="#" @click.prevent.stop="goUserLogin">登录用户</a>
            </div>
        </section>
    </section>
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
    username:"",
    userpassword:""
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
goUserLogin() {
    this.$router.push({
        name:"userLogin"
    }) 
},
confirm() {
let userpassword = this.userpassword;
let username = this.username;

// 当输入内容为空时
if(!userpassword || !username) {
this.$message({
           msg:"账号或者密码不能为空!"
        })
        return false
}
    this.$axios.post("./createUser",{
        username,
        password : userpassword
    }).then((res)=> {
        console.log(res)
        this.$message({
            msg:res.msg

        })
        if(res.status == 0) {
            // 祖册成功
              // a. 将用户信息保存到本地 localStorage
              // b. 将用户信息 使用 vuex 存起来 方便实现页面组件间的数据共享
              // c. 跳转到首页
            // this.$store.commit("updateUserInfo",res.wdata)
            this.$router.push({"name":"userLogin"}); // 跳转到登录页
        }
    }).catch(err=>err)


},
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
.index-enroll-login {
    width: 100vw;
    height: 100vh;
    background: url("../../../imgs/bj.jpg") no-repeat;
    background-size: 100% ;
    display: flex;
    justify-content: center;
    align-items: center;
  .enroll-login {
      position: relative;
      width: 400px;
      height: 250px;
      border: 1px solid #bbb;
      background-color: rgba(124, 169, 169, 0.2);
      padding: 5px;
      
    .enroll-login-title {
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 18px;
        color: #bbb;
        padding: 5px;
        

    }

   .username {
        font-size: 16px;
        height: 50px;
        margin: 5px 0;
        width: 100%;
        background-color: rgba(124, 169, 169, 0.3);
        border: 0;
    }

   .userpassword {
        font-size: 16px;
        margin: 5px 0;
        width: 100%;
        height: 50px;
        background-color: rgba(124, 169, 169, 0.3);
        border: 0;
    }

    .confirm {
         margin: 5px 0;
        width: 100%;
        height: 40px;
        background-color: rgba(171, 31, 64, 0.4);
        border: 0;
        color: #dddddd;
        border-radius: 5px;
    }

    .bottom-button {
        
        position: absolute;
        bottom: -30px;
        font-size: 14px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        color: #ddd;
      .button-left {
        a {
            text-decoration: none;
        }
      }

      .button-right {
        a {
text-decoration: none;
        }
      }
    }
  }
}
</style>