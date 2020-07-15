import iconNames from '../../setup/extensions/inspecotrs/iconNames';
import nameConfigSettings from '../../setup/extensions/inspecotrs/nameConfigSettings';
import advancedAccordionConfig from '../../setup/extensions/inspecotrs/advancedAccordionConfig';
import merge from 'lodash/merge';
import cloneDeep from 'lodash/cloneDeep';


export default {
  id: 'processmaker-modeler-process',
  bpmnType: 'bpmn:Process',
  control: false,
  label: 'Process',
  inspectorConfig: [
    {
      name: 'Process Information',
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
              config: merge(cloneDeep(nameConfigSettings),{
                validation:null,
              }),
            },
          ],
        },
        advancedAccordionConfig,
      ],
    },
  ],
};
