<template>
  <div id="invitepeople">
    <div class="invitetit">
      <i class="el-icon-back back" />
      <span>邀请成员</span>
      <i class="el-icon-close close" />
    </div>

    <div class="invitelink">
      <div class="invitelinktit">将链接发给小伙伴就可以啦</div>
      <div class="invitelinkint">
        <div>
          <input type="text" name="" id="" placeholder="http://www.baidu.com">
        </div>
        <div>
          复制链接
        </div>
      </div>
      <div class="invitelinktit">邀请有效期为14天，过期后项目成员仍可打开项目</div>
    </div>

    <div class="invitelinkbtn">
      <span>继续邀请</span>
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