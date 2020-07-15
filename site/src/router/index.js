import Vue from "vue";
import Router from "vue-router";
import routes from "./routers";
import kind from "./kind-router";

Vue.use(Router);
const router = new Router({
  routes
});

//  路由钩子
// router.beforeEach((to, from, next) => {
//   if (sessionStorage.getItem("isLogin") == "ok" || to.name == "CenterPage") {
//     next();
//     return;
//   }

//   if (to.meta.isLogin == "no" || to.name == "Login") {
//     next();
//     return;
//   }
//   debugger;

//   //  --- 如果进入当前页面需要登录的话，就储存即将跳转的页面路由，登录成功后直接跳到此页面
//   sessionStorage.setItem("routerUrl", JSON.stringify(to.name));

//   // 没有登录，跳到登录页(会员端 --- 浙里办)
//   window.location.replace(
//     "http://lsrxbm.baitutech.cn/LoginByGovSvr?isPc=true&redirectUrl=" +
//       encodeURIComponent(window.location.href.split("#")[0] + "#/CenterPage")
//   );
//   return;
// });

router.afterEach(to => {
  window.scrollTo(0, 0);
});
export default router;
