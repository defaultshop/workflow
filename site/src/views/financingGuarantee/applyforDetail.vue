<template>
  <div class="backimg">
    <div class="applyforDetail">
      <applyforitem :info="infodetail" showtype="1" />

      <div class="infomate">
        <!-- <div class="eachinfomate" v-for="li in 3" :key="li">
          <div class="tit">其他信息</div>
          <div class="cont">担保方式：质押 <br />还款方式：到期还款 <br />融资类型：流动资金贷款</div>
        </div> -->
        <div class="eachinfomate">
          <div class="cont" v-html="infodetail.otherInfo"></div>
        </div>
        <div class="explain">注：最终所需材料以银行实际要求为准</div>
      </div>
    </div>
    <div class="combutton botbutton" @click="immediatelyApply">
      <combutton title="立即申请" />
    </div>
  </div>
</template>

<script>
import { financingGuaranteeGet } from '@/network/url/financingGuarantee.js';
import applyforitem from '@/components/applyforitem.vue';
import combutton from '@/components/combutton.vue';
export default {
  components: {
    applyforitem,
    combutton
  },
  data() {
    return {
      infodetail: {},
      id: ''
    };
  },
  methods: {
    immediatelyApply() {
      window.location.href = this.infodetail.fullReportUrl;
      // this.$router.push('/formdesign?id=78c11170-54d5-e5e4-34f2-39f6cf90e1f7&fgId=a90fd569-b49b-d632-6cd6-39f6ed77b981&type=FinancingGuaranteeApp');
    },
    async getappinfo() {
      const res = await financingGuaranteeGet({
        otherid: this.id
      });
      if (res) {
        this.infodetail = res;
        this.infodetail.otherInfo = this.infodetail.otherInfo.replace(/\n/g, '<br/>');
      }
    }
  },
  created() {
    this.id = this.$route.query.id;
    console.log(this.$route.query);
    this.getappinfo();
  }
};
</script>

<style lang="less" scoped src="@/assets/css/financingGuarantee/applyforDetail.less">

</style>
