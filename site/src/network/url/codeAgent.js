import '@/network/request.js';

export const matterSubmittedApplication = params => '/api/enterpriseCode/matterSubmittedApplication'.get({ params }); //码上代办列表
export const matterSubmittedApplicationGet = params => ('/api/enterpriseCode/matterSubmittedApplication/' + params.otherid).get({ params }); //码上代办列表-详情
export const matterTypes = params => '/api/enterpriseCode/matterApplication/matterTypes'.get({ params }); //码上代办-事项类型

export const matterApplicationList = params => '/api/enterpriseCode/matterApplication'.get({ params }); //码上代办-事项类型-列表
export const matterApplicationGet = params => ('/api/enterpriseCode/matterApplication/' + params.otherid).get({ params }); //码上代办-事项类型-列表-详情

export const matterSubmittedApplicationPost = data => '/api/enterpriseCode/matterSubmittedApplication'.post(data); //码上代办-事项类型-代办提交
