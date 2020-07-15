<template>
  <div id="maillist">
    <comhead headindex="4" />

    <div class="mailcont">
      <el-container style="height: 100%; border: 1px solid #eee">
        <appleft :lefttype="1" @transmitinfo="getinfo" @showallpart="showallpart" @departmentclick="choosedepartment"/>
          
        <el-container>
              
          <el-main>
            <div class="maillistcont">
              <div class="mailcontit">
                <div>{{ currentdata.displayName }}</div>
                <!-- <div @click="editpart">编辑</div> -->
                <!-- <div @click="editprat">编辑</div> -->
              </div>
              <!-- <div class="mailcontroute">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                  <el-breadcrumb-item style="color:#3671FF">机构名称</el-breadcrumb-item>
                  <el-breadcrumb-item>{{ currentdata.displayName }}</el-breadcrumb-item>
                </el-breadcrumb>
              </div> -->

              <div class="sondepart departpeo">
                <!-- <div class="sondepartit">
                  <i class="iconfont iconrenyuan" />
                  <span>部门人员</span>
                </div> -->
                <div class="addsondepart">
                  <!-- <span style="background-color:#3671FF;color:#fff" @click="addeditor">添加成员</span> -->
                  <div class="addsondepartbtn">
                    <span class="invite" @click="adduser">邀请成员</span>
                    <span @click="changedepartment">调整部门</span>
                    <span @click="deleteclickall">批量删除</span>
                  </div>
                  <div class="addsondepartint">
                    <i class="iconfont iconsousuo" />
                    <input type="text" v-model="Filter" @keyup.13="submitenter" placeholder="搜索成员">
                    <i class="iconfont iconcuowu closeint" v-if="Filter" @click="delFilter" />
                  </div>
                </div>
                
                <div class="alldepartpeoborder">
                  <el-table
                    :data="tableData"
                    size="mini"
                    @row-click="changerole"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                  >
                    <el-table-column
                      type="selection"
                      width="55"
                    />
                    <el-table-column
                      prop="userName"
                      align="center"
                      width="190"
                    >
                      <template slot="header"> 
                        <span>账号</span>
                        <el-tooltip class="item" effect="light" content="未验证手机无法收到验证码，请及时验证" placement="top">
                          <el-button class="tips">
                            <i class="el-icon-question" />
                          </el-button>
                        </el-tooltip>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="userRealName"
                      align="center"
                      label="真实姓名"
                      width="140"
                    />
                    <el-table-column
                      prop="phoneNumber"
                      align="left"
                      label="手机号码"
                      width="140"
                    />
                    <el-table-column
                      label="角色"
                      align="left"
                    >
                      <template slot-scope="scope">
                        <span>{{ scope.row.roles[0] }}</span>
                        <el-tooltip class="item" effect="light" v-if="scope.row.roles.length>1" :content="scope.row.rolesdesc" placement="bottom">
                          <el-button class="tips">
                            <i class="el-icon-more" />
                          </el-button>
                        </el-tooltip>
                      </template>
                    </el-table-column>
                    <el-table-column
                      fixed="right"
                      label="操作"
                      width="100"
                    >
                      <template slot-scope="scope">
                        <el-button @click.stop="deleteclick(scope.row)" type="text" size="small">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>

                <div class="page" v-if="totalCount>maxResultCount">
                  <el-pagination  background layout="prev, pager, next" :total="totalCount" />
                </div>
              </div>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
    
    <selectdepartment ref="selectdepart" />
    <popup ref="popup" @backdata="departmentdata" />
    <invitemember ref="invitemember" @backdata="departmentdata" />
    <roledetail ref="roledetail"  @backdata="departmentdata" />
  </div>
</template>

