<template>
  <div>
    <Header></Header>
    <div class="content-box">
      <div class="form-list">
        <div class="title-bar">
          <span class="title">开发区幼儿园入园报名</span>
          <Alert> 政策提示：报名新生需在开发区以下园区中选择其中一所园区填报，并默认服从园区志愿。</Alert>
        </div>
        <Form label-position="top">
          <div class="subtitle">填报志愿园区</div>
          <Row>
            <Col span="11">
              <FormItem label="是否服从调配">
                <Select placeholder="请选择" v-model="isAcceptTransfer" @on-change="expectScoolChange">
                  <Option :value="1"> 是</Option>
                  <Option :value="2"> 否</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormItem label="志愿园区">
                <div class="select-school">
                  <RadioGroup v-model="form.schoolInfoId">
                    <Radio :label="item.id" v-for="item in schoolList" :key="item.id">{{ item.name }}</Radio>
                  </RadioGroup>
                </div>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col v-if="showOtherSchool">
              <FormItem label="调配志愿一">
                <div class="select-school">
                  <RadioGroup v-model="form.schoolInfoOneId">
                    <Radio :label="item.id" v-for="item in schoolList" :key="item.id">{{ item.name }}</Radio>
                  </RadioGroup>
                </div>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col v-if="showOtherSchool">
              <FormItem label="调配志愿二">
                <div class="select-school">
                  <RadioGroup v-model="form.schoolInfoTwoId">
                    <Radio :label="item.id" v-for="item in schoolList" :key="item.id">{{ item.name }}</Radio>
                  </RadioGroup>
                </div>
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
    <VerificationData
      v-model="is_progress"
      :businessType="businessType"
      :schoolRegisterType="schoolRegisterType"
    ></VerificationData>
  </div>
</template>
<script>
import * as referens from '@/api/infoFill';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import TitleBar from '@/components/TitleBar.vue';
import VerificationData from '@/components/VerificationData.vue';
import { UnSubmittedSchoolRegisterInfo } from '@/api/infoFill';
export default {
  components: {
    Header,
    Footer,
    TitleBar,
    VerificationData
  },
  data() {
    return {
      schoolRegisterType: 1,
      businessType: '',
      showOtherSchool: false,
      is_progress: false,
      form: {
        isAcceptTransfer: '',
        schoolInfoId: '',
        schoolInfoOneId: 0,
        schoolInfoTwoId: 0
      },
      schoolList: [],
      isAcceptTransfer: 1
    };
  },
  created() {
    this.schoolRegisterType = this.$route.query.schoolRegisterType - 0;
    this.businessType = this.$route.query.businessType - 0;
    this.getEditData();
    this.getExpectSchool();
  },
  methods: {
    getEditData() {
      let params = {
        schoolRegisterType: this.schoolRegisterType,
        businessType: this.businessType
      };
      UnSubmittedSchoolRegisterInfo(params).then(res => {
        if (res.success) {
          this.isAcceptTransfer = res.result.isAcceptTransfer === false ? 2 : 1;
          if (res.result.isAcceptTransfer) {
            this.showOtherSchool = true;
          }
          this.form.schoolInfoId = res.result.schoolInfoId;
          this.form.schoolInfoOneId = res.result.schoolInfoOneId;
          this.form.schoolInfoTwoId = res.result.schoolInfoTwoId;
        }
      });
    },
    async getExpectSchool() {
      let res = await referens.get_GetEnableList({
        schoolType: 1,
        schoolRegisterType: this.schoolRegisterType
      });
      if (res.success) {
        this.schoolList = res.result;
      }
    },
    expectScoolChange(val) {
      this.form.schoolInfoOneId = 0;
      this.form.schoolInfoTwoId = 0;
      if (val === 1) this.showOtherSchool = true;
      if (val === 2) this.showOtherSchool = false;
    },
    async submit() {
      if (!this.isAcceptTransfer) {
        this.$Message.error('请选择是否服从调配');
        return;
      }
      if (!this.form.schoolInfoId) {
        this.$Message.error('请选择志愿园区');
        return;
      }
      this.form.schoolRegisterType = this.schoolRegisterType;
      this.form.businessType = this.businessType;
      this.form.isAcceptTransfer = this.isAcceptTransfer === 1 ? true : false;
      let res = await referens.post_AddSchoolInfo(this.form);
      if (res.success) {
        this.$Message.success('志愿学校选择成功');
        if (sessionStorage.getItem('isSkipCheck') == 'true') {
          this.$router.push({
            path: '/kind/confirm',
            query: { schoolRegisterType: this.schoolRegisterType, businessType: this.businessType }
          });
        } else {
          this.is_progress = true;
        }
      }
    }
  }
};
</script>
