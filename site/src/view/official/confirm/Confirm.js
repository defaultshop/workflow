import * as res_repay from "@/api/infoFill";
import childHeader from "@/view/components/Header.vue";
import childFooter from "@/view/components/Footer.vue";
import TitleBar from "@/components/TitleBar.vue";
import ReportDetail from "@/components/ReportDetail.vue";

export default {
  components: {
    "child-header": childHeader,
    "child-footer": childFooter,
    TitleBar,
    ReportDetail
  },
  data() {
    return {
      modal1: false,
      arr_tabShow: [true, true, true, true, true, true],
      data_info: {},
      cardId: "", // 儿童身份证
      is_verioffical: false,
      code_text: "获取验证码",
      code: "",
      time_internal: null,
      tel: "",
      schoolType: sessionStorage.getItem("schoolType"),
      businessType: sessionStorage.getItem("businessTypes")
    };
  },
  async created() {
    //  获取信息
    let res = await res_repay.UnSubmittedSchoolRegisterInfo({
      schoolRegisterType: sessionStorage.getItem("schoolRegisterType"),
      businessType: sessionStorage.getItem("businessTypes")
    });

    if (res.success) {
      this.data_info = res.result;
      this.cardId = res.result.childrenCardId;
    }
  },
  methods: {
    tabShow(index) {
      this.arr_tabShow.splice(index, 1, !this.arr_tabShow[index]);
    },
    skip() {
      this.$router.push({
        name: "Result",
        query: {
          cardId: this.cardId
        }
      });
    },

    phoneVerify() {
      if (!this.tel) {
        this.$Message.error("请输入手机号");
        return false;
      }
      if (!/^1\d{10}$/.test(this.tel)) {
        this.$Message.error("请输入正确的手机号");
        return false;
      }

      return true;
    },

    //  ------ 获取验证码
    async getCode() {
      if (!this.phoneVerify()) {
        return;
      }

      if (this.code_text === "获取验证码") {
        let time_number = 60;
        this.verify_class = "gray-btn";
        this.code_text = time_number-- + "s重新获取";
        if (this.time_internal != null) return;

        let res = await res_repay.post_Send({
          serviceCode: "",
          mobile: this.tel
        });
        if (res.success) {
          this.$Message.success("验证码发送成功");
          this.time_internal = setInterval(() => {
            if (time_number <= 0) {
              this.code_text = "获取验证码";
              this.verify_class = "blue-btn";
              clearInterval(this.time_internal);
              this.time_internal = null;
              return;
            }
            this.code_text = time_number-- + "s重新获取";
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
        serviceCode: "",
        verificationCode: this.code,
        schoolRegisterType: sessionStorage.getItem("schoolRegisterType"),
        businessType: sessionStorage.getItem("businessTypes")
      });
      if (res.success) {
        this.skip();
      }
    }
  }
};
