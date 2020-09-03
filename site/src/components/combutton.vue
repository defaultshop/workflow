<template>
  <div class="combutton">
    <span>{{ this.title }}</span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '确认按钮'
    }
  }
};
</script>
