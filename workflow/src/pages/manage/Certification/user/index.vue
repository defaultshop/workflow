<template>
  <div id="user">
    <comhead headindex="21" />

    <div class="rolecont">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column fixed="left" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="jurisdiction(scope.row)" type="text" size="small">权限</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="角色名称">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
            <span v-if="scope.row.isDefault == true" class="public">默认</span>
            <span v-if="scope.row.isPublic == true" class="stctic">公开</span>
          </template>
        </el-table-column>
      </el-table>

      <div class="page" v-if="totalCount>maxResultCount">
        <el-pagination background layout="prev, pager, next" :total="totalCount" />
      </div>
    </div>

    <el-dialog title="编辑" :visible.sync="centerDialogVisible" width="60%" center>
      <div class="usertit">角色名称*</div>
      <div class="userint">
        <input type="text" v-model="username" readonly>
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

    <el-dialog title="权限" :visible.sync="limits" width="60%" center>
      <div class="limittit">
        <el-checkbox v-model="checked">授予所有权限</el-checkbox>
      </div>
      <div class="alllimit">
        <div class="limitleft">
          <div v-for="(li,index) in groups" :key="index" :style="{backgroundColor:limitab == index ? '#5472d4' : '',color:limitab == index ? '#fff' : ''}" @click="changelimitab(index)">{{ li.displayName }}</div>
        </div>
        <div class="limitright">
          <div v-for="(item,itindex) in groups" :key="itindex" v-show="limitab == itindex">
            <el-tree :data="item.permissions" show-checkbox default-expand-all node-key="name" @check-change="handleCheckChange(itindex)" :aa="'tree' + itindex" ref="tree" highlight-current :props="defaultProps" />
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="savelimit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import comhead from '../../../common/comhead';
export default {
  components:{
    comhead,
  },
  data(){
    return {
      tableData: [],
      page: 1,
      totalCount: 1,
      centerDialogVisible: false,
      username:'1',
      isDefault: false,
      isPublic: false,
      limits: false,
      checked: false,
      groups: [],
      defaultProps:{
        children: 'children',
        label: 'name',
      },
      limitab: 0,
    };
  },
  methods:{
    handleClick(row) {
      this.centerDialogVisible = true;
      console.log(row);
      this.row = row;
      this.username = row.name;
      this.isDefault = row.isDefault;
      this.isPublic = row.isPublic;
    },
    //权限-列表切换
    changelimitab(index){
      this.limitab = index;
    },
    handleCheckChange(index){
      let res = this.$refs.tree[index].getCheckedNodes();
      let arr = [];
      res.forEach((item) => {
        arr.push(item);
      });
      console.log(arr,'res');
    },
    savelimit(){
      this.$nextTick(()=>{
        // console.log(this.$refs.tree[0].getCheckedNodes(),'res');
        for (var i=0;i<this.groups.length;i++){
          this.$refs.tree[i].setCheckedNodes(this.groups[i].permissions);
        }
      });
    },
    //权限
    async jurisdiction(row){
      console.log(row);
      var url = '/api/abp/permissions?providerKey='+row.id+'&providerName=U',
        type = 'get',
        data = {
          
        };
      let res = await this.$getaxios(url,type,data);
      console.log(res,'权限');
      for (var i=0;i<res.groups.length;i++){
        res.groups[i].permissions = this.setTreeData(res.groups[i].permissions);
      }
      this.groups = res.groups;
      console.log(res.groups,'arr');
      this.limits = true;
    },
    setTreeData(arr) {
      // 删除所有的children,以防止多次调用
      arr.forEach(function(item) {
        delete item.children;
      });
      let map = {}; //构建map
      arr.forEach(i => {
        map[i.name] = i; //构建以id为键 当前数据为值
      });
      let treeData = [];
      arr.forEach(child => {
        const mapItem = map[child.parentName]; //判断当前数据的parentId是否存在map中
        if (mapItem) {
          //存在则表示当前数据不是最顶层的数据
          //注意： 这里的map中的数据是引用了arr的它的指向还是arr,当mapItem改变时arr也会改变，踩坑点
          (mapItem.children || (mapItem.children = [])).push(child); //这里判断mapItem中是否存在child
        } else {
          //不存在则是顶层数据
          treeData.push(child);
        }
      });
      return treeData;
    },
    //保存用户信息
    async savesureinfo(){
      var url = '/api/identity/roles/'+this.row.id,
        type = 'put',
        data = {
          concurrencyStamp: this.row.concurrencyStamp,
          name: this.username,
          isDefault: this.isDefault,
          isPublic: this.isPublic,
        };
      let info = await this.$getaxios(url,type,data);
      console.log(info);
      if (info){
        this.$message('修改成功');
      }
      this.centerDialogVisible = false;
      this.getinfo();
    },
    async getinfo(){
      var url = '/api/identity/roles?skipCount=0&maxResultCount=10&sorting=name asc',
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
#user .el-table__body-wrapper{
    min-height: 300px;
}
</style>