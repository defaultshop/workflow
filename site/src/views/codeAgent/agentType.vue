<template>
  <div class="backimg">
    <div class="backtitle" style="font-size:0.32rem">请先选择您要办理的事项类型</div>

    <div class="agentType">
      <div class="eachagenttype clear" v-for="li in typelist" :key="li.key" @click="typeapplyfor(li)">
        <img src="@/assets/img/agent1.png" alt="">
        <span>{{ li.value }}</span>
        <i class="iconfont iconarrow-right" />
      </div>
    </div>
  </div>
</template>

<script>
import { matterTypes } from '@/network/url/codeAgent.js';
export default {
  data() {
    return {
      typelist: []
    };
  },
  methods: {
    async getapplist() {
      await matterTypes().then(res => {
        console.log(res);
        if (res) {
          this.typelist = res;
        }
      });
    },
    typeapplyfor(li) {
      this.$router.push('/agent-applyfor?key=' + li.key);
    }
  },
  created() {
    this.getapplist();
  }
};
</script>

<style lang="less" scoped src="@/assets/css/codeAgent/agentType.less">

</style>
