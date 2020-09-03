<template>
  <div id="login">
    <div class="loginbtn" @click="loginstart">
      <combutton title="登录" />
    </div>
  </div>
</template>

<script>
import { Login, LoginConfig } from "@/network/url/login.js";
import combutton from "@/components/combutton.vue";
import Oidc from 'oidc-client';
export default {
  components: {
    combutton,
  },
  data() {
    return {
      name: "admin",
      pass: "1q2w3E*",
    };
  },
  methods: {
    async loginstart() {
      var config = {
        authority: "http://vnextdebug.test3.dev.baitu.com/",
        client_id: "website_test",
        redirect_uri: "http://localhost:8090/#/callback",
        response_type: "code",
        scope: "openid profile Demo offline_access",
        post_logout_redirect_uri: "http://vnextdebug.test3.dev.baitu.com/#/",
      };
      var mgr = new Oidc.UserManager(config);

      mgr.signinRedirect({
        //data: "sxf",
        extraQueryParams: { type: "YouShu", token: "zaSbKc" },
      });
    },
  },
};
</script>

<style lang="less" scoped src="@/assets/css/login/login.less"></style>
