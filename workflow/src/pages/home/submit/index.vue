<template>
  <div id="agency">
    <comhead headindex="2"/>

    <div class="agencytask">
      <el-container style="height: 100%; border: 1px solid #eee">
        <appleft />
        
        <el-container>
          <el-header style="text-align: left">
            <div class="agencyhead">
              <div>
                <i class="el-icon-s-fold agencyicon" />
                <span>我发起的</span>
                <span class="num">（共2条）</span>
              </div>
              <div>筛选条件</div>
            </div>
          </el-header>
            
          <el-main>
            <div class="submit">
              <div class="submitfield">
                <div class="tit">自定义表单字段</div>
                <div class="int">
                  <el-input v-model="input" placeholder="请输入内容" />
                </div>
                <div class="tit">自定义表单字段</div>
                <div class="int">
                  <el-select v-model="value" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </div>
              </div>
              <div class="submitbtn">
                <span>提交</span>
              </div>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
import comhead from '../../common/comhead/index.vue';
import appleft from '../business-management/appleft/index.vue';
export default {
  components: {
    comhead,
    appleft,
  },
  data() {
    return {
      input: '',
      options: [{
        value: '选项1',
        label: '黄金糕',
      }, {
        value: '选项2',
        label: '双皮奶',
      }, {
        value: '选项3',
        label: '蚵仔煎',
      }, {
        value: '选项4',
        label: '龙须面',
      }, {
        value: '选项5',
        label: '北京烤鸭',
      }],
      value: '',
    };
  },
};
</script>

<style lang="scss" scoped src="./index.scss" />