<template>
  <div class="comback completeStatus">
    <div class="accepted" v-if="this.status == 0">
      <i class="iconfont iconyuyue" />
      <span>未受理</span>
    </div>
    <div class="accepted" v-if="this.status == 1">
      <i class="iconfont iconyuyue" />
      <span>已受理</span>
    </div>
    <div class="accepted guaranteed"  v-if="this.status == 2">
      <i class="iconfont iconyuyue" />
      <span>已担保</span>
    </div>
    <div class="accepted guaranteed" v-if="this.status == 3">
      <i class="iconfont iconyuyue" />
      <span>已评价</span>
    </div>
    <div class="describe">
      <span  v-if="this.status == 0 || this.status == 1">这里是状态具体描述文案</span>
      <span  v-if="this.status == 2">您的担保申请成功，
        <i class="evaluationgo" @click="$router.push('/satisfaction-survey')">点此去评价>></i>
      </span>
      <div class="starevaluation" v-if="this.status == 3">
        <img src="@/assets/img/staryes.png" v-for="li in this.score" :key="li+'a'" class="star" alt="">
        <img src="@/assets/img/starno.png" v-for="li in (5-this.score)" :key="li+'b'" class="star" alt="">
        <span class="starmath">{{ this.score }}星</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: Number
    },
    score: {
      type: Number,
      default: 0
    }
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

<style lang="less" scoped src="@/assets/css/financingGuarantee/completeStatus.less">

</style>
