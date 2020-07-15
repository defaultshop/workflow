<template>
  <div class="appleft">
    <el-aside width="250px" style="background-color: rgb(238, 241, 246)">
      <el-menu style="height:100%">
        <div class="agencylist">
          <a @click.stop="geturlto('/home/mytask')">
            <div :style="{backgroundColor:agencytype == 1 ? '#3671FF' : '', color:agencytype == 1 ? '#fff' : '#333'}">
              <i class="iconfont icondaiban" :style="{color:agencytype == 1 ? '#fff' : ''}" />
              <span>我的待办</span>
            </div>
          </a>
          <a @click.stop="geturlto('/home/mylaunch')">
            <div :style="{backgroundColor:agencytype == 2 ? '#3671FF' : '', color:agencytype == 2 ? '#fff' : '#333'}">
              <i class="iconfont iconfaqi" :style="{color:agencytype == 2 ? '#fff' : ''}" />
              <span>我发起的</span>
            </div>
          </a>
          <a @click.stop="geturlto('/home/myhandle')">
            <div :style="{backgroundColor:agencytype == 3 ? '#3671FF' : '', color:agencytype == 3 ? '#fff' : '#333'}">
              <i class="iconfont iconchuli" :style="{color:agencytype == 3 ? '#fff' : ''}" />
              <span>我处理的</span>
            </div> 
          </a>
          <a @click.stop="geturlto('/home/copytome')">
            <div :style="{backgroundColor:agencytype == 4 ? '#3671FF' : '', color:agencytype == 4 ? '#fff' : '#333'}">
              <i class="iconfont icondaiban" :style="{color:agencytype == 4 ? '#fff' : ''}" />
              <span>抄送我的</span>
            </div> 
          </a>
        </div>
        <!-- <div class="height10">1</div>
        <div class="agencysearch">
          <div class="search">
            <input type="text" placeholder="搜索">
          </div>
          <div class="list" v-for="li in 3" :key="li">待办的业务{{ li }}</div>
        </div> -->
    
      </el-menu>
    </el-aside> 
  </div>
</template>

<script>
export default {
  props:{
    lefttype:{
      type: String,
      default: '1',
    },
  },
  data() {
    return {
      agencytype: 2,
    };
  },
  methods:{
    geturlto(url){
      this.$router.push(url);
    },
  },
  mounted() {
    this.agencytype = this.lefttype;
  },
};
</script>

<style lang="scss" scoped src="./index.scss" />