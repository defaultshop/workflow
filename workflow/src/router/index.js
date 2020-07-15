import Vue from 'vue';
import Router from 'vue-router';
import routes from './routers';

Vue.use(Router);
const router = new Router({
  routes,
  // mode: 'history',
  // base: '/app',
});

const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error);
};



// router.afterEach ( to =>{
//   window.scrollTo(0, 0);
// });
export default router;