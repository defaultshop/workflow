<template>
  <div>
    <Header></Header>
    <div class="content-box">
      <div class="form-list">
        <div class="title-bar">
          <span class="title">开发区幼儿园入园报名</span>
        </div>
        <Form label-position="top">
          <div class="subtitle">上传附件材料</div>
          <Row>
            <Col span="11">
              <FormItem label="上传户口本首页">
                <upload @success="uploadSuccess($event, 1)" :imgId="form.childrenHouseholdBookHome"></upload>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="11">
              <FormItem label="上传户口本父亲信息页">
                <upload @success="uploadSuccess($event, 2)" :imgId="form.childrenHouseholdBookFather"></upload>
              </FormItem>
            </Col>
            <Col span="11" offset="2">
              <FormItem label="上传户口本母亲信息页">
                <upload @success="uploadSuccess($event, 3)" :imgId="form.childrenHouseholdBookMother"></upload>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="11">
              <FormItem label="上传户口本幼儿信息页">
                <upload @success="uploadSuccess($event, 4)" :imgId="form.childrenHouseholdBookOneself"></upload>
              </FormItem>
            </Col>
            <Col span="11" offset="2">
              <FormItem label="上传单位证明（单位盖章）">
                <upload @success="uploadSuccess($event, 5)" :imgId="form.unitUndertakingsBook"></upload>
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
    <Footer></Footer>
  </div>
</template>

<script>
import * as res_apply from '@/api/infoFill';
import * as res_common from '@/api/common';
import baseUrl from '@/api/env';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import TitleBar from '@/components/TitleBar.vue';
import upload from '@/components/kindUpload.vue';
import { UnSubmittedSchoolRegisterInfo } from '@/api/infoFill';
export default {
  components: {
    Header,
    Footer,
    TitleBar,
    upload
  },
  data() {
    return {
      schoolRegisterType: 1,
      businessType: '',
      form: {
        childrenHouseholdBookHome: '', //儿童户口本-首页
        childrenHouseholdBookOneself: '', //儿童户口本-本人页.
        childrenHouseholdBookFather: '',
        childrenHouseholdBookMother: '',
        unitUndertakingsBook: '' //单位证明（单位盖章）
      }
    };
  },
  created() {
    this.schoolRegisterType = this.$route.query.schoolRegisterType - 0;
    this.businessType = this.$route.query.businessType - 0;
    this.getEditData();
  },
  methods: {
    uploadSuccess(id, i) {
      if (i === 1) this.form.childrenHouseholdBookHome = id.join();
      if (i === 2) this.form.childrenHouseholdBookFather = id.join();
      if (i === 3) this.form.childrenHouseholdBookMother = id.join();
      if (i === 4) this.form.childrenHouseholdBookOneself = id.join();
      if (i === 5) this.form.unitUndertakingsBook = id.join();
    },
    getEditData() {
      let params = {
        schoolRegisterType: this.schoolRegisterType,
        businessType: this.businessType
      };
      UnSubmittedSchoolRegisterInfo(params).then(res => {
        if (res.success) {
          this.form.childrenHouseholdBookOneself = res.result.childrenHouseholdBookOneself;
          this.form.childrenHouseholdBookHome = res.result.childrenHouseholdBookHome;
          this.form.childrenHouseholdBookFather = res.result.childrenHouseholdBookFather;
          this.form.childrenHouseholdBookMother = res.result.childrenHouseholdBookMother;
          this.form.unitUndertakingsBook = res.result.unitUndertakingsBook;
        }
      });
    },
    async submitInfo() {
      if (!this.form.childrenHouseholdBookHome) {
        this.$Message.error('请上传户口本首页！');
        return;
      }
      if (!this.form.childrenHouseholdBookFather && !this.form.childrenHouseholdBookMother) {
        this.$Message.error('请上传户口本父亲或母亲的信息页！');
        return;
      }
      if (!this.form.childrenHouseholdBookOneself) {
        this.$Message.error('请上传户口本儿童信息页！');
        return;
      }
      // if (!this.form.unitUndertakingsBook) {
      //   this.$Message.error('请上传单位证明（单位盖章）！');
      //   return;
      // }

      this.form.schoolRegisterType = this.schoolRegisterType;
      this.form.businessType = this.businessType;
      let res = await res_apply.post_AddBookInfo(this.form);
      if (res.success) {
        this.$Message.success('附件信息上传成功');
        this.$router.push({
          path: '/lishui/school',
          query: { schoolRegisterType: this.schoolRegisterType, businessType: this.businessType }
        });
      }
    }
  }
};
</script>
