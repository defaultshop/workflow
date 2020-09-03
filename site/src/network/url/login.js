import '@/network/request.js';

export const Login = data => '/api/account/login'.post(data); // 前端登录
export const LoginConfig = () => '/api/abp/application-configuration'.get(); //前端登录
