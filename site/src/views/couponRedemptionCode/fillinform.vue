<template>
  <div class="fillform content">
    <div>
      <div class="fillformtit">基础表单</div>
      <formint />
      <formint />
    </div>
    <div class="height20">
      <formselect />
      <formtextarea />
    </div>
    <div>
      <div class="fillformtit">基础表单</div>
      <form-code-phone />
      <form-code-photo />
    </div>
    <div class="fixedbtn" @click="$router.push('/upload-attachment')">
      <combutton />
    </div>
  </div>
</template>

<script>
import formint from '@/components/form/formint.vue';
import formselect from '@/components/form/formselect.vue';
import formtextarea from '@/components/form/formtextarea.vue';
import formCodePhone from '@/components/form/formCodePhone.vue';
import formCodePhoto from '@/components/form/formCodePhoto.vue';
import combutton from '@/components/combutton.vue';
export default {
  components: {
    formint,
    formselect,
    formtextarea,
    formCodePhone,
    formCodePhoto,
    combutton
  }
};
</script>

<style lang="less" scoped src="@/assets/css/couponRedemptionCode/fillinform.less">

</style>
