<template>
  <div id="agency">
    <comhead headindex="25"/>

    <div class="agencytask" @click="hide1">
      <el-container style="height: 100%; border: 1px solid #eee">
        <appleft lefttype="1"/>
        
        <el-container>
          <el-header style="text-align: left">
            <container-head ref="containerhead" :type="type" />
          </el-header>
          
          <el-main>
            <div class="allbusiness">
              <eachbusiness v-for="(li,index) in waitlist" :tabledata="li" @businesschange="businesschange(li)" :key="index" />
            </div>
            <div v-if="totalCount>10">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="totalCount"
                @current-change="changepage"
              /> 
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
    <nowprocess ref="process2" @refreshlist="refreshdatalist" />
  </div>
</template>

<script>
import comhead from '../../../common/comhead/index.vue';
import appleft from '../appleft/index.vue';
import nowprocess from '../nowprocess/index.vue';
import ContainerHead from '../containerHead';
import eachbusiness from '../eachbusiness';
export default {
  components: {
    comhead,
    appleft,
    nowprocess,
    ContainerHead,
    eachbusiness,
  },
  data() {
    return {
      tableData: [],
      agencytype: 2,
      maxResultCount: 10,
      skipCount: 0,
      totalCount: 0,
      waitlist: [],
      type: 1,
    };
  },
  methods:{
    hide1(){
      this.$refs.process2.closeprocess();
    },
    //分页
    changepage(page){
      console.log(page);
      this.skipCount = (page-1)*this.maxResultCount;
      this.getdatalist();
    },
    //待办详情
    businesschange(li){
      this.$refs.process2.getdatainfo(li.flowInstanceId,1);
    },
    async getdatalist(){
      var url = '/api/baitu-workflows/mailing/wait?MaxResultCount='+this.maxResultCount+'&SkipCount='+this.skipCount,
        type = 'get',
        data = {
        };
      let res = await this.$getaxios(url,type,data);
      console.log(res);
      if (res){
        this.waitlist = res.items;
        this.totalCount = res.totalCount;
        this.$refs.containerhead.getcount(this.totalCount);
      }
    },
    refreshdatalist(){
      this.skipCount = 0;
      this.getdatalist();
    },
  },
  mounted(){
    this.getdatalist();
  },
};
</script>

<style lang="scss" scoped src="./index.scss" />