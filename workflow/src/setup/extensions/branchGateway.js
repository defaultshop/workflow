import { exclusiveGateway } from '@/components/nodes';
import nameConfigSettings from './inspecotrs/nameConfigSettings';
import merge from 'lodash/merge';
import cloneDeep from 'lodash/cloneDeep';
import iconNames from './inspecotrs/iconNames';
import advancedAccordionConfig from './inspecotrs/advancedAccordionConfig';

window.ProcessMaker.EventBus.$on('modeler-init', ({ registerNode }) => {
  /* Add a custom node example */

  const implementation = 'processmaker-branch-gateway';
  const nodeId = 'processmaker-branch-gateway';
  const displayName = '判断';
  
  const baseConfig = cloneDeep(exclusiveGateway);
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
    extends: exclusiveGateway.component,
    created() {
      this.boundaryEventDropdownData = [];
      this.dropdownData = [];
    },
  };

  const nodeType = merge(baseConfig, {
    id: nodeId,
    component,
    rank: 1,
    bpmnType: 'bpmn:ExclusiveGateway',
    control: true,
    category: 'BPMN',
    label: displayName,
    definition(moddle) {
      return moddle.create('bpmn:ExclusiveGateway', {
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
