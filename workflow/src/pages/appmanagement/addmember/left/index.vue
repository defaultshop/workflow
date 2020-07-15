<template>
  <div class="addmemberleft">
    <el-aside width="250px" style="background-color: rgb(238, 241, 246)">
      <el-menu style="height:100%">
        <div class="topteam">
          <div class="plusmember">
            <i class="el-icon-plus" />
            <span>添加成员</span>
          </div>

          <div class="team">
            <div>未分组</div>
            <div>5</div>
          </div>
          <div class="team">
            <div>全部</div>
            <div>5</div>
          </div>
        </div>
        <div class="botteam">
          <div class="teamtit">全部项目</div>
          <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />
        </div>
      </el-menu>
    </el-aside> 
  </div>
</template>

<script>
export default {
  data() {
    return {
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
  methods: {
    handleNodeClick(data) {
      console.log(data);
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss" />
