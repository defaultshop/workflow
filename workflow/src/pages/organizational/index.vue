<template>
  <div id="organiza">
    <comhead headindex="24" />

    <div class="organizatit">组织单元</div>
    <div class="organizacont">
      <div class="organizacontlt">
        <div class="structure">组织结构</div>
        <el-tree :data="data"
          :props="defaultProps"
          accordion 
          :expand-on-click-node="false" 
          :highlight-current="true" 
          node-key="id"
          :default-expanded-keys="defaultShowNodes"
          @node-collapse="closetreeclick" 
          @node-expand="opentreeclick" 
          @node-click="handleNodeClick"
        >

          <span class="custom-tree-node" slot-scope="{ node, data }" @mouseenter="enter(data,node)" @mouseleave="leave(data,node)">
            <span>
              <i class="el-icon-folder" style="margin-right:2px;color:#0DB3A6" v-if="data.check == false" />
              <i class="el-icon-folder-opened" style="margin-right:2px;color:#0DB3A6" v-else />
            </span>
            <span>{{ node.label }}</span>
            <span v-if="false">
              <i class="el-icon-plus" @click="() => append(data)" />
            </span> 
            
            <span v-if="data.id == nowid || data.id == moveid">
              <i class="el-icon-plus addicon" @click="() => append(data)" />
              <i class="el-icon-edit addicon" @click="() => edit(node, data)" />
              <i class="el-icon-delete addicon" @click="() => remove(node, data)" />
            </span>
          </span>
        </el-tree>
      </div>
      <div class="organizacontrt">
        <div class="orgrtit">
          <div>组织单元</div>
          <div @click="adduser">
            <span>+添加</span>
          </div>
        </div>
        <div>
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column fixed="left" label="操作" width="150">
              <template slot-scope="scope">
                <el-button @click="deleteclick(scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="userName" label="登录名" width="150"/>
            <el-table-column prop="userRealName" label="真实姓名" />
            
          </el-table>

          <div class="page" v-if="totalCount>maxResultCount">
            <el-pagination  background layout="prev, pager, next" :total="totalCount" />
          </div>
        </div>
      </div>
    </div>

    <adduser ref="adduser" @userinfo="getinfo" />
  </div>
</template>

