<template>
  <div>
    <div class="comtitle">标题</div>
    <div class="formdesigncont">
      <k-form-build ref="kfb" :value="jsondata" />
    </div>
    <div class="botbutton" @click="submitprocess">
      <combutton title="提交" />
    </div>
  </div>
</template>

<script>
import { mobileAppflowInstance, mobileAppJsonData, financeCanSubmit } from '@/network/url/financingGuarantee.js';
import combutton from '@/components/combutton.vue';
const Base64 = require('js-base64').Base64;
export default {
  components: {
    combutton
  },
  data() {
    return {
      jsondata: {},
      appname: '未命名流程',
      processtype: true,
      versionlist: '',
      postUrl: '',
      type: '',
      datas: {}
    };
  },
  methods: {
    submitprocess() {
      this.$refs.kfb.getData().then(values => {
        console.log('验证通过', values);
        // for (let i in values){
        //   if (values[i] == '' || values[i] == ' '){
        //     this.$toast('请填写完整');
        //     return false;
        //   }
        // }
        (async() => {
          //var data = JSON.parse(JSON.stringify(this.datas));
          var data = this.datas;
          data.businessFlowId = this.appid;
          data.dataJsonBase64 = Base64.encode(JSON.stringify(values));
          // var data={
          //   businessFlowId: this.appid,
          //   dataJsonBase64: Base64.encode(JSON.stringify(values)),
          // };
          const res = await mobileAppflowInstance(this.postUrl, data);
          await financeCanSubmit({
            FinancingGuaranteeId: this.appid
          });
          console.log(res, 'res');
          this.$toast('提交成功');
          this.$router.replace('/guarantee-records');
        })();
      }).catch(() => {
        console.log('验证未通过，获取失败');
        this.$toast('请填写完整信息！');
      });
    },
    //获取json数据
    async getdata() {
      const res = await mobileAppJsonData({
        otherid: this.appid,
        type: this.type
      });
      console.log(res, 'res');
      if (res) {
        this.appname = res.name;
        this.postUrl = res.postUrl;
        this.jsondata = JSON.parse(Base64.decode(res.formText));
        // this.jsondata = JSON.parse(res.formText);
        console.log(this.jsondata);
      }
    }
  },
  mounted() {
    this.appid = this.$route.query.id;
    this.type = this.$route.query.type;
    var $query = this.$route.query;
    for (var key in $query) {
      if (key === 'id' || key === 'type') {
        continue;
      }
      this.datas[key] = $query[key];
    }
    this.getdata();
  }
};
</script>
