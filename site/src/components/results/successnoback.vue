<template>
  <div class="resultpage">
    <div class="resulticon">
      <i class="iconfont iconzhengchang" />
    </div>
    <div class="resultstatus">提交成功</div>
    <div class="resultit">
      我们将在1个工作日内与您电话联系。
    </div>
    <div class="resultbtn" @click="backhome">
      <combutton title="返回首页" />
    </div>
  </div>
</template>

<script>
import combutton from '../combutton.vue';
export default {
  components: {
    combutton
  },
  props: {
    url: {
      type: String,
      default: '/'
    }
  },
  methods: {
    backhome() {
      this.$router.push(this.url);
    }
  },
  mounted() {
    console.log(this.url);
  }
};
</script>
