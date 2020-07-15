import * as res_common from "@/api/common";
import * as res_repay from "@/api/infoFill";
import baseUrl from "@/api/env";
import TitleBar from "@/components/TitleBar.vue";
import childHeader from "@/view/components/Header.vue";
import childFooter from "@/view/components/Footer.vue";
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
      baseUrl: baseUrl,
      nmsParentsHouseholdBookHome: "",
      childrenHouseholdBookOneself: "",
      childrenHouseholdBookParents: "",
      marriageCertificateBook: ""
    };
  },
  async created() {
    let res = await res_repay.UnSubmittedSchoolRegisterInfo({
      schoolRegisterType: sessionStorage.getItem("schoolRegisterType"),
      businessType: sessionStorage.getItem("businessTypes")
    });
    if (res.success) {
      this.nmsParentsHouseholdBookHome = res.result.nmsParentsHouseholdBookHome;
      this.childrenHouseholdBookOneself =
        res.result.childrenHouseholdBookOneself;
      this.childrenHouseholdBookParents =
        res.result.childrenHouseholdBookParents;
      this.marriageCertificateBook = res.result.marriageCertificateBook;
    }
  },
  methods: {
    uploadSuccess(id, i) {
      if (i === 1) this.nmsParentsHouseholdBookHome = id.join();
      if (i === 2) this.childrenHouseholdBookOneself = id.join();
      if (i === 3) this.childrenHouseholdBookParents = id.join();
      if (i === 4) this.marriageCertificateBook = id.join();
    },
    // ------ 提交信息
    async submitInfo() {
      if (!this.nmsParentsHouseholdBookHome) {
        this.$Message.error("请上传户口本南明山父母信息页");
        return;
      }
      if (!this.childrenHouseholdBookOneself) {
        this.$Message.error("请上传儿童户口信息页");
        return;
      }
      if (!this.childrenHouseholdBookParents) {
        this.$Message.error("请上传儿童所在户口本父母信息页");
        return;
      }
      if (!this.marriageCertificateBook) {
        this.$Message.error("请上传父母结婚证或离婚协议");
        return;
      }
      //  提交附件
      let res = await res_repay.post_AddBookInfo({
        nmsParentsHouseholdBookHome: this.nmsParentsHouseholdBookHome,
        childrenHouseholdBookOneself: this.childrenHouseholdBookOneself,
        childrenHouseholdBookParents: this.childrenHouseholdBookParents,
        marriageCertificateBook: this.marriageCertificateBook,
        schoolRegisterType: sessionStorage.getItem("schoolRegisterType"),
        businessType: sessionStorage.getItem("businessTypes")
      });
      if (res.success) {
        this.$Message.success("附件材料上传成功");
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
