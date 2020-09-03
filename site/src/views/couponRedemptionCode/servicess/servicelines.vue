<template>
  <div class="servicelines">
    <img src="@/assets/img/status1.png" class="status" alt="">
    <div class="title">中小微企业服务券</div>
    <div class="allines">
      <div class="eachlines" v-for="li in 3" :key="li">
        <img src="@/assets/img/service.png" class="serviceicon" alt="">
        <div class="eachlinescont">
          <div>1000.00</div>
          <div>总额度</div>
        </div>
      </div>
    </div>
    <div class="serviceuse clear">
      <div class="servicetime">有限期至：2021.06.01</div>
      <div class="servicebtn">
        <span class="usesing" v-show="false">立即使用
          <i class="iconfont iconarrow-right" />
        </span>
        <span class="reset">
          <combutton title="重新申请" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import combutton from '@/components/combutton.vue';
export default {
  components: {
    combutton
  }
};
</script>

<style lang="less" scoped src="@/assets/css/couponRedemptionCode/servicelines.less">

</style>
