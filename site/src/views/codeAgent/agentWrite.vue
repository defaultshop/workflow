<template>
  <div class="backimg">
    <div class="backtitle" style="font-size:0.32rem">
      <span v-if="showtype">填写您要代办的事项及相关诉求</span>
      <span v-if="!showtype">{{appinfo.name}}服务指南</span>
    </div>
    <div class="noticecont" style="bottom:1.6rem" v-if="showtype">
      <div class="writetit">事项信息</div>
      <div class="writeint">
        <div>事项名称</div>
        <div>
          <input type="text" placeholder="请填写事项名称" v-model="appinfo.name" readonly>
        </div>
      </div>
      <div class="writeint">
        <div>事项类型</div>
        <div>
          <input type="text" placeholder="请填写事项类型" v-model="appinfo.type" readonly>
        </div>
      </div>

      <div class="writetit">企业信息</div>
      <div class="writeint">
        <div>企业名称</div>
        <div>
          <input type="text" placeholder="请填写企业名称" v-model="appinfo.name.enterprise" readonly>
        </div>
      </div>
      <div class="writeint">
        <div>联系人</div>
        <div>
          <input type="text" placeholder="请填写联系人" v-model="name">
        </div>
      </div>
      <div class="writeint">
        <div>联系电话</div>
        <div>
          <input type="text" placeholder="请填写联系电话" v-model="phone">
        </div>
      </div>

      <div class="writetit">代办说明</div>
      <div class="writetextarea">
        <div>代办事由</div>
        <div>
          <textarea name="" id="" cols="10" rows="5" v-model="matter" placeholder="请填写代办事由"></textarea>
        </div>
      </div>
      <div class="writetextarea">
        <div>问题描述</div>
        <div>
          <textarea name="" id="" cols="10" rows="5" v-model="describe" placeholder="请填写问题描述"></textarea>
        </div>
      </div>
    </div>
    <div class="noticecont" style="bottom:1.6rem" v-if="!showtype">
      <div style="padding:0.32rem;text-align:left" v-html="appinfo.guide"></div>
    </div>

    <div class="positionbtn" @click="suresubmit" v-if="showtype">
      <combutton title="立即提交" />
    </div>
    <div class="positionbtn" @click="showtype = true" v-if="!showtype">
      <combutton title="我要代办" />
    </div>
  </div>
</template>

<script>
import combutton from '@/components/combutton.vue';
import { matterApplicationGet, matterSubmittedApplicationPost } from '@/network/url/codeAgent.js';
export default {
  components: {
    combutton
  },
  data() {
    return {
      showtype: false,
      id: '',
      appinfo: {
        name: '',
        type: '',
        enterprise: ''
      },
      name: '',
      phone: '',
      matter: '',
      describe: ''
    };
  },
  methods: {
    //立即提交
    async suresubmit() {
      if (this.name === '' || this.name === ' ') {
        this.$toast('请填写联系人');
        return false;
      }
      const mobilereg = /^[1][0-9]{10}$/;
      if (!mobilereg.test(this.phone)) {
        this.$toast('请填写正确的联系电话');
        return false;
      }
      if (this.matter === '' || this.matter === ' ') {
        this.$toast('请填写代办事由');
        return false;
      }
      if (this.describe === '' || this.describe === ' ') {
        this.$toast('请填写问题描述');
        return false;
      }
      await matterSubmittedApplicationPost({
        matterId: this.id,
        contactName: this.name,
        contactMobile: this.phone,
        reason: this.matter,
        content: this.describe
      }).then(res => {
        console.log(res);
        this.$toast('提交成功');
        this.$router.replace('/resultsuccess');
      });
    },
    //获取详情
    async getappinfo() {
      const res = await matterApplicationGet({
        otherid: this.id
      });
      console.log(res);
      if (res) {
        this.appinfo = res;
        this.appinfo.enterprise = this.$store.state.config.currentUser.entName;
        this.appinfo.guide = this.appinfo.guide.replace(/\n|\s/g, '<br/>');
      }
    }
  },
  created() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id;
    }
    this.getappinfo();
  }
};
</script>
