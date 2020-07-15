<template>
  <div>
    <child-header></child-header>

    <div class="content-box padd">
      <div class="title-bar">
        <span class="title">请选择报名类型</span>
      </div>
      <div class="entry-type">
        <ul v-if="schoolRegisterType === 1">
          <li>
            <div class="item" @click="skip(101)">
              <p class="iconfont iconhukoubanli"></p>
              <p class="name">一类：父母单方在开发区机关事业单位的在职在编人员子女</p>
            </div>
          </li>
          <li>
            <div class="item" @click="skip(102)">
              <p class="iconfont iconhukoubanli"></p>
              <p class="name">二类：具有开发区南明山街道户籍和房产的本地子女</p>
            </div>
          </li>
          <li>
            <div class="item" @click="skip(103)">
              <p class="iconfont iconzhufang"></p>
              <p class="name">三类：在开发区企业工作符合丽水市第一类至第五类高层次人才子女</p>
            </div>
          </li>
          <li>
            <div class="item" @click="skip(104)">
              <p class="iconfont iconzhufang"></p>
              <p class="name">四类：父母单方具有开发区南明山街道户籍的</p>
            </div>
          </li>
          <li>
            <div class="item" @click="skip(105)">
              <p class="iconfont iconzhufang1"></p>
              <p class="name">五类:父母在招生幼儿园周边小区购买房产的新居民子女</p>
            </div>
          </li>
          <li>
            <div class="item" @click="skip(106)">
              <p class="iconfont icongongzuo"></p>
              <p class="name">六类：父母单方缴纳社保一年及以上的</p>
            </div>
          </li>
          <li>
            <div class="item" @click="skip(107)">
              <p class="iconfont icongongzuo"></p>
              <p class="name">七类：开发区学前适龄幼儿</p>
            </div>
          </li>
        </ul>
        <ul v-if="schoolRegisterType === 8">
          <li>
            <div class="item" @click="skip(201)">
              <p class="iconfont iconhukoubanli"></p>
              <p class="name">小班报名（出生在2016年9月1日至2017年8月31日间）</p>
            </div>
          </li>
          <li>
            <div class="item" @click="skip(202)">
              <p class="iconfont iconzhufang"></p>
              <p class="name">托班报名（出生在2017年9月1日至2018年8月31日间）</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <child-footer></child-footer>
  </div>
</template>
<script>
import childHeader from '@/view/components/Header.vue';
import childFooter from '@/view/components/Footer.vue';
export default {
  components: {
    'child-header': childHeader,
    'child-footer': childFooter
  },
  data() {
    return {
      schoolRegisterType: ''
    };
  },
  created() {
    this.schoolRegisterType = this.$route.query.schoolRegisterType - 0;
  },
  methods: {
    skip(businessType) {
      let schoolRegisterType = this.$route.query.schoolRegisterType - 0;
      switch (businessType) {
        case 101:
          sessionStorage.setItem('typeTextDesc', '一类：父母单方在开发区机关事业单位的在职在编人员子女');
          this.$router.push({ path: '/nancheng/kindfill', query: { schoolRegisterType, businessType } });
          break;
        case 102:
          sessionStorage.setItem('typeTextDesc', '二类：具有开发区南明山街道户籍和房产的本地子女');
          this.$router.push({ path: '/nancheng/kindfill', query: { schoolRegisterType, businessType } });
          break;
        case 103:
          sessionStorage.setItem('typeTextDesc', '三类：在开发区企业工作符合丽水市第一类至第五类高层次人才子女');
          this.$router.push({ path: '/nancheng/kindfill', query: { schoolRegisterType, businessType } });
          break;
        case 104:
          sessionStorage.setItem('typeTextDesc', '四类：父母单方具有开发区南明山街道户籍的');
          this.$router.push({ path: '/nancheng/kindfill', query: { schoolRegisterType, businessType } });
          break;
        case 105:
          sessionStorage.setItem('typeTextDesc', '五类:父母在招生幼儿园周边小区购买房产的新居民子女');
          this.$router.push({ path: '/nancheng/kindfill', query: { schoolRegisterType, businessType } });
          break;
        case 106:
          sessionStorage.setItem('typeTextDesc', '六类：父母单方缴纳社保一年及以上的');
          this.$router.push({ path: '/nancheng/kindfill', query: { schoolRegisterType, businessType } });
          break;
        case 107:
          sessionStorage.setItem('typeTextDesc', '七类：开发区学前适龄幼儿');
          this.$router.push({ path: '/nancheng/kindfill', query: { schoolRegisterType, businessType } });
          break;
        case 201:
          sessionStorage.setItem('typeTextDesc', '小班报名（出生在2016年9月1日至2017年8月31日间）');
          this.$router.push({ path: '/lishui/kindfill', query: { schoolRegisterType, businessType } });
          break;
        case 202:
          sessionStorage.setItem('typeTextDesc', '托班报名（出生在2017年9月1日至2018年8月31日间）');
          this.$router.push({ path: '/lishui/kindfill', query: { schoolRegisterType, businessType } });
          break;
      }
    }
  }
};
</script>
