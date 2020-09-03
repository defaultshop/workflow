<template>
  <div id="app">
    <router-view  v-wechat-title="$route.meta.title"/>
  </div>
</template>

<script>
export default {
  mounted() {
    if (!this.$store.state.config && localStorage.getItem('userinfo')) {
      this.$store.state.config = JSON.parse(localStorage.getItem('userinfo'));
    }
  }
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333;
  font-size: 0.28rem;
  height: 100%;
  background-color: #F6F8F9;
}
</style>
