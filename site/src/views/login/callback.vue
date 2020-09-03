<template>
  <div id="login">
    <div class="loginbtn" @click="loginstart">
      <combutton title="回调" />
    </div>
  </div>
</template>

<script>
// import { Login, LoginConfig } from '@/network/url/login.js';
import combutton from '@/components/combutton.vue';
import Oidc from 'oidc-client';
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
      new Oidc.UserManager({ response_mode: 'query' }).signinRedirectCallback().then(function () {
        window.location = '/#/';
      }).catch(function (e) {
        console.error(e);
      });
    }
  },
  mounted() {
    this.loginstart();
  }
};
</script>

<style lang="less" scoped src="@/assets/css/login/login.less"></style>
