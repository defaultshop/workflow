import * as res_apply from "@/api/infoFill";
import * as res_common from "@/api/common";
import upload from "@/components/uploadImg";
import childHeader from "@/view/components/Header.vue";
import childFooter from "@/view/components/Footer.vue";
import TitleBar from "@/components/TitleBar.vue";
export default {
  components: {
    "child-header": childHeader,
    "child-footer": childFooter,
    TitleBar,
    upload
  },
  data() {
    return {
      companyNameOfFather: "",
      companyUnifiedSocialCreditCodeOfFather: "",
      companyContractDeadlineBookOfFather: "",
      companyContractSignBookOfFather: "",

      companyNameOfMother: "",
      companyUnifiedSocialCreditCodeOfMother: "",
      companyContractDeadlineBookOfMother: "",
      companyContractSignBookOfMother: ""
    };
  },
  async created() {
    let res = await res_apply.UnSubmittedSchoolRegisterInfo({
      schoolRegisterType: sessionStorage.getItem("schoolRegisterType"),
      businessType: sessionStorage.getItem("businessTypes")
    });
    if (res.success) {
      this.companyNameOfFather = res.result.companyNameOfFather;
      this.companyUnifiedSocialCreditCodeOfFather =
        res.result.companyUnifiedSocialCreditCodeOfFather;
      this.companyContractDeadlineBookOfFather =
        res.result.companyContractDeadlineBookOfFather;
      this.companyContractSignBookOfFather =
        res.result.companyContractSignBookOfFather;

      this.companyNameOfMother = res.result.companyNameOfMother;
      this.companyUnifiedSocialCreditCodeOfMother =
        res.result.companyUnifiedSocialCreditCodeOfMother;
      this.companyContractDeadlineBookOfMother =
        res.result.companyContractDeadlineBookOfMother;
      this.companyContractSignBookOfMother =
        res.result.companyContractSignBookOfMother;
    }

    this.areaRequestFather(null, 0);
  },
  methods: {
    uploadSuccess(id, i) {
      if (i === 1) this.companyContractDeadlineBookOfFather = id.join();
      if (i === 2) this.companyContractSignBookOfFather = id.join();
      if (i === 3) this.companyContractDeadlineBookOfMother = id.join();
      if (i === 4) this.companyContractSignBookOfMother = id.join();
    },
    async submitInfo() {
      if (!this.companyNameOfFather) {
        this.$Message.error("父亲所在单位不能为空！");
        return;
      }
      if (!this.companyUnifiedSocialCreditCodeOfFather) {
        this.$Message.error("父亲统一社会代码不能为空！");
        return;
      }
      if (!this.companyContractDeadlineBookOfFather) {
        this.$Message.error("请上传父亲单位合同期限页！");
        return;
      }
      if (!this.companyContractSignBookOfFather) {
        this.$Message.error("请上传父亲单位合同签字盖章页！");
        return;
      }
      if (!this.companyNameOfMother) {
        this.$Message.error("母亲所在单位不能为空！");
        return;
      }
      if (!this.companyUnifiedSocialCreditCodeOfMother) {
        this.$Message.error("母亲统一社会代码不能为空！");
        return;
      }
      if (!this.companyContractDeadlineBookOfMother) {
        this.$Message.error("请上传母亲单位合同期限页！");
        return;
      }
      if (!this.companyContractSignBookOfMother) {
        this.$Message.error("请上传母亲单位合同签字盖章页！");
        return;
      }

      //  提交附件
      let res = await res_apply.post_AddCompanyInfo({
        companyNameOfFather: this.companyNameOfFather,
        companyNameOfMother: this.companyNameOfMother,
        companyUnifiedSocialCreditCodeOfFather: this
          .companyUnifiedSocialCreditCodeOfFather,
        companyUnifiedSocialCreditCodeOfMother: this
          .companyUnifiedSocialCreditCodeOfMother,
        companyContractDeadlineBookOfFather: this
          .companyContractDeadlineBookOfFather,
        companyContractSignBookOfFather: this.companyContractSignBookOfFather,
        companyContractDeadlineBookOfMother: this
          .companyContractDeadlineBookOfMother,
        companyContractSignBookOfMother: this.companyContractSignBookOfMother,
        schoolRegisterType: sessionStorage.getItem("schoolRegisterType"),
        businessType: sessionStorage.getItem("businessTypes")
      });
      if (res.success) {
        this.$Message.success("单位信息上传成功");
        this.$router.push({
          name: JSON.parse(sessionStorage.getItem("list_stepData"))[
            parseInt(this.$route.query.index) + 1
          ].name,
          query: {
            index: ++this.$route.query.index
          }
        });
      }
    },

    //  ------  地区选择
    async areaRequestFather(code, index) {
      let res = await res_apply.get_AreaList({
        parentCode: code
      });
      if (res.success) {
        let tempArr = res.result.map(item => {
          item.index = index;
          item.value = item.name;
          item.label = item.name;
          return item;
        });
        this.arr_fatherRegistered.splice(index, 1, tempArr);
      }
    },

    // ------ 每次选择触发
    selectAreaFather(datas) {
      if (datas == undefined) {
        return;
      }

      let data = JSON.parse(datas);
      if (data.index != 3) {
        this.areaRequestFather(data.code, data.index + 1);
      } else {
        this.father_registered = "";
        this.temp_fatherRegistered.forEach(item => {
          this.father_registered += JSON.parse(item).name + " ";
        });
      }
    }
  }
};
