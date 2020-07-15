<template>
  <div id="management">
    <comhead headindex="3" />

    <div class="agencytask">
      <el-container style="height: 100%; border: 1px solid #eee">
        <managleft />
        
        <el-container>
          
          <el-main>
            <div class="addform" v-show="false">
              <div>新建流程表单</div>
              <div>创建有审核流程或处理流程的业务表单</div>
            </div>
            <invitepeople v-show="false" />
            <chooseproject v-show="false" />
            <invitecolleagues v-show="false" />
            <invitelink />
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
import comhead from '../../common/comhead/index.vue';
import managleft from '../managleft/index.vue';
import invitepeople from './invitepeople/index.vue';
import chooseproject from './chooseproject/index.vue';
import invitecolleagues from './invitecolleagues/index.vue';
import invitelink from './invitelink/index.vue';
export default {
  components:{
    comhead,
    managleft,
    invitepeople,
    chooseproject,
    invitecolleagues,
    invitelink,
  },
};
</script>

<style lang="scss" scoped src="./index.scss" />