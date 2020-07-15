<template></template>
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
        <div class="confirm-box mt">
          <div class="subtitle">
            儿童信息
            <span class="arrow">
              展开
              <i class="iconfont"></i>
            </span>
          </div>
          <Row>
            <Col span="11">
              <div class="label">儿童姓名</div>
              <div class="text">张三</div>
            </Col>
            <Col span="11" offset="2">
              <div class="label">儿童身份证号</div>
              <div class="text">331030201309090912</div>
            </Col>
          </Row>
          <Row>
            <Col span="11">
              <div class="label">户籍所在地</div>
              <div class="text">浙江省杭州市</div>
            </Col>
            <Col span="11" offset="2">
              <div class="label">家庭详细地址</div>
              <div class="text">文一西路南都花园二区三庄</div>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <div class="label">填报志愿</div>
              <div class="text">丽水市开发区第一小学</div>
            </Col>
          </Row>
        </div>

        <div class="confirm-box">
          <div class="subtitle">
            父亲信息
            <span class="arrow open">
              收起
              <i class="iconfont"></i>
            </span>
          </div>
          <Row>
            <Col span="11">
              <div class="label">父亲姓名</div>
              <div class="text">张伟</div>
            </Col>
            <Col span="11" offset="2">
              <div class="label">父亲身份证号</div>
              <div class="text">3333333333336665</div>
            </Col>
          </Row>
          <Row>
            <Col span="11">
              <div class="label">户籍所在地</div>
              <div class="text">浙江省杭州市</div>
            </Col>
            <Col span="11" offset="2">
              <div class="label">手机号码</div>
              <div class="text">13588885554</div>
            </Col>
          </Row>
          <Row>
            <Col span="11">
              <div class="label">身份证正面(人像页)</div>
              <div class="file-item">
                <div class="img">
                  <img src="@/assets/img/card-dome.jpg" alt />
                </div>
              </div>
            </Col>
            <Col span="11" offset="2">
              <div class="label">身份证反面(国徽页)</div>
              <div class="file-item">
                <div class="img">
                  <img src="@/assets/img/card-dome.jpg" alt />
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <div class="confirm-box">
          <div class="subtitle">
            母亲信息
            <span class="arrow open">
              收起
              <i class="iconfont"></i>
            </span>
          </div>
          <Row>
            <Col span="11">
              <div class="label">母亲姓名</div>
              <div class="text">刘岚</div>
            </Col>
            <Col span="11" offset="2">
              <div class="label">母亲身份证号</div>
              <div class="text">3333333333336665</div>
            </Col>
          </Row>
          <Row>
            <Col span="11">
              <div class="label">户籍所在地</div>
              <div class="text">浙江省杭州市</div>
            </Col>
            <Col span="11" offset="2">
              <div class="label">手机号码</div>
              <div class="text">13588885554</div>
            </Col>
          </Row>
          <Row>
            <Col span="11">
              <div class="label">身份证正面(人像页)</div>
              <div class="file-item">
                <div class="img">
                  <img src="@/assets/img/card-dome.jpg" alt />
                </div>
              </div>
            </Col>
            <Col span="11" offset="2">
              <div class="label">身份证反面(国徽页)</div>
              <div class="file-item">
                <div class="img">
                  <img src="@/assets/img/card-dome.jpg" alt />
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <div class="confirm-box">
          <div class="file-title">
            一、儿童及父母户口本
            <span class="arrow open">
              收起
              <i class="iconfont"></i>
            </span>
          </div>
          <div class="file-list">
            <div class="file-item">
              <div class="img">
                <img src="@/assets/img/card-dome.jpg" alt />
              </div>
            </div>
          </div>
          <div class="file-title">二、不动产权证明（房产证）</div>
          <div class="file-list">
            <div class="file-item">
              <div class="img">
                <img src="@/assets/img/card-dome.jpg" alt />
              </div>
            </div>
          </div>
        </div>

        <div class="form-btn">
          <Button @click="$router.push('/file')">上一步</Button>
          <Button type="primary" @click="$router.push('/result')">确认提交</Button>
        </div>
      </div>
    </div>

    <div class="foot-txt">
      <p>本服务由浙江政务服务网、丽水教育局提供</p>
      <p>建议使用1366*768分辨率/IE10.0、chrome30、firefox30及以上浏览器访问效果最佳</p>
    </div>

    <!--验证-->
    <Modal v-model="modal1" width="680" class="code-model">
      <div class="inner">
        <div class="model-title">验证码</div>
        <Form label-position="top">
          <FormItem label="手机号">
            <Input placeholder="请输入" value="13589586847"></Input>
          </FormItem>
          <FormItem label="验证码" class="code">
            <Input placeholder="请输入验证码"></Input>
            <Button type="primary" ghost>发送验证码</Button>
            <!-- <Button type="primary" ghost disabled>验证码倒计时</Button> -->
          </FormItem>
        </Form>
      </div>

      <div slot="footer">
        <Button class="mr10">取消</Button>
        <Button type="primary">确定</Button>
      </div>
    </Modal>
    
  </div>
</template>


<script>
export default {
  data() {
    return {
      modal1: true
    };
  }
};
</script>