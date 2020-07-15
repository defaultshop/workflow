import bpmnProps from '@/setup/extensions/inspecotrs/bpmnProps';
export default {
  component: 'FormAccordion',
  container: true,
  config: {
    initiallyOpen: true,
    label: '数据表达式',
    icon: 'users',
    name: 'choose-accordion',
  },
  items: [
    {
      component: 'Expression',
      config: {
        label: '表达式',
        helper: '自定义表达式',
        name:bpmnProps.sequenceFlowOptions,
      },
    },
  ],
};