<template>
  <div class="home">
    <div @click="$router.push('/coupon-redemption')">码上领券</div>
    <div @click="$router.push('/finance-list')">码上金融</div>
    <div @click="$router.push('/guarantee-records')">码上担保(融资)</div>
    <!-- <div @click="$router.push('/non-guarantee-records')">码上担保(非融资)</div> -->
    <div @click="$router.push('/agent-records')">码上代办</div>
  </div>
</template>

<script>
import { LoginConfig } from '@/network/url/login.js';
import Oidc from 'oidc-client';
var config = {
  authority: 'http://vnextdebug.test3.dev.baitu.com/',
  client_id: 'website_test',
  redirect_uri: 'http://localhost:8090/#/callback',
  response_type: 'code',
  scope: 'openid profile Demo offline_access',
  post_logout_redirect_uri: 'http://vnextdebug.test3.dev.baitu.com/#/',
};
var mgr = new Oidc.UserManager(config);

export default {
  data() {
    return {

    };
  },
  methods: {
    async getconfig() {
      const config = await LoginConfig();
      console.log(config, 'config');
      this.$store.state.config = config;
      localStorage.setItem('userinfo', JSON.stringify(config));
      //设置为中文，服务端好像是以这个 cookie 为准
      this.$setCookie('.AspNetCore.Culture', 'c=zh-Hans|uic=zh-Hans', { expires: 'Session' });
    }
  },
  created() {
    let that = this;
    mgr.getUser().then((user) => {
      console.log(user);
      console.log(user.access_token);
      this.$store.state.access_token = user.access_token;
      that.getconfig();
    });
  }
};
</script>

<style lang="less" scoped>
.home{
  line-height: 0.9rem;
  div{
    border: 1px solid #66ccff;
  }
}
</style>
