<template>
  <div id="login">
    <div class="eachint">
      <div>用户名</div>
      <div>
        <input type="text" v-model="name" placeholder="请输入用户名">
      </div>
    </div>
    <div class="eachint">
      <div>密码</div>
      <div>
        <input type="password" v-model="pass" placeholder="密码">
      </div>
    </div>
    <div class="loginbtn" @click="loginstart">
      <combutton title="登录" />
    </div>
  </div>
</template>

<script>
import { Login, LoginConfig } from '@/network/url/login.js';
import combutton from '@/components/combutton.vue';
export default {
  components: {
    combutton
  },
  data() {
    return {
      name: 'admin',
      pass: '1q2w3E*'
    };
  },
  methods: {
    async loginstart() {
      if (this.name === '' || this.name === ' ') {
        this.$toast('请输入用户名');
        return false;
      }
      if (this.pass === '' || this.pass === ' ') {
        this.$toast('请输入密码');
        return false;
      }
      const res = await Login({
        userNameOrEmailAddress: this.name,
        password: this.pass
      });
      const config = await LoginConfig();
      console.log(res, config, 'denglu');
      if (res.result === 1) {
        this.$toast('登录成功');
        this.$store.state.config = config;
        localStorage.setItem('userinfo', JSON.stringify(config));
        //设置为中文，服务端好像是以这个 cookie 为准
        this.$setCookie('.AspNetCore.Culture', 'c=zh-Hans|uic=zh-Hans', { expires: 'Session' });
        //console.log(this.$store.state.config,'config');
        this.type = 2;
        setTimeout(() => {
          this.$router.push('/');
        }, 400);
      }
    }
  }
};
</script>

<style lang="less" scoped src="@/assets/css/login/login.less">

</style>
