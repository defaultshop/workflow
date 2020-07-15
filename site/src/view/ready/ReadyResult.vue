<template>
  <div class="result-wrap">
    <child-header></child-header>

    <div class="content-box padd">
      <!--通过-->
      <div class="audit-state pass">
        <div class="icon iconfont iconzhengchang"></div>
        <div class="title">提交成功</div>
      </div>

      <div class="info-cont">
        <div class="title">信息内容</div>
        <ul>
          <li>
            <i class="iconfont iconzhengchang"></i>申请儿童
            <em>{{ data_info.childrenName }}</em>
          </li>
          <li>
            <i class="iconfont iconzhengchang"></i>儿童身份证号
            <em>{{ data_info.childrenCardId }}</em>
          </li>
          <li>
            <i class="iconfont iconzhengchang"></i>志愿学校
            <em>{{ data_info.schoolName }}</em>
          </li>
        </ul>
      </div>

      <div class="cent operate">
        <Button type="primary" ghost @click="$router.push('/ApplyList')">查看申请</Button>
        <Button type="primary" @click="$router.push('/Home')">返回首页</Button>
      </div>
    </div>

    <child-footer></child-footer>
  </div>
</template>

<script src='./ReadyResult.js'></script>
