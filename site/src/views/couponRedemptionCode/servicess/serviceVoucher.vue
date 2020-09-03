<template>
  <div class="backimg">
    <div class="backtitle">杭州白图有限公司</div>
    <div class="seamless">
      <seamlessScroll />
    </div>

    <div class="serviceVoucher">
      <servicelines />
      <div class="records">
        <paymentRecords />
        <bottomlogo />
      </div>
    </div>
  </div>
</template>

<script>
import seamlessScroll from '@/components/servicess/seamlessScroll.vue';
import paymentRecords from './paymentRecords.vue';
import servicelines from './servicelines.vue';
import bottomlogo from '@/components/bottomlogo.vue';
export default {
  components: {
    seamlessScroll,
    servicelines,
    paymentRecords,
    bottomlogo
  }
};
</script>

<style lang="less" scoped src="@/assets/css/couponRedemptionCode/serviceVoucher.less">

</style>
