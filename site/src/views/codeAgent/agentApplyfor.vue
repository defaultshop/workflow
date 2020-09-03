<template>
  <div class="guaranteeApplyfor">
    <div class="applyforsearch" style="background-color:#fff">
      <searchitem @filtercont="getfiltercont" />
    </div>
    <agentClassify />

    <div class="applyformain"
      style="top:2.54rem"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      :infinite-scroll-distance="maxResultCount"
    >
      <agentItem v-for="li in applist" :info="li" showtype="2" @applynow="applynowClick(li.id)" :key="li.id" />

      <empty v-if="applist.length == 0" />
    </div>
  </div>
</template>

<script>
import { matterApplicationList } from '@/network/url/codeAgent.js';
import searchitem from '@/components/searchitem.vue';
import agentItem from './item/agentItem.vue';
import agentClassify from './item/agentClassify.vue';
import empty from '@/components/results/empty.vue';
export default {
  components: {
    searchitem,
    agentItem,
    agentClassify,
    empty
  },
  data() {
    return {
      applist: [],
      totalCount: 0,
      filter: '',
      status: '',
      type: '',
      from: '',
      to: '',
      skipCount: 0,
      maxResultCount: 10,
      loading: false
    };
  },
  methods: {
    //立即申请
    applynowClick(id) {
      this.$router.push('/agent-write?id=' + id);
    },
    //搜索
    getfiltercont(cont) {
      this.filter = cont;
      this.skipCount = 0;
      this.applist = [];
      this.getapplist();
    },
    //上拉加载
    loadMore() {
      this.loading = true;
      if (this.skipCount + this.maxResultCount < this.totalCount) {
        this.getapplist();
      }
    },
    async getapplist() {
      const res = await matterApplicationList({
        Filter: this.filter,
        Status: this.status,
        Type: this.type,
        From: this.from,
        To: this.to,
        SkipCount: this.skipCount,
        MaxResultCount: this.maxResultCount
      });
      console.log(res);
      if (res) {
        if (res.items.length === this.maxResultCount) {
          this.skipCount = this.skipCount + this.maxResultCount;
        }
        const list = res.items;
        list.forEach(item => {
          item.matterName = item.name;
          this.applist.push(item);
        });
        // this.applist = res.items;
        this.totalCount = res.totalCount;
        this.loading = false;
      }
    },
    applydetailClick(id) {
      this.$router.push({
        path: '/applyfor-detail',
        query: { id }
      });
    }
  },
  created() {
    if (this.$route.query.key) {
      this.type = this.$route.query.key;
    }
    this.getapplist();
  }
};
</script>

<style lang="less" scoped src="@/assets/css/financingGuarantee/guaranteeApplyfor.less">

</style>
