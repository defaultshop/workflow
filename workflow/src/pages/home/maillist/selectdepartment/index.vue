<template>
  <div id="selectdepartment">
    <el-dialog title="FlowEvent" :visible.sync="linkstring" @close="closetenant" width="40%" center>
      
      <div class="department">
        <div class="choose">
          <div class="tit">选择：</div>
          <div class="departcont">
            <el-tree
              :data="data"
              show-checkbox
              default-expand-all
              node-key="id"
              ref="tree"
              highlight-current
              :props="defaultProps"
            />
          </div>
        </div>
        <div class="alreadychoose">
          <div class="tit">已选：</div>
          <div class="departcont">
            <div class="eachchoosedepaert" v-for="li in 6" :key="li">
              <span>测试部门</span>
              <span class="closechoose">
                <i class="el-icon-close" />
              </span>
            </div>
          </div>
        </div>
      </div>


      <span slot="footer" class="dialog-footer">
        <el-button @click="linkstring = false">取 消</el-button>
        <el-button type="primary" @click="savelinkstring">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data(){
    return {
      linkstring: false,
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
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1',
        }, {
          id: 8,
          label: '二级 3-2',
        }],
      }],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
    };
  },
  methods:{
    savelinkstring(){
      this.linkstring = false;
    },
    closetenant(){
      this.linkstring = false;
    },
    getdefaultinfo(){
      this.linkstring = true;
    },
  },
};
</script>
<style lang="scss" scoped src="./index.scss" />
<style>
#selectdepartment .el-dialog--center .el-dialog__body{
  padding: 0;
}
</style>