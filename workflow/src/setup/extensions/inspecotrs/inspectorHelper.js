export default {
  delegateHandle(configName) {
    return (value, node, setNodeProp) => {
      //取到值提供器里面的对象
      var obj = value[configName];
      //序列化成字符串
      const newConfig = JSON.stringify(obj);
      //如果值被更新了
      if (newConfig !== node.definition[configName]) {
        setNodeProp(node, configName, newConfig);
      }
    };
  },

  delegateInspect() {
    return function(node){
      //提取基础属性
      var result =  Object.entries(node.definition).reduce((data, [key, value]) => {
        data[key] = value;
        return data;
      }, {});

      //对于自定义的属性（如果名称不为config，会被放在$attrs
      var result2 = Object.entries(node.definition.$attrs).reduce((data, [key, value]) => {
        // var result = {};
        // result[key] = JSON.parse(value);
        // return { ...data, ...result};
        
        // console.log(value,isJSON(value),'value');
        // data[key] = isJSON(value) ? JSON.parse(value) : value;
        // return data;

        try {
          data[key] = JSON.parse(value);
        }
        catch {
          data[key] = value;
        }
        
        return data;
      }, {});
      
      var returned = {...result, ...result2};
      console.log(result2,returned, 'result2');
      return returned;
    };
  },
};


// function isJSON(str) {
//   console.log(str,typeof str == 'string','str');
//   if (typeof str == 'string') {
//     try {
//       var obj=JSON.parse(str);
//       if (typeof obj == 'object' && obj ){
//         console.log(JSON.parse(str),'str');
//         return true;
//       } else {
//         return false;
//       }

//     } catch (e) {
//       console.log('error：'+str+'!!!'+e);
//       return false;
//     }
//   }
//   console.log('It is not a string!');
// }
