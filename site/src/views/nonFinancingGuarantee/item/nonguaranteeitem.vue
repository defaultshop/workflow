<template>
  <div class="guaranteeitem" :style="{height:nontype == 2 ? '3.7rem' : ''}">
    <div class="assurestatus" v-if="nontype == 1" :style="{backgroundColor: status <= 1 ? '#1963FC' : '#2ACC26'}">
      <span>状态</span>
    </div>
    <div class="assuretit">name</div>
    <div class="assureinfo">
      <span>担保公司：</span>
      <span>companyName</span>
    </div>
    <div class="assureinfo">
      <span>融资类型：</span>
      <span>financingType</span>
    </div>
    <div class="assureinfo">
      <span>融资金额：</span>
      <span>loanQuota</span>
    </div>
    <div class="assureinfo assureinfobtn">
      <div>
        <span>担保方式：</span>
        <span>guaranteeType</span>
      </div>
      <div v-if="nontype == 2">
        <span>立即申请</span>
      </div>
    </div>

    <div class="assurebot" v-if="nontype == 1">
      <div>CreationTime</div>
      <div class="look">
        <span v-if="status == 2">评价</span>
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
    },
    nontype: {
      type: String
    }
  },
  data() {
    return {
      status: 0
    };
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
