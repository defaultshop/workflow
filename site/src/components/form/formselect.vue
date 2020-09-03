<template>
  <div>
    <div class="formint">
      <div class="formintit">填写标题</div>
      <div class="formintselect" @click="popupVisible = true">
        <span class="noselect" v-if="value == ''">请选择</span>
        <span v-else>{{ value }}</span>
        <i class="iconfont iconarrow-right" />
      </div>
    </div>
    <div>
      <mt-popup
        v-model="popupVisible"
        style="width:100%"
        position="bottom">
        <div class="formpopup">
          <div>111</div>
          <div>111</div>
        </div>
      </mt-popup>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      popupVisible: false,
      value: ''
    };
  }
};
</script>
