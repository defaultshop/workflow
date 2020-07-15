<template>
  <div>
    <child-header></child-header>
    <div class="content-box">
      <div class="form-list">
        <div class="title-bar">
          <!-- <span class="title">开发区公办{{ schoolType == '2' ? '小学' : '中学' }}入学报名</span> -->
          <span class="title">开发区幼儿园入园报名</span>
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

<script>
import * as res_repay from '@/api/infoFill';
import childHeader from '@/view/components/Header.vue';
import childFooter from '@/view/components/Footer.vue';
import TitleBar from '@/components/TitleBar.vue';
import ReportDetail from './ReportDetail.vue';

export default {
  components: {
    'child-header': childHeader,
    'child-footer': childFooter,
    TitleBar,
    ReportDetail
  },
  data() {
    return {
      modal1: false,
      data_info: {},
      cardId: '', // 儿童身份证
      is_verioffical: false,
      code_text: '获取验证码',
      code: '',
      time_internal: null,
      tel: '',
      schoolType: sessionStorage.getItem('schoolType'),
      businessType: sessionStorage.getItem('businessTypes')
    };
  },
  async created() {
    //  获取信息
    let res = await res_repay.UnSubmittedSchoolRegisterInfo({
      schoolRegisterType: this.$route.query.schoolRegisterType,
      businessType: this.$route.query.businessType
    });

    if (res.success) {
      this.data_info = res.result;
      this.cardId = res.result.childrenCardId;
    }
  },
  methods: {
    skip() {
      this.$router.push({
        path: '/kind/result',
        query: {
          schoolRegisterType: this.$route.query.schoolRegisterType,
          businessType: this.$route.query.businessType,
          cardId: this.cardId
        }
      });
    },
    phoneVerify() {
      if (!this.tel) {
        this.$Message.error('请输入手机号');
        return false;
      }
      if (!/^1\d{10}$/.test(this.tel)) {
        this.$Message.error('请输入正确的手机号');
        return false;
      }

      return true;
    },

    //  ------ 获取验证码
    async getCode() {
      if (!this.phoneVerify()) {
        return;
      }
      if (this.code_text === '获取验证码') {
        let time_number = 60;
        this.verify_class = 'gray-btn';
        this.code_text = time_number-- + 's重新获取';
        if (this.time_internal != null) return;

        let res = await res_repay.post_Send({
          serviceCode: '',
          mobile: this.tel
        });
        if (res.success) {
          this.$Message.success('验证码发送成功');
          this.time_internal = setInterval(() => {
            if (time_number <= 0) {
              this.code_text = '获取验证码';
              this.verify_class = 'blue-btn';
              clearInterval(this.time_internal);
              this.time_internal = null;
              return;
            }
            this.code_text = time_number-- + 's重新获取';
          }, 1000);
        }
      }
    },

    // ------ 校验验证码是否正确
    async postVerify() {
      if (!this.phoneVerify()) {
        return;
      }
      let res = await res_repay.post_SubmitData({
        mobile: this.tel,
        serviceCode: '',
        verificationCode: this.code,
        schoolRegisterType: this.$route.query.schoolRegisterType,
        businessType: this.$route.query.businessType
      });
      if (res.success) {
        this.skip();
      }
    }
  }
};
</script>
