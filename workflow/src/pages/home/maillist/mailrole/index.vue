<template>
  <div id="maillist">
    <comhead headindex="4" />

    <div class="mailcont">
      <el-container style="height: 100%; border: 1px solid #eee">
        <appleft :lefttype="2" @roleinfo="getroleinfo"/>
          
        <el-container>
              
          <el-main>
            <div class="maillistcont">
              <div class="mailcontit">
                <div>{{ roleinfo.name }}</div>
              </div>


              <div class="sondepart departpeo">
                <div class="addsondepart">
                  <!-- <span style="background-color:#3671FF;color:#fff" @click="addeditor">添加成员</span> -->
                  <div class="addsondepartbtn">
                    <span @click="addroles">添加成员</span>
                    <span @click="delroles">批量删除</span>
                  </div>
                </div>
                <div class="alldepartpeoborder">
                  <el-table
                    :data="tableData"
                    size="mini"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                  >
                    <el-table-column
                      type="selection"
                      width="55"
                    />
                    <el-table-column
                      prop="userRealName"
                      align="left"
                      width="220"
                      label="真实姓名"
                    />
                    <el-table-column
                      prop="phoneNumber"
                      align="left"
                      label="手机号"
                      width="220"
                    />   
                    <el-table-column
                      label="部门"
                      align="left"
                    >
                      <template slot-scope="scope">
                        <el-tooltip class="item" effect="light" v-if="scope.row.organizationUnitNames.length>0" :content="scope.row.rolesdesc" placement="bottom">
                          <el-button class="tips">
                            <span>{{ scope.row.rolesdesc }}</span>
                          </el-button>
                        </el-tooltip>
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

    <editrole ref="edit" />
    <popup ref="popup" @backdata="getbackdata" />
  </div>
</template>

<script>
import comhead from '../../../common/comhead/index.vue';
import appleft from '../left/index.vue';
import editrole from '../editrole/index.vue';
import popup from '../popup/popup.vue';

export default {
  name: 'home',
  components: {
    comhead,
    appleft,
    editrole,
    popup,
  },
  data() {
    return {
      checked: false,
      value: false,
      tableData: [],
      currentdata:{displayName:'暂无'},
      maxResultCount: 10,
      SkipCount: 0,
      totalCount: 0,
      Filter: '',
      roleinfo: {name:'暂无'},
      checklist: [],
    };
  },
  methods:{
    delroles(){
      console.log(this.checklist);
      if (this.checklist.length == 0){
        this.$message('请选择要删除的对象');
        return false;
      }
      let organizationUnitIds = [];
      this.checklist.forEach(item=>{
        organizationUnitIds.push(item.id);
      });
      this.$confirm('是否确认删除？', '删除用户', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        (async()=>{
          var url = '/api/identity/roles/'+this.roleinfo.id+'/users?UserIds='+organizationUnitIds,
            type = 'delete',
            data = {
              UserIds: organizationUnitIds,
            };
          let res = await this.$getaxios(url,type,data);
          console.log(res);
          this.$message('删除成功');
          this.checklist = [],
          this.getroleinfo(this.roleinfo);
        })();
      }).catch(() => {         
      });
    },
    //选中触发
    handleSelectionChange(list){
      this.checklist = list;
    },
    //添加成员
    addroles(){
      this.$refs.popup.getinfo(this.roleinfo.id,0);
    },
    //添加成员-完成
    getbackdata(){
      this.getroleinfo(this.roleinfo);
    },
    adddepart(){
      this.$refs.edit.openbox();
    },
    //当前角色-用户
    async getroleinfo(li){
      console.log(li,'role');
      this.roleinfo = li;
      var url = '/api/identity/users/by-role?RoleId='+li.id
        +'&Filter='+this.Filter
        +'&SkipCount='+this.SkipCount
        +'&MaxResultCount='+this.maxResultCount,
        type = 'get',
        data = {
          // RoleId: li.id,
          // Filter: this.Filter,
          // SkipCount: this.SkipCount,
          // MaxResultCount: this.maxResultCount,
        };
      let res = await this.$getaxios(url,type,data);
      console.log(res);
      if (res){
        this.tableData = res.items;
        this.tableData.forEach(item=>{
          item.rolesdesc = '';
          item.organizationUnitNames.forEach((lt,ltindex)=>{
            if (ltindex == item.organizationUnitNames.length - 1){
              item.rolesdesc += lt;
            } else {
              item.rolesdesc += lt + ',';
            }
          });
        });
        this.totalCount = res.totalCount;
      }
    },
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
</style>