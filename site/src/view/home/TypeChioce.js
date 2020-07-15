import * as res_apply from "@/api/infoFill";
import childHeader from "@/view/components/Header.vue";
import childFooter from "@/view/components/Footer.vue";

export default {
  components: {
    "child-header": childHeader,
    "child-footer": childFooter
  },
  data() {
    return {
      arr_showList: []
    };
  },
  created() {},
  methods: {
    async skip(businessTypes) {
      switch (businessTypes) {
        case "1":
          sessionStorage.setItem("typeTextDesc", "一类:适龄儿童户籍在开发区的");
          break;
        case "2":
          sessionStorage.setItem(
            "typeTextDesc",
            "二类1批:父母一方户口在开发区的"
          );
          break;
        case "4":
          sessionStorage.setItem(
            "typeTextDesc",
            "二类2批:父母在开发区购买全权所有商品住房的"
          );
          break;
        case "8":
          sessionStorage.setItem(
            "typeTextDesc",
            "二类3批:父母在开发区经商、办企业的"
          );
          break;
        case "16":
          sessionStorage.setItem(
            "typeTextDesc",
            "二类4批:父母双方在开发区用工单位工作均在一年以上的"
          );
          break;
        case "32":
          sessionStorage.setItem(
            "typeTextDesc",
            "二类5批:父母单方在开发 区用工单位工作6个月以上的"
          );
          break;
      }
      sessionStorage.setItem("businessTypes", businessTypes);
      let arr = this.$common.allOfficialConfig();

      let res = await res_apply.UnSubmittedSchoolRegisterInfo({
        schoolRegisterType: sessionStorage.getItem("schoolRegisterType"),
        businessType: sessionStorage.getItem("businessTypes")
      });

      if (res.success) {
        this.arr_showList = this.$common.officialConfig(res, arr);

        if (sessionStorage.getItem("readyApply") == "true") {
          this.$router.push({
            name: "ReadyFill"
          });
          return;
        }

        //  保存步骤
        sessionStorage.setItem(
          "list_stepData",
          JSON.stringify(this.arr_showList.arr_stepData)
        );

        this.$router.push({
          name: this.arr_showList.arr_stepData[0].name,
          query: {
            index: 0 //  当前是第几步，0代表第一步
          }
        });
      }
    }
  }
};
