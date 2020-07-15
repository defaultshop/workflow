<template>
  <div id="item1">
    <k-form-design 
      title="表单设计器" 
      :showHead="false"
      :toolbars="[]"
      toolbarsTop 
      @save="saveform"
      ref="formdesign"
    />
  </div>
</template>

<script>
const Base64 = require('js-base64').Base64;
export default {
  data() {
    return {
      jsondata: {
        list: [
          {
            type: 'textarea',
            label: '文本框',
            icon: 'icon-edit',
            options: {
              width: '100%',
              minRows: 4,
              maxRows: 6,
              defaultValue: '',
              disabled: false,
              placeholder: '请输入',
            },
            model: 'textarea_1584772782841',
            key: 'textarea_1584772782841',
            rules: [
              {
                required: false,
                message: '必填项',
              },
            ],
          },
        ],
        config: {
          layout: 'horizontal',
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 18,
          },
          hideRequiredMark: false,
          customStyle: '',
        },
      },
    };
  },
  methods: {
    saveform(data) {
      console.log(data);
      const exStr = data;
      // console.log(this.$store.state.formTextBase64);
      this.$store.state.formTextBase64 = exStr;
      this.$emit('savedata',exStr);
      
    },
    getjsondata(){
      this.$refs.formdesign.handleSave();
    },
    setjsondata(data){
      this.$nextTick(()=>{
        // const workflowinfo =this.$store.state.workflowinfo;
        this.$refs.formdesign.handleSetData(JSON.parse(Base64.decode(data)));
      });
    },
  },
  mounted(){
    
  },
};
</script>

<style lang="scss" scoped>
#item1{
    height: 100%;
    background-color: #fff;
}
</style>
<style lang="scss">
#item1 .form-designer-container-9136076486841527{
  height: 100%;
  box-shadow: 0 0 3px #ccc;
}
#item1 .form-designer-container-9136076486841527 .operating-area{
    display: none;
}
#item1 .form-designer-container-9136076486841527 .content.toolbars-top{
    height: 100%;
}
#item1 .form-designer-container-9136076486841527 .content section .form-panel{
  background: #fff;
}
#item1 .form-designer-container-9136076486841527 .content section .form-panel .draggable-box .list-main{
  background: #fff;
}

#item1{
  .form-designer-container-9136076486841527 .content aside.left ul li:hover{
    box-shadow: 0 2px 6px #3671FF;
    border: 1px solid #3671FF;
    color: #3671FF;
    cursor: pointer;
  }
  .form-designer-container-9136076486841527 .content section .form-panel .draggable-box .list-main .drag-move-box.active{
    background: #d4e1f1;
  }
  .ant-radio-group-solid .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled){
    background: #3671FF;
  }
  .show-key-box{
    display: none;
  }
  .form-designer-container-9136076486841527 .content aside{
    box-shadow: none;
  }
  .form-designer-container-9136076486841527 .content section{
    box-shadow: 0 0 1px 1px #eae9e9;
  }
}

</style>