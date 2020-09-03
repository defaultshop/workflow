<template>
  <div class="uploadhead">
    <div class="backtitle">上传附件</div>
    <div class="uploadpictures">
      <uploadimg />
    </div>
    <div class="combutton botbutton" @click="$router.push('/resultspage')">
      <combutton title="保存" />
    </div>
  </div>
</template>

<script>
import uploadimg from '@/components/uploadimg.vue';
import combutton from '@/components/combutton.vue';
export default {
  components: {
    uploadimg,
    combutton
  }
};
</script>

<style lang="less" scoped src="@/assets/css/couponRedemptionCode/uploadpictures.less">

</style>
