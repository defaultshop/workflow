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
          <Alert show-icon closable>温馨提示：备注信息描述备注信息描述备注信息描。</Alert>
        </div>
        <div class="subtitle">填报儿童信息</div>
        <Form label-position="top">
          <Row>
            <Col span="11">
              <FormItem label="儿童姓名">
                <Input placeholder="请输入"></Input>
              </FormItem>
            </Col>
            <Col span="11" offset="2">
              <FormItem label="儿童身份证号">
                <Input placeholder="请输入"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="11">
              <FormItem label="户籍所在地">
                <Select placeholder="请选择">
                  <Option value="请选择">请选择</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="11" offset="2">
              <FormItem label="家庭详细住址">
                <Input placeholder="请输入"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row class="form-btn">
            <Col span="24">
              <FormItem>
                <Button>取消</Button>
                <Button type="primary" @click="$router.push('/parent')">下一步</Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    </div>

    <div class="foot-txt">
      <p>本服务由浙江政务服务网、丽水教育局提供</p>
      <p>建议使用1366*768分辨率/IE10.0、chrome30、firefox30及以上浏览器访问效果最佳</p>
    </div>
  </div>
</template>
