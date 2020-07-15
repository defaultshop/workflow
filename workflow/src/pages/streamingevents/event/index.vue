<template>
  <div id="tenant">
    <comhead headindex="5-1" head="1" />
    
    <div class="tenantmain">
      <div class="headnewtenant">
        <div class="headname">流事件</div>
        <div class="newtenant">
          <div @click="buildtenant">添加</div>
        </div>
      </div>
      
      <div class="rolecont">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column fixed="left" label="操作" width="150">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
              <el-button @click="jurisdiction(scope.row)" type="text" size="small">发布</el-button>
              <el-button @click="deleteclick(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="key" label="引擎键" />
          <el-table-column prop="flowEventStatusDesc" label="状态" />
          <el-table-column prop="name" label="可选值">
            <template slot-scope="scope">
              <el-button @click="eventvalue(scope.row)" type="text" size="small">详情</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="name" width="150" label="发布记录">
            <template slot-scope="scope">
              <el-button @click="Clickvpublish(scope.row)" type="text" size="small">详情</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="creationTimeDesc" width="150" label="创建时间" />
          
        </el-table>

        <div class="page" v-if="totalCount>maxResultCount">
          <el-pagination background layout="prev, pager, next" :total="totalCount"  @current-change="changepage" />
        </div>
      </div>
    </div>

    <el-dialog title="发布事件" :visible.sync="centerDialogVisible" width="40%" center>
      <div class="usertit">已选值</div>
      <div class="userint" style="text-indent:0">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item"
          />
        </el-select>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="savesureinfo">确 定</el-button>
      </span>
    </el-dialog>
  
    <addtenant ref="addtenant" :info="info" @getinfo="getinfo" />
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
      maxResultCount: 10,
      skipCount: 0,
      info: {type:1,id:'',method:'post'},
      options: [],
      value: '',
      valueid: '',
    };
  },
  
  methods:{
    Clickvpublish(row){
      this.$router.push({path:'/streamingevents/vpublish',query:{id:row.id}});
    },
    changepage(page){
      this.skipCount = (page-1)*this.maxResultCount;
      this.getinfo();
    },      
    eventvalue(row){
      this.$router.push({path:'/streamingevents/eventvalue',query:{id:row.id}});
    },
    //删除
    deleteclick(row){
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      }).then(() => {
        (async() => {
          var url = '/api/baitu-workflows/flowEvent/'+row.id,
            type = 'delete',
            data = {
            };
          let res = await this.$getaxios(url,type,data);
          console.log(res);
          this.$message('删除成功!');
          this.getinfo();
        })();
        
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        });
      });
    },
    //新建
    buildtenant(){
      this.$refs.addtenant.changeboxtype('post');
    },
    //获取操作项
    async jurisdiction(row){
      this.centerDialogVisible = true;
      this.valueid = row.id;
      console.log(row.id);
      var url = '/api/baitu-workflows/flowEvent/eventValues?FlowEventId='+row.id,
        type = 'get',
        data = {
          FlowEventId: row.id,
        };
      let res = await this.$getaxios(url,type,data);
      console.log(res);
      if (res){
        this.options = res;
      }
    },
    //发布-保存
    async savesureinfo(){
      if (this.value == ''){
        this.$message('请选择');
        return false;
      }
      var url = '/api/baitu-workflows/flowEvent/public',
        type = 'post',
        data = {
          id: this.valueid,
          selectedValue: this.value.value,
        };
      let res = await this.$getaxios(url,type,data);
      console.log(res);
      this.$message('发布成功');
      this.value = '';
      this.centerDialogVisible = false;
      this.getinfo();
    },
    async handleClick(row) {
      this.$refs.addtenant.getdefaultinfo(row.id,'put');
    },
    async getinfo(){
      var url = '/api/baitu-workflows/flowEvent/toPage?'+'maxResultCount='+this.maxResultCount+'&skipCount='+this.skipCount,
        type = 'get',
        data = {
          skipCount: 0,
          maxResultCount: 10,
        };

      let user = await this.$getaxios(url,type,data);
 
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
#tenant .userint .el-select{
  width: 100%;
}
</style>