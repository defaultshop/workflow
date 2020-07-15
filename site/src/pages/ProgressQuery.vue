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
          <span class="current">报名进度查询</span>
          <span @click="$router.push('/index')">返回首页</span>
        </div>
      </div>
    </div>

    <div class="content-box padd">
      <div class="title-bar">
        <span class="title">已申请报名</span>
      </div>
      <div class="apply-list">
        <ul>
          <li @click="$router.push('/progress-detail')">
            <span class="tag yellow">预报名</span>
            <span class="name omit">张三的2020年公办中学秋季招生预报名</span>
            <span class="state blue">待审核</span>
            <span class="time">申请时间：2020-04-25 19:30</span>
          </li>
          <li @click="$router.push('/progress-detail')">
            <span class="tag blue">网上报名</span>
            <span class="name omit">张三的2020年公办中学秋季招生网上报名</span>
            <span class="state green">审核通过</span>
            <span class="time">申请时间：2020-04-25 19:30</span>
          </li>
          <li @click="$router.push('/progress-detail')">
            <span class="tag yellow">网上报名</span>
            <span class="name omit">张三的2020年公办中学秋季招生网上报名</span>
            <span class="state red">审核不通过</span>
            <span class="time">申请时间：2020-04-25 19:30</span>
          </li>
        </ul>
      </div>
      <div class="pt30">
        <Page :total="100" show-elevator show-sizer />
      </div>
    </div>

    <div class="foot-txt">
      <p>本服务由浙江政务服务网、丽水教育局提供</p>
      <p>建议使用1366*768分辨率/IE10.0、chrome30、firefox30及以上浏览器访问效果最佳</p>
    </div>
  </div>
</template>
