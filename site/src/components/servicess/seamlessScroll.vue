<template>
  <div class="seamlesscroll">
    <div class="laba">
      <i class="iconfont iconlaba" />
    </div>
    <div class="scrollcont">
      <vue-seamless-scroll :data="newsList" :class-option="optionLeft" class="seamless-warp2">
        <ul class="item">
            <li v-for="(item,index) in newsList" :key="index" v-text="item.title"></li>
        </ul>
      </vue-seamless-scroll>
    </div>
    <div class="close">
      <i class="iconfont iconguanbi" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      newsList: [{
        title: 'A simple, seamless scrolling for Vue.js'
      }, {
        title: 'A curated list of awesome things related to Vue.js'
      }]
    };
  },
  computed: {
    optionLeft () {
      return {
        direction: 2,
        limitMoveNum: 2
      };
    }
  }
};
</script>

<style lang="less" scoped>
.seamless-warp2 {
    overflow: hidden;
    font-size: 0.26rem;
    ul.item {
        width: 580px;
        li {
            float: left;
            margin-right: 10px;
        }
    }
}
</style>
