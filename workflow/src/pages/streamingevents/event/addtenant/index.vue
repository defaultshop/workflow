<template>
  <div id="addtenant">

    <el-dialog title="修改" :visible.sync="linkstring" @close="closetenant" width="40%" center>
      
      <div class="usertit">名称</div>
      <div class="userint">
        <input type="text" v-model="name">
      </div>
      <div class="usertit">描述</div>
      <div class="userint">
        <input type="text" v-model="desc" >
      </div>
      <div class="usertit">引擎键</div>
      <div class="userint">
        <input type="text" v-model="key" >
      </div>
      <div class="usertit" v-if="info.type == 1">状态</div>
      <div class="userint" style="text-indent:0" v-if="info.type == 1">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>


      <span slot="footer" class="dialog-footer">
        <el-button @click="linkstring = false">取 消</el-button>
        <el-button type="primary" @click="savelinkstring">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props:{
    info: Object,
  },
  data(){
    return {
      name: '',
      centerDialogVisible: false,
      desc: '',
      key: '',
      linkstring: false,
      isDefault: false,
      options: [{
        value: 'Created',
        label: '新建',
      }, {
        value: 'Enabled',
        label: '启用',
      }, {
        value: 'Disabled',
        label: '禁用',
      }],
      value: 'Created',
      defaultid: '',
    };
  },
  methods:{
    async savelinkstring(){
      if (this.name == ''|| this.name == ' '){
        this.$message('请输入名称');
        return false;
      }
      if (this.desc == ''|| this.desc == ' '){
        this.$message('请输入描述');
        return false;
      }
      if (this.key == ''|| this.key == ' '){
        this.$message('请输入引擎键');
        return false;
      }
      var url = '/api/baitu-workflows/flowEvent',
        type = this.info.method,
        data = {
          name: this.name,
          desc: this.desc,
          key: this.key,
          flowEventStatus: this.value,
        };
      if (this.info.type == 1){
        data = {
          name: this.name,
          desc: this.desc,
          key: this.key,
          flowEventStatus: this.value,
        };
        if (type == 'put'){
          data.id = this.defaultid;
        }
        url = '/api/baitu-workflows/flowEvent';
      } else {
        data = {
          name: this.name,
          desc: this.desc,
          value: this.key,
          flowEventId: this.info.id,
        };
        if (type == 'put'){
          data.id = this.defaultid;
        }
        url = '/api/baitu-workflows/flowEvent/eventValue';
      }
      let res = await this.$getaxios(url,type,data);
      console.log(res);
      if (type == 'put'){
        this.$message('修改成功');
      } else {
        this.$message('添加成功');
      }
      this.$emit('getinfo');
      this.desc = '',
      this.name = '',
      this.key = '',
      this.value = 'Created';
      this.linkstring = false;
    
    },
    changeboxtype(method){
      this.info.method = method;
      this.linkstring = true;
    },
    //
    closetenant(){
      this.desc = '',
      this.name = '',
      this.key = '',
      this.value = 'Created';
    },
    async getdefaultvalueinfo(id,method){
      this.info.method = method;
      this.linkstring = true;
      this.defaultid = id;
      var url = '/api/baitu-workflows/flowEvent/eventValue?FlowEventId='+this.info.id+'&Id='+id,
        type = 'get',
        data = {
          FlowEventId: this.info.id,
          Id: id,
        };

      let res = await this.$getaxios(url,type,data);
      console.log(res,'default');
      if (res){
        this.name = res.name;
        this.desc = res.desc;
        this.key = res.value;
        this.$forceUpdate();
      }
    },
    async getdefaultinfo(id,method){
      this.info.method = method;
      this.linkstring = true;
      this.defaultid = id;
      var url = '/api/baitu-workflows/flowEvent/'+id,
        type = 'get',
        data = {
        };

      let res = await this.$getaxios(url,type,data);
      console.log(res,'default');
      if (res){
        this.name = res.name;
        this.desc = res.desc;
        this.key = res.key;
        if (res.flowEventStatus == 0){
          this.value = 'Created';
        } else if (res.flowEventStatus == 1){
          this.value = 'Enabled';
        } else if (res.flowEventStatus == 2){
          this.value = 'Disabled';
        }
        this.$forceUpdate();
      }
    },
  },
  mounted(){
    console.log(this.info,'info');
  },
};
</script>

<style lang="scss" scoped src="./index.scss" />
<style>
#addtenant .el-select{
  width: 100%;
}
</style>