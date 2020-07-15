<template>
  <div class="title-bar">
    <!-- 
      type:1报名类型文案  2志愿学校文案 3隐藏提示
     -->
    <span class="title" v-if="schoolType === 1 || schoolType === 8">开发区幼儿园入园报名</span>
    <span class="title" v-else>开发区公办{{ schoolType == '2' ? '小学' : '中学' }}入学报名</span>
    <Alert show-icon closable v-if="type === 1">报名类型：{{ resgisText }}。</Alert>
    <Alert show-icon closable v-if="type === 2">报名儿童需在以下学校选择一所为自己的志愿学校，并默认服从调配。</Alert>
    <Alert show-icon closable v-if="type === 64">{{ notice }}</Alert>
  </div>
</template>
<script>
import * as res_common from '@/api/common';
export default {
  props: {
    type: {
      default: 1
    }
  },
  data() {
    return {
      schoolType: sessionStorage.getItem('schoolType') - 0,
      resgisText: sessionStorage.getItem('typeTextDesc'),
      notice: ''
    };
  },
  created() {
    this.getNotice();
  },
  methods: {
    async getNotice() {
      let res = await res_common.post_getNotice({
        schoolTypes: [sessionStorage.getItem('schoolType') - 0],
        businessTypes: [sessionStorage.getItem('businessTypes') - 0],
        noticeTypes: [64]
      });
      console.log(res);
      if (res.success && res.result.length > 0) {
        this.notice = res.result[0].content;
      }
    }
  }
};
</script>