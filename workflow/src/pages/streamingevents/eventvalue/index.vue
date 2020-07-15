<template>
  <div id="tenant">
    <comhead headindex="5-1" head="1" />

    <div class="tenantmain">
      <div class="headnewtenant">
        <div class="headname">事件值</div>
        <div class="newtenant">
          <div @click="buildtenant">添加</div>
          <div @click="backevent">返回</div>
        </div>
      </div>
      <div class="rolecont">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column fixed="left" label="操作" width="150">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
              <el-button @click="deleteclick(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="desc" label="描述" />
          <el-table-column prop="value" label="引擎键" />        
          <el-table-column prop="creationTimeDesc" width="150" label="创建时间" />        
        </el-table>

        <div class="page" v-if="totalCount>maxResultCount">
          <el-pagination background layout="prev, pager, next" :total="totalCount" @current-change="changepage" />
        </div>
      </div>
    </div>
    
    <addtenant ref="addtenant" :info="info" @getinfo="getinfo" />
  </div>
</template>

<script>
import comhead from '../../common/comhead';
import addtenant from '../event/addtenant/index.vue';
export default {
  components:{
    comhead,
    addtenant,
  },
  data(){
    return {
      tableData: [],
      sourceTableData: [],
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
      eventflowid: '',
      info:{type:2,id:'',method:'post'},
    };
  },
  methods:{
    backevent(){
      this.$router.push('/streamingevents/event');
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
          var url = '/api/baitu-workflows/flowEvent/eventValue?Id='+row.id+'&FlowEventId='+row.flowEventId,
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
    changepage(page){
      this.skipCount = (page-1)*this.maxResultCount;
      var array = this.sourceTableData;
      var offset = this.skipCount;
      var pageSize = this.maxResultCount;
      var totalCount = this.totalCount;
      this.tableData =  (offset + pageSize >= totalCount) ? array.slice(offset, totalCount) : array.slice(offset, offset + pageSize);   
    }, 
    async handleClick(row) {
      this.$refs.addtenant.getdefaultvalueinfo(row.id,'put');
    },
    async getinfo(){
      var url = '/api/baitu-workflows/flowEvent/eventValuesToPage?'+'maxResultCount='+this.maxResultCount+'&skipCount='+this.skipCount+'&flowEventId='+this.eventflowid,
        type = 'get'
      ;

      let res = await this.$getaxios(url,type);
      this.sourceTableData = res.items;
      this.totalCount = res.totalCount;
      this.changepage(1);
    },
  },
  mounted(){
    console.log(this.$route.query.id);
    if (this.$route.query.id){
      this.eventflowid = this.$route.query.id;
      this.info.id = this.$route.query.id;
    }
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