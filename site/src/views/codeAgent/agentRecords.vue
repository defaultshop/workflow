<template>
  <div class="backimg">
    <div class="backtitle">{{ $store.state.config.currentUser.entName ? $store.state.config.currentUser.entName : '暂无' }}</div>

    <div class="guaranteecont">
      <agentHead :total="totalCount" />
      <div class="guarantlist"
        style="top:2.8rem"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        :infinite-scroll-distance="maxResultCount"
      >
        <agentItem v-for="li in applist" :info="li" @lookdetail="lookdetailClick(li.id)" :key="li.id" />

        <empty v-if="applist.length == 0" />
        </div>
    </div>
    <div class="combutton botbutton" @click="$router.push('/agent-type')">
      <combutton title="我要待办" />
    </div>
  </div>
</template>

<script>
import { matterSubmittedApplication } from '@/network/url/codeAgent.js';
import agentHead from './item/agentHead.vue';
import agentItem from './item/agentItem.vue';
import combutton from '@/components/combutton.vue';
import empty from '@/components/results/empty.vue';
export default {
  components: {
    agentHead,
    agentItem,
    combutton,
    empty
  },
  data() {
    return {
      filter: '',
      status: '',
      type: '',
      from: '',
      to: '',
      skipCount: 0,
      maxResultCount: 10,
      applist: [],
      totalCount: 0,
      loading: false
    };
  },
  methods: {
    //查看
    lookdetailClick(id) {
      this.$router.push('/agent-complete?id=' + id);
    },
    //上拉加载
    loadMore() {
      this.loading = true;
      if (this.skipCount + this.maxResultCount < this.totalCount) {
        this.getapplist();
      }
    },
    async getapplist() {
      const res = await matterSubmittedApplication({
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
