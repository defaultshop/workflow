<template>
  <div class="eventflow">
    <div class="flowtit">事件类别</div>
    <div class="flowchoose">
      <el-select v-model="event" value-key="id" placeholder="请选择" @change="chooseevent(event)">
        <el-option v-for="lt in eventflowfirst" :key="lt.id" :label="lt.name" :value="lt" />
      </el-select>
    </div>
    <div class="flowtit">事件值</div>
    <div class="flowchoose">
      <el-select v-model="val" value-key="id" placeholder="请选择" @change="choosevalue(val)">
        <el-option v-for="item in eventflowsecond" :key="item.id" :label="item.name" :value="item" />
      </el-select>
    </div>
    <div class="flowtit">生效时间</div>
    <div class="flowchoose">
      <el-date-picker
        v-model="time"
        type="datetime"
        placeholder="选择日期"
        :change="choosetime(time)"
      />
    </div>
  </div>
</template>

<script>
export default {
  props:{
    events: Object,
    value: Object,
  },
  data(){
    return {
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
      event: '',
      eventname: '',
      val: '',
      valvalue: '',
      time: '',
      eventflowfirst: [],
      eventflowsecond: [],
      totalCount: 0,
      filtername: '',
      FlowEventStatus: 1,
      Filtervalue: '',
    };
  },
  methods:{
    // filtername(value){
    //   console.log(value);
    //   this.eventname = value;
    //   this.getselectfirstvalue();
    // },
    //选择时间
    choosetime(time){
      let d = new Date(time);
      let datetime=this.gettime(d);
      this.time = datetime;
      console.log(d,datetime,this.time);
      if (this.val != ''){
        this.$emit('input',{
          name: this.event.key,
          value: this.val.value,
          valueProvider: null,
          effectiveTime: this.time,
          namevalueid:{nameid:this.event,valueid:this.val},
        });
      }
    },
    gettime(d){
      let yy = d.getFullYear();
      let mm = (d.getMonth() + 1) <10 ? '0'+(d.getMonth() + 1) : (d.getMonth() + 1);
      let dd = d.getDate() <10 ? '0'+d.getDate() : d.getDate();
      let hh = d.getHours() <10 ? '0'+d.getHours() : d.getHours();
      let ss = d.getMinutes() <10 ? '0'+d.getMinutes() : d.getMinutes();
      let ff = d.getSeconds() <10 ? '0'+d.getSeconds() : d.getSeconds();
      return yy+'-'+mm+'-'+dd+' '+hh+':'+ss+':'+ff;
    },
    //选择事件一
    chooseevent(evt){
      console.log(evt,'evt');
      this.getsecondvalue(evt.id);
      this.val = '';
    },
    //选择事件二
    choosevalue(val){
      console.log(val,this.event);
      // this.value = val;
      this.$emit('input',{
        name: this.event.key,
        value: this.val.value,
        valueProvider: null,
        effectiveTime: this.time,
        namevalueid:{nameid:this.event,valueid:this.val},
      });
    },
    //获取第二级事件流
    async getsecondvalue(id){
      var url = '/api/baitu-workflows/flowEvent/eventValues?FlowEventId='+id+'&Filter='+this.Filtervalue,
        type = 'get',
        data = {
          FlowEventId: id,
        };
      let res = await this.$getaxios(url,type,data);
      console.log(res,'two');
      if (res){
        this.eventflowsecond = res;
      }
    },
    //获取第一个事件流
    async getselectfirstvalue(){
      var url = '/api/baitu-workflows/flowEvent?Filter='+this.filtername+'&FlowEventStatus='+this.FlowEventStatus,
        type = 'get',
        data = {
          filter: this.filtername,
        };
      let res = await this.$getaxios(url,type,data);
      console.log(res,'wait');
      if (res){
        this.eventflowfirst = res;
      }
    },
  },
  mounted(){
    console.log(this.value,'events');
    this.getselectfirstvalue();
    this.time = this.value.effectiveTime;
    if (this.value.name){
      this.event = this.value.namevalueid.nameid;
      this.val = this.value.namevalueid.valueid;
      this.getsecondvalue(this.value.namevalueid.nameid.id);
    }
    // this.event = this.value.evtval.event;
    // this.val = this.value.evtval.value;
  },
};
</script>

<style lang="scss" scoped src="./eventConfigPanel.scss" />
<style>
.eventflow .el-select{
  width: 100%;
}
.eventflow .el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 100%;
}
.el-time-panel{
  right: 0;
  left: auto;
}
</style>