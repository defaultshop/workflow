<template>
  <div class="applyforitem" @click="applyclick">
    <div class="applyfortit">
      <div>{{ this.info.name }}</div>
      <div>
        <img v-if="this.showtype == 2" :src="this.info.logo" alt="">
      </div>
    </div>
    <div class="applyforplace"  v-if="this.showtype == 1">{{ this.info.companyName }}</div>
    <div class="applyforexp" :style="{marginTop:this.showtype == 2 ? '0.25rem' : ''}">
      <span v-for="(li,index) in this.info.tags" :key="index">{{ li }}</span>
    </div>
    <div class="applyforinfo" :style="{marginTop:this.showtype == 2 ? '0.4rem' : ''}">
      <div>
        <div class="money">{{ this.info.loanQuota }}</div>
        <div class="desc">贷款额度</div>
      </div>
      <div class="applyforinfort">
        <div class="time">{{ this.info.loanDeadline }}</div>
        <div class="desc">贷款期限</div>
      </div>
    </div>
    <div class="applyforinfo" :style="{marginTop:this.showtype == 2 ? '0.4rem' : ''}">
      <div>
        <div class="money">{{ this.info.annualInterestRange }}</div>
        <div class="desc">年息范围</div>
      </div>
      <div class="applyforinfort">
        <div class="time">{{ this.info.approveTimeDesc }}</div>
        <div class="desc">审批时间</div>
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
    showtype: {
      type: String,
      default: '1'
    }
  },
  methods: {
    applyclick() {
      this.$emit('applydetail', this.info.id);
    }
  }
};
</script>

<style lang="less" scoped src="@/assets/css/financingGuarantee/guaranteeApplyfor.less">

</style>
