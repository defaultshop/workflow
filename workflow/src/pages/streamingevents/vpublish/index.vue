<template>
  <div id="tenant">
    <comhead headindex="5-1" head="1" />

    <div class="tenantmain">
      <div class="headnewtenant">
        <div class="headname">事件值</div>
        <div class="newtenant">
          <div @click="backevent">返回</div>
        </div>
      </div>
      
      <div class="rolecont">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="selectedKey" label="已选键" />
          <el-table-column prop="selectedValue" label="已选值" />
          <el-table-column prop="executionId" label="引擎标识" />       
          <el-table-column prop="creationTimeDesc" width="150" label="创建时间" />       
        </el-table>

        <div class="page" v-if="totalCount>maxResultCount">
          <el-pagination background layout="prev, pager, next" :total="totalCount" @current-change="changepage" />
        </div>
      </div> 
    </div>
     
  </div>
</template>

<script>
import comhead from '../../common/comhead';
export default {
  components:{
    comhead,
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
      filter: '',
    };
  },
  methods:{
    backevent(){
      this.$router.push('/streamingevents/event');
    },
    changepage(page){
      this.skipCount = (page-1)*this.maxResultCount;
      var array = this.sourceTableData;
      var offset = this.skipCount;
      var pageSize = this.maxResultCount;
      var totalCount = this.totalCount;
      this.tableData =  (offset + pageSize >= totalCount) ?
        array.slice(offset, totalCount) : 
        array.slice(offset, offset + pageSize);   
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
 
    async getinfo(){
      var url = '/api/baitu-workflows/flowEvent/eventPublish?'+'maxResultCount='+this.maxResultCount+'&skipCount='+this.skipCount+'&FlowEventId='+this.eventflowid+'&Filter='+this.filter,
        type = 'get',
        data = {
          skipCount: 0,
          maxResultCount: 10,
        };

      let res = await this.$getaxios(url,type,data);
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