import component from './sequenceFlow.vue';
import nameConfigSettings from '@/components/inspectors/nameConfigSettings';
import advancedAccordionConfig from '@/components/inspectors/advancedAccordionConfig';
import editexpression from '@/components/inspectors/editexpression';


export const id = 'processmaker-modeler-sequence-flow';

export default {
  id,
  component,
  bpmnType: 'bpmn:SequenceFlow',
  control: false,
  definition(moddle) {
    return moddle.create('bpmn:SequenceFlow', {
      name: null,
      config: {infomate:{}},
    });
  },
  diagram(moddle) {
    return moddle.create('bpmndi:BPMNEdge');
  },
  inspectorData(node) {
    console.log('1',node,node.definition.$attrs);
    if (!node.definition.config){
      node.definition.config = node.definition.$attrs;
    }
    return Object.entries(node.definition).reduce((data, [key, value]) => {
      console.log(key,value,'value');
      if (key === 'conditionExpression') {
        data[key] = value.body;
      } else if (key === 'config') {
        console.log('handler config...');
        try {
          const config = value;
          console.log(value);
          console.log(config);

          var result= { ...data, ...config };
          var result2 = { ...data, config };
          console.log(result, 'result');
          console.log(result2, 'result2');
          //return { ...data, ...config };

          //由于对config做了封包操作，这里不能对config使用...运算符
          return result2;
        } catch (error) {
          /* Ignore invalid JSON */
          console.log(error);
        }
      } else {
        data[key] = value;
      }

      return data;
    }, {});
  },

  inspectorHandler(value, node, setNodeProp, moddle) {
    console.log('2',node,value);
    const definition = node.definition;
    // const config = JSON.parse(definition.config);

    // Exclusive and inclusive gateways could have conditioned flows
    const hasCondition = ['bpmn:ExclusiveGateway', 'bpmn:InclusiveGateway'].includes(definition.sourceRef.$type);

    // Go through each property and rebind it to our data
    for (const key in value) {
      if (definition[key] === value[key]) {
        continue;
      }

      if (key === 'conditionExpression' && hasCondition) {
        // Set the condition expression
        const conditionExpression = moddle.create('bpmn:FormalExpression', { body: value[key] });
        setNodeProp(node, 'conditionExpression', conditionExpression);
      } else if (key == 'config')
      {
        //这里config返回的是一个复杂对象，所以不能用简单的key来处理
        var obj = value[key];
        const newConfig = JSON.stringify(obj);
        console.log(newConfig,'newcnfig');
        if (newConfig !== definition.config) {
          setNodeProp(node, 'config', newConfig);
        }
      } else {
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
            initiallyOpen: true,
            label: 'Configuration',
            icon: 'cog',
            name: 'inspector-accordion',
          },
          items: [
            {
              component: 'FormInput',
              config: { ...nameConfigSettings, validation: null },
            },
          ],
        },
        advancedAccordionConfig,
        editexpression,
      ],
    },
  ],
};
