<template>
  <div class="backimg">
    <div class="applyforDetail">
      <applyforitem :info="infodetail" showtype="2" />

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
  </div>
</template>

<script>
import { financeDetailGet } from '@/network/url/codeFinance.js';
import applyforitem from '@/components/applyforitem.vue';
export default {
  components: {
    applyforitem
  },
  data() {
    return {
      infodetail: {},
      id: ''
    };
  },
  methods: {
    async getappinfo() {
      const res = await financeDetailGet({
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
