<template>
  <div>
    <comhead headindex="1" ref="comhead" />

    <div id="home" @click="hide">
      <div class="myapp">
        <div class="myapphead">
          <div class="leftapp">
            <span>我的应用</span>
            <!-- <a @click.stop="workflowformdesign">
              <span class="addapp">添加应用</span>
            </a> -->
            
          </div>
          <div class="int">
            <i class="iconfont iconsousuo searchicon" />
            <input type="text" placeholder="搜索" v-model="Filter" @keyup.13="submitenter">
            <span class="intbtn" @click="submitenter">搜索</span>
          </div>
        </div>
        <div class="allapplica">
          <div class="eachapplica" v-for="(li,index) in myapplist" :key="index">
            <div class="applicaInitiation" v-if="li.hasEnabled" @click.stop="initiation(li)">
              发起流程
            </div>
            <div class="applicaicon">
              <img src="../../../assets/img/appicon.png" alt="">
            </div>
            <div class="applicaname">
              <span>{{ li.name }}</span>
            </div>
            <div class="applicaplace">
              <span>{{ li.desc }}</span>
            </div>
            <div class="settingapplca"  @mouseleave="mouseLeave(li,index)">
              <div class="applca1" @click.stop="changeappname(li)">管理应用</div>
              <div class="applca2" @click.stop="settingmyapp(li,index)">
                <i class="el-icon-setting" />
                <span>设置</span>
              </div>
              <div class="changeapp" v-show="li.setting">
                <div @click.stop="changename(li)">
                  <span>修改名称</span>
                </div>
                <div @click.stop="changedesc(li)">
                  <span>修改描述</span>
                </div>
                <div>
                  <span>复制应用</span>
                </div>
                <div>
                  <span @click="deleteapp(li)">删除应用</span>
                </div>
              </div>
            </div>
          </div>
          <div class="eachapplica eachapplicaadd"  @click.stop="workflowformdesign">
            <div>
              <i class="el-icon-plus" />
              <span> 创建新应用</span>
            </div>
          </div>
        </div>

        <div v-if="totalCount>maxResultCount">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="totalCount"
            @current-change="changepage"
          />
        </div>
      </div>
    </div>
    <initiationprocess ref="process" />
  </div>
</template>

<script>
import comhead from '../../common/comhead/index.vue';
import initiationprocess from '../initiationprocess/index.vue';
export default {
  name: 'home',
  components: {
    comhead,
    initiationprocess,
  },
  data() {
    return {
      value1: true,
      apptype: false,
      maxResultCount: 10,
      skipCount: 0,
      Sorting: '',
      Filter: '',
      CollectionId: '',
      myapplist: [],
      totalCount: 0,
    };
  },
  methods:{
    //搜索
    submitenter(){
      this.getinfo();
    },
    hide(){
      this.myapplist.forEach(item=>{
        item.setting = false;
      });
      this.$refs.comhead.headhide();
      this.$forceUpdate();
      this.$refs.process.cancalprocess();
    },
    //修改描述
    changedesc(li){
      this.$prompt('请输入项目描述', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: li.desc,
      }).then(({ value }) => {
        (async()=>{
          var url = '/api/baitu-workflows/businessFlow/'+li.id,
            type = 'put',
            data = {
              name: li.name,
              desc: value,
              type: li.type,
            };
          let res = await this.$getaxios(url,type,data);
          console.log(res);
          if (res){
            this.$message({
              type: 'success',
              message: '修改成功',
            });
            this.getinfo();
          }
        })();
        
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入',
        });       
      });
    },
    //修改名称
    changename(li){
      this.$prompt('请输入名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: li.name,
      }).then(({ value }) => {
        (async()=>{
          var url = '/api/baitu-workflows/businessFlow/'+li.id,
            type = 'put',
            data = {
              name: value,
              desc: li.desc,
              type: li.type,
            };
          let res = await this.$getaxios(url,type,data);
          console.log(res);
          if (res){
            this.$message({
              type: 'success',
              message: '修改成功',
            });
            this.getinfo();
          }
        })();
        
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入',
        });       
      });
    },
    //发起流程
    initiation(li){
      console.log(li);
      this.$refs.process.getdata(li);
    },
    workflowformdesign(){
      this.$router.push('/workflowformdesign');
    },
    //修改应用名称
    async changeappname(li){
      this.$router.push({path:'/workflowformdesign', query: { type:1, id:li.id }});
    },
    //删除应用
    deleteapp(li){
      console.log(li);
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        (async() => {
          var url = '/api/baitu-workflows/businessFlow/'+li.id,
            type = 'delete',
            data = {
            };
          let res = await this.$getaxios(url,type,data);
          console.log(res);
          if (res){
            this.$message({
              type: 'success',
              message: '删除成功!',
            });
            this.getinfo();
          }
        })();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        });          
      });
    },
    //分页
    changepage(page){
      console.log(page);
      this.skipCount = (page-1)*this.maxResultCount;
      this.getinfo();
    },
    mouseLeave(li){
      li.setting = false;
      this.$forceUpdate();
    },
    //设置
    settingmyapp(li,index){
      this.myapplist.forEach((item,itemindex)=>{
        if (itemindex != index){
          item.setting = false;
        }
      });
      if (li.setting == true){
        li.setting = false;
      } else {
        li.setting = true;
      }
      console.log(li.setting);
      this.$forceUpdate();
    },
    changeswitch(type){
      this.$forceUpdate();
      console.log(type);
    },
    async getinfo(){
      var url = '/api/baitu-workflows/businessFlow?MaxResultCount='+this.maxResultCount+
      '&SkipCount='+this.skipCount+'&Sorting='+this.Sorting+'&Filter='+this.Filter+'&CollectionId='+this.CollectionId,
        type = 'get',
        data = {
          // 'MaxResultCount': this.maxResultCount,
          // 'SkipCount': this.skipCount,
          // 'Sorting':this.Sorting,
          // 'Filter': this.Filter,
          // 'CollectionId': this.CollectionId,
        }
        ;
      let res = await this.$getaxios(url,type,data);
      if (res){
        this.myapplist = res.items;
        this.totalCount = res.totalCount;
        if (this.myapplist){
          this.myapplist.forEach(item=>{
            item.type = false;
            item.setting = false;
            item.admin = false;
          });
        }
        
        console.log(this.myapplist);
      }
    },
  },
  mounted(){
    this.getinfo();
  },
};
</script>

<style lang="scss" scoped src="./index.scss" />