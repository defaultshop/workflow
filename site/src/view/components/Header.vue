
<template>
  <div>
    <div class="header">
      <div class="leftside">
        <img src="@/assets/img/logo.png" alt class="logo" />
      </div>
      <div class="rightside">
        <span class="company">
          <i class="iconfont iconmorentouxiang"></i>
          {{ realName }}
          <span class="exit" @click="logout">【退出】</span>
        </span>
      </div>
    </div>
    <div class="banner">
      <div class="inner">
        <div class="title">幼儿园入园报名</div>
        <div class="tab">
          <span class="current">入学报名</span>
          <span @click="$router.push({ name: 'Home' })">返回首页</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      realName: sessionStorage.getItem('realName')
    };
  },
  methods: {
    logout() {
      window.location.href = 'http://www.zjzwfw.gov.cn/zjservice/front/index/page.do?webId=1';
    }
  }
};
</script>


