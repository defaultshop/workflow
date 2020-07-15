import * as res_home from "@/api/home";
import * as res_common from "@/api/common";
import baseUrl from "@/api/env";
import childHeader from "@/view/components/Header.vue";
import childFooter from "@/view/components/Footer.vue";

export default {
  components: {
    "child-header": childHeader,
    "child-footer": childFooter
  },
  data() {
    return {
      realName: sessionStorage.getItem("realName"),
      baseUrl: baseUrl,
      json_applyData: {}, //  报名类型
      notice_data: "", //  咨讯
      policy_data: "", //  政策规定
      is_scrolling: false, //  滚动控制
      childArr: []
    };
  },
  async created() {
    //  获取所有枚举
    let res_allEnum = await res_common.get_allList();
    if (res_allEnum.success) {
      res_allEnum.result.SchoolRegisterTypeObject = {};
      for (let val of res_allEnum.result.SchoolRegisterType) {
        res_allEnum.result.SchoolRegisterTypeObject[val.id] = val.value;
      }
      sessionStorage.setItem("AllEnum", JSON.stringify(res_allEnum.result));
    }

    //  报名类型
    let res_apply = await res_home.GetPcOpen();
    if (res_apply.success) {
      console.log(res_apply.result);
      if (
        res_apply.result.childSchoolType &&
        res_apply.result.childSchoolType.length > 0
      ) {
        let ss = [];
        res_apply.result.childSchoolType.forEach(x => {
          if (!x.isQueryFunction) {
            ss.push(x);
          }
        });
        this.childArr = ss;
      }
      this.json_applyData = res_apply.result;
    }

    //  咨讯
    let res_notice = await res_home.get_notice();
    if (res_notice.success) {
      this.notice_data = res_notice.result;
      this.is_scrolling = true;
    }
  },
  methods: {
    logout() {
      window.location.href =
        "http://www.zjzwfw.gov.cn/zjservice/front/index/page.do?webId=1";
    },

    skip(schoolRegisterType, isSkipCheck, schoolType) {
      sessionStorage.setItem("isSkipCheck", JSON.stringify(isSkipCheck));
      sessionStorage.setItem("schoolRegisterType", schoolRegisterType);
      sessionStorage.setItem("schoolType", schoolType);

      //  是预报名还是正式报名
      if (
        schoolRegisterType == 1 ||
        schoolRegisterType == 2 ||
        schoolRegisterType == 4
      ) {
        //  预报名
        sessionStorage.setItem("readyApply", true);
      } else {
        sessionStorage.setItem("readyApply", false);
      }
      if (schoolRegisterType === 1 || schoolRegisterType === 8) {
        this.$router.push({
          path: "/kind/type",
          query: {
            schoolRegisterType
          }
        });
        return;
      }
      this.$router.push({
        name: "TypeChioce",
        query: { schoolRegisterType }
      });
    }
  }
};
