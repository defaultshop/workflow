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
          <span class="current">入学报名</span>
          <span @click="$router.push('/index')">返回首页</span>
        </div>
      </div>
    </div>

    <div class="content-box">
      <div class="form-list">
        <div class="title-bar">
          <span class="title">开发区公办入学报名</span>
          <Alert show-icon closable>特别说明：网上申报仅需提供以下要求的表格及文件，其余证明材料暂无需上传。</Alert>
        </div>

        <Form label-position="top">
          <div class="subtitle">选择志愿学校</div>
          <div class="select-school">
            <RadioGroup>
              <Row>
                <Col span="12">
                  <Radio label="开发区第一小学" size="large"></Radio>
                </Col>
                <Col span="12">
                  <Radio label="开发区第二小学" size="large"></Radio>
                </Col>
                <Col span="12">
                  <Radio label="开发区第三小学" size="large"></Radio>
                </Col>
                <Col span="12">
                  <Radio label="开发区第四小学" size="large"></Radio>
                </Col>
              </Row>
            </RadioGroup>
          </div>
          <div class="form-btn">
            <Button @click="$router.push('/parent')">上一步</Button>
            <Button type="primary" @click="modalShow">下一步</Button>
          </div>
        </Form>
      </div>
    </div>

    <div class="foot-txt">
      <p>本服务由浙江政务服务网、丽水教育局提供</p>
      <p>建议使用1366*768分辨率/IE10.0、chrome30、firefox30及以上浏览器访问效果最佳</p>
    </div>

    <!--数据效验-->
    <Modal v-model="modal1" width="840" class="validation-model">
      <div class="inner">
        <div class="progress-bar">
          <div class="title cent">数据校验中...</div>
          <Progress :percent="45" status="active" />
        </div>
        <div class="info-cont">
          <div class="title">信息内容</div>
          <ul>
            <li><i class="iconfont iconzhengchang"></i>所在地属行政区划范围</li>
            <li>
              <i class="iconfont iconshanchu"></i>申请儿童年龄不符合入学报名政策条件
              <span class="update-link">返回修改></span>
            </li>
            <li><i class="iconfont iconzhengchang"></i>申请信息已提交</li>
          </ul>
        </div>

        <!--通过-->
        <div class="audit-state pass">
          <div class="icon iconfont iconzhengchang"></div>
          <div class="title">校验通过</div>
          <div class="txt">数据校验一致通过，可点击确认提交按钮，提交入学申请</div>
        </div>

        <div class="info-cont">
          <div class="title">信息内容</div>
          <ul>
            <li><i class="iconfont iconzhengchang"></i>儿童信息与户籍接口数据一致</li>
            <li><i class="iconfont iconzhengchang"></i>父母信息与户籍接口数据一致</li>
            <li><i class="iconfont iconzhengchang"></i>附件上传正确</li>
          </ul>
        </div>

        <!--不通过-->
        <div class="audit-state not-pass">
          <div class="icon iconfont iconshanchu"></div>
          <div class="title">校验失败</div>
          <div class="txt">请核对并修改以下信息后，再重新提交。</div>
        </div>

        <div class="info-cont">
          <div class="title">如下信息与比对数据不一致：</div>
          <ul>
            <li>
              <i class="iconfont iconshanchu"></i>儿童年龄与入学条件不一致
              <span class="update-link">返回修改></span>
            </li>
            <li>
              <i class="iconfont iconshanchu"></i>儿童户籍与户籍接口数据不一致
              <span class="update-link">返回修改></span>
            </li>
          </ul>
        </div>
      </div>

      <div slot="footer">
        <Button class="mr10">返回修改</Button>
        <Button type="primary" @click="$router.push('/confirm')">确定提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modal1: false
    };
  },
  methods: {
    modalShow() {
      this.modal1 = true;
    }
  }
};
</script>