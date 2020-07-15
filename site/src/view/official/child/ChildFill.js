import * as res_apply from "@/api/infoFill";
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
      child_name: "",
      child_idCard: "",
      child_registered: "",
      arr_registered: new Array(4),
      temp_registered: new Array(4),
      child_address: "",
      schoolType: sessionStorage.getItem("schoolType")
    };
  },
  async created() {
    let res = await res_apply.UnSubmittedSchoolRegisterInfo({
      schoolRegisterType: sessionStorage.getItem("schoolRegisterType"),
      businessType: sessionStorage.getItem("businessTypes")
    });
    if (res.success) {
      if (res.result.childIsFill) {
        this.child_name = res.result.childrenName;
        this.child_idCard = res.result.childrenCardId;
        this.child_registered = res.result.childrenRegisterAddress;

        this.child_address = res.result.childrenLiveAddress;
      }
    }
    this.areaRequest(null, 0);
  },
  methods: {
    //  ------  提交
    async submit() {
      if (!this.child_name) {
        this.$Message.error("儿童姓名不能为空！");
        return;
      }
      if (!this.child_idCard) {
        this.$Message.error("身份证号码不能为空！");
        return;
      }
      if (!/(^\d{17}[\dXx]$)/.test(this.child_idCard)) {
        this.$Message.error("身份证格式错误！");
        return;
      }

      if (!this.child_registered) {
        this.$Message.error("户籍所在地不能为空！");
        return;
      }

      for (let i = 0; i < 4; i++) {
        if (!this.temp_registered[i]) {
          this.$Message.error("户籍所在地未选择完整");
          return;
        }
      }

      let res = await res_apply.post_AddChildrenInfo({
        childrenName: this.child_name,
        childrenCardId: this.child_idCard,
        childrenRegisterAddress: this.child_registered,
        childrenLiveAddress: this.child_address,
        childSchoolInDevelopment: true,
        schoolInfoId: 0,
        schoolRegisterType: sessionStorage.getItem("schoolRegisterType"),
        businessType: sessionStorage.getItem("businessTypes")
      });

      if (res.success) {
        this.$Message.success("儿童信息填写成功");
        this.$router.push({
          name: JSON.parse(sessionStorage.getItem("list_stepData"))[
            parseInt(this.$route.query.index + 1)
          ].name,
          query: {
            index: ++this.$route.query.index
          }
        });
      }
    },

    //  ------  地区选择
    async areaRequest(code, index) {
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
        this.arr_registered.splice(index, 1, tempArr);
      }
    },

    // ------ 每次选择触发
    selectArea(datas) {
      if (datas == undefined) {
        return;
      }

      let data = JSON.parse(datas);
      if (data.index != 3) {
        this.areaRequest(data.code, data.index + 1);
      } else {
        this.child_registered = "";
        this.temp_registered.forEach(item => {
          this.child_registered += JSON.parse(item).name + " ";
        });
      }
    }
  }
};
