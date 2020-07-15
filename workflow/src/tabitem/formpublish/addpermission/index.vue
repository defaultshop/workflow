<template>
  <div class="memberbox" v-if="types" :style="{opacity:type == true ? 1 : 0}">
    <div class="shank">1</div>
    <div class="boxcont" :style="{opacity:type == true ? 1 : 0, transform:type == true ? 'scale(1)' : 'scale(0.8)'}">
      <div class="boxtit">
        <div>添加权限组</div>
        <div class="nameclose">
          <i class="el-icon-close" @click="closetype" />
        </div>
      </div>
      <div class="boxprocess">
        <div class="processleft">
          <div :style="{backgroundColor:tabindex === 1 ? '#ffffff' : ''}" @click="changetab(1)">名称信息</div>
          <div :style="{backgroundColor:tabindex === 2 ? '#ffffff' : ''}" @click="changetab(2)">操作权限</div>
          <div :style="{backgroundColor:tabindex === 3 ? '#ffffff' : ''}" @click="changetab(3)">字段权限</div>
          <div :style="{backgroundColor:tabindex === 4 ? '#ffffff' : ''}" @click="changetab(4)">数据权限</div>
        </div>
        <div class="processright">
          <div class="nameinfo" v-show="tabindex === 1">
            <div class="processright-tit">可设置权限组名称和描述信息</div>
            <div class="nameinfoint">
              <input type="text" placeholder="填写权限组名称">
            </div>
            <div class="nameinfotxt">
              <textarea name="" id="" cols="30" rows="10" placeholder="填写描述信息" />
            </div>
          </div>
          <div class="operation" v-show="tabindex === 2">
            <div class="processright-tit">可对流程和数据进行那些操作</div>
            <div>
              <el-checkbox-group v-model="checkedCities" class="allcheck">
                <el-checkbox v-for="city in cities" :label="city" class="eachcheck" :key="city">{{ city }}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="fieldpermiss" v-show="tabindex === 3">
            <div class="processright-tit">可查看和编辑数据的哪些字段</div>
            <div class="fieldtit fieldtit2">
              <div>字段</div>
              <div>可见</div>
              <div>
                <span>可编辑</span>
                <i class="el-icon-warning" />
              </div>
            </div>
            <div>
              <div class="fieldtit">
                <div>全选</div>
                <div>
                  <el-checkbox v-model="checked" />
                </div>
                <div>
                  <el-checkbox v-model="checked" />
                </div>
              </div>
            </div>
          </div>
          <div class="datapermiss" v-show="tabindex === 4">
            <div class="processright-tit">可以查看到哪些数据</div>
          </div>
        </div>
      </div>
      <div class="boxbtn">
        <div>取消</div>
        <div>保存</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    showtype:{
      type: Boolean,
      default: false,
      value: false,
    },
  },
  data() {
    return {
      type: false,
      types: false,
      checked: false,
      tabindex: 1,
      checkedCities: ['上海', '北京'],
      cities: ['查看', '添加', '复制', '编辑', '删除', '调整流程负责人', '结束流程', '激活流程', '批量打印', '批量修改', '导入', '导出'],
    };
  },
  methods: {
    changetype(){
      if (this.type == false){
        this.types = true;
        setTimeout(()=>{
          this.type = true;
        },200);
      } else {
        this.type = false;
        setTimeout(()=>{
          this.types = false;
        },200);
      }
      
    },
    closetype(){
      this.type = false;
      setTimeout(()=>{
        this.types = false;
      },200);
    },
    changetab(type){
      this.tabindex = type;
    },
  },
  mounted() {
    
  },
};
</script>


<style lang="scss" scoped src="./index.scss" />
<style>
.nametree .el-tree-node__content{
    position: relative;   
}
.nametree .el-checkbox{
    position: absolute;
    right: 0;
}
</style>