<template>
  <div>
    <child-header></child-header>
    <div class="content-box">
      <div class="form-list">
        <div class="title-bar">
          <span class="title">开发区公办{{ schoolType == '2' ? '小学' : '中学' }}入学报名</span>
          <span class="title" v-if="businessType === 1 || businessType === 8">开发区幼儿园入园报名</span>
        </div>
        <ReportDetail :data_info="data_info"></ReportDetail>
        <div class="form-btn">
          <Button @click="$router.go(-1)">上一步</Button>
          <Button type="primary" @click="is_verioffical = true">确认提交</Button>
        </div>
      </div>
    </div>
    <child-footer></child-footer>
    <Modal v-model="is_verioffical" width="680" class="code-model">
      <div class="inner">
        <div class="model-title">验证码</div>
        <Form label-position="top">
          <FormItem label="手机号">
            <Input v-model="tel" placeholder="请输入"></Input>
          </FormItem>
          <FormItem label="验证码" class="code">
            <Input placeholder="请输入验证码" v-model="code"></Input>
            <Button type="primary" ghost @click="getCode">{{ code_text }}</Button>
            <!-- <Button type="primary" ghost disabled>验证码倒计时</Button> -->
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button class="mr10" @click="is_verioffical = false">取消</Button>
        <Button type="primary" @click="postVerify">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script src='./Confirm.js'></script>
