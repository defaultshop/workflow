<template>
  <div class="managleft">
    <el-aside width="250px" style="background-color: rgb(238, 241, 246)">
      <el-menu style="height:100%">
        <div class="agencylist">
          <router-link to="/management/addmember">
            <div>添加成员</div>
          </router-link>
          <div>团队设置</div> 
        </div>
        <div class="height10">1</div>
        
        <div class="created">
          <div>已创建的</div>
          <div>
            <i class="el-icon-search" />
            <i class="el-icon-folder-add filed" />
          </div>
        </div>

        <div class="created group">
          <div>
            <i class="el-icon-folder-opened leftfile" />
            <span>分组1</span>
          </div>
          <div>
            <i class="el-icon-more" />
            <i class="el-icon-plus add" />
          </div>
        </div>
        <div class="created business" v-for="li in 3" :key="li">
          <div>
            <span>创建的业务{{ li }}</span>
          </div>
          <div>
            <el-popover placement="bottom" width="6" trigger="click">
              <div class="addcont">
                <div class="now">修改名称</div>
                <div>修改图标</div>
                <div>移动</div>
                <div>删除</div>
              </div>
              <el-button slot="reference">
                <i class="el-icon-more" />
              </el-button>
            </el-popover>
            
            <el-popover placement="right" width="6" trigger="click">
              <div class="addcont">
                <div class="now">新的项目</div>
                <div>新的文件夹</div>
              </div>
              <el-button slot="reference">
                <i class="el-icon-plus add" />
              </el-button>
            </el-popover>
          </div>


        </div>

    
      </el-menu>
    </el-aside> 
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
};
</script>

<style lang="scss" scoped src="./index.scss" />

<style>
.el-popover{
    min-width: 120px;
}
.addcont{
    line-height: 2rem;
    width: 5rem;
    
}
.addcont div{
    border-bottom: 1px dashed #999;
    cursor: pointer;
}
</style>