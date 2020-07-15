<template>
  <div>
    <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false" size="50%">
      <div class="editrole">
        <div class="editroletit">
          <div>{{ title }}角色组</div>
        </div>
        <div class="editrolecont">
          <div class="eacheditrolecont clear">
            <div class="editname">*角色名称:</div>
            <div class="editint">
              <input type="text" v-model="username" placeholder="请输入角色名称">
            </div>
          </div>
          <div class="eacheditrolecont">
            <el-checkbox v-model="isDefault">默认</el-checkbox>
          </div>
          <div class="eacheditrolecont">
            <el-checkbox v-model="isPublic">公开</el-checkbox>
          </div>
          <!-- <div class="eacheditrolecont clear">
            <div class="editname">*移动到:</div>
            <div class="editint editselect">
              <el-select v-model="value" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </div>
          </div>
          <div class="eacheditrolecont clear">
            <div class="editname">*平台权限:</div>
            <div class="editint" @click="chooseqx">
              <input type="text" placeholder="多选" readonly>
              <i class="el-icon-arrow-down bot" />
            </div>
          </div> -->
        </div>

        <div class="editbtn">
          <div @click="savesureinfo">保存</div>
          <div>删除</div>
          <div @click="closebox">取消</div>
        </div>
      </div>

      <el-drawer :append-to-body="true" :before-close="handleClose" :visible.sync="innerDrawer">
        <div class="editchoose">
          <div class="editchoosetit">请选择平台权限</div>

          <div class="alleditchoose">
            <div class="eacheditchoose">
              <el-checkbox v-model="checked" class="check" />
              <span>权限名称</span>
            </div>
            <div class="eacheditchoose eacheditchoose2">
              <el-checkbox v-model="checked" class="check" />
              <span>下级权限</span>
            </div>
          </div>

          <div class="editchoosebtn">
            <div>取消</div>
            <div>保存</div>
          </div>
        </div>
        
      </el-drawer>
      
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      options: [{
        value: '选项1',
        label: '黄金糕',
      }, {
        value: '选项2',
        label: '双皮奶',
      }, {
        value: '选项3',
        label: '蚵仔煎',
      }, {
        value: '选项4',
        label: '龙须面',
      }, {
        value: '选项5',
        label: '北京烤鸭',
      }],
      value: '',
      value1: '',
      innerDrawer: false,
      checked: false,
      title: '添加',
      username: '',
      isDefault: false,
      isPublic: false,
      roleid: '',
      concurrencyStamp: '',
      readonly: true,
    };
  },
  methods:{
    openbox(){
      this.drawer = true;
    },
    closebox(){
      this.drawer = false;
    },
    handleClose(){
      console.log('关闭');
      this.innerDrawer = false;
    },
    chooseqx(){
      this.innerDrawer = true;
    },
    async savesureinfo(){
      let id = this.readonly ? '/'+this.roleid : '';
      var url = '/api/identity/roles'+id,
        type = this.readonly ? 'put' : 'post',
        data = {
          name: this.username,
          isDefault: this.isDefault,
          isPublic: this.isPublic,
        };
      if (this.readonly){
        data.concurrencyStamp = this.concurrencyStamp;
      }
      let info = await this.$getaxios(url,type,data);
      console.log(info);
      if (info){
        let msg = this.readonly ? '修改成功' : '添加成功';
        this.$message(msg);
      }
      this.drawer = false;
      this.$emit('rolesinfo');
    },
    addnewrole(tit,data){
      this.title = tit;
      if (data){
        this.readonly = true;
        this.username = data.name;
        this.isDefault = data.isDefault;
        this.isPublic = data.isPublic;
        this.roleid = data.id;
        this.concurrencyStamp = data.concurrencyStamp;
      } else {
        this.readonly = false;
        this.roleid = '';
        this.username = '';
        this.isDefault = '';
        this.isPublic = '';
      }
      this.drawer = true;
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss" />

<style>
.editselect .el-select .el-input__inner{
    height: 2rem;
}
</style>
