import * as res_apply from "@/api/infoFill";
import childHeader from "@/view/components/Header.vue";
import childFooter from "@/view/components/Footer.vue";
import TitleBar from "@/components/TitleBar.vue";
import upload from "@/components/uploadImg";
export default {
  components: {
    "child-header": childHeader,
    "child-footer": childFooter,
    TitleBar,
    upload
  },
  data() {
    return {
      companyName: "",
      companyPersonName: "",
      companyContractDeadlineBook: "",
      companyContractSignBook: ""
    };
  },
  async created() {
    let res = await res_apply.UnSubmittedSchoolRegisterInfo({
      schoolRegisterType: sessionStorage.getItem("schoolRegisterType"),
      businessType: sessionStorage.getItem("businessTypes")
    });
    if (res.success) {
      this.companyName = res.result.companyName;
      this.companyPersonName = res.result.companyPersonName;
      this.companyContractDeadlineBook = res.result.companyContractDeadlineBook;
      this.companyContractSignBook = res.result.companyContractSignBook;
    }
  },
  methods: {
    uploadSuccess(id, i) {
      if (i === 1) this.companyContractDeadlineBook = id.join();
      if (i === 2) this.companyContractSignBook = id.join();
    },
    async submitInfo() {
      if (!this.companyName) {
        this.$Message.error("请输入单位名称！");
        return;
      }
      if (!this.companyPersonName) {
        this.$Message.error("请输入单位法人！");
        return;
      }
      if (!this.companyContractDeadlineBook) {
        this.$Message.error("请上传单位合同期限页！");
        return;
      }
      if (!this.companyContractSignBook) {
        this.$Message.error("请上传单位合同签字页！");
        return;
      }
      let res = await res_apply.post_AddCompanyInfo({
        companyName: this.companyName,
        companyPersonName: this.companyPersonName,
        companyContractDeadlineBook: this.companyContractDeadlineBook,
        companyContractSignBook: this.companyContractSignBook,
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
    }
  }
};
