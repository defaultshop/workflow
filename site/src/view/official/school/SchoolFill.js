import * as res_repay from "@/api/infoFill";

import childHeader from "@/view/components/Header.vue";
import childFooter from "@/view/components/Footer.vue";
import TitleBar from "@/components/TitleBar.vue";

export default {
  components: {
    "child-header": childHeader,
    "child-footer": childFooter,
    TitleBar
  },
  data() {
    return {
      selectedSchool: "",
      arr_schoolList: [],
      is_progress: false,
      progress_count: 0,
      arr_compareData: [],
      verificationResult: {},
      arr_verification: [], //   需要校验的数据
      isShowContent: false //  是否显示信息内容
    };
  },
  async created() {
    let res = await res_repay.get_GetEnableList({
      schoolType: sessionStorage.getItem("schoolType")
    });

    if (res.success) {
      this.arr_schoolList = res.result;
    }
    this.getEidtData();
  },
  methods: {
    backEdit() {
      this.is_progress = false;
      this.$router.push({
        name: "ChildFill",
        query: {
          index: 0 //  当前是第几步，0代表第一步
        }
      });
    },
    refresh() {
      this.isShowContent = false;
      this.progress_count = 0;
      this.checkInfo();
    },
    async getEidtData() {
      let res = await res_repay.UnSubmittedSchoolRegisterInfo({
        schoolRegisterType: sessionStorage.getItem("schoolRegisterType"),
        businessType: sessionStorage.getItem("businessTypes")
      });
      if (res.success) {
        this.selectedSchool = res.result.schoolInfoId;
      }
    },
    // ------ 提交效验信息
    async checkInfo() {
      //  1. 开始提交
      let res = await res_repay.post_SubmitAndVerification({
        schoolRegisterType: sessionStorage.getItem("schoolRegisterType"),
        businessType: sessionStorage.getItem("businessTypes")
      });

      if (res.success) {
        //  2. 提交接口调用成功

        if (sessionStorage.getItem("isSkipCheck") == "true") {
          this.$router.push({
            name: "Confirm"
          });
        }

        this.arr_verification = [res.result];
        this.verificationResult = res.result;

        //  3. 获取提交的信息(这个接口好像是没用的,当时不知道为啥要这样写,感觉要去掉,然后把对比结果的那段放上来)
        let resData = await res_repay.post_SchoolRegisterInfo({
          schoolRegisterType: sessionStorage.getItem("schoolRegisterType"),
          businessType: sessionStorage.getItem("businessTypes")
        });
        if (resData.success) {
          //  对比结果
          this.arr_compareData = this.arr_verification.map(item => {
            item.verificationTypeString = this.$common.VerificationTypeEnum(
              item.verificationType
            );

            // item.verificationResultTypeString = this.commons.VerificationResultTypeEnum(item.verificationResultType);
            // item.verificationResultTypeString = this.commons.VerificationResultTypeEnum(item.verificationType);
            item.verificationResultTypeString = item.failRemark;

            return item;
          });

          this.is_progress = true;
          this.verifyData();
        }
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

      this.$once("hook:beforeDestroy", () => {
        clearInterval(timer);
      });
    },

    // ------ 提交信息
    async submitInfo() {
      if (!this.selectedSchool) {
        this.$Message.error("请选择学校");
        return;
      }

      let res = await res_repay.post_AddSchoolInfo({
        schoolInfoId: this.selectedSchool,
        schoolRegisterType: sessionStorage.getItem("schoolRegisterType"),
        businessType: sessionStorage.getItem("businessTypes")
      });

      if (res.success) {
        this.checkInfo();
      }
    }
  },
  watch: {
    is_progress(val) {
      if (!val) {
        this.isShowContent = false;
        this.progress_count = 0;
      }
    }
  }
};
