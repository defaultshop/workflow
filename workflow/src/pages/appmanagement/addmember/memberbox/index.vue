<template>
  <div class="memberbox" v-if="types" :style="{opacity:type == true ? 1 : 0}">
    <div class="shank">1</div>
    <div class="boxcont" :style="{opacity:type == true ? 1 : 0, transform:type == true ? 'scale(1)' : 'scale(0.8)'}">
      <div class="boxname">
        <div class="boxnamelt">
          <div class="nameimg">
            <img src="../../../../assets/img/peo.png" alt="">
          </div>
          <div class="namecont">
            <div>张三</div>
            <div>zhangsan</div>
          </div>
        </div>
        <div class="nameclose">
          <i class="el-icon-close" @click="closetype" />
        </div>
      </div>

      <div class="teamcont">
        <div>
          <i class="el-icon-lock lt" />
          <span>成员权限</span>
        </div>
        <div>
          <span>查看者</span>
          <i class="el-icon-caret-bottom rt" />
        </div>
      </div>
      <div class="teamcont">
        <div>
          <i class="el-icon-lock lt" />
          <span>所属分组</span>
        </div>
        <div>
          <span>未分组,全部,分组1</span>
          <i class="el-icon-caret-bottom rt" />
        </div>
      </div>
      <div class="partinpro">
        <div>选择参与的项目</div>
        <div>
          <el-checkbox v-model="checked" />
          <span class="all">全选</span>
        </div>
      </div>
      <div class="nametree">
        <el-tree :data="data" show-checkbox default-expand-all node-key="id" ref="tree" highlight-current :props="defaultProps" />
      </div>

      <div class="namebtn">
        <div>删除成员</div>
        <div>确定</div>
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
    },
  },
  data() {
    return {
      checked: false,
      type: false,
      types: false,
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1',
          }, {
            id: 10,
            label: '三级 1-1-2',
          }],
        }],
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1',
        }, {
          id: 6,
          label: '二级 2-2',
        }],
      }],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
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