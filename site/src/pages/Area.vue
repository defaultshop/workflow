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
          <span class="current">统筹区域</span>
          <span @click="$router.push('/index')">返回首页</span>
        </div>
      </div>
    </div>

    <div class="content-box padd">
      <div class="title-bar">
        <span class="title">请选择统筹区域</span>
      </div>
      <div class="select-area">
        <ul class="clearfix">
          <li>
            莲都区
            <i class="iconfont iconarrow-down"></i>
          </li>
          <li>
            缙云县
            <i class="iconfont iconarrow-down"></i>
          </li>
          <li>
            青田县
            <i class="iconfont iconarrow-down"></i>
          </li>
          <li>
            松阳县
            <i class="iconfont iconarrow-down"></i>
          </li>
          <li>
            遂昌县
            <i class="iconfont iconarrow-down"></i>
          </li>
          <li>
            庆元县
            <i class="iconfont iconarrow-down"></i>
          </li>
          <li>
            云和县
            <i class="iconfont iconarrow-down"></i>
          </li>
          <li>
            龙泉市
            <i class="iconfont iconarrow-down"></i>
          </li>
          <li>
            景宁畲族自治县
            <i class="iconfont iconarrow-down"></i>
          </li>
          <li>
            经济技术开发区
            <i class="iconfont iconarrow-down"></i>
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
