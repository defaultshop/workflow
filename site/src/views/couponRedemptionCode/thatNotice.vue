<template>
  <div class="backimg">
    <div class="backtitle">申明须知</div>

    <div class="noticecont">
      <div class="noticemain noticecontent">
        <div>发放对象：丽水市区（市直、莲都区、开发区）范围内注册登记，具有独立法人资格，运营规范，符合国家、省、市产业发展方向的工业和信息化、数字经济领域的中小微企业（《关于印发中小企业划型标准规定的通知》（工信部联企业〔2011〕300号））。</div>
        <div>使用范围：经市经信局确认的签约服务机构提供的专业服务项目。</div>
        <div>发放额度：每家企业默认发放10000元，符合下列企业之一的，发放20000元： 1.列入当年省、市“雏鹰行动”中小微企业梯度培育企业（含“小升规”、隐形冠军及培育企业等); 2.获得市级及以上荣誉称号的创新型、成长型、示范型优质中小微企业； 3.获得当年度“浙江好项目创新创业大赛”市级及以上奖项的企业； 4.企业亩均效益综合评价A类企业。 抵用方式：单笔交易的抵用额度不高于实际发生额的70%</div>
        <div>发放额度：每家企业默认发放10000元，符合下列企业之一的，发放20000元： 1.列入当年省、市“雏鹰行动”中小微企业梯度培育企业（含“小升规”、隐形冠军及培育企业等); 2.获得市级及以上荣誉称号的创新型、成长型、示范型优质中小微企业； 3.获得当年度“浙江好项目创新创业大赛”市级及以上奖项的企业； 4.企业亩均效益综合评价A类企业。 抵用方式：单笔交易的抵用额度不高于实际发生额的70%</div>
      </div>

      <div class="noticecheck">
        <span>已同意《授权书》，同意银行查询本人及企业信息</span>
      </div>
      <div class="positionbtn" @click="$router.push('/fillinform')">
        <combutton />
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

<style lang="less" scoped src="@/assets/css/couponRedemptionCode/thatNotice.less">

</style>
