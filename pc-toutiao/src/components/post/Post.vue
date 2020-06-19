<!-- 上传文件组件 -->
<template>
  <!-- teb切换栏 -->
  <div class="tt-index-post">
    <div class="post-tebs">
      <div
        :class="['tebs-item',{ 'active' : item.id == idactive }]"
        v-for="(item,index) in tabs"
        :key="index"
        @click.stop="tabclick(item.id)"
      >{{item.text}}</div>
    </div>
    <!-- 中间对应内容 -->
    <div class="post-conter">
      <!-- 发微头条 -->
      <div class="conter-headline" v-show="idactive == 1">
        <textarea
          class="post-textarea"
          name
          id
          cols="30"
          rows="10"
          v-model="tt_content"
          placeholder="有什么新鲜事想告诉大家"
        ></textarea>
        <div class="post-botton">
          <!-- 左边上传图片功能区 -->
          <div class="button-left">
            <div class="left-titler" @click.stop="toggleUploadArea">图片</div>
            <!-- 切换上传图片功能的显示与隐藏 -->
            <div class="button-getimgs" v-show="showUploadImgArea">
              <div class="upload">
                <div class="title">+</div>
                <input type="file" multiple @change="handleImgsUpload" accept=".jpg, .png" />
              </div>
              <!-- 上传图片的展示区 -->
              <div class="img-item" v-for="(img,index) in uploadImgs" :key="img">
                <img :src="img" alt />
                <div class="deleteImg" @click.stop="deleteImg(index)">X</div>
              </div>
            </div>
          </div>
          <!-- 右边的发布按钮 -->
          <div class="button-right">
            <button @click.stop="publishTT">发布</button>
          </div>
        </div>
      </div>
      <!-- 发微头条结束 -->
      <!-- 写文章 -->
      <div class="conter-writingarticles clearfix" v-show="idactive == 2">
        <input class="writingarticles-text" type="text" v-model="article_title" placeholder="请输入内容" />
        <vue-editor
          id="editor"
          v-model="richContent"
          use-custom-image-handler
          @image-added="handleImageAdded"
          class="rich-editor"
        />

        <button class="headline-publish" @click.stop="publishArticle">发布</button>
      </div>
      <!-- 写文章内容结束 -->
    </div>
    <!-- 中间内容结束 -->
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { VueEditor } from "vue2-editor";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    VueEditor
  },
  data() {
    //这里存放数据
    return {
      // tab 切换栏模拟数据
      tabs: [
        { id: "1", text: "发微头条" },
        { id: "2", text: "写文章" }
      ],
      idactive: 1, //tab切换栏默认为第一个栏目
      showUploadImgArea: false, //图片上传区域的隐藏与显示
      uploadImgs: [], //请求的图片列表,
      tt_content: "", // 写微头条的内容
      article_title: "", //发文章的标题
      richContent: "", //发文章富文本默认值       
      article_url:[] // 文章的图片
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 获取当前tab的ID 切换Tab
    tabclick(id) {
      this.idactive = id;
    },
    // 切换图片上传的显示与隐藏
    toggleUploadArea() {
      this.showUploadImgArea = !this.showUploadImgArea;
    },
    // 获取图片
    handleImgsUpload(e) {
      Array.from(e.target.files).forEach(f => {
        //1. 构造请求的参数
        // {
        //     file:文件的数据
        // }
        let params = new FormData();
        // 添加表单数据
        params.append("file", f);
        // console.log(params)
        //2. 发请求
        // this.$axios.post("/")
        this.$axios.post("/aliossUpload", params).then(res => {
          console.log(res);
          this.uploadImgs.push(res.url);
        });
      });
    },
    // 删除图片
    deleteImg(i) {
      this.uploadImgs.splice(i, 1);
    },
    // 发布微头条
    publishTT() {
      this.showUploadImgArea = false
      console.log(this.tt_content);
      if (!this.tt_content) {
        this.$message({
          msg: "输入内容 不能为空！"
        });
        return false;
      }
      this.$axios
        .post("/createTT", {
          content: this.tt_content,
          imgs: this.uploadImgs.join(",")
        })
        .then(res => {
          console.log(res);
          this.$message({
            msg: res.msg
          });

        if(res.status == 0) {
          let userInfo = this.$store.state.userInfo
          userInfo.tt_count++

          this.$store.commit("updateUserInfo" ,userInfo )
        }
      
      

          
        })
        .catch(err => err);
    },
    // 写文章的上传图片功能
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      console.log("上传图片");
      var formData = new FormData();
      formData.append("file", file);
      this.$axios.post("./aliossUpload", formData).then(res => {
        this.article_url = res.url;
        // this.article_url = this.article_url.push(res.url);
        let url = res.url;
        Editor.insertEmbed(cursorLocation, "image", url);
        resetUploader();
      });
    },
    // 发布文章
    publishArticle() {
      

      if (!this.article_title || !this.richContent) {
        this.$message({
          msg: "输入内容 不能为空！"
        });
        return false;
      }
      this.$axios
        .post("/createArticle", {
          title: this.article_title,
          content: this.richContent,
          img: this.article_url
        })
        .then(res => {
          this.$message({
            msg: res.msg
          });
          userInfo.article_count++

          this.$store.commit("updateUserInfo" ,userInfo )
        })
        .catch(err => err);
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
//@import url(); 引入公共css类
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

.tt-index-post {
  width: 100%;
  padding: 0 10px;
  .post-tebs {
    padding: 0 15px;
    display: flex;

    .tebs-item {
      height: 35px;
      // line-height: 35px;
      text-align: center;
      width: 80px;
      margin-right: 20px;
      color: #000000;
    }
    .active {
      border-bottom: 2px solid var(--themeColor);
      color: #589afa;
    }
  }
  .post-conter {
    padding: 5px 0;

    .conter-headline {
      textarea.post-textarea {
        border: 1px solid #ddd;
        width: 100%;
        height: 150px;
      }

      .post-botton {
        display: flex;
        justify-content: space-between;
        height: 30px;
        .button-left {
          position: relative;
          .left-titler {
            font-size: 16px;
            line-height: 30px;
          }

          .button-getimgs {
            position: absolute;
            background-color: #fff;
            display: flex;
            flex-wrap: wrap;
            width: 300px;
            .upload {
              position: relative;
              width: 100px;
              height: 100px;

              .title {
                text-align: center;
                line-height: 100px;
                width: 100px;
                height: 100px;
                border: 1px dashed #ddd;
                font-weight: 100;
              }

              input {
                opacity: 0;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 100%;
                height: 100%;
              }
            }

            .img-item {
              //   padding: 5px;
              width: 100px;
              height: 100px;
              position: relative;
              img {
                height: 100%;
                width: 100px;
              }

              .deleteImg {
                display: none;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              }
              &:hover {
                background-color: #ccc;
                opacity: 0.9;
                transition: all 0.5s;
                .deleteImg {
                  color: black;
                  display: block;
                }
              }
            }
          }
        }
        .button-right {
          height: 100%;
          button {
            height: 100%;
            width: 100px;
            border: 0;
            background-color: var(--themeColor);
            border-radius: 3px;
            color: white;
            font-size: 16px;
            line-height: 100%;
            text-align: center;
          }
        }
      }
    }
    .conter-writingarticles {
      .writingarticles-text {
        border: 0;
        height: 30px;
        width: 100%;
        outline: none;
      }

      .rich-editor {
      }
      .headline-publish {
        margin-top: 3px;
        float: right;
        height: 30px;
        width: 100px;
        border: 0;
        background-color: var(--themeColor);
        border-radius: 3px;
        color: white;
        font-size: 16px;
        line-height: 100%;
        text-align: center;
      }
    }
  }
}
</style>