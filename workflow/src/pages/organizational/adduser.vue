<template>
  <div>
    <el-dialog title="添加用户" :visible.sync="limits" width="60%" center>
      <el-table :data="userlist" stripe style="width: 100%">
        <el-table-column fixed="left" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="saveuser(scope.row)" type="text" size="small">添加</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="登录名" width="150"/>
        <el-table-column prop="userRealName" label="真实姓名" />
      </el-table>
      <div class="page">
        <el-pagination background layout="prev, pager, next" :total="usertotal"   @current-change="changepage" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="limits = false">取 消</el-button>
        <!-- <el-button type="primary" @click="savelimit">确 定</el-button> -->
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data(){
    return {
      limits: false,
      userlist: [],
      usertotal: 0,
      nowid: '',
      idtype: '',
    };
  },
  methods:{
    //分页
    changepage(page){
      console.log(page);
      this.skipCount = (page-1)*this.maxResultCount;
      this.getinfo(this.nowid);
    },  
    //添加用户列表
    async getuserlist(id,idtype){
      this.nowid = id;
      this.idtype = idtype;
      var url = '/api/baitu-organization-units/organizationUnit/readyUsers?maxResultCount=10&skipCount=0',
        type = 'get',
        data = {
        };
      let res = await this.$getaxios(url,type,data);
      if (res){
        console.log(res);
        this.userlist = res.items;
        this.usertotal = res.totalCount;
        this.limits = true;
      }
    },
    //添加用户
    saveuser(row){
      console.log(row);
      this.userid = row.id,
      this.$confirm('是否添加', '添加用户', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        console.log(row.userId,'row');
        var url = '/api/baitu-organization-units/organizationUnit/userToOrganizationUnit',
          type = 'post',
          data = {
            userId: row.userId,
            organizationUnitId: this.idtype == 1 ? this.nowid : this.nowid.id,            
          };
        let res = this.$getaxios(url,type,data);
        console.log(res);
        this.$message({
          type: 'success',
          message: '添加成功!',
        });
        this.limits = false;
        this.$emit('userinfo',this.nowid);

      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除',
        // });          
      });
    },
  },
};
</script>