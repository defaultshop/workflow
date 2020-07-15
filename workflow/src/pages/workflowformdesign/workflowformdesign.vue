<template>
  <b-container id="modeler-app" @click="hide" class="h-100 container position-relative p-0" style="max-width:100%;overflow-x:hidden">
    <formhead ref="formhead"  @chnagename="getchangename" @releaseclick="saveform" @saveformname="appsavename" />
    <div class="allicon">
      <div class="lefticon">
        <div :style="{borderBottom:name == 1 ? '2px solid #3671FF' : '', color:name == 1 ? '#3671FF' : ''}" @click="chooseselect(1)">
          表单设计
        </div>
        <div :style="{borderBottom:name == 2 ? '2px solid #3671FF' : '', color:name == 2 ? '#3671FF' : ''}" @click="chooseselect(2)">
          自定流程
        </div>
        <div :style="{borderBottom:name == 3 ? '2px solid #3671FF' : '', color:name == 3 ? '#3671FF' : ''}" @click="chooseselect(3)">
          表单发布
        </div>
        <div :style="{borderBottom:name == 4 ? '2px solid #3671FF' : '', color:name == 4 ? '#3671FF' : ''}" @click="chooseselect(4)">
          数据权限
        </div>
        <div :style="{borderBottom:name == 5 ? '2px solid #3671FF' : '', color:name == 5 ? '#3671FF' : ''}" @click="chooseselect(5)">
          数据管理
        </div>
      </div>

      <div class="righticon">
        <div class="edition" @click.stop="editionclick">
          <span class="useedition">流程版本<b>({{ version }})</b></span>
          <span class="designspan" v-if="currentversion.status == 0">设计</span>
          <span class="designspan designspan2" v-if="currentversion.status == 1">启用中</span>
          <span class="designspan designspan2" v-if="currentversion.status == 2">历史</span>
          <i class="el-icon-arrow-down" />

          <div class="editionother" v-show="editiontype">
            <div class="alleditionother">
              <div class="eacheditionother clear" v-for="(li,index) in versionlist" @click="switchversion(li)" :key="index">
                <i class="el-icon-check yes" v-if="li.id == currentversion.id" />
                <span class="nowedition">流程版本({{ li.versionText }})</span>
                <span class="editionbtn" v-if="li.status == 0">设计</span>
                <span class="editionbtn editionbtn2" v-if="li.status == 1">启用中</span>
                <span class="editionbtn editionbtn2" v-if="li.status == 2">历史</span>
              </div>
            </div>
            <div class="editionadd" @click="processversion">
              <i class="el-icon-s-tools" />
              <span>管理流程版本</span>
            </div>
          </div>
        </div>
        
        <div class="eachbtn" @click="saveform">保存</div>
        <div class="eachbtn" @click="enableprocess(version)" v-if="currentversion.status == 0">启用流程</div>
        <div class="eachbtn" @click="nextstep">下一步</div>
      </div>
    </div>
    
    <div class="tabheight" v-show="name == 2">
      <b-card no-body class="h-100 rounded-0" style="width:100%">
        <!-- <b-card-header class="d-flex align-items-center header">
          <b-card-text class="m-0 font-weight-bolder">
            {{ $t('ProcessMaker Modeler') }}
          </b-card-text>

          <div class="ml-auto">
            <b-btn variant="secondary" size="sm" v-b-modal="'uploadmodal'" class="mr-2">
              <i class="fas fa-upload mr-1"/>
              {{ $t('Upload XML') }}
            </b-btn>
          </div>
        </b-card-header>  -->
        <b-card-body class="overflow-hidden position-relative p-0 vh-100">
          <modeler ref="modeler" @set-xml-manager="xmlManager = $event" @saveBpmn="saveformdata" @validate="validationErrors = $event" @warnings="warnings = $event" :decorations="decorations" />
        </b-card-body>
        <validation-status ref="validationStatus"
          :validation-errors="validationErrors"
          :warnings="warnings"
          :xml-manager="xmlManager"
        >
          <component v-for="(component, index) in validationBar" :key="index" :is="component" />
        </validation-status>
      </b-card>
    </div>
    <div v-show="name == 1" class="tabheight">
      <item1 ref="formdesign" @savedata="savemodeler" />
    </div>

    <div v-if="name == 3" class="tabheight">
      <formpublish />
    </div>
    <div v-show="name == 4" class="tabheight">
      <item3 ref="appformname" @saveformname="appsavename" />
    </div>

    <div v-show="name == 5" class="tabheight">
      <item4 ref="management" />
    </div>

    <b-modal
      ref="uploadmodal"
      id="uploadmodal"
      :title="$t('Upload BPMN File')"
      :cancel-title="$t('Cancel')"
      :ok-title="$t('Upload')"
      :ok-disabled="!uploadedXml"
      cancel-variant="outline-secondary"
      ok-variant="secondary"
      @hidden="this.clearUpload"
      @ok="this.loadXmlIntoModeler"
    >
      <file-upload class="btn btn-primary" v-model="xmlFile">
        {{ $t('Select file') }}
      </file-upload>

      <span class="ml-3" v-if="xmlFile[0]">{{ xmlFile[0].name }}</span>
    </b-modal>

    <el-dialog
      title="管理流程版本"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <div class="addnewversion">
        <input type="text" v-model="newversionname" placeholder="请输入新的版本号">
        <span @click="addversion">+ 添加新版本</span>
      </div>
      <div class="allversionlist">
        <div class="versionlist" v-for="(li,index) in versionlist" :key="index">
          <div>
            <span>流程版本({{ li.versionText }})</span>
            <span class="design" v-if="li.status == 0">设计</span>
            <span class="design design2" v-if="li.status == 1">启用中</span>
            <span class="design design2" v-if="li.status == 2">历史</span>
          </div>
          <div>
            <span v-if="li.status == 0" @click="enableprocess(li.versionText)">启用</span>
            <span :style="{borderRight:li.status == 1 ? 'none':''}" @click="switchversion(li)">编辑</span>
            <span class="del" v-if="li.status == 0">删除</span>
          </div>
        </div>
      </div>
      
    </el-dialog>    
  </b-container>
