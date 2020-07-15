<template>
  <div>
    <Header></Header>
    <div class="content-box">
      <div class="form-list">
        <div class="title-bar">
          <span class="title">开发区幼儿园入园报名</span>
        </div>
        <Form label-position="top">
          <div class="subtitle">产权信息</div>
          <Row>
            <Col span="11">
              <FormItem label="产权状态">
                <Select placeholder="请选择" v-model="form.houseStatus" @on-change="houseStatusChange">
                  <Option :value="1">已办理不动产权证</Option>
                  <Option :value="2">未办理不动产权证</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="11" offset="2" v-show="form.houseStatus === 1">
              <FormItem label="不动产权号">
                <Input
                  v-model.trim="form.houseRealEstateCertificateNo"
                  placeholder="如浙（2016）丽水市不动产权第003453号"
                  :maxlength="50"
                ></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="11">
              <FormItem label="房产所有人姓名">
                <Input v-model.trim="form.houseName" placeholder="请输入" :maxlength="10"></Input>
              </FormItem>
            </Col>
            <Col span="11" offset="2">
              <FormItem label="身份证号">
                <Input v-model.trim="form.houseCardId" placeholder="请输入"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="11">
              <FormItem label="房产所有人与幼儿的关系">
                <Select placeholder="请选择" v-model="form.houseRelationType">
                  <Option v-for="item in houseRelationType" :key="item.id" :value="item.id">{{ item.value }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="11" offset="2">
              <FormItem label="产权坐落地址">
                <Input v-model.trim="form.houseAddress" placeholder="请输入"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="11">
              <FormItem label="手机号码">
                <Input v-model.trim="form.houseRegisterTell" placeholder="请输入" :maxlength="50"></Input>
              </FormItem>
            </Col>
            <Col span="11" offset="2">
              <FormItem label="所在居委">
                <Input v-model.trim="form.houseResidentCommittee" placeholder="请输入" :maxlength="50"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="11" v-show="form.houseStatus === 2">
              <FormItem label="请上传不动产预登记证明（所提供房产须与所报志愿园区相符）">
                <upload
                  @success="uploadSuccess($event, 2)"
                  :imgId="form.houseCertificateOfRegistrationBook"
                  ref="upload2"
                ></upload>
              </FormItem>
            </Col>
            <Col span="11" v-show="form.houseStatus === 1">
              <FormItem label="请上传不动产权证（所提供房产须与所报志愿园区相符）">
                <upload @success="uploadSuccess($event, 1)" :imgId="form.houseBook" ref="upload1"></upload>
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
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import TitleBar from '@/components/TitleBar.vue';
import upload from '../kindUpload.vue';
import * as submitForm from '@/api/infoFill';
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
      houseRelationType: [],
      form: {
        houseStatus: '',
        houseHaveStatus: '', //房产全权所有人
        houseRealEstateCertificateNo: '', //房产不动产权证号
        houseRelationType: '', //房产所有人与儿童的关系
        houseName: '', //房产所有人姓名
        houseCardId: '', //房产所有人身份证号
        houseRegisterTell: '', //房产所有人手机号
        houseAddress: '', //房产坐落地址
        houseBook: '', //房产证
        houseCertificateOfRegistrationBook: '', //不动产预登记证明
        houseResidentCommittee: ''
      }
    };
  },

  created() {
    this.schoolRegisterType = this.$route.query.schoolRegisterType - 0;
    this.businessType = this.$route.query.businessType;
    this.houseRelationType = JSON.parse(sessionStorage.getItem('AllEnum')).HouseRelationType;
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
          this.form.houseStatus = res.result.houseStatus;
          this.form.houseHaveStatus = res.result.houseHaveStatus;
          this.form.houseRealEstateCertificateNo = res.result.houseRealEstateCertificateNo;
          this.form.houseRelationType = res.result.houseRelationType;
          this.form.houseName = res.result.houseName;
          this.form.houseCardId = res.result.houseCardId;
          this.form.houseRegisterTell = res.result.houseRegisterTell;
          this.form.houseAddress = res.result.houseAddress;
          this.form.houseBook = res.result.houseBook;
          this.form.houseCertificateOfRegistrationBook = res.result.houseCertificateOfRegistrationBook;
          this.form.houseResidentCommittee = res.result.houseResidentCommittee;
        }
      });
    },
    uploadSuccess(id, i) {
      if (i === 1) this.form.houseBook = id.toString();
      if (i === 2) this.form.houseCertificateOfRegistrationBook = id.toString();
    },

    houseStatusChange(val) {
      if (val === 1) {
        this.form.houseCertificateOfRegistrationBook = '';
        this.$refs.upload2.clear();
      }
      if (val === 2) {
        this.form.houseBook = '';
        this.form.houseRealEstateCertificateNo = '';
        this.$refs.upload1.clear();
      }
    },
    async submitInfo() {
      if (!this.form.houseStatus) {
        this.$Message.error('请选择产权情况！');
        return;
      }
      if (!this.form.houseName) {
        this.$Message.error('请输入产权人姓名！');
        return;
      }
      if (!this.form.houseCardId) {
        this.$Message.error('请输入产权人身份证号！');
        return;
      }
      if (!this.form.houseRelationType) {
        this.$Message.error('请选择房产所有人与幼儿的关系！');
        return;
      }
      if (!this.form.houseAddress) {
        this.$Message.error('请输入产权坐落地址！');
        return;
      }
      if (!this.form.houseRegisterTell) return this.$Message.error('请输入产权人手机号');
      if (!/^1\d{10}$/.test(this.form.houseRegisterTell)) return this.$Message.error('产权人手机号格式不正确');
      if (!this.form.houseResidentCommittee) return this.$Message.error('请输入所在居委');
      if (this.form.houseStatus === 1) {
        if (!this.form.houseBook) {
          this.$Message.error('请上传上传不动产权证！');
          return;
        }
        if (!this.form.houseRealEstateCertificateNo) {
          this.$Message.error('请输入不动产权号！');
          return;
        }
      }
      if (this.form.houseStatus === 2) {
        if (!this.form.houseCertificateOfRegistrationBook) {
          this.$Message.error('请上传不动产预登记证明！');
          return;
        }
      }
      this.form.schoolRegisterType = this.schoolRegisterType;
      this.form.businessType = this.businessType;
      let res = await submitForm.post_AddHouseInfo(this.form);
      if (res.success) {
        this.$Message.success('房产信息填写成功');
        this.$router.push({
          path: '/lishui/file',
          query: {
            schoolRegisterType: this.$route.query.schoolRegisterType,
            businessType: this.$route.query.businessType
          }
        });
      }
    }
  }
};
</script>
