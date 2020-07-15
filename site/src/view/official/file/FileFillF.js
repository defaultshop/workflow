import * as res_common from "@/api/common";
import * as res_repay from "@/api/infoFill";
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
      childrenHouseholdBookHome: "",
      childrenHouseholdBookFather: "",
      childrenHouseholdBookMother: "",
      childrenHouseholdBookOneself: "",
      marriageCertificateBook: "",
      residencePermitBook: ""
    };
  },
  async created() {
    let res = await res_repay.UnSubmittedSchoolRegisterInfo({
      schoolRegisterType: sessionStorage.getItem("schoolRegisterType"),
      businessType: sessionStorage.getItem("businessTypes")
    });
    if (res.success) {
      if (res.result.bookIsFill) {
        this.childrenHouseholdBookHome = res.result.childrenHouseholdBookHome;
        this.childrenHouseholdBookFather =
          res.result.childrenHouseholdBookFather;
        this.childrenHouseholdBookMother =
          res.result.childrenHouseholdBookMother;
        this.childrenHouseholdBookOneself =
          res.result.childrenHouseholdBookOneself;
        this.marriageCertificateBook = res.result.marriageCertificateBook;
        this.residencePermitBook = res.result.residencePermitBook;
      }
    }
  },
  methods: {
    uploadSuccess(id, i) {
      if (i === 1) this.childrenHouseholdBookHome = id.join();
      if (i === 2) this.childrenHouseholdBookFather = id.join();
      if (i === 3) this.childrenHouseholdBookMother = id.join();
      if (i === 4) this.childrenHouseholdBookOneself = id.join();
      if (i === 5) this.marriageCertificateBook = id.join();
      if (i === 6) this.residencePermitBook = id.join();
    },

    // ------ 提交信息
    async submitInfo() {
      if (!this.childrenHouseholdBookHome) {
        this.$Message.error("请上传户口本首页");
        return;
      }
      if (!this.childrenHouseholdBookFather) {
        this.$Message.error("请上传户口本父亲信息页");
        return;
      }
      if (!this.childrenHouseholdBookMother) {
        this.$Message.error("请上传户口本母亲信息页");
        return;
      }
      if (!this.childrenHouseholdBookOneself) {
        this.$Message.error("请上传户口本儿童信息页");
        return;
      }
      if (!this.marriageCertificateBook) {
        this.$Message.error("请上传父母结婚证或离婚协议");
        return;
      }

      //  提交附件
      let res = await res_repay.post_AddBookInfo({
        childrenHouseholdBookHome: this.childrenHouseholdBookHome,
        childrenHouseholdBookFather: this.childrenHouseholdBookFather,
        childrenHouseholdBookMother: this.childrenHouseholdBookMother,
        childrenHouseholdBookOneself: this.childrenHouseholdBookOneself,
        marriageCertificateBook: this.marriageCertificateBook,
        residencePermitBook: this.residencePermitBook,
        schoolRegisterType: sessionStorage.getItem("schoolRegisterType"),
        businessType: sessionStorage.getItem("businessTypes")
      });
      if (res.success) {
        this.$Message.success("上传成功");
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
