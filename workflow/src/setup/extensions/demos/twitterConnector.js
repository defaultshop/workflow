import Task from '@/components/nodes/task/task';
import idConfigSettings from '@/components/inspectors/idConfigSettings';
import selectevent from '../eventvalue/selectevent';

window.ProcessMaker.EventBus.$on('modeler-init', ({ registerNode }) => {
  /* Add a custom node example */

  const implementation = 'processmaker-social-twitter-send';
  const nodeId = 'processmaker-connectors-social-twitter-send';

  const component = {
    extends: Task,
  };

  const nodeType = {
    id: nodeId,
    component,
    bpmnType: 'bpmn:ServiceTask',
    control: true,
    category: 'Social',
    icon: require('@/assets/toolpanel/task.svg'),
    label: 'Send Tweet',
    implementation,
    definition(moddle) {
      return moddle.create('bpmn:ServiceTask', {
        name: 'Send Tweet',
        implementation,
        config: JSON.stringify({ tweet: '', evtval:{event:'',value:''} }),
      });
    },
    diagram(moddle) {
      return moddle.create('bpmndi:BPMNShape', {
        bounds: moddle.create('dc:Bounds', {
          height: 76,
          width: 116,
        }),
      });
    },
    /* Map values from inspector data to node definition  */
    inspectorHandler(value, node, setNodeProp) {
      // Go through each property and rebind it to our data
      const definition = node.definition;
      const config = JSON.parse(definition.config);
      console.log('inspectorHandler......');
      console.log(value,config);
      for (const key in value) {
        if (key == 'config')
        {
          //这里config返回的是一个复杂对象，所以不能用简单的key来处理
          var obj = value[key];
          const newConfig = JSON.stringify(obj);
          if (newConfig !== definition.config) {
            console.log(newConfig,definition.config,'23');
            setNodeProp(node, 'config', newConfig);
          }
        }

        // console.log(key,'handler key');
        // if (key in config) {
        //   console.log('set key to config :'+ key);
        //   console.log(config[key],'set value to config');
        //   config[key] = value[key];  
        // }
        else if (definition[key] !== value[key]) {
          setNodeProp(node, key, value[key]);
          console.log('set key to node :'+ key);
          console.log(config[key],'set value to node');
        }
      }
    },
    /* Map values from node definition to inspector data */
    inspectorData(node) {
      console.log('inspectorData...w');
      console.log(node,'data1');
      return Object.entries(node.definition).reduce((data, [key, value]) => {
        if (key === 'config') {
          try {
            const config = JSON.parse(value);
            // return { ...data, ...config };
            var result= { ...data, ...config };
            var result2 = { ...data, config };
            console.log(result, 'result');
            console.log(result2, 'result2');

            return result2;
          } catch (error) {
            /* Ignore invalid JSON */
          }
        }

        data[key] = value;
        console.log(data,'data');
        return data;
      }, {});
    },
    inspectorConfig: [
      {
        name: 'Send Tweet',
        items: [
          {
            component: 'FormText',
            config: {
              label: 'Send Tweet',
              fontSize: '2em',
            },
          },
          {
            component: 'FormInput',
            config: idConfigSettings,
          },
          {
            component: 'FormTextArea',
            config: {
              label: 'Tweet Body',
              helper: 'The Body Of The Tweet to Send',
              name: 'tweet',
            },
          },
          selectevent,
        ],
      },
    ],
  };
  console.log(nodeType,'nodeType');

  registerNode(nodeType);
});
