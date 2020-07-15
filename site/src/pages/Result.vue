<template>
  <div class="result-wrap">
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
          <span class="current">入学报名</span>
          <span @click="$router.push('/index')">返回首页</span>
        </div>
      </div>
    </div>

    <div class="content-box padd">
      <!--通过-->
      <div class="audit-state pass">
        <div class="icon iconfont iconzhengchang"></div>
        <div class="title">提交成功</div>
        <div class="txt">在线提交信息后，待审核通过，须在2019年12月25日，到达所在学校，提交资质材料。</div>
      </div>

      <div class="info-cont">
        <div class="title">信息内容</div>
        <ul>
          <li>
            <i class="iconfont iconzhengchang"></i>申请儿童
            <em>王美珍</em>
          </li>
          <li>
            <i class="iconfont iconzhengchang"></i>儿童身份证号
            <em>3310238888888888</em>
          </li>
          <li>
            <i class="iconfont iconzhengchang"></i>志愿学校
            <em>开发区第一小学</em>
          </li>
        </ul>
      </div>

      <div class="cent operate">
        <Button type="primary" ghost @click="$router.push('/progress')">查看申请</Button>
        <Button type="primary" @click="$router.push('/index')">返回首页</Button>
      </div>
    </div>

    <div class="foot-txt">
      <p>本服务由浙江政务服务网、丽水教育局提供</p>
      <p>建议使用1366*768分辨率/IE10.0、chrome30、firefox30及以上浏览器访问效果最佳</p>
    </div>
  </div>
</template>
