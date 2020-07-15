<template>
  <div id="invitepeople">
    <div class="invitetit">
      <i class="el-icon-back back" />
      <span>邀请成员</span>
      <i class="el-icon-close close" />
    </div>
    <div class="allinvitecont">
      <div class="invitecont">
        <div class="invitecontlt">
          <el-radio v-model="radio">管理者</el-radio>
        </div>
        <div class="invitecontrt">
          <span>创建、编辑、删除项目</span>
          <span>发起、审批流程</span>
          <span>管理项目成员</span>
        </div>
      </div>
      <div class="invitecont">
        <div class="invitecontlt">
          <el-radio v-model="radio">编辑者</el-radio>
        </div>
        <div class="invitecontrt">
          <span>编辑项目</span>
          <span>发起、审批流程</span>
        </div>
      </div>
      <div class="invitecont">
        <div class="invitecontlt">
          <el-radio v-model="radio">查看者</el-radio>
        </div>
        <div class="invitecontrt">
          <span>查看项目</span>
          <span>查看流程</span>
        </div>
      </div>
    </div>
    <div class="invitebtn">
      <span>生成链接</span>
    </div>
    <div class="inviteor">
      <i>1</i>
      <span>或</span>
    </div>
    <div class="inviteteam">
      <span>从团队中邀请</span>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      radio: false,
    };
  },
};
</script>

<style lang="scss" scoped src="./index.scss" />