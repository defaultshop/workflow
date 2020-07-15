<template>
  <div>
    <div class="header">
      <div class="leftside">
        <img src="@/assets/img/logo.png" alt class="logo" />
      </div>
      <div class="rightside">
        <span class="company">
          <i class="iconfont iconmorentouxiang"></i>
          浙江百图科技有限公司
          <span class="exit">【退出】</span>
        </span>
      </div>
    </div>

    <div class="banner">
      <div class="inner">
        <div class="title">丽水经济技术开发区入学报名</div>
        <div class="tab">
          <span class="current">报名咨询</span>
          <span @click="$router.push('/index')">返回首页</span>
        </div>
      </div>
    </div>

    <div class="content-box padd">
      <div class="title-bar">
        <span class="title">报名咨询</span>
      </div>
      <div class="info-list">
        <ul>
          <li>
            <span class="tag blue">公办小学</span>
            <span class="name">开发区中学： XX老师</span>
            <span class="tel">8057482</span>
            <span class="adress">学校地址：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
          </li>
          <li>
            <span class="tag blue">公办小学</span>
            <span class="name">开发区中学： XX老师</span>
            <span class="tel">8057482</span>
            <span class="adress">学校地址：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
          </li>
          <li>
            <span class="tag blue">公办小学</span>
            <span class="name">开发区中学： XX老师</span>
            <span class="tel">8057482</span>
            <span class="adress">学校地址：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
          </li>
          <li>
            <span class="tag blue">公办小学</span>
            <span class="name">开发区中学： XX老师</span>
            <span class="tel">8057482</span>
            <span class="adress">学校地址：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="foot-txt">
      <p>本服务由浙江政务服务网、丽水教育局提供</p>
      <p>建议使用1366*768分辨率/IE10.0、chrome30、firefox30及以上浏览器访问效果最佳</p>
    </div>
  </div>
</template>
