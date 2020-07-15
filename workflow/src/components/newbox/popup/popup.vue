<template>
  <div id="firstbox" :style="{opacity: vis === true ? 1 : 0}">
    <div class="boxsha" @click="closebtn">1</div>
    <div class="box" :style="{transform: vis == true ? 'scale(1)' : 'scale(0.8)'}">
      <div class="boxhead">
        <div>部门成员列表</div>
        <div class="closebox" @click="closebtn">
          <i class="el-icon-close"/>
        </div>
      </div>
      <div class="boxnowname wid92">
        <div class="eachboxnowname" v-for="(li,index) in selectnames" :key="index">
          <span class="prefix" v-if="li.type == 1">
            <i class="el-icon-s-data"/>
          </span>
          <span class="prefix prefix2" v-if="li.type == 2">
            <i class="el-icon-s-custom"/>
          </span>
          <span class="prefix prefix3" v-if="li.type == 0">
            {{ li.displayName.substring(0,1) }}
          </span>
          <span>{{ li.displayName }}</span>
          <span class="closename" @click="deletenames(li,index)">
            <i class="el-icon-close"/>
          </span>
        </div>
      </div>
      <div class="boxtabnav wid92">
        <div class="tabnavhead">
          <div class="tabnavhead-tit clear">
            <div class="eachtit" v-for="(item,index) in tablist" :key="index" @click="choosetab(item.id)" :style="{borderBottom: tabindex === item.id ? '4px solid #66ccff' : '', color: tabindex === item.id ? '#66ccff' : ''}">
              <span class="eachtitzi" v-if="type == 2 && index == 3">{{ item.people }}</span>
              <span class="eachtitzi" v-else>{{ item.name }}</span>
            </div>
          </div>
          <div class="search">
            <span>搜索</span>
          </div>
        </div>
        <div class="tabnavcont">
          <div class="eachtabnavcont" v-if="tabindex === 1">
            <el-tree :data="organizdata"
              :props="defaultProps"
              accordion
              :expand-on-click-node="false"
              :highlight-current="true"
              node-key="id"
              @node-click="handleNodeClick"
              :default-expanded-keys="defaultShowNodes"
            >
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>
                  <i class="el-icon-s-data" style="margin-right:2px;color:#0DB3A6" />
                </span>
                <span>{{ node.label }}</span>
                <span v-if="false">
                  <i class="el-icon-plus" />
                </span>
              
                <span class="checkbox">
                  <el-checkbox v-model="data.check" v-on:click.native.prevent />
                </span>
              </span>
            </el-tree>
          </div>
          <div class="notabnavcont"  v-if="tabindex === 2">
            <div class="norole" v-if="rolelist.length == 0">
              <div class="noname">没有角色</div>
              <div class="noname">您可在通讯录中新建并分配角色</div>
            </div>
            <div v-else>
              <div class="firsteachlist" v-for="(li,index) in rolelist" :key="index" @click="chooseteam1(li,index)">
                <div>{{ li.name }}</div>
                <div>
                  <Checkbox v-model="li.check" />
                </div>
              </div>
            </div>
          </div>
          <div class="eachtabnavcont clear" v-if="tabindex === 0">
            <div class="leftcont">
              <div class="allpeo" :style="{backgroundColor: leftindex3 === 0 ? '#f5f5f5' : ''}" @click="memberchoose(0)">全部成员</div>
              <!-- <div class="eachpeo" v-for="li in 4" :key="li" @click="memberchoose(li)" :style="{backgroundColor: leftindex3 === li ? '#f5f5f5' : ''}">汪宇彬</div> -->
              <el-tree :data="memberlist"
                :props="defaultProps"
                accordion
                :expand-on-click-node="false"
                :highlight-current="true"
                node-key="id"
                @node-click="NodeClickmember"
                :default-expanded-keys="defaultShowNodes"
              >
                <span class="custom-tree-node" slot-scope="{ node }">
                  <span>
                    <i class="el-icon-s-data" style="margin-right:2px;color:#0DB3A6" />
                  </span>
                  <span>{{ node.label }}</span>
                  <span v-if="false">
                    <i class="el-icon-plus" />
                  </span>
                </span>
              </el-tree>
            </div>
            <div class="rightcont">
              <div class="select">已选 {{ memberchooselist.length }}/1</div>
              <div class="eachpeople" v-for="(li,index) in membernum" :key="index" @click="choosemember(li)">
                <div>
                  <span class="xing">{{ li.fistname }}</span>
                  <span class="name">{{ li.userName }}</span>
                </div>
                <div>
                  <Checkbox v-model="li.check" />
                </div>
              </div>
            </div>
          </div>
          <div class="eachtabnavcont clear" v-if="tabindex === 3">
            <div class="leftcont leftcont1">
              <div class="allpeo" :style="{backgroundColor: leftindex4 === 0 ? '#f5f5f5' : ''}" @click="leaderchoose(0)">流程发起人</div>
              <div class="allpeo" :style="{backgroundColor: leftindex4 === 1 ? '#f5f5f5' : ''}" @click="leaderchoose(1)">主管</div>
            </div>
            <div class="rightcont rightcont2" v-if="leftindex4 === 0">
              <div class="eachpeople">
                <div>
                  <span class="name">流程发起人</span>
                </div>
                <div>
                  <Checkbox v-model="single40" />
                </div>
              </div>
            </div>
            <div class="leftcont leftcont3" v-if="leftindex4 === 1">
              <div class="allpeo" :style="{backgroundColor: centerindex41 === 0 ? '#f5f5f5' : ''}">发起人</div>
            </div>
            <div class="rightcont rightcont3" v-if="leftindex4 === 1">
              <div class="eachpeopletit">发起人的主管级别:</div>
              <div class="eachpeople">
                <div>
                  <span class="name">直接部门主管</span>
                </div>
                <div>
                  <Checkbox v-model="single41" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="boxfoot wid92">
        <div class="maillist">通讯录</div>
        <div class="rightbtn clear">
          <div class="yes" @click="surebtn">确认</div>
          <div class="no" @click="closebtn">取消</div>
        </div>
      </div>
      <!-- <div class="btn" @click="closebtn">点击关闭</div> -->
    </div>

    
  </div>
