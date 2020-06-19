<template>
  <div id="app">
   <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style lang="less" acoped>
*{
--themeColor: #ea4245;
}

.tt-message {
  line-height: 50px;
  width: 200px;
  height: 50;
  color: aqua;
  text-align: center;
  left: 50%;
  position: fixed;
  top: 0;
  margin-left: -200px;
}
  
</style>
