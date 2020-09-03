import '@/network/request.js';

export const financingGuarantee = params => '/api/enterpriseCode/financingGuarantee'.get({ params }); //融资担保-申请列表
export const financingGuaranteeGet = params => ('/api/enterpriseCode/financingGuarantee/' + params.otherid).get({ params }); //融资担保-申请列表-详情
export const financingGuaranteeFormMe = params => '/api/enterpriseCode/financingGuaranteeSubmitted/fromMe'.get({ params }); //融资担保-申请记录
export const financingGuaranteeFormMeDetail = params => ('/api/enterpriseCode/financingGuaranteeSubmitted/' + params.otherid + '/fromMeDetail').get({ params });
//融资担保-申请记录-详情

export const mobileAppJsonData = params => ('/api/baitu-workflows/flowFormPublish/' + params.otherid).get({ params }); //获取页应用json数据-链接
export const mobileAppflowInstance = (url, data) => url.post(data); //发起流程-链接
export const financeCanSubmit = params => '/api/enterpriseCode/financingGuaranteeSubmitted/canSubmit'.get({ params }); //发起流程-点击
