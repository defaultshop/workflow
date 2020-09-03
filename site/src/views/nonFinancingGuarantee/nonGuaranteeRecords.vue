<template>
  <div>
    <div class="nonguaranteecont" @click="$router.push('/non-guarantee-applyfor')">
      <nonguaranteeitem v-for="li in 4" nontype="1" :key="li" />
    </div>
    <div class="botbutton">
      <combutton title="我要申请" />
    </div>
  </div>
</template>

<script>
import nonguaranteeitem from './item/nonguaranteeitem.vue';
import combutton from '@/components/combutton.vue';
export default {
  components: {
    nonguaranteeitem,
    combutton
  }
};
</script>
