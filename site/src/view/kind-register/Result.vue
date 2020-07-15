<template>
  <div class="result-wrap">
    <child-header></child-header>
    <div class="content-box padd">
      <div class="audit-state pass">
        <div class="icon iconfont iconzhengchang"></div>
        <div class="title">提交成功</div>
        <div class="txt">{{ arr_remark[0] && arr_remark[0].content }}</div>
      </div>
      <div class="info-cont">
        <div class="title">信息内容</div>
        <ul>
          <li>
            <i class="iconfont iconzhengchang"></i>申请幼儿
            <em>{{ data_info.childrenName }}</em>
          </li>
          <li>
            <i class="iconfont iconzhengchang"></i>幼儿身份证号
            <em>{{ data_info.childrenCardId }}</em>
          </li>
          <li>
            <i class="iconfont iconzhengchang"></i>志愿学校
            <em>{{ data_info.schoolName }}</em>
          </li>
          <li v-if="data_info.schoolInfoOne && data_info.schoolInfoOne.id">
            <i class="iconfont iconzhengchang"></i>调配志愿一
            <em>{{ data_info.schoolInfoOne.name }}</em>
          </li>
          <li v-if="data_info.schoolInfoTwo && data_info.schoolInfoTwo.id">
            <i class="iconfont iconzhengchang"></i>调配志愿二
            <em>{{ data_info.schoolInfoTwo.name }}</em>
          </li>
          <li v-if="data_info.schoolInfoThree && data_info.schoolInfoThree.id">
            <i class="iconfont iconzhengchang"></i>调配志愿三
            <em>{{ data_info.schoolInfoThree.name }}</em>
          </li>
          <li v-if="data_info.schoolInfoFour && data_info.schoolInfoFour.id">
            <i class="iconfont iconzhengchang"></i>调配志愿四
            <em>{{ data_info.schoolInfoFour.name }}</em>
          </li>
          <li v-if="data_info.schoolInfoFive && data_info.schoolInfoFive.id">
            <i class="iconfont iconzhengchang"></i>调配志愿五
            <em>{{ data_info.schoolInfoFive.name }}</em>
          </li>
          <li v-if="data_info.schoolInfoSix && data_info.schoolInfoSix.id">
            <i class="iconfont iconzhengchang"></i>调配志愿六
            <em>{{ data_info.schoolInfoSix.name }}</em>
          </li>
        </ul>
      </div>
      <div class="cent operate">
        <Button type="primary" ghost @click="lookApply">查看申请</Button>
        <Button type="primary" @click="$router.push('/Home')">返回首页</Button>
      </div>
    </div>
    <child-footer></child-footer>
  </div>
</template>
<script>
import * as res_repay from '@/api/infoFill';
import * as res_common from '@/api/common';
import childHeader from '@/view/components/Header.vue';
import childFooter from '@/view/components/Footer.vue';
export default {
  components: {
    'child-header': childHeader,
    'child-footer': childFooter
  },
  data() {
    return {
      data_info: {},
      arr_remark: []
    };
  },
  async created() {
    //  获取须知
    let res = await res_common.post_getNotice({
      schoolTypes: [this.$route.query.schoolRegisterType],
      businessTypes: [this.$route.query.businessType],
      noticeTypes: [8]
    });
    if (res.success) {
      this.arr_remark = res.result;
    }
    //  获取信息
    let resInfo = await res_repay.post_SchoolRegisterInfo({
      schoolRegisterType: this.$route.query.schoolRegisterType,
      businessType: this.$route.query.businessType,
      cardId: this.$route.query.cardId
    });

    if (resInfo.success) {
      this.data_info = resInfo.result;
    }
  },
  methods: {
    lookApply() {
      let schoolRegisterType = this.$route.query.schoolRegisterType;
      this.$router.push({ path: '/ApplyList', query: { schoolRegisterType } });
    }
  }
};
</script>
