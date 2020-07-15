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
      father_name: "",
      father_registered: "",
      arr_fatherRegistered: new Array(4),
      temp_fatherRegistered: new Array(4),
      father_idCard: "",
      father_mobile: "",
      mother_name: "",
      mother_registered: "",
      arr_motherRegistered: new Array(4),
      temp_motherRegistered: new Array(4),
      mother_idCard: "",
      mother_mobile: ""
    };
  },
  async created() {
    let res = await res_apply.UnSubmittedSchoolRegisterInfo({
      schoolRegisterType: sessionStorage.getItem("schoolRegisterType"),
      businessType: sessionStorage.getItem("businessTypes")
    });
    if (res.success) {
      if (res.result.parentsIsFill) {
        this.father_name = res.result.fatherName;
        this.father_mobile = res.result.fatherTell;
        this.father_idCard = res.result.fatherCardId;
        this.father_registered = res.result.fatherRegisterAddress;
        this.mother_name = res.result.motherName;
        this.mother_idCard = res.result.motherCardId;
        this.mother_mobile = res.result.motherTell;
        this.mother_registered = res.result.motherRegisterAddress;
      }
    }

    this.areaRequestFather(null, 0);
    this.areaRequestMother(null, 0);
  },
  methods: {
    //  ------  提交
    async submit() {
      let type = sessionStorage.getItem("businessTypes") - 0;
      if (type !== 16) {
        let flag = false;
        let areaAlert = false;
        let matherAreaFlag = false;
        for (let i = 0; i < 4; i++) {
          if (!this.temp_fatherRegistered[i]) {
            areaAlert = true;
            break;
          }
        }
        let mm = false;
        for (let i = 0; i < 4; i++) {
          if (this.temp_fatherRegistered[i]) {
            mm = true;
            break;
          }
        }
        if (
          this.father_name ||
          this.father_idCard ||
          this.father_registered ||
          mm
        ) {
          if (!this.father_name) return this.$Message.error("请输入父亲姓名");
          if (!this.father_idCard)
            return this.$Message.error("请输入父亲身份证号");
          if (!/(^\d{17}[\dXx]$)/.test(this.father_idCard))
            return this.$Message.error("父亲身份证号格式不正确");
          if (areaAlert) return this.$Message.error("父亲户籍所在地未选择完整");
          if (!this.father_mobile)
            return this.$Message.error("请输入父亲手机号");
          if (!/^1\d{10}$/.test(this.father_mobile))
            return this.$Message.error("父亲手机号格式不正确");
          flag = true;
        }

        for (let i = 0; i < 4; i++) {
          if (!this.temp_motherRegistered[i]) {
            matherAreaFlag = true;
            break;
          }
        }
        let ss = false;
        for (let i = 0; i < 4; i++) {
          if (this.temp_motherRegistered[i]) {
            ss = true;
            break;
          }
        }
        if (
          this.mother_name ||
          this.mother_idCard ||
          this.mother_mobile ||
          ss
        ) {
          if (!this.mother_name) return this.$Message.error("请输入母亲姓名");
          if (!this.mother_idCard)
            return this.$Message.error("请输入母亲身份证号");
          if (matherAreaFlag)
            return this.$Message.error("母亲户籍所在地未选择完整");
          if (!this.mother_mobile)
            return this.$Message.error("请输入母亲手机号");
          if (!/^1\d{10}$/.test(this.mother_mobile))
            return this.$Message.error("母亲手机号格式不正确");
          flag = true;
        }
        if (!flag) {
          this.$Message.error("父母双方的信息至少要填报一个");
          return;
        }
      } else {
        if (!this.father_name) {
          this.$Message.error("父亲姓名不能为空！");
          return;
        }
        if (!this.father_idCard) {
          this.$Message.error("父亲身份证号码不能为空！");
          return;
        }
        if (!/(^\d{17}[\dXx]$)/.test(this.father_idCard)) {
          this.$Message.error("父亲身份证格式错误！");
          return;
        }
        if (!this.father_registered) {
          this.$Message.error("父亲户籍所在地不能为空！");
          return;
        }
        for (let i = 0; i < 4; i++) {
          if (!this.temp_fatherRegistered[i]) {
            this.$Message.error("户籍所在地未选择完整");
            return;
          }
        }
        if (!this.father_mobile) {
          this.$Message.error("父亲手机号码不能为空！");
          return;
        }
        if (!/^1\d{10}$/.test(this.father_mobile)) {
          this.$Message.error("请输入父亲的正确手机号");
          return;
        }
        if (!this.mother_name) {
          this.$Message.error("母亲姓名不能为空！");
          return;
        }
        if (!this.mother_idCard) {
          this.$Message.error("母亲身份证号码不能为空！");
          return;
        }
        if (!/(^\d{17}[\dXx]$)/.test(this.mother_idCard)) {
          this.$Message.error("母亲身份证格式错误！");
          return;
        }
        if (!this.mother_registered) {
          this.$Message.error("母亲户籍所在地不能为空！");
          return;
        }
        for (let i = 0; i < 4; i++) {
          if (!this.temp_motherRegistered[i]) {
            this.$Message.error("户籍所在地未选择完整");
            return;
          }
        }
        if (!this.mother_mobile) {
          this.$Message.error("母亲手机号码不能为空！");
          return;
        }
        if (!/^1\d{10}$/.test(this.mother_mobile)) {
          this.$Message.error("请输入母亲的正确手机号");
          return;
        }
      }
      let res = await res_apply.post_AddParentsInfo({
        fatherName: this.father_name,
        fatherCardId: this.father_idCard,
        fatherTell: this.father_mobile,
        fatherRegisterAddress: this.father_registered,
        motherName: this.mother_name,
        motherCardId: this.mother_idCard,
        motherTell: this.mother_mobile,
        motherRegisterAddress: this.mother_registered,
        schoolRegisterType: sessionStorage.getItem("schoolRegisterType"),
        businessType: sessionStorage.getItem("businessTypes")
      });

      if (res.success) {
        this.$Message.success("父母信息填写成功");
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
    },

    //  ======  母亲
    //  ------  地区选择
    async areaRequestMother(code, index) {
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
        this.arr_motherRegistered.splice(index, 1, tempArr);
      }
    },

    // ------ 每次选择触发
    selectAreaMother(datas) {
      if (datas == undefined) {
        return;
      }

      let data = JSON.parse(datas);
      if (data.index != 3) {
        this.areaRequestMother(data.code, data.index + 1);
      } else {
        this.mother_registered = "";
        this.temp_motherRegistered.forEach(item => {
          this.mother_registered += JSON.parse(item).name + " ";
        });
      }
    }
  }
};
