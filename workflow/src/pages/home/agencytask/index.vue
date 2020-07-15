<template>
  <div class="agencytask">
    <comhead headindex="11" />

    <div class="myapp">
      <div class="myapphead">
        <div class="leftapp">
          <span>我的应用</span>
          <span class="num">（共两条）</span>
        </div>
      </div>
      <div class="allbusiness">
        <div class="eachbusiness clear" v-for="li in 3" :key="li">
          <div class="business1">
            <div>创建的业务名称</div>
            <div>当前：业务名称</div>
          </div>
          <div class="business3">
            <div>前三个字段名称：XXXXX</div>
            <div>前三个字段名称：XXXXX</div>
            <div>前三个字段名称：XXXXX</div>
          </div>
          <div class="business4">
            <div>系统创建时间 2020-05-27</div>
            <div>业务唯一识别码：CASDHA23823183</div>
          </div>
        </div>
      </div>
    </div>
    <nowprocess />
  </div>
</template>

<script>
import comhead from '../../common/comhead/index.vue';
import nowprocess from '../business-management/nowprocess/index.vue';
export default {
  name: 'home',
  components: {
    comhead,
    nowprocess,
  },
  data() {
    return {
      value1: true,
      apptype: false,
    };
  },
};
</script>

<style lang="scss" scoped src="./index.scss" />