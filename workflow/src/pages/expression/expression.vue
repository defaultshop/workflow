<template>
  <div id="expression" @click="hide">
    <div v-if="pattern == 1">
      <!-- <div class="expresstit">
        <div>数据流转条件</div>
        <div>
          <el-select v-model="tabvalue" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>当数据满足流转条件时，进入这条连接线下的节点；不添加流转条件时，所有数据都会进入这条连接线下的节点。</div>
      </div> -->
      <div class="accordwith">
        <span>符合以下</span>
        <span class="allone" @click.stop="choosewithtab">
          <b v-if="withcont == 0">所有</b>
          <b v-if="withcont == 1">任一</b>
          <i class="el-icon-caret-bottom" />
          <div class="accordwithtab" v-show="withtype">
            <div @click.stop="shoosewith(0)">所有</div>
            <div @click.stop="shoosewith(1)">任一</div>
          </div>
        </span>
        <span>流转条件的数据</span>
      </div>
      <div class="addcondition">
        <span @click.stop="opencondtion">+ 添加流转条件</span>
        <div class="conditionlist" v-show="conditiontype">
          <div class="eachcond" v-for="(li,index) in expresslist" :key="index">
            <div class="eachcondcont" @click="choosetleftif(li)">
              <span>{{ li.Desc }}</span>
              <b class="iconi" v-if="li.seltype&&li.Children.length>0" @click.stop="choosechilren(li)">
                <i class="el-icon-arrow-up" />
              </b>
              <b class="iconi" v-if="!li.seltype&&li.Children.length>0" @click.stop="choosechilren(li)">
                <i class="el-icon-arrow-down" />
              </b>
                
              
            </div>
            <div v-if="li.seltype">
              <div class="eachcond" v-for="(item,ltindex) in li.Children" :key="ltindex">
                <div class="eachcondcont" style="padding:0 20px" @click="choosetrightif(li,item)">
                  <span>{{ item.Desc }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    
      <div class="eachpress" v-for="(li,index) in rightlist" :key="index">
        <div class="eachpresstop">
          <div>
            <span class="name"><b v-if="li.prename">{{ li.prename }}/</b>{{ li.Desc }}</span> 
            <span class="tabdata"  @click.stop="rightlictclick(li,index)">{{ li.rightcont.Desc }}
              <i class="el-icon-caret-bottom" />
            </span>
            <div class="eachpresstoplist" v-show="li.righttype">
              <div class="rightlist" v-for="(item,itindex) in li.Operators" :key="itindex">
                <div class="rightlistcont" @click.stop="chooseOperators(li,item)">
                  <span>{{ item.Name }}</span>
                </div>
                <!-- <div v-if="item.optiontype">
                  <div class="rightlistcont" style="padding:0 15px;font-size:12px" v-for="(lt,ltindex) in item.SupportedRightOptions" @click="chooseOptions(li,item,lt)" :key="ltindex">
                    <span>{{ lt.Name }}</span>
                  </div>
                </div> -->
              </div>
            </div>
          </div>
          <div class="rightdel">
            <i class="el-icon-delete-solid" @click="delrightlist(li,index)" />
          </div>
        </div>
        <div class="allpressbot">
          <div style="border:none" class="eachpressbot" v-if="li.rightcont.type == 3">
            <el-date-picker
              v-model="li.rightcontent"
              type="date"
              placeholder="选择日期"
              @change="timechange"
            />
          </div>
          <div class="eachpressbot" v-if="li.rightcont.type == 1">
            <input type="text" v-model="li.rightcontent" @input="inputchange">
          </div>
          <div class="eachpressbot" v-if="li.rightcont.type == 2">
            <input type="number" v-model="li.rightcontent" @input="inputchange">
          </div>
          <div v-if="li.rightcont.type == 4">
            <div class="eachpressbottype4" v-for="(item,ltindex) in li.rightcontent" :key="ltindex">
              <div class="eachpressbot">
                <input type="text" v-model="item.value"  @input="arrayinputchange($event,li)">
              </div>
              <div>
                <i class="el-icon-plus" @click="plusrightcontent(li,item,ltindex)" />
              </div>
              <div>
                <i class="el-icon-delete-solid" @click="delrightcontent(li,item,ltindex)" />
              </div>
            </div>
            
          </div>
          <div style="border:none" class="eachpressbot" v-if="li.rightcont.type == 5">
            <el-select v-model="li.rightcontent" placeholder="请选择">
              <el-option
                v-for="lt in li.options2"
                :key="lt.value"
                :value="lt.value"
              />
            </el-select>
          </div>
          <div class="eachpressbottype4" v-if="li.rightcont.type == -1">
            <div style="border:none" class="eachpressbot" v-if="li.selectchangetype">
              <el-select v-model="li.rightcontent" placeholder="请选择" @change="selectchange(li.rightcontent,li)">
                <el-option
                  v-for="lt in li.optionlist"
                  :key="lt.Name"
                  :label="lt.Name"
                  :value="lt"
                />
              </el-select>
              <!-- <el-cascader
                v-model="value"
                :options="li.optionlist"
                :props="defaultData"
                @change="handleChange"
              /> -->
            </div>
            <div class="eachpressbot" v-else>
              <input type="text" v-model="li.rightcontent">
            </div>
            <div>
              <i class="el-icon-edit" @click="changeselecttype(li)" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="pattern == 0">
      <div class="eachoptional">
        <div>请输入</div>
        <div>
          <textarea name="" id="" cols="30" rows="10" v-model="expression"  />
        </div>
      </div>
    </div>
    

    <div class="cutoptional">
      <span @click="changeinput" v-if="pattern == 1">高级</span>
      <span @click="changeinput" v-if="pattern == 0">返回</span>
    </div>

  </div>
</template>

<script>
export default {
  props:{
    value: Object,
  },
  data(){
    return {
      withtype: false,
      value1: '',
      options: [{
        value: '选项1',
        label: '使用自定义流转条件',
      }, {
        value: '选项2',
        label: '使用Else条件',
      }],
      options2: [{value:true},{value:false}],
      tabvalue: '选项1',
      inputtype: 1,
      conditiontype: false,
      jsondata: '',
      listid: 1,
      expresslist: [],
      rightlist: [],
      withcont: 0,
      righttype: false,
      rightcont: {
        name: '',
        type: 1,
      },
      expressionGroupStrcut: {},
      pattern: 1,
      expression: '',
      defaultData: {
        value: 'Name',
        label: 'Name',
        children: 'SubValues',
      },
    };
  },
  watch:{
    expression(){
      if (this.expression != '' && this.expression != ' '){
        this.$emit('input',{
          isDefault: true,
          expression: this.expression,
          expressionGroup: null,
        });
      }
    },
  },
  methods:{
    hide(){
      this.conditiontype = false;
      this.withtype = false;
    },

    //right时间变化
    timechange(aa){
      console.log(aa);
      this.datachange();
    },
    //right数组输入变化
    arrayinputchange(e,li){
      if (e.target.value != '' && e.target.value != ' '){
        console.log(e.target.value,li);
        this.datachange();
      }
    },
    //right输入框变化
    inputchange(e){
      console.log(e.target.value);
      // this.$emit('input',{
      //   isDefault: true,
      //   expression: null,
      //   expressionGroup: null,
      //   expressdata: {left:[],right:[],pattern:1},
      // });
      this.datachange();
    },
    //right下拉框切换(下拉或输入)
    changeselecttype(li){
      console.log(li);
      if (li.selectchangetype == true){
        li.selectchangetype = false;
        li.rightcontent = '';
        li.righselecttype = li.rightcont.seltype;
      } else {
        li.selectchangetype = true;
        li.righselecttype = -1;
        li.rightcontent = '';
        this.value1 = '';
      }
      this.$forceUpdate();
    },
    //right下拉框触发
    selectchange(val,li){
      console.log(val,li);
      li.rightcontent = val.Name;
      li.righselecttype = val.FieldValueType;
      this.datachange();
      this.$forceUpdate();
    },
    //数据变化触发
    datachange(){
      this.expressionGroupStrcut = {
        groupOperator : this.withcont, //0--AND, 1--OR
        expressions : [],
      };
      console.log(this.rightlist,'rightlist');
      this.rightlist.forEach(item=>{
        if (item.rightcontent != '' && item.rightcontent != ' '){
          console.log('no');
          let expressions = {
            left : {
              provider : 0, //0--字段（选），1--常量（输）       
              expression : '', //从definition中加载
              fieldValueType : 0, //从definition中加载
              fieldRef :{ //Expression和fieldRef 二选一
                name : null,
                des : null,
                parent : null, //如果有parent一定要传,
                fieldValueType : 0,
                formFieldType : 0, //默认传0
                provider : 0, 
              },
            },
            right : {
              provider : 0, //0--字段（选），1--常量（输）
              expression : '', //从definition中加载
              fieldValueType : 0, //从definition中加载
              fieldRef :{ //Expression和fieldRef 二选一
                name : null,
                des : null,
                parent : null, //如果有parent一定要传,
                fieldValueType : 0,
                formFieldType : 0, //默认传0
                provider : 0, 
              },
            }, // 结构和left相同
            operator : 0, //从definiton中加载
          };
          expressions.operator = item.rightcont.Operator;
          expressions.left.expression = item.Desc;
          expressions.left.fieldValueType = item.FieldValueType;
          expressions.left.fieldRef.name = item.Name;
          expressions.left.fieldRef.des = item.Desc;
          expressions.left.fieldRef.parent = item.parent;
          expressions.left.fieldRef.fieldValueType = item.FieldValueType;
          expressions.left.fieldRef.formFieldType = item.FormFieldType;
          expressions.left.fieldRef.provider = item.Provider;

          expressions.right.fieldRef.name = item.rightcont.name;
          expressions.right.fieldRef.des = item.rightcont.name;
          expressions.right.fieldRef.parent = item.parent;
          expressions.right.fieldRef.fieldValueType = item.rightcont.type;
          expressions.right.fieldRef.formFieldType = 0;
          expressions.right.fieldRef.provider = item.Provider;

          if (item.rightcont.type == -1){
            expressions.right.fieldRef.provider = 0;
            expressions.right.fieldRef.fieldValueType = item.righselecttype;
            expressions.right.expression = item.rightcontent;
          } else if (item.rightcont.type == 4){
            expressions.right.fieldRef.provider = 1;
            expressions.right.fieldRef.fieldValueType = item.rightcont.type;
            let arr = [].concat(item.rightcontent);
            let arrString = '';
            arr.forEach((li,index)=>{
              if (arr.length == index+1){
                arrString = li.value;
              } else {
                arrString = li.value+'#';
              }
              expressions.right.expression = arrString;
            });
          } else {
            expressions.right.fieldRef.provider = 1;
            expressions.right.fieldRef.fieldValueType = item.rightcont.type;
            expressions.right.expression = item.rightcontent;
          }
          this.expressionGroupStrcut.expressions.push(expressions);
        }
        console.log(item);
        
      });
      this.$emit('input',{
        isDefault: true,
        expression: null,
        expressionGroup: this.expressionGroupStrcut,
      });
    },
    //right数据为数组-删除
    delrightcontent(li,item,index){
      console.log(li,item,index);
      li.rightcontent.splice(index,1);
      this.$forceUpdate();
    },
    //right数据为数组-添加
    plusrightcontent(li,item,index){
      console.log(li,item,index);
      li.rightcontent.splice(index+1,'',{value:''});
      this.$forceUpdate();
    },
    //删除列表
    delrightlist(li,count){
      console.log(li,count);
      // this.expresslist.forEach(item=>{
      //   if (item.listid == li.listid){
      //     item.selecttype = false;
      //   }
      //   item.SubValues.forEach(lt=>{
      //     if (lt.listid == li.listid){
      //       lt.selecttype = false;
      //     }
      //   });
      // });
      this.rightlist.splice(count,1);
    },
    //右边条件选择二级
    chooseOptions(li,item,lt){
      li.rightcont.name = item.Name;
      li.rightcont.type = lt.FieldValueType;
      if (li.rightcont.type == 4){
        li.rightcontent = [{value:''}];
      } else if (li.rightcont.type == 5){
        li.rightcontent = '';
      } else {
        li.rightcontent = '';
      }
      this.$forceUpdate();
    },
    //右边条件选择一级
    chooseOperators(li,item){
      console.log(li,item);
      li.rightcont.name = item.Name;
      li.rightcont.Operator = item.Operator;
      li.rightcont.type = item.RightFieldValueType;
      li.rightcont.seltype = item.RightFieldValueType;
      // if (item.SupportedRightOptions.length>0){
      //   li.rightcont.type = -1;
      //   li.rightcontent = '';
      //   li.optionlist = item.SupportedRightOptions;
      // } else {
        
      // }
      li.rightcontent = '';
      if (li.rightcont.type == 4){
        li.rightcontent = [{value:''}];
      } else {
        li.rightcontent = '';
      }

      
      li.righttype = false;

      this.$forceUpdate();
    },
    //点击右边条件
    rightlictclick(li,index){
      
      this.conditiontype = false;
      this.withtype = false;
      if (this.rightlist[index].righttype == false){
        this.rightlist[index].righttype = true;
      } else {
        this.rightlist[index].righttype = false;
      }
      console.log(this.rightlist,li,index);
      this.$forceUpdate();
    },
    //选择左边条件二级
    choosetrightif(li,item){
      item.rightcont = {Desc:'',Operator:'',type:'',seltype:-1,parent:null};
      item.prename = li.Desc;
      item.rightcont.Desc = '请选择';
      item.rightcont.parent = li.Name;
      item.optionlist = [];
      item.selectchangetype = true;
      item.righttype = false;
      item.rightcontent = '';
      item.listid = this.listid++;
      this.rightlist.push(JSON.parse(JSON.stringify(item)));
      this.$forceUpdate();
    },
    //选择左边条件
    choosetleftif(li){
      // li.rightcont = {name:''}
      
      console.log(li);

      li.rightcont = {Desc:'',Operator:'',type:'',seltype:-1,parent:null};
      li.prename = '';
      li.rightcont.Desc = '请选择';
      li.optionlist = [];
      li.selectchangetype = true;
      li.rightcontent = '';

      li.righttype = false;
      li.listid = this.listid++;
      this.rightlist.push(JSON.parse(JSON.stringify(li)));
      this.$forceUpdate();
    },
    shoosewith(cont){
      this.withcont = cont;
      this.withtype = false;
      let cc = false;
      this.rightlist.forEach(item=>{
        if (item.rightcontent != '' && item.rightcontent != ' '){
          cc = true;
        }
      });
      if (cc){
        this.datachange();
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
    opencondtion(){
      this.withtype = false;
      this.righttype = false;
      if (this.conditiontype == true){
        this.conditiontype = false;
      } else {
        this.conditiontype = true;
      }
    },
    //高级-普通切换
    changeinput(){
      if (this.pattern == 1){
        this.pattern = 0;
      } else {
        this.pattern = 1;
      }
      if (this.pattern == 1){
        if (this.expression != '' && this.expression != ' '){
          this.$emit('input',{
            isDefault: true,
            expression: this.expression,
            expressionGroup: null,
          });
        }
      } else {
        this.datachange();
      }
    },
    choosewithtab(){
      this.conditiontype = false;
      this.righttype = false;
      if (this.withtype == false){
        this.withtype = true;
      } else {
        this.withtype = false;
      }
    },
    async getdata(){
      console.log(JSON.parse(this.jsondata),'this.jsondata');
      var url = '/resource/baitu-workflows/rule-engine/expression-build-options',
        type = 'post',
        data = JSON.parse(this.jsondata);
        // data ={'list':[{'type':'input','input':'输入框','options':{'type':'text','width':'100%','defaultValue':'','placeholder':'请输入','clearable':false,'maxLength':null,'hidden':false,'disabled':false},'model':'input_1591951719013','key':'input_1591951719013','rules':[{'required':false,'message':'必填项'}]}],'config':{'layout':'horizontal','labelCol':{'span':4},'wrapperCol':{'span':18},'hideRequiredMark':false,'customStyle':''}};
      let res = await this.$getaxios(url,type,data);
      if (res){
        console.log(res,'resource');
        this.expresslist = res;
        this.expresslist.forEach(item=>{
          item.seltype = false;
        });
        this.dataProcessing();
      }
    },
    dataProcessing(){
      if (this.value.expression || this.value.expressionGroup){
        if (this.value.expression){
          this.pattern = 0;
          this.expression = this.value.expression;
        } else {
          this.pattern = 1;
          let expressionGroup = this.value.expressionGroup;
          this.withcont = expressionGroup.groupOperator;

          if (expressionGroup.expressions.length>0){
            expressionGroup.expressions.forEach(li=>{
              this.expresslist.forEach(item=>{
                if (item.Name == li.left.fieldRef.name){
                  item.rightcont = {Desc:'',Operator:'',type:'',seltype:-1,parent:null};
                  item.prename = '';
                  item.rightcont.Desc = li.right.fieldRef.name;
                  item.optionlist = [];
                  item.selectchangetype = true;
                  item.rightcontent = '';
                  item.righttype = false;
                  item.listid = this.listid++;
                  item.Operators.forEach(operitem=>{
                    if (operitem.Operator == li.operator){
                      item.rightcont.name = operitem.Name;
                      item.rightcont.Operator = operitem.Operator;
                      item.rightcont.type = operitem.RightFieldValueType;
                      item.rightcont.seltype = operitem.RightFieldValueType;
                      if (item.rightcont.type == 4){
                        item.rightcontent = li.right.expression.join('#');
                      } else {
                        item.rightcontent = li.right.expression;
                      }
                    }
                  });
                  this.rightlist.push(JSON.parse(JSON.stringify(item)));
                }
                item.Children.forEach(lt=>{
                  console.log(lt);
                  if (lt.Name == li.left.fieldRef.name){
                    lt.rightcont = {Desc:'',Operator:'',type:'',seltype:-1,parent:null};
                    lt.prename = item.Desc;
                    lt.rightcont.Desc = li.right.fieldRef.name;
                    lt.optionlist = [];
                    lt.selectchangetype = true;
                    item.rightcont.parent = item.Name;
                    lt.rightcontent = '';
                    lt.righttype = false;
                    lt.listid = this.listid++;
                    lt.Operators.forEach(operitem=>{
                      if (operitem.Operator == li.operator){
                        lt.rightcont.name = operitem.Name;
                        lt.rightcont.Operator = operitem.Operator;
                        lt.rightcont.type = operitem.RightFieldValueType;
                        lt.rightcont.seltype = operitem.RightFieldValueType;
                        if (lt.rightcont.type == 4){
                          lt.rightcontent = li.right.expression.join('#');
                        } else {
                          lt.rightcontent = li.right.expression;
                        }
                      }
                    });
                    this.rightlist.push(JSON.parse(JSON.stringify(lt)));
                  }
                });
              });
            });
          }
          
        }
      }
      console.log(this.rightlist,'this.rightlist');
      this.$forceUpdate();
    },
  },
  mounted(){
    console.log(this.value,'express');
    console.log(this.$store.state.formTextBase64,'formTextBase64');
    this.jsondata = this.$store.state.formTextBase64;
    this.getdata();

    this.$nextTick(()=>{
      if (this.value.expressionGroup){
        this.withcont = this.value.expressionGroup.groupOperator;
      }
      this.expressionGroupStrcut = this.value.expressionGroup;
    });
  },
};
</script>

<style lang="scss" scoped src="./expression.scss" />
<style>
#expression .el-input__inner{
  height: 35px;
  line-height: 35px;
}
#expression .el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 100%;
}
</style>