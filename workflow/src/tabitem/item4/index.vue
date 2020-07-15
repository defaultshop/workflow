<template>
  <div class="tabledata" @click="hide">
    
    <div class="tabledatamain">
      <div class="tabledatatop">
        <div class="tabledatatoplt">
          <!-- <div class="tableadd">+添加</div> -->
          <div class="versionallfield"
            :style="{backgroundColor: fieldversion ? '#3671FF' : '#f991ae'}"
            @click.stop="chooseversionfield"
          >
            <span>显示所有</span>
            <i class="el-icon-check" v-if="fieldversion" />
          </div>
          <div class="showfields">
            <div class="fieldsbtn" @click.stop="changefieldtype">
              <i class="el-icon-guide" />
              <span>显示字段</span>
            </div>
            <div class="fieldlists" v-show="fieldtype">
              <div class="search">
                <div>
                  <i class="inco iconfont iconsousuo" />
                </div>
                <div>
                  <input type="text">
                </div>
              </div>
              <div class="allfields">
                <div v-if="fieldlist.length>0" @click.stop="chooseallfield">
                  <el-checkbox v-model="checked" @change="chooseallfield"/>
                  <i>全选</i>
                </div>
                <div v-for="(li,index) in fieldlist" :key="index" @click.stop="changefield(li)">
                  <el-checkbox v-model="li.checked" @change="changefield(li)"/>
                  <i>{{ li.title }}</i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tabledatatoprt">
          <div class="searchfield">
            <!-- <div class="searchbtn senior">高级</div> -->
            <div class="search">
              <input type="text" v-model="searchname" placeholder="搜索"  @keyup.13="submitenter">
            </div>
            <div class="searchbtn" @click="submitenter">搜索</div>
          </div>
          
        
        </div>
      </div>
      <div class="screencriteria">
        <div class="eachscreenc" v-for="(li,index) in contentlist" :key="index">
          <span>{{ li.desc }} {{ li.name }} {{ li.content }}</span>
          <i class="el-icon-close" @click="closescreenc(index)" />
        </div>
        <screenc ref="screenc" @screensave="screendatasave" />
      </div>
      <newtable ref="newtable" :key="timer" :fields="nowfields" :Filter="searchname" @openpress="opennowprocess" :tableid="tableapiurl"  />

      <div class="empty" v-if="emptytype">
        <div>
          <img src="../../assets/img/null.png" alt="">
        </div>
        <div>暂无数据</div>
      </div>
    </div>
    <initiationprocess ref="process" />
  </div>
</template>

<script>
import newtable from './table';
import screenc from './screenc';
import initiationprocess from '../../pages/home/business-management/nowprocess';

export default {
  components:{
    newtable,
    screenc,
    initiationprocess,
  },
  data(){
    return {
      
      checked: false,
      fieldtype: false,
      fieldversion: false,
      timer: '',
      fieldlist:[],
      version: '',
      id: '',
      nowfields: [],
      tableapiurl: {},
      emptytype: false,
      searchname: '',
      contentlist: [],
    };
  },
  methods:{
    hide(){
      this.fieldtype = false;
      // this.$refs.process.cancalprocess();
    },
    opennowprocess(){
      // this.$refs.process.getdata({id:this.id});
    },
    //搜索
    submitenter(){
      this.changetabledata();
    },
    //筛选保存
    screendatasave(content){
      this.contentlist.push(content);
      this.$forceUpdate();
    },
    //删除筛选数据
    closescreenc(index){
      this.contentlist.splice(index,1);
    },
    //是否显示所有版本字段
    chooseversionfield(){
      let title = this.fieldversion ? '是否切换为显示现在版本的字段' : '是否切换为所有版本的字段';
      this.$confirm(title, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$message({
          type: 'success',
          message: '切换成功!',
        });
        this.fieldversion = !this.fieldversion;
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消切换',
        });          
      });
    },
    //全选
    chooseallfield(){
      if (this.checked == false){
        this.checked = true;
        this.fieldlist.forEach(item=>{
          item.checked = true;
        });
      } else {
        this.checked = false;
        this.fieldlist.forEach(item=>{
          item.checked = false;
        });
      }
      this.$forceUpdate();
      this.changetabledata();
      this.whetherSelectAll();
    },
    //选择字段
    changefield(li){
      console.log(li);
      if (li.checked == true){
        li.checked = false;
      } else {
        li.checked = true;
      }
      console.log(li);
      this.whetherSelectAll();
      this.$forceUpdate();
      this.changetabledata();
    },
    whetherSelectAll(){
      let num = 0;
      let emptynum = 0;
      this.fieldlist.forEach(item=>{
        if (item.checked == false){
          num++;
        }
        if (item.checked == true){
          emptynum++;
        }
      });
      if (num > 0){
        this.checked = false;
      } else {
        this.checked = true;
      }
      if (emptynum > 0){
        this.emptytype = false;
      } else {
        this.emptytype = true;
      }
    },
    changefieldtype(){
      if (this.fieldtype == true){
        this.fieldtype = false;
      } else {
        this.fieldtype = true;
      }
    },
    
    async getdatainfo(version,id){
      if (!id){
        return false;
      }
      this.version = version;
      this.id = id;
      if (this.newversionname == '' || this.newversionname == ' '){
        this.$message('请输入新的版本号');
        return false;
      }
      var url = '/api/baitu-workflows/businessFlow/'+id+'/dataDefinition',
        type = 'get',
        data = {
        };
      let res = await this.$getaxios(url,type,data);
      console.log(res);
      if (res){
        this.expresslist = res;
        this.$refs.screenc.getinfo(res);
        this.fieldlist = [];
        res.forEach(item=>{
          this.fieldlist.push({name:item.name,title:item.desc,checked:item.defaultEnabledColumn});
        });
        console.log(this.fieldlist,'fieldlist');
        // this.fieldlist = res;
        this.changetabledata();
      }
      this.whetherSelectAll();
      this.apiurl = '/api/baitu-workflows/businessFlow/'+id+'/data';

    },
    changetabledata(){
      let fieldlist = [];
      this.fieldlist.forEach(item=>{
        if (item.checked == true){
          fieldlist.push({name:item.name,title:item.title,titleClass:'center aligned',dataClass:'center2 aligned2',callback: 'genderLabel'+'|'+item.name});
        }
      });
      this.timer = new Date().getTime();
      this.nowfields = fieldlist;
      this.tableapiurl = {'ver':this.version,'proid':this.id};
      
    },
  },
  created(){
    
  },
};
</script>
<style lang="scss" scoped src="./index.scss">

</style>
