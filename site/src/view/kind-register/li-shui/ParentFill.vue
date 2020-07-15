<template>
  <div>
    <Header></Header>
    <div class="content-box">
      <div class="form-list">
        <div class="title-bar">
          <span class="title">开发区幼儿园入园报名</span>
          <Alert>政策提示：单亲家庭，父母可选其一个填报</Alert>
        </div>
        <Form label-position="top">
          <div class="subtitle">填报父亲信息</div>
          <Row>
            <Col span="11">
              <FormItem label="父亲姓名">
                <Input v-model.trim="form.fatherName" placeholder="请输入" :maxlength="10"></Input>
              </FormItem>
            </Col>
            <Col span="11" offset="2">
              <FormItem label="身份证号">
                <Input v-model.trim="form.fatherCardId" placeholder="请输入"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="11">
              <FormItem label="手机号码">
                <Input v-model.trim="form.fatherTell" placeholder="请输入"></Input>
              </FormItem>
            </Col>
            <Col span="11" offset="2">
              <FormItem label="工作单位">
                <Input v-model.trim="form.fatherWorkUnit" placeholder="请输入"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="11">
              <FormItem label="工作单位性质">
                <Select placeholder="请选择" v-model="form.fatherNatureOfWorkUnit">
                  <Option v-for="item in natureOfWorkUnit" :key="item.id" :value="item.id">{{ item.value }}</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>

          <div class="subtitle">填报母亲信息</div>
          <Row>
            <Col span="11">
              <FormItem label="母亲姓名">
                <Input v-model.trim="form.motherName" placeholder="请输入" maxlength="10"></Input>
              </FormItem>
            </Col>
            <Col span="11" offset="2">
              <FormItem label="身份证号">
                <Input v-model.trim="form.motherCardId" placeholder="请输入"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="11">
              <FormItem label="手机号码">
                <Input v-model.trim="form.motherTell" placeholder="请输入"></Input>
              </FormItem>
            </Col>
            <Col span="11" offset="2">
              <FormItem label="工作单位">
                <Input v-model.trim="form.motherWorkUnit" placeholder="请输入"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="11">
              <FormItem label="工作单位性质">
                <Select placeholder="请选择" v-model="form.motherNatureOfWorkUnit">
                  <Option v-for="item in natureOfWorkUnit" :key="item.id" :value="item.id">{{ item.value }}</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row class="form-btn">
            <Col span="24">
              <FormItem>
                <Button @click="$router.go(-1)">上一步</Button>
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
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import TitleBar from '@/components/TitleBar.vue';
import { UnSubmittedSchoolRegisterInfo } from '@/api/infoFill';
export default {
  components: {
    Header,
    Footer,
    TitleBar
  },
  data() {
    return {
      schoolRegisterType: 1,
      businessType: '',
      natureOfWorkUnit: '',
      form: {
        fatherName: '',
        fatherCardId: '',
        fatherTell: '', //联系方式
        fatherNatureOfWorkUnit: '',
        motherName: '',
        motherCardId: '',
        motherTell: '', //母亲联系方式
        motherNatureOfWorkUnit: '',
        fatherWorkUnit: '',
        motherWorkUnit: ''
      }
    };
  },
  created() {
    this.schoolRegisterType = this.$route.query.schoolRegisterType - 0;
    this.businessType = this.$route.query.businessType - 0;
    this.natureOfWorkUnit = JSON.parse(sessionStorage.getItem('AllEnum')).NatureOfWorkUnit;
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
          this.form.fatherName = res.result.fatherName;
          this.form.fatherCardId = res.result.fatherCardId;
          this.form.fatherTell = res.result.fatherTell;
          this.form.fatherNatureOfWorkUnit = res.result.fatherNatureOfWorkUnit;
          this.form.motherName = res.result.motherName;
          this.form.motherCardId = res.result.motherCardId;
          this.form.motherTell = res.result.motherTell;
          this.form.motherNatureOfWorkUnit = res.result.motherNatureOfWorkUnit;
          this.form.fatherWorkUnit = res.result.fatherWorkUnit;
          this.form.motherWorkUnit = res.result.motherWorkUnit;
        }
      });
    },
    async submit() {
      let flag = false;
      if (this.form.fatherName || this.form.fatherCardId || this.form.fatherTell || this.form.fatherNatureOfWorkUnit) {
        if (!this.form.fatherName) return this.$Message.error('请输入父亲姓名');
        if (!this.form.fatherCardId) return this.$Message.error('请输入父亲身份证号');
        // if (!/(^\d{17}[\dXx]$)/.test(this.form.fatherCardId)) return this.$Message.error('父亲身份证号格式不正确');
        if (!this.form.fatherTell) return this.$Message.error('请输入父亲手机号');
        if (!/^1\d{10}$/.test(this.form.fatherTell)) return this.$Message.error('父亲手机号格式不正确');
        if (!this.form.fatherWorkUnit) return this.$Message.error('请输入父亲工作单位');
        if (!this.form.fatherNatureOfWorkUnit) return this.$Message.error('请选择父亲工作单位性质');
        flag = true;
      }
      if (this.form.motherName || this.form.motherCardId || this.form.motherTell || this.form.motherNatureOfWorkUnit) {
        if (!this.form.motherName) return this.$Message.error('请输入母亲姓名');
        if (!this.form.motherCardId) return this.$Message.error('请输入母亲身份证号');
        // if (!/(^\d{17}[\dXx]$)/.test(this.form.motherCardId)) return this.$Message.error('母亲身份证号格式不正确');
        if (!this.form.motherTell) return this.$Message.error('请输入母亲手机号');
        if (!/^1\d{10}$/.test(this.form.motherTell)) return this.$Message.error('母亲身手机号格式不正确');
        if (!this.form.motherWorkUnit) return this.$Message.error('请输入母亲工作单位');
        if (!this.form.motherNatureOfWorkUnit) return this.$Message.error('请选择母亲工作单位性质');
        flag = true;
      }
      if (!flag) {
        this.$Message.error('父母双方的信息至少要有一方填报完整');
        return;
      }
      this.form.schoolRegisterType = this.schoolRegisterType;
      this.form.businessType = this.businessType;
      let res = await res_apply.post_AddParentsInfo(this.form);
      if (res.success) {
        this.$Message.success('父母信息填写成功');
        this.$router.push({
          path: '/lishui/house',
          query: { schoolRegisterType: this.schoolRegisterType, businessType: this.businessType }
        });
      }
    }
  }
};
</script>
