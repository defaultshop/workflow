<template>
  <div>
    <Header></Header>
    <div class="content-box">
      <div class="form-list">
        <div class="title-bar">
          <span class="title">开发区幼儿园入园报名</span>
        </div>
        <div class="subtitle">填写符合条件一方的高层次人才信息</div>
        <Form label-position="top">
          <Row>
            <Col span="11">
              <FormItem label="姓名">
                <Input placeholder="请输入" v-model="form.personnelName" maxlength="10"></Input>
              </FormItem>
            </Col>
            <Col span="11" offset="2">
              <FormItem label="身份证号码">
                <Input placeholder="请输入" v-model="form.personnelCardId"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="11">
              <FormItem label="人才卡号">
                <Input placeholder="请输入" v-model="form.personnelCardNo" maxlength="50"></Input>
              </FormItem>
            </Col>
            <Col span="11" offset="2">
              <FormItem label="人才类别">
                <Input placeholder="请输入" v-model="form.personnelType" maxlength="50"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="11">
              <FormItem label="人才编号">
                <Input placeholder="请输入" v-model="form.personnelNumber" maxlength="50"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="11">
              <FormItem label="上传人才证书照片">
                <upload @success="uploadSuccess($event, 1)" :imgId="form.personnelCertificateBook"></upload>
              </FormItem>
            </Col>
          </Row>
          <Row class="form-btn">
            <Col span="24">
              <FormItem>
                <Button @click="$router.back(-1)">取消</Button>
                <Button type="primary" @click="submit">下一步</Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import * as res_apply from '@/api/infoFill';
import baseUrl from '@/api/env';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { UnSubmittedSchoolRegisterInfo } from '@/api/infoFill';
import upload from '../kindUpload';
export default {
  components: {
    Header,
    Footer,
    upload
  },
  data() {
    return {
      schoolRegisterType: '',
      businessType: '',
      form: {
        personnelName: '',
        personnelCardId: '',
        personnelCardNo: '',
        personnelType: '',
        personnelCertificateBook: '',
        personnelNumber: ''
      }
    };
  },
  created() {
    this.schoolRegisterType = this.$route.query.schoolRegisterType - 0;
    this.businessType = this.$route.query.businessType;
    this.getEditData();
  },
  methods: {
    getEditData() {
      let params = {
        schoolRegisterType: this.schoolRegisterType,
        businessType: this.businessType
      };
      UnSubmittedSchoolRegisterInfo(params).then(res => {
        if (res.success) {
          this.form.personnelName = res.result.personnelName;
          this.form.personnelCardId = res.result.personnelCardId;
          this.form.personnelCardNo = res.result.personnelCardNo;
          this.form.personnelType = res.result.personnelType;
          this.form.personnelNumber = res.result.personnelNumber;
          this.form.personnelCertificateBook = res.result.personnelCertificateBook;
        }
      });
    },
    uploadSuccess(id, i) {
      if (i === 1) this.form.personnelCertificateBook = id.join();
    },
    async submit() {
      if (!this.form.personnelName) {
        this.$Message.error('请输入姓名！');
        return;
      }
      if (!this.form.personnelCardId) {
        this.$Message.error('请输入身份证号！');
        return;
      }
      if (!/(^\d{17}[\dXx]$)/.test(this.form.personnelCardId)) {
        this.$Message.error('身份证格式不正确！');
        return;
      }
      if (!this.form.personnelCardNo) {
        this.$Message.error('请输入人才卡号！');
        return;
      }
      if (!this.form.personnelType) {
        this.$Message.error('请输入人才类别！');
        return;
      }
      if (!this.form.personnelNumber) {
        this.$Message.error('请输入人才编号！');
        return;
      }
      if (!this.form.personnelCertificateBook) {
        this.$Message.error('请上传人才证书照片！');
        return;
      }
      this.form.schoolRegisterType = this.schoolRegisterType;
      this.form.businessType = this.businessType;
      let res = await res_apply.post_AddPersonnelInfo(this.form);
      if (res.success) {
        this.$Message.success('高层次人才信息填写成功');
        this.$router.push({
          path: '/nancheng/school',
          query: { schoolRegisterType: this.schoolRegisterType, businessType: this.businessType }
        });
      }
    }
  }
};
</script>
