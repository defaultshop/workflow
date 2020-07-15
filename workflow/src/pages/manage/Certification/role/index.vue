<template>
  <div id="role">
    <comhead headindex="21" />

    <div class="rolecont">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column fixed="left" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="jurisdiction(scope.row)" type="text" size="small">权限</el-button>
            <el-button @click="deleteclick(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="用户名称" width="180" />
        <el-table-column prop="email" label="邮箱地址" width="180" />
        <el-table-column prop="phoneNumber" label="手机号" />
        
      </el-table>

      <div class="page" v-if="totalCount>maxResultCount">
        <el-pagination background layout="prev, pager, next" :total="totalCount" />
      </div>
    </div>
    <el-dialog title="编辑" :visible.sync="centerDialogVisible" width="60%" center>
      <div class="roleboxtab">
        <div :style="{backgroundColor:boxtab === 1 ? '#fff' : '',color:boxtab === 1 ? '#5472d4' : ''}" @click="changeboxtab(1)">用户信息</div>
        <div :style="{backgroundColor:boxtab === 2 ? '#fff' : '',color:boxtab === 2 ? '#5472d4' : ''}" @click="changeboxtab(2)">角色</div>
      </div>
      <div class="roleboxcont" v-show="boxtab === 1">
        <div class="usertit">用户名*</div>
        <div class="userint">
          <input type="text" v-model="userName">
        </div>
        <div class="usertit">名</div>
        <div class="userint">
          <input type="text" v-model="name">
        </div>
        <div class="usertit">姓</div>
        <div class="userint">
          <input type="text" v-model="surname">
        </div>
        <div class="usertit">邮箱地址*</div>
        <div class="userint">
          <input type="text" v-model="email">
        </div>
        <div class="usertit">手机号码</div>
        <div class="userint">
          <input type="text" v-model="phoneNumber">
        </div>
        <div class="usercheck">
          <el-checkbox v-model="lockoutEnabled">登录尝试失败后锁定帐户</el-checkbox>
        </div>
        <div class="usercheck">
          <el-checkbox v-model="twoFactorEnabled">双因素验证</el-checkbox>
        </div>
      </div>
      <div class="roleboxcont" v-show="boxtab === 2">
        <div class="usercheck" v-for="(li,index) in rolelist" :key="index">
          <el-checkbox v-model="li.isStatic">{{ li.name }}</el-checkbox>
        </div>
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
      userName: '',
      name: '',
      surname: '',
      email: '',
      phoneNumber: '',
      lockoutEnabled: false,
      twoFactorEnabled: false,
      boxtab: 1,
      rolelist: [],
      userinfo: '',
      roleNames: [],
      limits: false,
      checked: false,
      groups: [],
      defaultProps:{
        children: 'children',
        label: 'name',
      },
      limitab: 0,
      maxResultCount:10,
    };
  },
  methods:{
    changeboxtab(type){
      this.boxtab = type;
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
    //权限-保存
    savelimit(){
      this.$nextTick(()=>{
        // console.log(this.$refs.tree[0].getCheckedNodes(),'res');
        for (var i=0;i<this.groups.length;i++){
          this.$refs.tree[i].setCheckedNodes(this.groups[i].permissions);
        }
      });
      
    },
    async deleteclick(row){
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        (async() => {
          var url = '/api/identity/users/'+row.id,
            type = 'delete',
            data = {};
          let res = await this.$getaxios(url,type,data);
          console.log(res);
          this.getinfo();
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
        })();
        
        
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        });           
      });
    },
    //权限
    async jurisdiction(row){
      console.log(row);
      var url = '/api/abp/permissions?providerKey='+row.id+'&providerName=U',
        type = 'get',
        data = {};
      let res = await this.$getaxios(url,type,data);
      console.log(res,'权限');
      for (var i=0;i<res.groups.length;i++){
        res.groups[i].permissions = this.setTreeData(res.groups[i].permissions);
      }
      this.groups = res.groups;
      console.log(res.groups,'arr');
      this.limits = true;
    },
    //树形结构整理
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
    //编辑-保存
    async savesureinfo(){
      for (var i=0;i<this.rolelist.length;i++){
        if (this.rolelist[i].isStatic == true){
          this.roleNames.push(this.rolelist[i].name);
        }
      }
      console.log(this.roleNames);
      var url = '/api/identity/users/'+this.userinfo.id,
        type = 'put',
        data = {
          concurrencyStamp: this.userinfo.concurrencyStamp,
          email: this.email,
          emailConfirmed: this.userinfo.emailConfirmed,
          extraProperties: this.userinfo.extraProperties,
          isLockedOut: false,
          lockoutEnabled: this.userinfo.lockoutEnabled,
          name: this.name,
          phoneNumber: this.phoneNumber,
          phoneNumberConfirmed: this.userinfo.phoneNumberConfirmed,
          roleNames: this.roleNames,
          surname: this.surname,
          tenantId: this.userinfo.tenantId,
          twoFactorEnabled: this.twoFactorEnabled,
          userName: this.userName,
        };
      let res = await this.$getaxios(url,type,data);
      this.centerDialogVisible = false;
      if (res){
        this.$message('修改成功');
        this.getinfo();
      }
    },
    //编辑
    async handleClick(row) {
      console.log(row);
      var url = '/api/identity/users/'+row.id,
        type = 'get',
        data = {};
      var url2 = 'api/identity/users/'+row.id+'/roles',
        type2 = 'get',
        data2 = {};
      let user = await this.$getaxios(url,type,data);
      let role = await this.$getaxios(url2,type2,data2);
      this.rolelist = role.items;
      this.userinfo = user;
      this.userName = user.userName;
      this.name = user.name;
      this.surname = user.surname;
      this.email = user.email;
      this.phoneNumber = user.phoneNumber;
      this.lockoutEnabled = user.lockoutEnabled;
      this.twoFactorEnabled = user.twoFactorEnabled;
      this.centerDialogVisible = true;
    },
    async getinfo(){
      var url = '/api/identity/users?maxResultCount=10&skipCount=0',
        type = 'get',
        data = {
          orting: 'userName asc',
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

<style lang="scss" scoped src="./index.scss" ></style>
<style>
#role .el-table__body-wrapper{
    min-height: 300px;
}
</style>