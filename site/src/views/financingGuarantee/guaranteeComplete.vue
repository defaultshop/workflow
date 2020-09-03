<template>
  <div class="backimg">
    <div class="completecont">
      <completeStatus :status="appstatus" />

      <div class="comback completemain">
        <div class="completemain-tit">
          <div>产品信息</div>
          <div @click="$router.push('/guarantee-records')">查看详情</div>
        </div>
        <div class="completemain-info" v-for="(li,index) in appinfo.submittedItems" :key="index">
          <span>{{li.key}}：</span>
          <span>{{li.value}}</span>
        </div>
      </div>
      <!-- <div class="comback completemain">
        <div class="completemain-tit">
          <div>银行信息</div>
          <div></div>
        </div>
        <div class="completemain-info">
          <span>银行名称：</span>
          <span>招商银行莲花街道支行</span>
        </div>
      </div>
      <div class="comback completemain">
        <div class="completemain-tit">
          <div>融资信息</div>
          <div></div>
        </div>
        <div class="completemain-info">
          <span>融资金额：</span>
          <span>200万元</span>
        </div>
        <div class="completemain-info">
          <span>融资期限：</span>
          <span>12个月（含）以下</span>
        </div>
        <div class="completemain-info">
          <span>融资类型：</span>
          <span>流动资金贷款</span>
        </div>
        <div class="completemain-info">
          <span>担保方式：</span>
          <span>信用</span>
        </div>
        <div class="completemain-info">
          <span>资金用途：</span>
          <span class="moreinfo">这里是资金用途，可能会有很多需要换行</span>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { financingGuaranteeFormMeDetail } from '@/network/url/financingGuarantee.js';
import completeStatus from '@/components/completeStatus.vue';
export default {
  components: {
    completeStatus
  },
  data() {
    return {
      appinfo: { submittedItems: [] },
      appstatus: 1
    };
  },
  methods: {
    async getappinfo() {
      const res = await financingGuaranteeFormMeDetail({
        otherid: this.id
      });
      console.log(res);
      if (res) {
        this.appinfo = res;
        this.appstatus = res.status;
      }
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    console.log(this.$route.query);
    this.getappinfo();
  }
};
</script>
