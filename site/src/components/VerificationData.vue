<template>
  <div v-if="value">
    <!--数据效验-->
    <Modal v-model="is_progress" width="900" class="validation-model" footer-hide>
      <div>
        <div class="inner">
          <div class="progress-bar" v-if="!isShowContent">
            <div class="title cent">数据正在校验...</div>
            <Progress :percent="progress_count" status="active" />
          </div>

          <div class="audit-state pass" v-else-if="verificationResult && verificationResult.isSuccess">
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
            <li v-if="verificationResult && verificationResult.isSuccess">
              <i class="iconfont iconzhengchang"></i>
              {{ verificationResult && verificationResult.verificationTypeString }}校验成功
            </li>
            <li v-else>
              <i class="iconfont " :class="verificationResult.failRemark === '校验中' ? 'iconyichang' : 'iconshanchu'"></i>
              {{ verificationResult && verificationResult.failRemark }}
            </li>
          </ul>
        </div>
        <div class="footer-verification" slot="footer" v-if="isShowContent">
          <Button
            class="mr10"
            @click="backEdit"
            v-if="!verificationResult.isSuccess && verificationResult.failRemark !== '校验中'"
            >返回修改</Button
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
<script>
import * as submitForm from '@/api/infoFill';
export default {
  props: {
    value: {
      type: Boolean
    },
    businessType: {
      type: Number
    },
    schoolRegisterType: {
      type: Number
    }
  },
  data() {
    return {
      show: this.value,
      verificationResult: {},
      isChecking: false,
      checkSuccess: false,
      checkFailed: false,
      is_progress: false,
      progress_count: 0,
      isShowContent: false //  是否显示信息内容
    };
  },
  watch: {
    value(val) {
      this.is_progress = val;
      if (val) {
        this.checkInfo();
      } else {
        this.isShowContent = false;
        this.progress_count = 0;
      }
    },
    is_progress(val) {
      this.$emit('input', val);
    }
  },
  methods: {
    async checkInfo() {
      //  1. 开始提交
      let res = await submitForm.post_SubmitAndVerification({
        schoolRegisterType: this.schoolRegisterType,
        businessType: this.businessType
      });
      if (res.success) {
        //  2. 提交接口调用成功
        this.verificationResult = res.result;
        this.is_progress = true;
        this.verifyData();
      }
    },

    async verifyData() {
      const timer = setInterval(() => {
        this.progress_count += 1;
        if (this.progress_count >= 100) {
          this.progress_count = 100;
          this.isShowContent = true;
          clearInterval(timer);
        }
      }, 30);

      this.$once('hook:beforeDestroy', () => {
        clearInterval(timer);
      });
    },

    backEdit() {
      let businessType = this.businessType;
      let schoolRegisterType = this.schoolRegisterType;
      if (
        businessType === 101 ||
        businessType === 102 ||
        businessType === 103 ||
        businessType === 104 ||
        businessType === 105 ||
        businessType === 106 ||
        businessType === 107
      ) {
        this.$router.push({
          path: '/nancheng/kindfill',
          query: { schoolRegisterType, businessType }
        });
      }
    },
    sureSubmit() {
      this.is_progress = false;
      this.$nextTick(() => {
        if (this.schoolRegisterType === 1 || this.schoolRegisterType === 8) {
          this.$router.push({
            path: '/kind/confirm',
            query: { schoolRegisterType: this.schoolRegisterType, businessType: this.businessType }
          });
          return;
        }
        this.$router.push({
          name: 'Confirm',
          query: {
            schoolRegisterType: this.schoolRegisterType,
            businessType: this.businessType
          }
        });
      });
    },
    refresh() {
      this.isShowContent = false;
      this.progress_count = 0;
      this.checkInfo();
    }
  }
};
</script>
<style lang="less">
.footer-verification {
  margin-top: 3rem;
  text-align: center;
}
</style>