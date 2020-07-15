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
          <span class="current">政策资讯</span>
          <span @click="$router.push('/index')">返回首页</span>
        </div>
      </div>
    </div>

    <div class="content-box padd">
      <div class="query-form">
        <Form label-position="top">
          <FormItem label="请输入学生身份证号">
            <Input placeholder="请输入学生身份证号" clearable></Input>
            <Button type="primary">确认查询</Button>
          </FormItem>
        </Form>
      </div>

      <div class="query-result">
        <div class="title">查询结果</div>

        <!--提交失败-->
        <div class="audit-state not-pass">
          <div class="icon iconfont iconshanchu"></div>
          <div class="title">未找到信息</div>
          <div class="txt">2019-12-25 15:30</div>
        </div>

        <!--提交成功-->
        <div class="audit-state pass">
          <div class="icon iconfont iconzhengchang"></div>
          <div class="title">预录取信息</div>
          <div class="txt">2019-12-25 15:30</div>
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
          <div class="title pt20">就学须知</div>
          <ul>
            <li>
              请与2020年9月1日前到开发区第一小学报名，这里描述更多文案这里描述更多文案这里描述更多文案这里描述更多文案这里描述更多文案这里描述更多文案。
            </li>
          </ul>
        </div>

        <div class="cent operate">
          <Button type="primary" @click="$router.push('/index')">返回首页</Button>
        </div>
      </div>
    </div>

    <div class="foot-txt">
      <p>本服务由浙江政务服务网、丽水教育局提供</p>
      <p>建议使用1366*768分辨率/IE10.0、chrome30、firefox30及以上浏览器访问效果最佳</p>
    </div>
  </div>
</template>
