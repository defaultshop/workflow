import iconNames from './iconNames';

export default {
  component: 'FormAccordion',
  container: true,
  config: {
    initiallyOpen: false,
    label: '高级设置',
    icon: iconNames.advanced,
    name: 'inspector-accordion',
  },
  items: [
    {
      component: 'FormInput',
      config: {
        label: '唯一标识',
        helper: '设置这个处理节点的唯一表示',
        name: 'id',
        spring: '请输入唯一标识符',
      },
    },
  ],
};
