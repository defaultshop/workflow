<template>
  <div id="login">
    <div class="logincont" :style="{opacity:type === 1 ? 1 : 0, transform:type == 1 ? 'scale(1)' : 'scale(0.5)'}">
      <div class="logintit">
        <span>登录</span>
      </div>
      <div class="alllogin">
        <div class="eachlogin">
          <div class="eachloginame">账号</div>
          <div class="eachloginint">
            <input type="text" v-model="name" placeholder="请输入用户名">
          </div>
        </div>
        <div class="eachlogin">
          <div class="eachloginame">密码</div>
          <div class="eachloginint">
            <input type="password" v-model="pass" placeholder="请输入密码">
          </div>
        </div>
      </div>

      <div class="loginbtn" @click="loginstart">
        <span>登录</span>
      </div>
    </div>
  </div>
</template>
<script>
// import { Login } from '../../../api/login';
export default {
  data(){
    return {
      name: 'admin',
      pass: '1q2w3E*',
      type: 1,
    };
  },
  methods:{
    async loginstart(){
      if (this.name === '' || this.name === ' ') {
        this.$message({
          message: '请输入用户名',
          duration: 100000,
        });
        return false;
      }
      if (this.pass === '' || this.pass === ' ') {
        this.$message('请输入密码');
        return false;
      }
      var url = '/api/account/login',
        type = 'post',
        data = {
          'userNameOrEmailAddress': this.name,
          'password': this.pass,
        };
      var url2 = '/api/abp/application-configuration',
        type2 = 'get',
        data2 = {};
      let res = await this.$getaxios(url,type,data);
      let config = await this.$getaxios(url2,type2,data2);
      if (res.result === 1){
        this.$message('登录成功');
        this.$store.state.config = config;
        localStorage.setItem('userinfo',JSON.stringify(config));
        console.log(this.$store.state.config,'config');
        this.type = 2;
        setTimeout(()=>{
          this.$router.push('/');
        },400);
      }
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss" />