
<template>
    <div></div>
</template>

<script>

import { Login } from '@/api/login'

/*
    从浙里办登录后是否需要重新输入账号密码
*/
    export default {
        async created(){
            let res = await Login({
                // Token: this.cookies.setCookie("token", JSON.stringify(res.result.token))
                Token: location.href.split('token=')[1]
            });
            if(res.success){
                
                sessionStorage.setItem("isLogin", "ok");
                sessionStorage.setItem('realName', res.result.realName);
                // sessionStorage.setItem('realName', res.result.refreshToken);
                sessionStorage.setItem('accessToken', res.result.accessToken);
                
                // let name = null;
                // name = JSON.parse(sessionStorage.getItem('routerUrl'));
                // if(!JSON.parse(sessionStorage.getItem('routerUrl'))){
                //     name = 'firstIn'
                // }

                this.$router.push({
                    name: 'Area'
                })
            }
        },
    }
</script>
