import * as res_common from "@/api/common";
import * as res_repay from "@/api/infoFill";
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
      arr_fileData: [
        //  附件基本数据
        {
          title: "上传户口本首页",
          data: [
            {
              name: "上传户口本首页",
              index: 0
            }
          ]
        },
        {
          title: "上传户口本户主页",
          data: [
            {
              name: "上传户口本户主页",
              index: 1
            }
          ]
        },
        {
          title: "上传儿童户口本页",
          data: [
            {
              name: "上传儿童户口本页",
              index: 2
            }
          ]
        }
      ],
      arr_selectImgs: new Array(3), //  选择的图片(显示用这个)
      arr_imgBase64: new Array(3) //  当前选择图片转化后的字符串(上传至接口用这个)
    };
  },
  async created() {
    let res = await res_repay.UnSubmittedSchoolRegisterInfo({
      schoolRegisterType: sessionStorage.getItem("schoolRegisterType"),
      businessType: sessionStorage.getItem("businessTypes")
    });
    if (res.success) {
      if (res.result.bookIsFill) {
        this.arr_selectImgs.splice(
          0,
          1,
          this.baseUrl +
            "EOL/File/Map?id=" +
            res.result.childrenHouseholdBookHome
        );
        this.arr_selectImgs.splice(
          1,
          1,
          this.baseUrl +
            "EOL/File/Map?id=" +
            res.result.childrenHouseholdBookParents
        );
        this.arr_selectImgs.splice(
          2,
          1,
          this.baseUrl +
            "EOL/File/Map?id=" +
            res.result.childrenHouseholdBookOneself
        );
        this.arr_imgBase64[0] = { id: res.result.childrenHouseholdBookHome };
        this.arr_imgBase64[1] = { id: res.result.childrenHouseholdBookParents };
        this.arr_imgBase64[2] = { id: res.result.childrenHouseholdBookOneself };
      }
    }
  },
  methods: {
    //  ------  选择图片
    selectImg(e, index) {
      let file = e.target.files[0];
      let reader = new FileReader();

      let that = this;
      reader.readAsDataURL(file);

      reader.onload = async function(e) {
        //  把选择的附件 base64 码, 调用接口转成字符串, 再调用提交附件接口, 把字符串传进去
        let res_base64 = await res_common.post_uploadBase64([this.result]);
        if (res_base64.success) {
          that.arr_selectImgs.splice(index, 1, this.result);
          that.arr_imgBase64[index] = res_base64.result[0];
        }
      };
    },

    //  ------ 删除图片
    deleteImg(index) {
      // 每次删除把 value 清空，不然如果上传相同的图片 change 方法不会调用
      this.$refs.file[index].value = "";
      this.arr_selectImgs.splice(index, 1, "");
    },

    // ------ 提交信息
    async submitInfo() {
      let isCheck = true;

      for (let item of this.arr_selectImgs) {
        if (!item) {
          this.$Message.error("请上传完整的附件！");
          isCheck = false;
          break;
        }
      }

      if (isCheck) {
        //  提交附件
        let res = await res_repay.post_AddBookInfo({
          childrenHouseholdBookHome: this.arr_imgBase64[0].id,
          childrenHouseholdBookParents: this.arr_imgBase64[1].id,
          childrenHouseholdBookOneself: this.arr_imgBase64[2].id,
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
  }
};
