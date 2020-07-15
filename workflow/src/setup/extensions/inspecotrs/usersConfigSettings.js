import bpmnProps from './bpmnProps';

const usersConfigSettings = {
  label: '参与人员',
  helper: '通过面板选择参与此活动的用户、角色或者组织单元',
  name: bpmnProps.principalOptions,
  spring: '点击设置负责人',
  spring2: '点击设置抄送人',
  //validation: 'required|regex:/^[_A-Za-z][-._A-Za-z0-9]*$/',
};
  
export default usersConfigSettings;
  