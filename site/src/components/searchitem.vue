<template>
  <div class="searchitem">
    <span>
      <i class="iconfont iconsousuo" />
    </span>
    <input type="text" :placeholder="place" v-model="filter" @keyup.13="submitenter">
  </div>
</template>

<script>
export default {
  data() {
    return {
      place: '请输入产品名称或银行名称进行筛选',
      filter: ''
    };
  },
  watch: {
    filter() {
      this.$emit('filtercont', this.filter);
    }
  },
  methods: {
    submitenter() {
      this.$emit('filtercont', this.filter);
    }
  }
};
</script>
