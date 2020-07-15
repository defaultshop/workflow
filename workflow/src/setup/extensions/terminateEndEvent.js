//import { endEvent } from '@/components/nodes';
import  terminateEndEvent  from '@/components/nodes/terminateEndEvent';
import nameConfigSettings from '@/components/inspectors/nameConfigSettings';
import merge from 'lodash/merge';
import cloneDeep from 'lodash/cloneDeep';
import iconNames from './inspecotrs/iconNames';
import advancedAccordionConfig from './inspecotrs/advancedAccordionConfig';
//import terminateIcon from '!!svg-inline-loader!@/assets/terminate-end-event.svg';
// import idConfigSettings from '@/components/inspectors/idConfigSettings';

window.ProcessMaker.EventBus.$on('modeler-init', ({ registerNode }) => {
  /* Add a custom node example */

  const implementation = 'processmaker-terminate-end-event';
  const nodeId = 'processmaker-ternimate-end-event';
  const displayName = '中止';
  
  const baseConfig = cloneDeep(terminateEndEvent);
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
    extends: terminateEndEvent.component,
    created() {
      this.boundaryEventDropdownData = [];
      this.dropdownData = [];
      //this.nodeIcon = require('@/assets/terminate-end-event.svg');
    },
    // data() {
    //   return {
    //     nodeIcon: require('@/assets/terminate-end-event.svg'),
    //   };
    // },
  };

  const nodeType = merge(baseConfig, {
    id: nodeId,
    component,
    bpmnType: 'bpmn:TerminateEndEvent',
    control: true,
    category: 'BPMN',
    icon: require('@/assets/terminate-end-event.svg'),
    label: displayName,
    definition(moddle) {
      return moddle.create('bpmn:EndEvent', {
        name: displayName,
        implementation,
        eventDefinitions: [
          moddle.create('bpmn:TerminateEventDefinition'),
        ],
      });
    },
  });

  registerNode(nodeType, (definition) => {
    if (definition.get('implementation') === implementation) {
      return nodeId;
    }
  });
});
