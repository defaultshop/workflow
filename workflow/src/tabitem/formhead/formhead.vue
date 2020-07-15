<template>
  <div id="formhead" class="clear">
    <div class="formheadback">
      <span class="back" @click="backhome">
        <i class="el-icon-arrow-left" />
      </span>
      <span class="name">
        <input type="text" v-model="appname" @input="changeintname" readonly >
        <!-- <span>{{ appname }}</span> -->
      </span>
      
    </div>
    <div class="formheaddesign">
      <div :style="{backgroundColor:tebindex == 1 ? '#235BE1' : ''}" @click="changetabindex(1)">
        <span class="math">1</span>
        <span>表单设计</span>
      </div>
      <div :style="{backgroundColor:tebindex == 2 ? '#235BE1' : ''}" @click="changetabindex(2)">
        <span class="math">2</span>
        <span>制定流程</span>
      </div>
      <div :style="{backgroundColor:tebindex == 3 ? '#235BE1' : ''}" @click="changetabindex(3)">
        <span class="math">3</span>
        <span>表单发布</span>
      </div>
    </div>
    <div class="formheadbtn">
      <div>预览</div>
      <div @click="release">发布</div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      tebindex: 1,
      appname: '空模板',
      desc: '',
    };
  },
  methods:{
    //返回
    backhome(){
      this.$router.push('/');
    },
    //发布
    release(){
      this.$emit('releaseclick');
    },
    changeintname(){
      this.$emit('saveformname',{name:this.appname,desc:this.desc});
    },
    changetabindex(name){
      this.tebindex = name;
      this.$emit('chnagename',name);
    },
    setname(name){
      this.appname = name;
    },
    changetab(tab){
      this.tebindex = tab;
    },
  },
};
</script>

<style lang="scss" scoped src="./formhead.scss" />