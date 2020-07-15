<template>
  <div id="invitepeople">
    <div class="invitetit">
      <i class="el-icon-back back" />
      <span>邀请成员</span>
      <i class="el-icon-close close" />
    </div>
    <div class="projectall">
      <div>选择参与的项目</div>
      <div>
        <el-checkbox v-model="checked">全选</el-checkbox>
      </div>
    </div>
    <div class="projectree">
      <el-tree :data="data" show-checkbox default-expand-all node-key="id" ref="tree" highlight-current :props="defaultProps" />
    </div>

    <div class="projectbot">
      <div class="choose">已选择4个项目</div>
      <div class="projectbtn">
        <span>跳过</span>
        <span>确定</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      checked: false,
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1',
          }],
        }],
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1',
          }],
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1',
          }],
        }],
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1',
          }],
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1',
          }],
        }],
      }],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
    };
  },
};
</script>

<style lang="scss" scoped src="./index.scss" />
<style>
.projectree .el-tree-node__content{
    position: relative;   
}
.projectree .el-checkbox{
    position: absolute;
    right: 0;
}
</style>