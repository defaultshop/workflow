<template>
  <div class="perations">
    <div class="eachnode" @click="chooseoptional(1)" @mouseenter="enter(1)" @mouseleave="leave(1)">
      <div>回退</div>
      <div>
        <span v-if="fallbacktype">开启</span>
        <span v-else>未开启</span>
      </div>
      <div v-show="backedit">编辑</div>
    </div>
    <div class="eachnode" @click="chooseoptional(2)" @mouseenter="enter(2)" @mouseleave="leave(2)">
      <div>转给</div>
      <div>
        <span v-if="fallcctype">开启</span>
        <span v-else>未开启</span>
      </div>
      <div v-show="ccedit">编辑</div>
    </div>

    <optionalattribute ref="optional" @changetype="completeoptional"/>
  </div>
</template>

<script>
import optionalattribute from './optionalattribute/optionalattribute.vue';
let select = require('xpath.js');
let dom = require('xmldom').DOMParser;
// import approvalTask from '../../setup/extensions/approvalTask.js';
export default {
  name:'flowControlPanel',
  props:{
    events: Object,
    value: Object,
    id: String,
  },
  components:{
    optionalattribute,
  },
  data(){
    return {
      fallbacktype: false,
      fallcctype: false,
      handtype: false,
      backedit: false,
      ccedit: false,
      nodeid: '',
      optionalSteps: [],
    };
  },
  // created(){
  //   this.events = {};
  //   this.value = {};
  // },
  methods:{
    enter(li){
      if (li == 1){
        this.backedit = true;
      } else if (li == 2){
        this.ccedit = true;
      }
    },
    leave(li){
      if (li == 1){
        this.backedit = false;
      } else if (li == 2){
        this.ccedit = false;
      }
    },
    backchange(type){
      console.log(type);
      this.value.optional.back = type;
    },
    chooseoptional(type){
      if (type == 1){
        this.$refs.optional.DataTransfer({type:this.fallbacktype,id:type,nodeid:this.nodeid});
      } else if (type == 2){
        this.$refs.optional.DataTransfer({type:this.fallcctype,id:type,nodeid:this.nodeid},this.optionalSteps);
      }
    },
    // 解析xml
    getnodes() {
      let xml = this.$store.state.BPMNxml;
      if (!xml) return;
      let doc = new dom().parseFromString(xml);
      let nodes = select(doc, '//*[name()="bpmn:userTask"]');
      let arr = [];
      nodes.forEach(item => {
        let obj = {};
        for (const key in item.attributes) {
          if (item.attributes.hasOwnProperty(key)) {
            const e = item.attributes[key];
            if (e.nodeName === 'id' && e.nodeValue) {
              obj.id = e.nodeValue;
              obj.optiondisabled = false;
            }
            if (e.nodeName === 'name' && e.nodeValue) {
              obj.name = e.nodeValue;
            }
          }
        }
        arr.push(obj);
      });
      console.log(arr,'arr');
    },
    chooseevent(evt){
      this.value.evtval.event = evt;
    },
    choosevalue(val){
      this.value.evtval.value = val;
    //   this.$emit('input',{
    //     evtval:this.value.evtval,
    //   });
    },
    completeoptional(type,data){
      console.log(type,data,'completeoptional');
      if (type.id == 1){
        this.fallbacktype = type.type;
      } else if (type.id == 2){
        this.fallcctype = type.type;
        this.$emit('input',{
          enableFallback : false,
          id: '',
          optionalSteps : data,
        });
      }
    },
  },
  mounted(){
    console.log(this.value,this.id,'this.value');
    if (this.value!=null)
    {
      console.log(this.value.optional,'optional');
      this.fallbacktype = this.value.enableFallback;
      this.optionalSteps = this.value.optionalSteps;
      if (this.optionalSteps.length>0){
        this.fallcctype = true;
      } else {
        this.fallcctype = false;
      }
    }
    this.$nextTick(()=>{
      this.nodeid = this.$store.state.nodeid;
      console.log(this.$store.state.nodeid,'this3');
      // this.getnodes();
    });
  },
};
</script>

<style lang="scss" scoped src="./flowControlPanel.scss" />
<style>
.eventflow .el-select{
  width: 100%;
}
.eventflow .el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 100%;
}
</style>