<template>
  <div id="formgublic">
    <div class="formpub">
      <div class="formpubtit">
        <span>公开链接</span>
        <span class="lit">将表单发布成公开链接，无需登录即可填写表单</span>
      </div>
      <div class="formpubswitch">
        <el-switch v-model="value" active-color="#409EFF" inactive-color="#ccc" />
      </div>
      <div class="formaddress">
        <div class="addresstit">链接地址</div>
        <div class="addresscont">
          <div class="addressint">
            <div>
              <input type="text" v-model="address"> 
            </div>
            <div>
              <span>复制</span>
              <span>打开</span>
              <span>+</span>
            </div>
            
          </div>
          <div class="addressext" @click="formextend">
            <span>外链扩展</span>
          </div>
        </div>
      </div>
      <div class="formset">
        <div class="formsettit">填写设置</div>
        <div class="formsetpass">
          <span>凭密码填写</span>
          <el-switch v-model="value" class="check" active-color="#409EFF" inactive-color="#ccc" />
        </div>
      </div>
    </div>
    <div class="formpub formdata">
      <div class="formpubtit">
        <span>数据权限</span>
        <span class="lit">设置对应的「数据权限」，可以让团队成员管理表单搜集到的数据</span>
      </div>
      <div class="formdatadd">
        <span @click="addpermiss">新建权限组</span>
      </div>
      <div class="formgroup">
        <div class="formgroupedit">
          <div class="formgroupeditlt">
            <div>权限组名称</div>
            <div>权限组描述</div>
          </div>
          <div class="formgroupeditrt">
            <span>编辑</span>
            <span>复制</span>
            <span>删除</span>
          </div>
        </div>
        <div class="formgroupchoose">
          <div class="add">
            <span>+</span>
            <span>点击选择成员</span>
          </div>
        </div>
      </div>
      <div class="formgroup">
        <div class="formgroupedit">
          <div class="formgroupeditlt">
            <div>权限组名称</div>
            <div>权限组描述</div>
          </div>
          <div class="formgroupeditrt">
            <span>编辑</span>
            <span>复制</span>
            <span>删除</span>
          </div>
        </div>
        <div class="formgroupchoose">
          <div class="name">
            <div>成员姓名</div>
            <div>
              <span>编辑</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <chainextend ref="member" />
    <addpermission ref="permission" />
  </div>
</template>

<script>
import chainextend from './chainextend/index.vue';
import addpermission from './addpermission/index.vue';
export default {
  components:{
    chainextend,
    addpermission,
  },
  data(){
    return {
      value: false,
      address: 'http://tfs.dev.baitu.com/tfs',
    };
  },
  methods:{
    formextend(){
      this.$refs.member.changetype();
    },
    addpermiss(){
      this.$refs.permission.changetype();
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss" />