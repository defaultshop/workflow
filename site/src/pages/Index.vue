<template>
  <div class="index-wrap">
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
      </div>
    </div>

    <div class="content-box">
      <!--通知公告-->
      <div class="notice-box">
        <div class="title-bar">
          <span class="title">通知公告</span>
        </div>
        <div class="inner">
          <div class="left">政策公告</div>
          <div class="txt">
            <ul>
              <li>
                <i class="iconfont icontongzhi"></i>
                <span>通知</span>
                <span class="omit name">
                  <marquee scrollamount="4">关于丽水经济技术开发区公办中小学2020</marquee>
                </span>
                <span class="date">2018-09-08</span>
              </li>
              <li @click="$router.push('/detail')">
                <i class="iconfont iconwenjian"></i>
                <span class="omit name">政策标题</span>
                <span class="date">2018-09-08</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!--我的报名服务-->
      <div class="service-box">
        <div class="type-subtitle">我的报名服务</div>
        <ul>
          <li @click="$router.push('/progress')">
            <p class="iconfont iconjinduchaxun1"></p>
            <p class="name">报名进度查询</p>
          </li>
          <li @click="$router.push('/information')">
            <p class="iconfont iconxinxi1"></p>
            <p class="name">报名信息咨询</p>
          </li>
          <li @click="$router.push('/query')">
            <p class="iconfont iconpingjiajieguochaxun"></p>
            <p class="name">预录取结果查询</p>
          </li>
        </ul>
      </div>

      <!--学校-->
      <div class="school-enroll">
        <div class="type-subtitle">公办幼儿园</div>
        <ul>
          <li>
            <span class="tag yellow">预报名</span>
            <span class="name omit">2020年公办幼儿园秋季招生预报名</span>
            <span class="time">截至时间：2020-04-25 19:30</span>
            <span class="enroll-btn" @click="$router.push('/entry-type')">我要报名</span>
          </li>
          <li>
            <span class="tag blue">网上报名</span>
            <span class="name omit">2020年公办幼儿园秋季招生网上报名</span>
            <span class="time">截至时间：2020-04-25 19:30</span>
            <span class="enroll-btn" @click="$router.push('/entry-type')">我要报名</span>
          </li>
        </ul>
      </div>

      <div class="school-enroll">
        <div class="type-subtitle">公办小学</div>
        <ul>
          <li>
            <span class="tag yellow">预报名</span>
            <span class="name omit">2020年公办小学秋季招生预报名</span>
            <span class="time">截至时间：2020-04-25 19:30</span>
            <span class="enroll-btn" @click="$router.push('/entry-type')">我要报名</span>
          </li>
          <li>
            <span class="tag blue">网上报名</span>
            <span class="name omit">2020年公办小学秋季招生网上报名</span>
            <span class="time">截至时间：2020-04-25 19:30</span>
            <span class="enroll-btn" @click="$router.push('/entry-type')">我要报名</span>
          </li>
        </ul>
      </div>

      <div class="school-enroll">
        <div class="type-subtitle">公办中学</div>
        <ul>
          <li>
            <span class="tag yellow">预报名</span>
            <span class="name omit">2020年公办中学秋季招生预报名</span>
            <span class="time">截至时间：2020-04-25 19:30</span>
            <span class="enroll-btn" @click="$router.push('/entry-type')">我要报名</span>
          </li>
          <li>
            <span class="tag blue">网上报名</span>
            <span class="name omit">2020年公办中学秋季招生网上报名</span>
            <span class="time">截至时间：2020-04-25 19:30</span>
            <span class="enroll-btn" @click="$router.push('/entry-type')">我要报名</span>
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

<style lang="less" src="@/assets/css/index.less">
</style>