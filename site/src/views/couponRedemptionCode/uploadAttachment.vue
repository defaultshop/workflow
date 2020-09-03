<template>
  <div>
    <div>
      <attachment v-for="li in 6" :key="li" />
    </div>
    <div class="positionbtn" @click="$router.push('/upload-pictures')">
      <combutton />
    </div>
  </div>
</template>

<script>
import combutton from '@/components/combutton.vue';
import attachment from '../common/attachment.vue';
export default {
  components: {
    combutton,
    attachment
  }
};
</script>
