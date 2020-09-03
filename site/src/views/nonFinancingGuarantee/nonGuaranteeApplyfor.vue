<template>
  <div class="guaranteeApplyfor">
    <div class="applyforsearch">
      <searchitem @filtercont="getfiltercont" />
    </div>

    <div class="applyformain"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      :infinite-scroll-distance="maxResultCount"
    >
      <nonguaranteeitem v-for="li in 4" nontype="2" :key="li" />

      <empty v-if="applist.length != 0" />
    </div>
  </div>
</template>

<script>
import { financingGuarantee } from '@/network/url/financingGuarantee.js';
import searchitem from '@/components/searchitem.vue';
import nonguaranteeitem from './item/nonguaranteeitem.vue';
import empty from '@/components/results/empty.vue';
export default {
  components: {
    searchitem,
    nonguaranteeitem,
    empty
  },
  data() {
    return {
      applist: [],
      totalCount: 0,
      filter: '',
      skipCount: 0,
      maxResultCount: 10,
      loading: false
    };
  },
  methods: {
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
      const res = await financingGuarantee({
        Filter: this.filter,
        Status: 1,
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
  mounted() {
    // this.getapplist();
  }
};
</script>

<style lang="less" scoped src="@/assets/css/financingGuarantee/guaranteeApplyfor.less">

</style>
