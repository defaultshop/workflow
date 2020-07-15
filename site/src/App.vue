<template>
  <div id="app">
    <router-view />
    <Row v-show="true">
      <Col class="demo-spin-col" span="8">
        <Spin fix>
          <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
        </Spin>
      </Col>
    </Row>
  </div>
</template>

<script>
import * as localData from '@/api/common';
export default {
  name: 'App',
  data() {
    return {};
  },
  created() {
    localData.get_allList().then(res => {
      if (res.success) {
        console.log('所有的枚举', res.result);
        sessionStorage.setItem('all-enum', JSON.stringify(res.result));
      }
    });
  },

  methods: {}
};
</script>

<style lang="less" scoped>
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
.ivu-icon {
  font-size: 50px !important;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.demo-spin-col {
  height: 100vh;
  width: 100vw !important;
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
}
.ivu-spin-fix {
  background: none !important;
}
</style>
