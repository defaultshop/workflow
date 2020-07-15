<template>
  <div id="invitemember" v-if="vistype" :style="{opacity: vis === true ? 1 : 0}">
    <div class="boxsha" @click="closebtn">1</div>
    <div class="invitemain" :style="{transform: vis == true ? 'scale(1)' : 'scale(0.8)'}">
      <div class="invitetit">
        <span>邀请成员</span>
        <i class="iconfont iconcuowu" @click="closebtn" />
      </div>
      <div class="invitecont">
        <div class="invitecont-tab">
          <div
            :style="{color:tabindex == 1 ? '#3671FF':'',borderBottom:tabindex == 1 ? '3px solid #3671FF':''}"
            @click="changetab(1)"
          >手动添加成员</div>
          <div 
            :style="{color:tabindex == 2 ? '#3671FF':'',borderBottom:tabindex == 2 ? '3px solid #3671FF':''}"
            @click="changetab(2)"
          >批量导入成员</div>
          <div
            :style="{color:tabindex == 3 ? '#3671FF':'',borderBottom:tabindex == 3 ? '3px solid #3671FF':''}"
            @click="changetab(3)"
          >公开链接邀请</div>
        </div>
        <div class="invitecont-form">
          <div class="formtip">
            <li>成员加入时无法更改您输入的内容，请输入正确的信息</li>
            <li>按输入的联系方式发送邀请；同时输入手机和邮箱，只发送手机邀请</li>
          </div>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="ruleForm.name" placeholder="必填，最长80字符"/>
            </el-form-item>
            <el-form-item label="*账号">
              <el-input v-model="ruleForm.userName" placeholder="请输入账号"/>
            </el-form-item>
            <el-form-item label="*密码">
              <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码"/>
            </el-form-item>
            <el-form-item label="*手机">
              <el-input v-model="ruleForm.phoneNumber" placeholder="手机和邮箱必填一项"/>
            </el-form-item>
            <el-form-item label="*邮箱">
              <el-input v-model="ruleForm.email" placeholder="手机和邮箱必填一项"/>
            </el-form-item>

            <el-form-item label="部门" prop="desc">
              <div class="adduser" @click="choosemember">
                <div class="eachname" v-for="(li,index) in memberlist" :key="index">
                  <span class="namel">
                    <i class="iconfont iconzuzhi" />
                  </span>
                  <span class="namer">{{ li.displayName }}</span>
                </div>
                <div class="choose" v-if="memberlist.length == 0">+ 点击选择部门</div>
              </div>
            </el-form-item>

          </el-form>

          <div class="invitebtn">
            <div @click="invitebtn">邀请</div>
            <div @click="empty">清空</div>
          </div>
        </div>
      </div>
    </div>
    <popup ref="popup" @memberdata="getmemberdata" />
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
      tabindex: 1,
      vis: false,
      vistype: false,
      ruleForm:{
        name: '',
        userName: '',
        password: '',
        email: '',
        phoneNumber: '',
      },
      rules:{
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 1, max: 80, message: '必填，最长80字符', trigger: 'blur' },
        ],
      },
      memberlist: [],
    };  
  },
  methods:{
    //清空
    empty(){
      this.emptydata();
    },
    emptydata(){
      this.ruleForm.name = '';
      this.ruleForm.userName = '';
      this.ruleForm.password = '';
      this.ruleForm.email = '';
      this.ruleForm.phoneNumber = '';
      this.memberlist = [];
    },
    //邀请
    invitebtn(){
      if (this.ruleForm.name == '' || this.ruleForm.name == ' '){
        this.$message('请输入姓名');
        return false;
      }
      if (this.ruleForm.userName == '' || this.ruleForm.userName == ' '){
        this.$message('请输入账号');
        return false;
      }
      if (this.ruleForm.password == '' || this.ruleForm.password == ' '){
        this.$message('请输入密码');
        return false;
      }
      if (this.ruleForm.phoneNumber == '' || this.ruleForm.phoneNumber == ' '){
        this.$message('请输入手机号');
        return false;
      }
      if (this.ruleForm.email == '' || this.ruleForm.email == ' '){
        this.$message('请输入邮箱');
        return false;
      }
      if (this.memberlist.length == 0){
        this.$message('请选择部门');
        return false;
      }
      let memberids = [];
      this.memberlist.forEach(item=>{
        memberids.push(item.id);
      });
      this.$confirm('确定邀请吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info',
      }).then(() => {
        (async()=>{
          var url = '/api/identity/users/toFull',
            type = 'post',
            data = {
              organizationUnitIds: memberids,
              password: this.ruleForm.password,
              userName: this.ruleForm.userName,
              userRealName: this.ruleForm.name,
              email: this.ruleForm.email,     
              phoneNumber: this.ruleForm.phoneNumber,                       
            };
          let res = await this.$getaxios(url,type,data);
          console.log(res);
          this.$message({
            type: 'success',
            message: '已发送邀请!',
          });
          this.$emit('backdata');
          this.closebtn();
        })();
      }).catch(() => {       
      });
    },
    //选择部门
    choosemember(){
      this.$refs.popup.getinfo('',1,this.memberlist);
    },
    //选择部门-返回数据
    getmemberdata(data){
      console.log(data,'getmemberdata');
      this.memberlist = data;
    },
    //取消
    closebtn(){
      this.emptydata();
      this.vis = false;
      setTimeout(()=>{
        this.vistype = false;
      },200);
    },
    //开启
    displaybox(){
      this.vistype = true;
      setTimeout(()=>{
        this.vis = true;
      },10);
    },
    //切换
    changetab(type){
      this.tabindex = type;
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss">

</style>
<style lang="scss">
#invitemember label{
  margin-bottom: 0;
}
</style>