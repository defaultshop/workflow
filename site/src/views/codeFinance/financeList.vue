<template>
  <div class="guaranteeApplyfor">

    <div class="applyformain applyformainlist"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      :infinite-scroll-distance="maxResultCount"
    >
      <applyforitem v-for="(li,index) in applist" :info="li" showtype="2" :key="index" @applydetail="applydetailClick" />
    </div>
  </div>
</template>

<script>
import { financeGet } from '@/network/url/codeFinance.js';
import applyforitem from '@/components/applyforitem.vue';
export default {
  components: {
    applyforitem
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
    loadMore() {
      this.loading = true;
      if (this.skipCount + this.maxResultCount < this.totalCount) {
        this.getapplist();
      }
    },
    async getapplist() {
      const res = await financeGet({
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
          // item.imgurl = 'http://vnextdebug.test3.dev.baitu.com' + '/resource/baitu-documents/document/map/' + item.logo;
          item.logo = '/resource/baitu-documents/document/map/' + item.logo;
          console.log(item.imgurl);
          this.applist.push(item);
        });
        // this.applist = res.items;
        this.totalCount = res.totalCount;
        this.loading = false;
      }
    },
    applydetailClick(id) {
      this.$router.push({
        path: '/finance-detail',
        query: { id }
      });
    }
  },
  mounted() {
    this.getapplist();
  }
};
</script>

<style lang="less" scoped src="@/assets/css/financingGuarantee/guaranteeApplyfor.less">

</style>
