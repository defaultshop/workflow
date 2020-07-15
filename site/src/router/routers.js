import kind from "./kind-router";
export default [
  {
    path: "/",
    redirect: "/Area",
    meta: {
      title: "选择统筹区"
    },
    component: () => import("@/view/home/Area.vue")
  },

  // ------ 动态路由
  {
    path: "/Login",
    name: "Login",
    meta: {
      title: "登陆"
    },
    component: () => import("@/view/login/Login.vue")
  },
  {
    path: "/CenterPage",
    name: "CenterPage",
    component: () => import("@/view/login/CenterPage.vue"),
    meta: {
      title: ""
    }
  },
  {
    path: "/Area",
    name: "Area",
    meta: {
      title: "选择统筹区"
    },
    component: () => import("@/view/home/Area.vue")
  },
  {
    path: "/Home",
    name: "Home",
    meta: {
      title: "首页"
    },
    component: () => import("@/view/home/Home.vue")
  },
  {
    path: "/ApplyConsult",
    name: "ApplyConsult",
    meta: {
      title: "报名咨询"
    },
    component: () => import("@/view/applyConsult/ApplyConsult.vue")
  },
  {
    path: "/TypeChioce",
    name: "TypeChioce",
    meta: {
      title: "业务选择"
    },
    component: () => import("@/view/home/TypeChioce.vue")
  },
  {
    path: "/Ready/ReadyFill",
    name: "ReadyFill",
    meta: {
      title: "预报名"
    },
    component: () => import("@/view/ready/ReadyFill.vue")
  },
  //幼儿园业务路由
  ...kind,
  {
    path: "/Ready/ReadyResult",
    name: "ReadyResult",
    meta: {
      title: "预报名结果"
    },
    component: () => import("@/view/ready/ReadyResult.vue")
  },
  {
    path: "/Official/ChildFill",
    name: "ChildFill",
    meta: {
      title: "填写儿童信息"
    },
    component: () => import("@/view/official/child/ChildFill.vue")
  },
  {
    path: "/Official/ParentFill",
    name: "ParentFill",
    meta: {
      title: "填写父母信息"
    },
    component: () => import("@/view/official/parent/ParentFill.vue")
  },
  {
    path: "/Official/HouseFill",
    name: "HouseFill",
    meta: {
      title: "填写房产信息"
    },
    component: () => import("@/view/official/house/HouseFill.vue")
  },
  {
    path: "/Official/EnterpricesFill",
    name: "EnterpricesFill",
    meta: {
      title: "填写企业信息"
    },
    component: () => import("@/view/official/enterprices/EnterpricesFill.vue")
  },
  {
    path: "/Official/CompanyFillOS",
    name: "CompanyFillOS",
    meta: {
      title: "填写单位信息"
    },
    component: () => import("@/view/official/company/CompanyFillOS.vue")
  },
  {
    path: "/Official/CompanyFillTT",
    name: "CompanyFillTT",
    meta: {
      title: "填写单位信息"
    },
    component: () => import("@/view/official/company/CompanyFillTT.vue")
  },
  {
    path: "/Official/FileFillO",
    name: "FileFillO",
    meta: {
      title: "填写附件信息"
    },
    component: () => import("@/view/official/file/FileFillO.vue")
  },
  {
    path: "/Official/FileFillT",
    name: "FileFillT",
    meta: {
      title: "填写附件信息"
    },
    component: () => import("@/view/official/file/FileFillT.vue")
  },
  {
    path: "/Official/FileFillF",
    name: "FileFillF",
    meta: {
      title: "填写附件信息"
    },
    component: () => import("@/view/official/file/FileFillF.vue")
  },
  {
    path: "/Official/FileFillOther",
    name: "FileFillOther",
    meta: {
      title: "填写附件信息"
    },
    component: () => import("@/view/official/file/FileFillOther.vue")
  },
  {
    path: "/Official/SchoolFill",
    name: "SchoolFill",
    meta: {
      title: "填写志愿学校"
    },
    component: () => import("@/view/official/school/SchoolFill.vue")
  },
  {
    path: "/Official/Confirm",
    name: "Confirm",
    meta: {
      title: "确认页"
    },
    component: () => import("@/view/official/confirm/Confirm.vue")
  },
  {
    path: "/Official/Result",
    name: "Result",
    meta: {
      title: "结果页"
    },
    component: () => import("@/view/official/result/Result.vue")
  },
  {
    path: "/ApplyList",
    name: "ApplyList",
    meta: {
      title: "报名列表"
    },
    component: () => import("@/view/applyProgress/ApplyList.vue")
  },
  {
    path: "/Apply/ApplyProgress",
    name: "ApplyProgress",
    meta: {
      title: "正式报名结果"
    },
    component: () => import("@/view/applyProgress/ApplyProgress.vue")
  },
  {
    path: "/Apply/ReadyProgress",
    name: "ReadyProgress",
    meta: {
      title: "预报名结果"
    },
    component: () => import("@/view/applyProgress/ReadyProgress.vue")
  },

  //  ------  静态路由
  {
    path: "/index",
    name: "index",
    meta: {
      title: "报名",
      isLogin: false
    },
    component: () => import("@/pages/Index.vue")
  },
  {
    path: "/entry-type",
    name: "entry-type",
    meta: {
      title: "选择报名类型",
      isLogin: false
    },
    component: () => import("@/pages/EntryType.vue")
  },
  {
    path: "/children",
    name: "children",
    meta: {
      title: "信息填写儿童页",
      isLogin: false
    },
    component: () => import("@/pages/Children.vue")
  },
  {
    path: "/parent",
    name: "parent",
    meta: {
      title: "信息填写父母页",
      isLogin: false
    },
    component: () => import("@/pages/Parent.vue")
  },
  {
    path: "/file",
    name: "file",
    meta: {
      title: "附件上传",
      isLogin: false
    },
    component: () => import("@/pages/File.vue")
  },
  {
    path: "/school",
    name: "school",
    meta: {
      title: "填写志愿学校",
      isLogin: false
    },
    component: () => import("@/pages/School.vue")
  },
  {
    path: "/confirm",
    name: "confirm",
    meta: {
      title: "确认",
      isLogin: false
    },
    component: () => import("@/pages/Confirm.vue")
  },
  {
    path: "/progress",
    name: "progress-query",
    meta: {
      title: "报名进度查询",
      isLogin: false
    },
    component: () => import("@/pages/ProgressQuery.vue")
  },
  {
    path: "/progress-detail",
    name: "progress-query-detail",
    meta: {
      title: "报名进度查询-进度详情",
      isLogin: false
    },
    component: () => import("@/pages/ProgressQueryDetail.vue")
  },
  {
    path: "/information",
    name: "information",
    meta: {
      title: "报名信息咨询",
      isLogin: false
    },
    component: () => import("@/pages/Information.vue")
  },
  {
    path: "/result",
    name: "result",
    meta: {
      title: "预录取结果查询",
      isLogin: false
    },
    component: () => import("@/pages/Result.vue")
  },
  {
    path: "/detail",
    name: "detail",
    meta: {
      title: "政策资讯-详情",
      isLogin: false
    },
    component: () => import("@/pages/InfoDetail.vue")
  },
  {
    path: "/query",
    name: "query",
    meta: {
      title: "预录取查询",
      isLogin: false
    },
    component: () => import("@/pages/Query.vue")
  },
  {
    path: "/staticArea",
    name: "static-area",
    meta: {
      title: "选择统筹区",
      isLogin: false
    },
    component: () => import("@/pages/Area.vue")
  }
];
