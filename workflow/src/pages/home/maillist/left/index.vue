<template>
  <div class="mailleft">
    <el-aside width="250px" style="background-color: rgb(238, 241, 246);height:100%">
      <el-menu style="height:100%;position:relative">
        <div class="topteam">
          <div class="tabteam">
            <div :style="{backgroundColor:tabindex === 1 ? '#3671FF' : '',color:tabindex == 1 ? '#fff' : ''}" @click="changetab(1)">组织结构</div>
            <div :style="{backgroundColor:tabindex === 2 ? '#3671FF' : '',color:tabindex == 2 ? '#fff' : ''}" @click="changetab(2)">角色</div>
          </div>
          <!-- <div class="addorgan" v-if="tabindex === 1">
            <div>新增组织</div>
            <div @click="addrole">新增部门</div>
          </div> -->
          
        </div>
        <div class="botteam botteampart" v-if="tabindex === 1">
          <div class="allpart" :style="{backgroundColor:currentnodeid == -1 ? '#e6f7f6' : ''}" @click="showallpart">全部成员</div>
          <el-tree :data="data"
            :props="defaultProps"
            ref="menutree"
            accordion 
            :expand-on-click-node="false" 
            :highlight-current="true" 
            node-key="id"
            :current-node-key="currentnodeid"
            :default-expanded-keys="defaultShowNodes"
            @node-collapse="closetreeclick" 
            @node-expand="opentreeclick" 
            @node-click="handleNodeClick"
          >

            <span class="custom-tree-node" slot-scope="{ node, data }" @mouseenter="enter(data,node)" @mouseleave="leave(data,node)">
              <span>

                <i class="iconfont iconzuzhi nodeicon" />
              </span>
              <span>{{ node.label }}</span>
              <span v-if="false">
                <i class="el-icon-plus" @click="() => append(data)" />
              </span> 
              
              <span v-if="data.id == nowid || data.id == moveid">
                <i class="el-icon-plus addicon" @click="() => append(data)" />
                <i class="el-icon-edit addicon" @click="() => edit(node, data)" />
                <i class="el-icon-delete addicon" @click="() => remove(node, data)" />
              </span>
            </span>
          </el-tree>
        </div>

        <div class="botteam botteamrole" v-if="tabindex === 2">
          <div class="addorgan" v-if="tabindex === 2">
            <div>创建的角色</div>
            <div>
              <i class="el-icon-plus" @click="addroles" />
            </div>
          </div>
          <div class="partmentitem1">
            <div class="eachpartment eachpartment2"
              :style="{
                backgroundColor:roleindex == index ? 'rgb(175, 224, 249)' : '',
                color:roleindex == index ? '#fff' : ''
              }" 
              v-for="(li,index) in rolesData" :key="index"
              @click="chooserole(li,index)"
            >
              <i class="el-icon-s-custom" 
                :style="{
                  color:roleindex == index ? '#fff' : ''
                }"
              />
              <span>{{ li.name }}</span>
              <el-popover
                placement="bottom-start"
                width="100"
                
                @hide="hide"
                trigger="click"
              >
                <div class="roleaddmore">
                  <div @click="changeroles(li)">修改</div>
                  <div>删除</div>
                </div>
                <el-button slot="reference" class="addscreenc" v-show="li.check">
                  <i class="el-icon-s-operation more"
                    :style="{
                      color:roleindex == index ? '#fff' : ''
                    }"
                  />
                </el-button>
              </el-popover>     
              
            </div>
          </div>
        </div>
      </el-menu>
    </el-aside>
    <editdepartment ref="editdepartment" @dataRefresh="dataRefresh" />

    <editrole ref="edit" @rolesinfo="getrolesinfo" />
  </div>
</template>

