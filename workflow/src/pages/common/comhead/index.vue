<template>
  <div id="comhead">

    <div class="comheadleft">
      <div style="display:inline-block;cursor: pointer;" @click.stop="changecomheadbox">
        <i class="iconfont iconyingyong lefticon" />
        <span class="lefttext" v-if="this.headindex != 4">工作台</span>
        <span class="lefttext" v-if="this.headindex == 4">通讯录</span>
      </div>

      <div class="comheadbox" v-show="boxtype">
        <div class="myname">
          <span v-if="userinfo.currentUser.userName">{{ userinfo.currentUser.userName }}</span>
          <span v-else>---</span>
          <span @click.stop="$router.push({path:'/login'}).catch(data => {})">
            <i class="el-icon-refresh" />
            切换团队
          </span>
        </div>
        <div class="allwork">
          <div class="work" @click.stop="$router.push('/')">
            <b>
              <i class="iconfont icongongzuotai" />
            </b>
            <span>工作台</span>
          </div>
          <div class="work" @click.stop="$router.push('/home/maillist')">
            <b class="mail">
              <i class="iconfont icontongxunlu" />
            </b>
            <span>通讯录</span>
          </div>
        </div>
      </div>
    </div>

    <div class="alltab" v-if="this.headindex == 4">
      <div class="eachtab">
        <span :style="{borderBottom:tabindex == 4 ? '3px solid #3671FF' : '',color:tabindex == 4 ? '#3671FF' : '' }" @click="changetab(4)">通讯录</span>
      </div>
    </div>
    <div class="alltab" v-if="this.headindex != 4">
      <div class="eachtab">
        <router-link to="/">
          <span :style="{borderBottom:tabindex == 1 ? '3px solid #3671FF' : '',color:tabindex == 1 ? '#3671FF' : '' }" @click="changetab(1)">首页</span>
        </router-link>
      </div>
      <div class="eachtab">
        <router-link to="/home/mytask">
          <span :style="{borderBottom:tabindex == 25 ? '3px solid #3671FF' : '',color:tabindex == 25 ? '#3671FF' : '' }" @click="changetab(2)">业务管理</span>
        </router-link>
      </div>
      <div class="eachtab">
        <router-link to="/streamingevents/event">
          <span :style="{borderBottom:tabindex == '5-1' ? '3px solid #3671FF' : '',color:tabindex == '5-1' ? '#3671FF' : '' }" @click="changetab(3)">流事件</span>
        </router-link>
      </div>
      <div class="eachtab">
        <router-link to="/administrators">
          <span :style="{borderBottom:tabindex == '66' ? '3px solid #3671FF' : '',color:tabindex == '66' ? '#3671FF' : '' }" @click="changetab(4)">管理员</span>
        </router-link>
      </div>
    </div>
    


    <!-- <el-menu :default-active="activeIndex" v-if="tabindex != 4" class="el-menu-demo" style="display:inline-block;position:relative;z-index:9" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">
        首页
      </el-menu-item>
      <el-submenu index="210">
        <template slot="title">管理</template>
        <el-submenu index="2-1">
          <template slot="title">身份认证管理</template>
          <el-menu-item index="2-1-1">
            角色
          </el-menu-item>
          <el-menu-item index="2-1-2">
            用户
          </el-menu-item>
        </el-submenu>
        <el-submenu index="2-2">
          <template slot="title">租户管理</template>
          <el-menu-item index="2-2-1">
            租户
          </el-menu-item>
        </el-submenu>
        
      </el-submenu>
      <el-menu-item index="25">业务管理</el-menu-item>
      <el-menu-item index="24">组织单元</el-menu-item>
      <el-menu-item index="5-1">流事件</el-menu-item>
      <el-menu-item index="6-1">管理员</el-menu-item>
    </el-menu> -->

    

    <div class="comheadright">
      <div class="goapp" v-if="tabindex == 25">
        <router-link to="/management">
          <span>进入应用管理</span>
        </router-link>
      </div>
      <div class="goapp" v-if="tabindex == 3">
        <router-link to="/home/mytask">
          <span>进入业务管理</span>
        </router-link>
      </div>
      <span class="help">帮助</span>
      <i class="el-icon-bell" />
      <img src="../../../assets/img/peo.png" alt="">
      <span v-if="userinfo.currentUser.userName">{{ userinfo.currentUser.userName }}</span>
      <span class="log" @click="gologin" v-else>请登录</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'comhead',
  data() {
    return {
      tabindex: 1,
      headtype: 1,
      boxtype: false,
      activeIndex: '-1',
      userinfo: {currentUser:{userName:''}},
    };
  },
  props: ['headindex','head'],
  methods: {
    headhide(){
      this.boxtype = false;
    },
    gologin(){
      this.$router.push('/login');
    },
    changetab(index) {
      this.tabindex = index;
    },
    changecomheadbox(){
      if (this.boxtype === false) {
        this.boxtype = true;
      } else {
        this.boxtype = false;
      }
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.activeIndex = key;
      if (key == 1){
        this.$router.push('/');
      } else if (key == '2-1-1'){
        this.$router.push('/manage/user');
      } else if (key == '2-1-2'){
        this.$router.push('/manage/role');
      } else if (key == '2-2-1'){
        this.$router.push('/manage/tenant');
      } else if (key == 25){
        this.$router.push('/home/mytask');
      } else if (key == 24){
        this.$router.push('/organizational');
      } else if (key == '5-1'){
        this.$router.push('/streamingevents/event');
      } else if (key == '66'){
        this.$router.push('/administrators');
      }
    },
  },
  mounted() {
    if (localStorage.getItem('userinfo')){
      this.userinfo = JSON.parse(localStorage.getItem('userinfo'));
    }
    
    
    this.activeIndex = this.headindex;
    console.log(this.activeIndex,this.headindex,this.head,'this.activeIndex');
  },
  created(){
    this.tabindex = this.headindex;
  },
};
</script>

<style lang="scss" scoped src="./index.scss" />