<template>
  <div id="invitepeople">
    <div class="invitetit">
      <i class="el-icon-back back" />
      <span>
        <b>邀请同事进入项目</b>
        <b>(超级管理员自动参与项目)</b>
      </span>
      <i class="el-icon-close close" />
    </div>
    <div class="projectall">
      <div>选择参与的项目</div>
      <div>
        <el-checkbox v-model="checked">全选</el-checkbox>
      </div>
    </div>
    <div class="colleaguesree">
      <!-- <el-tree :data="data" show-checkbox default-expand-all node-key="id" ref="tree" highlight-current :props="defaultProps" /> -->
      <div class="eachproject">
        <div class="eachprojectit">
          <div>
            <i class="el-icon-caret-bottom" />
            <span>部门4（4个）</span>
          </div>
          <div>
            <el-checkbox v-model="checked" />
          </div>
        </div>
        <div class="eachprotree" v-for="li in 3" :key="li">
          <div>
            <i class="el-icon-user-solid img" />
            <span>姓名</span>
          </div>
          <div>账号名称ZHANGHAO</div>
          <div>
            <el-checkbox v-model="checked" />
          </div>
        </div>
        <div class="eachproject">
          <div class="eachprojectit">
            <div style="text-indent:1rem">
              <i class="el-icon-caret-bottom" />
              <span>部门4（4个）</span>
            </div>
            <div>
              <el-checkbox v-model="checked" />
            </div>
          </div>
          <div class="eachprotree" v-for="li in 3" :key="li">
            <div style="text-indent:2rem">
              <i class="el-icon-user-solid img" />
              <span>姓名</span>
            </div>
            <div>账号名称ZHANGHAO</div>
            <div>
              <el-checkbox v-model="checked" />
            </div>
          </div>
        </div>
      </div>
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