import iconNames from './iconNames';
import bpmnProps from './bpmnProps';

export default {
  component: 'FormAccordion',
  container: true,
  config: {
    initiallyOpen: true,
    label: '事件',
    icon: iconNames.lock,
    name: 'inspector-accordion',
  },
  items: [
    {
      component: 'Eventflow',
      config: {
        label: '事件',
        name: bpmnProps.eventOptions,
      },
    },
  ],
};