<script>
import comhead from '../../common/comhead/index.vue';
import appleft from './left/index.vue';
import popup from './popup/popup.vue';
// import editor from './editor/index.vue';//添加成员
import selectdepartment from './selectdepartment';
import invitemember from './invitemember';
import roledetail from './roledetail';
export default {
  name: 'home',
  components: {
    comhead,
    appleft,
    selectdepartment,
    popup,
    invitemember,
    roledetail,
  },
  data() {
    return {
      checked: false,
      value: false,
      currentdata: {displayName:''},
      maxResultCount: 10,
      skipCount: 0,  
      tableData: [],
      nowid: '',
      totalCount: 0,
      checklist: [],
      Filter: '',
    };
  },
  methods:{
    //修改成员
    changerole(row){
      console.log(row);
      this.$refs.roledetail.openroledetail(row);
    },
    //搜索删除
    delFilter(){
      this.Filter = '';
      this.getinfo(this.currentdata);
    },
    //搜索确定
    submitenter(){
      this.getinfo(this.currentdata);
    },
    //刷新数据
    departmentdata(){
      this.getinfo(this.currentdata);
    },
    //选中触发
    handleSelectionChange(li){
      console.log(li);
      this.checklist = li;
    },
    //调整部门
    changedepartment(){
      console.log(this.tableData,'tableData');
      let userid = [];
      this.checklist.forEach(item=>{
        userid.push(item.userId);
      });
      if (userid.length == 0){
        this.$message('请选择部门人员');
        return false;
      }
      this.$refs.popup.getinfo(userid,1);
    },
    //添加成员
    adduser(){
      this.$refs.invitemember.displaybox();
      // this.$refs.adduser.getuserlist(this.currentdata,2);
    },
    //批量删除
    deleteclickall(){
      if (this.checklist.length == 0){
        this.$message('请选择成员');
        return false;
      }
      let userids = [];
      this.checklist.forEach(item=>{
        userids.push(item.userId);
      });
      this.$confirm('是否确认删除？', '删除用户', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        console.log(userids,'row');
        this.deleteuser(userids.userId);
      }).catch(() => {         
      });
    },
    //删除用户
    deleteclick(row){
      this.$confirm('是否确认删除？', '删除用户', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        console.log(row.userId,'row');
        this.deleteuser(row.userId);
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除',
        // });          
      });
    },
    async deleteuser(id){
      var url = '/api/identity/users/'+id,
        type = 'delete',
        data = {
        };
      let res = await this.$getaxios(url,type,data);
      console.log(res);
      this.$message({
        type: 'info',
        message: '删除成功!',
      });
      this.getinfo(this.currentdata);
    },
    editprat(){
      this.$refs.editdepartment.openbox();
    },
    editpart(){
      this.$refs.editdepartment.edit();
    },
    //添加成员
    addeditor(){
      this.$refs.editor.openbox();
    },
    choosedepartment(){
      this.$refs.selectdepart.getdefaultinfo();
    },
    //全部成员
    async showallpart(){
      var url = '/api/baitu-organization-units/organizationUnit/readyUsers?maxResultCount=10&skipCount=0',
        type = 'get',
        data = {
        };
      let res = await this.$getaxios(url,type,data);
      if (res){
        console.log(res);
        this.tableData = res.items;
        this.tableData.forEach(item=>{
          item.check = false;
          item.rolesdesc = '';
          item.roles.forEach((lt,ltindex)=>{
            if (ltindex == item.roles.length - 1){
              item.rolesdesc += lt;
            } else {
              item.rolesdesc += lt + ',';
            }
          });
        });
        this.totalCount = res.totalCount;
        this.limits = true;
      }
    },
    //当前部门-成员
    async getinfo(list){
      this.currentdata = list;
      var url = '/api/baitu-organization-units/organizationUnit/users?maxResultCount='
        +this.maxResultCount+'&skipCount='+this.skipCount+'&organizationUnitId='+list.id+'&Filter='+this.Filter,
        type = 'get',
        data = {
        };
      let res = await this.$getaxios(url,type,data);
      if (res){
        console.log(res);
        this.tableData = res.items;
        this.tableData.forEach(item=>{
          item.check = false;
          item.rolesdesc = '';
          item.roles.forEach((lt,ltindex)=>{
            if (ltindex == item.roles.length - 1){
              item.rolesdesc += lt;
            } else {
              item.rolesdesc += lt + ',';
            }
          });
        });
        this.totalCount = res.totalCount;
        this.$forceUpdate();
      }
    },
  },
  mounted(){
  },
};
</script>

<style lang="scss" scoped src="./index.scss" />
<style lang="scss">
.mailcontroute{
    .el-breadcrumb__inner{
        color:#3671FF;
    }
}
html .el-tooltip__popper.is-light{
  box-shadow: 0 0 5px #ccc;
}
.alldepartpeoborder .el-table tr{
  cursor: pointer;
}
</style>