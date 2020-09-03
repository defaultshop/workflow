<template>
  <div class="backimg">
    <div class="backtitle">{{ $store.state.config.currentUser.entName ? $store.state.config.currentUser.entName : '暂无' }}</div>

    <div class="guaranteecont">
      <guaranteeHead />
      <div class="guarantlist"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        :infinite-scroll-distance="maxResultCount"
      >
        <guaranteeitem v-for="(li,index) in applist" :info="li" :key="index" />

        <empty v-if="applist.length == 0" />
      </div>
    </div>
    <div class="combutton botbutton" @click="$router.push('/guarantee-applyfor')">
      <combutton title="我要申请" />
    </div>
  </div>
</template>

<script>
import { financingGuaranteeFormMe } from '@/network/url/financingGuarantee.js';
import guaranteeHead from './item/guaranteeHead.vue';
import guaranteeitem from './item/guaranteeitem.vue';
import combutton from '@/components/combutton.vue';
import empty from '@/components/results/empty.vue';
export default {
  components: {
    guaranteeHead,
    guaranteeitem,
    combutton,
    empty
  },
  data() {
    return {
      filter: '',
      skipCount: 0,
      maxResultCount: 10,
      applist: [],
      totalCount: 0,
      loading: false
    };
  },
  methods: {
    //上拉加载
    loadMore() {
      this.loading = true;
      if (this.skipCount + this.maxResultCount < this.totalCount) {
        this.getapplist();
      }
    },
    async getapplist() {
      const res = await financingGuaranteeFormMe({
        Filter: this.filter,
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
    }
  },
  mounted() {
    this.getapplist();
  }
};
</script>
