export default [
  {
    path: "/kind/type",
    component: () => import("@/view/kind-register/KindType.vue")
  },
  {
    path: "/nancheng/kindfill",
    component: () => import("@/view/kind-register/nan-cheng/KindFill.vue")
  },
  {
    path: "/lishui/kindfill",
    component: () => import("@/view/kind-register/li-shui/KindFill.vue")
  },
  {
    path: "/nancheng/parentFill",
    component: () => import("@/view/kind-register/nan-cheng/ParentFill.vue")
  },
  {
    path: "/lishui/parentFill",
    component: () => import("@/view/kind-register/li-shui/ParentFill.vue")
  },
  {
    path: "/nancheng/talents",
    component: () => import("@/view/kind-register/nan-cheng/Talents.vue")
  },
  {
    path: "/nancheng/file",
    component: () => import("@/view/kind-register/nan-cheng/File.vue")
  },
  {
    path: "/lishui/file",
    component: () => import("@/view/kind-register/li-shui/File.vue")
  },
  {
    path: "/house",
    component: () => import("@/view/kind-register/House.vue")
  },
  {
    path: "/lishui/house",
    component: () => import("@/view/kind-register/li-shui/House.vue")
  },
  {
    path: "/nancheng/school",
    component: () => import("@/view/kind-register/nan-cheng/ExpectSchool.vue")
  },
  {
    path: "/lishui/school",
    component: () => import("@/view/kind-register/li-shui/ExpectSchool.vue")
  },
  {
    path: "/kind/confirm",
    component: () => import("@/view/kind-register/Confirm.vue")
  },
  {
    path: "/kind/result",
    component: () => import("@/view/kind-register/Result.vue")
  },
  {
    path: "/kind/test",
    component: () => import("@/view/kind-register/test.vue")
  }
];
