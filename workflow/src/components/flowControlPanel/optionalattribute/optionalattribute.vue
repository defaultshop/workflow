<template>
  <div class="optionalattribute" v-if="type"
    :style="{transform:showtype == false ? 'translateY(100%)' : 'translateY(0%)',opacity:showtype == false ? 0 : 1}"
  >
    <div class="closeoptional" @click="complete">
      <span>完成</span>
    </div>
    <div class="allswitch">
      <!-- <div class="eachswitch">
        <div>
          <span v-if="optionaltype.id == 1">回退</span>
          <span v-if="optionaltype.id == 2">转交</span>
        </div>
        <div>
          <el-switch
            v-model="optionaltype.type"
            active-color="#13ce66"
            inactive-color="#cccccc"
          />
        </div>
      </div> -->
      <div v-if="optionaltype.id == 2">
        <div class="eachswitch" v-for="(li,index) in transferlist" :key="index">
          <div>{{ li.prename }}</div>
          <div>
            <el-switch
              v-model="li.type"
              active-color="#13ce66"
              inactive-color="#cccccc"
              @change="changetransfer()"
            />
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
      type: false,
      showtype: false,
      backtype: false,
      switchlist: [],
      optionaltype: {id:1,type:false},
      bpmnBase64: '',
      transferlist: [],
      optionalSteps: [],
    };
  },
  methods:{
    handleClose(){
      if (this.type == true) {
        this.showtype = false,
        setTimeout(()=>{
          this.type = false;
        },200);
      } else {
        this.type = true;
        setTimeout(()=>{
          this.showtype = true;
        },50);
      }
    },
    //转给-开启取消
    changetransfer(type){
      console.log(type);
      this.$forceUpdate();
    },
    //数据传递
    DataTransfer(type,data){
      this.optionaltype = type;
      this.optionalSteps = data;
      if (type.id == 2){
        this.TransferInfo();
      }
      this.handleClose();
    },
    //转交数据详情
    async TransferInfo(){
      this.bpmnBase64 = Base64.encode(this.$store.state.BPMNxml);
      var url = '/resource/baitu-workflows/rule-engine/approval-step-options',
        type = 'post',
        data = {
          stepId: this.optionaltype.nodeid,
          bpmnBase64: this.bpmnBase64,
        };
      let res = await this.$getaxios(url,type,data);
      if (res){
        console.log(res,'转交');
        this.transferlist = [];
        for (let i in res){
          console.log(i,res[i]);
          let step = false;
          this.optionalSteps.forEach(item=>{
            if (item.id == i){
              step = true;
            }
          });
          this.transferlist.push({name:res[i],prename:res[i],id:i,type:step});
        }
        this.transferdataprocess();
        console.log(this.transferlist,this.optionalSteps);
      }
    },
    //转交相同名字处理
    transferdataprocess(){
      var length = this.transferlist.length;
      for (let i = 0;i<length;i++){
        for (let j = i+1;j<length;j++){
          if (this.transferlist[i].name == this.transferlist[j].name){
            this.transferlist[i].prename = this.transferlist[i].name+'('+this.transferlist[i].id+')';
            this.transferlist[j].prename = this.transferlist[j].name+'('+this.transferlist[j].id+')';
          }
        }
      }
    },
    //转交处理
    TransferProcessing(){
      let data = [];
      this.transferlist.forEach(item=>{
        if (item.type == true){
          data.push({id:item.id,name:item.name});
        }
      });
      return data;
    },
    //完成
    complete(){
      let processing = [];
      if (this.optionaltype.id == 2){
        processing = this.TransferProcessing();
        if (processing.length > 0){
          this.optionaltype.type = true;
        } else {
          this.optionaltype.type = false;
        }
      }
      this.$emit('changetype',this.optionaltype, processing);
      this.showtype = false,
      setTimeout(()=>{
        this.type = false;
      },200);
    },
  },
};
</script>

<style lang="scss" scoped src="./optionalattribute.scss" />