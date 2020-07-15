<template>
  <div>
    <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
      <div class="editrole">
        <div class="editroletit">
          <div v-if="type == 1">添加组织成员</div>
          <div v-if="type == 2">编辑组织成员</div>
        </div>
        <div class="editrolecont">
          <div class="eacheditrolecont clear">
            <div class="editname">*角色名称:</div>
            <div class="editint">
              <input type="text" v-model="rolename" placeholder="请输入角色名称">
            </div>
          </div>
          <div class="eacheditrolecont clear">
            <div class="editname">*移动到:</div>
            <div class="editint editselect">
              <el-select v-model="value" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </div>
          </div>
          <div class="eacheditrolecont clear">
            <div class="editname">设置主管:</div>
            <div class="editint editselect">
              <el-select v-model="value" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </div>
          </div>
        </div>

        <div class="editbtn">
          <div @click="savepartment">保存</div>
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
      nodedata: '',
      rolename: '',
      type: 1,
    };
  },
  methods:{
    //保存
    savepartment(){
      this.$confirm('确定提交吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info',
      }).then(() => {
        (async()=>{
          let dataxios = this.axiosdata();
          let url = dataxios.url,
            type = dataxios.type,
            data = dataxios.data;
          
          let res = await this.$getaxios(url,type,data);
          console.log(res);
          
          this.drawer = false;
          this.rolename = '';
          this.$emit('dataRefresh');
          this.$message({
            type: 'success',
            message: '添加成功',
          });  
        })();
      }).catch(() => {        
      });
    },
    axiosdata(){
      let nowurl = this.type == 1 ? '/api/baitu-organization-units/organizationUnit' : '/api/baitu-organization-units/organizationUnit/reName',
        nowtype = 'post',
        nowdata = this.type == 1 ? {
          displayName: this.rolename,
          ParentId: this.nodedata.id,
        } : {
          displayName: this.rolename,
          id: this.nodedata.id,
        };
      return {url:nowurl,type:nowtype,data:nowdata};
    },
    openbox(nodedata,type){
      this.type = type;
      if (type == 2){
        this.rolename = nodedata.displayName;
      } else {
        this.rolename = '';
      }
      this.nodedata = nodedata;
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
