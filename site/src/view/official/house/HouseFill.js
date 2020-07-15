import * as res_apply from "@/api/infoFill";
import * as res_common from "@/api/common";
import baseUrl from "@/api/env";

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
      baseUrl: baseUrl,
      proprety: "",
      motion_proprety: "",
      is_motionProprety: false, //  是否出现不动产权号
      proprety_relation: "",
      proprety_name: "",
      idcard: "",
      address: "",
      tel: "",
      proprety_address: "",
      father_registered: "",
      arr_fatherRegistered: new Array(4),
      temp_fatherRegistered: new Array(4),
      houseFile: "", //  选择的图片(显示用这个)
      houseFileBase64: "" //  当前选择图片转化后的字符串(上传至接口用这个)
    };
  },
  async created() {
    let res = await res_apply.UnSubmittedSchoolRegisterInfo({
      schoolRegisterType: sessionStorage.getItem("schoolRegisterType"),
      businessType: sessionStorage.getItem("businessTypes")
    });
    if (res.success) {
      if (res.result.houseIsFill) {
        this.proprety = res.result.houseStatus;
        this.motion_proprety = res.result.houseRealEstateCertificateNo;
        this.proprety_relation = res.result.houseRelationType;
        this.proprety_name = res.result.houseName;
        this.idcard = res.result.houseCardId;
        this.address = res.result.houseRegisterAddress;
        this.tel = res.result.houseRegisterTell;
        this.proprety_address = res.result.houseAddress;
        this.houseFile =
          this.baseUrl + "EOL/File/Map?id=" + res.result.houseBook;
        this.houseFileBase64 = { id: res.result.houseBook };
      }
    }

    this.areaRequestFather(null, 0);
  },
  methods: {
    //  ------  选择图片
    selectImg(e) {
      let file = e.target.files[0];
      let reader = new FileReader();

      let that = this;
      reader.readAsDataURL(file);

      reader.onload = async function(e) {
        //  把选择的附件 base64 码, 调用接口转成字符串, 再调用提交附件接口, 把字符串传进去
        let res_base64 = await res_common.post_uploadBase64([this.result]);
        if (res_base64.success) {
          that.houseFile = this.result;
          that.houseFileBase64 = res_base64.result[0];
        }
      };
    },

    //  ------ 删除图片
    deleteImg() {
      // 每次删除把 value 清空，不然如果上传相同的图片 change 方法不会调用
      this.$refs.file.value = "";
      this.houseFile = "";
    },

    async submitInfo() {
      if (!this.proprety) {
        this.$Message.error("产权情况不能为空！");
        return;
      }
      if (!this.motion_proprety && this.proprety == "1") {
        this.$Message.error("不动产权号不能为空！");
        return;
      }
      if (!this.proprety_relation) {
        this.$Message.error("房产所有人与儿童的关系不能为空！");
        return;
      }
      if (!this.proprety_name) {
        this.$Message.error("房产所有人姓名不能为空！");
        return;
      }
      if (!this.idcard) {
        this.$Message.error("身份证号不能为空！");
        return;
      }
      if (!this.father_registered) {
        this.$Message.error("户籍所在地不能为空！");
        return;
      }
      if (!this.tel) {
        this.$Message.error("手机号码不能为空！");
        return;
      }
      if (!/^1\d{10}$/.test(this.tel)) {
        this.$Message.error("请输入正确的手机号");
        return;
      }
      if (!this.proprety_address) {
        this.$Message.error("房产坐落地址不能为空！");
        return;
      }

      if (!this.houseFile) {
        this.$Message.error("请上传房产证或不动产证明！");
        return;
      }

      let res = await res_apply.post_AddHouseInfo({
        // "houseRealEstateCertificateNo": this.motion_proprety && this.is_motionProprety ? this.proprety_name : '',
        houseRealEstateCertificateNo:
          this.proprety == 1 ? this.motion_proprety : "",
        houseRelationType: this.proprety_relation,
        houseName: this.proprety_name,
        houseCardId: this.idcard,
        houseRegisterAddress: this.father_registered,
        houseRegisterTell: this.tel,
        houseAddress: this.proprety_address,
        houseStatus: this.proprety,
        houseBook: this.houseFileBase64.id,
        schoolRegisterType: sessionStorage.getItem("schoolRegisterType"),
        businessType: sessionStorage.getItem("businessTypes")
      });
      if (res.success) {
        this.$Message.success("房产信息填写成功");
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
