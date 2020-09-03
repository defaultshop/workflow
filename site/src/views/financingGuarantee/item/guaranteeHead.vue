<template>
  <div class="guaranteeHead">
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
    <div class="headcont" v-if="false">
      <div class="headcontleft">
        <div class="headcontmath">2000</div>
        <div class="headcontdes">年度担保总额度(万）</div>
      </div>
      <div>
        <div class="headcontmath">3</div>
        <div class="headcontdes">总笔数</div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped src="@/assets/css/financingGuarantee/guaranteeHead.less">

</style>
