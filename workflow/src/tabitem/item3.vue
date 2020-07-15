<template>
  <div id="item3">
    <div class="formname">表单名字</div>
    <el-input v-model="name" placeholder="请输入表单名字" />
    <div class="formname">表单名称</div>
    <el-input v-model="desc" placeholder="请输入表单名称" />
  </div>
</template>

<script>
export default {
  data(){
    return {
      name: '未命名表单',
      desc: '未命名名称',
    };
  },
  methods:{
    savename(){
      console.log('???');
      this.$emit('saveformname',{name:this.name,desc:this.desc});
    },
    setformname(){
      this.$nextTick(()=>{
        const workflowinfo =this.$store.state.workflowinfo;
        this.name = workflowinfo.name,
        this.desc = workflowinfo.desc;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#item3{
    height: 100%;
    margin: 0px 360px 0;
    border-radius: 4px;
    background-color: #ffffff;
    box-shadow: 0 0 5px #ccc;
    padding: 20px;
    .formname{
        height: 40px;
        line-height: 40px;
    }
}
</style>