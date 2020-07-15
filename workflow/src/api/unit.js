import axios from 'axios';
import { Message } from 'element-ui';
import router from '../router';

export function getaxios(urltype,type,datata) { 
  return new Promise(resolve =>{
    axios({
      url: urltype,
      method: type, 
      data: datata,
    }).then( res => {
      console.log(res,'until');
      resolve(res.data);
    }).catch( res => {
      // reject(res.response.data);
      console.log(res.response,'error');
      if (res.response.status === 401){
        Message({message:'登录失效，请重新登录',showClose:true});
        router.push('/login');
      } else {
        Message({message:res.response.data.error.message,showClose:true});
      }
      
    });
  });
}

export function gettime(date){
  let d = new Date(date);
  let yy = d.getFullYear();
  let mm = (d.getMonth() + 1) <10 ? '0'+(d.getMonth() + 1) : (d.getMonth() + 1);
  let dd = d.getDate() <10 ? '0'+d.getDate() : d.getDate();
  let hh = d.getHours() <10 ? '0'+d.getHours() : d.getHours();
  let ss = d.getMinutes() <10 ? '0'+d.getMinutes() : d.getMinutes();
  let ff = d.getSeconds() <10 ? '0'+d.getSeconds() : d.getSeconds();
  return yy+'-'+mm+'-'+dd+' '+hh+':'+ss+':'+ff;
}