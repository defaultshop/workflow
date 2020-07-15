import { intermediateSignalCatchEvent } from '@/components/nodes';
import nameConfigSettings from './inspecotrs/nameConfigSettings';
//import {signalSelector, default as signalEventDefinition} from '@/components/nodes/signalEventDefinition';
import iconNames from './inspecotrs/iconNames';
import merge from 'lodash/merge';
import cloneDeep from 'lodash/cloneDeep';
import advancedAccordionConfig from './inspecotrs/advancedAccordionConfig';
import eventAccordionConfig from './inspecotrs/eventAccordionConfig';
import inspectorHelper from './inspecotrs/inspectorHelper';
import bpmnProps from './inspecotrs/bpmnProps';

window.ProcessMaker.EventBus.$on('modeler-init', ({ registerNode }) => {
  /* Add a custom node example */

  const implementation = 'processmaker-wait-event';
  const nodeId = 'processmaker-wait-event';
  const displayName = '等待';
  
  const baseConfig = cloneDeep(intermediateSignalCatchEvent);
  baseConfig.inspectorConfig = [
    {
      items: [
        {
          component: 'FormAccordion',
          container: true,
          config: {
            // initiallyOpen: true,
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
        eventAccordionConfig,
        advancedAccordionConfig,
      ],
    },
  ];

  const component = {
    extends: intermediateSignalCatchEvent.component,
    created() {
      this.boundaryEventDropdownData = [];
      this.dropdownData = [];
    },
  };

  const nodeType = merge(baseConfig, {
    id: nodeId,
    component,
    icon: require('@/assets/intermediate-signal-catch-event.svg'),
    bpmnType: 'bpmn:IntermediateCatchEvent',
    control: true,
    category: 'BPMN',
    label: displayName,
    definition(moddle) {
      return moddle.create('bpmn:IntermediateCatchEvent', {
        //TODO 这里是多语言范本
        //name: $t(defaultNames[id]),
        implementation,
        name: displayName,
        eventOptions: JSON.stringify(bpmnProps.emptyEventOptions),
      });
    },

    /*可视化配置控件的数据，映射到节点的定义之中 */
    inspectorHandler(value, node, setNodeProp) {
      //遍历definition对象的属性，根据属性名称的不同匹配来支持基础逻辑和自定义逻辑
      console.log(value,node,'value---node');
      const definition = node.definition;
      for (const key in value) {
        //处理自定义逻辑，2个
        if (key == bpmnProps.eventOptions)
        {
          //处理人员设置
          inspectorHelper.delegateHandle(bpmnProps.eventOptions)(value, node, setNodeProp);
        }
        //处理基础逻辑，例如：name,id等...,通常是字符串描述的属性值
        else if (definition[key] !== value[key]) {
          setNodeProp(node, key, value[key]);
        }
      }
    },
    
    /*从节点的定义中提取数据，用于渲染可视化配置的控件*/
    inspectorData(node) {
      return inspectorHelper.delegateInspect()(node);
    },
  });

  registerNode(nodeType, (definition) => {
    if (definition.get('implementation') === implementation) {
      return nodeId;
    }
  });
});
