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
          <span class="current">小学报名</span>
          <span @click="$router.push('/index')">返回首页</span>
        </div>
      </div>
    </div>

    <div class="content-box padd">
      <div class="title-bar">
        <span class="title">请选择小学报名类型</span>
      </div>
      <div class="entry-type">
        <ul>
          <li>
            <div class="item" @click="$router.push('/children')">
              <p class="iconfont iconhukoubanli"></p>
              <p class="name">子女户籍在开发区的</p>
            </div>
          </li>
          <li>
            <div class="item" @click="$router.push('/children')">
              <p class="iconfont iconhukoubanli"></p>
              <p class="name">父母一方户口在开发区的</p>
            </div>
          </li>
          <li>
            <div class="item" @click="$router.push('/children')">
              <p class="iconfont iconzhufang"></p>
              <p class="name">父母在开发区购买全权所有商品住房的</p>
            </div>
          </li>
          <li>
            <div class="item" @click="$router.push('/children')">
              <p class="iconfont iconzhufang1"></p>
              <p class="name">父母在开发区经商、办企业的</p>
            </div>
          </li>
          <li>
            <div class="item" @click="$router.push('/children')">
              <p class="iconfont icongongzuo"></p>
              <p class="name">父母双方在开发区用工单位工作均在一年以上的</p>
            </div>
          </li>
          <li>
            <div class="item" @click="$router.push('/children')">
              <p class="iconfont icongongzuo"></p>
              <p class="name">父母单方在开发 区用工单位工作6个月以上的</p>
            </div>
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
