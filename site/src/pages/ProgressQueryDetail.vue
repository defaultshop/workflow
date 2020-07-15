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
          <span class="current">报名进度查询</span>
          <span @click="$router.push('/index')">返回首页</span>
        </div>
      </div>
    </div>

    <div class="content-box padd">
      <div class="title-bar">
        <span class="title">报名进度</span>
      </div>
      <!--审核状态-->
      <!--通过-->
      <div class="audit-state pass">
        <div class="icon iconfont iconzhengchang"></div>
        <div class="title">审核通过</div>
        <div class="txt">审核意见展示</div>
      </div>
      <!--不通过-->
      <div class="audit-state not-pass">
        <div class="icon iconfont iconshanchu"></div>
        <div class="title">审核不通过</div>
        <div class="txt">审核意见展示</div>
      </div>
      <!--待审核-->
      <div class="audit-state">
        <div class="icon iconfont iconyuyue"></div>
        <div class="title">待审核</div>
        <div class="txt">请您耐心等待</div>
      </div>

      <!--审核流程-->
      <div class="audit-process">
        <div class="subtitle">审核流程</div>
        <div class="inner">
          <!--成功-->
          <div class="item success flex-row">
            <div class="left">
              <p>2019-01-02 12:00</p>
            </div>
            <div class="right">
              <div class="dot"></div>
              <div class="name">审核成功</div>
              <div class="txt">
                这里是流程名称日过很长这里是流程名称日过很长这里是流程名称日过很长这里是流程名称日过很长这里是流程名称日过很长这里是流程名称日过很长这里是流程名称日过很长这里是流程名称日过很长
              </div>
            </div>
          </div>
          <!--失败-->
          <div class="item fail">
            <div class="left">
              <p>2019-01-02 12:00</p>
            </div>
            <div class="right">
              <div class="dot"></div>
              <div class="name">审核失败</div>
              <div class="txt">流程一（流程节点名称）</div>
            </div>
          </div>
          <div class="item flex-row">
            <div class="left"></div>
            <div class="right">
              <div class="dot"></div>
              <div class="name">待审核</div>
              <div class="txt">流程一（流程节点名称）</div>
            </div>
          </div>
        </div>
      </div>

      <div class="form-list no-padd">
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
      </div>
    </div>

    <div class="foot-txt">
      <p>本服务由浙江政务服务网、丽水教育局提供</p>
      <p>建议使用1366*768分辨率/IE10.0、chrome30、firefox30及以上浏览器访问效果最佳</p>
    </div>
  </div>
</template>
