<template>
  <div class="guaranteeitem" :style="{height: this.showtype == 2 ? '2.52rem' : '3.2rem'}">
    <div class="assurestatus" v-if="this.showtype == 1 && !this.info.isAppraise" :style="{backgroundColor:status <= 1 ? '#1963FC' : '#2ACC26'}">
      <span>{{ this.info.status }}</span>
    </div>
    <div class="assuretit assuretitStar">
      <div>{{ this.info.matterName }}</div>
      <div>
        <span v-if="this.info.isFinish && this.info.isAppraise">
          <img src="@/assets/img/staryes.png" v-for="li in this.value" :key="li+'a'" class="star" alt="">
          <img src="@/assets/img/starno.png" v-for="li in (5-this.value)" :key="li+'b'" class="star" alt="">
        </span>
      </div>
    </div>
    <div class="assureinfo">
      <span>事项类型：</span>
      <span>{{ this.info.type }}</span>
    </div>
    <div class="assureinfo assureinfobtn">
      <div>
        <span>负责部门：</span>
        <span>{{ this.info.dep }}</span>
      </div>
      <div v-if="showtype == 2">
        <span @click="applynow">立即申请</span>
      </div>
    </div>

    <div class="assurebot" v-if="this.showtype == 1">
      <div>2020.06.22 12:56</div>
      <div class="look">
        <span v-if="this.info.isFinish && !this.info.isAppraise">评价</span>
        <span @click="toviewdetail">查看</span>
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
  data() {
    return {
      status: 1,
      value: 3
    };
  },
  methods: {
    //立即申请
    applynow() {
      this.$emit('applynow');
    },
    //查看详情
    toviewdetail() {
      // this.$router.push('/agent-complete?id=' + this.info.id);
      this.$emit('lookdetail');
    }
  }
};
</script>

<style lang="less" scoped src="@/assets/css/financingGuarantee/guaranteeitem.less">

</style>
