<template>
  <div class="resultpage">
    <div class="resulticon">
      <i class="iconfont iconzhengchang" />
    </div>
    <div class="resultstatus">申请已受理</div>
    <div class="resultit">
      您的申请已受理，正在处理中，预计X个 工作日内，详情可咨询8888888
    </div>
    <div class="resultbtn">
      <combutton title="重新申请" />
    </div>
    <div class="resultback">
      <span>返回首页</span>
    </div>
  </div>
</template>

<script>
import combutton from '../combutton.vue';
export default {
  components: {
    combutton
  }
};
</script>
