import {
  post_SchoolRegisterInfo,
  GetSchoolRegisterInfoAuditList,
  GetSchoolRegisterInfo
} from "@/api/infoFill";

import baseUrl from "@/api/env";
import childHeader from "@/view/components/Header.vue";
import childFooter from "@/view/components/Footer.vue";
import ReportDetail from "@/components/ReportDetail.vue";
import ReportDetailKind from "../kind-register/ReportDetail.vue";

export default {
  components: {
    "child-header": childHeader,
    "child-footer": childFooter,
    ReportDetail,
    ReportDetailKind
  },
  data() {
    return {
      baseUrl: baseUrl, //  接口前缀
      schoolRegisterType: "",
      // 附件  户口本附件  企业  单位
      arr_img: [
        [
          {
            title: "父母户口本首页",
            src: ""
          },
          {
            title: "父母户口本人信息页",
            src: ""
          },
          {
            title: "儿童户口本首页",
            src: ""
          },
          {
            title: "儿童户口父母信息页",
            src: ""
          },
          {
            title: "儿童户口本页",
            src: ""
          }
        ],
        [
          {
            title: "户籍户口本首页",
            src: ""
          },
          {
            title: "户籍户口本父母信息页",
            src: ""
          },
          {
            title: "户籍户口本儿童信息页户口本母亲页",
            src: ""
          },
          {
            title: "父母结婚证或离婚协议",
            src: ""
          }
        ],
        [
          {
            title: "个体工商户营业执照",
            src: ""
          },
          {
            title: "纳税凭证或未到起征点凭证",
            src: ""
          }
        ],
        [
          {
            title: "个体工商户营业执照",
            src: ""
          },
          {
            title: "纳税凭证或未到起征点凭证",
            src: ""
          }
        ]
      ],
      arr_isShowFile: [], //  是否显示当前类型的附件
      arr_fileData: [
        "父母-户口本首页",
        "父母-户口本本人信息页",
        "儿童-户口本首页",
        "儿童-户口父母信息页",
        "儿童-儿童户口页",
        "父母结婚证或离婚协议",
        "浙江省居住证",
        "房产-房产证或不动产证明",
        "企业-个体工商户营业执照",
        "企业-纳税凭证或未到起征点凭证",
        "单位-合同期限页",
        "单位-合同签字盖章页",
        "户口本户主页"
      ], //  所有附件数据
      arr_FileImg: [], // 附件对应的src
      data_officialProgress: {}, //  数据源
      arr_isTabShow: [false, false, false], //  是否收缩内容
      is_submitSuccess: false, //  是否成功提交
      arr_author: [] //  审核流程
    };
  },
  async created() {
    this.schoolRegisterType = this.$route.query.schoolRegisterType - 0;
    let resAuthor = await GetSchoolRegisterInfoAuditList({
      id: this.$route.query.id
    });
    if (resAuthor.success) {
      this.arr_author = resAuthor.result;

      for (let i in this.arr_author) {
        switch (this.arr_author[i].registerState) {
          case 1:
            this.arr_author[i].registerStateFormat = "未提交";
            this.arr_author[i].registerStateColorClass = "gray";
            break;
          case 2:
            this.arr_author[i].registerStateFormat = "已提交";
            this.arr_author[i].registerStateColorClass = "gray";
            break;
          case 4:
            this.arr_author[i].registerStateFormat = "审核未通过";
            this.arr_author[i].registerStateColorClass = "red";
            break;
          case 16:
            this.arr_author[i].registerStateFormat = "重新提交";
            this.arr_author[i].registerStateColorClass = "red";
            break;
          case 8:
            this.arr_author[i].registerStateFormat = "审核通过";
            this.arr_author[i].registerStateColorClass = "cyan";
            break;
        }
      }
    }
    for (let i in this.arr_fileData) {
      this.arr_FileImg.push("");
      this.arr_isShowFile.push(true);
    }
    //  报名类型
    let res = await GetSchoolRegisterInfo({
      id: this.$route.query.id
    });
    if (res.success) {
      this.data_officialProgress = res.result;
      switch (this.data_officialProgress.registerState) {
        case 1:
          this.data_officialProgress.registerStateFormat = "未提交";
          this.data_officialProgress.registerStateColorClass = "gray";
          break;
        case 2:
          this.data_officialProgress.registerStateFormat = "已提交";
          this.data_officialProgress.registerStateColorClass = "gray";
          this.is_submitSuccess = true;
          break;
        case 4:
          this.data_officialProgress.registerStateFormat = "审核未通过";
          this.data_officialProgress.registerStateColorClass = "red";
          break;
        case 16:
          this.data_officialProgress.registerStateFormat = "重新提交";
          this.data_officialProgress.registerStateColorClass = "red";
          break;
        case 8:
          this.data_officialProgress.registerStateFormat = "审核通过";
          this.data_officialProgress.registerStateColorClass = "cyan";
          this.is_submitSuccess = true;
          break;
      }
    }
  }
};
