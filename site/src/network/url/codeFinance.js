import '@/network/request.js';

export const financeGet = params => '/api/enterpriseCode/finance'.get({ params }); //码上金融列表
export const financeDetailGet = params => ('/api/enterpriseCode/finance/' + params.otherid).get({ params }); //码上金融列表
