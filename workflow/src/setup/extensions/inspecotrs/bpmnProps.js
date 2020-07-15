export default {
  sequenceFlowOptions : 'sequenceFlowOptions',
  eventOptions : 'eventOptions',
  principalOptions : 'principalOptions',
  approvalOptions : 'approvalOptions',
  conditionExpression :'conditionExpression',
  emptyPrincipalOptions : {
    handlers: [],
    ccReceivers: [],
    ccReceiverstype: false,
  },
  emptyApprovalOptions: {
    enableFallback : false,
    id: '',
    optionalSteps : [],
  },
  emptyEventOptions: {
    name: null,
    value: null,
    valueProvider: null,
    effectiveTime: null,
    namevalueid:{nameid:null,valueid:null},
  },
  emptySequenceFlowOptions: {
    isDefault: true,
    expression: null,
    expressionGroup: null,
  },
  //审批人的数据结构
  principalStruct: {
    type : 1, //0 用户, 1组织单位, 2角色
    id : '',  //guid
  },
  //可选（转交）项的数据结构
  optionalStepStruct: {
    id : '',
    name : '',
  },
  //表达式组的数据结构
  expressionGroupStrcut: {
    groupOperator : 0, //0--AND, 1--OR
    expressions : [{
      left : {
        //provider : 0, //0--字段（选），1--常量（输）       
        expression : '', //从definition中加载
        fieldValueType : 0, //从definition中加载
        // fieldRef 是下拉框选择绑定的值，直接赋值即可
        // 如果fieldRef有父级，那么需要额外赋值一个parent
        fieldRef :{ //Expression和fieldRef 二选一
          // name : null,
          // des : null,
          // parent : null, //如果有parent一定要传,
          // fieldValueType : 0,
          // formFieldType : 0, //默认传0
          // provider : 0, 
        },
      },
      right : {}, // 结构和left相同
      operator : 0, //从definiton中加载
    }],
  },

};