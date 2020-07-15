<template>
  <div class="newbox">
    <div v-if="this.value.handlers.length == 0">
      <div class="tit wid92">负责人</div>
      <div class="set wid92" @click="showbox">+ {{ spring }}</div>
    </div>
    <div v-else>
      <div class="tit wid92">负责人</div>
      <div class="allname set wid92" @click="showbox">
        <div class="eachname" v-for="(li,index) in this.value.handlers" :key="index">
          <span class="namel">{{ li.displayName.substring(0,1) }}</span>
          <span class="namer">{{ li.displayName }}</span>
        </div>
      </div>
    </div>

    <div class="set2">
      <el-checkbox v-model="cctype" @change="changecctype">启用抄送</el-checkbox>
    </div>
    <div v-if="cctype">
      <div v-if="this.value.ccReceivers.length == 0">
        <div class="set wid92" @click="showpeople">+ {{ spring2 }}</div>
      </div>
      <div v-else>
        <div class="allname set wid92" @click="showpeople">
          <div class="eachname" v-for="(li,index) in this.value.ccReceivers" :key="index">
            <span class="namel">{{ li.displayName.substring(0,1) }}</span>
            <span class="namer">{{ li.displayName }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import boxdata from './boxdata.js';


export default {
  name: 'Newbox',
  props: {
    spring: String,
    spring2: String,
    value: Object,
  },
  data() {
    return {
      cctype: false,
    };
  },
  computed: {
    listData() {
      return boxdata.state.boxname;
    },
    listData2() {
      return boxdata.state.ccpeoplename;
    },
  },
  watch: {
    listData(val) {
      this.value.handlers = val;
      //使用这个表达式进行传值
      this.$emit('input',{
        handlers: this.value.handlers,
        ccReceivers: this.value.ccReceivers,
        ccReceiverstype: this.cctype,
      });
    },
    listData2(val) {
      this.value.ccReceivers = val;
      //使用这个表达式进行传值
      this.$emit('input',{
        handlers: this.value.handlers,
        ccReceivers: this.value.ccReceivers,
        ccReceiverstype: this.cctype,
      });
    },
  },
  methods: {
    //是否启用抄送
    changecctype(type){
      this.cctype = type;
      console.log(type);
      this.value.ccReceiverstype = type;
      if (type == false){
        this.value.ccReceivers = [];
      }
      this.$emit('input',{
        handlers: this.value.handlers,
        ccReceivers: this.value.ccReceivers,
        ccReceiverstype: this.cctype,
      });
    },
    showbox() {
      this.$Messagebox({
        message: '消息',
        vis: true,
        type: 1,
        names: this.value.handlers,
      });
    },
    showpeople(){
      this.$Messagebox({
        message: '消息',
        vis: true,
        type: 2,
        names: this.value.ccReceivers,
      });
    },
  },
  mounted() {
    console.log(this.value,'newbox');
    this.cctype = this.value.ccReceiverstype;
  },
};
</script>

<style lang="scss" scoped src="./newbox.scss"></style>
