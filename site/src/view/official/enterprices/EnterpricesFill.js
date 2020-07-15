import * as res_apply from "@/api/infoFill";
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
      enterpriseCompanyName: "",
      enterpriseRegisterNo: "",
      enterprisePersonName: "",
      enterprisePersonCardId: "",
      enterpriseThresholdCertificateBook: "",
      enterpriseBusinessLicenseBook: ""
    };
  },
  async created() {
    let res = await res_apply.UnSubmittedSchoolRegisterInfo({
      schoolRegisterType: sessionStorage.getItem("schoolRegisterType"),
      businessType: sessionStorage.getItem("businessTypes")
    });
    if (res.success) {
      if (res.result.childIsFill) {
        this.enterpriseCompanyName = res.result.enterpriseCompanyName;
        this.enterpriseRegisterNo = res.result.enterpriseRegisterNo;
        this.enterprisePersonName = res.result.enterprisePersonName;
        this.enterprisePersonCardId = res.result.enterprisePersonCardId;
        this.enterpriseThresholdCertificateBook =
          res.result.enterpriseThresholdCertificateBook;
        this.enterpriseBusinessLicenseBook =
          res.result.enterpriseBusinessLicenseBook;
      }
    }
  },
  methods: {
    uploadSuccess(id, i) {
      if (i === 1) this.enterpriseBusinessLicenseBook = id.join();
      if (i === 2) this.enterpriseThresholdCertificateBook = id.join();
    },

    async submitInfo() {
      if (!this.enterpriseCompanyName) {
        this.$Message.error("企业名称不能为空！");
        return;
      }
      if (!this.enterpriseRegisterNo) {
        this.$Message.error("注册号不能为空！");
        return;
      }
      if (!this.enterprisePersonName) {
        this.$Message.error("法人不能为空！");
        return;
      }
      if (!this.enterprisePersonCardId) {
        this.$Message.error("法人身份证号不能为空！");
        return;
      }
      if (!this.enterpriseBusinessLicenseBook) {
        this.$Message.error("请上传企业营业执照！");
        return;
      }
      if (!this.enterpriseThresholdCertificateBook) {
        this.$Message.error("请上传企业起征点凭证！");
        return;
      }

      let res = await res_apply.post_AddEnterpriseInfo({
        enterpriseCompanyName: this.enterpriseCompanyName,
        enterpriseRegisterNo: this.enterpriseRegisterNo,
        enterprisePersonName: this.enterprisePersonName,
        enterprisePersonCardId: this.enterprisePersonCardId,
        enterpriseBusinessLicenseBook: this.enterpriseBusinessLicenseBook,
        enterpriseThresholdCertificateBook: this
          .enterpriseThresholdCertificateBook,
        schoolRegisterType: sessionStorage.getItem("schoolRegisterType"),
        businessType: sessionStorage.getItem("businessTypes")
      });
      if (res.success) {
        this.$Message.success("企业信息填写成功");
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
