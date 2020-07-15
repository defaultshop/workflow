<template>
  <div class="eachbusiness clear" @click="businessclick">
    <div class="businesstype" :style="{backgroundColor:tabledata.flowInstanceStatus == 3 ? '#1FBA82' : ''}">
      <span>{{ tabledata.flowInstanceStatusDesc }}</span>
    </div>
    <div class="businesscont clear">
      <div class="business1">
        <div>{{ tabledata.name }}</div>
        <div>
          <span>{{ tabledata.message }}</span>
        </div>
      </div>
      <!-- <div class="business2">
        <span>{{ tabledata.flowInstanceStatusDesc }}</span>
      </div> -->
      <!-- <div class="business3"> </div> -->
      <div class="business4">
        <div>系统创建时间：{{ tabledata.creationTimeDesc }}</div>
        <div>业务唯一识别码：{{ tabledata.sequenceNumber }}</div>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  props:{
    tabledata: Object,
  },
  data(){
    return {

    };
  },
  methods:{
    businessclick(){
      this.$emit('businesschange');
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss">

</style>