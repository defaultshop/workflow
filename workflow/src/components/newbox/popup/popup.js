import Vue from 'vue';
import Box from './popup.vue';
const MessageBox = Vue.extend(Box);

let instance; // instance 变量用来保存实例
// 定义一个 function, 参数为 options, 默认为一个对象
const Message = function(options = {}) {
  console.log(Vue.prototype);
  // 如果当前处在服务器端, 则直接返回
  if (Vue.prototype.$isServer) return;

  // 对 options 做处理, 如果直接传入 string, 则使其保存在 options 的 message 属性上
  if (typeof options === 'string') {
    options = {
      message: options,
    };
  }
  

  // 初始化实例, 并将 options 作为新的 data 传入, Vue 会将 options 合并到原有的 data 上, 覆盖原有的默认值, 但是, 在 options 中没有设置的是不会被改变的
  
  // 调用 $mount 方法, 将当前实例渲染为真实 DOM, 生成 $el,, 如果不执行这一步, 将拿不到 $el 的值, 但是不指定 DOM 节点接管当前实例
  
  // console.log(instance.vm);
  // document.body.appendChild(instance.vm.$el);
  if (options.vis === true){
    options.vis = false;
    instance = new MessageBox({
      data: options,
    });
    instance.vm = instance.$mount();
    // 使用原生 JS 的 API 将当前实例的真实 DOM 追加到 body 中
    document.body.appendChild(instance.vm.$el);
    setTimeout(()=>{
      instance.vis = true;
    },100);
  } else if (options.vis === false) {
    if (document.getElementById('firstbox')) {
      console.log(instance);
      instance.vis = options.vis;
      instance.names = options.names;
      instance.type = options.type;
      instance.message = options.message;
      // instance.$mount('#firstbox');
      setTimeout(()=>{
        instance.vm.$destroy();
        instance.vm.$el.parentNode.removeChild(document.getElementById('firstbox'));
      },300);
      // 使用原生 API 将当前实例生成的 DOM 节点在真实的 DOM 树中删除
    }
  }


  return instance.vm;
};
export default {
  install(Vue) {
    Vue.prototype.$Messagebox = Message;
    // Vue.Messagebox = Message;
  },
};