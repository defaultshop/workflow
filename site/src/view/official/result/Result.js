import * as res_repay from "@/api/infoFill";
import * as res_common from "@/api/common";

import childHeader from "@/view/components/Header.vue";
import childFooter from "@/view/components/Footer.vue";

export default {
  components: {
    "child-header": childHeader,
    "child-footer": childFooter
  },
  data() {
    return {
      data_info: {},
      arr_remark: [],
      businessType: sessionStorage.getItem("businessTypes")
    };
  },
  async created() {
    //  获取须知
    let res = await res_common.post_getNotice({
      schoolTypes: [sessionStorage.getItem("schoolType")],
      businessTypes: [sessionStorage.getItem("businessTypes")],
      noticeTypes: [8]
    });

    if (res.success) {
      this.arr_remark = res.result;
    }

    //  获取信息
    let resInfo = await res_repay.post_SchoolRegisterInfo({
      schoolRegisterType: sessionStorage.getItem("schoolRegisterType"),
      businessType: sessionStorage.getItem("businessTypes"),
      cardId: this.$route.query.cardId
    });

    if (resInfo.success) {
      this.data_info = resInfo.result;
    }
  }
};
