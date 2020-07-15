<template>
  <div id="nowprocess" v-if="processtype">
    <div class="mask" @click="hideprocess">1</div>
    <div class="nowprocess" 
      :style="{width:enlargtype == 1 ? '70%' : '100%',left:enlargtype == 1 ? '15%' : '0%'}"
    >
      <div class="processtit">
        <span>{{ processinfo.instanceDto.name }}</span>
        <span>
          <i class="iconfont iconquanping2 enlarge" v-if="enlargtype == 1" @click="enlargenarrow" />
          <i class="iconfont iconquanping1 enlarge" v-else @click="enlargenarrow" />
          <i class="el-icon-close closeicon"  @click="closeprocess" />
        </span>
      </div>
      <div class="processcont">
        <div class="processleft">
          <div class="allformlist">
            <k-form-build
              ref="kfb"
              disabled
              :defaultValue="dynamicData"
              :value="jsondata"
            />
            <!-- <div class="eachformlist">
              <div>自定义表单字段</div>
              <div>
                <input type="text" placeholder="请输入">
              </div>
            </div> -->
          </div>
          <div class="processbtn" v-if="btnlist.length > 0">
            <div class="processbtntit">审批意见</div>
            <div class="processbtnint">
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                v-model="message"
                placeholder="请输入"
              />
            </div>
            <div class="picturelist">
              <div class="eachpicture" v-for="(li,index) in opinionimglist" :key="index">
                <div class="eachpicture-img" v-if="li.type == 1">
                  <img :src="li.src" alt="">
                </div>
                <div class="eachpicture-no" v-if="li.type == 2">
                  <div>{{ li.name }}</div>
                  <div>
                    <i class="el-icon-picture" v-if="li.imgtype == 'img'" />
                    <i class="el-icon-folder" v-else />
                    <span>{{ li.size }}</span>
                  </div>
                </div>
                <span class="closefile" @click="closefile(li,index)">
                  <i class="el-icon-close" />
                </span>
              </div>
            </div>
            <div class="formbtn">
              <div class="commentupload">
                <div>
                  <i class="el-icon-picture" />
                  <input type="file" @change="chooseimage($event,3)" accept="image/*">
                </div>
                <div>
                  <i class="el-icon-link" />
                  <input type="file" @change="chooseimage($event,4)" multiple >
                </div>
              </div>
              <div
                v-for="(li, index) in btnlist"
                @click="processbtn(li)"
                class="probtn"
                :key="index"
              >
                {{ li.name }}
              </div>
            </div>
          </div>
          <!-- <div class="processbtn" v-else>
            <div class="formbtn" @click="closeprocess">
              <div class="probtn probtnot">取消</div>
            </div>
          </div> -->
        </div>
        <div class="processright">
          <div class="dynamictit">
            <div>动态</div>
            <div>流转图</div>
          </div>
          <div class="dynamicom">
            <div
              :style="{
                backgroundColor: type == 1 ? '#3671FF' : '',
                color: type == 1 ? '#fff' : '',
                border: type == 1 ? '' : '1px solid #ccc'
              }"
              @click="switchprocess(1)"
            >
              审批意见
            </div>
            <div
              :style="{
                backgroundColor: type == 2 ? '#3671FF' : '',
                color: type == 2 ? '#fff' : '',
                border: type == 2 ? '' : '1px solid #ccc'
              }"
              @click="switchprocess(2)"
            >
              流程日志
            </div>
            <div
              :style="{
                backgroundColor: type == 3 ? '#3671FF' : '',
                color: type == 3 ? '#fff' : '',
                border: type == 3 ? '' : '1px solid #ccc'
              }"
              @click="switchprocess(3)"
            >
              评论
            </div>          
          </div>
          <div v-if="type == 1">
            <div
              class="eachdynamic"
              v-for="(item, ltindex) in processinfo.instanceDto.reviewMessages"
              :key="ltindex"
            >
              <div class="eachdynamictit">{{ item.stepName }}</div>
              <div class="eachdynamiccont clear">
                <span class="nameicon">
                  <!-- <i class="el-icon-s-custom" /> -->
                  {{ item.realName.substring(0,1) }}
                </span>
                <span>{{ item.realName }}</span>
              </div>
              <div class="eachdynamicyj">{{ item.creationTimeDesc }}</div>
              <div class="eachdynamicyj">{{ item.message }}</div>                     
            </div>
          </div>
          <div v-if="type == 2">
            <div
              class="eachdynamic"
              v-for="(item, ltindex) in processinfo.instanceDto.processLogs"
              :key="ltindex"
            >
              <div v-if="item.type==0">
                <div class="eachdynamictit">发起流程</div>                    
                <div class="eachdynamiccont clear">
                  <span class="nameicon">
                    <!-- <i class="el-icon-s-custom" /> -->
                    {{ item.realName.substring(0,1) }}
                  </span>                  
                  <span>{{ item.realName }}</span>
                </div>  
                <div class="eachdynamicyj">开始处理：{{ item.creationTimeDesc }}</div>                             
              </div>        
              <div v-else>
                <div class="eachdynamictit">{{ item.stepName }}</div>          
                <div class="eachdynamiccont clear">
                  <span class="nameicon">
                    <!-- <i class="el-icon-s-custom" /> -->
                    {{ item.realName.substring(0,1) }}
                  </span>                 
                  <span>{{ item.realName }}</span>
                </div>   
                <div class="eachdynamicyj">开始处理：{{ item.creationTimeDesc }}</div>      
                <div class="eachdynamicyj">结束处理：{{ item.handlerTimeDesc }}</div>                          
                <div class="eachdynamicyj">操作：{{ item.action }}</div>                          
              </div>
            </div>
          </div>
          <div v-if="type == 3" class="commentcont">
            <div
              class="eachdynamic"
              v-for="(item, ltindex) in processinfo.instanceDto.comments"
              :key="ltindex"
            >
              <div class="eachdynamiccont clear">
                <span class="nameicon">
                  <!-- <i class="el-icon-s-custom" /> -->
                  {{ item.realName.substring(0,1) }}
                </span>
                <span>{{ item.realName }}</span>
                <span>{{ item.creationTimeDesc }}</span>
              </div>
              <div class="eachdynamicyj">{{ item.message }}</div>  
              <div class="picturelist">
                <viewer :images="item.appendixes"> 
                  <div class="eachpicture" v-for="(li,index) in item.appendixes" :key="index">
                    <div class="eachpicture-img" v-if="li.documentType == 1">
                      <img :src="li.imgurl" alt="">
                    </div>
                    <div class="eachpicture-no" v-if="li.documentType == 0" @click="downloadFile(li)">
                      <div>附件</div>
                      <div>
                        <span>点击下载</span>
                      </div>
                    </div>
                  </div>
                  <!-- <img
                    v-for="(src,index) in item.appendixes"
                    :src="src.imgurl"
                    :key="index"
                    style="width:100px"
                  > -->
                </viewer>
                
              </div>           
            </div>
          </div> 
          <div class="comment" v-if="type == 3">
            <div class="falseint" v-if="commenttype == true" @click="commenttype = !commenttype">评论</div>
            <div class="commentdata" v-if="commenttype == false">
              <div class="commenttext">
                <textarea name="" id="" cols="30" rows="10" v-model="plmessage" />
              </div>
              <div class="picturelist">
                <div class="eachpicture" v-for="(li,index) in plimagelist" :key="index">
                  <div class="eachpicture-img" v-if="li.type == 1">
                    <img :src="li.src" alt="">
                  </div>
                  <div class="eachpicture-no" v-if="li.type == 2">
                    <div>{{ li.name }}</div>
                    <div>
                      <i class="el-icon-picture" v-if="li.imgtype == 'img'" />
                      <i class="el-icon-folder" v-else />
                      <span>{{ li.size }}</span>
                    </div>
                  </div>
                  <span class="closefile" @click="closefile(li,index)">
                    <i class="el-icon-close" />
                  </span>
                </div>
                
              </div>
              <div class="commentbot">
                <div class="commentupload">
                  <div>
                    <i class="el-icon-picture" />
                    <input type="file" @change="chooseimage($event,1)" accept="image/*">
                  </div>
                  <div>
                    <i class="el-icon-link" />
                    <input type="file" @change="chooseimage($event,2)" multiple >
                  </div>
                </div>
                <div class="commentbtn" @click="commentbtn">发送</div>
              </div>
            </div>
          </div>       
        </div>
      </div>
      <viewer :images="photo"> 
        <img
          v-for="(src,index) in photo"
          :src="imgurl"
          :key="index"
          :onerror="errorImg"
        >
      </viewer>
    </div>
  </div>
  
