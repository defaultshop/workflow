<template>
  <div class="guaranteeHead" style="height:2.56rem">
    <div class="headinfo">
      <div>年度担保信息</div>
      <div class="infotime">
        <span>2020年度</span>
        <i class="iconfont iconarrow-left-copy" />
      </div>
      <div class="infoeachtime" v-show="false">
        <div>2020年度</div>
        <div>2019年度</div>
      </div>
    </div>
    <div class="headcont">
      <div class="headcontleft">
        <div class="headcontmath">{{ this.total }}</div>
        <div class="headcontdes">年度事项代办次数</div>
      </div>
      <div>
        <!-- <div class="headcontmath">3</div>
        <div class="headcontdes">总笔数</div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style lang="less" scoped src="@/assets/css/financingGuarantee/guaranteeHead.less">

</style>