<script>
import comhead from '../common/comhead';
import adduser from './adduser.vue';
export default {
  components:{
    comhead,
    adduser,
  },
  data(){
    return {
      totalCount: 1,
      data: [],
      defaultProps: {
        children: 'children',
        label: 'displayName',
      },
      tableData:[],
      maxResultCount: 10,
      skipCount: 0,      
      nowid: '',
      limits: false,
      userlist: [],
      usertotal: 1,
      userid: '',
      moveid: '',
      defaultShowNodes: [],
    };
  },
  methods:{
      
    leave(data,node){
      console.log(data,node);
      this.moveid = '';
    },
    enter(data,node){
      console.log(data,node);
      this.moveid = data.id;
    },
    closetreeclick(data,node,event){
      data.check = false;
      console.log(data,node,event);
    },
    opentreeclick(data,node,event){
      data.check = true;
      console.log(data,node,event);
    },
    //节点修改
    edit(node,data){
      console.log(node, data);
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      
      this.$prompt('请输入名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: data.displayName,
      }).then(({ value }) => {
        this.edituser(value,data.id);
        children[index].displayName = value;
        
      }).catch(() => {
     
      });
    },
    async edituser(val,ids){
      var url = '/api/baitu-organization-units/organizationUnit/reName',
        type = 'post',
        data = {
          displayName: val,
          id: ids,
        };
      let res = await this.$getaxios(url,type,data);
      console.log(res);

      this.$message({
        type: 'success',
        message: '修改成功',
      });
    //   if (res){
    //     console.log(res);
    //     this.userlist = res.items;
    //     this.usertotal = res.totalCount;
    //     this.limits = true;
    //   }
    },
    //节点添加
    append(nodedata) {
      this.$prompt('请输入名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        (async()=>{
          var url = '/api/baitu-organization-units/organizationUnit',
            type = 'post',
            data = {
              displayName: value,
              ParentId: nodedata.id,
            };
          let res = await this.$getaxios(url,type,data);
          console.log(res);
          const newChild = { id: res.id, displayName: res.displayName,parentId: res.parentId, children: [], check: false };
          if (!data.children) {
            this.$set(nodedata, 'children', []);
          }
          nodedata.children.push(newChild);
          this.$message({
            type: 'success',
            message: '添加成功',
          });  
        })();
      }).catch(() => {
     
      });
    },
    //节点删除
    async remove(node, data) {
      console.log(node, data);
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
      var url = '/api/baitu-organization-units/organizationUnit?id='+data.id,
        type = 'delete',
        datas = {

        };
      let res = await this.$getaxios(url,type,datas);
      console.log(res);
    },
    //删除节点用户
    deleteclick(row){
      this.$confirm('是否确认删除？', '删除用户', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        console.log(row.userId,'row');
        this.deleteuser(row);
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除',
        // });          
      });
    },
    async deleteuser(row){
      var url = '/api/baitu-organization-units/organizationUnit/organizationUnitUser?userId='+row.userId+'&organizationUnitId='+this.nowid,
        type = 'delete',
        data = {
          userId: row.userId,
          organizationUnitId: this.nowid,
        };
      let res = await this.$getaxios(url,type,data);
      console.log(res);
      this.$message({
        type: 'info',
        message: '删除成功!',
      });
      this.getinfo(this.nowid);
    },
    //添加用户-添加
    adduser(){
      if (this.nowid == ''){
        alert('请选择一个组织单位');
        return false;
      }
      this.$refs.adduser.getuserlist(this.nowid,1);
    },
    
    handleNodeClick(data) {
      this.skipCount = 0;
      console.log(data);
      this.nowid = data.id;
      this.getinfo(this.nowid);
    },
    async getpage(){
      var url = '/api/baitu-organization-units/organizationUnit',
        type = 'get',
        data = {

        };
      let res = await this.$getaxios(url,type,data);
      if (res){
        console.log(res);
        var arr = res;
        this.data = this.setTreeData(arr);
      }
    },
    //树形结构整理
    setTreeData(arr) {
      // 删除所有的children,以防止多次调用
      arr.forEach(function(item) {
        item['check'] = false;
        delete item.children;
      });
      let map = {}; //构建map
      arr.forEach(i => {
        map[i.id] = i; //构建以id为键 当前数据为值
      });
      let treeData = [];
      arr.forEach(child => {
        const mapItem = map[child.parentId]; //判断当前数据的parentId是否存在map中
        if (mapItem) {
          //存在则表示当前数据不是最顶层的数据
          //注意： 这里的map中的数据是引用了arr的它的指向还是arr,当mapItem改变时arr也会改变，踩坑点
          (mapItem.children || (mapItem.children = [])).push(child); //这里判断mapItem中是否存在child
        } else {
          //不存在则是顶层数据
          treeData.push(child);
        }
      });
      console.log(treeData,'treeData');
      treeData.forEach(item => {
        item['check'] = true;
        this.defaultShowNodes.push(item.id);
      });
      return treeData;
    },
    async getinfo(id){
      var url = '/api/baitu-organization-units/organizationUnit/users?maxResultCount='+this.maxResultCount+'&skipCount='+this.skipCount+'&organizationUnitId='+id,
        type = 'get',
        data = {
        };
      let res = await this.$getaxios(url,type,data);
      if (res){
        console.log(res);
        this.tableData = res.items;
        this.totalCount = res.totalCount;
      }
    },
  },
  mounted(){
    this.getpage();
    this.getinfo('');
  },
};
</script>

<style lang="scss" scoped src="./index.scss" />
<style>
#organiza .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
  background-color: #ebf8f7;
}
</style>
