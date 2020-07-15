<template>
  <div class="result-wrap">
    <div class="header">
      <div class="leftside">
        <img src="@/assets/img/logo.png" alt class="logo" />
      </div>
      <div class="rightside">
        <span class="company">
          <i class="iconfont iconmorentouxiang"></i>
          {{ realName }}
          <span class="exit" @click="logout">【退出】</span>
        </span>
      </div>
    </div>
    <div class="banner">
      <div class="inner">
        <div class="title">丽水市入学(入园)报名</div>
        <div class="tab" style="margin-left: -120px">
          <span class="current">区域选择</span>
        </div>
      </div>
    </div>

    <div class="content-box padd">
      <div class="title-bar">
        <span class="title">请选择报名区域</span>
      </div>
      <div class="select-area">
        <ul class="clearfix">
          <li @click="skip(item)" v-for="(item, i) in arr_data" :key="item" :class="i == 0 || i == 1 ? 'blues' : ''">
            {{ item }}
            <i class="iconfont iconarrow-down"></i>
          </li>
        </ul>
      </div>
    </div>

    <child-footer></child-footer>
  </div>
</template>

<script>
import childHeader from '@/view/components/Header.vue';
import childFooter from '@/view/components/Footer.vue';

export default {
  components: {
    'child-header': childHeader,
    'child-footer': childFooter
  },
  data() {
    return {
      realName: sessionStorage.getItem('realName'),
      arr_data: [
        '莲都区',
        '经济技术开发区',
        '缙云县',
        '青田县',
        '松阳县',
        '遂昌县',
        '庆元县',
        '云和县',
        '龙泉市',
        '景宁畲族自治县'
      ]
    };
  },
  methods: {
    logout() {
      window.location.href = 'http://www.zjzwfw.gov.cn/zjservice/front/index/page.do?webId=1';
    },
    skip(value) {
      if (value == '经济技术开发区') {
        this.$router.push({
          name: 'Home'
        });
      } else if (value == '莲都区') {
        window.location.href = '/PcSiteLd/index.html#/Home';
      } else {
        this.$Message.warning('暂未开放');
      }
    }
  }
};
</script>

<style lang="less" scoped>
.blues {
  color: #226ddd !important;
  font-weight: bold;
}
</style>
