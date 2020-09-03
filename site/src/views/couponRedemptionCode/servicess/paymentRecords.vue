<template>
  <div class="paymentrecord">
    <div class="title">兑付记录</div>
    <div class="eachpayment" v-show="false" v-for="li in 2" :key="li">
      <div class="tit">高成长科技型中小企业申报</div>
      <div class="cont">这里是服务具体介绍额度详情，为了应对新项目财务压力。追加公司财务上报的额度。</div>
      <div class="price">
        <div>追加时间：2020.08.01</div>
        <div>
          <span>-1000.00</span>
        </div>
      </div>
    </div>

    <div class="paymentinfomation">
      <div>您尚未使用过服务券，无兑付记录；<br/>
          根据以下操作指示前往使用：<br/>
          1.请使用电脑登录“丽水市中小微企业服务券”<br/>
          （http://fwq.96871.com.cn）；<br/>
          2.选择服务券产品，提交企业、合同、发票等相关证明材料信息；<br/>
          3.系统将在15个工作日内完成兑付审核。</div>
    </div>
  </div>
</template>

<style lang="less" scoped src="@/assets/css/couponRedemptionCode/paymentrecord.less">

</style>
