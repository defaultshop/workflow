<template>
  <div class="agencyhead">
    <div>
      <i class="iconfont iconguanbi" />
      <span v-if="this.type === 1">我的待办</span>
      <span v-if="this.type === 2">我发起的</span>
      <span v-if="this.type === 3">我处理的</span>
      <span v-if="this.type === 4">抄送我的</span>
      <span class="num">（共{{ totalCount }}条）</span>
    </div>
    <div>
      <el-popover
        placement="bottom"
        width="400"
        @hide="hide"
        trigger="click"
      >
        <div class="screencriteria">
          <div class="eachscreencriteria" v-for="li in 4" :key="li">
            <div class="criteriatit">
              <div>筛选条件</div>
              <div class="criteriatit-select">
                <span>等于</span>
                <i class="iconfont iconjiantouxia selecticon" />
              </div>
            </div>
            <div class="criteriacont">
              <div>
                <input type="text">
              </div>
              <div>
                <i class="iconfont iconjiantouxia" />
              </div>
            </div>
          </div>

          <div class="screencriteria-btn">
            <div>清空</div>
            <div>筛选</div>
          </div>
        </div>
        <el-button slot="reference" class="addscreenc">
          <i class="iconfont iconshaixuan" />
          <span>筛选条件</span>
        </el-button>
      </el-popover>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    type: Number,
  },
  data(){
    return {
      totalCount: 0,
    };
  },
  methods:{
    //得到个数
    getcount(count){
      this.totalCount = count;
    },
    hide(){

    },
  },
};
</script>
<style lang="scss" scoped src="./index.scss"/>
<style lang="scss">
.screencriteria{
  padding: 0 0 20px;
  .eachscreencriteria{
    margin-bottom: 15px;
    .criteriatit{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 50px;
      line-height: 50px;
      color: #333333;
      .criteriatit-select{
        margin-left: 20px;
        background-color: #F6F8F9;
        color: #3671FF;
        padding: 0 10px;
        border-radius: 3px;
        height: 32px;
        line-height: 32px;
        cursor: pointer;
        .selecticon{
          font-size: 11px;
          margin-left: 8px;
        }
      }
    }
    .criteriacont{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 35px;
      line-height: 35px;
      div{
        border: 1px solid #E5E5E5;
        &:nth-child(1){
          width: 90%; /*写给不支持calc()的浏览器*/
          width: -moz-calc(100% - 50px);
          width: -webkit-calc(100% - 50px);
          width: calc(100% - 50px);
          border-right: none;
          input{
            text-indent: 10px;
            width: 95%;
          }
        }
        &:nth-child(2){
          width: 50px;
          text-align: center;
          color: #3671FF;
          cursor: pointer;
        }
      }
    }
  }
  .screencriteria-btn{
    display: flex;
    justify-content: flex-end;
    height: 35px;
    line-height: 35px;
    margin-top: 60px;
    div{
      padding: 0 30px;
      margin-left: 10px;
      border-radius: 3px;
      cursor: pointer;
      &:nth-child(1){
        border: 1px solid #3671FF;
        color: #3671FF;
      }
      &:nth-child(2){
        background-color: #3671FF;
        color: #fff;
      }
    }
  }
}
</style>

