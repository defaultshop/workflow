<template>
  <div>
    <el-dialog :title="title" :visible.sync="centerDialogVisible" width="60%" center>
      <div class="usertit">角色名称*</div>
      <div class="userint">
        <input type="text" v-model="username">
      </div>
      <div class="usercheck">
        <el-checkbox v-model="isDefault">默认</el-checkbox>
      </div>
      <div class="usercheck">
        <el-checkbox v-model="isPublic">公开</el-checkbox>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="savesureinfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data(){
    return {
      title: '添加',
      username: '',
      isDefault: false,
      isPublic: false,
      centerDialogVisible: false,
      readonly: false,
      roleid: '',
      concurrencyStamp: '',
    };
  },
  methods:{
    async savesureinfo(){
      let id = this.readonly ? '/'+this.roleid : '';
      var url = '/api/identity/roles'+id,
        type = this.readonly ? 'put' : 'post',
        data = {
          name: this.username,
          isDefault: this.isDefault,
          isPublic: this.isPublic,
        };
      if (this.readonly){
        data.concurrencyStamp = this.concurrencyStamp;
      }
      let info = await this.$getaxios(url,type,data);
      console.log(info);
      if (info){
        let msg = this.readonly ? '修改成功' : '添加成功';
        this.$message(msg);
      }
      this.centerDialogVisible = false;
      this.$emit('rolesinfo');
    },
    addnewrole(tit,data){
      this.title = tit;
      if (data){
        this.readonly = true;
        this.username = data.name;
        this.isDefault = data.isDefault;
        this.isPublic = data.isPublic;
        this.roleid = data.id;
        this.concurrencyStamp = data.concurrencyStamp;
      } else {
        this.readonly = false;
        this.roleid = '';
      }
      this.centerDialogVisible = true;
    },
  },
};
</script>


<style lang="scss" scoped>
.usertit{
    line-height: 2rem;
}
.userint{
    height: 2.4rem;
    line-height: 2.4rem;
    background-color: #f5f5f5;
    border-radius: 0.3rem;
    text-indent: 0.5rem;
    margin: 1rem 0;
    input{
        width: 95%;
        text-indent: 0.5rem;
    }
}
.usercheck{
    line-height: 2rem;
}
</style>