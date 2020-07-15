<template>
  <div>
    <child-header></child-header>

    <div class="content-box">
      <div class="form-list">
        <TitleBar :type="3"></TitleBar>
        <Form label-position="top">
          <div class="subtitle">填报企业信息</div>
          <Row>
            <Col span="11">
              <FormItem label="企业名称">
                <Input v-model="enterpriseCompanyName" placeholder="请输入企业名称"></Input>
              </FormItem>
            </Col>
            <Col span="11" offset="2">
              <FormItem label="注册号">
                <Input v-model="enterpriseRegisterNo" placeholder="请输入注册号"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="11">
              <FormItem label="法人">
                <Input v-model="enterprisePersonName" placeholder="请输入法人"></Input>
              </FormItem>
            </Col>
            <Col span="11" offset="2">
              <FormItem label="法人身份证号">
                <Input v-model="enterprisePersonCardId" placeholder="请输入法人身份证号"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="11">
              <FormItem label="上传个体工商户营业执照">
                <upload :imgId="enterpriseBusinessLicenseBook" @success="uploadSuccess($event, 1)" title=""></upload>
              </FormItem>
            </Col>
            <Col span="11" offset="2">
              <FormItem label="上传纳税凭证或未到起征点凭证">
                <upload :imgId="enterpriseThresholdCertificateBook" @success="uploadSuccess($event, 2)" title=""></upload>
              </FormItem>
            </Col>
          </Row>
          <Row class="form-btn">
            <Col span="24">
              <FormItem>
                <Button @click="$router.go(-1)">上一步</Button>
                <Button type="primary" @click="submitInfo">下一步</Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    </div>

    <child-footer></child-footer>
  </div>
</template>

<script src='./EnterpricesFill.js'></script>
