<template>
  <div class="attachment">
    <div class="title">营业执照正副本原件及复印件</div>
    <div class="load">
      <span v-show="type">未上传</span>
      <span class="yes" v-show="!type">已上传</span>
      <i class="iconfont iconarrow-right" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: true
    };
  }
};
</script>
