export default [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: '企业码'
    },
    component: () => import('@/views/home/home.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/login/login.vue')
  },
  //码上领券
  {
    path: '/coupon-redemption',
    name: 'couponRedemption',
    meta: {
      title: '码上领券'
    },
    component: () => import('@/views/couponRedemptionCode/couponRedemption.vue')
  },
  {
    path: '/that-notice',
    name: 'thatNotice',
    meta: {
      title: '申明须知'
    },
    component: () => import('@/views/couponRedemptionCode/thatNotice.vue')
  },
  {
    path: '/fillinform',
    name: 'fillinform',
    meta: {
      title: '填写表单'
    },
    component: () => import('@/views/couponRedemptionCode/fillinform.vue')
  },
  {
    path: '/upload-attachment',
    name: 'uploadAttachment',
    meta: {
      title: '上传附件'
    },
    component: () => import('@/views/couponRedemptionCode/uploadAttachment.vue')
  },
  {
    path: '/upload-pictures',
    name: 'uploadPictures',
    meta: {
      title: '上传附件'
    },
    component: () => import('@/views/couponRedemptionCode/uploadPictures.vue')
  },
  {
    path: '/resultspage',
    name: 'resultspage',
    meta: {
      title: '结果页'
    },
    component: () => import('@/views/common/resultspage.vue')
  },
  {
    path: '/service-voucher',
    name: 'serviceVoucher',
    meta: {
      title: '码上领券'
    },
    component: () => import('@/views/couponRedemptionCode/servicess/serviceVoucher.vue')
  },

  // 融资担保
  {
    path: '/guarantee-records',
    name: 'guaranteeRecords',
    meta: {
      title: '码上担保'
    },
    component: () => import('@/views/financingGuarantee/guaranteeRecords.vue')
  },
  {
    path: '/guarantee-applyfor',
    name: 'guaranteeApplyfor',
    meta: {
      title: '码上担保'
    },
    component: () => import('@/views/financingGuarantee/guaranteeApplyfor.vue')
  },
  {
    path: '/applyfor-detail',
    name: 'applyforDetail',
    meta: {
      title: '码上担保'
    },
    component: () => import('@/views/financingGuarantee/applyforDetail.vue')
  },
  {
    path: '/guarantee-complete',
    name: 'guaranteeComplete',
    meta: {
      title: '码上担保'
    },
    component: () => import('@/views/financingGuarantee/guaranteeComplete.vue')
  },
  {
    path: '/satisfaction-survey',
    name: 'satisfactionSurvey',
    meta: {
      title: '码上担保'
    },
    component: () => import('@/views/financingGuarantee/satisfactionSurvey.vue')
  },
  {
    path: '/finance-list',
    name: 'financeList',
    meta: {
      title: '码上金融'
    },
    component: () => import('@/views/codeFinance/financeList.vue')
  },
  {
    path: '/finance-detail',
    name: 'financeDetail',
    meta: {
      title: '码上金融'
    },
    component: () => import('@/views/codeFinance/financeDetail.vue')
  },
  {
    path: '/non-guarantee-records',
    name: 'nonGuaranteeRecords',
    meta: {
      title: '码上担保(非融资)'
    },
    component: () => import('@/views/nonFinancingGuarantee/nonGuaranteeRecords.vue')
  },
  {
    path: '/non-guarantee-applyfor',
    name: 'nonGuaranteeApplyfor',
    meta: {
      title: '码上担保(非融资)'
    },
    component: () => import('@/views/nonFinancingGuarantee/nonGuaranteeApplyfor.vue')
  },
  {
    path: '/agent-records',
    name: 'agentRecords',
    meta: {
      title: '码上待办'
    },
    component: () => import('@/views/codeAgent/agentRecords.vue')
  },
  {
    path: '/agent-type',
    name: 'agentType',
    meta: {
      title: '码上待办'
    },
    component: () => import('@/views/codeAgent/agentType.vue')
  },
  {
    path: '/agent-applyfor',
    name: 'agentApplyfor',
    meta: {
      title: '码上待办'
    },
    component: () => import('@/views/codeAgent/agentApplyfor.vue')
  },
  {
    path: '/agent-complete',
    name: 'agentComplete',
    meta: {
      title: '码上待办'
    },
    component: () => import('@/views/codeAgent/agentComplete.vue')
  },
  {
    path: '/agent-write',
    name: 'agentWrite',
    meta: {
      title: '码上待办'
    },
    component: () => import('@/views/codeAgent/agentWrite.vue')
  },

  {
    path: '/resultsuccess',
    name: 'resultsuccess',
    meta: {
      title: '结果页'
    },
    component: () => import('@/views/codeAgent/resultsuccess.vue')
  },
  {
    path: '/formdesign',
    name: 'formdesign',
    meta: {
      title: '表单提交'
    },
    component: () => import('@/views/home/formdesign.vue')
  },
  {
    path: '/login2',
    name: 'login2',
    mata: {
      title: '登录'
    },
    component: () => import('@/views/login/login2.vue')
  },
  {
    path: '/callback',
    name: 'callback',
    mata: {
      title: '回调'
    },
    component: () => import('@/views/login/callback.vue')
  }
];
