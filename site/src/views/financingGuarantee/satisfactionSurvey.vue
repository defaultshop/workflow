<template>
  <div class="backimg">
    <div class="completecont satisfactionSurvey">
      <div class="comback survey">
        <div class="surveytit">用户满意度调查</div>
        <div class="surveystar">
          <img src="@/assets/img/staryes.png" v-for="li in this.value" :key="li+'a'" @click="changestaryes(li)" class="star" alt="">
          <img src="@/assets/img/starno.png" v-for="li in (5-this.value)" :key="li+'b'" @click="changestarno(li)" class="star" alt="">
        </div>
        <div class="surveyvalue">{{value}}星</div>
      </div>

      <div class="comback completemain">
        <div class="completemain-tit">
          <div>产品信息</div>
          <div></div>
        </div>
        <div class="completemain-info">
          <span>产品名称：</span>
          <span>国内保函闪电开</span>
        </div>
        <div class="completemain-info">
          <span>所属银行：</span>
          <span>招商银行</span>
        </div>
      </div>
      <div class="comback completemain">
        <div class="completemain-tit">
          <div>企业信息</div>
          <div></div>
        </div>
        <div class="completemain-info">
          <span>企业名称：</span>
          <span>金海朔创有限公司</span>
        </div>
      </div>
    </div>

    <div class="positionbtn">
      <combutton title="确认提交" />
    </div>
  </div>
</template>

<script>
import combutton from '@/components/combutton.vue';
export default {
  components: {
    combutton
  },
  data() {
    return {
      value: 1
    };
  },
  methods: {
    changestaryes(li) {
      console.log(li);
      this.value = li - 1;
    },
    changestarno(li) {
      this.value = this.value + li;
    }
  }
};
</script>

<style lang="less" scoped src="@/assets/css/financingGuarantee/satisfactionSurvey.less">

</style>