</template>

<script>
import Modeler from '../../components/modeler/Modeler.vue';
import FileUpload from 'vue-upload-component';
import ValidationStatus from '@/components/validationStatus/ValidationStatus';
import undoRedoStore from '@/undoRedoStore';
import item1 from '../../tabitem/item1.vue';
import item3 from '../../tabitem/item3.vue';
import item4 from '../../tabitem/item4';
import formhead from '../../tabitem/formhead/formhead.vue';
// import Box from '../../../src/components/newbox/box/box.vue';
import formpublish from '../../tabitem/formpublish/index.vue';


const reader = new FileReader();
const Base64 = require('js-base64').Base64;

export default {
  name: 'ModelerApp',
  components: {
    Modeler,
    FileUpload,
    ValidationStatus,
    item1,
    item3,
    item4,
    formpublish,
    formhead,
  },
  data() {
    return {
      validationBar: [],
      decorations: {
        borderOutline: {},
      },
      validationErrors: {},
      uploadedXml: null,
      xmlFile: [],
      warnings: [],
      xmlManager: null,
      name: 1,
      bpmnTextBase64: '',
      formTextBase64: '',
      appname: '未命名表单',
      appdesc: '未命名名称',
      appid: '',
      editiontype: false,
      dialogVisible: false,
      version: '1.0.0',
      currentversion:'',
      versionlist: [],
      newversionname: '',
      versionid: -1,
      nowfields: [
        {name:'SequenceNumber',title:'序列号'},
        {name:'Version',title:'版本'},
        {name:'BusinessFlowId',title:'业务标识'},
      ],
      tableapiurl: {},
      timer: '',
    };
  },
  watch: {
    xmlFile([fileObject]) {
      if (fileObject) {
        reader.readAsText(fileObject.file);
      }
    },
  },
  methods: {
    hide(){
      this.editiontype = false;
    },
    //版本切换
    switchversion(li){
      // this.timer = new Date().getTime();
      // this.nowfields.push({name:'BusinessFlowId',title:'业务标识'});
      // this.tableapiurl = {version:li.versionText,id:this.appid};
      // console.log(this.$refs.management,'this.$refs.management');
      // this.$refs.management.getdatainfo(li.versionText,this.appid);

      this.currentversion = li;
      this.version = li.versionText;
      this.versionid = li.versionText;
      console.log(this.currentversion);
      this.$refs.formdesign.setjsondata(this.currentversion.formText);
      const bpmnText = Base64.decode(this.currentversion.bpmnText);
      // this.$refs.modeler.continubpmn(this.currentversion.bpmnText);
      console.log(bpmnText,'bpmnText');
      this.$refs.modeler.loadXML(bpmnText);
      undoRedoStore.dispatch('pushState', this.uploadedXml);
    },
    //添加新版本
    async addversion(){
      if (this.newversionname == '' || this.newversionname == ' '){
        this.$message('请输入新的版本号');
        return false;
      }
      var url = '/api/baitu-workflows/businessFlow/'+this.appid+'/definition',
        type = 'post',
        data = {
          versionText: this.newversionname,
          oldVersionText: this.version,
        };
      let res = await this.$getaxios(url,type,data);
      console.log(res);
      if (res){
        this.versionid = res.versionText;
        this.dialogVisible = false;
        this.newversionname = '';
        this.getforminfo(this.appid);
      }
      
    },
    //启用流程
    async enableprocess(version){
      this.$confirm('启用后，新提交的数据将按此版本的流程流转。', '确定要启用流程吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        (async() => {
          var url = '/api/baitu-workflows/businessFlow/'+this.appid+'/enableDefinition',
            type = 'post',
            data = {
              versionText: version,
            };
          let res = await this.$getaxios(url,type,data);
          console.log(res);
          this.$message('启用成功');
          this.versionid = -1;
          this.dialogVisible = false;
          this.getforminfo(this.appid);
        })();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        });          
      });
    },
    processversion(){
      this.dialogVisible = true;
    },
    handleClose(){
      this.newversionname = '';
      this.dialogVisible = false;
    },
    //点击流程版本
    editionclick(){
      if (this.editiontype == true){
        this.editiontype = false;
      } else {
        this.editiontype = true;
      }
    },
    appsavename(data){
      this.appname = data.name;
      this.appdesc = data.desc;
    },
    saveformdata(data){
    //   console.log(data,'saveformdata');
      this.bpmnTextBase64 = Base64.encode(data.xml);
    },
    savemodeler(data){
    //   console.log(data,'data');
      this.formTextBase64 = Base64.encode(data);
    },
    saveform(){
      console.log(this.validationBar,this.validationErrors,this.warnings,'validationBar');
      console.log(JSON.stringify(this.validationErrors) != '{}');
      // for (let i in this.validationErrors){
      //   console.log(i,this.validationErrors[i]);
      // }
      if (JSON.stringify(this.validationErrors) != '{}'){
        this.$message('请先完成流程!');
        return false;
      }
      this.$refs.modeler.saveBpmn();
      this.$refs.formdesign.getjsondata();
      this.$refs.appformname.savename();
      var nowtype = 'post';
      var nowid = '';
      if (this.$route.query.type && this.$route.query.type == 1 && this.$route.query.id){
        nowtype = 'put';
        nowid = '/' + this.appid;
      }
      this.$nextTick(()=>{
        // console.log(this.bpmnTextBase64,this.formTextBase64,'-----------------');
        (async() => {
          var url = '',
            type = '',
            data = '';
          if (this.appid != ''){
            nowtype = 'put';
            nowid = '/' + this.appid;
            url = '/api/baitu-workflows/businessFlow'+nowid+'/definition';
            type = nowtype;
            data = {
              versionText: this.version,
              bpmnTextBase64: this.bpmnTextBase64,
              formTextBase64: this.formTextBase64,
            };
          } else {
            nowtype = 'post';
            url = '/api/baitu-workflows/businessFlow';
            type = nowtype;
            data = {
              definition:{
                versionText: this.version,
                bpmnTextBase64: this.bpmnTextBase64,
                formTextBase64: this.formTextBase64,
              },
              name: this.appname,
              desc: this.appdesc,
              type: 0,
            };
          }
          let res = await this.$getaxios(url,type,data);
          if (res){
            if (nowtype == 'post'){
              this.$store.state.workflowinfo = res;
              this.appid = res.id;
              this.$message('保存成功');
              this.$router.push('/');
            }
          }
          if (nowtype == 'put') {
            this.$message('修改成功');
            this.getforminfo(this.appid);
          }
          console.log(res,'res');
        })();
      });
    },  
    yulan() {
      this.$refs.formdesign.getjsondata();
    },
    //下一步
    nextstep() {
      
      this.name = Number(this.name) + 1;
      if (this.name >=5){
        this.name = 1;
      } else if (this.name == 2){
        this.$refs.formdesign.getjsondata();
        this.$refs.modeler.handleResize();
      }
      this.$refs.formhead.changetab(name);
      this.name = this.name.toString();
      console.log(this.name);
    },
    getchangename(name){
      this.name = name;
      if (name == 2) {
        this.$refs.formdesign.getjsondata();
        this.$refs.modeler.handleResize();
      }
    },
    chooseselect(name) {
      this.name = name;
      this.$refs.formhead.changetab(name);
      if (name == 2) {
        this.$refs.formdesign.getjsondata();
        this.$refs.modeler.handleResize();
      }
    },
    loadXmlIntoModeler() {
      console.log(this.uploadedXml,'9099090');
      this.$refs.modeler.loadXML(this.uploadedXml);
      undoRedoStore.dispatch('pushState', this.uploadedXml);
    },
    clearUpload() {
      this.uploadedXml = null;
      this.xmlFile = [];
    },
    setUploadedXml(event) {
      this.uploadedXml = event.target.result;
    },
    async getforminfo(id){
      var url = '/api/baitu-workflows/businessFlow/'+id,
        type = 'get',
        data = {
        };
      let res = await this.$getaxios(url,type,data);
      console.log(res);
      if (res){
        this.$store.state.workflowinfo = res;
        // var workflowinfo = res;
        this.$refs.formhead.setname(res.name);
        
        this.versionlist = res.definitions;
        let status = -1;
        let vertype = -1;
        this.versionlist.forEach((item,index)=>{
          if (this.versionid == item.versionText){
            vertype = index;
          } else {
            if (item.status == 1){
              status = index;
            }
          }
        });
        if (vertype == -1){
          if (status == -1){
            this.currentversion = this.versionlist[0];
          } else {
            this.currentversion = this.versionlist[status];
          }
        } else {
          this.currentversion = this.versionlist[vertype];
        }
        console.log(this.currentversion,'this.currentversion');
        this.version = this.currentversion.versionText;

        this.$refs.formdesign.setjsondata(this.currentversion.formText);
        if (this.versionid != -1){
          const bpmnText = Base64.decode(this.currentversion.bpmnText);
          this.$refs.modeler.loadXML(bpmnText);
          undoRedoStore.dispatch('pushState', this.uploadedXml);
        } else {
          this.$refs.modeler.continubpmn(this.currentversion.bpmnText);
        }
        this.$refs.management.getdatainfo(this.currentversion.versionText,this.appid);
        

        //console.log(Base64.decode(workflowinfo.definitions[0].bpmnText));
        //this.$refs.modeler.loadXML(Base64.decode(workflowinfo.definitions[0].bpmnText));
        // undoRedoStore.dispatch('pushState', Base64.decode(workflowinfo.definitions[0].bpmnText));
        this.$refs.appformname.setformname();
      }
    },
  },
  created() {
    reader.onload = this.setUploadedXml;
  },
  mounted() {
    console.log(this.$route.query.type,this.$store.state.workflowinfo,'pl');
    if (this.$route.query.type && this.$route.query.type == 1 && this.$route.query.id){
      this.appid = this.$route.query.id;
      this.getforminfo(this.$route.query.id);
    }
    
    window.ProcessMaker.$modeler = this.$refs.modeler;
    // this.$Messagebox({
    //   message: '无',
    //   vis: false,
    // });
  },
  beforeDestroy(){
    const uploadedXml = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" id="Definitions_03dabax" targetNamespace="http://bpmn.io/schema/bpmn" exporter="ProcessMaker Modeler" exporterVersion="1.0">
  <bpmn:process id="Process_1" isExecutable="true" />
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1" />
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;
    this.$refs.modeler.loadXML(uploadedXml);
    undoRedoStore.dispatch('pushState', uploadedXml);
  },
};
</script>
<style lang="scss" scoped src="./workflowformdesign.scss" />
<style lang="scss">
body,
html {
  margin: 0;
  padding: 0;
  width: 100vw;
  max-width: 100vw;
  height: 100vh;
  max-height: 100vh;
}
.height80{
  height: 88%; /*写给不支持calc()的浏览器*/
  height: -moz-calc(100% - 60px);
  height: -webkit-calc(100% - 60px);
  height: calc(100% - 60px);
}
.tabheight{
  height: 85%; /*写给不支持calc()的浏览器*/
  height: -moz-calc(100% - 150px);
  height: -webkit-calc(100% - 150px);
  height: calc(100% - 150px);
  margin-top: 20px;
  width: 100%;
  overflow: hidden;
}
.clear::after {
  content: "";
  clear: both;
  display: block;
  overflow: hidden;
}


</style>
