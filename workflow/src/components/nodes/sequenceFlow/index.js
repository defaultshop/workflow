import component from './sequenceFlow.vue';
import iconNames from '../../../setup/extensions/inspecotrs/iconNames';
import nameConfigSettings from '../../../setup/extensions/inspecotrs/nameConfigSettings';
import advancedAccordionConfig from '../../../setup/extensions/inspecotrs/advancedAccordionConfig';
import inspectorHelper from '@/setup/extensions/inspecotrs/inspectorHelper';
import bpmnProps from '@/setup/extensions/inspecotrs/bpmnProps';

export const id = 'processmaker-modeler-sequence-flow';
//const implementation = 'processmaker-modeler-sequence-flow';

export default {
  id,
  component,
  bpmnType: 'bpmn:SequenceFlow',
  control: false,
  definition(moddle) {
    return moddle.create('bpmn:SequenceFlow', {
      name: null,
      sequenceFlowOptions: JSON.stringify(bpmnProps.emptySequenceFlowOptions),
    });
  },
  diagram(moddle) {
    return moddle.create('bpmndi:BPMNEdge');
  },
  inspectorData(node) {
    console.log(node,'node');
    return Object.entries(node.definition.$attrs).reduce((data, [key, value]) => {
      if (key === bpmnProps.conditionExpression) {
        data[key] = value.body;
      } else {
        data[key] = JSON.parse(value);
      }

      return data;
    }, {});
    
  },
  inspectorHandler(value, node, setNodeProp, moddle) {
    const definition = node.definition;
    console.log(value, node,'value, node');
    //判断是否有条件参与
    const hasCondition = ['bpmn:ExclusiveGateway', 'bpmn:InclusiveGateway'].includes(definition.sourceRef.$type);

    //遍历属性
    for (const key in value) {
      if (definition[key] === value[key]) {
        continue;
      }
      if (key === 'conditionExpression' && hasCondition) {
        //由于引入了其他设计，这里将conditionExpression置空
        const conditionExpression = moddle.create('bpmn:FormalExpression', { body: value[key] });
        setNodeProp(node, bpmnProps.conditionExpression, conditionExpression);
      }
      else if (key == bpmnProps.sequenceFlowOptions)
      {
        //表达式设计的属性
        inspectorHelper.delegateHandle(bpmnProps.sequenceFlowOptions)(value, node, setNodeProp);
      }
      else {
        setNodeProp(node, key, value[key]);
      }
    }
  },
  inspectorConfig: [
    {
      name: 'Sequence Flow',
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
        advancedAccordionConfig,
      ],
    },
  ],
};
