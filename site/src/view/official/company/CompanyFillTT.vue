<template>
  <div>
    <child-header></child-header>

    <div class="content-box">
      <div class="form-list">
        <TitleBar :type="3"></TitleBar>
        <Form label-position="top">
          <div class="subtitle">填报单位信息</div>
          <Row>
            <Col span="11">
              <FormItem label="单位名称">
                <Input v-model="companyName" placeholder="请输入单位名称"></Input>
              </FormItem>
            </Col>
            <Col span="11" offset="2">
              <FormItem label="法人">
                <Input v-model="companyPersonName" placeholder="请输入法人"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="11">
              <FormItem>
                <div class="file-list">
                  <upload
                    :imgId="companyContractDeadlineBook"
                    @success="uploadSuccess($event, 1)"
                    title="上传合同期限页"
                  ></upload>
                </div>
              </FormItem>
            </Col>
            <Col span="11" offset="2">
              <FormItem>
                <div class="file-list">
                  <upload
                    :imgId="companyContractSignBook"
                    @success="uploadSuccess($event, 2)"
                    title="上传合同签字盖章页"
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

<script src='./CompanyFillTT.js'></script>
