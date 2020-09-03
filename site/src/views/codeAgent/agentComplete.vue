<template>
  <div class="backimg">
    <div class="completecont">
      <completeStatus :status="appstatus" :score="score" />

      <div class="comback completemain">
        <div class="completemain-tit">
          <div>事项信息</div>
          <div @click="$router.push('/guarantee-records')">查看详情</div>
        </div>
        <div class="completemain-info">
          <span>事项名称：</span>
          <span>这里是事项名称</span>
        </div>
        <div class="completemain-info">
          <span>事项类型：</span>
          <span>人力社保</span>
        </div>
      </div>
      <div class="comback completemain">
        <div class="completemain-tit">
          <div>代办说明</div>
          <div></div>
        </div>
        <div class="completemain-info completemain-flex">
          <span>代办事由：</span>
          <span class="moreinfo">这里是代办事由，由用户填写，不限长度， 有多少展示多少</span>
        </div>
        <div class="completemain-info completemain-flex">
          <span>问题描述：</span>
          <span class="moreinfo">这里是代办事由，由用户填写，不限长度， 有多少展示多少</span>
        </div>
      </div>
      <div class="comback completemain">
        <div class="completemain-tit">
          <div>代办人员</div>
          <div></div>
        </div>
        <div class="completemain-info">
          <span>代办人员：</span>
          <span>何必涵</span>
        </div>
        <div class="completemain-info completemain-flex">
          <span>问题描述：</span>
          <span class="moreinfo">这里是代办事由，由用户填写，不限长度， 有多少展示多少</span>
        </div>
        <div class="completemain-info">
          <span>受理时间：</span>
          <span>2020.08.01  09：00</span>
        </div>
        <div class="completemain-info">
          <span>办结时间：</span>
          <span>2020.08.01  09：00</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { matterSubmittedApplicationGet } from '@/network/url/codeAgent.js';
import completeStatus from '@/components/completeStatus.vue';
export default {
  components: {
    completeStatus
  },
  data() {
    return {
      appinfo: '',
      appstatus: 1,
      score: 0
    };
  },
  methods: {
    async getappinfo() {
      const res = await matterSubmittedApplicationGet({
        otherid: this.id
      });
      console.log(res);
      if (res) {
        this.appinfo = res;
        this.score = res.score;
        if (this.appinfo.isAppraise) {
          this.appstatus = 3;
        } else {
          if (this.appinfo.isFinish) {
            this.appstatus = 2;
          } else {
            this.appstatus = 1;
          }
        }
      }
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id;
    }
    console.log(this.$route.query);
    this.getappinfo();
  }
};
</script>
