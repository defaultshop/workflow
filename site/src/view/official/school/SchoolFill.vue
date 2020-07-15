<template>
  <div>
    <child-header></child-header>

    <div class="content-box">
      <div class="form-list">
        <TitleBar :type="2"></TitleBar>

        <Form label-position="top">
          <div class="subtitle">请填报志愿学校</div>
          <div class="select-school">
            <RadioGroup v-model="selectedSchool">
              <Row v-for="item in arr_schoolList" :key="item.id">
                <Col span="12">
                  <Radio :label="item.id" size="large">{{ item.name }}</Radio>
                </Col>
              </Row>
            </RadioGroup>
          </div>
          <div class="form-btn">
            <Button @click="$router.go(-1)">上一步</Button>
            <Button type="primary" @click="submitInfo">下一步</Button>
          </div>
        </Form>
      </div>
    </div>

    <child-footer></child-footer>

    <!--数据效验-->
    <Modal v-model="is_progress" width="900" class="validation-model" footer-hide>
      <div>
        <div class="inner">
          <div class="progress-bar" v-if="!isShowContent">
            <div class="title cent">数据正在校验...</div>
            <Progress :percent="progress_count" status="active" />
          </div>

          <div class="audit-state pass" v-else-if="arr_verification[0].isSuccess">
            <div class="icon iconfont iconzhengchang"></div>
            <div class="title">校验通过</div>
            <div class="txt">数据校验一致通过，可点击确认提交按钮，提交入学申请</div>
          </div>
          <div
            class="audit-state pass"
            v-else-if="verificationResult && !verificationResult.isSuccess && verificationResult.failRemark === '校验中'"
          >
            <div class="icon iconfont iconyichang"></div>
            <div class="title">校验中</div>
            <div class="txt">数据校验中请刷新重试</div>
          </div>
          <div class="audit-state not-pass" v-else-if="verificationResult && !verificationResult.isSuccess">
            <div class="icon iconfont iconshanchu"></div>
            <div class="title">校验失败</div>
            <div class="txt">请核对并修改以下信息后，再重新提交。</div>
          </div>
        </div>
        <div class="info-cont" v-if="isShowContent">
          <div class="title">信息内容</div>
          <ul>
            <li v-if="arr_verification[0].isSuccess">
              <i class="iconfont iconzhengchang"></i>
              {{ arr_verification[0].verificationTypeString }}校验成功
            </li>
            <li v-else>
              <i class="iconfont" :class="verificationResult.failRemark === '校验中' ? 'iconyichang' : 'iconshanchu'"></i>
              {{ arr_verification[0].failRemark }}
            </li>
          </ul>
        </div>
        <div class="footer" slot="footer" v-if="isShowContent">
          <Button
            class="mr10"
            @click="backEdit"
            v-if="!verificationResult.isSuccess && verificationResult.failRemark !== '校验中'"
            >返回修改</Button
          >
          <Button type="primary" @click="$router.push({ name: 'Confirm' })" v-else-if="verificationResult.isSuccess"
            >确定提交</Button
          >
          <Button type="primary" @click="sureSubmit" v-else-if="verificationResult.isSuccess">确定提交</Button>
          <Button
            type="primary"
            @click="refresh"
            v-else-if="!verificationResult.isSuccess && verificationResult.failRemark === '校验中'"
            >刷新</Button
          >
        </div>
      </div>
    </Modal>
  </div>
</template>

<script src='./SchoolFill.js'></script>

<style lang="less" scoped>
.footer {
  margin-top: 3rem;
  text-align: center;
}
</style>