<script>
// import addroles from './addroles.vue';
import editdepartment from '../editdepartment/index.vue';
import editrole from '../editrole/index.vue';
export default {
  components:{
    editdepartment,
    editrole,
  },
  props:{
    lefttype:{
      type: Number,
      default: 1,
      visible: true,
    },
  },
  data() {
    return {
      tabindex: 1,
      data: [],
      defaultProps: {
        children: 'children',
        label: 'displayName',
      },
      defaultShowNodes: [],
      nowid: '',
      moveid: '',
      rolesData: '',
      roleindex: -1,
      nowchooserole: {id:''},
      nodedata: '',
      originaldata: [],
      currentnodeid: -1,
    };
  },
  methods: {
    hide(){

    },
    //全部成员
    showallpart(){
      this.$nextTick(()=>{
        this.$refs.menutree.setCheckedKeys([]);
        this.$refs.menutree.setCurrentKey(null);
        this.currentnodeid = '-1';
      });
      this.$emit('showallpart');
      
    },
    //数据刷新
    dataRefresh(){
      this.getpage();
    },
    chooserole(li,index){
      console.log(li,index,'choose');
      this.rolesData.forEach(item=>{
        item.check = false;
      });
      li.check = true;
      this.roleindex = index;
      this.$emit('roleinfo',li);
      this.$forceUpdate();
    },
    //修改角色
    changeroles(li){
      this.$refs.edit.addnewrole('编辑',li);
    },
    //新增角色
    addroles(){
      this.$refs.edit.addnewrole('添加');
    },
    //节点选择-点击
    handleNodeClick(data) {
      this.skipCount = 0;
      this.nodedata = data;
      console.log(data);
      this.nowid = data.id;
      this.currentnodeid = data.id;
      this.$emit('transmitinfo',data);
    },
    closetreeclick(data,node,event){
      data.check = false;
      console.log(data,node,event);
    },
    opentreeclick(data,node,event){
      data.check = true;
      console.log(data,node,event);
    },
    //节点添加
    append(nodedata) {
      this.$refs.editdepartment.openbox(nodedata,1);
    },
    //节点修改
    edit(node,data){
      this.$refs.editdepartment.openbox(data,2);

      // console.log(node, data);
      // const parent = node.parent;
      // const children = parent.data.children || parent.data;
      // const index = children.findIndex(d => d.id === data.id);
      
      // this.$prompt('请输入名称', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   inputValue: data.displayName,
      // }).then(({ value }) => {
      //   this.edituser(value,data.id);
      //   children[index].displayName = value;
        
      // }).catch(() => {
     
      // });
    },
    async edituser(val,ids){
      var url = '/api/baitu-organization-units/organizationUnit/reName',
        type = 'post',
        data = {
          displayName: val,
          id: ids,
        };
      let res = await this.$getaxios(url,type,data);
      console.log(res);

      this.$message({
        type: 'success',
        message: '修改成功',
      });
    //   if (res){
    //     console.log(res);
    //     this.userlist = res.items;
    //     this.usertotal = res.totalCount;
    //     this.limits = true;
    //   }
    },
    //节点删除
    async remove(node, data) {
      console.log(node, data);
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
      var url = '/api/baitu-organization-units/organizationUnit?id='+data.id,
        type = 'delete',
        datas = {

        };
      let res = await this.$getaxios(url,type,datas);
      console.log(res);
    },
    //鼠标离开
    leave(data,node){
      console.log(data,node);
      this.moveid = '';
    },
    //鼠标经过
    enter(data,node){
      console.log(data,node);
      this.moveid = data.id;
    },
    changetab(type) {
      this.tabindex = type;
      if (type == 2){
        this.$router.push('/home/mailrole');
      } else if (type == 1){
        this.$router.push('/home/maillist');
      }
    },
    changetree(e){
      console.log(e.currentTarget.getAttributeNode('item'));
    },
    //新增角色
    addrole(){
      this.$emit('departmentclick');
    },
    //获取组织结构
    async getpage(){
      var url = '/api/baitu-organization-units/organizationUnit',
        type = 'get',
        data = {

        };
      let res = await this.$getaxios(url,type,data);
      if (res){
        console.log(res);
        var arr = res;
        
        this.data = this.setTreeData(arr);
        this.originaldata = arr;
        this.$nextTick(()=>{
          this.$refs.menutree.setCurrentKey(res[0].id);
          this.currentnodeid = res[0].id;
        });
        if (this.nodedata != ''){
          this.$emit('transmitinfo',this.nodedata);
        } else {
          this.$emit('transmitinfo',res[0]);
        }
        
      }
    },
    //树形结构整理
    setTreeData(arr) {
      this.defaultShowNodes = [];
      // 删除所有的children,以防止多次调用
      arr.forEach(function(item) {
        let check = false;
        
        item['check'] = check;
        delete item.children;
      });
      let map = {}; //构建map
      arr.forEach(i => {
        map[i.id] = i; //构建以id为键 当前数据为值
      });
      let treeData = [];
      arr.forEach(child => {
        const mapItem = map[child.parentId]; //判断当前数据的parentId是否存在map中
        if (mapItem) {
          //存在则表示当前数据不是最顶层的数据
          //注意： 这里的map中的数据是引用了arr的它的指向还是arr,当mapItem改变时arr也会改变，踩坑点
          (mapItem.children || (mapItem.children = [])).push(child); //这里判断mapItem中是否存在child
        } else {
          //不存在则是顶层数据
          treeData.push(child);
        }
      });
      console.log(treeData,'treeData');
      treeData.forEach(item => {
        let check = true;
        this.data.forEach(rt=>{
          if (rt.id == item.id){
            check = rt.check;
          }
        });
        item['check'] = check;
        this.defaultShowNodes.push(item.id);
      });
      return treeData;
    },
    //获取角色列表
    async getrolesinfo(){
      var url = '/api/identity/roles/all?skipCount=0&maxResultCount=10&sorting=name asc',
        type = 'get',
        data = {
          sorting: 'name asc',
          skipCount: 0,
          maxResultCount: 10,
        };
      let user = await this.$getaxios(url,type,data);
      console.log(user,'user');
      this.rolesData = user.items;
      this.rolesData.forEach(item=>{
        item.check = false;
      });
      this.rolesData[0].check = true;
      this.roleindex = 0;
      this.$emit('roleinfo',this.rolesData[0]);
    },
  },
  mounted() {
    this.tabindex = this.lefttype;
    if (this.tabindex == 1){
      this.getpage();
    } else {
      this.getrolesinfo();
    }
    
  },
};
</script>

<style lang="scss" scoped src="./index.scss" />
<style lang="scss">
.mailleft .botteam .el-tree-node__content:hover{
  background-color: #e6f7f6;
}
.mailleft .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
  background: #e6f7f6;
}
</style>