<template>
  <div id="management">
    <comhead headindex="3" />

    <div class="agencytask">
      <el-container style="height: 100%; border: 1px solid #eee">
        <managleft />
        
        <el-container>
          <el-header style="text-align: left">
            <div class="agencyhead">
              <div class="lefts">
                <span>全部</span>
              </div>
              <div class="rights">
                <div class="int">
                  <i class="el-icon-search" />
                  <input type="text" placeholder="搜索">
                </div>
                <span class="del">删除</span>
                <span class="cancel">取消</span>
              </div>
            </div>
          </el-header>
          
          <el-main>
            <div class="alllist">
              <div class="eachlist">
                <div>
                  <el-checkbox v-model="checked" />
                </div>
                <div>成员姓名</div>
                <div>成员账号</div>
                <div>邀请人</div>
                <div>权限</div>
              </div>
              <div class="eachlist" v-for="li in 4" :key="li">
                <div>
                  <el-checkbox v-model="checked" />
                </div>
                <div>
                  <img src="../../../assets/img/peo.png" alt="">
                  <span>用户1</span>
                </div>
                <div>zhangsan</div>
                <div>张三</div>
                <div>
                  <span>超级管理员</span>
                  <i class="el-icon-s-tools" @click="changetype" />
                </div>
              </div>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
    <memberbox ref="member" />
  </div>
</template>

<script>
import comhead from '../../common/comhead/index.vue';
import managleft from './left/index.vue';
import memberbox from './memberbox/index.vue';
export default {
  components:{
    comhead,
    managleft,
    memberbox,
  },
  data() {
    return {
      checked: false,
      showtypes: false,
    };
  },
  methods: {
    changetype() {
      this.$refs.member.changetype();
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss" />