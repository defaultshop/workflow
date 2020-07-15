<template>
  <div id="tenant">
    <comhead headindex="21" />

    <div class="newtenant">
      <div @click="buildtenant">新建租户</div>
    </div>
    <div class="rolecont">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column fixed="left" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="jurisdiction(scope.row)" type="text" size="small">链接字符串</el-button>
            <el-button @click="deleteclick(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="角色名称" />
        
      </el-table>

      <div class="page" v-if="totalCount>maxResultCount">
        <el-pagination background layout="prev, pager, next" :total="totalCount" />
      </div>
    </div>

    <el-dialog title="编辑" :visible.sync="centerDialogVisible" width="60%" center>
      <div class="usertit">租户名称*</div>
      <div class="userint">
        <input type="text" v-model="name">
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="savesureinfo">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="链接字符串" :visible.sync="linkstring" width="60%" center>
      <div class="usercheck">
        <el-checkbox v-model="isDefault">使用共享数据库</el-checkbox>
      </div>
      <div class="usertit">默认连接字符串</div>
      <div class="userint">
        <input type="text" v-model="defaultstring">
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="linkstring = false">取 消</el-button>
        <el-button type="primary" @click="savelinkstring">确 定</el-button>
      </span>
    </el-dialog>

    <addtenant ref="addtenant" @getinfo="getinfo" />
  </div>
</template>

<script>
import comhead from '../../common/comhead';
import addtenant from './addtenant/index.vue';
export default {
  components:{
    comhead,
    addtenant,
  },
  data(){
    return {
      tableData: [],
      page: 1,
      totalCount: 1,
      centerDialogVisible: false,
      name: '',
      userinfo: '',
      linkstring: false,
      isDefault: false,
      defaultstring: '',
      id: '',
    };
  },
  methods:{
    //删除
    deleteclick(row){
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      }).then(() => {
        (async() => {
          var url = '/api/multi-tenancy/tenants/'+row.id,
            type = 'delete',
            data = {
            };
          let res = await this.$getaxios(url,type,data);
          if (res){
            console.log(res);
            this.$message('删除成功!');
            // this.centerDialogVisible = false;
            this.getinfo();
          }
        })();
        
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        });
      });
    },
    //新建租户
    buildtenant(){
      this.$refs.addtenant.changeboxtype();
    },
    //链接字符串-保存
    async savelinkstring(){
      var url = '/api/multi-tenancy/tenants/'+this.id+'/default-connection-string',
        type = 'put',
        data = {
          defaultConnectionString: this.defaultstring,
        };
      let res = await this.$getaxios(url,type,data);
      if (res){
        console.log(res);
        this.$message('修改成功');
        this.linkstring = false;
        this.getinfo();
      }
    },
    //链接字符串
    async jurisdiction(row){
      console.log(row);
      this.id = row.id;
      var url = '/api/multi-tenancy/tenants/'+row.id+'/default-connection-string',
        type = 'get',
        data = {};
      let res = await this.$getaxios(url,type,data);
      if (res){
        console.log(res);
        this.defaultstring = res;
        this.linkstring = true;
      }
    },
    //编辑-保存
    async savesureinfo(){
      var url = '/api/multi-tenancy/tenants/'+this.userinfo.id,
        type = 'put',
        data = {
          name: this.name,
        };
      let res = await this.$getaxios(url,type,data);
      if (res){
        console.log(res);
        this.$message('修改成功');
        this.centerDialogVisible = false;
        this.getinfo();
      }
    },
    async handleClick(row) {
      console.log(row);
      var url = '/api/multi-tenancy/tenants/'+row.id,
        type = 'get',
        data = {};
      let res = await this.$getaxios(url,type,data);
      if (res){
        this.userinfo = res;
        this.name = res.name;
      }
      console.log(res);
      this.centerDialogVisible = true;
    },
    async getinfo(){
      var url = '/api/multi-tenancy/tenants?skipCount=0&maxResultCount=10&sorting=name asc',
        type = 'get',
        data = {
          sorting: 'name asc',
          skipCount: 0,
          maxResultCount: 10,
        };

      let user = await this.$getaxios(url,type,data);
      console.log(user,'user');
      this.tableData = user.items;
      this.totalCount = user.totalCount;
    },
  },
  mounted(){
    this.getinfo();
  },
};
</script>

<style lang="scss" scoped src="./index.scss" />
<style>
#tenant .el-table__body-wrapper{
    min-height: 300px;
}
</style>