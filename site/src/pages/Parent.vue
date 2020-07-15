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
        <Form label-position="top">
          <div class="subtitle">填报父亲信息</div>
          <Row>
            <Col span="11">
              <FormItem label="父亲姓名">
                <Input placeholder="请输入"></Input>
              </FormItem>
            </Col>
            <Col span="11" offset="2">
              <FormItem label="父亲身份证号">
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
              <FormItem label="手机号码">
                <Input placeholder="请输入"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="11">
              <FormItem label="身份证正面(人像页)">
                <div class="file-item">
                  <div class="txt">+ 上传图片</div>
                  <input type="file" />
                  <!-- <div class="img">
                    <img src="@/assets/img/card-dome.jpg" @click="modelShow" alt />
                    <span class="delete"></span>
                  </div>-->
                </div>
              </FormItem>
            </Col>
            <Col span="11" offset="2">
              <FormItem label="身份证反面(国徽页)">
                <div class="file-item">
                  <!-- <div class="txt">+ 上传图片</div>
                  <input type="file" />-->
                  <div class="img">
                    <img src="@/assets/img/card-dome.jpg" @click="modelShow" alt />
                    <span class="delete"></span>
                  </div>
                </div>
              </FormItem>
            </Col>
          </Row>

          <div class="subtitle">填报母亲信息</div>
          <Row>
            <Col span="11">
              <FormItem label="母亲姓名">
                <Input placeholder="请输入"></Input>
              </FormItem>
            </Col>
            <Col span="11" offset="2">
              <FormItem label="母亲身份证号">
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
              <FormItem label="手机号码">
                <Input placeholder="请输入"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="11">
              <FormItem label="身份证正面(人像页)">
                <div class="file-item">
                  <div class="txt">+ 上传图片</div>
                  <input type="file" />
                  <!-- <div class="img">
                    <img src="@/assets/img/card-dome.jpg" @click="modelShow" alt />
                    <span class="delete"></span>
                  </div>-->
                </div>
              </FormItem>
            </Col>
            <Col span="11" offset="2">
              <FormItem label="身份证反面(国徽页)">
                <div class="file-item">
                  <div class="txt">+ 上传图片</div>
                  <input type="file" />
                  <!-- <div class="img">
                    <img src="@/assets/img/card-dome.jpg" @click="modelShow" alt />
                    <span class="delete"></span>
                  </div>-->
                </div>
              </FormItem>
            </Col>
          </Row>
          <Row class="form-btn">
            <Col span="24">
              <FormItem>
                <Button @click="$router.push('/')">上一步</Button>
                <Button type="primary" @click="$router.push('/file')">下一步</Button>
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

    <!--查看图-->
    <div class="mask-bg" v-show="model"></div>
    <div class="img-model" v-show="model">
      <p>
        <img src="@/assets/img/card-dome.jpg" alt />
      </p>
      <p class="close">
        <span class="iconfont iconshanchu" @click="modelHide"></span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: false
    };
  },
  methods: {
    modelShow() {
      this.model = true;
    },
    modelHide() {
      this.model = false;
    }
  }
};
</script>
