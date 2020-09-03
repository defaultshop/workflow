<template>
  <div class="backimg">
    <div class="backtitle">杭州百图科技有限公司</div>

    <div class="masklayer">1</div>
    <div class="redemption">
      <div class="redemption-num">
        <div>
          <div class="redemptioname">2020年度丽水市中小微 企业服务券</div>
          <div class="redemptionprice">总金额
            <span class="price">100.0</span>
            万元
          </div>
          <div class="progress">
            <mt-progress :value="20" :bar-height="10"></mt-progress>
          </div>
        </div>
        <div class="redemptionremain">
          <div>2.0</div>
          <div>当前剩余 (万元)</div>
        </div>
      </div>
      <div class="remaintime">
        <span>倒计时</span>
        <span class="day">123天</span>
      </div>
      <div class="countdownall">
        <div>
          <nowtime class="time" />
          <nowtime class="time" />
          <nowtime class="time" />
        </div>
      </div>

      <div class="support">
        <div class="supportit">服务券支持：</div>
        <ul>
          <li v-for="li in 12" :key="li">
            <i>1</i>
            <span>人力资源服务</span>
          </li>
        </ul>
      </div>
      <div class="redemptionbtn" @click="$router.push('/that-notice')">
        <combutton />
      </div>
    </div>
  </div>
</template>

<script>
import nowtime from './time.vue';
import combutton from '@/components/combutton.vue';
export default {
  components: {
    nowtime,
    combutton
  }
};
</script>

<style lang="less" scoped src="@/assets/css/couponRedemptionCode/couponRedemption.less">

</style>
