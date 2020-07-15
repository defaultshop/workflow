export default {
  component: 'FormAccordion',
  container: true,
  config: {
    initiallyOpen: false,
    label: '选择事件',
    icon: 'users',
    name: 'choose-accordion',
  },
  items: [
    {
      component: 'Eventflow',
      config: {
        label: '参与事件',
        helper: '参与事件的人员',
        name:'config',
        events: {
          event: '性名',
          value: '往往',
        },
      },
    },
  ],
};