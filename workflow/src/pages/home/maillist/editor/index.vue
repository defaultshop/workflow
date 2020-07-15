<template>
  <div>
    <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
      <div class="editrole">
        <div class="editroletit">
          <div>编辑角色</div>
        </div>
        <div class="editrolecont">
          <div class="eacheditrolecont clear">
            <div class="editname">*人员姓名:</div>
            <div class="editint">
              <input type="text" placeholder="请输入人员姓名">
            </div>
          </div>
          <div class="eacheditrolecont clear">
            <div class="editname">*身份证号:</div>
            <div class="editint">
              <input type="text" placeholder="请输入身份证号">
            </div>
          </div>
          <div class="eacheditrolecont clear">
            <div class="editname">我的部门:</div>
            <div class="editint editint2">
              <span>部门1</span>
              <span>部门2</span>
              <span>部门3</span>
            </div>
          </div>
          <div class="eacheditrolecont clear">
            <div class="editname">*分配角色:</div>
            <div class="editint editselect">
              <el-select v-model="value" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </div>
          </div>
          <div class="eacheditrolecont clear">
            <div class="editname">*登录账号:</div>
            <div class="editint">
              <input type="text" placeholder="请输入登录账号">
            </div>
          </div>
          <div class="eacheditrolecont clear">
            <div class="editname">职位名称:</div>
            <div class="editint">
              <input type="text" placeholder="请输入职位名称">
            </div>
          </div>
          <div class="eacheditrolecont clear">
            <div class="editname">上级领导:</div>
            <div class="editint">
              <input type="text" placeholder="请输入上级领导">
            </div>
          </div>
          <div class="eacheditrolecont clear">
            <div class="editname">手机号码:</div>
            <div class="editint">
              <input type="text" placeholder="请输入手机号码">
            </div>
          </div>

        </div>

        <div class="editbtn">
          <div>保存</div>
          <div>删除</div>
          <div>取消</div>
        </div>
      </div>
      
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      options: [{
        value: '选项1',
        label: '黄金糕',
      }, {
        value: '选项2',
        label: '双皮奶',
      }, {
        value: '选项3',
        label: '蚵仔煎',
      }, {
        value: '选项4',
        label: '龙须面',
      }, {
        value: '选项5',
        label: '北京烤鸭',
      }],
      value: '',
      value1: '',
      innerDrawer: false,
      checked: false,
    };
  },
  methods:{
    openbox(){
      this.drawer = true;
    },
    handleClose(){
      console.log('关闭');
      this.innerDrawer = false;
    },
    chooseqx(){
      this.innerDrawer = true;
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss" />

<style>
.editselect .el-select .el-input__inner{
    height: 2rem;
}
</style>
