<template>
  <div>
    <Header></Header>
    <div class="content-box">
      <div class="form-list">
        <TitleBar></TitleBar>
        <div class="subtitle">请填报幼儿信息</div>
        <Form label-position="top">
          <Row>
            <Col span="11">
              <FormItem label="姓名">
                <Input placeholder="请输入" v-model="form.childrenName" :maxlength="10"></Input>
              </FormItem>
            </Col>
            <Col span="11" offset="2">
              <FormItem label="身份证号">
                <Input placeholder="请输入" v-model="form.childrenCardId"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="11">
              <FormItem label="户籍所在地">
                <Input placeholder="请输入" v-model="form.childrenRegisterAddress" maxlength="50"></Input>
              </FormItem>
            </Col>
            <Col span="11" offset="2">
              <FormItem label="家庭详细地址">
                <Input placeholder="请输入" v-model="form.childrenLiveAddress" maxlength="50"></Input>
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
import TitleBar from '@/components/TitleBar.vue';
import { UnSubmittedSchoolRegisterInfo } from '@/api/infoFill';
import upload from '@/components/uploadImg.vue';
export default {
  components: {
    Header,
    Footer,
    TitleBar,
    upload
  },
  data() {
    return {
      schoolRegisterType: '',
      businessType: '',
      form: {
        childrenName: '',
        childrenCardId: '',
        childrenRegisterAddress: '', //幼儿户籍地
        childrenLiveAddress: '' //儿童家庭详细住址(居住地址)
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
          this.form.childrenName = res.result.childrenName;
          this.form.childrenCardId = res.result.childrenCardId;
          this.form.childrenRegisterAddress = res.result.childrenRegisterAddress;
          this.form.childrenLiveAddress = res.result.childrenLiveAddress;
        }
      });
    },
    async submit() {
      if (!this.form.childrenName) {
        this.$Message.error('请输入幼儿姓名！');
        return;
      }
      if (!this.form.childrenCardId) {
        this.$Message.error('请输入幼儿身份证号！');
        return;
      }
      if (!/(^\d{17}[\dXx]$)/.test(this.form.childrenCardId)) {
        this.$Message.error('幼儿身份证格式不正确！');
        return;
      }
      if (!this.form.childrenRegisterAddress) {
        this.$Message.error('请输入幼儿户籍所在地！');
        return;
      }
      if (!this.form.childrenLiveAddress) {
        this.$Message.error('请输入幼儿家庭详细地址！');
        return;
      }
      this.form.schoolRegisterType = this.schoolRegisterType;
      this.form.businessType = this.businessType;
      sessionStorage.setItem('child-idcard', this.form.childrenCardId);
      let res = await res_apply.post_AddChildrenInfo(this.form);
      if (res.success) {
        this.$Message.success('幼儿信息填写成功');
        this.$router.push({
          path: '/nancheng/parentFill',
          query: { schoolRegisterType: this.schoolRegisterType, businessType: this.businessType }
        });
      }
    }
  }
};
</script>
