<template>
  <div>
    <child-header></child-header>

    <div class="content-box">
      <div class="form-list">
        <div class="title-bar">
          <TitleBar :type="3"></TitleBar>
        </div>
        <Form label-position="top">
          <div class="subtitle">填报单位信息</div>
          <Row>
            <Col span="11">
              <FormItem label="父亲所在单位名称">
                <Input v-model="companyNameOfFather" placeholder="请输入父亲所在单位名称"></Input>
              </FormItem>
            </Col>
            <Col span="11" offset="2">
              <FormItem label="统一社会代码">
                <Input v-model="companyUnifiedSocialCreditCodeOfFather" placeholder="请输入统一社会代码"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="11">
              <FormItem>
                <div class="file-list">
                  <upload
                    :imgId="companyContractDeadlineBookOfFather"
                    @success="uploadSuccess($event, 1)"
                    title="上传父亲单位合同期限页"
                  ></upload>
                </div>
              </FormItem>
            </Col>
            <Col span="11" offset="2">
              <FormItem>
                <div class="file-list">
                  <upload
                    :imgId="companyContractSignBookOfFather"
                    @success="uploadSuccess($event, 2)"
                    title="上传父亲单位合同签字盖章页"
                  ></upload>
                </div>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="11">
              <FormItem label="母亲所在单位名称">
                <Input v-model="companyNameOfMother" placeholder="请输入母亲所在单位名称"></Input>
              </FormItem>
            </Col>
            <Col span="11" offset="2">
              <FormItem label="统一社会代码">
                <Input v-model="companyUnifiedSocialCreditCodeOfMother" placeholder="请输入统一社会代码"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="11">
              <FormItem>
                <div class="file-list">
                  <upload
                    :imgId="companyContractDeadlineBookOfMother"
                    @success="uploadSuccess($event, 3)"
                    title="上传母亲单位合同期限页"
                  ></upload>
                </div>
              </FormItem>
            </Col>
            <Col span="11" offset="2">
              <FormItem>
                <div class="file-list">
                  <upload
                    :imgId="companyContractSignBookOfMother"
                    @success="uploadSuccess($event, 4)"
                    title="上传母亲单位合同签字盖章页"
                  ></upload>
                </div>
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

<script src='./CompanyFillOS.js'></script>
