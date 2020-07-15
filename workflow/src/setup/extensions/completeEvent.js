import { endEvent } from '@/components/nodes';
// import idConfigSettings from '@/components/inspectors/idConfigSettings';
import nameConfigSettings from './inspecotrs/nameConfigSettings';
import iconNames from './inspecotrs/iconNames';
import merge from 'lodash/merge';
import cloneDeep from 'lodash/cloneDeep';
import advancedAccordionConfig from './inspecotrs/advancedAccordionConfig';
//import baseStartEvent from '@/components/nodes/baseStartEvent/baseStartEvent';

window.ProcessMaker.EventBus.$on('modeler-init', ({ registerNode }) => {
  /* Add a custom node example */

  const implementation = 'processmaker-complete-event';
  const nodeId = 'processmaker-complete-event';
  const displayName = '完成';
  
  const baseConfig = cloneDeep(endEvent);
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
    extends: endEvent.component,
    created() {
      this.boundaryEventDropdownData = [];
      this.dropdownData = [];
    },
  };

  const nodeType = merge(baseConfig, {
    id: nodeId,
    component,
    rank: 1,
    bpmnType: 'bpmn:EndEvent',
    control: true,
    category: 'BPMN',
    icon: require('@/assets/toolpanel/end-event.svg'),
    label: displayName,
    definition(moddle) {
      return moddle.create('bpmn:EndEvent', {
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
