<template>
  <div id="addtenant">

    <el-dialog title="链接字符串" :visible.sync="linkstring" width="60%" center>
      
      <div class="usertit">邮箱地址</div>
      <div class="userint">
        <input type="text" v-model="eamil">
      </div>
      <div class="usertit">密码</div>
      <div class="userint">
        <input type="password" v-model="pass" placeholder="请输入由大写字母,小写字母,特殊字符和数字组成的密码">
      </div>
      <div class="usertit">租户名称*</div>
      <div class="userint">
        <input type="text" v-model="name" >
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
      name: '',
      centerDialogVisible: false,
      eamil: '',
      pass: '',
      linkstring: false,
      isDefault: false,
    };
  },
  methods:{
    async savelinkstring(){
      var url = '/api/multi-tenancy/tenants/',
        type = 'post',
        data = {
          adminEmailAddress: this.eamil,
          adminPassword: this.pass,
          name: this.name,
        };
      let res = await this.$getaxios(url,type,data);
      console.log(res);
      if (res){
        console.log(res);
        this.$message('添加成功');
        this.$emit('getinfo');
        this.eamil = '',
        this.name = '',
        this.pass = '',
        this.linkstring = false;
      }
    },
    changeboxtype(){
      this.linkstring = true;
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss" />