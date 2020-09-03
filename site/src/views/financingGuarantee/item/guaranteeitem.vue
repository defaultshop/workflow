<template>
  <div class="guaranteeitem">
    <div class="assurestatus" :style="{backgroundColor: this.info.status <= 1 ? '#1963FC' : '#2ACC26'}">
      <span>{{ this.info.statusDesc }}</span>
    </div>
    <div class="assuretit">{{ this.info.name }}</div>
    <div class="assureinfo">
      <span>担保公司：</span>
      <span>{{ this.info.companyName }}</span>
    </div>
    <div class="assureinfo">
      <span>融资类型：</span>
      <span>{{ this.info.financingType }}</span>
    </div>
    <div class="assureinfo">
      <span>融资金额：</span>
      <span>{{ this.info.loanQuota }}</span>
    </div>
    <div class="assureinfo">
      <span>担保方式：</span>
      <span>{{ this.info.guaranteeType }}</span>
    </div>

    <div class="assurebot">
      <div>{{ this.info.creationTime }}</div>
      <div class="look">
        <!-- <span v-if="this.info.status == 2">评价</span> -->
        <span @click="toviewdetail">查看</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object
    }
  },
  methods: {
    toviewdetail() {
      this.$router.push('/guarantee-complete?id=' + this.info.id);
    }
  }
};
</script>

<style lang="less" scoped src="@/assets/css/financingGuarantee/guaranteeitem.less">

</style>