</template>

<script>
const Base64 = require('js-base64').Base64;
export default {
  data() {
    return {
      processtype: false,
      processinfo: '',
      type: 1,
      message: '',
      btnlist: [],
      jsondata: '',
      dynamicData: {},
      isAdmin: false,
      screenWidth: 0,
      commenttype: true,
      plimagelist: [],
      opinionimglist: [],
      plmessage: '',
      photo: [],
      enlargtype: localStorage.getItem('enlargtype') ? localStorage.getItem('enlargtype') : 1,
    };
  },
  watch:{
    screenWidth(num){
      console.log(num);
      if (this.processtype == true){
        let dynamictit = document.getElementsByClassName('dynamictit')[0].offsetHeight;
        let dynamicom = document.getElementsByClassName('dynamicom')[0].offsetHeight;
        console.log(dynamictit,dynamicom);
        document.getElementsByClassName('commentcont')[0].style.top = (dynamictit+dynamicom) +'px';
      }

      
    },
  },
  methods: {
    //关闭
    hideprocess(){
      this.processtype = false;
    },
    //放大缩小
    enlargenarrow(){
      if (this.enlargtype == 1){
        this.enlargtype = 2;
      } else {
        this.enlargtype = 1;
      }
      localStorage.setItem('enlargtype',this.enlargtype);
    },
    // 点击下载文件     
    downloadFile(item) {
      console.log(item);
      this.download(item.imgurl, 'fujian');
    },
    download(src, fileName) {
      let x = new XMLHttpRequest();
      x.open('GET', src, true);
      x.responseType = 'blob';
      x.onload = function() {
        let url = window.URL.createObjectURL(x.response);
        let a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
      };
      x.send();
    },
    //评论图片删除
    closefile(li,index){
      console.log(li,index);
      this.plimagelist.splice(index,1);
    },
    //图片上传
    chooseimage(e,math){
      let file = e.target.files[0]; //获取文件流
      let fileName = file.name; //获取文件名
      console.log(file,fileName);
      const reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onprogress = ()=> {
        let result = reader.result;
        let resultlength = result.length;
        (async()=>{
          var url = '/api/baitu-documents/upload',
            type = 'post',
            data = {
              'length': resultlength,
            };
          let res = await this.$getaxios(url,type,data);
          console.log(res,'res');
          if (res){
            this.send(file, result, res, math);
          }
        })();
      };
    },
    async send(fileInfo, array, data, math){
      let sliceSize = data.sliceSize;
      let token = data.token;
      let remainIndexes = data.remainIndexes;
      let documentLength = data.documentLength;
    
      let filelist = [];
      for (let i =0;i<remainIndexes.length;i++){
        let offset = i * sliceSize;
        let datatable =
        offset + sliceSize >= documentLength
          ? array.slice(offset, documentLength)
          : array.slice(offset, offset + sliceSize);
        let database64String = window.btoa(datatable);

        let url = '/api/baitu-documents/upload/send?token='+token,
          type = 'post',
          data = {
            'base64String': database64String,
            'index': remainIndexes[i],
          };
        let res = await this.$getaxios(url,type,data);
        console.log(res,'数据上传');
        filelist.push(res);
      }
      if (remainIndexes.length == filelist.length) {
        let res = await this.completeupload(token,fileInfo);
        if (res){
          this.showPictures(fileInfo,math,res.id);
          let lastres = await this.complete(token);
          this.$message('上传成功');
          console.log(lastres,'完成');
        }
        
      }
    },
    async complete(token){
      let url = '/api/baitu-documents/upload/complete?token='+token,
        type = 'post',
        data = {
        };
      return await this.$getaxios(url,type,data);
    },
    //完成上传
    async completeupload(token,fileInfo){
      let url = '/api/baitu-documents/document',
        type = 'post',
        data = {
          streamProviderType: 1,
          streamProvider: token,
          fullName: fileInfo.name,
          mimeTypeName: fileInfo.type,
          desc: fileInfo.name,
        };
      return await this.$getaxios(url,type,data);
    },
    //展示图片-文件
    showPictures(file, math, fileid){
      console.log(file,'file');
      if (file.type.indexOf('image') === 0){
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) =>{
          let filesize = this.handlefilesize(file.size);
          if (math == 1 || math == 2){
            this.plimagelist.push({name:file.name,size:filesize,src:e.target.result,imgtype:'img',type:math,id:fileid});
          } else {
            this.opinionimglist.push({name:file.name,size:filesize,src:e.target.result,imgtype:'img',type:math,id:fileid});
          }
          
          console.log(this.plimagelist,'图片列表');
        };
      } else {
        let filesize = this.handlefilesize(file.size);
        if (math == 1 || math == 2){
          this.plimagelist.push({name:file.name,size:filesize,src:'',imgtype:'noimg',type:math,id:fileid});
        } else {
          this.opinionimglist.push({name:file.name,size:filesize,src:'',imgtype:'noimg',type:math,id:fileid});
        }
      }
    },
    //处理文件大小
    handlefilesize(size){
      let filesize = '';
      if (size < 1048576){
        filesize = Math.floor((size / 1024)*100)/100 + 'KB';
      } else if (size == 1048576) {
        filesize = '1MB';
      } else {
        filesize = Math.floor((size / (1024 * 1024))*100)/100 + 'MB';
      }
      return filesize;
    },
    handleGetData() {
      // 使用getData函数获取数据
      this.$refs.kfb.setData(this.dynamicData);
      // this.$refs.kfb.getData().then(values => {
      //   console.log('验证通过', values);
      // }).catch(() => {
      //   console.log('验证未通过，获取失败');
      // });
    },
    //处理图片文件=>后端格式
    getappendixes(cut){
      let imglist = [];
      let appendixes = []; 
      if (cut == 1){
        imglist = this.plimagelist;
      } else {
        imglist = this.opinionimglist;
      }
      imglist.forEach(item=>{
        let type = 1;
        if (item.imgtype == 'img'){
          type = 1;
        } else {
          type =0;
        }
        appendixes.push({documentId:item.id,documentType:type});
      });
      return appendixes;
    },
    //发送评论
    async commentbtn(){
      var url =
          '/api/baitu-workflows/flowInstance/' +
          this.processinfo.instanceDto.id +
          '/comment',
        type = 'post',
        data = {
          message: this.plmessage,
          appendixes: this.getappendixes(1),
        };
      let res = await this.$getaxios(url, type, data);
      console.log(res);
      this.getdatainfo(this.processinfo.instanceDto.id,2,this.isAdmin);
      this.plimagelist = [];
      this.plmessage = '';
      this.commenttype = true;
    },
    //提交按钮
    processbtn(li) {
      this.$confirm('是否' + li.name, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          (async() => {
            var data = {
              stepName: this.processinfo.operating.currentStepName,
              optionName: li.value,
              message: this.message,
            };
            var flowInstanceId = this.processinfo.instanceDto.id;
            var res = {};
            if (this.isAdmin) {
              res = await this.submitprocessByAdmin(flowInstanceId, data);
            } else {
              res = await this.submitprocess(flowInstanceId, data);
            }
            if (res) {
              this.processtype = false;
              this.$message('提交成功');
              this.plimagelist = [];
              this.$emit('refreshlist');
            }

            // var url = '/api/baitu-workflows/flowInstance/'+this.processinfo.instanceDto.id+'/review',
            //   type = 'post',
            //   data = {
            //     stepName: this.processinfo.operating.currentStepName,
            //     optionName: li.value,
            //     message: this.message,
            //   };
            // let res = await this.$getaxios(url,type,data);
            // console.log(res);
            // if (res){
            //   this.processtype = false;
            //   this.$message('提交成功');
            //   this.$emit('refreshlist');
            // }
          })();
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作',
          });
        });
    },
    //回退流程
    async backprocess() {
      var url =
          '/api/baitu-workflows/flowInstance/' +
          this.processinfo.instanceDto.id +
          '/review',
        type = 'post',
        data = {
          stepName: this.processinfo.operating.currentStepName,
          optionName: this.processinfo.operating.options.不同意,
          message: this.message,
        };
      let res = await this.$getaxios(url, type, data);
      console.log(res);
      if (res) {
        this.processtype = false;
        this.$message('提交成功');
        this.$emit('refreshlist');
      }
    },
    //提交流程
    async submitprocess(flowInstanceId, data) {
      var url =
          '/api/baitu-workflows/flowInstance/' + flowInstanceId + '/review',
        type = 'post',
        data2 = {
          stepName: data.stepName,
          optionName: data.optionName,
          message: data.message,
          appendixes: this.getappendixes(2),
        };
      return await this.$getaxios(url, type, data2);
    },
    //管理员提交流程
    async submitprocessByAdmin(flowInstanceId, data) {
      var url =
          '/api/baitu-workflows/administration/reviewFlowInstance/' +
          flowInstanceId,
        type = 'post',
        data2 = {
          stepName: data.stepName,
          optionName: data.optionName,
          message: data.message,
          appendixes: this.getappendixes(2),
        };
      return await this.$getaxios(url, type, data2);
    },
    //切换流程
    switchprocess(type) {
      this.type = type;
    },
    closeprocess() {
      this.processtype = false;
    },
    setIsAdmin(isAdmin) {
      return (this.isAdmin = isAdmin || false);
    },
    async getinfo(flowInstanceId) {
      if (this.isAdmin) {
        return await this.$getaxios(
          '/api/baitu-workflows/FlowInstance/detailByAdmin/' + flowInstanceId,
          'get'
        );
      } else {
        return await this.$getaxios(
          '/api/baitu-workflows/FlowInstance/detail/' + flowInstanceId,
          'get'
        );
      }
    },
    //页面初始状态还原
    pageinit(){
      this.commenttype = true;
      this.type = 1;
    },
    //获取默认数据
    async getdatainfo(flowInstanceId,initype, isAdmin) {
      if (initype == 1){
        this.pageinit();
      }
      
      // 管理员操作和普通用户操作是请求不同的接口
      this.isAdmin = this.setIsAdmin(isAdmin);
      this.message = '';
      var res = await this.getinfo(flowInstanceId);      
      // console.log(flowInstanceId,'待办',nowurl);
      // // var id = 'C87D3CFB-37E4-E7C1-149C-39F5CE359D5F';

      // var url = nowurl ? nowurl + li.flowInstanceId : '/api/baitu-workflows/FlowInstance/detail/'+li.flowInstanceId,
      //   type = 'get',
      //   data = {
      //   };
      // let res = await this.$getaxios(url,type,data);


      if (res) {
        this.processtype = true;
        this.processinfo = res;
        this.btnlist = [];
        this.analysisprocessinfo();
        console.log(
          JSON.parse(Base64.decode(res.instanceDto.dataJson)),
          this.processinfo,
          '表单'
        );
        this.dynamicData = JSON.parse(Base64.decode(res.instanceDto.dataJson));

        this.jsondata = JSON.parse(
          Base64.decode(res.instanceDto.definition.formText)
        );
        for (var item in res.operating.options) {
          console.log(item, '======>', res.operating.options[item]);
          this.btnlist.push({ name: item, value: res.operating.options[item] });
        }
        this.$nextTick(() => {
          //两种方式
          this.dynamicData = JSON.parse(
            Base64.decode(res.instanceDto.dataJson)
          );
          // this.$refs.kfb.setData(this.dynamicData);
        });
      }
    },
    //将图片id转图片url
    analysisprocessinfo(){
      this.processinfo.instanceDto.comments.forEach(comments=>{
        comments.appendixes.forEach(item=>{
          if (item.documentType == 1){
            //原始图
            item.originalImgurl=process.env.VUE_APP_BASIC_API +'resource/baitu-documents/document/map/'+ item.documentId;
            //宽度100的缩略图
            item.imgurl = item.originalImgurl+'?filter=image_w:100';
          } else {
            item.imgurl = process.env.VUE_APP_BASIC_API +'resource/baitu-documents/document/download/'+ item.documentId;
          }
        });
      });
    },
    //图片转url
    async pictureToUrl(id){
      var url =
          '/resource/baitu-documents/document/map/' +
          id,
        type = 'get',
        data2 = {
        };
      let res =  await this.$getaxios(url, type, data2);
      console.log(res);
    },
    //附件转url
    fileToUrl(){

    },
  },
  mounted(){
    console.log(process.env.VUE_APP_BASIC_API,'默认url');
    this.screenWidth = document.body.clientWidth;
    window.onresize = () => {
      return (() => {
        this.screenWidth = document.body.clientWidth;
      })();
    };
  },
};
</script>

<style lang="scss" scoped src="./index.scss" />
