<template>
  <div id="initiationprocess" v-if="processtype">
    <div class="mask" @click="hidepress">1</div>
    <div class="initiationprocess">
      <div class="processtit">
        <span>{{ appname }}</span>
      </div>
      <div class="processcont">
        <div class="processleft">
          <div class="allformlist">
            <!-- <div class="eachformlist">
              <div>自定义表单字段</div>
              <div>
                <input type="text" placeholder="请输入">
              </div>
            </div> -->
            <k-form-build ref="kfb" :value="jsondata" />
          </div>
          <div class="processbtn">
            <div class="formbtn">
              <div @click="submitkformdata">提交</div>
              <div @click="cancalprocess">取消</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const Base64 = require('js-base64').Base64;
export default {
  data(){
    return {
      processtype: false,
      appname: '当前流程名称',
      jsondata: '',
      appid: '',
    };
  },
  methods:{
    hidepress(){
      this.processtype = false;
    },
    //提交
    submitkformdata(){
      this.$refs.kfb.getData().then(values => {
        console.log('验证通过', values);
        for (let i in values){
          if (values[i] == '' || values[i] == ' '){
            this.$message('请填写完整');
            return false;
          }
        }
        (async()=>{
          var url = '/api/baitu-workflows/flowInstance',
            type = 'post',
            data = {
              businessFlowId: this.appid,
              dataJsonBase64: Base64.encode(JSON.stringify(values)),
            };
          let res = await this.$getaxios(url,type,data);
          console.log(res,'res');
          if (res){
            this.$message('提交成功');
            this.processtype = false;
          }
        })();
        
        
      }).catch(() => {
        console.log('验证未通过，获取失败');
      });
    },
    //
    cancalprocess(){
      this.processtype = false;
    //   this.appname = '当前流程名称';
    //   this.jsondata = '';
    //   this.appid = '';
    },
    //获取json数据
    async getdata(li){
      this.appid = li.id;
      var url = '/api/baitu-workflows/businessFlow/'+li.id,
        type = 'get',
        data = {
        };
      let res = await this.$getaxios(url,type,data);
      console.log(res,'res');
      if (res){
        this.appname = res.name;
        this.processtype = true;
        var versionlist = res.definitions;
        versionlist.forEach(item=>{
          if (item.status == 1){
            this.jsondata = JSON.parse(Base64.decode(item.formText));
          }
        });
        
        console.log(this.jsondata);
      }
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss" />