import { post_SchoolRegisterInfoList } from "@/api/infoFill";

import childHeader from "@/view/components/Header.vue";
import childFooter from "@/view/components/Footer.vue";

export default {
  components: {
    "child-header": childHeader,
    "child-footer": childFooter
  },
  data() {
    return {
      arr_applyProgress: [], //  报名类型
      nameType: "儿童"
    };
  },
  async created() {
    let schoolRegisterType = this.$route.query.schoolRegisterType - 0;
    if (schoolRegisterType === 1 || schoolRegisterType === 8) {
      this.nameType = "幼儿";
    } else {
      this.nameType = "儿童";
    }
    //  报名类型
    let res = await post_SchoolRegisterInfoList();
    if (res.success) {
      console.log(res.result);

      this.arr_applyProgress = res.result.map(item => {
        switch (item.registerState) {
          case 1:
            item.registerStateFormat = JSON.parse(
              sessionStorage.getItem("AllEnum")
            ).RegisterState[0].value;
            item.registerStateColor = "yellow";
            break;
          case 2:
            item.registerStateFormat = JSON.parse(
              sessionStorage.getItem("AllEnum")
            ).RegisterState[1].value;
            item.registerStateColor = "blue";
            break;
          case 4:
            item.registerStateFormat = JSON.parse(
              sessionStorage.getItem("AllEnum")
            ).RegisterState[2].value;
            item.registerStateColor = "yellow";
            break;
          case 8:
            item.registerStateFormat = JSON.parse(
              sessionStorage.getItem("AllEnum")
            ).RegisterState[3].value;
            item.registerStateColor = "cyan";
            break;
          case 16:
            item.registerStateFormat = JSON.parse(
              sessionStorage.getItem("AllEnum")
            ).RegisterState[4].value;
            item.registerStateColor = "yellow";
            break;
        }
        return item;
      });
    }
  },
  methods: {
    skipDetail(schoolRegisterType, businessType, isFront, id) {
      // isFront==false: 正式报名   isFront==true: 预报名
      let name = "ReadyProgress";
      if (!isFront) {
        name = "ApplyProgress";
      }
      this.$router.push({
        name: name,
        query: {
          schoolRegisterType: schoolRegisterType,
          businessType: businessType,
          id: id
        }
      });
    }
  }
};
