export default [
  {
    path: '/',
    name: 'home',
    meta: {
      title: '首页',
    },
    component: resolve => require(['../pages/home/index'], resolve),
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
    },
    component: resolve => require(['../pages/login/login'], resolve),
  },
  {
    path: '/manage/role',
    name: 'role',
    meta: {
      title: '身份认证管理-角色',
    },
    component: resolve => require(['../pages/manage/Certification/role'], resolve),
  },
  {
    path: '/manage/user',
    name: 'user',
    meta: {
      title: '身份认证管理-用户',
    },
    component: resolve => require(['../pages/manage/Certification/user'], resolve),
  },
  {
    path: '/manage/tenant',
    name: 'tenant',
    meta: {
      title: '租户管理-租户',
    },
    component: resolve => require(['../pages/manage/tenant'], resolve),
  },
  {
    path: '/streamingevents/event',
    name: 'event',
    meta: {
      title: '流事件',
    },
    component: resolve => require(['../pages/streamingevents/event'], resolve),
  },
  {
    path: '/streamingevents/eventvalue',
    name: 'eventvalue',
    meta: {
      title: '流事件二级',
    },
    component: resolve => require(['../pages/streamingevents/eventvalue'], resolve),
  },
  {
    path: '/streamingevents/vpublish',
    name: 'vpublish',
    meta: {
      title: '流事件标识',
    },
    component: resolve => require(['../pages/streamingevents/vpublish'], resolve),
  },
  {
    path: '/administrators',
    name: 'administrators',
    meta: {
      title: '管理员',
    },
    component: resolve => require(['../pages/administrators'], resolve),
  },
  {
    path: '/organizational',
    name: 'organizational',
    meta: {
      title: '组织单元',
    },
    component: resolve => require(['../pages/organizational'], resolve),
  },
  {
    path: '/home/agencytask',
    name: 'agencytask',
    meta: {
      title: '待办任务',
    },
    component: resolve => require(['../pages/home/agencytask'], resolve),
  },
  {
    path: '/home/maillist',
    name: 'maillist',
    meta: {
      title: '通讯录',
    },
    component: resolve => require(['../pages/home/maillist'], resolve),
  },
  {
    path: '/home/mailrole',
    name: 'mailrole',
    meta: {
      title: '通讯录-角色',
    },
    component: resolve => require(['../pages/home/maillist/mailrole'], resolve),
  },
  {
    path: '/home/mylaunch',
    name: 'mylaunch',
    meta: {
      title: '我的发起',
    },
    component: resolve => require(['../pages/home/business-management/mylaunch'], resolve),
  },
  {
    path: '/home/mytask',
    name: 'mytask',
    meta: {
      title: '我的待办',
    },
    component: resolve => require(['../pages/home/business-management/mytask'], resolve),
  },
  {
    path: '/home/myhandle',
    name: 'myhandle',
    meta: {
      title: '我处理的',
    },
    component: resolve => require(['../pages/home/business-management/myhandle'], resolve),
  },
  {
    path: '/home/copytome',
    name: 'copytome',
    meta: {
      title: '抄送我的',
    },
    component: resolve => require(['../pages/home/business-management/copytome'], resolve),
  },
  {
    path: '/home/submit',
    name: 'submit',
    meta: {
      title: '表单提交',
    },
    component: resolve => require(['../pages/home/submit'], resolve),
  },
  {
    path: '/management',
    name: 'management',
    meta: {
      title: '业务管理',
    },
    component: resolve => require(['../pages/appmanagement/management'], resolve),
  },
  {
    path: '/management/addmember',
    name: 'addmember',
    meta: {
      title: '添加成员',
    },
    component: resolve => require(['../pages/appmanagement/addmember'], resolve),
  },
  {
    path: '/workflowformdesign',
    name: 'workflowformdesign',
    meta: {
      title: '表单设计器',
    },
    component: resolve => require(['../pages/workflowformdesign/workflowformdesign.vue'], resolve),
  },
];
