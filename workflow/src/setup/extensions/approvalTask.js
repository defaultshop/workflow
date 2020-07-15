import UserTask from '@/components/nodes/userTask';
//import idConfigSettings from '@/components/inspectors/idConfigSettings';
import approvalAccordionConfig from './inspecotrs/approvalAccordionConfig';
import defaultNames from '@/components/nodes/task/defaultNames';
//import selectevent from './eventvalue/selectevent';
//import flowControlConfigSettings from './inspecotrs/flowControlConfigSettings';
import iconNames from './inspecotrs/iconNames';
import nameConfigSettings from './inspecotrs/nameConfigSettings';
import advancedAccordionConfig from './inspecotrs/advancedAccordionConfig';
import inspectorHelper from './inspecotrs/inspectorHelper';
import bpmnProps from './inspecotrs/bpmnProps';
import store from '../../store.js';


window.ProcessMaker.EventBus.$on('modeler-init', ({ registerNode }) => {
  /* Add a custom node example */

  const implementation = 'processmaker-custom-approval-task';
  const id = 'processmaker-custom-approval-task';

  const component = {
    extends: UserTask.component,
    watch: {
      
    },
    mounted() {
      
    },
    data(){
      return {
        shape:null,
        definition:null,
        //通过重写数据定义，来删除节点的上下文菜单
        dropdownData:[],
        boundaryEventDropdownData:[],
      };
    },
  };

  const displayName = '审批';

  const nodeType = {
    id,
    component,
    bpmnType: 'bpmn:UserTask',
    control: true,
    category: 'BPMN',
    icon: require('@/assets/toolpanel/task.svg'),
    label: displayName,
    definition(moddle) {
      
      //初始化用户配置和审批流程配置
      return moddle.create('bpmn:UserTask', { 
        name: displayName,
        implementation,
        //如果这里的自定义名称不为config，那么会被生成到definition.$attrs属性中
        approvalOptions: JSON.stringify(bpmnProps.emptyApprovalOptions),
        principalOptions: JSON.stringify(bpmnProps.emptyPrincipalOptions),
        //config: JSON.stringify({users:[], ccpeople:[], evtval:{event:'',value:''}, optional:{backtype:false,cctype:false,cclist:[]}}),
      });
    },
    diagram(moddle) {
      return moddle.create('bpmndi:BPMNShape', {
        bounds: moddle.create('dc:Bounds', {
          height: 76,
          width: 116,
        }),
      });
    },

    /*可视化配置控件的数据，映射到节点的定义之中 */
    inspectorHandler(value, node, setNodeProp) {
      //遍历definition对象的属性，根据属性名称的不同匹配来支持基础逻辑和自定义逻辑
      console.log(value,node,'value---node');
      const definition = node.definition;
      for (const key in value) {
        //处理自定义逻辑，2个
        if (key == bpmnProps.principalOptions)
        {
          //处理人员设置
          inspectorHelper.delegateHandle(bpmnProps.principalOptions)(value, node, setNodeProp);
        }
        else if (key == bpmnProps.approvalOptions)
        {
          //处理流程设置
          inspectorHelper.delegateHandle(bpmnProps.approvalOptions)(value, node, setNodeProp);
        }
        // else if (key == 'name')
        // {
        //   //为name设置唯一
        //   if (value[key] == displayName)
        //   {
        //     setNodeProp(node, key, displayName + '(' + value['id'] + ')');
        //   }
        // } 
        //处理基础逻辑，例如：name,id等...,通常是字符串描述的属性值
        else if (definition[key] !== value[key]) {
          setNodeProp(node, key, value[key]);
        }
      }
    },
    
    /*从节点的定义中提取数据，用于渲染可视化配置的控件*/
    inspectorData(node) {
      let nodedata = inspectorHelper.delegateInspect()(node);
      store.state.nodeid = nodedata.id;
      // sessionStorage.setItem('nodeid',nodedata.id);
      return inspectorHelper.delegateInspect()(node);
    },

    inspectorConfig: [
      {
        name: defaultNames[id],
        items: [
          {
            component: 'FormAccordion',
            container: true,
            config: {
              //initiallyOpen: true,
              label: '基础设置',
              icon: iconNames.basic,
              name: 'inspector-accordion',
            },
            items: [
              {
                component: 'FormInput',
                config: nameConfigSettings,
              },
            ],
          },
          approvalAccordionConfig,
          //flowControlConfigSettings,
          advancedAccordionConfig,
        ],
      },
    ],
  };

  registerNode(nodeType, definition => {
    if (definition.get('implementation') === implementation) {
      return id;
    }
  });
});
