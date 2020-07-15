import { startEvent } from '@/components/nodes';
import nameConfigSettings from './inspecotrs/nameConfigSettings';
import merge from 'lodash/merge';
import cloneDeep from 'lodash/cloneDeep';
import iconNames from './inspecotrs/iconNames';
import advancedAccordionConfig from './inspecotrs/advancedAccordionConfig';

window.ProcessMaker.EventBus.$on('modeler-init', ({ registerNode }) => {
  /* Add a custom node example */

  const implementation = 'processmaker-begin-event';
  const nodeId = 'processmaker-begin-event';
  const displayName = '开始';
  
  const baseConfig = cloneDeep(startEvent);
  baseConfig.inspectorConfig = [
    {
      items: [
        {
          component: 'FormAccordion',
          container: true,
          config: {
            initiallyOpen: true,
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
  ];

  const component = {
    extends: startEvent.component,
    created() {
      this.boundaryEventDropdownData = [];
      this.dropdownData = [];
    },
  };

  const nodeType = merge(baseConfig, {
    id: nodeId,
    component,
    rank: 1,
    bpmnType: 'bpmn:StartEvent',
    control: true,
    category: 'BPMN',
    icon: require('@/assets/toolpanel/start-event.svg'),
    label: displayName,
    definition(moddle) {
      return moddle.create('bpmn:StartEvent', {
        //TODO 这里是多语言范本
        //name: $t(defaultNames[id]),
        implementation,
        name: displayName,
      });
    },
  });

  registerNode(nodeType, (definition) => {
    if (definition.get('implementation') === implementation) {
      return nodeId;
    }
  });
});
