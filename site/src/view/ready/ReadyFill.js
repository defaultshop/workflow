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
      schoolType: sessionStorage.getItem("schoolType"),
      childrenName: "",
      graduatedSchoolInfoName: "",
      childrenCardId: "",
      childrenRegisterAddress: "",
      father_registered: "",
      arr_fatherRegistered: new Array(4),
      temp_fatherRegistered: new Array(4),
      guardian: "",
      guardian_phone: "",
      school_area: "",
      graduated_primarySchoolList: [],
      graduated_primarySchool: "",
      voluteer_schoolList: [],
      voluteer_school: ""
    };
  },
  async created() {
    //  志愿学校
    let res = await res_apply.get_GetEnableList({
      schoolType: this.schoolType
    });

    if (res.success) {
      this.voluteer_schoolList = res.result;
    }

    // 毕业小学
    if (this.schoolType == "4") {
      let res = await res_apply.get_GetEnableList({
        schoolType: 2
      });

      if (res.success) {
        this.graduated_primarySchoolList = res.result;
      }
    }
    this.areaRequestFather(null, 0);
  },
  methods: {
    //  ------  提交
    async submit() {
      if (!this.childrenName) {
        this.$Message.error("姓名不能为空！");
        return;
      }
      if (!this.childrenCardId) {
        this.$Message.error("身份证号码不能为空！");
        return;
      }
      if (!/(^\d{17}[\dXx]$)/.test(this.childrenCardId)) {
        this.$Message.error("身份证格式错误！");
        return;
      }
      if (!this.father_registered) {
        this.$Message.error("户籍所在地不能为空！");
        return;
      }
      for (let i = 0; i < 4; i++) {
        if (!this.temp_fatherRegistered[i]) {
          this.$Message.error("户籍所在地未选择完整");
          return;
        }
      }
      if (!this.guardian) {
        this.$Message.error("监护人不能为空！");
        return;
      }
      if (!this.guardian_phone) {
        this.$Message.error("手机号码不能为空！");
        return;
      }
      if (!/^1\d{10}$/.test(this.guardian_phone)) {
        this.$Message.error("请输入正确的手机号");
        return;
      }
      if (!this.voluteer_school) {
        this.$Message.error("请选择志愿学校！");
        return;
      }

      let res = await res_apply.post_SubmitFrontChildrenInfo({
        schoolRegisterType: sessionStorage.getItem("schoolRegisterType"),
        businessType: sessionStorage.getItem("businessTypes"),
        childrenName: this.childrenName,
        childrenCardId: this.childrenCardId,
        childrenRegisterAddress: this.father_registered,
        childSchoolInDevelopment: this.school_area === "true",
        schoolInfoId: this.voluteer_school,
        graduatedSchoolInfoName: this.graduated_primarySchool,
        guardianName: this.guardian,
        guardianTell: this.guardian_phone
      });

      if (res.success) {
        this.$Message.success("信息填写成功");
        this.$router.push({
          name: "ReadyResult",
          query: {
            cardId: this.childrenCardId
          }
        });
      }
    },

    //  ======  父亲
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
