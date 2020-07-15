<template>
  <div class="memberbox" v-if="types" :style="{opacity:type == true ? 1 : 0}">
    <div class="shank">1</div>
    <div class="boxcont" :style="{opacity:type == true ? 1 : 0, transform:type == true ? 'scale(1)' : 'scale(0.8)'}">
      <div class="boxtit">
        <div>外链扩展</div>
        <div class="nameclose">
          <i class="el-icon-close" @click="closetype" />
        </div>
      </div>
      <div class="boxtis">
        <div>你可以给链接添加扩展属性值,从而生成多个链接地址。这些地址可以发布到不同的渠道中,用来区分</div>
        <div>
          <el-switch v-model="value" active-color="#13ce66" inactive-color="#cccccc" />
        </div>
      </div>
      <div class="boxextend">
        <div>http://tfs.dev.baitu.com/tfs/</div>
        <div>
          <input type="text" placeholder="扩展字段">
        </div>
        <div>
          <span>添加</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    showtype:{
      type: Boolean,
      default: false,
      value: false,
    },
  },
  data() {
    return {
      type: false,
      types: false,
    };
  },
  methods: {
    changetype(){
      if (this.type == false){
        this.types = true;
        setTimeout(()=>{
          this.type = true;
        },200);
      } else {
        this.type = false;
        setTimeout(()=>{
          this.types = false;
        },200);
      }
      
    },
    closetype(){
      this.type = false;
      setTimeout(()=>{
        this.types = false;
      },200);
    },
  },
  mounted() {
    
  },
};
</script>


<style lang="scss" scoped src="./index.scss" />
<style>
.nametree .el-tree-node__content{
    position: relative;   
}
.nametree .el-checkbox{
    position: absolute;
    right: 0;
}
</style>