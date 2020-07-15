<template>
  <div>
    <el-popover
      placement="bottom"
      width="400"
      v-model="visible"
      @hide="hide"
      trigger="click"
    >
      <div class="screencmain">
        <div class="screenctit">编辑筛选</div>
        <div class="screencfield">
          <div class="field">
            <div class="fieldtit">字段</div>
            <div class="addcondition">
              <input type="text" v-model="leftvalue" @focus="conditionfocus" placeholder="首先选择字段">
              <i class="el-icon-arrow-down fieldicon" @click="showconditiontype" />
              <div class="conditionlist" v-show="conditiontype">
                <div class="eachcond" v-for="(li,index) in expresslist" :key="index">
                  <div class="eachcondcont" @click="choosetleftif(li)">
                    <span>{{ li.desc }}</span>
                    <b class="iconi" v-if="li.seltype&&li.children.length>0" @click.stop="choosechilren(li)">
                      <i class="el-icon-arrow-up" />
                    </b>
                    <b class="iconi" v-if="!li.seltype&&li.children.length>0" @click.stop="choosechilren(li)">
                      <i class="el-icon-arrow-down" />
                    </b>
                      
                    
                  </div>
                  <div v-if="li.seltype">
                    <div class="eachcond" v-for="(item,ltindex) in li.children" :key="ltindex">
                      <div class="eachcondcont" style="padding:0 20px" @click="choosetrightif(li,item)">
                        <span>{{ item.desc }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="operator">
            <div class="fieldtit">运算符</div>
            <div class="fieldselect">
              <el-select v-model="value"  value-key="id" filterable placeholder="请选择"  @change="selectchange">
                <el-option
                  v-for="item in operators"
                  :key="item.name"
                  :label="item.name"
                  :value="item"
                />
              </el-select>
            </div>
          </div>
        </div>

        <div class="screencvalue" v-if="value">
          <div class="screencvalue-tit">值</div>
          <div style="border:none" class="eachpressbot" v-if="rightvalue.rightFieldValueType == 3">
            <el-date-picker
              v-model="rightvalue.content"
              type="date"
              placeholder="选择日期"
              @change="timechange"
            />
          </div>
          <div class="eachpressbot" v-if="rightvalue.rightFieldValueType == 1">
            <input type="text" v-model="rightvalue.content">
          </div>
          <div class="eachpressbot" v-if="rightvalue.rightFieldValueType == 2">
            <input type="number" v-model="rightvalue.content">
          </div>
          <div v-if="rightvalue.rightFieldValueType == 4">
            <div class="eachpressbottype4" v-for="(item,ltindex) in rightvalue.content" :key="ltindex">
              <div class="eachpressbot">
                <input type="text" v-model="item.value">
              </div>
              <div>
                <i class="el-icon-plus" @click="plusrightcontent(item,ltindex)" />
              </div>
              <div>
                <i class="el-icon-delete-solid" @click="delrightcontent(item,ltindex)" />
              </div>
            </div>
            
          </div>
          <div class="screencvalue-select" v-if="rightvalue.rightFieldValueType == 5">
            <el-select v-model="rightvalue.content" filterable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>

        <div class="screencbtn">
          <div>
            <span @click="visible = false">取消</span>
          </div>
          <div @click="preservation">保存</div>
        </div>
      </div>
      <el-button slot="reference" class="addscreenc">+ 添加筛选</el-button>
    </el-popover>
  </div>
</template>

<script>
export default {
  data(){
    return {
      visible: false,
      conditiontype: false,
      expresslist: [],
      options: [],
      value: '',
      operators: [],
      leftvalue: '',
      rightcontent: '',
      rightvalue: {type:'',leftFieldValueType:'',name:'',operator:'',rightFieldValueType:'',content:''},

    };
  },
  methods:{
    //隐藏时触发
    hide(){
      this.datainit();
    },
    //保存
    preservation(){
      console.log(this.rightvalue,this.rightcontent,'rightvalue');
      if (this.rightvalue.content != '' && this.rightvalue.content != ' '){
        this.$emit('screensave',this.rightvalue);
      }
      this.visible = false;
      this.datainit();
    },
    //清空数据
    datainit(){
      this.value = '';
      this.operators = '';
      this.leftvalue = '';
      this.rightvalue = {type:'',leftFieldValueType:'',name:'',operator:'',rightFieldValueType:'',content:''};
    },
    //得到焦点
    conditionfocus(){
      this.conditiontype = true;
    },
    //失去焦点
    conditionblur(){
      this.conditiontype = false;
    },
    //数组数据-删除
    delrightcontent(li,index){
      li.content.splice(index,1);
      this.$forceUpdate();
    },
    //数组数据-添加
    plusrightcontent(li,index){
      li.content.splice(index+1,'',{value:''});
      this.$forceUpdate();
    },
    //选择运算符
    selectchange(value){
      console.log(value);
      this.rightvalue = value;
      this.rightvalue.desc = this.leftvalue;
      if (value.rightFieldValueType == 4){
        this.rightvalue.content = [{value:''}];
      } else {
        this.rightvalue.content = '';
      }
    },
    choosetrightif(li,item){
      this.operators = [];
      this.rightvalue = {type:'',leftFieldValueType:'',name:'',operator:'',rightFieldValueType:'',content:''};
      item.rightcont = {Desc:'',Operator:'',type:'',seltype:-1,parent:null};
      item.prename = li.Desc;
      item.rightcont.Desc = '请选择';
      item.rightcont.parent = li.Name;
      item.optionlist = [];
      item.selectchangetype = true;
      item.righttype = false;
      item.rightcontent = '';
      item.listid = this.listid++;

      this.leftvalue = li.Desc+'/'+item.desc;
      this.rightcontent = item;
      this.operators = item.operators;
      this.conditiontype = false;
      this.$forceUpdate();
    },
    //选择左边条件
    choosetleftif(li){
      // li.rightcont = {name:''}
      this.operators = [];
      this.rightvalue = {type:'',leftFieldValueType:'',name:'',operator:'',rightFieldValueType:'',content:''};
      
      console.log(li);

      li.rightcont = {Desc:'',Operator:'',type:'',seltype:-1,parent:null};
      li.prename = '';
      li.rightcont.Desc = '请选择';
      li.optionlist = [];
      li.selectchangetype = true;
      li.rightcontent = '';

      li.righttype = false;
      this.leftvalue = li.desc;
      this.rightcontent = li;
      this.operators = li.operators;
      this.conditiontype = false;
      this.$forceUpdate();
    },
    showconditiontype(){
      if (this.conditiontype == true){
        this.conditiontype = false;
      } else {
        this.conditiontype = true;
      }
    },
    choosechilren(li){
      console.log(li.seltype);
      if (li.seltype == true){
        li.seltype = false;
      } else {
        li.seltype = true;
      }
      this.$forceUpdate();
    },
    getinfo(data){
      console.log(data,'data');
      this.expresslist = data;
      this.expresslist.forEach(item=>{
        item.seltype = false;
      });
    },
  },
};
</script>

<style lang="scss" src="./index.scss">

</style>