</template>

<script>
import boxdata from '../boxdata.js';
export default {
  props: [
    'name',
  ],
  data() {
    return {
      message: 'none',
      vis: false,
      type: 1,
      checked: false,
      names: [],
      nownameid: -1,
      tablist: [{ name: '组织架构',people: '', id:1 }, { name: '角色',people: '', id: 2 }, { name: '成员',people: '', id: 0 }, { name: '动态负责人',people: '动态抄送人', id: 3 }],
      selectnames: [],
      list1:[{name: '汪宇彬',id: 1,check: false}, {name: '张茜',id: 2,check: false}, {name: '汪汪',id: 3,check: false}, {name: '鱼鱼',id: 4,check: false}],
      tabindex: 1,
      single: false,
      single3: false,
      single40: false,
      single41: false,
      leftindex3: 0,
      leftindex4: 0,
      centerindex41: 0,
      boxtype: false,
      organizdata: [],
      defaultProps: {
        children: 'children',
        label: 'displayName',
      },
      defaultShowNodes: [],
      rolelist: [],
      memberlist: [],
      membertotal: 1,
      membernum: [],
      memberchooselist: [],
      originaldata: [],
    };
  },
  methods: {
    //选择tab切换
    choosetab(id){
      this.tabindex = id;
      if (id == 0){
        this.getmemberinfo(this.memberlist[0].id);
      }
    },
    //成员-左边-选择分类
    memberchoose(li){
      this.leftindex3 = li;
    },
    //动态负责人-左边-选择分类
    leaderchoose(li){
      this.leftindex4 = li;
    },
    //已选列表删除
    deletenames(li,index){
      console.log(li,index);
      
      if (li.type == 1){
        const nowindex = this.getindex(this.originaldata,li.id);
        this.originaldata[nowindex].check = false;
        let arr = this.deletetreeindex(this.originaldata); 
        this.organizdata = arr;
        console.log(nowindex,this.organizdata);
        // this.organizdata = nowindex;
      } else if (li.type == 2){
        const nowindex = this.getindex(this.rolelist,li.id);
        this.rolelist[nowindex].check = false;
      } else if (li.type == 3){
        const nowindex2 = this.getindex(this.memberchooselist,li.id);
        this.memberchooselist.splice(nowindex2,1);
        const nowindex = this.getindex(this.membernum,li.id);
        this.membernum[nowindex].check = false;
      }
      this.selectnames.splice(index,1);
    },
    //成员
    NodeClickmember(data){
      console.log(data);
      this.getmemberinfo(data.id);
    },
    //成员-右
    async getmemberinfo(id){
      var url = '/api/baitu-organization-units/organizationUnit/users?maxResultCount=10&skipCount=0&organizationUnitId='+id,
        type = 'get',
        data = {
        };
      let res = await this.$getaxios(url,type,data);
      if (res){
        console.log(res);
        this.membernum = res.items;
        this.membernum.forEach(item=>{
          item.check = false;
          item.fistname = item.userName.substring(0,1);
          this.memberchooselist.forEach(ltitem=>{
            if (item.userId == ltitem.id){
              item.check = true;
            }
          });
        });
        this.membertotal = res.totalCount;
      }
    },
    //成员-右-选择
    choosemember(li){
      console.log(li);
      if (li.check == false){
        li.check = true;
        this.selectnames.push({type:0,displayName:li.userName,id:li.userId});
        this.memberchooselist.push({type:0,displayName:li.userName,id:li.userId});
      } else {
        li.check = false;
        var nowindex = this.getindex(this.selectnames,li.userId);
        this.selectnames.splice(nowindex,1);
        var nowindex2 = this.getindex(this.memberchooselist,li.userId);
        this.memberchooselist.splice(nowindex2,1);
      }
    },
    //角色选择
    chooseteam1(li){
      console.log(li.check);

      if (li.check == false){
        li.check = true;
        this.selectnames.push({type:2,displayName:li.name,id:li.id});
      } else {
        li.check = false;
        var nowindex = this.getindex(this.selectnames,li.id);
        this.selectnames.splice(nowindex,1);
      }
    },
    //选中再删除
    getindex(list,id){
      var index = -1;
      for (var i = 0; i<list.length;i++){
        // console.log(list[i].id == id,list[i].id , id);
        var nowid = list[i].id || list[i].userId;
        if (nowid == id){
          index = i;
        }
      }
      return index;
    },
    //树形结构遍历查找
    deletetreeindex(arr){
      // 删除所有的children,以防止多次调用
      arr.forEach(function(item) {
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
      return treeData;
    },
    closebtn() {
      console.log(this.message);
      this.$Messagebox({
        message: '空',
        vis: false,
        names: [],
      });
    },
    surebtn() {
      if (this.type == 1){
        boxdata.state.boxname = this.selectnames;
      } else if (this.type == 2){
        boxdata.state.ccpeoplename = this.selectnames;
      }
      this.$Messagebox({
        message: '空',
        vis: false,
        names: [],
      });
    },
    //组织单元
    async organizational(){
      var url = '/api/baitu-organization-units/organizationUnit',
        type = 'get',
        data = {

        };
      let res = await this.$getaxios(url,type,data);
      if (res){
        console.log(res);
        const arr = res;
        this.organizdata = this.setTreeData(arr);
        this.memberlist = this.organizdata;
        this.originaldata = [].concat(res);
      }
    },
    //树形结构整理
    setTreeData(arr) {
      // 删除所有的children,以防止多次调用
      arr.forEach(item=> {
        item['check'] = false;
        delete item.children;
        this.selectnames.forEach(selitem=>{
          if (item.id == selitem.id){
            item['check'] = true;
          }
        });
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
        this.defaultShowNodes.push(item.id);
      });
      return treeData;
    },
    handleNodeClick(data){
      console.log(data);
      // data.check = !data.check;
      if (data.check == false){
        data.check = true;
        this.selectnames.push({type:1,displayName:data.displayName,id:data.id});
      } else {
        data.check = false;
        var nowindex = this.getindex(this.selectnames,data.id);
        this.selectnames.splice(nowindex,1);
      }
      this.$forceUpdate();
      // this.selectnames = [];
    },
    async getrole(){
      var url = '/api/identity/roles/all',
        type = 'get',
        data = {

        };
      let res = await this.$getaxios(url,type,data);
      console.log(res,'role');
      if (res){
        this.rolelist = res.items;
        this.rolelist.forEach(item=>{
          item.check = false;
          this.selectnames.forEach(selitem=>{
            if (item.id == selitem.id){
              item.check = true;
            }
          });
        });
      }
    },
  },
  mounted() {
    console.log(this.vis,'vis');
    var arr = [].concat(this.names);
    this.selectnames = arr;
    this.selectnames.forEach(item=>{
      if (item.type == 0){
        this.memberchooselist.push(item);
      }
    });
    
    this.organizational();
    this.getrole();
  },
};
</script>

<style lang="scss" scoped src="./popup.scss">

</style>
<style>
#firstbox .el-tree-node__content>label.el-checkbox{
  position: absolute;
  right: 0;
}
</style>