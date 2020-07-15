<template>
  <div>
    <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
      <div class="roledetail">
        <div class="roletitle">
          <div class="roletitlelt">
            <div class="surname">{{ roledetail.userRealName.substring(0,1) }}</div>
            <div class="fullname">
              <div>{{ roledetail.userRealName }}</div>
              <div>
                <span>已加入</span>
              </div>
            </div> 
          </div>
          <div class="roletitlert">
            <i class="el-icon-close" @click="drawer = false" />
          </div>
        </div>
        <div class="detailmain">
          <div class="eachdetailint">
            <div class="intit">姓名*</div>
            <div class="inttext">
              <input type="text" v-model="roledetail.userRealName">
            </div>
          </div>
          <div class="eachdetailint">
            <div class="intit">账号*</div>
            <div class="inttext">
              <input type="text" v-model="roledetail.userName">
            </div>
          </div>
          <div class="eachdetailint">
            <div class="intit">手机*</div>
            <div class="inttext">
              <!-- <input type="text" v-model="roledetail.phoneNumber" readonly> -->
              <span>{{ roledetail.phoneNumber }}</span>
            </div>
            <div class="tips">手机已验证，您无法修改。如需修改请联系成员在个人设置页面重新绑定。</div>
          </div>
          <div class="eachdetailint">
            <div class="intit">邮箱*</div>
            <div class="inttext">
              <!-- <input type="text" v-model="roledetail.email" readonly> -->
              <span>{{ roledetail.email }}</span>
            </div>
          </div>
          <div class="eachdetailint">
            <div class="intit">部门</div>
            <div class="adduser" @click="choosemember">
              <div class="eachname" v-for="(li,index) in roledetail.organizationUnits" :key="index">
                <span class="namel">
                  <i class="iconfont iconzuzhi" />
                </span>
                <span class="namer">{{ li.displayName }}</span>
              </div>
              <div class="choose" v-if="roledetail.organizationUnits.length == 0">+ 点击选择部门</div>
            </div>
          </div>
          <div class="eachdetailint">
            <div class="intit">角色</div>
            <div class="adduser" @click="chooseroles">
              <div class="eachname" v-for="(li,index) in roledetail.roles" :key="index">
                <span class="namel" style="background-color:#0DB3A6">
                  <i class="iconfont iconwode" />
                </span>
                <span class="namer">{{ li.name }}</span>
              </div>
              <div class="choose" v-if="roledetail.roles.length == 0">+ 点击选择角色</div>
            </div>
          </div>

          <div class="eachdetailbtn">
            <div class="change" @click="changerole">修改</div>
            <div class="del" @click="deleteclick">删除</div>
          </div>
        </div>
      </div>
    </el-drawer>
    <popup ref="popup" @memberdata="getmemberdata" @rolesdata="getrolesdata" />
  </div>
</template>

<script>
import popup from '../popup/popup.vue';
export default {
  components:{
    popup,
  },
  data(){
    return {
      drawer: false,
      list: '',
      id: '',
      roledetail: {userRealName:'',userName:'',phoneNumber:'',email:'',organizationUnits:[],roles:[]},
    };
  },
  methods:{
    //删除用户
    deleteclick(){
      this.$confirm('是否确认删除？', '删除用户', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        console.log(this.id,'row');
        this.deleteuser(this.id);
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
      this.roledetail = {userRealName:'',userName:'',phoneNumber:'',email:'',organizationUnits:[],roles:[]};
      this.drawer = false;
      this.$emit('backdata');
    },
    //修改
    async changerole(){
      let url = '/api/identity/users/UserDetail/'+this.id,
        type = 'post',
        data = this.roledetail;
      let res = await this.$getaxios(url,type,data);
      console.log(res);
      this.$message('修改成功');
      this.roledetail = {userRealName:'',userName:'',phoneNumber:'',email:'',organizationUnits:[],roles:[]};
      this.drawer = false;
      this.$emit('backdata');
    },
    //选择部门
    choosemember(){
      let roleslist = [].concat(this.roledetail.organizationUnits);
      roleslist.forEach(item=>{
        item.type = 1;
      });
      this.$refs.popup.getinfo('',1,roleslist);
    },
    //选择角色
    chooseroles(){
      let roleslist = [].concat(this.roledetail.roles);
      roleslist.forEach(item=>{
        item.type = 2;
        item.displayName = item.name;
      });
      this.$refs.popup.getinfo('',2,roleslist);
    },
    //打开修改
    openroledetail(list){
      this.list = list;
      this.getdetail(list.userId);
      this.drawer = true;
    },
    //用户详情
    async getdetail(id){
      this.id = id;
      let url = '/api/identity/users/UserDetail/'+id,
        type = 'get',
        data = {
        };
      let res = await this.$getaxios(url,type,data);
      console.log(res);
      if (res){
        this.roledetail = res;
      }
    },
    //获取部门列表
    getmemberdata(data){
      this.roledetail.organizationUnits = data;
    },
    //获取角色列表
    getrolesdata(data){
      let list = data;
      list.forEach(item=>{
        item.name = item.displayName;
        delete item.displayName;
        delete item.type;
      });
      this.roledetail.roles = list;
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss">

</style>