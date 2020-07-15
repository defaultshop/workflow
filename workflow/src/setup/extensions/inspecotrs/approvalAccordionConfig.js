import usersConfigSettings from './usersConfigSettings';
import flowControlConfigSettings from './flowControlConfigSettings';

export default {
  component: 'FormAccordion',
  container: true,
  config: {
    label: '审批设置',
    initiallyOpen: true,
    icon: 'users',
    name: 'inspector-accordion',
  },
  items: [
    {
      component: 'Newbox',
      config: usersConfigSettings,
    },
    flowControlConfigSettings,
  ],
};
